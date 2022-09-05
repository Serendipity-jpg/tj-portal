<!-- table切换头部 -->
<template>
  <div class="integralRankTab">
    <div class="item head fx-sb">
      <span>排名</span> <span class="ct">姓名</span> <span>积分</span>
    </div>
    <div class="item myItem fx-sb">
      <span>{{ data.rank }}</span>
      <span class="ct">我</span>
      <span>{{ data.points }}</span>
    </div>
    <div
      class="item fx-sb"
      v-for="(item, index) in data.boardList"
      :key="index"
    >
      <img v-if="index <= 2" :src="ranking(index + 1)" alt="" />
      <span class="lt" v-else>{{ ranking(index + 1) }}</span>
      <span class="ct">{{ item.student ? item.student.name : "--" }}</span>
      <span>{{ item.points }}</span>
    </div>
  </div>
</template>
<script setup>
import rank1 from "@/assets/icon_rank1.png";
import rank2 from "@/assets/icon_rank2.png";
import rank3 from "@/assets/icon_rank3.png";

// 前三名图片展示
const ranks = [rank1, rank2, rank3];
const ranking = (num) => {
  let val = num;
  if (num <= 3) {
    val = ranks[num - 1];
  }
  return val;
};
// 接收父组件数据
const props = defineProps({
  data: {
    type: Object,
    default: [],
  },
});
</script>
<style lang="scss" scoped>
.integralRankTab {
  border-top: solid 1px #eeeeee;
  border-left: solid 1px #eeeeee;
  .item {
    padding: 0px 30px;
    line-height: 40px;
    height: 41px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-right: solid 1px #eeeeee;
    border-bottom: solid 1px #eeeeee;
    img {
      width: 40px;
      height: 40px;
    }
    span:first-child {
      display: inline-block;
      text-align: center;
      width: 40px;
    }
    span:last-child {
      display: inline-block;
      text-align: center;
      width: 40px;
    }
    .ct {
      flex: 1;
      display: inline-block;
      text-align: center;
      width: 120px;
    }
  }
  .item:last-child {
    border-bottom: solid 1px #eeeeee;
  }
  .head {
    height: 60px;
    line-height: 60px;
    font-weight: 600;
  }
  .myItem {
    line-height: 40px;
    background: #ecf4ff;
    color: var(--color-main);
  }
}
</style>
