<template>
  <header class="bg-wt">
    <div class="container fx">
      <div class="logo">
        <router-link to="/"> <img src="@/assets/logo.png" alt="" srcset="" /> </router-link>
      </div>
      <div class="fx-1 fx-ct">
        <el-input
          v-model="input"
          class="headerSearch "
          size="large"
          placeholder="请输入关键字"
          @keyup.enter="SearchHandle"
          
        >
        <template v-slot:prefix>
          <Search class="search"  @click="SearchHandle" />
        </template>

        <!-- <template> -->
          
          <!-- <Search class="search">  :suffix-icon="Search"</Search> -->
        <!-- </template> -->
        </el-input>
      </div>
      <div class="fx-al-ct">
        <div class="car fx-al-ct">
          <img src="@/assets/icon-gwc-nor.png" alt="" /> 购物车
        </div>
        <router-link class="marg-lr-40" to="/">学习中心</router-link>
        <div></div>
        <div v-if="!isToken"><span>注册</span><span>/</span><span @click="() => $router.push('/login')">登录</span></div>
        <div class="fx-al-ct" v-if="isToken && userInfo">
          <img class="headIcon" :src="userInfo.icon" :onerror="onerrorImg" alt="">
          <div >{{userInfo.name}} |</div>
          <div class="font-bt2 pd-lf-10" @click="() => $router.push('/login')"> 退出 </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import defaultImage from '@/assets/icon.jpeg'
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";

import { useUserStore } from '@/store'
import router from "../router";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";

const store = useUserStore();
const userInfo = ref()
const isToken = localStorage.getItem('token') ? true : false
const input = ref('');
const route = useRoute()
onMounted(() => {
  userInfo.value = store.getUserInfo
  if (Object.keys(route.query).length > 0){
    input.value = route.query.key
  }
})

const onerrorImg = () => {
  userInfo.value.icon=defaultImage;
}
// 搜索事件
const SearchHandle = () => {
  if (input.value == ''){
    ElMessage({
      type: 'error',
      message:'请输入搜索关键词！'
    })
    return false
  }
  router.push({path: '/search', query: {"key": input.value}})
}
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
    :deep(.el-input__wrapper){
      background-color: transparent;
    }
    .search{
      position: absolute;
      cursor: pointer;
      right: 0;
      width: 15px;
      height: 15px;

    }
  }
  .car {
    img {
      width: 24px;
      height: 25px;
      margin-right: 6px;
    }
  }
  .headIcon{
    width: 30px;
    height: 30px;
    border-radius: 100%;
    margin-right: 10px;
  }
}
</style>
