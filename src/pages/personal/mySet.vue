<!-- 个人设置 -->
<template>
  <div class="mySetWrapper content">
    <CardsTitle class="marg-bt-20" title="个人设置" />

    <div>
      <div>
        
      </div>
    </div>
  </div>
</template>
<script setup>

/** 数据导入 **/
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { getClassDetails, getClassTeachers, getClassList } from "@/api/classDetails.js";
import { getCourseLearning } from "@/api/class.js";
import { useRoute } from "vue-router";
import { dataCacheStore } from "@/store"

// 组件导入
import CardsTitle from "./components/CardsTitle.vue";

const route = useRoute()
const store = dataCacheStore()

// 结果 - 详情Id

// 课程信息及讲师信息

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
