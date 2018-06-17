import Vue from 'vue'
import Router from 'vue-router'
import Signin from './pages/Signin.vue'
import Signup from './pages/Signup.vue'
import Home from './pages/Home.vue'
import Page404 from './pages/Page404.vue'
import Recovery from './pages/Recovery.vue'
import Room from './pages/Room.vue'
import CommercialOffer from './pages/CommercialOffer.vue'


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
      path: '/recovery',
      name: 'Восстановление пароля',
      component: Recovery
    },
    {
      path: '/room',
      name: 'Помещение',
      component: Room
    },
    {
      path: '/new-commercial-offer',
      name: 'Новое коммерческое предложение',
      component: CommercialOffer
    },
    {
      path: '*',
      name: 'Ошибка 404',
      component: Page404
    }
  ]
})
