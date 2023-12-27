<script setup>
import { onMounted, ref, reactive, watch, provide } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChange = (event) => {
  filters.sortBy = event.target.value
  console.log(filters.sortBy)
}

const onChangeInput = (event) => {
  filters.searchQuery = event.target.value
}

const axiosFavorites = async () => {
  try {
    const { data } = await axios.get('https://8106ad2f73305504.mokky.dev/favorites')
    items.value = data
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

    const { data } = await axios.get(`https://604781a0efa572c1.mokky.dev/items`, {
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


const addToFavorite= async(item) =>{
  item.isFan=true
}

provide('addToFavorite', addToFavorite)


onMounted(axiosItems)
watch(filters, axiosItems)

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
  <!-- <Drawer/> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header></Header>
    <div class="p-10">
      <div class="grid grid-col sm:grid grid-col md:flex justify-between items-center gap-5">
        <h2 class=" font-bold mb-8 text-2xl">Выгодно!</h2>
        <div class="grid grid-col sm:grid grid-col md:flex gap-4">
          <select
            @change="onChange"
            class="py-3 px-2 border rounded-md outline-none focus:border-gray-500"
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
        <CardList :items="items"></CardList>
      </div>
    </div>
  </div>
</template>

<style></style>
