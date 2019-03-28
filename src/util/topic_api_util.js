import { sendRequest } from './request_util'
import { API_URL } from './constant'

export const fetchTopics = params => {
  return sendRequest({
    method: 'GET',
    url: API_URL.GET_TOPICS,
    params
  })
}

export const fetchTopic = (id) => {
  return sendRequest({
    method: 'GET',
    url: `${API_URL.GET_TOPICS}/${id}`,
  })
}

export const followTopic = (id) => {
  return sendRequest({
    method: 'POST',
    url: API_URL.FOLLOW_TOPIC,
    data: {
      topic_id: id,
    }
  })
}

export const unfollowTopic = (id) => {
  return sendRequest({
    method: 'POST',
    url: API_URL.UNFOLLOW_TOPIC,
    data: {
      topic_id: id,
    }
  })
}
