<template>
  <div
    class="relative bg-white border border-slate-100 rounded-xl p-3 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl m-2">
    <img @click="onClickFan" :src="isFan ? '/like-2.svg' : '/like-1.svg'" alt="plus" />
    <img :src="imgUrl" alt="sneakers" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-500"> Price: </span>
        <span> {{ price  }} руб</span>
      </div>
      <img  @click="onClickAdd" :src="!isAdd ? '/plus.svg' : '/checked.svg'" alt="plus" />
    </div>
  </div>
</template>


<script setup>


const props= defineProps({
    id:Number,
    imgUrl: String,
    title: String,
    price: Number,
    isFan: Boolean,
    isAdd: Boolean,
    onClickFan: Function,
    onClickAdd:Function
})



</script>
