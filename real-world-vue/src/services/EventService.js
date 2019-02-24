import axios from 'axios'
import NProgress from 'nprogress'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

// These interceptors acts like middleware
// Caveat #1 - Not optimal for multiple API calls at the same time
// Caveat #2 - Templates get rendered before the API call is returned

apiClient.interceptors.request.use(config => {
  NProgress.start()
  return config
})

apiClient.interceptors.response.use(response => {
  NProgress.done()
  return response
})

export default {
  getEvents(pageLimit, page) {
    return apiClient.get('/events?_limit=' + pageLimit + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
