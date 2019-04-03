/* global gapi */

import {
    APP_INIT_FAILURE,
    USER_LOGIN_ERROR,
    USER_LOGIN_SUCCESS
} from './types'

import { ENV } from '../env/env'
import { API_URL } from '../util/constant'
import { sendRequest } from '../util/request_util'

export function configAndInitialize () {
  return function (dispatch) {
    if(sessionStorage.getItem('access_token')) {

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
              'profile',
              'https://www.googleapis.com/auth/gmail.readonly',
              'https://www.googleapis.com/auth/contacts.readonly',
            ].join(' '),
            'hosted_domain': 'insignia.vc',
            'ux_mode': 'redirect',
            'redirect_uri': ENV.WEB_ROOT_URL
          }).then((googleAuth) => {
            loggedIn()(dispatch)
          })
            .catch((error) => {
              dispatch({ type: APP_INIT_FAILURE })
            })
        })
      }
      document.body.appendChild(script)
    }
  }
}

export function logOut () {
    var auth2 = gapi.auth2.getAuthInstance()

    auth2.signOut().then(function () {
        sessionStorage.removeItem('access_token')
        window.location = ENV.WEB_ROOT_URL
    })
}

export function loggedIn () {
    return function (dispatch) {
        let googleAuth = gapi.auth2.getAuthInstance()
        if (googleAuth.isSignedIn.get() === true) {
            let currentUser = googleAuth.currentUser.get()
            let currentUserProfile = currentUser.getBasicProfile()

            sessionStorage.setItem('access_token', currentUser.getAuthResponse().access_token)

            const url = API_URL.CREATE_USER_SESSION

            sendRequest({
                method: 'post',
                data: {
                    user: {
                        google_id: currentUser.getId(),
                        name: currentUserProfile.getName(),
                        email: currentUserProfile.getEmail(),
                        given_name: currentUserProfile.getGivenName(),
                        last_name: currentUserProfile.getFamilyName(),
                        pro_pic_url: currentUserProfile.getImageUrl(),
                        access_token: currentUser.getAuthResponse().access_token
                    }
                },
                url
            })
            .then(function (response) {
                if(response.status === 403) {
                  logOut ()
                  return
                }

                dispatch({ type: USER_LOGIN_SUCCESS, payload: response })

                let user = response.data
                if (!user.has_offline_access) {
                    return gapi.auth2.getAuthInstance().grantOfflineAccess({ prompt: 'consent' })
                        .then((auth) => {
                            const url = API_URL.GOOGLE_USER_AUTH
                            return sendRequest({
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
