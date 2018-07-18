<template>
<div :class="'form-group dropdown ' + (classes || '')">
    <div class="name">
        <input type="checkbox" v-model="toggled" />
        <label>{{ (Object.keys(chosenItem).length > 0 ? chosenItem.name || chosenItem.title : defaultLabel) }}</label>
        <img src="@/assets/arrow_down.svg" @error="this.src = '@/assets/arrow_down.png'"/>
    </div>
    <ul class="items" v-show="toggled">
        <li v-for="item in items" :key="item.id" @click="() => selectItem(item)">{{ item.name || item.title }}</li>
    </ul>
</div>  
</template>

<script>
export default {
    name: 'dropdown',
    props: ['items', 'chosenItem', 'defaultLabel', 'classes'],
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
