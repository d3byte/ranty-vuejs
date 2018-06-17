<template>
<div class="form-group dropdown">
    <div class="name">
        <input type="checkbox" v-model="toggled" />
        <label>{{ (Object.keys(chosenItem).length > 0 ? chosenItem.name : 'Объект') }}</label>
        <img src="@/assets/arrow_down.svg" @error="this.src = '@/assets/arrow_down.png'"/>
    </div>
    <ul class="items" v-show="toggled">
        <li v-for="item in items" :key="item.id" @click="() => selectItem(item)">{{ item.name }}</li>
    </ul>
</div>  
</template>

<script>
export default {
    name: 'dropdown',
    props: ['items', 'chosenItem'],
    data() {
        return {
            toggled: false
        }
    },
    methods: {
        selectItem(item) {
            this.$emit('input', item)
            this.toggled = false
        }
    },
}
</script>

<style lang="sass">
.form-group.dropdown
    input[type="checkbox"]
        opacity: 0
        position: absolute
        display: block
        top: 0
        width: 100%
        height: 100%
        cursor: pointer
        &:checked ~ img
            transform: rotate(180deg)
    .name
        position: relative
        background: transparent
        border: none
        width: 100%
        display: flex
        align-items: center
        justify-content: space-between
        border-bottom: 1px solid #E9E9EF
        padding: 10px 20px
        img
            width: 24px 
            transition: 0.3s
            &:active
                & ~ .items
                    display: block
    .items
        overflow: hidden
        border: 1px solid #E9E9EF
        border-top: none
        border-bottom-left-radius: 8px
        border-bottom-right-radius: 8px
        margin: 0
        padding: 10px
        list-style: none
        li
            margin-bottom: 15px
            &:last-of-type
                margin-bottom: 0
            &:hover
                cursor: pointer

</style>
