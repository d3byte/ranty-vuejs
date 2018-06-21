<template>
<section class="gray-background">
    <side-menu/>
    <main class="room">
        <ranty-header/>
        <div class="wrapper">
            <div class="left">
                <nav class="menu">
                    <div :class="activeTab == 0 ? 'active' : ''">
                        <img v-if="activeTab === 0" src="@/assets/tenant_black.svg" @error="this.src = '@/assets/tenant_black.png'" />
                        <img v-else src="@/assets/tenant_white.svg" @error="this.src = '@/assets/tenant_white.png'" />
                        Финансы
                    </div>
                    <div :class="activeTab == 1 ? 'active' : ''">
                        <img v-if="activeTab === 1" src="@/assets/assessment_black.svg" @error="this.src = '@/assets/assessment_black.png'" />
                        <img v-else src="@/assets/assessment_white.svg" @error="this.src = '@/assets/assessment_white.png'" />
                        Финансы
                    </div>
                    <div :class="activeTab == 2 ? 'active' : ''">
                        <img v-if="activeTab === 2" src="@/assets/lcd_black.svg" @error="this.src = '@/assets/lcd_black.png'" />
                        <img v-else src="@/assets/lcd_white.svg" @error="this.src = '@/assets/lcd_white.png'" />
                        ЖКУ
                    </div>
                    <div :class="activeTab == 3 ? 'active' : ''">
                        <img v-if="activeTab === 3" src="@/assets/applications_black.svg" @error="this.src = '@/assets/applications_black.png'" />
                        <img v-else src="@/assets/applications_white.svg" @error="this.src = '@/assets/applications_white.png'" />
                        Заявки
                    </div>
                </nav>
            </div>
            <div class="right">
                <div class="balance">
                    <p class="title">Баланс</p>
                    <p class="value">10000₽</p>
                </div>
            </div>
        </div>
    </main>
</section>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'
import Header from '@/components/Header.vue'

export default {
    name: 'room',
    data() {
        return {
            activeTab: 0,
        }
    },
    methods: {
        routeTo(url) {
            this.$router.push(url)
        }
    },
    created() {
        // this.$route
    },
    components: {
        SideMenu,
        'ranty-header': Header
    }
}
</script>

<style lang="sass">
.room
    .wrapper
        display: flex
        justify-content: space-between
        margin-top: 60px
        overflow: hidden
        & > div
            display: flex
            flex-direction: column
        .left
            width: 60%
            padding: 0 0 0 60px
        .right
            width: 38%
            padding: 0 60px 0 0
            & > div
                width: 100%

    .menu
        display: flex
        align-items: center
        div
            display: flex
            align-items: center
            justify-content: center
            flex-direction: column
            width: 80px
            height: 80px
            padding: 10px
            margin-right: 30px
            border-radius: 20px
            background: #707070
            color: white
            font-size: 12px
            font-family: 'OpenSans-Semibold', sans-serif
            flex-shrink: 0
            &:hover
                cursor: pointer
            &.active
                background: #FFEB00
                color: black
            img
                width: 30px
    .balance
        display: flex
        flex-direction: column
        align-items: center
        background: white
        border-radius: 20px
        height: 80px
        padding: 10px 30px
        p
            font-family: 'OpenSans-Semibold', sans-serif
            margin: 0
        .title
            width: 100%
            text-align: center
            color: #707070
            font-size: 12px
            text-transform: uppercase
        .value
            margin-top: 5px
            font-size: 24px 
</style>
