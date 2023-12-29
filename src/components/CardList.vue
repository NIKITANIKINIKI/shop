<script setup>
import Card from './Card.vue'
import {inject} from 'vue'

// const addToFavorite=inject('addToFavorite')


defineProps({
  items: Array
})


const emit=defineEmits('addToFavorite')

</script>

<template>
  <div class="sm:grid grid-cols md:grid grid-cols-3 gap-5 lg:grid grid-cols-3 gap-5">
    <Card 
    v-for="item in items"
    :v-key="item.id"
    :imgUrl="item.imageUrl" 
    :title="item.title" 
    :price="item.price" 
    :isAdd="true" 
    :isFan="item.isFan"
    :onClickAdd="onClickAdd"
    :onClickFan="() => emit('addToFavorite', item)"
    ></Card>
  </div>
</template>
