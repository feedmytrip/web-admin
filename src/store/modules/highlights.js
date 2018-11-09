import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API
})

const state = {
  all: []
}

const getters = {
  all: state => {
    return state.all
  }
}

const actions = {
  async getAll ({ commit, rootGetters }) {
    try {
      const response = await axios.get('/highlights', {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('init', response.data)
    } catch (error) {
      console.log(error)
    }
  }
}

const mutations = {
  init (state, highlights) {
    state.all = [].concat(highlights)
  },
  add (state, highlight) {
    state.all.push(highlight)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
