<template>
  <form class="grid gap-3" @submit.prevent="emit('sendUser')">
    <input
      v-model="user.name"
      class="outline-none pb-2 bg-rose-300 border-b-teal-900 border-2 border-rose-300"
      type="text"
    />
    <input
      v-model="user.email"
      class="outline-none pb-2 bg-rose-300 border-b-teal-900 border-2 border-rose-300"
      type="email"
    />
    <input
      v-model="user.password"
      class="outline-none pb-2 bg-rose-300 border-b-teal-900 border-2 border-rose-300"
      type="password"
    />
    <input
      v-model="user.password_confirm"
      class="outline-none pb-2 bg-rose-300 border-b-teal-900 border-2 border-rose-300"
      type="password"
    />
    <div class="w-max">
      <input class="outline-none pb-2 bg-slate-500 border-b" type="checkbox" />
      <label class="ml-2 text-xs">Согласие на обработку персональных данных</label>
    </div>
    <button
      class="transition border-neutral-500 border-2 bg-white rounded-xl py-1 hover:bg-slate-200 hover:-translate-y-1"
    >
      Регистрация
    </button>
  </form>
  <div class="mt-5">
    <label class="mr-2">Уже зарегистрированы?</label>
    <button
      class="transition border-neutral-500 border-2 bg-white rounded-xl px-2 py-0.5 hover:bg-slate-200 hover:-translate-y-1"
    >
      Вход
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits('sendUser')

defineProps({
    user:Array
})
</script>
