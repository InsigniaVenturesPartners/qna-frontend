// import { InstrumentType, InvestmentRound, DocumentType } from '../model'
import { ENV } from '../env/env'

// const ROOT_API = window.location.protocol + "//" + window.location.hostname + ":2000";
const ROOT_API = ENV.API_ROOT_URL

export const API_URL = {
    CREATE_USER_SESSION: `${ROOT_API}/api/v1/users/session`,
    GOOGLE_USER_AUTH: `${ROOT_API}/api/v1/users/auth/google.json`,

    GET_TOPICS: `${ROOT_API}/api/v1/topics`,
    FOLLOW_TOPIC: `${ROOT_API}/api/v1/topics/follow`,
    UNFOLLOW_TOPIC: `${ROOT_API}/api/v1/topics/unfollow`,

    GET_QUESTIONS: `${ROOT_API}/api/v1/questions`,
    GET_TOP_QUESTIONS: `${ROOT_API}/api/v1/top/questions`,
    CREATE_QUESTION: `${ROOT_API}/api/v1/questions`,
    UPDATE_QUESTION: `${ROOT_API}/api/v1/questions`,
    VOTE_QUESTION: `${ROOT_API}/api/v1/questions/vote`,
    FOLLOW_QUESTION: `${ROOT_API}/api/v1/questions/follow`,
    UNFOLLOW_QUESTION: `${ROOT_API}/api/v1/questions/unfollow`,

    GET_ANSWERS: `${ROOT_API}/api/v1/answers`,
    CREATE_ANSWER: `${ROOT_API}/api/v1/answers`,
    VOTE_ANSWER: `${ROOT_API}/api/v1/answers/vote`,

    GET_COMMENTS: `${ROOT_API}/api/v1/comments`,
    CREATE_COMMENT: `${ROOT_API}/api/v1/comments`,
    VOTE_COMMENT: `${ROOT_API}/api/v1/comments/vote`,

    GET_DRAFTS: `${ROOT_API}/api/v1/drafts`,
    CREATE_DRAFT: `${ROOT_API}/api/v1/drafts`,

    GET_PROFILE_ANSWERS: `${ROOT_API}/api/v1/profile/answers`,
    GET_PROFILE_QUESTIONS: `${ROOT_API}/api/v1/profile/questions`,

    GET_USER_WHITELISTS: `${ROOT_API}/api/v1/user_whitelists`,
    CREATE_USER_WHITELIST: `${ROOT_API}/api/v1/user_whitelists`,
}

export const GOOGLE_ANALYTICS_TRACKING_ID = ENV.GOOGLE_ANALYTICS_TRACKING_ID

