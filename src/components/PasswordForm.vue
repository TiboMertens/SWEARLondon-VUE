<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from "jwt-decode";

const router = useRouter();

const oldPassword = ref('');
const newPassword = ref('');
const errorMessage = ref('');

const token = localStorage.getItem('token');

let isAdmin = false;

let decodedToken = ref({});

onMounted(() => {
    // Check if the user is logged in as an admin
    decodedToken.value = checkAdminStatus();
});

const checkAdminStatus = () => {
    if (token) {
        // Decode the token
        const decodedToken = jwtDecode(token);

        // Check if the user is an admin
        if (decodedToken.admin) {
            isAdmin = true;
            console.log('User is an admin');
        } else {
            isAdmin = false;
            console.log('User is not an admin');
        }

        return decodedToken;
    } else {
        // User is not logged in
        isAdmin = false;
        //redirect to login page
        router.push('/');
        console.log('User is not logged in');
    }
};

const updatePassword = async () => {
    try {
        // Validate inputs
        if (!oldPassword.value || !newPassword.value) {
            errorMessage.value = 'Both input fields cannot be empty';
            return;
        }

        let id = decodedToken.value.user_id;

        const response = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oldPassword: oldPassword.value,
                newPassword: newPassword.value,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result.message);
            router.push('/');
        } else {
            errorMessage.value = result.message;
            console.error(result.message);
        }
    } catch (error) {
        errorMessage.value = 'Error updating password';
        console.error('Error updating password:', error);
    }
};
</script>

<template>
    <!-- create a form with mail & password input and a submit button -->
    <form @submit.prevent="updatePassword()">
        <div class="mb-[32px]">
            <div class="mb-4">
                <label for="oldPassword" class="block text-gray-600 text-sm font-semibold mb-2">Old password</label>
                <input v-model="oldPassword" type="oldPassword" id="oldPassword"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-[#69FF47]" />
            </div>
            <div class="mb-4">
                <label for="newPassword" class="block text-gray-600 text-sm font-semibold mb-2">New password</label>
                <input v-model="newPassword" type="newPassword" id="newPassword"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-[#69FF47]" />
            </div>
        </div>
        <div v-if="errorMessage" class="text-red-500 mb-4 text-xs">{{ errorMessage }}</div>
        <button type="submit"
            class="w-full bg-[#69FF47] text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-500">
            Update Password
        </button>
    </form>
</template>

<style scoped></style>
