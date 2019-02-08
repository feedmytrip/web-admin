import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import highlights from './modules/highlight'
import auxiliary from './modules/auxiliary'
import events from './modules/event'
import schedules from './modules/eventSchedule'
import trips from './modules/trip'
import users from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    title: '',
    subtitle: '',
    timelineSwapDay: 0
  },
  getters: {
    title: state => {
      return state.title
    },
    subtitle: state => {
      return state.subtitle
    },
    timelineSwapDay: state => {
      return state.timelineSwapDay
    }
  },
  mutations: {
    setTitle (state, title) {
      state.title = title
    },
    setSubtitle (state, subtitle) {
      state.subtitle = subtitle
    },
    setTimelineSwapDay (state, swapping) {
      state.timelineSwapDay = swapping
    }
  },
  modules: {
    auth,
    highlights,
    auxiliary,
    events,
    schedules,
    trips,
    users
  },
  strict: debug
})
