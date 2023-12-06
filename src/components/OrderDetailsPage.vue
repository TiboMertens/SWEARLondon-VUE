<script setup>
import { useRoute } from "vue-router";

import { ref, onMounted } from 'vue';

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

onMounted(() => {
    fetchOrder();
});
</script>

<template>
    <div>
        <p>Status: {{ order.status }}</p>
        <!-- Other properties can be displayed similarly -->
    </div>
</template>

<style scoped></style>