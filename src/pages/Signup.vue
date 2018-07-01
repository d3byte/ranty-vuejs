<template>
  <div class="vertical-center authorization">
    <div class="wrapper">
      <h1 class="logo-text">Ranty</h1>
      <p class="sub-title">Регистрация</p>
      <p class="error-text" v-if="error.length > 0">{{ error }}</p>
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
          <button class="square-like yellow" @click="submit">Зарегистрироваться</button>
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
      agree: false,
      error: ''
    }
  },
  computed: {
    token() {
      const token = this.$store.state.token
      if (token) {
        this.$router.push('/')
      }
      return token
    }
  },
  methods: {
    async submit() {
      const { firstName, lastName, telephone, email, password, repeatedPassword } = this
      if (password !== repeatedPassword) {
        this.error = 'Введённые пароли не совпадают'
        return
      }
      const { body } = await this.$http.post('register', {
        firstname: firstName,
        secondname: lastName,
        email,
        phone: telephone,
        password,
        password_confirmation: repeatedPassword
      })
      const { data, errors } = body
      const token = data.api_token
      delete data.api_token
      if (token) {
        this.$store.dispatch('login', { user: data, token })
        this.$router.push('/')
      }
    },
    checkForAuth() {
      if (this.token) {
        this.$router.push('/')
      }
    }
  },
  created() {
    this.checkForAuth()
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

.error-text
  margin-bottom: 30px
</style>