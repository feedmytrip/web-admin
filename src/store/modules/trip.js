import Axios from 'axios'
import Vue from 'vue'
import _ from 'lodash'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API
})

const state = {
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
  events: {
    metadata: {
      page: 1,
      total: 0,
      total_filtered: 0,
      records_per_page: 30,
      source: 'trip_itinerary_event'
    },
    data: [],
    errors: []
  },
  filter: '',
  page: 1
}

const getters = {
  all: state => {
    return state.trips
  },
  getTrip: state => id => {
    return _.find(state.trips.data, ['id', id])
  },
  getTripItinerary: state => id => {
    return _.find(state.itineraries.data, ['id', id])
  },
  getTripItineraryEvents: state => {
    return state.events
  },
  filter: state => {
    return state.filter
  },
  moving: state => {
    return state.moving
  }
}

const actions = {
  async getAll ({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get('/trips' + payload, {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initTrips', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  async getAllItineraries ({ commit, rootGetters }, tripId) {
    try {
      const response = await axios.get('/trips/' + tripId + '/itineraries', {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('initTripItineraries', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  async getAllItineraryEvents ({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get(
        '/trips/' +
          payload.trip_id +
          '/itineraries/' +
          payload.itinerary_id +
          '/events',
        {
          headers: { Authorization: rootGetters['auth/token'] }
        }
      )
      commit('initTripItineraryEvents', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  async get ({ commit, rootGetters }, id) {
    try {
      const response = await axios.get('/trips/' + id, {
        headers: { Authorization: rootGetters['auth/token'] }
      })
      commit('addTrip', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  new ({ commit, rootGetters }, trip) {
    return new Promise((resolve, reject) => {
      axios
        .post('/trips', JSON.stringify(trip), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('addTrip', response.data)
          resolve()
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  addItineraryEvent ({ commit, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/trips/' +
            payload.trip_id +
            '/itineraries/' +
            payload.itinerary_id +
            '/add/' +
            payload.global_id,
          payload.event,
          {
            headers: { Authorization: rootGetters['auth/token'] }
          }
        )
        .then(response => {
          commit('addTripItineraryEvent', response.data)
          resolve()
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  update ({ commit, rootGetters }, trip) {
    return new Promise((resolve, reject) => {
      axios
        .patch('/trips/' + trip.id, JSON.stringify(trip), {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(response => {
          commit('updateTrip', response.data)
          resolve()
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  updateItinerary ({ commit, rootGetters }, itinerary) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          '/trips/' + itinerary.trip_id + '/itineraries/' + itinerary.id,
          JSON.stringify(itinerary),
          {
            headers: { Authorization: rootGetters['auth/token'] }
          }
        )
        .then(response => {
          commit('updateTripItinerary', response.data)
          resolve()
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  updateItineraryEvent ({ commit, rootGetters }, event) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          '/trips/' +
            event.trip_id +
            '/itineraries/' +
            event.itinerary_id +
            '/events/' +
            event.id,
          JSON.stringify(event),
          {
            headers: { Authorization: rootGetters['auth/token'] }
          }
        )
        .then(response => {
          commit('updateTripItineraryEvent', response.data)
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
        .delete('/trips/' + id, {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(() => {
          commit('deleteTrip', id)
          resolve()
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  deleteItinerary ({ commit, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/trips/' + payload.trip_id + '/itineraries/' + payload.id, {
          headers: { Authorization: rootGetters['auth/token'] }
        })
        .then(() => {
          commit('deleteTripItinerary', payload.id)
          resolve()
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  deleteItineraryEvent ({ commit, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          '/trips/' +
            payload.trip_id +
            '/itineraries/' +
            payload.itinerary_id +
            '/events/' +
            payload.id,
          {
            headers: { Authorization: rootGetters['auth/token'] }
          }
        )
        .then(() => {
          commit('deleteTripItineraryEvent', payload.id)
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
  initTrips (state, trips) {
    state.trips = trips
  },
  initTripItineraries (state, itineraries) {
    state.itineraries = itineraries
  },
  initTripItineraryEvents (state, events) {
    state.events = events
  },
  addTrip (state, trip) {
    state.trips.data.unshift(trip)
  },
  addTripItineraryEvent (state, event) {
    state.events.data.push(event)
  },
  updateTrip (state, trip) {
    const index = _.findIndex(state.trips.data, { id: trip.id })
    if (index !== -1) {
      Vue.set(state.trips.data, index, trip)
    } else {
      state.trips.data.push(trip)
    }
  },
  updateTripItinerary (state, itinerary) {
    const index = _.findIndex(state.itineraries.data, { id: itinerary.id })
    if (index !== -1) {
      Vue.set(state.itineraries.data, index, itinerary)
    } else {
      state.itineraries.data.push(itinerary)
    }
  },
  updateTripItineraryEvent (state, event) {
    const index = _.findIndex(state.events.data, { id: event.id })
    if (index !== -1) {
      Vue.set(state.events.data, index, event)
    } else {
      state.itineraries.data.push(event)
    }
  },
  deleteTrip (state, id) {
    const index = _.findIndex(state.trips.data, { id: id })
    if (index !== -1) {
      state.trips.data.splice(index, 1)
    }
  },
  deleteTripItinerary (state, id) {
    const index = _.findIndex(state.itineraries.data, { id: id })
    if (index !== -1) {
      state.itineraries.data.splice(index, 1)
    }
  },
  deleteTripItineraryEvent (state, id) {
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
