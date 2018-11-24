import Axios from 'axios'
import _ from 'lodash'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API
})

const state = {
  events: {
    metadata: {
      page: 1,
      total: 0,
      total_filtered: 0,
      records_per_page: 30,
      source: 'event'
    },
    data: [],
    errors: []
  },
  filter: '',
  page: 1
}

const getters = {
  all: state => {
    return state.events
  },
  getEvent: state => id => {
    return _.find(state.events.data, ['id', id])
  },
  filter: state => {
    return state.filter
  }
}

const actions = {
  async getAll ({ state, commit, rootGetters }, payload) {
    try {
      const response = await axios.get('/events' + payload + '&results=2', {
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
        .patch('/events/' + event.id, JSON.stringify(event), {
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
  delete ({ commit, rootGetters }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/events/' + id, {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(() => {
          commit('deleteEvent', id)
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
    state.events = events
  },
  addEvent (state, event) {
    state.events.data.unshift(event)
  },
  updateEvent (state, event) {
    const index = _.findIndex(state.events.data, { id: event.id })
    if (index !== -1) {
      state.events.data.splice(index, 1)
    }
    state.events.data.push(event)
  },
  deleteEvent (state, id) {
    const index = _.findIndex(state.events.data, { id: id })
    if (index !== -1) {
      state.events.data.splice(index, 1)
    }
  },
  setFilter (state, filter) {
    state.filter = filter
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
