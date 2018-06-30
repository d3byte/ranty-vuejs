<template>
  <div class="vertical-center authorization">
    <div class="wrapper">
      <h1 class="logo-text">Ranty</h1>
      <p class="sub-title">Добро пожаловать! Войдите или зарегистрируйтесь</p>
      <form class="form" @submit="e => e.preventDefault()">
        <div class="form-group floating-label">
          <input type="email" :class="'line-based ' + (email.length > 0 ? 'static' : '')" v-model="email" required />
          <label>Email</label>
        </div>
        <div class="form-group floating-label">
          <input type="password" class="line-based" v-model="password" required />
          <label>Пароль</label>
        </div>
        <div class="half-splitted">
          <div class="form-group checkbox">
            <input type="checkbox" id="remember-me" v-model="remember" />
            <label for="remember-me">Запомнить меня</label>
          </div>
          <router-link id="recovery" to="/recovery">Забыл пароль</router-link>
        </div>
        <div class="half-splitted">
          <button @click="submit" class="square-like yellow">Войти</button>
          <router-link to="/signup" class="square-like">Регистрация</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'signin',
  data() {
    return {
      email: '',
      password: '',
      remember: false
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    }
  },
  methods: {
    async submit() {
      const { email, password } = this
      const { body } = await this.$http.post('login', { email, password })
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
a#recovery
  &:hover
    text-decoration: underline

</style>