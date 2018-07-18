<template>
<div class="confirm-offer">
    <h4 v-if="loading && !error" class="status">Подтверждается...</h4>
    <h4 v-else-if="!loading && !error" class="status">Подтверждено!</h4>
    <h4 v-if="error">{{ error }}</h4>
    <button v-if="!loading" class="square-like yellow" @click="() => routeTo('/')">Вернуться</button>
</div>
</template>


<script>
export default {
    name: 'accept-offer',
    data() {
        return {
            loading: true,
            error: ''
        }
    },
    methods: {
        routeTo(url) {
            this.$router.push(url)
        },
    },
    async created() {
        const { body } = await this.$http.get(this.$route.path.slice(1))
        if (body.error) {
            this.error = body.error
            this.loading = false
            return
        }
        
    },
}
</script>

<style lang="sass" scoped>
.confirm-offer 
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    height: 100vh
</style>
