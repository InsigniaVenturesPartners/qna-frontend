import merge from 'lodash/merge'
import {RECEIVE_PROFILE_QUESTIONS, RECEIVE_PROFILE_ANSWERS, UPDATE_QUESTION} from '../actions/profile_actions'
import {RECEIVE_ANSWER_FROM_DRAFT} from '../actions/answer_actions'

const defaultState = {};

const ProfileReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROFILE_QUESTIONS:
      return {questions: action.questions.data};
    case RECEIVE_PROFILE_ANSWERS:
      return {answers: action.answers.data};
    case UPDATE_QUESTION:
      let oldState = merge({}, state)
      oldState.questions[action.question.data.id] = action.question.data;
      return oldState;
    case RECEIVE_ANSWER_FROM_DRAFT :
      merge({},state,{answers: {[action.answer.data.id]: action.answer.data}});
    default:
      return state;
  }
};

export default ProfileReducer
