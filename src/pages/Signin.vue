<template>
  <div class="authorization">
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
          <router-link to="/recovery">Забыл пароль</router-link>
        </div>
        <div class="half-splitted">
          <button class="square-like yellow">Войти</button>
          <router-link to="/signup" class="square-like">Регистрация</router-link>
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
      email: '',
      password: '',
      remember: false
    }
  },
  methods: {
    navigateToSignup() {
      this.$router.push('/signup')
    }
  }
}
</script>