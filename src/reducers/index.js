import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import app from './app_reducer'
import auth from './auth_reducer'
import topics from './topics_reducer'
import questions from './questions_reducer'
import answers from './answers_reducer'
import comments from './comments_reducer'
import profile from './profile_reducer'
import detailTopic from './detail_topic_reducer'
import filters from './filters_reducer'
import searchQuestions from './search_questions_reducer'

const rootReducer = combineReducers({
    app,
    form,
    auth,
    topics,
    detailTopic,
    questions,
    answers,
    comments,
    profile,
    filters,
    searchQuestions
})

export default rootReducer