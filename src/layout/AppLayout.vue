<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../components/main/Navbar.vue'
import Sidebar from '../components/main/Sidebar.vue'
import Footer from '../components/main/Footer.vue'


import { ref, onMounted } from 'vue'

const loading = ref(true)
import Preloader from '@/components/basic/preloader.vue';

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);

});


</script>

<template>
  <header />

  <Preloader v-if="loading" />

  <div class="main-wrapper">
    <Navbar />

    <Sidebar />
    <div class="page-wrapper">
      <RouterView />
      <Footer /> 
    </div>
    
  </div>

</template>

<style scoped></style>
