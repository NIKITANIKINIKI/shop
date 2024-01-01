<template>
    <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4 hover:shadow-xl ">
        <img class="w-16 h-16" :src="imgUrl" alt="sneakers">
        <div class="flex flex-col flex-1">
            <p>{{ title  }}</p>
            <div class="flex justify-between mt-2"> 
                <b class="flex-1">{{ price }} руб</b>
                <img @click="emit('clickDelete')" class="opacity-50 hover:opacity-100  cursor-pointer transition" src="/close.svg" alt="close">
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    id:Number,
    imgUrl: String,
    title: String,
    price: Number,
    isFan: Boolean,
    isAdd: Boolean
})

const emit=defineEmits(['clickDelete'])

</script>