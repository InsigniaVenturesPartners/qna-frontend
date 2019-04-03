import { sendRequest } from './request_util'
import { API_URL } from './constant'

export const fetchQuestions = (params) => {
  return sendRequest({
    method: 'GET',
    url: API_URL.GET_QUESTIONS,
    params
  })
}

export const fetchTopQuestions = () => {
  return sendRequest({
    method: 'GET',
    url: API_URL.GET_TOP_QUESTIONS
  })
}

export const fetchQuestion = (id) => {
  return sendRequest({
    method: 'GET',
    url: `${API_URL.GET_QUESTIONS}/${id}`,
  })
}

export const createQuestion = (body, topics) => {
  return sendRequest({
    method: 'POST',
    url: API_URL.CREATE_QUESTION,
    data: {
      question: {
        topics: topics,
        body
      }
    }
  })
}

export const editQuestion = (body, question_id) => {
  return sendRequest({
    method: 'PUT',
    url: `${API_URL.UPDATE_QUESTION}/${question_id}`,
    data: {
      question: {
        body
      }
    }
  })
}

export const voteOnQuestion = (id, type) => {
  return sendRequest({
    method: 'POST',
    url: API_URL.VOTE_QUESTION,
    data: {
      question_id: id,
      type
    }
  })
}

export const followQuestion = (id) => {
  return sendRequest({
    method: 'POST',
    url: API_URL.FOLLOW_QUESTION,
    data: {
      question_id: id,
    }
  })
}

export const unfollowQuestion = (id) => {
  return sendRequest({
    method: 'POST',
    url: API_URL.UNFOLLOW_QUESTION,
    data: {
      question_id: id,
    }
  })
}