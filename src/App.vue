<script setup>
import Nav from "./components/Nav.vue";
</script>

<template>
  <div class="app-container bg-[#f7f7f7] min-h-screen">
    <Nav />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
