import _ from 'lodash'
import merge from 'lodash/merge'

import {RECEIVE_DRAFTS, RECEIVE_DRAFT} from '../actions/draft_actions'
import {RECEIVE_ANSWER_FROM_DRAFT} from '../actions/answer_actions'

const defaultState = {}

const DraftsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
  	case RECEIVE_DRAFTS:
      return merge({}, state, action.drafts.data);
    case RECEIVE_DRAFT:
      return merge({},state,{[action.draft.data.id]: action.draft.data});
    case RECEIVE_ANSWER_FROM_DRAFT:
      const deletedDraft = _.find(state, ['question.id', action.answer.data.question.id])
      const drafts = _.extend({}, state)

      if (deletedDraft) {
        return _.omit(drafts, [deletedDraft.id])
      } else {
        return drafts
      }
    default:
      return state;
  }
}

export default DraftsReducer
