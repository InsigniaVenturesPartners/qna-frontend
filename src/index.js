import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import 'semantic-ui-css/semantic.min.css'

import App from './components/app';
import reducers from './reducers'
import AuthContainer from './components/auth_container'
import Unauthorized from './components/unauthorized'

import HomeContainer from './components/home/home_container';
import QuestionListContainer from './components/question_list/question_list_container';
import ProfilePageContainer from './components/profile/profile_page_container';
import ProfileTopicContainer from './components/profile/profile_topic_container';
import ProfileQuestionContainer from './components/profile/profile_question_container';
import ProfileAnswerContainer from './components/profile/profile_answer_container';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={browserHistory}>
            <Route component={AuthContainer}>
                <Route path='/unauthorized'>
                    <IndexRoute component={Unauthorized} />
                </Route>
                <Route path='/' component={App}>
                <IndexRoute component={HomeContainer} />
                <Route exact path="/answer" component={QuestionListContainer} />
                <Route path="/profile" component={ProfilePageContainer} />
                <Route exact path="/profile" component={ProfileTopicContainer} />
                <Route exact path="/profile/topics" component={ProfileTopicContainer} />
                <Route exact path="/profile/questions" component={ProfileQuestionContainer} />
                <Route exact path="/profile/answers" component={ProfileAnswerContainer} />

                </Route>
            </Route>
        </Router>
    </Provider>, document.querySelector('.container'));
