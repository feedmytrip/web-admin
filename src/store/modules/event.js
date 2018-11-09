import Axios from 'axios'
import _ from 'lodash'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API
})

const state = {
  events: []
}

const getters = {
  all: state => {
    return state.events
  }
}

const actions = {
  async getAll ({ commit, rootGetters }) {
    try {
      const response = await axios.get('/events', {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initEvents', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  new ({ commit, rootGetters }, event) {
    return new Promise((resolve, reject) => {
      axios
        .post('/events', JSON.stringify(event), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('addEvent', response.data)
          resolve()
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  update ({ commit, rootGetters }, event) {
    return new Promise((resolve, reject) => {
      axios
        .patch('/events/' + event.eventId, JSON.stringify(event), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('updateEvent', response.data)
          resolve()
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  delete ({ commit, rootGetters }, eventId) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/events/' + eventId, {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(() => {
          commit('deleteEvent', eventId)
          resolve()
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  }
}

const mutations = {
  initEvents (state, events) {
    state.events = [].concat(events)
  },
  addEvent (state, event) {
    state.events.push(event)
  },
  updateEvent (state, event) {
    const index = _.findIndex(state.events, { eventId: event.eventId })
    if (index !== -1) {
      state.events.splice(index, 1)
    }
    state.events.push(event)
  },
  deleteEvent (state, eventId) {
    const index = _.findIndex(state.events, { eventId: eventId })
    if (index !== -1) {
      state.events.splice(index, 1)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
