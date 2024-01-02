<script setup>
import { inject, ref, onMounted, reactive, watch } from 'vue'
import CardList from '../components/CardList.vue'
import axios from 'axios'

const items = ref([])

const cart = inject('cart')

const addToCart = inject('addToCart')

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})


const addToFavorite = async (item) => {
  try {
    if (!item.isFan) {
      const el = {
        parentId: item.id,
        item
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

const onChange = (event) => {
  filters.sortBy = event.target.value
  console.log(filters.sortBy)
}

const onChangeInput = (event) => {
  filters.searchQuery = event.target.value
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await axiosItems()
  await axiosFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdd: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(filters, axiosItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdd: false
  }))
})
</script>

<template>
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
        <img class="absolute left-4 top-4" src="/search.svg" alt="photo" />
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
</template>
