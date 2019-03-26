import { sendRequest } from './request_util'
import { API_URL } from './constant'

export const fetchQuestionDraft = (question_id) => (
  return sendRequest({
    method: 'GET',
    url: API_URL.GET_DRAFTS,
    data: {
      question_id
    }
  })
);

export const saveDraft = (body, question_id) => (
  return sendRequest({
    method: 'POST',
    url: API_URL.CREATE_DRAFT,
    data: {
      draft: {
        body
      },
      question_id
    }
  })
);