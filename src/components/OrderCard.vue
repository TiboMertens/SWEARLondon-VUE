<script setup>
import { ref } from 'vue';

const props = defineProps(['shoe']);

const shoe = ref(props.shoe);

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
    <div class="w-[274px] bg-white rounded-lg shadow-md">
        <div class="p-5">
            <p class="text-md pb-2"><span class="font-bold">User:</span> {{ shoe.username }}</p>
            <p class="text-md pb-2"><span class="font-bold">Order date:</span> {{ formatDate(shoe.date) }}</p>
            <p class="text-md pb-2"><span class="font-bold">Order status:</span> {{ shoe.status }}</p>
        </div>
    </div>
</template>
