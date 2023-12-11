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
        <h1 class="text-center text-[32px] font-bold pt-10 pb-10">Order details <span class="text-sm font-normal text-red-500"><DeleteOrder :orderId="orderId" /></span></h1>
        <div class="md:flex pb-5 gap-10 justify-center">
            <div>
                <h2 class="font-bold text-xl">Information</h2>
                <p>Order ID: {{ order.id }}</p>
                <p>Ordered by: {{ order.username }}</p>
                <p>Order date: {{ formatDate(order.date) }}</p>
                <p>Order status: {{ order.status }}</p>
            </div>
            <div>
                <h2 class="font-bold text-xl">Customizations</h2>
                <p>Laces color: {{ order.laces_color }}</p>
                <p>Laces material {{ order.laces_material }}</p>
                <p>Outside_1 color: {{ order.outside_1_color }}</p>
                <p>Outside_1 material: {{ order.outside_1_material }}</p>
                <p>Outside_2 color: {{ order.outside_2_color }}</p>
                <p>Outside_2 material: {{ order.outside_2_material }}</p>
                <p>Outside_3 color: {{ order.outside_3_color }}</p>
                <p>Outside_3 material: {{ order.outside_3_material }}</p>
                <p>Sole top color: {{ order.sole_top_color }}</p>
                <p>Sole top material: {{ order.sole_top_material }}</p>
                <p>Sole bottom color: {{ order.sole_bottom_color }}</p>
                <p>Sole bottom material: {{ order.sole_bottom_material }}</p>
                <p>Inside color: {{ order.inside_color }}</p>
                <p>inside material: {{ order.inside_material }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>