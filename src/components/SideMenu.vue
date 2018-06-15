<template>
<aside id="side-menu">
    <div class="wrapper">
        <h1 class="logo-text">Ranty</h1>
        <ul>
            <li v-for="item in menuItems" :key="item.id" @click="() => routeTo(item.url)">
                <i class="material-icons">{{ item.icon }}</i>
                {{ item.name }}
            </li>
        </ul>
    </div>
    <footer>
        <i class="material-icons">person_add</i>
        <img src="@/assets/add_object.svg" @error="this.src = '@/assets/add_object.png'" />
    </footer>
</aside>
</template>

<script>
export default {
    name: 'side-menu',
    data() {
        return {
            menuItems: [
                {
                    id: 0,
                    name: 'Главная',
                    url: '/profile',
                    icon: 'home'
                },
                {
                    id: 1,
                    name: 'Управление',
                    url: '/management',
                    icon: 'view_list'
                },
                {
                    id: 2,
                    name: 'Финансы',
                    url: 'finance',
                    icon: 'assessment'
                },
                {
                    id: 3,
                    name: 'Учёт комм. услуг',
                    url: '/accounting',
                    icon: 'extension'
                },
                {
                    id: 4,
                    name: 'Заявки',
                    url: '/applications',
                    icon: 'announcement'
                }
            ]
        }
    },
    methods: {
        routeTo(url) {
            this.$router.push(url)
        }
    }
}
</script>

<style lang="sass" scoped>
#side-menu
    display: flex
    flex-direction: column
    justify-content: space-between
    background: white
    height: 100vh
    padding: 30px 0 0 0


ul
    margin: 0
    padding: 0 20px
    list-style-type: none
    li
        display: flex
        align-items: center
        font-size: 16px
        margin-top: 10px
        &:hover
            cursor: pointer
        &:first-of-type
            margin-top: 0
        i
            margin-right: 10px

.logo-text
    text-align: left
    margin: 0 0 30px 20px

footer
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    padding: 20px
    background: #707070
    img
        width: 30px
        &:hover
            cursor: pointer
    i
        font-size: 30px
        color: white
        &:hover
            cursor: pointer
</style>
