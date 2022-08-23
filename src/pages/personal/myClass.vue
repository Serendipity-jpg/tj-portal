<!-- 个人中心 - 我的课程 -->
<template>
  <div class="myClassWrapper">
    <div class="">
      <!-- 最近学习 -->
      <div class="personalCards" v-if="learningData != null && typeof(learningData) != 'string'">
        <CardsTitle class="marg-bt-20" title="最近学习" />
        <ClassCards :data="learningData" type="1"/>
      </div>
      <!-- 学习计划 -->
      <div class="personalCards" v-if="planData && typeof(planData) != 'string'" >
        <CardsTitle title="学习计划" > 
          <div class="ft-wt-400"><span class="marg-rt-20">本周计划：{{weekFinishedAmount || 0}} / {{weekPlanAmount || 0}}</span> <span>积分奖励：{{totalPoints || 0}}</span></div>
        </CardsTitle>
        <PlanTable  :data="planData"></PlanTable>
      </div>
      <!-- 全部课程 -->
      <div v-if="myClassData != null">
        <div class="personalCards" >
          <CardsTitle class="marg-bt-20" title="全部课程" />
          <div class=""><span></span></div>
          <div class="item marg-bt-20" v-for="item in myClassData" >
            <ClassCards :data="item" type="2" />
          </div>
        </div>
        <div v-if="count > 10" class="fx-ct ft-18 ft-wt-600">查看全部 </div>
      </div>
    </div>
  </div>
</template>
<script setup>

/** 数据导入 **/
import { computed, onMounted, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { getMyLearning, getMylessons, getMyPlan } from "@/api/class.js";
import { useRoute } from "vue-router";
import { dataCacheStore } from "@/store"

// 组件导入
import CardsTitle from './components/CardsTitle.vue'
import ClassCards from './components/ClassCards.vue'
import PlanTable from './components/PlanTable.vue'


const route = useRoute()
const store = dataCacheStore()

// mounted生命周期
onMounted(async () => {
 // 获取最近学习数据
 getLearningData()
 // 查询我的课表
 getMylessonsData()
 // 获取我的学习计划
 getPlanData()
});

/** 方法定义 **/

// 获取最近学习计划数据
const learningData = ref(null)
const getLearningData = async () => {
  await getMyLearning()
    .then((res) => {
      if (res.code == 200 && res.data != null){
        learningData.value = res.data
      }
    })
    .catch(() => {
      ElMessage({
        message: "最近学习数据请求出错！",
        type: 'error'
      });
    });
}
// 获取我的学习计划
const planData = ref([]) // 列表数据
const planTotal = ref(0) // 总条数
const weekFinishedAmount = ref(0) // 本周完成的计划数量
const totalPoints = ref(0) // 本周积分值
const weekPlanAmount = ref(0) // 本周总的计划数量
const planParams = {
  page: 1,
  pageSize: 10,
}
const getPlanData = async () => {
  await getMyPlan(planParams)
    .then((res) => {
      if (res.code == 200 && res.data != null){
        planData.value = res.data.list
        planTotal.value = res.data.total
        weekFinishedAmount.value = res.data.weekFinishedAmount
        totalPoints.value = res.data.totalPoints
        weekPlanAmount.value = res.data.weekPlanAmount
      }
    })
    .catch(() => {
      ElMessage({
        message: "最近学习数据请求出错！",
        type: 'error'
      });
    });
}


// 我的课程
const myClassData = ref(null)
const count = ref(0)
const params = {
  page: 1,
  pageSize: 10,
}
// 查询我的课
const getMylessonsData = async () => {
  await getMylessons(params)
    .then((res) => {
      if (res.code == 200 && res.data != null){
        myClassData.value = res.data.list
        count.value = Number(res.data.total)
      }
    })
    .catch(() => {
      ElMessage({
        message: "最近学习数据请求出错！",
        type: 'error'
      });
    });
}

</script>
<style lang="scss" src="./index.scss"> </style>
