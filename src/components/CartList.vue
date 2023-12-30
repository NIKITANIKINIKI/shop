<template>
<div class="grid grid-cols gap-5">
    <CartItem
    v-for="item in cart"
    :key="item.id"
    :imgUrl="item.imageUrl" 
    :title="item.title" 
    :price="item.price" 
    :isAdd="item.isAdd" 
    :isFan="item.isFan"/>
    
</div> 
</template>

<script setup>
import CartItem from './CartItem.vue';
import {inject} from 'vue'

const cart=inject('cart')

console.log(cart)


</script>