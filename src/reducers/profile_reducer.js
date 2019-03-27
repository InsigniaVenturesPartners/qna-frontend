import merge from 'lodash/merge';

import {RECEIVE_PROFILE_QUESTIONS, RECEIVE_PROFILE_ANSWERS} from '../actions/profile_actions.js'

const defaultState = {};

const ProfileReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROFILE_QUESTIONS:
      return {questions: action.questions.data};
    case RECEIVE_PROFILE_ANSWERS:
      return {answers: action.answers.data};
    default:
      return state;
  }
};

export default ProfileReducer
