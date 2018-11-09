import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API
})

const state = {
  events: []
}

const getters = {
  events: state => {
    return state.events
  }
}

const actions = {}
