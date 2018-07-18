<template>
<section class="gray-background">
    <side-menu/>
    <main class="room main-content">
        <ranty-header/>
        <div class="wrapper">
            <div class="left">
                <nav class="menu">
                    <div :class="activeTab == 0 ? 'active' : ''" @click="activeTab = 0">
                        <img v-if="activeTab === 0" src="@/assets/tenant_black.svg" @error="this.src = '@/assets/tenant_black.png'" />
                        <img v-else src="@/assets/tenant_white.svg" @error="this.src = '@/assets/tenant_white.png'" />
                        Арендатор
                    </div>
                    <div :class="activeTab == 1 ? 'active' : ''" @click="activeTab = 1">
                        <img v-if="activeTab === 1" src="@/assets/assessment_black.svg" @error="this.src = '@/assets/assessment_black.png'" />
                        <img v-else src="@/assets/assessment_white.svg" @error="this.src = '@/assets/assessment_white.png'" />
                        Финансы
                    </div>
                    <div :class="activeTab == 2 ? 'active' : ''" @click="activeTab = 2">
                        <img v-if="activeTab === 2" src="@/assets/lcd_black.svg" @error="this.src = '@/assets/lcd_black.png'" />
                        <img v-else src="@/assets/lcd_white.svg" @error="this.src = '@/assets/lcd_white.png'" />
                        ЖКУ
                    </div>
                    <div :class="activeTab == 3 ? 'active' : ''" @click="activeTab = 3">
                        <img v-if="activeTab === 3" src="@/assets/applications_black.svg" @error="this.src = '@/assets/applications_black.png'" />
                        <img v-else src="@/assets/applications_white.svg" @error="this.src = '@/assets/applications_white.png'" />
                        Заявки
                    </div>
                </nav>
                <div class="rentor" v-if="activeTab === 0">
                    <div class="half-splitted space-between">
                        <div class="label-group">
                            <p class="title">Арендатор</p>
                            <p>ИП Тихонов И.Е.</p>
                        </div>
                        <div class="half-splitted">
                            <div class="label-group">
                                <p class="title">Начало аренды</p>
                                <p>24.08.18</p>
                            </div>
                            <div class="label-group">
                                <p class="title">Конец аренды</p>
                                <p>24.08.19</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="contacts">
                        <div class="label-group">
                            <p class="title">Контакты</p>
                            <p>Иван Тихонов</p>
                            <p>+7 999 555 86 12</p>
                            <p>ivan@mail.com</p>    
                        </div>
                    </div>
                    <hr/>
                    <div class="commercial-requirements">
                        <div class="label-group">
                            <p class="title">Коммерческие условия</p>
                            <p>
                                <b>Оплата арендной платы</b><br/>
                                Не позднее 5-го числа месяца
                            </p>
                            <p>
                                <b>Оплата переменных платежей</b><br/>
                                Не позднее 3 дней с выставления счёта
                            </p>
                        </div>
                    </div>
                    <hr/>
                    <div class="half-splitted company">
                        <div class="label-group">
                            <p class="title">Реквизиты компании</p>
                            <p>
                                <span>ИНН 9729253944</span>
                                <span>ген. дир.</span>
                            </p>
                            <p>
                                <span>КПП 772901001</span>
                                <span>юр. адрес</span>
                            </p>
                            <p>ОГРНип 7754538</p>
                        </div>
                        <div class="label-group">
                            <p class="title">Банковские реквизиты</p>
                            <p>Р/С 40702810402080001046</p>
                            <p>БИК 044525593</p>
                            <p>АО «Альфа-Банк», г. Москва</p>
                        </div>
                    </div>
                    <hr/>
                    <div class="files">
                        <div class="label-group">
                            <p class="title">Вложения</p>
                        </div>
                    </div>
                </div>
                <div class="finance" v-if="activeTab === 1">
                    <header class="half-splitted">
                        <div class="one-line">
                            <p class="active">Арендная плата</p>
                            <p>Коммунальные платежи</p>
                        </div>
                        <dropdown :items="[]" :chosenItem="{}" v-model="type" defaultLabel="АП/Пени" classes="box-based bordered" />
                    </header>
                    <hr/>
                    <div class="checks">
                        <div class="check half-splitted">
                            <div class="one-line">
                                <p><b>Оплачен</b></p>
                                <p>06/08/18</p>
                                <p>Назначение</p>
                            </div>
                            <p><b>10000 руб.</b></p>
                        </div>
                        <div class="check half-splitted">
                            <div class="one-line">
                                <p><b>Оплачен</b></p>
                                <p>06/08/18</p>
                                <p>Назначение</p>
                            </div>
                            <p><b>10000 руб.</b></p>
                        </div>
                        <div class="check half-splitted">
                            <div class="one-line">
                                <p><b>Оплачен</b></p>
                                <p>06/08/18</p>
                                <p>Назначение</p>
                            </div>
                            <p><b>10000 руб.</b></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="balance">
                    <p class="title">Баланс</p>
                    <p class="value">10000₽</p>
                </div>
                <div class="room">
                    <div class="image">
                        <p class="title">
                            <!-- ТЦ Манго <br/>
                            пав-44 -->
                            {{ room.title }}
                        </p>
                        <p class="adress">{{ room.address }}</p>
                    </div>
                    <div class="info">
                        <div class="triple-splitted">
                            <div class="label-group">
                                <p class="title">тип</p>
                                <p>{{ getTypeName(room.type) }}</p>
                            </div>
                            <div class="label-group">
                                <p class="title">площадь</p>
                                <p>{{ room.area }}м<sup>2</sup></p>
                            </div>
                            <div class="label-group">
                                <p class="title">этаж</p>
                                <p>–</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="rounded green">Написать сообщение</button>
                <button class="rounded orange">Создать заявку</button>
            </div>
        </div>
    </main>
</section>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'
import Header from '@/components/Header.vue'
import Dropdown from '@/components/Dropdown.vue'

export default {
    name: 'room',
    data() {
        return {
            activeTab: 0,
            type: '',
            room: {}
        }
    },
    computed: {
        token() {
            return this.$store.state.token
        },
        user() {
            return this.$store.state.user
        },
        types() {
            return this.$store.state.types
        },
    },
    methods: {
        routeTo(url) {
            this.$router.push(url)
        },
        getTypeName(id) {
            return ((this.types || []).filter(type => type.id === id)[0] || {}).name
        },
    },
    async created() {
        const { id } = this.$route.params
        const { body } = await this.$http.get(`rooms/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            }
        })
        console.log(body)
        this.room = body
    },
    components: {
        SideMenu,
        'ranty-header': Header,
        Dropdown
    }
}
</script>

<style lang="sass" scoped>
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

.rentor, .finance
    background: white
    border-radius: 20px
    padding: 30px
    margin: 30px 0 60px 0

.label-group
    p
        margin-bottom: 15px
        &:last-of-type
            margin: 0
        &.title
            color: #707070
            font-size: 14px
            font-weight: bold

.half-splitted
    & > div
        width: 50%

hr
    margin: 30px 0
    box-shadow: none !important
    border: 1px solid #707070

.company .label-group > p > span
    margin-right: 10px
    &:last-of-type
        margin-right: 0

.finance
    header 
        align-items: center
        & > div:first-of-type p
            margin-right: 15px
            &:last-of-type
                margin-right: 0
        .dropdown, p
            margin: 0

.checks
    .check
        border-bottom: 2px solid #707070
        margin-bottom: 30px
        &:last-of-type
            margin-bottom: 0
        .one-line 
            justify-content: space-between
            & > p
                width: 16%

.right .room
    background: white
    border-radius: 20px
    margin-top: 30px
    .image
        display: flex
        flex-direction: column
        justify-content: center
        height: 150px
        background: #fabe58; /* Old Browsers */
        background: -webkit-linear-gradient(left,#fabe58,#6bb9f0)
        background: -o-linear-gradient(left,#fabe58,#6bb9f0)
        background: -moz-linear-gradient(left,#fabe58,#6bb9f0)
        background: linear-gradient(to right, #fabe58, #6bb9f0)
        border-top-left-radius: 20px
        border-top-right-radius: 20px
        p
            margin: 0
            text-align: center
            color: black
        .title
            font-size: 20px
            margin-bottom: 15px
    .info

        .triple-splitted
            padding: 10px
            align-items: center
            .label-group
                p
                    margin: 0
                    text-align: center
                    &.title
                        margin-bottom: 10px


.right button.rounded
    margin-top: 15px

button
    &.rounded
        border: none
        border-radius: 20px
        padding: 10px
        text-transform: uppercase
        font-weight: bold
        font-size: 14px
        &.green
            background: #87D37C
        &.orange
            background: #FABE58
</style>
