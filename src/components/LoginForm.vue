<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const logIn = async () => {
    
}


</script>

<template>
    <form @submit.prevent="logIn">
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