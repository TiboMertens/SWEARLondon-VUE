<script setup>
</script>

<template>
    <nav class="bg-[#69FF47]  h-[50px] flex justify-between items-center">
        <img src="../assets/logo.png" alt="logo" class="h-8 ml-4">
        <div class="pr-6 p-2.5">
            <router-link class="nav-link mx-4 font-bold text-white hover:text-black text-lg md:text-xl"
                to="/">Login</router-link>
            <router-link class="nav-link mx-4 font-bold text-white hover:text-black text-lg md:text-xl"
                to="/orders">Orders</router-link>
            <router-link class="nav-link mx-4 font-bold text-white hover:text-black text-lg md:text-xl"
                to="/updatePassword">Update password</router-link>
        </div>
    </nav>
</template>

<style scoped></style>