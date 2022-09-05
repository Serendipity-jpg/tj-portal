<!-- 我的积分 -->
<template>
  <div class="myInterralWrapper">
    <div class="personalCards">
      <CardsTitle class="marg-bt-20" title="我的积分" />
      <div class="title"></div>
      <Calendar></Calendar>
      <div class="listCont fx-sb">
        <div class="list">
          <div class="tit">获取积分</div>
          <div class="tab">
            <div class="item fx-sb" v-for="item in access" :key="item.title">
              <span>{{item.title}}</span>
              <span class="bt">{{item.status ? "已完成" : "去完成"}}</span>
            </div>
          </div>
        </div>
        <div class="listRt">
            <div class="tit fx-sb">
              <span>学霸天梯榜</span>
              <span class="more font-bt" @click="() => $router.push({path: 'myIntegralRanking', query:{rank: seasonsData.rank, points:seasonsData.points}})">更多&gt;</span>
            </div>
            <IntegralRankTab :data="seasonsData"></IntegralRankTab>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

/** 数据导入 **/
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { getSeasons } from "@/api/class.js";
import { useRoute } from "vue-router";
import { dataCacheStore } from "@/store"

// 组件导入
import CardsTitle from './components/CardsTitle.vue'
import Calendar from './components/Calendar.vue'
import IntegralRankTab from './components/IntegralRankTab.vue'

const route = useRoute()
const store = dataCacheStore()

const value = ref(new Date())

const access = ref([
  {'title': '课程学习', status: true},
  {'title': '课程评论', status: false},
  {'title': '课程问答', status: false},
  {'title': '课程笔记', status: false},
  {'title': '签到', status: false},
])

// 课程目录
const classListData = ref([])
const baseClassTeacherData = ref([])

// mounted生命周期
onMounted(async () => {
 getSeasonsData()
});

/** 方法定义 **/

// 积分榜信息查询
const seasonsData = ref([])
const getSeasonsData = () => {
  getSeasons({season:0})
    .then((res) => {
      if (res.code == 200 ){
        seasonsData.value = res.data
      } else {
        ElMessage({
          message: res.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "学霸榜请求失败！",
        type: 'error'
      });
    });
}

</script>
<style lang="scss" src="./index.scss"> </style>
