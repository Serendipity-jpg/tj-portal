<!-- 个人中心-我的订单-详情 -->
<template>
  <div class="myOrderDetailsWrapper ">
    <div class="content marg-bt-20">
      <BreadCrumb></BreadCrumb>
      <div>订单详情 <span>订单号 ：202203071921003</span></div>
      <div>开始学习</div>
      <div></div>
    </div>
    <div class="content">
      <CardsTitle class="marg-bt-20" title="课程信息" />
      <div>
        <el-table class="table" :data="data" style="">
          <el-table-column prop="courseName" center label="课程名称">
            <template #default="scope">
              <div>{{scope.row.courseName}}</div>
            </template>
          </el-table-column>
          <el-table-column center prop="sectionName" label="所属分类" align="center" min-width="160" />
          <el-table-column prop="commitTime" align="center" label="课程价格" width="180" />
          <el-table-column prop="subjectiveScore" align="center" label="实付金额" width="180" />
          <el-table-column label="操作" align="center" width="120">
            <template #default="scope">
              <div class="font-bt1" @click="() => $router.push({path:'myExamdetails', query:scope.row})">申请退款</div>
              <div class="font-bt1" @click="() => $router.push({path:'myExamdetails', query:scope.row})">申请详情</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <div><span>订单总价：</span></div>
        <div><span>优惠券：</span></div>
        <div><span>优惠金额：</span></div>
        <div><span>实付金额：</span></div>
      </div>
    </div>
  </div>
</template>
<script setup>

/** 数据导入 **/
import { computed, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { getClassDetails, getClassTeachers, getClassList } from "@/api/classDetails.js";
import { getCourseLearning } from "@/api/class.js";
import { useRoute } from "vue-router";
import { dataCacheStore } from "@/store"

// 组件导入
import BreadCrumb from "./components/BreadCrumb.vue";

const route = useRoute()
const store = dataCacheStore()

const data = []

// 课程目录
const classListData = ref([])
const baseClassTeacherData = ref([])

// mounted生命周期
onMounted(async () => {
 
});

/** 方法定义 **/
// 获取详情数据


// 
</script>
<style lang="scss" src="./index.scss"> </style>
