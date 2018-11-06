import Vue from 'vue'
import Router from 'vue-router'

import { Auth } from 'aws-amplify'

import Store from './store'

import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Highlights from './views/Highlights'
import Trips from './views/Trips'
import Events from './views/Events'
import Auxiliary from './views/Auxiliary'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true}
    },
    {
      path: '/highlights',
      name: 'Highlights',
      component: Highlights,
      meta: { requiresAuth: true}
    },
    {
      path: '/trips',
      name: 'Trips',
      component: Trips,
      meta: { requiresAuth: true}
    },
    {
      path: '/events',
      name: 'Events',
      component: Events,
      meta: { requiresAuth: true}
    },
    {
      path: '/auxiliary',
      name: 'Auxiliary Data',
      component: Auxiliary,
      meta: { requiresAuth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(Store.getters['auth/userSignedIn'])
    if (Store.getters['auth/userSignedIn']) {
      next();
    } else {
      await Auth.currentAuthenticatedUser()
        .then(user => {
          Store.commit('auth/setUser', user)
          next()
        })
      if (!Store.getters['auth/userSignedIn']) {
        next({path:'/login'});
      }
    }
  } else {
  next()
  }
})

export default router;