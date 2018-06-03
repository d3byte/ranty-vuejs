<template>
  <div class="authorization">
    <h1 class="logo-title">Ranty</h1>
    <p class="sub-title">Добро пожаловать! Войдите или зарегистрируйтесь.</p>
    <form class="form">
      <div class="form-group floating-label">
        <input type="text" class="line-based" required />
        <label>Email или телефон</label>
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
</template>

<script>

export default {
  name: 'signin',
}
</script>

<style lang="sass">
.logo-title
  font-family: 'Houchka-Bold', sans-serif
  color: #43425D
  text-align: center
  text-transform: uppercase
  letter-spacing: 5px
  margin: 0

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
    display: flex
    align-items: center
    flex-direction: column
    margin-top: 15px
    input[type="text"], input[type="password"]
      width: 360px
    button
      width: 170px

.form-group
  position: relative
  margin-bottom: 30px
  &:not(.checkbox)
    padding: 5px 0
    label
      pointer-events: none
  label
    color: #43425D
    transition: 0.3s
  &.floating-label
    label
      position: absolute
      left: 10px
      top: 0px
    input
      &:focus
        & + label
          font-size: 10px
          top: -7px
      &:valid + label
          font-size: 10px
          top: -7px
  &.checkbox
    input
      margin-right: 10px
    label, input
      cursor: pointer
</style>
