<template>
  <div class="vertical-center authorization">
    <div class="wrapper" v-if="!success">
      <h1 class="logo-text">Ranty</h1>
      <p class="sub-title">Введите email, и мы пришлём ссылку на изменение пароля</p>
      <form class="form" @submit="e => e.preventDefault()">
        <div class="form-group floating-label">
          <input type="email" :class="'line-based ' + (email.length > 0 ? 'static' : '')" v-model="email" required />
          <label>Email</label>
        </div>
        <button class="square-like yellow">Отправить</button>
      </form>
    </div>
    <h3 v-else>Ссылка на изменение пароля была отправлена вам на почту</h3>
  </div>
</template>

<script>

export default {
  name: 'recovery',
  data() {
    return {
      email: '',
      success: false
    }
  },
}
</script>

<style lang="sass" scoped>
.authorization
    padding: 30px 15px

button.yellow
    margin: 0 auto

.form-group
    width: 90%
    margin-left: auto
    margin-right: auto

h3
    text-align: center
</style>