import { sendRequest } from './request_util'
import { API_URL } from './constant'

export const fetchUserWhitelists = data => (
  return sendRequest({
    method: 'GET',
    url: API_URL.GET_USER_WHITELISTS,
    data
  })
);

export const createUserWhitelist = (email) => (
  return sendRequest({
    method: 'POST',
    url: API_URL.CREATE_USER_WHITELIST,
    data: {
      user_whitelist: {
        email
      }
    }
  })
);