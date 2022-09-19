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
      <div v-if="myClassData != null && myClassData.length > 0">
        <div class="personalCards" >
          <CardsTitle class="marg-bt-20" title="全部课程" />
          <div class=""><span></span></div>
          <div class="item marg-bt-20" v-for="item in myClassData" >
            <ClassCards :data="item" @planHandle="planHandle" type="2" />
          </div>
        </div>
        <div v-if="count > 10" class="fx-ct ft-18 ft-wt-600">查看全部 </div>
      </div>
    </div>
    <el-dialog
        v-model="dialogVisible"
        :title="title"
        width="30%"
      >
        <div class="dialogCont">
          <div class="fx marg-bt-20"><span>每周学习节数:</span> <el-input v-model="number" min="1" type="number"></el-input></div>
          <div class="fx"><span>预计学完时间:</span> <div class="lastTime">{{lastTime}}</div> </div>
        </div>
        <template #footer>
          <span class="dialogFooter">
            <div @click="dialogVisible = false"><span class="bt bt-grey">取消</span></div>
            <div @click="createPlan"><span class="bt">确定</span></div>
          </span>
        </template>
      </el-dialog>  
  </div>
</template>
<script setup>

/** 数据导入 **/
import { computed, onMounted, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { getMyLearning, getMylessons, getMyPlan, changeMyPlan, delMyClass } from "@/api/class.js";
import { useRoute } from "vue-router";
import { dataCacheStore } from "@/store"
import moment from 'moment'
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

// 获取计划数据
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
const days = ref(0)
const number = ref(1)
const lastTime = computed(() => {
  // 学完的时间按周 每周学n节 m = n/总节数 不足一周按一周算 从今天开始往后延 m*7天 
  const num =  Math.ceil(days.value / number.value) * 7
  return moment().add(num, 'days').format("YYYY-MM-DD")
})

const dialogVisible = ref(false)
const title = ref('创建计划')
const currentData = ref();
// 打开创建、修改弹窗
const planHandle = (val) => {
   const {data, type} = val
   dialogVisible.value = true
   currentData.value = data
   if (type == 'edit'){
    const { weekFreq } = planData.value.filter(n => n.id == data.id)[0]
    number.value = weekFreq
    days.value = data.course.sections
    title.value = '修改计划'
   } else if(type == 'add') {
    title.value = '创建计划'
   } else if (type == 'del'){
     delMyClassData(data.course.id)
   }
}
// 创建、修改计划
const createPlan = async () => {
  console.log(currentData.value)
  const params = {
    freq: number.value,
    courseId: currentData.value ? currentData.value.course.id : ''
  }
  await changeMyPlan(params)
    .then((res) => {
      if (res.code == 200 ){
        getPlanData()
        ElMessage({
          message: `${title}成功`,
          type: 'success'
        });
        dialogVisible.value = false
      }
    })
    .catch(() => {
      ElMessage({
        message: "最近学习数据请求出错！",
        type: 'error'
      });
    });
}
// 删除课程表 - 我的课程下的课程删除
const delMyClassData = async (id) => {
  await delMyClass(id)
    .then((res) => {
      if (res.code == 200 ){
        getMylessonsData()
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
