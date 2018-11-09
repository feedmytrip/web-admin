import Axios from 'axios'
import _ from 'lodash'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API
})

const state = {
  categories: [],
  geonames: []
}

const getters = {
  category: state => categoryId => {
    return _.find(state.categories, { categoryId: categoryId })
  },
  categories: state => {
    return state.categories
  },
  geoname: state => geonameId => {
    return _.find(state.geonames, { geonameId: geonameId })
  },
  geonames: state => {
    return state.geonames
  }
}

const actions = {
  async getAuxiliaryData ({ dispatch }) {
    await dispatch('getAllGeonames')
    await dispatch('getAllCategories')
  },
  async getAllGeonames ({ commit, rootGetters }) {
    try {
      const response = await axios.get('/geonames', {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initGeonames', response.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getAllCategories ({ commit, rootGetters }) {
    try {
      const response = await axios.get('/categories', {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initCategories', response.data)
    } catch (error) {
      console.log(error)
    }
  },
  newGeoname ({ commit, rootGetters }, geoname) {
    return new Promise((resolve, reject) => {
      axios
        .post('/geonames', JSON.stringify(geoname), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('addGeoname', response.data)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  newCategory ({ commit, rootGetters }, category) {
    return new Promise((resolve, reject) => {
      axios
        .post('/categories', JSON.stringify(category), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('addCategory', response.data)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateGeoname ({ commit, rootGetters }, geoname) {
    return new Promise((resolve, reject) => {
      axios
        .patch('/geonames/' + geoname.geonameId, JSON.stringify(geoname), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('updateGeoname', response.data)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateCategory ({ commit, rootGetters }, category) {
    return new Promise((resolve, reject) => {
      axios
        .patch('/categories/' + category.categoryId, JSON.stringify(category), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('updateCategory', response.data)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteGeoname ({ commit, rootGetters }, geonameId) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/geonames/' + geonameId, {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('deleteGeoname', geonameId)
          resolve()
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  deleteCategory ({ commit, rootGetters }, categoryId) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/categories/' + categoryId, {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('deleteCategory', categoryId)
          resolve()
        })
        .catch(err => {
          console.log(err)
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
  updateGeoname (state, geoname) {
    const oldIndex = _.findIndex(state.geonames, {
      geonameId: geoname.geonameId
    })
    if (oldIndex !== -1) {
      state.geonames.splice(oldIndex, 1)
    }
    state.geonames.push(geoname)
  },
  deleteGeoname (state, geonameId) {
    const index = _.findIndex(state.geonames, { geonameId: geonameId })
    if (index !== -1) {
      state.geonames.splice(index, 1)
    }
  },
  initCategories (state, categories) {
    state.categories = [].concat(categories)
  },
  addCategory (state, category) {
    state.categories.push(category)
  },
  updateCategory (state, category) {
    const oldIndex = _.findIndex(state.categories, {
      categoryId: category.categoryId
    })
    if (oldIndex !== -1) {
      state.categories.splice(oldIndex, 1)
    }
    state.categories.push(category)
  },
  deleteCategory (state, categoryId) {
    const index = _.findIndex(state.categories, { categoryId: categoryId })
    if (index !== -1) {
      state.categories.splice(index, 1)
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
