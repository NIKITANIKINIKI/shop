import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/Home.vue'
import Favorite from './pages/Favorite.vue'

const routes=[
    {
        path:'/',
        name: 'Home',
        component: Home
    },
    {
        path:'/favorite',
        name: 'Favorite',
        component: Favorite
    }
]

const router=createRouter({
    history: createWebHistory(),
    routes
})

export default router;