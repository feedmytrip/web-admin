import Axios from 'axios'
import Vue from 'vue'
import _ from 'lodash'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API
})

const state = {
  highlights: {
    metadata: {
      page: 1,
      total: 0,
      total_filtered: 0,
      records_per_page: 30,
      source: 'highlight'
    },
    data: [],
    errors: []
  },
  filter: '',
  page: 1,
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
  trips: {
    metadata: {
      page: 1,
      total: 0,
      total_filtered: 0,
      records_per_page: 30,
      source: 'trip'
    },
    data: [],
    errors: []
  },
  images: {
    metadata: {
      page: 1,
      total: 0,
      total_filtered: 0,
      records_per_page: 30,
      source: 'highlight_image'
    },
    data: [],
    errors: []
  }
}

const getters = {
  all: state => {
    return state.highlights
  },
  trips: state => {
    return state.trips
  },
  events: state => {
    return state.events
  },
  images: state => {
    return state.images
  },
  getHighlight: state => id => {
    return _.find(state.highlights.data, ['id', id])
  },
  filter: state => {
    return state.filter
  }
}

const actions = {
  async getAll ({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get('/highlights' + payload, {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initHighlights', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  async getAllTrips ({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get('/trips' + payload, {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initTrips', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  async getAllEvents ({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get('/events' + payload, {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initEvents', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  async getAllImages ({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get('/highlights/' + payload + '/images', {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initHighlightImages', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  async get ({ commit, rootGetters }, id) {
    try {
      const response = await axios.get('/highlights/' + id, {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('addHighlight', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  new ({ commit, rootGetters }, highlight) {
    return new Promise((resolve, reject) => {
      axios
        .post('/highlights', JSON.stringify(highlight), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('addHighlight', response.data)
          resolve(response.data)
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  async newImage ({ commit, rootGetters }, image) {
    try {
      const response = await axios.post(
        '/highlights/' + image.highlight_id + '/images',
        JSON.stringify(image),
        {
          headers: { Authorization: rootGetters['auth/token'] }
        }
      )
      commit('addHighlightImage', response.data)
    } catch (err) {
      console.log(err.response)
    }
  },
  update ({ commit, rootGetters }, highlight) {
    return new Promise((resolve, reject) => {
      axios
        .patch('/highlights/' + highlight.id, JSON.stringify(highlight), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('updateHighlight', response.data)
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
        .delete('/highlights/' + id, {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(() => {
          commit('deleteHighlight', id)
          resolve()
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  deleteImage ({ commit, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/highlights/' + payload.id + '/images/' + payload.image_id, {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(() => {
          commit('deleteHighlightImage', payload.image_id)
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
  initHighlights (state, highlights) {
    state.highlights = highlights
  },
  initTrips (state, trips) {
    state.trips = trips
  },
  initEvents (state, events) {
    state.events = events
  },
  initHighlightImages (state, images) {
    state.images = images
  },
  addHighlight (state, highlight) {
    state.highlights.data.unshift(highlight)
  },
  addHighlightImage (state, image) {
    state.images.data.push(image)
  },
  updateHighlight (state, highlight) {
    const index = _.findIndex(state.highlights.data, { id: highlight.id })
    if (index !== -1) {
      Vue.set(state.highlights.data, index, highlight)
    } else {
      state.highlights.data.push(highlight)
    }
  },
  deleteHighlight (state, id) {
    const index = _.findIndex(state.highlights.data, { id: id })
    if (index !== -1) {
      state.highlights.data.splice(index, 1)
    }
  },
  deleteHighlightImage (state, id) {
    const index = _.findIndex(state.images.data, { id: id })
    if (index !== -1) {
      state.images.data.splice(index, 1)
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
