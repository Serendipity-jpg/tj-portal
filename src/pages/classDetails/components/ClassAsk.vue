<!-- 常见问题模块 -->
<template>
  <div class="classAsk bg-wt marg-bt-20">
    <div class="tabLab fx-sb">
      <div class=""><span>全部问答</span> <span>我的问答</span></div> 
      <div class="">提问</div>
    </div>
    <div>
      <div v-for="item in "></div>
    </div>
    <div class="askCont">

    </div>
  </div>
</template>
<script setup>

// 引入父级传参
defineProps({
  id:{
    type: Object,
    default:{}
  }
})
</script>
<style lang="scss" scoped>
.classAsk{
  padding-top: 30px;
  .tabLab{
    
  }
}
</style>
