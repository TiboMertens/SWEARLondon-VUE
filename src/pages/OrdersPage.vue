<script setup>
import OrderCard from '../components/OrderCard.vue';
import { ref, onMounted } from 'vue';
import { jwtDecode } from "jwt-decode";
import router from '../router';
import { useRouter } from 'vue-router';
const route = useRouter();

const shoes = ref([]);

let totalOrders = ref(0);

let socket = null;

const token = localStorage.getItem('token');

let isAdmin = false;

let decodedToken = ref({});

onMounted(() => {
    decodedToken.value = checkAdminStatus();
    fetchShoes();

    socket = new WebSocket('wss://swearlondon.onrender.com/primus');

    //listen for new data
    socket.onmessage = function (event) {
        let order = JSON.parse(event.data);
        if (order.action === 'newOrder') {
            shoes.value.push(order);
            totalOrders.value = shoes.value.length;
        }
    };
});

const fetchShoes = async () => {
    try {
        const response = await fetch(`https://swearlondon.onrender.com/api/v1/shoes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (response.ok) {
            shoes.value = result.data;
            totalOrders.value = result.data.length;
        } else {
            console.error(result.message);
            route.push('/');
        }
    } catch (error) {
        console.error('Error fetching shoes:', error);
    }
};

const checkAdminStatus = () => {
    if (token) {
        // Decode the token
        const decodedToken = jwtDecode(token);

        // Check if the user is an admin
        if (decodedToken.admin) {
            isAdmin = true;
        } else {
            isAdmin = false;
            route.push('/');
        }

        return decodedToken;
    } else {
        // User is not logged in
        isAdmin = false;
        //redirect to login page
        route.push('/');
    }
};
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