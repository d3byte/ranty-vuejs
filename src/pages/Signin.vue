<template>
  <div class="authorization">
    <div class="wrapper">
      <h1 class="logo-text">Ranty</h1>
      <p class="sub-title">Добро пожаловать! Войдите или зарегистрируйтесь.</p>
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

<style lang="sass">
.authorization
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  min-height: 100vh
  .sub-title
    color: #ADAEB4
    text-align: center
    margin: 15px 0 30px 0
  .form
    button
      width: 47%

@media (max-width: 500px)
  .authorization
    .half-splitted:last-of-type
      flex-direction: column
      justify-content: flex-start
      align-items: center
      button:last-of-type
        margin-top: 15px
    .form
      *
        font-size: 14px
      button
        &.yellow
          width: 80%
        &:not(.yellow)
          border: none

@media (max-width: 450px)
  .authorization .form
    padding: 0 15px


@media (min-height: 1000px)
  .authorization
    .wrapper
      transform: scale(1.6)
</style>
