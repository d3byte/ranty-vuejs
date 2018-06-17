<template>
<header>
    <div class="breadcrumbs">
        <div class="breadcrumb" v-for="(breadcrumb, key) in breadcrumbs" :key="key" @click="() => routeTo(breadcrumb.path)">
            {{ breadcrumb.name }}
            <i class="material-icons">keyboard_arrow_right</i>
        </div>
        
    </div>
    <nav>
        <i class="material-icons">person</i>
        <i class="material-icons">email</i>
    </nav>
</header>
</template>

<script>
export default {
    name: 'ranty-header',
    data() {
        return {
            breadcrumbs: {}
        }
    },
    methods: {
        routeTo(url) {
            this.$router.push(url)
        }
    },
    created() {
        const { matched } = this.$route
        this.breadcrumbs = matched
    }
}
</script>

<style lang="sass" scoped>
header
    display: flex
    align-items: center
    justify-content: space-between
    background: #707070
    *
        color: white

.breadcrumbs
    display: flex
    align-items: center
    padding: 5px 20px
    margin-left: 40px
    .breadcrumb
        position: relative
        display: flex
        align-items: center
        border: 1px solid transparent
        &:hover
            cursor: pointer
            &:not(:last-child):after
                width: calc(100% - 6px)
            &:last-child:after
                width: calc(100% - 24px)
        &:last-of-type
            i
                opacity: 0
        &:after
            position: absolute
            content: ''
            width: 0
            height: 2px
            border-radius: 8px
            bottom: -6px
            background: white
            transition: 0.3s

nav
    justify-self: right
    padding: 0 60px 0 20px
    &:hover
        cursor: pointer
    i
        &:first-of-type
            margin-right: 20px
</style>
