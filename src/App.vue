<!-- 主页面 -->
<template>
  <router-view />
</template>

<script setup>
// import { computed, onMounted } from 'vue';
// import config from '@/config/style';
// import { useSettingStore } from '@/store';

// const store = useSettingStore();

// const mode = computed(() => {
//   console.log(33)
//   return store.displayMode;
// });

// onMounted(() => {
//   store.updateConfig({ ...config });
// });

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
