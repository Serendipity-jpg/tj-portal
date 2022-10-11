<!-- 标题组件 -->
<template>
  <div class="empty fx">
    <img src="@/assets/img_empty.png"  alt="">
    <div>{{desc}}</div>
  </div>
</template>
<script setup>

defineProps({
  desc: {
    type: String,
    default: "暂无数据",
  },
});

</script>
<style lang="scss" scoped>
.empty {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 70px;
    color: #19232B;
    img{
        width:162px;
        height:144px;
    }
}
</style>
