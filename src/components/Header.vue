<template>
  <header class="flex justify-between border-b border-slate-300 px-8 gap-5">
    <div class="flex items-center">
      <img src="/logo.png" alt="logo" class="w-10" />
      <router-link to="/">
        <div class="m-2">
          <h2 class="text-xl font-bold uppercase">ПалЕнки</h2>
          <p class="text-slate-500">фирменные ботинки</p>
        </div>
      </router-link>
    </div>

    <ul class="grid grid-col gap-3 sm:flex items-center gap-3 md:flex items-center gap-3">
      <li
        @click="() => emit('openBasket')"
        class="flex items-center cursor-pointer text-gray-500 hover:text-black"
      >
        <img class="mr-2" src="/cart.svg" alt="cart" />
        <b>{{ superPrice }}</b>
      </li>
      <router-link to="/favorite"
        ><li class="flex items-center cursor-pointer text-gray-500 hover:text-black">
          <img class="mr-2" src="/heart.svg" alt="heart" />
          <b class="mr-1">Лайки</b>
        </li></router-link
      >
      <li class="flex items-center cursor-pointer text-gray-500 hover:text-black">
        <img class="mr-2" src="/profile.svg" alt="profile" />
        <b>biba</b>
      </li>
    </ul>
  </header>
</template>

<script setup>
const emit = defineEmits('openBasket')

defineProps({
  superPrice: Number
})
</script>
