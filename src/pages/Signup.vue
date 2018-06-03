<template>
  <div class="authorization">
    <div class="wrapper">
      <h1 class="logo-text">Ranty</h1>
      <p class="sub-title">Регистрация</p>
      <form class="form" @submit="e => e.preventDefault()">
        <div class="half-splitted">
          <div class="form-group floating-label">
            <input type="text" class="line-based" v-model="firstName" required />
            <label>Имя</label>
          </div>
          <div class="form-group floating-label">
            <input type="text" class="line-based" v-model="lastName" required />
            <label>Фамилия</label>
          </div>
        </div>
        <div class="form-group floating-label">
          <input type="tel" class="line-based" v-model="telephone" required />
          <label>Телефон</label>
        </div>
        <div class="form-group floating-label">
          <input type="email" :class="'line-based ' + (email.length > 0 ? 'static' : '')" v-model="email" required />
          <label>Email</label>
        </div>
        <div class="form-group floating-label">
          <input type="password" class="line-based" v-model="password" required />
          <label>Пароль</label>
        </div>
        <div class="form-group floating-label">
          <input type="password" class="line-based" v-model="repeatedPassword" required />
          <label>Повторите пароль</label>
        </div>
        <div class="form-group checkbox">
          <input type="checkbox" id="agree-eula" v-model="agree" />
          <label for="agree-eula">Согласен с лицензионным соглашением</label>
        </div>
        <div class="half-splitted vertical">
          <button class="square-like yellow">Войти</button>
          <router-link to="/signin">Уже есть аккаунт? Войти</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'signin',
  data() {
    return {
      firstName: '',
      lastName: '',
      telephone: '',
      email: '',
      password: '',
      repeatedPassword: '',
      agree: false
    }
  },
}
</script>

<style lang="sass" scoped>
.half-splitted
  &:first-of-type
    .form-group
      width: 47%
  &:last-of-type
    a
      margin-top: 15px
      text-decoration: underline
</style>