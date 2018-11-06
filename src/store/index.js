import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import highlights from './modules/highlights'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        auth,
        highlights
    },
    strict: debug
})