<!-- 标题组件 -->
<template>
  <div class="mainTitle fx">
    <div class="marg-rt-10">{{ title }}</div>
    <div  @click="() => this.$router.push(moreUrl)" class="more ft-cl-des ft-14 font-bt1">
      更多
      <img src="@/assets/icon_more.png" alt="" />
    </div>
  </div>
</template>
<script setup>

defineProps({
  title: {
    type: String,
    default: "课程标题",
  },
  more: {
    type: Boolean,
    default: true,
  },
  moreUrl:{
    type: String,
    default: '/search/index',
  },
});

</script>
<style lang="scss" scoped>
.mainTitle {
  font-family: YouSheBiaoTiHei;
  font-size: 23px;
  color: #19232b;

  .more {
    display: flex;
    align-items: center;
    cursor: pointer;
    img{
      width: 20px;
      height: 20px;
      position: relative;
      top: -1px;
    }
  }
}
</style>
