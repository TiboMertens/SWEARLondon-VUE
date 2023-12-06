<script setup>
import OrderCard from './OrderCard.vue';
import { ref, onMounted } from 'vue';

const shoes = ref([]);

const fetchShoes = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/shoes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (response.ok) {
      shoes.value = result.data;
    } else {
      console.error(result.message);
    }
  } catch (error) {
    console.error('Error fetching shoes:', error);
  }
};

onMounted(() => {
  fetchShoes();
});

</script>

<template>
    <div class="">
        <h1 class="text-center text-[32px] font-bold pt-10 pb-10">Orders</h1>
        <section class="orders px-10 flex flex-wrap justify-center gap-5">
            <div v-for="(shoe, index) in shoes" :key="index">
                <OrderCard :shoe="shoe" />
            </div>
        </section>
    </div>
</template>

<style scoped></style>