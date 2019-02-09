import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API
})

const state = {
  itineraries: {
    metadata: {
      page: 1,
      total: 0,
      total_filtered: 0,
      records_per_page: 30,
      source: 'trip_itinerary'
    },
    data: [],
    errors: []
  },
  filter: '',
  page: 1
}

const getters = {
  all: state => {
    return state.itineraries
  }
}

const actions = {
  async getAllGlobal ({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get('/trips/global/itineraries' + payload, {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initItineraries', response.data)
    } catch (err) {
      console.log(err)
    }
  }
}

const mutations = {
  initItineraries (state, itineraries) {
    state.itineraries = itineraries
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
