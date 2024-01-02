<script setup>
import {  ref, watch, provide, computed } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'


const basket = ref(false)
const cart = ref([])
const disabledButton = ref(false)

const superPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const taxPrice = computed(() => Math.round(superPrice.value * 0.05))
const checkDesabled = computed(() => disabledButton.value || cart.value.length === 0)


const OnAddInBasket = (item) => {
  cart.value.push(item)
  item.isAdd = true
}

const onDeleteInBasket = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdd = false
}

const addToCart = (item) => {
  if (!item.isAdd) {
    OnAddInBasket(item)
  } else {
    onDeleteInBasket(item)
  }

  console.log(cart.value)
}

const openBasket = () => {
  basket.value = true
}

const closeBasket = () => {
  basket.value = false
}

const newOrder = async () => {
  try {
    disabledButton.value = true
    const { data } = await axios.post('https://8106ad2f73305504.mokky.dev/orders', {
      item: cart.value,
      superPrice: superPrice.value
    })
    cart.value = []
    return data
  } catch (e) {
    console.log()
  } finally {
    disabledButton.value = false
  }
}


// provide('addToFavorite', addToFavorite)
provide('closeBasket', closeBasket)
provide('cart', cart)
provide('onDeleteInBasket', onDeleteInBasket)
provide('addToCart', addToCart)


watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

// fetch('https://604781a0efa572c1.mokky.dev/items')
// .then( response => response.json()).then(data =>{
//   console.log(data)
// })
// axios.get('https://604781a0efa572c1.mokky.dev/items').then(res => console.log(res.data))

// watch(filters, async () => {
//   try {
//     const { data } = await axios.get(
//       'https://604781a0efa572c1.mokky.dev/items?sortBy=' + filters.sortBy
//     )
//     items.value = data
//   } catch (e) {
//     console.log(e)
//   }
// })
//
</script>

<template>
  <Drawer
    v-if="basket"
    :taxPrice="taxPrice"
    :superPrice="superPrice"
    @newOrder="newOrder"
    :checkDesabled="checkDesabled"
  />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header @openBasket="openBasket" :superPrice="superPrice"></Header>
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style></style>
