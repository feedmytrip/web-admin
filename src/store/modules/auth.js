import { Auth } from 'aws-amplify'
 
const state = {
  user: null,
  signedIn : false
}

const getters = {
  userSignedIn: (state) => {
    return state.signedIn
  },
  token: (state) => {
    if (state.user) {
      return state.user.getSignInUserSession().getIdToken().getJwtToken()
    }
    return ''
  },
  user: (state) => {
    return state.user
  }
}

const actions = {
  login ({ commit, dispatch }, credentials ) {
    return new Promise((resolve, reject) => {  
      Auth.signIn(credentials.username, credentials.password)
      .then(user => {
        commit('setUser', user)
        resolve()  
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
    state.signedIn = true
  },
  logout (state) {
    state.user = null
    state.signedIn = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}