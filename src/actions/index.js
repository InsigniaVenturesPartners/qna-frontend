/* global gapi */

import _ from 'lodash'
import axios from 'axios'
import { browserHistory } from 'react-router'

import AWS from 'aws-sdk'

import {
    APP_INIT,
    APP_INIT_SUCCESS,
    APP_INIT_FAILURE,
    USER_LOGIN,
    USER_LOGIN_ERROR,
    USER_LOGIN_SUCCESS,
    USER_GET_ALL
} from './types'

import { ENV } from '../env/env'
import { API_URL } from '../util/constant'


function getPostRequest (extra_params) {
    let params = {
        method: 'post',
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('access_token')}` }
    }
    return axios(_.merge(params, extra_params))
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                browserHistory.push('/unauthorized')
            }
            if (err.response && err.response.status === 400) {
                return { status: err.response.status, data: err.response.data }
            }
            if (err.response) {
                return { status: err.response.status, data: { 'content': [err.response.data] } }
            }
            return { status: 0, data: { 'content': ['Unknown Error'] } }
        })
}

function getRequest (url) {
    return axios.get(url, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('access_token')}` } })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                browserHistory.push('/unauthorized')
            }
            throw err
        })
}

export function configAndInitialize () {
    return function (dispatch) {
        dispatch({ type: APP_INIT })

        // TODO(chris): Move Google Load to a Promise
        const script = document.createElement('script')
        script.src = 'https://apis.google.com/js/api.js'

        script.onerror = () => {
            dispatch({ type: APP_INIT_FAILURE })
        }
        script.onload = () => {
            gapi.load('auth2', () => {
                gapi.auth2.init({
                    'clientId': ENV.GOOGLE_CLIENT_ID,
                    'scope': [
                        'email',
                        'profile'
                    ].join(' '),
                    'ux_mode': 'redirect',
                    'redirect_uri': ENV.WEB_ROOT_URL
                }).then((googleAuth) => {
                    // If user is not signed, then redirect
                    if (googleAuth.isSignedIn.get() === false) {
                        logIn()
                        return
                    }
                }).catch((error) => {
                        dispatch({ type: APP_INIT_FAILURE })
                })
            })
        }
        document.body.appendChild(script)
    }
}

export function logIn () {
    gapi.auth2.getAuthInstance().signIn()
}

export function logOut () {
    var auth2 = gapi.auth2.getAuthInstance()

    auth2.signOut().then(function () { // Log out of Rafael app
        sessionStorage.removeItem('access_token')
        window.location = 'https://mail.google.com/mail/u/0/?logout&hl=en' // Log out of Google
    })
}

export function loggedIn () {
    return function (dispatch) {
        dispatch({ type: USER_LOGIN })

        let googleAuth = gapi.auth2.getAuthInstance()
        if (googleAuth.isSignedIn.get() === true) {
            let currentUser = googleAuth.currentUser.get()
            let currentUserProfile = currentUser.getBasicProfile()

            let idToken = currentUser.getAuthResponse().id_token
            sessionStorage.setItem('access_token', currentUser.getAuthResponse().access_token)

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: ENV.COGNITO_IDENTITY_POOL_ID,
                Logins: {
                    'accounts.google.com': idToken
                }
            }, {
                region: ENV.AWS_REGION
            })

            AWS.config.credentials.getPromise()
                .then(function (data) {
                    // Send a request to create or update the user data
                    const url = API_URL.CREATE_UPDATE_USER
                    const request = getPostRequest({
                        method: 'post',
                        data: {
                            user: {
                                google_id: currentUser.getId(),
                                name: currentUserProfile.getName(),
                                email: currentUserProfile.getEmail(),
                                given_name: currentUserProfile.getGivenName(),
                                last_name: currentUserProfile.getFamilyName(),
                                profile_img: currentUserProfile.getImageUrl(),
                                access_token: currentUser.getAuthResponse().access_token
                            }
                        },
                        url
                    })

                    return request
                })
                .then(function (response) {
                    dispatch({ type: USER_LOGIN_SUCCESS, payload: response })

                    getRequest(API_URL.GET_ALL_USER)
                        .then((users) => {
                            dispatch({ type: USER_GET_ALL, payload: users })
                            dispatch({ type: APP_INIT_SUCCESS, payload: users })
                        })
                        .catch((error) => {
                            dispatch({ type: APP_INIT_FAILURE })
                        })

                    let user = response.data
                    if (!user.has_offline_access) {
                        return gapi.auth2.getAuthInstance().grantOfflineAccess({ prompt: 'consent' })
                            .then((auth) => {
                                const url = API_URL.GOOGLE_USER_AUTH
                                return getPostRequest({
                                    method: 'post',
                                    data: {
                                        code: auth.code
                                    },
                                    url
                                })
                            })
                    }
                })
                .catch(function (err) {
                    console.log(err)
                    dispatch({ type: USER_LOGIN_ERROR, payload: {} })
                })
        }
    }
}
