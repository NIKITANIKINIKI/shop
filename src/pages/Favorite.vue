<template>
  <div class="mt-5">
    <CardList :items="favorite" @addToCart="addToCart" @addToFavorite="delFavorite"></CardList>
  </div>
</template>


<!-- доработать addToCart -->

<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import axios from 'axios'
import CardList from '@/components/CardList.vue';

const favorite = ref([])

const addToCart = inject('addToCart')


const delFavorite= async (item) =>{
  try{

    const number=favorite.value.find(el => el.id==item.id).parentId

    // for(let i=0; i<favorite.value.length; i++){
    //   if(favorite.value[i].id==item.id){
    //     number=favorite.value[i].parentId
    //     break
    //   }
    // }

    await axios.delete(`https://8106ad2f73305504.mokky.dev/favorites/${number}`)
    getFavorite()
  }
  catch(e){
    console.log(e)
  }
}

const getFavorite = async () => {
  try {
    const { data } = await axios.get('https://8106ad2f73305504.mokky.dev/favorites')
    
    console.log(data)

    favorite.value=data.map((el) =>({
        ...el.item,
        parentId:el.id
    }))

    console.log(favorite.value)

  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  await getFavorite()
})


</script>
