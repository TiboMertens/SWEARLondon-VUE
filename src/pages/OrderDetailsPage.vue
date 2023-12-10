<script setup>
import { useRoute } from "vue-router";

import { ref, onMounted } from 'vue';

import DeleteOrder from "../components/DeleteOrder.vue";

const route = useRoute();
const orderId = route.params.id;

const order = ref({});

const fetchOrder = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/shoes/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (response.ok) {
            order.value = result.data;
            console.log(result.data);
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error('Error fetching shoe:', error);
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => {
    fetchOrder();
});
</script>

<template>
    <div class="">
        <h1 class="text-center text-[32px] font-bold pt-10 pb-[175px]">Order details</h1>
        <div class="flex gap-10 justify-center">
            <div>
                <h2 class="font-bold text-xl">Information</h2>
                <p>Order ID: {{ order.id }}</p>
                <p>Order date: {{ formatDate(order.date) }}</p>
                <p>Order status: {{ order.status }}</p>
                <p>Quantity: {{ order.quantity }}</p>
                <p>Size: {{ order.size }}</p>
            </div>
            <div>
                <h2 class="font-bold text-xl">Customizations</h2>
                <p>Laces color: {{ order.laces }}</p>
                <p>outside_1 color: {{ order.outside_1 }}</p>
                <p>outside_2 color: {{ order.outside_2 }}</p>
                <p>outside_3 color: {{ order.outside_3 }}</p>
                <p>sole top color: {{ order.sole_top }}</p>
                <p>sole bottom color: {{ order.sole_bottom }}</p>
                <p>inside color: {{ order.inside }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>