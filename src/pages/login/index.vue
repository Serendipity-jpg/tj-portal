<!-- 登录页面 -->
<template>
  <div class="loginWrapper fx-fd-col fx-sb">
    <Header></Header>
    <div class="fx-1 fx-al-ct">
      <div class="login">
        <div class="title" v-show="act != 'register'">
          <span @click="changeLoginType('pass')" :class="act == 'pass' ? 'fx-1 active': 'fx-1'">账号登录</span>
          <span @click="changeLoginType('phone')" :class="act == 'phone' ? 'fx-1 active': 'fx-1'">短信登录</span>
        </div>
        <div class="title" v-show="act == 'register'">
          <span class="ft-wt-600 ft-cl-1" >注 册</span>
        </div>
        <!-- 用户名密码登录 - start -->
        <LoginPass v-if="act == 'pass'" @goHandle="goHandle"></LoginPass>
        <LoginPhone v-if="act == 'phone'" @goHandle="goHandle"></LoginPhone>
        <Register v-if="act == 'register'" @goHandle="goHandle"></Register>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue';
import LoginPass from './components/LoginPass.vue';
import LoginPhone from './components/LoginPhone.vue';
import Register from './components/Register.vue';
// 选中方法
const act = ref('pass')
// 切换登录方式
const changeLoginType = (type) => {
act.value = type
}
// 去注册
const goHandle = val => {
  act.value = val
}
</script>
<style lang="scss" src="./index.scss"></style>
