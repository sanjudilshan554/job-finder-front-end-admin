<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import Navbar from '../components/main/Navbar.vue'
import Sidebar from '../components/main/Sidebar.vue'
import Footer from '../components/main/Footer.vue'

const loading = ref(true);
const route = useRoute();

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
    <Navbar v-if="!route.meta.hideLayout"/>

    <Sidebar v-if="!route.meta.hideLayout"/>
     
      <RouterView />
      <Footer v-if="!route.meta.hideLayout"/> 
     
    
  </div>

</template>

<style scoped></style>
