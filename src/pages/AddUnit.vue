<template>
<section class="gray-background overflow-hidden">
    <side-menu/>
    <main class="add-unit main-content">
        <ranty-header/>
        <div class="wrapper">
            <h2>Создание объекта</h2>
            <form @submit="e => e.preventDefault()">
                <div class="form-group floating-label increased-font-size">
                    <input type="text" class="line-based" v-model="unitName" required />
                    <label>Новый объект</label>
                </div>
                <div class="form-group floating-label">
                    <input type="text" class="line-based" v-model="city" required />
                    <label>Город</label>
                </div>
                <div class="form-group floating-label">
                    <input type="text" class="line-based" v-model="adress" required />
                    <label>Адрес</label>
                </div>
                <div class="room" v-for="(room, key) in rooms" :key="key">
                    <i class="material-icons remove" v-if="key !== 0" @click="() => removeRoom(room.index)">close</i>
                    <div class="half-splitted">
                        <div class="form-group floating-label">
                            <input type="text" class="line-based" v-model="room.name" required />
                            <label>Имя помещения</label>
                        </div>
                        <div class="form-group floating-label">
                            <input type="text" class="line-based" v-model="room.type" required />
                            <label>Тип</label>
                        </div>
                    </div>
                    <div class="half-splitted">
                        <div class="form-group floating-label">
                            <input type="num" class="line-based" v-model="room.rent" required />
                            <label>Арендная плата</label>
                        </div>
                        <div class="form-group floating-label">
                            <input type="num" class="line-based" v-model="room.square" required />
                            <label>Площадь</label>
                        </div>
                    </div>
                </div>
                <p class="underlined" @click="addRoom">+ больше помещений</p>
                <button class="square-like yellow">Создать</button>
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
            unitName: '',
            city: '',
            adress: '',
            rooms: [
                {
                    index: 0,
                    name: '',
                    type: '',
                    rent: '',
                    square: ''
                },
            ]
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

@media (max-width: 780px)
    .half-splitted
        flex-direction: column !important
        .form-group
            margin-bottom: 15px !important
            &:last-of-type
                margin-bottom: 0 !important
</style>
