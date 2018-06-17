<template>
<section class="gray-background overflow-hidden">
    <side-menu/>
    <main class="add-unit main-content">
        <ranty-header/>
        <div class="wrapper">
            <h2>Добавление контакта</h2>
            <form @submit="e => e.preventDefault()">
                <div class="form-group floating-label increased-font-size">
                    <input type="text" class="line-based" v-model="name" required />
                    <label>Новый контакт</label>
                </div>
                <div class="half-splitted">
                    <div class="form-group floating-label">
                        <input type="tel" class="line-based" v-model="phone" required />
                        <label>Телефон</label>
                    </div>
                    <div class="form-group floating-label">
                        <input type="email" class="line-based" v-model="email" required />
                        <label>Email</label>
                    </div>
                </div>
                <div class="half-splitted">
                    <dropdown :items="units" :chosenItem="unit" v-model="unit" defaultLabel="Объект" />
                    <dropdown :items="types" :chosenItem="type" v-model="type" defaultLabel="Тип" />
                </div>
                <div class="half-splitted">
                    <div class="form-group floating-label">
                        <input type="num" class="line-based" v-model="square" required />
                        <label>Площадь</label>
                    </div>
                    <div class="form-group floating-label">
                        <input type="num" class="line-based" v-model="rent" required />
                        <label>Арендная плата</label>
                    </div>
                </div>
                <textarea rows="4">Комментарий</textarea>
                <div class="triple-splitted">
                    <div class="form-group checkbox">
                        <input type="checkbox" id="remember-me" v-model="remind" />
                        <label for="remember-me">Напомнить</label>
                    </div>
                    <div class="form-group icon-label">
                        <img src="@/assets/calendar.svg" @error="this.src = '@/assets/calendar.png'" />
                        <input type="text" class="line-based" v-model="date" />
                    </div>
                    <div class="form-group icon-label">
                        <img src="@/assets/time-clock.svg" @error="this.src = '@/assets/time-clock.png'" />
                        <input type="text" class="line-based" v-model="time" />
                    </div>
                </div>
                <button class="square-like yellow">Добавить</button>
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
    name: 'add-unit',
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            square: '',
            rent: '',
            types: [ 
                { id: 0, name: 'Офис' }, { id: 1, name: 'Торговая площадь' },
                { id: 2, name: 'Склад' }, { id: 3, name: 'ПСН' },
                { id: 4, name: 'Общепит' }, { id: 5, name: 'Гараж' },
                { id: 6, name: 'Производство' }, { id: 7, name: 'Автосервис' },
                { id: 8, name: 'Готовый бизнес' }, { id: 9, name: 'Здание' },
                { id: 10, name: 'Бытовые услуги' }
            ],
            type: {},
            units: [],
            unit: {},
            date: '',
            time: ''
        }
    },
    methods: {
        addRoom() {
            this.rooms.push({ index: this.rooms.length, name: '', type: '', rent: '', square: '' })
        },
        removeRoom(index) {
            this.rooms = this.rooms.filter(room => room.index !== index)
        }
    },
    components: {
        SideMenu,
        'ranty-header': Header,
        Dropdown
    }
}
</script>

<style lang="sass" scoped>
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
        margin: 30px auto

.room
    position: relative
    box-shadow: 0 1px 6px #ccc
    padding: 20px
    margin-bottom: 30px
    .half-splitted:last-of-type
        .form-group
            margin-bottom: 0
    .remove
        position: absolute
        right: 5px 
        top: 5px
        color: #E9E9F0
        cursor: pointer

.underlined
    text-align: center
    cursor: pointer

.half-splitted .form-group
    width: 45% !important

.triple-splitted
    margin-top: 30px
    align-items: flex-end

.form-group.checkbox
    input
        border-radius: 50%

textarea
    width: 100%

@media (max-width: 810px)
    .triple-splitted
        align-items: flex-start
        flex-direction: column !important
        & > div
            width: 100%

@media (max-width: 780px)
    .half-splitted
        flex-direction: column !important
        .form-group
            width: 100% !important
            margin-bottom: 15px !important
            


</style>
