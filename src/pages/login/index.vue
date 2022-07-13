<!-- 登录页面 -->
<template>
  <div class="loginWrapper fx-fd-col fx-sb">
    <Header></Header>
    <div class="fx-1 fx-al-ct">
      <div class="login">
        <div class="title">
          <span @click="changeLoginType('pass')" :class="act == 'pass' ? 'fx-1 active': 'fx-1'">账号登录</span>
          <span @click="changeLoginType('phone')" :class="act == 'phone' ? 'fx-1 active': 'fx-1'">短信登录</span>
        </div>
        <!-- 用户名密码登录 - start -->
        <LoginPass v-if="act == 'pass'"></LoginPass>
        <LoginPhone v-if="act == 'phone'"></LoginPhone>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Footer from '@/components/Footer/index.vue'
import Header from '@/components/Header/index.vue';
import LoginPass from './components/LoginPass.vue';
import LoginPhone from './components/LoginPhone.vue';

// 选中方法
const act = ref('pass')
// 切换登录方式
const changeLoginType = (type) => {
act.value = type
}

</script>
<style lang="scss" src="./index.scss"></style>
