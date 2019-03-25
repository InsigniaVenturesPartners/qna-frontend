import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import app from './app_reducer'
import auth from './auth_reducer'
import questions from './questions_reducer'

const rootReducer = combineReducers({
    app,
    form,
    auth,
    questions
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