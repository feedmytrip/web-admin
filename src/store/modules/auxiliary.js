import Axios from 'axios'
import _ from 'lodash'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API
})

const state = {
  categories: {
    metadata: {},
    data: [],
    errors: []
  },
  mainCategories: [],
  secondaryCategories: [],
  locations: {
    metadata: {},
    data: [],
    errors: []
  },
  countries: [],
  regions: [],
  cities: []
}

const getters = {
  category: state => id => {
    return _.find(state.categories.data, { id: id })
  },
  categories: state => {
    return state.categories
  },
  mainCategories: state => {
    return state.mainCategories
  },
  secondaryCategories: state => {
    return state.secondaryCategories
  },
  location: state => id => {
    return _.find(state.locations.data, { id: id })
  },
  locations: state => {
    return state.locations
  },
  locationCountries: state => {
    return state.countries
  },
  locationRegions: state => {
    return state.regions
  },
  locationCities: state => {
    return state.cities
  }
}

const actions = {
  async getLocationCountries ({ commit, rootGetters }) {
    try {
      const response = await axios.get('/locations?country_id=is_null', {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initLocationCountries', response.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getLocationRegions ({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get(
        '/locations?country_id=' + payload + '&region_id=is_null',
        {
          headers: { Authorization: rootGetters['auth/token'] }
        }
      )
      commit('initLocationRegions', response.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getLocationCities ({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get('/locations?region_id=' + payload, {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initLocationCities', response.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getAllLocations ({ commit, rootGetters }) {
    try {
      const response = await axios.get('/locations', {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initLocations', response.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getMainCategories ({ commit, rootGetters }) {
    try {
      const response = await axios.get('/categories?parent_id=is_null', {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initMainCategories', response.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getSecondaryCategories ({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get('/categories?parent_id=' + payload, {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initSecondaryCategories', response.data)
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
  newLocation ({ commit, rootGetters }, location) {
    console.log(JSON.stringify(location))
    return new Promise((resolve, reject) => {
      axios
        .post('/locations', JSON.stringify(location), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('addLocation', response.data)
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
  updateLocation ({ commit, rootGetters }, location) {
    return new Promise((resolve, reject) => {
      axios
        .patch('/locations/' + location.id, JSON.stringify(location), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('updateLocation', response.data)
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
        .patch('/categories/' + category.id, JSON.stringify(category), {
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
  deleteLocation ({ commit, rootGetters }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/locations/' + id, {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('deleteLocation', id)
          resolve()
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  deleteCategory ({ commit, rootGetters }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/categories/' + id, {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('deleteCategory', id)
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
  initLocations (state, locations) {
    state.locations = locations
  },
  initLocationCountries (state, countries) {
    state.countries = [].concat(countries.data)
  },
  initLocationRegions (state, regions) {
    state.regions = [].concat(regions.data)
  },
  initLocationCities (state, cities) {
    state.cities = [].concat(cities.data)
  },
  emptyLocationCountries (state) {
    state.countries.splice(0, state.countries.length)
  },
  emptyLocationRegions (state) {
    state.regions.splice(0, state.regions.length)
  },
  emptyLocationCities (state) {
    state.cities.splice(0, state.cities.length)
  },
  addLocation (state, location) {
    state.locations.data.push(location)
  },
  updateLocation (state, location) {
    const oldIndex = _.findIndex(state.locations.data, {
      id: location.id
    })
    if (oldIndex !== -1) {
      state.locations.data.splice(oldIndex, 1)
    }
    state.locations.data.push(location)
  },
  deleteLocation (state, id) {
    const index = _.findIndex(state.locations.data, { id: id })
    if (index !== -1) {
      state.locations.data.splice(index, 1)
    }
  },
  initMainCategories (state, categories) {
    state.mainCategories = [].concat(categories.data)
  },
  initSecondaryCategories (state, categories) {
    state.secondaryCategories = [].concat(categories.data)
  },
  emptyMainCategories (state) {
    state.mainCategories.splice(0, state.mainCategories.length)
  },
  emptySecondaryCategories (state) {
    state.secondaryCategories.splice(0, state.secondaryCategories.length)
  },
  initCategories (state, categories) {
    state.categories = categories
  },
  addCategory (state, category) {
    state.categories.data.push(category)
  },
  updateCategory (state, category) {
    const oldIndex = _.findIndex(state.categories.data, {
      id: category.id
    })
    if (oldIndex !== -1) {
      state.categories.data.splice(oldIndex, 1)
    }
    state.categories.data.push(category)
  },
  deleteCategory (state, id) {
    const index = _.findIndex(state.categories.data, { id: id })
    if (index !== -1) {
      state.categories.data.splice(index, 1)
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
