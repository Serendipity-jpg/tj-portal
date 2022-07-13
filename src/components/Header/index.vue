<template>
  <header class="bg-wt">
    <div class="container fx">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" srcset="" />
      </div>
      <div class="fx-1 fx-ct">
        <el-input
          v-model="input"
          class="headerSearch "
          size="large"
          placeholder="请输入关键字"
          :suffix-icon="Search"
        />
      </div>
      <div class="fx-al-ct">
        <div class="car fx-al-ct">
          <img src="@/assets/icon-gwc-nor.png" alt="" /> 购物车
        </div>
        <router-link class="marg-lr-40" to="/">学习中心</router-link>
        <div><span>注册</span><span>/</span><span>登录</span></div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";

const input = ref();
</script>
<style lang="scss" scoped>
header {
  width: 100%;
  background-color: var(--color-white);
  text-align: left;
  padding: 11px 0;
  font-size: 14px;
  .headerSearch {
    width: 427px;
    height: 40px;
    background: #edf0f4;
    border-radius: 8px;
    .el-input__wrapper{
      background-color: transparent;
    }
  }
  .car {
    img {
      width: 24px;
      height: 25px;
      margin-right: 6px;
    }
  }
}
</style>
