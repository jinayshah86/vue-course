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
    events: []
  },
  // Mutations are synchronous
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
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
    }
  },
  getters: {}
})
