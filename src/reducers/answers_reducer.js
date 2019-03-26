import merge from 'lodash/merge';

import {RECEIVE_ANSWERS, RECEIVE_ANSWER, UPDATE_ANSWER} from '../actions/answer_actions.js'

const defaultState = {};

const AnswersReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ANSWERS:
      return merge({}, state, action.answers.data);
    case RECEIVE_ANSWER:
      return merge({},state,{[action.answer.data.id]: action.answer.data});
    case UPDATE_ANSWER:
      let oldState = merge({}, state);
      oldState[action.answer.id] = action.answer;
      return oldState;
    default:
      return state;
  }
};

export default AnswersReducer
