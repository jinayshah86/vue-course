import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 'abc123',
      name: 'Adam Jahr'
    },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    totalEvents: 0,
    event: {}
  },
  // Mutations are synchronous
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTAL_EVENTS(state, totalEvents) {
      state.totalEvents = totalEvents
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  // Actions are asynchronous
  // Call mutations from actions only
  // - This future proofs your apps
  actions: {
    createEvent({ commit }, event) {
      // API Call
      EventService.postEvent(event).then(() => {
        // Call mutation
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { pageLimit, page }) {
      EventService.getEvents(pageLimit, page)
        .then(response => {
          console.log(response.headers['x-total-count'])
          commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.error('There was an error:' + error.response)
        })
    },
    fetchEvent({ commit, getters }, eventId) {
      // Try to find it from store
      var event = getters.getEventById(eventId)
      // If it's there no need to make an API Call
      if (event) {
        commit('SET_EVENT', event)
      }
      // If it's not there make an API Call
      else {
        EventService.getEvent(eventId)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.error('An error has occured: ', error.response)
          })
      }
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
