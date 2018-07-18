<template>
<section class="gray-background overflow-hidden">
    <side-menu/>
    <main class="commercial-offer main-content">
        <ranty-header/>
        <div class="wrapper">
            <h2 v-if="stage !== 2">Новое коммерческое предложение</h2>
            <h2 v-else>Коммерческое предложение для {{ organization }}</h2>
            <form v-show="stage === 0 && !loading && !success" class="stage-1" @submit="e => e.preventDefault()">
                <dropdown v-if="!$route.params" :items="rooms" :chosenItem="chosenRoom" v-model="chosenRoom" defaultLabel="Помещение" classes="w-60"/>
                <h4 class="room-name">{{ chosenRoom.title }}</h4>
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
                <div class="half-splitted w-60">
                    <div class="form-group floating-label">
                        <input type="tel" class="line-based" v-model="telephone" required />
                        <label>Телефон</label>
                    </div>
                    <div class="form-group floating-label">
                        <input type="email" :class="'line-based ' + ((email || '').length > 0 ? 'static' : '')" v-model="email" required />
                        <label>Email</label>
                    </div>
                </div>
                <div class="half-splitted w-60">
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
            <form v-show="stage === 1 && !loading && !success" class="stage-2" @submit="e => e.preventDefault()">
                <div class="one-line">
                    <div class="form-group static-label">
                        <label class="required">Арендная плата<sup>*</sup></label>
                        <div class="one-line">
                            <input type="text" class="line-based w-150" v-model="rent" required />
                            <span>рублей</span>
                        </div>
                    </div>
                    <div class="form-group static-label">
                        <label class="required">Срок аренды<sup>*</sup></label>
                        <div class="one-line">
                            <input type="text" class="line-based w-90" v-model="rentTime" required />
                            <span>месяцев</span>
                        </div>
                    </div>
                </div>
                <div class="form-group static-label no-margin-right">
                    <label class="required">Оплата аренды до<sup>*</sup></label>
                    <div class="one-line">
                        <input type="text" class="line-based w-90" v-model="payTime" required />
                        <span>числа</span>
                    </div>
                </div>
                <div class="one-line">
                    <div class="form-group static-label">
                        <label>Депозит</label>
                        <input type="text" class="line-based w-150" v-model="deposit" required />
                    </div>
                    <div class="form-group static-label">
                        <label>Индексация</label>
                        <input type="text" class="line-based w-150" v-model="index" required />
                    </div>
                </div>
                <div class="one-line align-to-bottom">
                    <span>Арендные каникулы</span>
                    <input type="number" class="line-based w-90" v-model="rentHolidaysNum" min="0" required />
                    <span>месяцев</span>
                </div>
                <div class="one-line wrap w-60 holidays">
                    <div class="one-line holiday" v-for="(holiday, index) in rentHolidays" :key="index">
                        <span>{{ index + 1 }}</span>
                        <input type="number" class="line-based w-90" v-model="holiday.value" required />
                    </div>
                </div>
                <div class="form-group static-label variablePayments">
                    <label class="required">Переменные платежи<sup>*</sup></label>
                    <div class="form-group checkbox" v-for="payment in variablePayments" :key="payment.id">
                        <input type="checkbox" :id="payment.id" v-model="payment.value" />
                        <label :for="payment.id">{{ payment.name }}</label>
                    </div>
                </div>
                <div class="form-group static-label w-60">
                    <label class="required">Оплата переменных платежей<sup>*</sup></label>
                    <div class="one-line align-to-bottom">
                        <span>не позднее</span>
                        <input type="number" class="line-based w-90" v-model="pay_perem" min="0" required />
                        <span>дней с выставления</span>
                    </div>
                </div>
                <div class="one-line align-to-bottom w-60">
                    <span>Пени</span>
                    <input type="number" class="line-based w-90" v-model="penalties" min="0" required />
                    <span>% в день от суммы задолженности<sup class="red">*</sup></span>
                </div>
                <div class="progress-bar">
                    <div class="stage taken">1</div>
                    <div class="stage taken active">2</div>
                    <div class="stage">3</div>
                </div>
                <button @click="nextStage" class="square-like yellow">Дальше</button>
            </form>
            <form v-show="stage === 2 && !loading && !success" class="stage-2" @submit="e => e.preventDefault()">
                <div class="one-line space-between">
                    <span>
                        {{ chosenRoom.title }} <br>
                        {{ chosenRoom.address }}
                    </span>
                    <b>{{ getTypeName(chosenRoom.type) }}, {{ chosenRoom.area }} м<sup>2</sup></b>
                </div>
                <div class="images">
                    <img v-for="(img, index) in chosenRoom.images" :key="index" :src="img" />
                </div>
                <!-- <div class="one-line space-between">
                    <span>Класс здания</span>
                    <b>А</b>
                </div>
                <div class="one-line space-between">
                    <span>Этаж</span>
                    <b>7/22</b>
                </div>
                <div class="one-line space-between">
                    <span>Вход</span>
                    <b>Общий</b>
                </div>
                <div class="one-line space-between">
                    <span>Интернет, телефон</span>
                    <b>Есть, есть</b>
                </div>
                <div class="one-line space-between">
                    <span>Паркинг</span>
                    <b>10 м/м</b>
                </div> -->
                <p class="sub-header">Коммерческие условия</p>
                <div class="one-line space-between">
                    <span>Срок аренды</span>
                    <b>{{ rentTime }} месяцев</b>
                </div>
                <div class="one-line space-between">
                    <span>Арендная плата</span>
                    <b>{{ rent }} рублей/мес</b>
                </div>
                <div class="one-line space-between">
                    <span>Оплата аренды не позднее</span>
                    <b>{{ payTime }} числа</b>
                </div>
                <div class="one-line space-between">
                    <span>Депозит</span>
                    <b>{{ deposit }} рублей</b>
                </div>
                <div class="one-line space-between">
                    <span>Оплачивается отдельно</span>
                    <b>
                        <span v-for="(pay, index) in variablePayments" :key="pay.id" v-if="pay.value">
                            {{ index !== variablePayments.length - 1 ? `${pay.name},` : pay.name }}
                        </span>
                    </b>
                </div>
                <div class="one-line space-between">
                    <span>Оплата переменных платежей</span>
                    <b>Не позднее {{ pay_perem }}-х дней с момента выставления счёта</b>
                </div>
                <div class="one-line space-between w-60">
                    <span>Пени</span>
                    <b>{{ penalties }}% от суммы задолженности в день</b>
                </div>
                <div class="progress-bar">
                    <div class="stage taken">1</div>
                    <div class="stage taken">2</div>
                    <div class="stage taken active">3</div>
                </div>
                <button @click="submit" class="square-like yellow">Отправить</button>
            </form>
            <h4 class="status" v-show="loading">Отправляется...</h4>
            <h4 class="status" v-show="success">Отправлено</h4>
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
            stage: 0,
            rooms: [
                {
                    id: 15,
                    name: 'Главный холл'
                },
                {
                    id: 16,
                    name: 'Ванная комната'
                }
            ],
            chosenRoom: {},
            firstName: '',
            lastName: '',
            telephone: '',
            email: '',
            organization: '',
            inn: '',
            rent: '',
            rentTime: 0,
            payTime: '',
            deposit: '',
            index: '',
            rentHolidaysNum: '',
            rentHolidays: [],
            variablePayments: [
                {
                    id: 0,
                    name: 'Электроэнергия',
                    value: false
                },
                {
                    id: 1,
                    name: 'ГВС',
                    value: false
                },
                {
                    id: 2,
                    name: 'ХВС',
                    value: false
                },
                {
                    id: 3,
                    name: 'Теплоснабжение',
                    value: false
                }
            ],
            tenant: {},
            penalties: '',
            pay_perem: '',
            loading: false,
            success: false
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
        nextStage() {
            // Добавить валидацию
            this.stage++
            if (this.stage === 2) {
            }
        },
        getTypeName(id) {
            return ((this.types || []).filter(type => type.id === id)[0] || {}).name
        },
        async fetchInfo() {
            const { ids } = this.$route.params
            const leadId = JSON.parse(ids)[0]
            const roomId = JSON.parse(ids)[1]
            const lead = await this.$http.get(`tenants/${leadId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                }
            })
            this.tenant = lead.body[0]
            this.firstName = lead.body[0].firstname
            this.lastName = lead.body[0].secondname
            this.telephone = lead.body[0].phone
            this.email = lead.body[0].email
            const room = await this.$http.get(`rooms/${roomId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                }
            })
            this.chosenRoom = room.body
            this.rent = room.body.rent
        },
        formatHolidays() {
            const holidays = this.rentHolidays.map((item, index) => ({ index: item.value }))
            return {
                ...holidays
            }
        },
        async submit() {
            const body = {
                tenant: {
                    id: this.tenant.id,
                },
                tenant_data: {
                    tenant_id: this.tenant.id,
                    company_name: this.organization,
                    inn: this.inn,
                    term: this.rentTime,
                    pay: this.rent,
                    deposit: this.deposit,
                    index: this.index,
                    rent_holiday: JSON.stringify(this.formatHolidays()),
                    electro: this.variablePayments[0].value ? 1 : 0,
                    gvs: this.variablePayments[1].value ? 1 : 0,
                    hvs: this.variablePayments[2].value ? 1 : 0,
                    hot: this.variablePayments[3].value ? 1 : 0,
                    pay_perem: this.payTime,
                    penalties: this.penalties,
                },
            }
            this.loading = true
            const res = await this.$http.post('tenants', body, {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                }
            })
            if (res.body.success) {
                this.loading = false
                this.success = true
            }
        }
    },
    watch: {
        rentHolidaysNum(newValue, previousValue) {
            let length = this.rentHolidays.length
            if (newValue > previousValue && newValue > 0) {
                while (length < newValue) {
                    length++
                    this.rentHolidays.push({ id: length, value: '' })
                }
                return
            }
            while (length > newValue) {
                length--
                this.rentHolidays.pop()
            }
        }
    },
    created() {
        this.fetchInfo()
    },
    components: {
        SideMenu,
        'ranty-header': Header,
        Dropdown
    }
}
</script>

<style lang="sass" scoped>
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

        .room-name
            margin: 30px 0

    .status
        text-align: center

    form
        max-width: 500px
        margin: 0 auto

    .w-60
        margin-bottom: 60px !important

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
        border: 3px solid transparent
        border-radius: 50%
        background: #E5E5E5
        margin-right: $space-between-stages
        flex-shrink: 0
        &:after
            position: absolute
            content: ''
            right: -($space-between-stages + 3)
            width: $space-between-stages
            height: 3px
            background: #E5E5E5
        &:before
            position: absolute
            content: ''
            left: -($space-between-stages + 3)
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
                background: white
                border-color: #FFEB00
                

.w-150
    width: 150px

.w-90
    width: 90px

.form-group
    &:not(:last-of-type)
        margin-right: 40px
    .one-line
        margin-top: 15px
                
.one-line
    span:not(:first-child)
        margin-left: 20px
    &.align-to-bottom
        align-items: flex-end

.red
    color: red

.holidays
    .holiday
        margin-right: 30px
        margin-top: 15px
        &:last-of-type
            margin-right: 0

.variablePayments
    .checkbox
        margin-bottom: 5px
        &:first-of-type
            margin-top: 15px

.images
    margin-bottom: 30px
    img
        width: 32%
        height: 120px
        margin-right: 2%
        margin-top: 15px
        &:nth-of-type(3n)
            margin-right: 0

.stage-2
    .one-line.space-between
        margin-bottom: 10px
        & > *
            width: 48%
        & > b
            text-align: right
    .sub-header
        font-size: 20px
        text-align: center

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
            right: -43px
        &:before
            width: 40px
            left: -43px

</style>
