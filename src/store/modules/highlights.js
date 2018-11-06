import Axios from 'axios'
import Vue from 'vue'
import _ from 'lodash'

const axios = Axios.create({
    baseURL: 'https://ggwiupja70.execute-api.sa-east-1.amazonaws.com/beta'
})

const state = {
  all: []
}

const getters = {
  all: (state) => {
    return state.all
  }
}

const actions = {
  async getAll ({ commit, rootGetters } ) {
    try{
      const config = {
        headers: {
          'Authorization': rootGetters['auth/token']
        }
      }
      const response = await axios.get('/highlights', config)
      commit('init', response.data)
    } catch (error) {
      console.log(error)
    }
  }
}

const mutations = {
  init (state, highlights) {
    Vue.set(state, 'all', highlights)  
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