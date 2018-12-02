import Axios from 'axios'
import Vue from 'vue'
import _ from 'lodash'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API
})

const state = {
  users: {
    metadata: {
      page: 1,
      total: 0,
      total_filtered: 0,
      records_per_page: 30,
      source: 'user'
    },
    data: [],
    errors: []
  },
  filter: '',
  page: 1
}

const getters = {
  all: state => {
    return state.users
  },
  filter: state => {
    return state.filter
  }
}

const actions = {
  async getAll ({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get('/users' + payload, {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initUsers', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  async get ({ commit, rootGetters }, id) {
    try {
      const response = await axios.get('/users/' + id, {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('addUser', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  new ({ commit, rootGetters }, credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/register', JSON.stringify(credentials), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('addUser', response.data)
          resolve(response.data)
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  update ({ commit, rootGetters }, user) {
    return new Promise((resolve, reject) => {
      axios
        .patch('/users/' + user.id, JSON.stringify(user), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('updateUser', response.data)
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
        .delete('/users/' + id, {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(() => {
          commit('deleteUser', id)
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
  initUsers (state, users) {
    state.users = users
  },
  addUser (state, user) {
    state.users.data.unshift(user)
  },
  updateUser (state, user) {
    const index = _.findIndex(state.users.data, { id: user.id })
    if (index !== -1) {
      Vue.set(state.users.data, index, user)
    } else {
      state.users.data.push(user)
    }
  },
  deleteUser (state, id) {
    const index = _.findIndex(state.users.data, { id: id })
    if (index !== -1) {
      state.users.data.splice(index, 1)
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
