<template>
<div class="confirm-offer">
    <form class="password" @submit="e => e.preventDefault()" v-if="!success">
        <h4>Введите пароль для заверешения регистрации</h4>
        <div class="form-group floating-label" >
            <input class="line-based" type="text" v-model="password" required/>
            <label>Пароль</label>
        </div>
        <button class="square-like yellow" @click="submit">Подтвердить</button>
    </form>
    <h4 v-else>{{ success }}</h4>
</div>
</template>


<script>
export default {
    name: 'accept-offer',
    data() {
        return {
            password: '',
            success: ''
        }
    },
    methods: {
        routeTo(url) {
            this.$router.push(url)
        },
        async submit() {
            if (this.password) {
                const res = await this.$http.post(this.$route.path.slice(1), {
                    password: this.password,
                })
                if (res.body.success) {
                    this.success = res.body.success
                }
            }
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

    .password
        h4
            margin-bottom: 40px
        button
            margin: 0 auto
            padding-left: 10px
            padding-right: 10px
</style>
