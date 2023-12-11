<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');


const Login = async () => {
    const response = await fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_mail: email.value,
            password: password.value,
        }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.data.token);
        //check the value stored in localstorage
        router.push('/orders');
    } else {
        errorMessage.value = data.message;
    }
};


</script>

<template>
    <form @submit.prevent="Login">
        <div class="mb-[32px]">
            <div class="mb-4">
                <label for="email" class="block text-gray-600 text-sm font-semibold mb-2">Email</label>
                <input v-model="email" type="email" id="email"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-[#69FF47]" />
            </div>
            <div class="mb-4">
                <label for="password" class="block text-gray-600 text-sm font-semibold mb-2">Password</label>
                <input v-model="password" type="password" id="password"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-[#69FF47]" />
                    <router-link to="/updatePassword">Forgot password?</router-link>
            </div>
        </div>
        <div v-if="errorMessage" class="text-red-500 mb-4 text-xs">{{ errorMessage }}</div>
        
        <button type="submit"
            class="w-full bg-[#69FF47] text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-500">
            Log in
        </button>
    </form>
</template>

<style scoped></style>