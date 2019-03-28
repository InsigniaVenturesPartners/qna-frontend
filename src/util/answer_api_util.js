import { sendRequest } from './request_util'
import { API_URL } from './constant'

export const fetchQuestionAnswers = (question_id) => {
  return sendRequest({
    method: 'GET',
    url: API_URL.GET_ANSWERS,
    params: {
      question_id
    }
  })
};

export const fetchAnswer = (id) => {
  return sendRequest({
    method: 'GET',
    url: `${API_URL.GET_ANSWERS}/${id}`
  })
};

export const fetchAnswers = () => {
  return sendRequest({
    method: 'GET',
    url: API_URL.GET_ANSWERS
  })
};

export const voteOnAnswer = (id, type) => {
  return sendRequest({
    method: 'POST',
    url: API_URL.VOTE_ANSWER,
    params: {
      answer_id: id,
      type
    }
  })
};

export const createAnswer = (body, question_id) => {
  return sendRequest({
    method: 'POST',
    url: API_URL.CREATE_ANSWER,
    params: {
      answer: {
        body
      },
      question_id
    }
  })
};
