<!-- 架构页面 -->
<template>
<div class="wrapper">
  <Header></Header>
    <router-view />
  <Footer></Footer>
  </div>
</template>
<script setup>
import Footer from '@/components/Footer/index.vue';
import Header from '@/components/Header/index.vue';
</script>
<style lang="scss" scoped>
.tdesign-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>