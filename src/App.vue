<script setup>
import { onMounted, ref, reactive, watch, provide, computed } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])
const basket = ref(false)
const cart = ref([])
const disabledButton = ref(false)

const superPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const taxPrice = computed(() => Math.round(superPrice.value * 0.05))
const checkDesabled = computed(() => disabledButton.value || cart.value.length === 0)

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

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

const onChange = (event) => {
  filters.sortBy = event.target.value
  console.log(filters.sortBy)
}

const onChangeInput = (event) => {
  filters.searchQuery = event.target.value
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
    console.log
  } finally {
    disabledButton.value = false
  }
}

const axiosFavorites = async () => {
  try {
    const { data } = await axios.get('https://8106ad2f73305504.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = data.find((el) => el.parentId == item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFan: true,
        favoriteId: favorite.id
      }
    })
  } catch (e) {
    console.log(e)
  }
}

const axiosItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://8106ad2f73305504.mokky.dev/items`, {
      params
    })
    items.value = data.map((el) => ({
      ...el,
      isFan: false,
      isAdd: false
    }))
  } catch (e) {
    console.log(e)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFan) {
      const el = {
        parentId: item.id
      }

      item.isFan = true

      const { data } = await axios.post('https://8106ad2f73305504.mokky.dev/favorites', el)

      item.favoriteId = data.id
    } else {
      await axios.delete(`https://8106ad2f73305504.mokky.dev/favorites/${item.favoriteId}`)
      item.isFan = false
      item.favoriteId = null
    }
  } catch (e) {
    console.log(e)
  }
}

// provide('addToFavorite', addToFavorite)
provide('closeBasket', closeBasket)
provide('cart', cart)
provide('onDeleteInBasket', onDeleteInBasket)

onMounted(async () => {
  const localCart=localStorage.getItem('cart')
  cart.value=localCart ? JSON.parse(localCart) : []

  await axiosItems()
  await axiosFavorites()

  items.value=items.value.map((item) =>({
    ...item,
    isAdd: cart.value.some((cartItem) => cartItem.id===item.id )
  }))
})

watch(filters, axiosItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdd: false
  }))
})

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
      <div class="grid grid-col sm:grid grid-col md:flex justify-between items-center gap-5">
        <h2 class="font-bold mb-8 text-2xl">Выгодно!</h2>
        <div class="grid grid-col md:flex gap-5">
          <select
            @change="onChange"
            class="py-3 px-1 border rounded-md outline-none focus:border-gray-500"
          >
            <option value="name">По названию</option>
            <option value="-price">По цене(дорогие)</option>
            <option value="price">По цене(дешевые)</option>
          </select>

          <div class="relative">
            <img class="absolute left-4 top-4" src="/search.svg" alt="" />
            <input
              @input="onChangeInput"
              class="border rounded-md py-3 pl-10 pr-4 outline-none focus:border-gray-500"
              type="text"
              placeholder="Поиск"
            />
          </div>
        </div>
      </div>
      <div class="mt-5">
        <CardList :items="items" @addToFavorite="addToFavorite" @addToCart="addToCart"></CardList>
      </div>
    </div>
  </div>
</template>

<style></style>
