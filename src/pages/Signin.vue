<template>
  <div class="authorization">
    <div class="wrapper">
      <h1 class="logo-text">Ranty</h1>
      <p class="sub-title">Добро пожаловать! Войдите или зарегистрируйтесь</p>
      <form class="form">
        <div class="form-group floating-label">
          <input type="text" class="line-based" required />
          <label>Email</label>
        </div>
        <div class="form-group floating-label">
          <input type="password" class="line-based" required />
          <label>Пароль</label>
        </div>
        <div class="half-splitted">
          <div class="form-group checkbox">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Запомнить меня</label>
          </div>
          <router-link to="/recovery">Забыл пароль</router-link>
        </div>
        <div class="half-splitted">
          <button class="square-like yellow">Войти</button>
          <button class="square-like">Регистрация</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'signin',
}
</script>
