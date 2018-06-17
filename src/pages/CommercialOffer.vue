<template>
<section class="gray-background overflow-hidden">
    <side-menu/>
    <main class="commercial-offer main-content">
        <ranty-header/>
        <div class="wrapper">
            <h2>Новое коммерческое предложение</h2>
            <form class="stage-1" @submit="e => e.preventDefault()">
                <dropdown :items="units" :chosenItem="chosenUnit" v-model="chosenUnit" defaultLabel="Объект"/>
                <dropdown :items="chosenUnit.rooms" :chosenItem="chosenRoom" v-model="chosenRoom" defaultLabel="Помещение" classes="m-40"/>
                <div class="half-splitted">
                    <div class="form-group floating-label">
                        <input type="text" class="line-based" v-model="firstName" required />
                        <label>Имя</label>
                    </div>
                    <div class="form-group floating-label">
                        <input type="text" class="line-based" v-model="lastName" required />
                        <label>Фамилия</label>
                    </div>
                </div>
                <div class="half-splitted m-40">
                    <div class="form-group floating-label">
                        <input type="tel" class="line-based" v-model="telephone" required />
                        <label>Телефон</label>
                    </div>
                    <div class="form-group floating-label">
                        <input type="email" :class="'line-based ' + (email.length > 0 ? 'static' : '')" v-model="email" required />
                        <label>Email</label>
                    </div>
                </div>
                <div class="half-splitted m-40">
                    <div class="form-group floating-label">
                        <input type="text" class="line-based" v-model="organization" required />
                        <label>Организация</label>
                    </div>
                    <div class="form-group floating-label">
                        <input type="text" class="line-based" v-model="inn" required />
                        <label>ИНН</label>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="stage taken active">1</div>
                    <div class="stage">2</div>
                    <div class="stage">3</div>
                </div>
                <button @click="nextStage" class="square-like yellow">Дальше</button>
            </form>
        </div>
    </main>
</section>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'
import Header from '@/components/Header.vue'
import Dropdown from '@/components/Dropdown.vue'
export default {
    name: 'commercial-offer',
    data() {
        return {
            units: [
                {
                    id: 0,
                    name: 'ТЦ "На Фрязевской"',
                    rooms: [
                        {
                            id: 15,
                            name: 'Главный холл'
                        },
                        {
                            id: 16,
                            name: 'Ванная комната'
                        }
                    ]
                },
                {
                    id: 1,
                    name: 'Новоспасский монастырь',
                    rooms: [
                        {
                            id: 13,
                            name: 'Царство небесное'
                        },
                        {
                            id: 14,
                            name: 'Бассейн'
                        }
                    ]
                }
            ],
            chosenUnit: {},
            chosenRoom: {},
            firstName: '',
            lastName: '',
            telephone: '',
            email: '',
            organization: '',
            inn: ''
        }
    },
    methods: {
        nextStage() {

        }
    },
    watch: {
        chosenUnit() {
            // Если ранее выбранное помещение не принадлежит объекту, то сбросить его
            if (Object.keys(this.chosenUnit).length > 0 && !this.chosenUnit.rooms.includes(this.chosenRoom)) {
                this.chosenRoom = {}
            }
        }
    },
    components: {
        SideMenu,
        'ranty-header': Header,
        Dropdown
    }
}
</script>

<style lang="sass">
.main-content
    height: 100vh
    overflow: scroll

.commercial-offer
   
    .wrapper
        width: 70%
        background: white
        border-radius: 8px
        margin: 60px auto 0 auto
        padding: 20px
        margin-bottom: 40px
        h2
            font-weight: normal
            font-size: 20px
            text-align: center
            margin-bottom: 60px

    form
        max-width: 500px
        margin: 0 auto

    .m-40
        margin-bottom: 60px

    button.square-like
        width: 180px
        margin: 60px auto

$space-between-stages: 60px

.progress-bar
    display: flex
    align-items: center
    justify-content: center
    .stage
        position: relative
        display: flex
        align-items: center
        justify-content: center
        width: 60px
        height: 60px
        border-radius: 50%
        background: #E5E5E5
        margin-right: $space-between-stages
        flex-shrink: 0
        &:after
            position: absolute
            content: ''
            right: -$space-between-stages
            width: $space-between-stages
            height: 3px
            background: #E5E5E5
        &:before
            position: absolute
            content: ''
            left: -$space-between-stages
            width: $space-between-stages
            height: 3px
            background: #E5E5E5
        &:last-of-type:after,  &:first-of-type:after, &:first-of-type:before
            content: none
        &:last-of-type
            margin-right: 0
        &.taken
            background: #FFEB00
            &:before, &:after
                background: #FFEB00
            &.active
                color: white


@media (max-width: 1100px)
    .commercial-offer
        form
            max-width: none
            width: 95%

@media (max-width: 780px)
    .commercial-offer
        .half-splitted
            flex-direction: column !important

@media (max-width: 710px)
    .progress-bar .stage
        width: 50px
        height: 50px
        margin-right: 40px
        &:after
            width: 40px
            right: -40px
        &:before
            width: 40px
            left: -40px

</style>
