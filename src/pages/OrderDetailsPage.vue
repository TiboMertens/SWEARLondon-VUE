<script setup>
import { useRoute } from "vue-router";

import { ref, onMounted } from 'vue';

import DeleteOrder from "../components/DeleteOrder.vue";

import { jwtDecode } from "jwt-decode";
import router from "../router";

const route = useRoute();
const orderId = route.params.id;

const order = ref({});

const token = localStorage.getItem('token');

let isAdmin = false;

let decodedToken = ref({});

const selectedStatus = ref("");
const statusOptions = ["Recieved", "Confirmed", "Processing", "Shipped", "Delivered"];

const fetchOrder = async () => {
    try {
        const response = await fetch(`https://swearlondon.onrender.com/api/v1/shoes/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (response.ok) {
            order.value = result.data;
        } else {
            console.error(result.message);
            router.push('/');
        }
    } catch (error) {
        console.error('Error fetching shoe:', error);
    }
};

let ws = null;

const updateStatus = async () => {
    try {
        const response = await fetch(`https://swearlondon.onrender.com/api/v1/shoes/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                status: selectedStatus.value,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            ws.send(JSON.stringify({ action: "updateStatus", status: selectedStatus.value }));
        } else {
            console.error(result.message);
            router.push('/');
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
    checkAdminStatus();
    ws = new WebSocket('wss://swearlondon.onrender.com/primus');

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.action === 'updateStatus') {
            fetchOrder();
        }
    };
});

const checkAdminStatus = () => {
    if (token) {
        // Decode the token
        const decodedToken = jwtDecode(token);

        // Check if the user is an admin
        if (decodedToken.admin) {
            isAdmin = true;
        } else {
            isAdmin = false;
        }

        return decodedToken;
    } else {
        // User is not logged in
        isAdmin = false;
        //redirect to login page
        router.push('/');
    }
};

</script>

<template>
    <div class="">
        <h1 class="text-center text-[32px] font-bold pt-10 pb-10">Order details <span
                class="text-sm font-normal text-red-500">
                <DeleteOrder :orderId="orderId" :token="token" />
            </span></h1>
        <div class="md:flex pb-5 gap-10 justify-center">
            <div>
                <h2 class="font-bold text-xl">Information</h2>
                <p>Order ID: {{ order.id }}</p>
                <p>Ordered by: {{ order.username }}</p>
                <p>Order date: {{ formatDate(order.date) }}</p>
                <p class="mt-5">Order status: {{ order.status }}</p>
                <p>
                    <select v-model="selectedStatus">
                        <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
                    </select>
                    <button @click="updateStatus">Update Status</button>
                </p>
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