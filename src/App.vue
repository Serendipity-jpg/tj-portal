<!-- 主页面 -->
<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
let locale = zhCn;
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
