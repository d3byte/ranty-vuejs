import Vue from 'vue'
import Router from 'vue-router'
import Signin from './pages/Signin.vue'
import Signup from './pages/Signup.vue'
import Home from './pages/Home.vue'
import Page404 from './pages/Page404.vue'
import Recovery from './pages/Recovery.vue'
import Room from './pages/Room.vue'
import CommercialOffer from './pages/CommercialOffer.vue'
import AddUnit from './pages/AddUnit.vue'
import AddLead from './pages/AddLead.vue'
import ConfirmOrCancelOffer from './pages/ConfirmOrCancelOffer.vue'
import TenantPassword from './pages/TenantPassword.vue'


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
      path: '/room/:id',
      name: 'Помещение',
      component: Room
    },
    {
      path: '/new-commercial-offer/:ids',
      name: 'Новое коммерческое предложение',
      component: CommercialOffer
    },
    {
      path: '/add-unit',
      name: 'Добавить объект',
      component: AddUnit
    },
    {
      path: '/add-lead',
      name: 'Новый контакт',
      component: AddLead
    },
    {
      path: '/tenant/confirm/:token',
      name: 'Подтвердить предложение',
      component: ConfirmOrCancelOffer,
    },
    {
      path: '/tenant/cancel/:token',
      name: 'Отклонить предложение',
      component: ConfirmOrCancelOffer,
    },
    {
      path: '/tenant/password/:token',
      name: 'Завершить регистрацию тенанта',
      component: TenantPassword,
    },
    {
      path: '*',
      name: 'Ошибка 404',
      component: Page404
    }
  ]
})
