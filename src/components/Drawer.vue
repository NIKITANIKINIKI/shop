<template>
  <div @click="onClickBasket" class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50"></div>
  <div class="bg-white z-20 fixed top-0 right-0 w-96 h-full p-8">
    <DrawerHead/>
    <CartList/>
    <div class="flex flex-col gap-5 mt-5" >
        <div class="flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>12990</b>
        </div>
        <div class="flex gap-2">
            <span>Налог 6%:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>900</b>
        </div>
        <button
        disabled="" 
        class=" transition bg-green-400 rounded-xl py-4 text-white hover:bg-green-500 disabled:bg-slate-400 cursor-pointer">
            Оформить заказ 
        </button>
    </div>

  </div>
  
</template>

<script setup>
import DrawerHead from './DrawerHead.vue'
import CartList from './CartList.vue'
import {inject} from 'vue'

const onClickBasket=inject('closeBasket')
</script>
