import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import highlights from './modules/highlights'
import auxiliary from './modules/auxiliary'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        auth,
        highlights,
        auxiliary
    },
    strict: debug
})