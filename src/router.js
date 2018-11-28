import Vue from 'vue'
import Router from 'vue-router'

import { Auth } from 'aws-amplify'

import Store from './store'

import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Highlights from './views/Highlights'
import TripsHome from './views/trip/Home'
import TripsGlobal from './views/trip/Global'
import TripsUser from './views/trip/User'
import TripDetails from './views/trip/Details'
import Users from './views/Users'
import AuxiliaryHome from './views/auxiliary/Home'
import AuxiliaryCategories from './views/auxiliary/Category'
import AuxiliaryLocations from './views/auxiliary/Location'
import EventsHome from './views/event/Home'
import EventsGlobal from './views/event/Global'
import EventsUser from './views/event/User'
import EventsGlobalEdit from './views/event/EditGlobal'
import EventsUserEdit from './views/event/EditUser'

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
      meta: { requiresAuth: true }
    },
    {
      path: '/highlights',
      name: 'Highlights',
      component: Highlights,
      meta: { requiresAuth: true }
    },
    {
      path: '/events',
      name: 'Events',
      meta: { requiresAuth: true },
      component: EventsHome,
      redirect: '/events/global',
      children: [
        {
          path: 'global',
          name: 'GlobalEvents',
          component: EventsGlobal,
          meta: { requiresAuth: true }
        },
        {
          path: 'global/:id',
          name: 'EditGlobalEvents',
          component: EventsGlobalEdit,
          meta: { requiresAuth: true }
        },
        {
          path: 'users',
          name: 'UsersEvents',
          component: EventsUser,
          meta: { requiresAuth: true }
        },
        {
          path: 'users/:id',
          name: 'EditUsersEvents',
          component: EventsUserEdit,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/trips',
      name: 'Trips',
      meta: { requiresAuth: true },
      component: TripsHome,
      redirect: '/trips/global',
      children: [
        {
          path: 'global',
          name: 'GlobalTrips',
          component: TripsGlobal,
          meta: { requiresAuth: true }
        },
        {
          path: 'users',
          name: 'UsersTrips',
          component: TripsUser,
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          name: 'TripDetails',
          component: TripDetails,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/auxiliary',
      name: 'Auxiliary',
      meta: { requiresAuth: true },
      component: AuxiliaryHome,
      redirect: '/auxiliary/categories',
      children: [
        {
          path: 'categories',
          name: 'Categories',
          component: AuxiliaryCategories,
          meta: { requiresAuth: true }
        },
        {
          path: 'locations',
          name: 'Locations',
          component: AuxiliaryLocations,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: { requiresAuth: true }
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
    if (Store.getters['auth/userSignedIn']) {
      next()
    } else {
      Auth.currentAuthenticatedUser()
        .then(user => {
          Store.commit('auth/setUser', user)
          next()
        })
        .catch(err => {
          console.log(err)
          next({ path: '/login' })
        })
    }
  } else {
    next()
  }
})

export default router
