<!-- 课程搜索页面 -->
<template>
  <div class="classSearchWrapper">
    <div class="container searchBar">
      <!-- 结果统计 -->
      <div class="result"><span class="searchKey">关键词：<em>{{searchParams.keyword}}</em> </span> 共找到 <em> {{count}} </em> 门“ <em> {{searchParams.keyword}} </em> ”相关课程</div>
      <!-- 筛选条件 -->
      <div class="title">全部课程</div>
      <SearchKey :data="searchType" @searchKey="searchKey"></SearchKey>
      <SearchKey :data="searchCost" @searchKey="searchKey"></SearchKey>
    </div>
    <div class="searchContain bg-wt">
      <div class="container">
        <!-- 排序及分页 -->
        <div class="fx-sb marg-bt-20">
          <SortBar :data="soleBar" @sortHandle="sortHandle"></SortBar>
          <div class="pageAction fx">
            <img src="@/assets/page_act.png" class="iconTurn" v-if="page > 1" @click="pagesHandle('reduce')" alt="" />
            <img src="@/assets/page_act_nor.png"  v-if="page == 1" alt="" />
            <span v-if="count > 0"><em>{{page}}</em> / {{Math.ceil(count/searchParams.pageSize) }}</span>
            <img src="@/assets/page_act.png" v-if="page < Math.ceil(count/searchParams.pageSize)" @click="pagesHandle('add')" alt="" />
            <img src="@/assets/page_act_nor.png" class="iconTurn" v-if="page == Math.ceil(count/searchParams.pageSize)" alt="" />
          </div>
        </div>
        <!-- 搜索课程列表 -->
        <div class="content fx-wp">
           <ClassCards type="search" class="marg-bt-20" v-for="(item, index) in searchResultData" :data="item" :key="index"></ClassCards>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
/** 数据导入 **/

import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { getClassCategorys, classSeach } from "@/api/class.js";
// 组件导入
import SearchKey from './components/SearchKey.vue'
import SortBar from './components/SortBar.vue'
import ClassCards from '@/components/ClassCards.vue'
import { useRoute } from "vue-router";

const searchType = ref({subKey: 'categoryIdLv1', title: "课程分类", searchKeys:[]});   
const searchCost = ref({subKey: 'free', title: "收付费", searchKeys:[{id:'all', name: '全部'},{id: '1', name: '免费'},{id: '0', name: '付费'}]});    
const soleBar = ref([{key:'推荐', value:'all'},{key:'最新', value:'publishTime'}, {key:'最热', value:'sold'}])
const searchParams = ref({  // 搜索参数定义
  keyword: 'java',
  pageNo: 1,
  pageSize: 12
})
// 结果 - 课程列表
const searchResultData = ref([])
const count = ref(0)
const page = ref(1);
const route = useRoute()
// mounted生命周期
onMounted(() => {
  // 获取一、二、三级分类信息
  getClassCategoryData()
  // 搜索
  search()
  searchParams.value.keyword = route.query.key
});

/** 方法定义 **/

// 获取一、二、三级分类信息
const getClassCategoryData = async () => {
  await getClassCategorys()
    .then((res) => {
      if (res.code == 200) {
        searchType.value.searchKeys = [{id:'all', name: '全部'}, ...res.data]
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "分类请求出错！",
        type: 'error'
      });
    });
};
// 搜索组件对应的事件
const searchKey = (item) => {
  if (item.key == 'free') {
    searchParams.value[item.key] = item.value != 'all' ? Boolean(+item.value) : undefined;
  } 
  if (item.key == 'categoryIdLv1') {
    searchParams.value[item.key] = item.value != 'all' ? item.value : undefined;
  }
  search()
}
// 排序操作
const sortHandle = (item) => {
  searchParams.value.sortBy = item != 'all' ? item : undefined;
  search()
}
// 分页操作
const pagesHandle = (item) => {
  item == 'add' ? page.value ++ : page.value --;
  searchParams.value.pageNo = page.value
  search()
}
// 搜索
const search = async () => {
  const params  = searchParams.value
  await classSeach(params)
  .then((res) => {
      if (res.code == 200) {
        searchResultData.value = res.data.list
        count.value = res.data.total
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "分类请求出错！",
        type: 'error'
      });
    });
}

</script>
<style lang="scss" src="./index.scss"> </style>
