<script setup>
import { ref } from 'vue';
import { useRoute } from "vue-router";

import router from '../router';

const route = useRoute();
const orderId = route.params.id;
const props = defineProps(['token']);
const token = ref(props.token);

const deleteOrder = async () => {
    try {
        const response = await fetch(`https://swearlondon.onrender.com/api/v1/shoes/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`,
            },
        });

        const result = await response.json();

        if (response.ok) {
            router.push('/orders');
        } else {
            console.error(result.message);
            router.push('/');
        }
    } catch (error) {
        console.error('Error deleting order:', error);
    }
};

</script>

<template>
    <div>
        <a @click.prevent="deleteOrder" class="delete" href="#">Bestelling Verwijderen</a>
    </div>
</template>
