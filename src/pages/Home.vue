<template>
<section class="gray-background overflow-hidden">
    <side-menu/>
    <main class="home main-content">
        <ranty-header/>
        <div class="wrapper">
            <div class="filters">
              <nav class="one-line">
                <div :class="(currentTab === 'rooms' ? 'active' : '')" @click="currentTab = 'rooms'">Помещение</div>
                <div :class="(currentTab === 'leads' ? 'active' : '')" @click="currentTab = 'leads'">Лиды</div>
              </nav>
              <div class="content one-line">
                <div class="form-group icon-input">
                  <input type="text" class="box-based" v-model="query" placeholder="Поиск" />
                  <i v-show="query.length === 0" class="material-icons">search</i>
                </div>
                <div class="vertical">
                  <div class="form-group line-linked">
                    <label>Площадь</label>
                    <div class="one-line">
                      <input type="text" class="box-based" v-model="squareMin" placeholder="25" />
                      <div class="divider"></div>
                      <input type="text" class="box-based" v-model="squareMax" placeholder="50" />
                    </div>
                  </div>
                  <dropdown :items="types" :chosenItem="type" v-model="type" defaultLabel="Тип" classes="box-based"/>
                </div>
                <div class="vertical">
                  <div class="form-group line-linked">
                    <label>Арендная плата</label>
                    <div class="one-line">
                      <input type="text" class="box-based" v-model="rentMin" placeholder="15000" />
                      <div class="divider"></div>
                      <input type="text" class="box-based" v-model="rentMax" placeholder="60000" />
                    </div>
                  </div>
                  <dropdown :items="statuses" :chosenItem="status" v-model="status" defaultLabel="Статус" classes="box-based"/>
                </div>
              </div>
            </div>
            <table v-if="currentTab === 'rooms'">
              <thead>
                <tr>
                  <th>Объект</th>
                  <th>Помещение</th>
                  <th>Арендатор</th>
                  <th>Статус</th>
                  <th>Тип</th>
                  <th>Площадь</th>
                  <th>Размещение</th>
                  <th>Цена</th>
                  <th>Баланс</th>
                </tr>
              </thead>
              <tbody v-for="room in rooms" :key="room.id">
                <tr class="spacer"></tr>
                <!-- <tr @click="() => routeTo(`room/${room.id}`)"> -->
                <tr @click="() => routeTo(`room/${room.id}`)">
                  <td>{{ room.address }}</td>
                  <td>{{ room.title }}</td>
                  <td>–</td>
                  <td class="status">
                    <div class="free">
                      Свободно
                    </div>
                  </td>
                  <td>{{ getTypeName(room.type) }}</td>
                  <td>{{ room.area }} м<sup>2</sup></td>
                  <td>{{ room.integrations || '–' }}</td>
                  <td>{{ room.rent }}</td>
                  <td>–</td>
                </tr>
              </tbody>
              <!-- <tbody>
                <tr class="spacer"></tr>
                <tr>
                  <td>Ул. Планетная 28</td>
                  <td>кв. 19</td>
                  <td>ООО «PWC»</td>
                  <td class="status">
                    <div class="expires">
                      Сдано до<br/>
                      13.08.18
                    </div>
                  </td>
                  <td>Квартира</td>
                  <td>54 м<sup>2</sup></td>
                  <td>Yandex, Cian</td>
                  <td>45000</td>
                  <td>–</td>
                </tr>
              </tbody>
              <tbody>
                <tr class="spacer"></tr>
                <tr>
                  <td>Ул. Планетная 28</td>
                  <td>кв. 19</td>
                  <td>ООО "Евросеть"</td>
                  <td class="status">
                    <div class="rented">
                      Истекает<br/>
                      04.07.18
                    </div>
                  </td>
                  <td>Торговое</td>
                  <td>67 м<sup>2</sup></td>
                  <td>Yandex, Cian</td>
                  <td>75000</td>
                  <td>–14000</td>
                </tr>
              </tbody> -->
            </table>
            <table v-else>
              <thead>
                <tr>
                  <th>Объект</th>
                  <th>Тип</th>
                  <th>Площадь</th>
                  <th>Цена</th>
                  <th>Контакт</th>
                  <th>Телефон</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-for="lead in leads" :key="lead.id">
                <tr class="spacer"></tr>
                <tr>
                  <td>{{ getRoomProperty(lead.room_id, 'address') }}</td>
                  <td>{{ getTypeName(getRoomProperty(lead.room_id, 'type')) }}</td>
                  <td>{{ getRoomProperty(lead.room_id, 'area') }} м<sup>2</sup></td>
                  <td>{{ getRoomProperty(lead.room_id, 'rent') }} руб.</td>
                  <td>{{ lead.firstname + ' ' + lead.secondname }}</td>
                  <td>{{ lead.phone }}</td>
                  <td>{{ lead.email }}</td>
                  <td>
                    <img @click="() => routeTo(`/new-commercial-offer/[${lead.id}, ${lead.room_id}]`)" class="hover" src="@/assets/shift.png" />
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
    </main>
</section>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'
import Header from '@/components/Header.vue'
import Dropdown from '@/components/Dropdown.vue'
export default {
  name: 'home',
  data() {
    return {
      currentTab: 'rooms',
      query: '',
      squareMin: '',
      squareMax: '',
      type: {},
      rentMin: '',
      rentMax: '',
      statuses: [],
      status: {},
      rooms: [],
      objects: [],
      leads: [],
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
    checkForAuth() {
      if (!this.token) {
        this.$router.push('/signin')
      }
    },
    routeTo(url) {
      this.$router.push(url)
    },
    getTypeName(id) {
      return ((this.types || []).filter(type => type.id === id)[0] || {}).name
    },
    getRoomProperty(id, property) {
      const room = this.rooms.filter(room => room.id === id)[0]
      return room[property]
    }
  },
  async created() {
    this.checkForAuth()
    const { body } = await this.$http.get('rooms', { 
      headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
      } 
    })
    this.rooms = body

    const res = await this.$http.get('tenants', { 
      headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
      } 
    })
    this.leads = res.body
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
  width: 95%
  border-radius: 8px
  margin: 30px auto 40px auto
  padding: 20px
  h2
      font-weight: normal
      font-size: 20px
      text-align: center
      margin-bottom: 60px

.filters
  margin-bottom: 15px
  nav
    & > div
      background: #F8F8F8
      padding: 10px 20px
      margin-right: 10px
      border: 1px solid #E9E9F0
      border-top-left-radius: 10px
      border-top-right-radius: 10px
      cursor: pointer
      font-weight: bold
      &.active
        color: black
        background: #FFEB00
        border-color: transparent
  .content
    background: #CECECE
    border-bottom-left-radius: 10px
    border-bottom-right-radius: 10px     
    padding: 30px 20px
    align-items: flex-start
    & > .form-group.icon-input
      width: 30%
      margin-right: 30px
      input
        width: 100%
    & > .vertical
      width: 20%
      margin-right: 30px
      &:last-of-type
        margin-right: 0
      .dropdown
        margin-bottom: 0
          

.line-linked
  display: flex
  flex-direction: column
  align-items: center
  margin-top: -23px
  .one-line
    justify-content: space-between !important
    align-items: center
    margin-top: 5px
    input
      width: 48% !important
    .divider
      width: 4%
      height: 2px
      background: #707070

.form-group.icon-input
  i
    transition: 0.3s
    color: #CECECE
  input:focus
    & ~ i
      color: #626262

table
  width: 100%
  border-collapse: collapse
  tr
    th
      text-align: left
      text-transform: uppercase
      font-size: 14px
      background: #E5E5E5
      padding: 10px 15px
      &:first-of-type
        border-top-left-radius: 10px
      &:last-of-type
        border-top-right-radius: 10px
    td
      background: white
      padding: 10px 15px
      &.status
        padding: 0
        text-align: center
        & > div
          border-radius: 25px
          &.free
            padding: 10px 5px
            background: #FABE58
            color: white
          &.expires
            background: #FFEB00
          &.rented
            background: #9FCE20
        
    &.spacer
      height: 15px
        
      

@media (max-width: 1150px)
  .filters
    .content
      .vertical
        width: 30%

@media (max-width: 780px)
  .filters
    .content
      flex-direction: column
      align-items: center
      & > .icon-input
        width: 100% !important
        margin-right: 0 !important
        margin-bottom: 15px
      .vertical
        width: 100%
        margin-right: 0
        margin-bottom: 15px
        &:last-of-type
          margin-bottom: 0
        .line-linked
          margin-top: 0 !important
          margin-bottom: 10px


</style>
