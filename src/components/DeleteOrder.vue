<script setup>
import { ref } from 'vue';
import { useRoute } from "vue-router";
// import router.js
import router from '../router';

const route = useRoute();
const orderId = route.params.id;

const props = defineProps(['token']);

const token = ref(props.token);

const deleteOrder = async () => {
    console.log('komt in de functie :)');
    try {
        const response = await fetch(`http://localhost:3000/api/v1/shoes/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`,
            },
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result.message);
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
