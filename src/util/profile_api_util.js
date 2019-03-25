import { sendRequest } from './request_util'
import { API_URL } from './constant'

export const fetchProfileQuestions = () => (
  $.ajax({
    method: 'GET',
    url: API_URL.GET_PROFILE_QUESTIONS
  })
);

export const fetchProfileAnswers = () => (
  $.ajax({
    method: 'GET',
    url: API_URL.GET_PROFILE_ANSWERS
  })
);