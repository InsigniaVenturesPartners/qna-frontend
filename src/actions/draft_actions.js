import * as APIUtil from '../util/draft_api_util'

export const RECEIVE_DRAFTS = 'RECEIVE_DRAFTS';
export const RECEIVE_DRAFT = 'RECEIVE_DRAFT';

export const receiveDrafts = drafts => ({
  type: RECEIVE_DRAFTS,
  drafts
});

export const receiveDraft = draft => ({
  type: RECEIVE_DRAFT,
  draft
});

export const fetchDrafts = () => dispatch => (
  APIUtil.fetchDrafts().then(
    drafts=>(dispatch(receiveDrafts(drafts))
  ))
);

export const saveDraft = (body, questionId) => dispatch => (
  APIUtil.saveDraft(body, questionId).then(
    draft=>(dispatch(receiveDraft(draft))
  ))
);

export const fetchQuestionDraft = questionId => dispatch => (
  APIUtil.fetchQuestionDraft(questionId).then(
    draft=>(dispatch(receiveDraft(draft))
  ))
);