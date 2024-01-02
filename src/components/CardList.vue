<script setup>
import Card from './Card.vue'



defineProps({
  items: Array
})


const emit=defineEmits(['addToFavorite', 'addToCart'])

</script>

<template>
  <div  v-auto-animate class="sm:grid grid-cols md:grid grid-cols-3 gap-5 lg:grid grid-cols-3 gap-5" >
    <Card 
    v-for="item in items"
    :v-key="item.id"
    :imgUrl="item.imageUrl" 
    :title="item.title" 
    :price="item.price" 
    :isAdd="item.isAdd" 
    :isFan="item.isFan"
    :onClickAdd="() => emit('addToCart', item)"
    :onClickFan="() => emit('addToFavorite', item)"
    ></Card>
  </div>
</template>
