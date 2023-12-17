<script setup>

import router from "../router";

const logOut = () => {
    localStorage.clear();
    router.push('/');
};

</script>

<template>
    <nav class="bg-[#69FF47]  h-[50px] flex justify-between items-center">
        <img src="../assets/logo.png" alt="logo" class="h-8 ml-4">
        <div class="pr-6 p-2.5 flex">
            <router-link class="nav-link mx-4 font-bold text-white hover:text-black text-lg md:text-xl"
                to="/">Login</router-link>
            <router-link class="nav-link mx-4 font-bold text-white hover:text-black text-lg md:text-xl"
                to="/orders">Orders</router-link>
            <router-link class="nav-link mx-4 font-bold text-white hover:text-black text-lg md:text-xl"
                to="/updatePassword">Update password</router-link>
            <div @click="logOut">
                <p class="nav-link mx-4 font-bold text-white hover:text-black text-lg md:text-xl cursor-pointer">Log out</p>
            </div>
            <div>
                <a href="https://swear-london-configurator.vercel.app/"
                    class="nav-link mx-4 font-bold text-white hover:text-black text-lg md:text-xl cursor-pointer">Configurator</a>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>