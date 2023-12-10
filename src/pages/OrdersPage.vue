<script setup>
import OrderCard from '../components/OrderCard.vue';
import { ref, onMounted } from 'vue';

const shoes = ref([]);
let totalOrders = ref(0);

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
            totalOrders.value = result.data.length;
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
        <h1 class="text-center text-[32px] font-bold pt-10 pb-10">Total orders: {{ totalOrders }} </h1>
        <section class="orders px-10 flex flex-wrap justify-center gap-5">
            <router-link v-for="(shoe, index) in shoes" :key="index" :to="`/orders/${shoe.id}`">
                <div>
                    <OrderCard :shoe="shoe" />
                </div>
            </router-link>
        </section>
    </div>
</template>

<style scoped></style>