import merge from 'lodash/merge';

import {RECEIVE_COMMENTS, RECEIVE_COMMENT, UPDATE_COMMENT} from '../actions/comment_actions.js'

const defaultState = {};

const CommentsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return merge({}, state, action.comments.data);
    case RECEIVE_COMMENT:
      return merge({},state,{[action.comment.data.id]: action.comment.data});
    case UPDATE_COMMENT:
      let oldState = merge({}, state);
      oldState[action.comment.data.id] = action.comment.data;
      return oldState;
    default:
      return state;
  }
};

export default CommentsReducer
