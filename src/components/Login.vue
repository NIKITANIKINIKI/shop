<template>
    <form @submit.prevent="emit('loginUser')" class="grid gap-3">
      <input
        v-model="oldUser.email"
        class="outline-none pb-2 bg-rose-300 border-b-teal-900 border-2 border-rose-300"
        type="email"
      />
      <input
        v-model="oldUser.password"
        class="outline-none pb-2 bg-rose-300  px-5 border-b-teal-900 border-2 border-rose-300 mb-1"
        type="password"
      />
      <button
        class="transition border-neutral-500 border-2  bg-white rounded-xl py-1 hover:bg-slate-200 hover:-translate-y-1"
      >
        Вход
      </button>
    </form>
  </template>



<script setup>

const emit=defineEmits('loginUser')

defineProps({
  oldUser:Array
})

</script>