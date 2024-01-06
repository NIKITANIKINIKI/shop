<template>
  <div v-if="!finish"><div class="fixed top-0 left-0 h-full w-full bg-red-200 z-30 opacity-30"></div>
  <div
    class="fixed top-1/2 left-1/2 bg-rose-300 transform -translate-x-1/2 -translate-y-1/2 z-40 px-4 py-10 rounded-3xl"
  >
    <h1 class="font-mono text-3xl text-center mb-10 top-0 left-0 text-black">Привет!</h1>
    <img class="fixed top-0 right-0 w-8 h-8 m-3" src="/myclose.png" alt="" />
    <Registration v-if="!forms" @sendUser="sendUser" :user="newUser"/>
    <Login v-if="forms" @loginUser="loginUser" :oldUser="oldUser"/>
  </div></div>
  
</template>

<script setup>
import Registration from './Registration.vue'
import Login from './Login.vue'

import { reactive, ref } from 'vue'
import axios from 'axios';

const forms=ref(false)
const finish=ref(false)


const newUser = reactive({
  name: '',
  email: '',
  password: '',
  password_confirm:''
})

const oldUser=reactive({
  email: '',
  password: '',
})

const sendUser = async () => {
  try{

    await axios.post('https://8106ad2f73305504.mokky.dev/users', newUser)
    forms.value=true
  }
  catch(e){
    console.log(e)
  }
}


const loginUser = async () => {
  try{

    await axios.post('https://8106ad2f73305504.mokky.dev/login', oldUser)

    finish.value=true
    forms.value=true
  }
  catch(e){
    console.log(e)
  }
}


</script>
