<template>
<div class="confirm-offer">
    <h4 v-if="loading && !error && confirm" class="status">Подтверждаем...</h4>
    <h4 v-else-if="!loading && !error && confirm" class="status">
        Подтверждено!<br/>
        Мы выслали вам на почту письмо с ссылкой на ввод пароля
    </h4>
    <h4 v-if="loading && !error && !confirm" class="status">Отклоняем...</h4>
    <h4 v-else-if="!loading && !error && !confirm" class="status">
        Предложение отклонено
    </h4>
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
            error: '',
            confirm: false
        }
    },
    methods: {
        routeTo(url) {
            this.$router.push(url)
        },
    },
    async created() {
        if (this.$route.path.slice(0, 15) === '/tenant/confirm') {
            this.confirm = true
        }
        const { body } = await this.$http.get(this.$route.path.slice(1))
        if (body.error) {
            this.error = body.error
            this.loading = false
            return
        }
        this.loading = false
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
