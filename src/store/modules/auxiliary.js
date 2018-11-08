import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.VUE_APP_API
})

const state = {
  categories: [],
  geonames: []
}

const getters = {
  categories: (state) => {
    return state.categories
  },
  geonames: (state) => {
    return state.geonames
  }
}

const actions = {
  async getAuxiliaryData({ commit, dispatch, rootGetters } ) {
      await dispatch('getAllGeonames')
      await dispatch('getAllCategories')
  },
  async getAllGeonames ({ commit, rootGetters } ) {
    try{
      const response = await axios.get('/geonames', { headers: { Authorization: rootGetters['auth/token'] } })
      commit('initGeonames', response.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getAllCategories ({ commit, rootGetters } ) {
    try{
      const response = await axios.get('/categories', { headers: { Authorization: rootGetters['auth/token'] } })
      commit('initCategories', response.data)
    } catch (error) {
      console.log(error)
    }
  },
  newGeoname ({ commit, rootGetters }, geoname ) {
    return new Promise((resolve, reject) => {  
      axios.post('/geonames', geoname, { headers: { Authorization: rootGetters['auth/token'] } })
      .then(response => {
        commit('addGeoname', response.data)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  newCategory ({ commit, rootGetters }, category ) {
    return new Promise((resolve, reject) => {  
      axios.post('/categories', category, { headers: { Authorization: rootGetters['auth/token'] } })
      .then(response => {
        commit('addCategory', response.data)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

const mutations = {
  initGeonames (state, geonames) {
    state.geonames = [].concat(geonames)
  },
  addGeoname (state, geoname) {
    state.geonames.push(geoname)
  },
  initCategories (state, categories) {
    state.categories = [].concat(categories)
  },
  addCategory (state, category) {
    state.categories.push(category)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}