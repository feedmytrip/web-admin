import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import highlights from './modules/highlights'
import auxiliary from './modules/auxiliary'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        title: '',
        subtitle: ''
    },
    getters: {
        title: (state) => {
            return state.title
        },
        subtitle: (state) => {
            return state.subtitle
        }
    },
    mutations: {
        setTitle(state, title) {
            state.title = title
        },
        setSubtitle(state, subtitle) {
            state.subtitle = subtitle
        }
    },
    modules: {
        auth,
        highlights,
        auxiliary
    },
    strict: debug
})