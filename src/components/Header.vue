<template>
  <header class="flex justify-between border-b border-slate-300 px-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="logo" class="w-10" />
      <div class="m-5">
        <h2 class="text-xl font-bold uppercase">ПалЕнки</h2>
        <p class="text-slate-500">фирменные ботинки</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/cart.svg" alt="cart" />
        <b>400</b>
      </li>
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/heart.svg" alt="heart" />
        <b>Закладки</b>
      </li>
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="profile" />
        <b>biba</b>
      </li>
    </ul>
  </header>
</template>
