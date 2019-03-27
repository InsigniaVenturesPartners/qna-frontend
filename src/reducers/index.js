import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import app from './app_reducer'
import auth from './auth_reducer'
import topics from './topics_reducer'
import questions from './questions_reducer'
import answers from './answers_reducer'
import comments from './comments_reducer'
import profile from './profile_reducer'

const rootReducer = combineReducers({
    app,
    form,
    auth,
    topics,
    questions,
    answers,
    comments,
    profile
})

export default rootReducer



// const RootReducer = combineReducers({
//   session: SessionReducer,
//   auth: AuthReducer,
//   errors: ErrorsReducer,
//   topics: TopicsReducer,
//   detailTopic: DetailTopicReducer,
//   questions: QuestionsReducer,
//   answers: AnswersReducer,
//   filters: FiltersReducer,
//   searchQuestions: SearchQuestionsReducer,
//   searchTopics: SearchTopicsReducer,
//   comments: CommentsReducer,
// });