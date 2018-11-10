import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import highlights from './modules/highlights'
import auxiliary from './modules/auxiliary'
import events from './modules/event'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    title: '',
    subtitle: '',
    initialized: false
  },
  getters: {
    title: state => {
      return state.title
    },
    subtitle: state => {
      return state.subtitle
    },
    initialized: state => {
      return state.initialized
    }
  },
  actions: {
    initStore ({ dispatch, commit }) {
      return new Promise(async (resolve, reject) => {
        await dispatch('events/getAll')
        await dispatch('auxiliary/getAuxiliaryData')
        commit('setInitialized', true)
        resolve()
      })
    }
  },
  mutations: {
    setTitle (state, title) {
      state.title = title
    },
    setSubtitle (state, subtitle) {
      state.subtitle = subtitle
    },
    setInitialized (state, value) {
      state.initialized = value
    }
  },
  modules: {
    auth,
    highlights,
    auxiliary,
    events
  },
  strict: debug
})
