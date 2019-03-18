// import { InstrumentType, InvestmentRound, DocumentType } from '../model'
import { ENV } from '../env/env'

// const ROOT_API = window.location.protocol + "//" + window.location.hostname + ":2000";
const ROOT_API = ENV.API_ROOT_URL

export const API_URL = {
    GET_ALL_USER: `${ROOT_API}/api/v1/user.json`,
    GET_ALL_USER_STATISTICS: `${ROOT_API}/api/v1/user_statistics`,
    CREATE_USER_SESSION: `${ROOT_API}/api/v1/users/session`,
    GOOGLE_USER_AUTH: `${ROOT_API}/api/v1/users/auth/google.json`
}

export const GOOGLE_ANALYTICS_TRACKING_ID = ENV.GOOGLE_ANALYTICS_TRACKING_ID

