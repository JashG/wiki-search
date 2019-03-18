import Vue from 'vue'
import Router from 'vue-router'

import Homepage from '../components/Homepage'
import SearchResults from '../components/SearchResults'
import Discover from '../components/Discover'

Vue.use(Router)

const router = new Router({

  routes: [{
    path: '/',
    name: 'default',
    component: Homepage
  },

  {
    path: '/search',
    name: 'search',
    component: SearchResults
  },

  {
    path: '/discover',
    name: 'discover',
    component: Discover
  }]

})

export default router