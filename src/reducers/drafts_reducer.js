import _ from 'lodash'
import merge from 'lodash/merge'

import {RECEIVE_DRAFTS, RECEIVE_DRAFT} from '../actions/draft_actions'
import {REMOVE_DRAFT} from '../actions/answer_actions'

const defaultState = {}

const DraftsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
  	case RECEIVE_DRAFTS:
      return merge({}, state, action.drafts.data);
    case RECEIVE_DRAFT:
      return merge({},state,{[action.draft.data.id]: action.draft.data});
    case REMOVE_DRAFT:
      const drafts = _.extend({}, state)
      const deletedDraftId = action.draftId

      if (deletedDraftId) {
        return _.omit(drafts, [deletedDraftId])
      } else {
        return drafts
      }
    default:
      return state;
  }
}

export default DraftsReducer
