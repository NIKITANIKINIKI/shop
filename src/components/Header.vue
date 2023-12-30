<template>
  <header class="flex justify-between border-b border-slate-300 px-8 gap-5">
    <div class="flex items-center">
      <img src="/logo.png" alt="logo" class="w-10" />
      <div class="m-2">
        <h2 class="text-xl font-bold uppercase">ПалЕнки</h2>
        <p class="text-slate-500">фирменные ботинки</p>
      </div>
    </div>

    <ul class="grid grid-col sm:flex items-center md:flex items-center">
      <li @click="() => emit('openBasket')" class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img  class="ml-3" src="/cart.svg" alt="cart" />
        <b>400</b>
      </li>
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img class="ml-3" src="/heart.svg" alt="heart" />
        <b>Закладки</b>
      </li>
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img class="ml-3" src="/profile.svg" alt="profile" />
        <b>biba</b>
      </li>
    </ul>
  </header>
</template>


<script setup>

const emit=defineEmits('openBasket')

</script>