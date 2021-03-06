import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Items from './views/Items.vue'
import Assign from './views/Asign.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/assign/:id',
      name: 'Assign',
      component: Assign
    },
    {
      path: '/item/:id',
      name: 'item',
      component: Items
    },
    {
      path: '/note',
      name: 'note',
      component: () => import('./views/note/index.vue')
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('./views/plan/index.vue')
    },
    {
      path: '/about/:id',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
