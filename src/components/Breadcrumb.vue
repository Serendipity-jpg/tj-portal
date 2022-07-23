<template>
  <div class="breadcrumb ">
    <router-link to="/">首页</router-link>
    <span> / </span>
    <span>{{data}}</span>
  </div>
</template>
<script setup>
import router from '../router';

const props = defineProps({
  data: {
    type: String,
    default: "一级分类",
  }
});

</script>
<style lang="scss" scoped>
.breadcrumb{
    font-size: 14px;
    padding: 36px 0 20px 0;
    a{
      color: var(--color-font1);
    }
  }
</style>
