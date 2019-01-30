import { combineReducers } from 'redux'
import app from './app_reducer'
import auth from './auth_reducer'

const rootReducer = combineReducers({
    app,
    auth
})

export default rootReducer