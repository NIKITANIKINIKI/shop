<template>
<div class="grid grid-cols gap-5 " v-auto-animate>
    <CartItem
    v-for="item in cart"
    :key="item.id"
    :imgUrl="item.imageUrl" 
    :title="item.title" 
    :price="item.price"
    @clickDelete="() => onDeleteInBasket(item)"/>
</div> 
</template>

<script setup>
import CartItem from './CartItem.vue';
import {inject} from 'vue'

const cart=inject('cart')

const onDeleteInBasket=inject('onDeleteInBasket')

</script>