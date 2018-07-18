<template>
<section class="gray-background overflow-hidden">
    <side-menu/>
    <main class="add-unit main-content">
        <ranty-header/>
        <div class="wrapper">
            <h2>Создание объекта</h2>
            <form @submit="e => e.preventDefault()">
                <div class="form-group floating-label increased-font-size">
                    <input type="text" class="line-based" v-model="title" required />
                    <label>Новый объект</label>
                </div>
                <!-- <div class="form-group floating-label">
                    <input type="text" class="line-based" v-model="city" required />
                    <label>Город</label>
                </div> -->
                <div class="form-group floating-label">
                    <input type="text" class="line-based" v-model="address" required />
                    <label>Адрес</label>
                </div>
                <div class="room" v-for="(room, key) in rooms" :key="key">
                    <i class="material-icons remove" v-if="key !== 0" @click="() => removeRoom(room.index)">close</i>
                    <div class="half-splitted">
                        <label>Помещение {{ key + 1 }}</label>
                        <dropdown :items="types" :chosenItem="room.type" v-model="room.type" defaultLabel="Тип"/>
                    </div>
                    <div class="half-splitted">
                        <div class="form-group floating-label">
                            <input type="num" class="line-based" v-model="room.rent" required />
                            <label>Арендная плата</label>
                        </div>
                        <div class="form-group floating-label">
                            <input type="num" class="line-based" v-model="room.area" required />
                            <label>Площадь</label>
                        </div>
                    </div>
                </div>
                <p class="underlined" @click="addRoom">+ больше помещений</p>
                <button class="square-like yellow" @click="submit">Создать</button>
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
            title: '',
            // city: '',
            address: '',
            rooms: [
                {
                    index: 0,
                    type: '',
                    rent: '',
                    area: '',
                    type: '',
                },
            ],
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
        }
    },
    methods: {
        addRoom() {
            this.rooms.push({ index: this.rooms.length, name: '', type: '', rent: '', square: '' })
        },
        removeRoom(index) {
            this.rooms = this.rooms.filter(room => room.index !== index)
        },
        async submit() {
            const { title, city, address, rooms } = this
            const { body } = await this.$http.post('objects', {
                area_all: 0,
                rooms: rooms.map(room => {
                    delete room.index
                    return { 
                        ...room, address, title,
                        user_id: this.user.id, owner_id: this.user.id, 
                        type: room.type.id, img: 'code', 
                        area: parseInt(room.area),
                        rent: parseInt(room.rent)
                    }
                })
            }, { 
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                }
            })
            console.log(body)
            const { data, errors } = body
        },
        checkForAuth() {
            if (!this.token) {
                this.$router.push('/signin')
            }
        }
    },
    created() {
        this.checkForAuth()
    },
    components: {
        SideMenu,
        'ranty-header': Header,
        Dropdown
    }
}
</script>

<style lang="sass">


.add-unit
    .form-group.dropdown
        padding: 0 !important
        min-width: 173px
        .name
            padding: 4px 10px !important

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
    .add-unit
        .half-splitted
            flex-direction: column !important
            margin-bottom: 30px
            &:last-of-type
                margin-bottom: 0
            .form-group
                margin-bottom: 15px !important
                &:last-of-type
                    margin-bottom: 0 !important
</style>
