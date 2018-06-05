
<template>
  <div class="page-404 vertical-center">
    <h1>Ошибка #404</h1>
    <h3>К сожалению, этой страницы не существует. <br/><br/>     Может быть, вы искали одну из этих страниц?</h3>
    <div class="routes">
        <router-link v-for="(route, index) in suitableRoutes" :key={index} :to="route.path">{{ route.name }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: 'page-404',
    data() {
        return {
            suitableRoutes: []
        }
    },
    created() {
        const { routes } = this.$router.options
        const { path } = this.$route
        routes.map(route => {
            if (route.path.indexOf(path) !== -1 || path.indexOf(route.path) !== -1) {
                return this.suitableRoutes.push(route)
            }
        })
    }
}
</script>

<style lang="sass" scoped>
.page-404
    min-height: 100vh
    flex-direction: column  
    text-align: center

h1
    font-family: 'OpenSans-Bold', sans-serif
    margin: 0

.routes
    display: flex
    align-items: flex-start
    flex-direction: column
    a
        margin: 10px 30px 0 0
        text-decoration: underline
        &:first-of-type
            margin-top: 0
        &:last-of-type
            margin-right: 0

@media (max-width: 586px)
    .page-404
        padding: 30px 15px
    h1
        font-size: 24px
    h3
        font-size: 14px
    a
        font-size: 14px
</style>
