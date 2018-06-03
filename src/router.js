import Vue from 'vue'
import Router from 'vue-router'
import Signin from './pages/Signin.vue'
import Signup from './pages/Signup.vue'
import Home from './pages/Home.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
