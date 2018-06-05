import Vue from 'vue'
import Router from 'vue-router'
import Signin from './pages/Signin.vue'
import Signup from './pages/Signup.vue'
import Home from './pages/Home.vue'
import Page404 from './pages/Page404.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Домашная страница',
      component: Home
    },
    {
      path: '/signin',
      name: 'Авторизация',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Регистрация',
      component: Signup
    },
    {
      path: '*',
      name: 'Ошибка 404',
      component: Page404
    }
  ]
})
