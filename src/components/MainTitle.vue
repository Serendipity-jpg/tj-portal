<!-- 标题组件 -->
<template>
  <div class="mainTitle fx">
    <div class="marg-rt-10">{{ title }}</div>
    <router-link v-if="more" class="fx-ct ft-cl-des ft-14 " :to="moreUrl">
      <div  @click="moreHandle()" class="more fx-ct">
        更多
        <img src="@/assets/icon_more.png" alt="" />
      </div>
    </router-link>
  </div>
</template>
<script setup>

const props = defineProps({
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
    default: "/",
  },
});

</script>
<style lang="scss" scoped>
.mainTitle {
  font-family: YouSheBiaoTiHei;
  font-size: 23px;
  color: #19232b;

  .more {
    cursor: pointer;
    img{
      width: 20px;
      height: 20px;
    }
  }
}
</style>
