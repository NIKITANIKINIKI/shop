<template>
  <div
    @click="onClickBasket"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50"
  ></div>
  <div class="bg-white z-20 fixed top-0 right-0 w-96 h-full p-8 overflow-scroll">
    <DrawerHead />
    <div v-if="!superPrice" class=" flex items-center h-full">
      <BasketInfo  title="Корзина пуста" description="Добавьте кроссовки" imgUrl="/package-icon.png" />
    </div>
    <CartList />
    <div v-if="superPrice" class="flex flex-col gap-5 mt-5">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ superPrice }}</b>
      </div>
      <div class="flex gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ taxPrice }}</b>
      </div>
      <button
        :disabled="checkDesabled"
        @click="() => emit('newOrder')"
        class="transition bg-green-400 rounded-xl py-4 text-white hover:bg-green-500 disabled:bg-slate-400 cursor-pointer"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<script setup>
import DrawerHead from './DrawerHead.vue'
import CartList from './CartList.vue'
import { inject } from 'vue'

import BasketInfo from './BasketInfo.vue'

const onClickBasket = inject('closeBasket')

defineProps({
  taxPrice: Number,
  superPrice: Number,
  checkDesabled: Boolean
})

const emit = defineEmits(['newOrder'])
</script>
