<script setup>
import { ref } from 'vue';

const props = defineProps(['shoe']);

const shoe = ref(props.shoe);
</script>

<template>
    <div class="w-[274px] bg-white rounded-lg shadow-md">
        <div class="p-5">
            <p class="text-md pb-2"><span class="font-bold">OrderID:</span> {{ shoe.id }}</p>
            <p class="text-md pb-2"><span class="font-bold">User:</span> {{ shoe.username }}</p>
        </div>
    </div>
</template>
