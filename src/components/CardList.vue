<script setup>
import Card from './Card.vue'


defineProps({
  items: Array
})


</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card 
    v-for="item in items"
    :v-key="item.id"
    :imgUrl="item.imageUrl" 
    :title="item.title" 
    :price="item.price" 
    :isAdd="true" 
    :isFan="true"
    :onClickAdd="onClickAdd"
    ></Card>
  </div>
</template>
