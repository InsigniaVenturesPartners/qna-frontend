import { sendRequest, fetchRequest } from './request_util'
import { API_URL } from './constant'

export const fetchComments = (id, type) => {
  return fetchRequest(API_URL.GET_COMMENTS, {
    params: {
      id: id,
      type: type
    }
  })
};

// export const fetchQuestionComments = (question_id) => (
//   $.ajax({
//     method: 'GET',
//     url: 'api/comments',
//     data: {
//       question_id
//     }
//   })
// );
//
//
// export const fetchAnswerComments = (answer_id) => (
//   $.ajax({
//     method: 'GET',
//     url: 'api/comments',
//     data: {
//       answer_id
//     }
//   })
// );
//
// export const fetchUserComments = (user_id) => (
//   $.ajax({
//     method: 'GET',
//     url: 'api/comments',
//     data: {
//       user_id
//     }
//   })
// );

export const fetchComment = (id) => {
  return sendRequest({
    method: 'GET',
    url: `${API_URL.GET_COMMENTS}/${id}`,
  })
};


export const voteOnComment = (id, type) => {
  return sendRequest({
    method: 'POST',
    url: API_URL.VOTE_COMMENT,
    data: {
      comment_id: id,
      type
    }
  })
};

export const createComment = (commentableClass, commentableId, body) => {
  return sendRequest({
    method: 'POST',
    url: API_URL.CREATE_COMMENT,
    data: {
      commentableClass,
      commentableId,
      body
    }
  })
};
