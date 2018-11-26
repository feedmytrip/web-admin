import Axios from 'axios'
import _ from 'lodash'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API
})

const state = {
  schedules: {
    metadata: {
      page: 1,
      total: 0,
      total_filtered: 0,
      records_per_page: 30,
      source: 'event_schedule'
    },
    data: [],
    errors: []
  },
  filter: '',
  page: 1
}

const getters = {
  all: state => {
    return state.schedules
  }
}

const actions = {
  async getAll ({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get(
        '/events/' + payload.event_id + '/schedules' + payload.queryString,
        {
          headers: { Authorization: rootGetters['auth/token'] }
        }
      )
      commit('initSchedule', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  new ({ commit, rootGetters }, schedule) {
    return new Promise((resolve, reject) => {
      console.log(JSON.stringify(schedule))
      axios
        .post(
          '/events/' + schedule.event_id + '/schedules',
          JSON.stringify(schedule),
          {
            headers: { Authorization: rootGetters['auth/token'] }
          }
        )
        .then(response => {
          commit('addSchedule', response.data)
          resolve()
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  delete ({ commit, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          '/events/' + payload.event_id + '/schedules/' + payload.schedule_id,
          {
            headers: { Authorization: rootGetters['auth/token'] }
          }
        )
        .then(() => {
          commit('deleteSchedule', payload.schedule_id)
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
  initSchedule (state, schedules) {
    state.schedules = schedules
  },
  addSchedule (state, schedule) {
    state.schedules.data.push(schedule)
  },
  deleteSchedule (state, id) {
    const index = _.findIndex(state.schedules.data, { id: id })
    if (index !== -1) {
      state.schedules.data.splice(index, 1)
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
