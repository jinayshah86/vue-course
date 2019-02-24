import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  totalEvents: 0,
  event: {}
}
// Mutations are synchronous
export const mutations = {
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
}
// Actions are asynchronous
// Mutaions should only be called from Action inside the current
// module and from nowhere else (This future proofs your apps)
// To call action of another module use
// dispatch('moduleName/actionToCall', payload, { root: true })
export const actions = {
  createEvent({ commit, dispatch }, event) {
    // API Call
    return EventService.postEvent(event)
      .then(() => {
        // Call mutation
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been successfully created!'
        }
        // Calling action of notification module
        dispatch('notification/add', notification, {
          root: true
        })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        // Calling action of notification module
        dispatch('notification/add', notification, {
          root: true
        })
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { pageLimit, page }) {
    EventService.getEvents(pageLimit, page)
      .then(response => {
        commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        // Calling action of notification module
        dispatch('notification/add', notification, {
          root: true
        })
      })
  },
  fetchEvent({ commit, getters, dispatch }, eventId) {
    // Try to find it from store
    var event = getters.getEventById(eventId)
    // If it's there no need to make an API Call
    if (event) {
      commit('SET_EVENT', event)
      return event // <--- Added return here
    }
    // If it's not there make an API Call
    else {
      // Return the promise
      return EventService.getEvent(eventId)
        .then(response => {
          commit('SET_EVENT', response.data)
          return response.data // <--- Added return here
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + error.message
          }
          // Calling action of notification module
          dispatch('notification/add', notification, {
            root: true
          })
        })
    }
  }
}
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
