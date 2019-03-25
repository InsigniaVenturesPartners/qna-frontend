import _ from 'lodash'
import axios from 'axios'
import { browserHistory } from 'react-router'

export function sendRequest (extra_params) {
    let params = {
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

export function getRequest (url) {
    return axios.get(url, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('access_token')}` } })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                browserHistory.push('/unauthorized')
            }
            throw err
        })
}