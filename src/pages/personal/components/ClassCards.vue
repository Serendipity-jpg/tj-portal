<!--  我的课程 - 卡片  -->
<template>
  <div class="classCards fx-sb fx-ct">
    <div class="marg-rt-20">
      <img src="@/assets/banner1.jpg" alt="">
      <!-- <img :src="data.course.coverUrl" alt=""> -->
    </div>
    <div class="info fx-1">
      <div class="tit ">{{data.course && data.course.name}}</div>
      <div><span>有效日期：</span>{{data.expireTime == null ? '永久有效' : data.createTime + '-' + data.expireTime}}</div>
      <div><span>已学习：</span>{{data.learnedSections}} / {{data.course.sections}}</div>
      <div v-if="type == '1'"><span>正在学习：</span>第{{data.learnedSections}}节 {{data.course.name}}</div>
    </div>
    <div class="btn" @click="() => $router.push({path: '/learning/index', query: {id: data.id}})">
      <span class="bt bt-round">继续学习</span>
    </div>
  </div>
</template>
<script setup>
// 介绍父组件传来的标题
defineProps({
  data:{
    type: Object,
    default: {}
  },
  type:{
    type: String,
    default: '1'
  }
})  
</script>
<style lang="scss" scoped>
.classCards{
  img{
    width: 236px;
    height: 132px;
    border-radius: 8px;
  }
  .info{
    line-height: 30px;
    font-size: 14px;
    .tit{
      font-size: 20px;
      font-weight: 500;
      line-height: 40px;
    }
  }
  .btn{
    width: 114px;
    height: 40px;
    display: flex;
    align-items: center;
  }
}
</style>
