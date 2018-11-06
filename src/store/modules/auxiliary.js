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
  }
}

const actions = {
  async getAllCategories ({ commit, rootGetters } ) {
    try{
      const response = await axios.get('/categories', { headers: { Authorization: rootGetters['auth/token'] } })
      commit('initCategories', response.data)
    } catch (error) {
      console.log(error)
    }
  },
  async newCategory ({ commit, rootGetters }, category ) {
    try{
      const response = await axios.post('/categories', category, { headers: { Authorization: rootGetters['auth/token'] } })
      commit('addCategory', response.data)
    } catch (error) {
      console.log(error)
    }
  }
}

const mutations = {
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