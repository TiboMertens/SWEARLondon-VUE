<script setup>
import LoginForm from '../components/LoginForm.vue';
</script>

<template>
    <div class="flex flex-col md:flex-row bg-[#f7f7f7]" style="height: calc(100vh + 28px)">
        <div class="md:w-1/2 hidden md:block">
            <img src="../assets/loginImg.jpg" class="h-screen" alt="SWEAR brand showcase">
        </div>
        <div class="w-full md:w-1/2">
            <div class="h-screen flex justify-center items-center">
                <div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md w-[350px] mx-auto">
                    <h1 class="font-bold text-2xl text-center mb-6">Log in</h1>
                    <LoginForm />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>