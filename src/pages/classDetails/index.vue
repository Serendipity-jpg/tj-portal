<!-- 课程详情 -->
<template>
  <div class="classDetailsWrapper">
    <div class="detailHead">
      <div class="backGround"><img :src="baseDetailsData.corverUrl" width="100%" alt=""/></div>
      <div class="container">
        <Breadcrumb title="一级分类"></Breadcrumb>
        <div class="topInfo fx">
          <div class=""><img :src="baseDetailsData.corverUrl" width="380" alt="" /></div>
          <div class="fx-1">
              <div class="title">{{baseDetailsData.name}}</div>
              <div class="item fx">
                <div class="card">
                  <div class="tit">课程数</div>
                  <div class="info">{{baseDetailsData.cataTotalNum}}节</div>
                </div>
                <div class="card">
                  <div class="tit">有效期</div>
                  <div class="info">{{baseDetailsData.validDuration}}</div>
                </div>
                <div class="card bd-non">
                  <div class="tit">评分</div>
                  <div class="info">{{baseDetailsData.coureScore}}</div>
                </div>
              </div>
              <div class="fx">
                <div class="bt-wt bt-round marg-rt-15 ft-14">收藏</div>
                <div class="bt-wt bt-round ft-14">分享</div>
              </div>
          </div>
        </div>
        <div class="buyCont fx-sb" >
          <div class="fx-ct">
            <span class="price">￥</span>
            <span class="price">{{(baseDetailsData.price / 100).toFixed(2) }}</span>
            <span class="desc">课前随时退 · 售后有保障</span> 
          </div>
          <div class="buy">
            <span class="bt-red1 bt-round marg-rt-20">加入购物车</span>
            <span class="bt-red bt-round">立即购买</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 主体部分 - start -->
    <div class="DetailsContent container fx">
      <div class="leftCont bg-wt">
        <TableSwitchBar :data="tableBar" @changeTable="changeTable"></TableSwitchBar>
        <!-- 课程介绍 -->
        <ClassAbout v-show="actId == 1" :baseDetailsData="baseDetailsData" :baseClassTeacher="baseClassTeacher"></ClassAbout>
        <!-- 课程目录 -->
        <ClassCatalogue v-show="actId == 2" :data="classListData"></ClassCatalogue>
        <!-- 问答模块 -->
        <ClassAsk v-show="actId == 3" :id="detailsId"></ClassAsk>
      </div>
      <div class="ritCont">
        <!-- 常见问题 -->
        <Ask :data="askData"></Ask>
        <!-- 猜你喜欢 -->
        <LikeCards :data="LikeData"></LikeCards>
      </div>
    </div>
    <!-- 主体部分 - end -->
  </div>
</template>
<script setup>
/** 数据导入 **/

import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { getClassDetails, getClassTeachers, getClassList } from "@/api/classDetails.js";
import { useRoute } from "vue-router";
// 组件导入
import Breadcrumb from "@/components/Breadcrumb.vue";
import TableSwitchBar from "@/components/TableSwitchBar.vue";
import ClassAbout from "./components/ClassAbout.vue";
import LikeCards from "./components/LikeCards.vue";
import Ask from "./components/Ask.vue";
import ClassAsk from "./components/ClassAsk.vue";
import ClassCatalogue from "./components/ClassCatalogue.vue";

const route = useRoute()
// 结果 - 详情Id
const detailsId = ref([])
// 课程信息及讲师信息
const baseDetailsData = ref({})
const baseClassTeacher = ref([])

// table切换数据 - 静态数据
const tableBar = [{id: 1, name: '课程介绍'}, {id: 2, name: '课程目录'},{id: 3, name: '问答'},{id: 4, name: '笔记'}, {id: 5, name: '用户评价'}]
// 猜你喜欢 - 静态数据
const LikeData = [{
    sold: 234, 
    icon: "sit enim sunt", 
    sections: 45,
    coverUrl: "http://img-qn-3.51miz.com/preview/muban/00/00/50/44/M-504460-F3103C10.jpg!/quality/90/unsharp/true/compress/true/fw/640/clip/640x500a0a0",
    duration: 444,
    icon: "sit enim sunt",
    id: 46000019721003770,
    name: "配源码+笔记）玩转MySQL数据库之终极教程",
    price: 64540,
    sections: 45,
    sold: 234,
    teacher: "李老师"
  },
  {
    sold: 234, 
    icon: "sit enim sunt", 
    sections: 45,
    coverUrl: "http://img-qn-3.51miz.com/preview/muban/00/00/50/44/M-504460-F3103C10.jpg!/quality/90/unsharp/true/compress/true/fw/640/clip/640x500a0a0",
    duration: 444,
    icon: "sit enim sunt",
    id: 46000019721003770,
    name: "配源码+笔记）玩转MySQL数据库之终极教程",
    price: 64540,
    sections: 45,
    sold: 234,
    teacher: "李老师"
  }
]
// 当前table选项
const actId = ref(3)

// 常见问题 - 静态数据
const askData = [
  {ask:'如何查看已购课程？', answer: '请用购课账号登录官网或APP，点击进入【我的学习】。'},
  {ask:'课程购买后可以更换吗？', answer: '如需更换课程请咨询在线客服为您确认是否可以更换。'},
  {ask:'无法登录怎么办？', answer: '手机端请切换网络或者更新APP；电脑端请更换不同浏览器。'},
  {ask:'如何用手机听课？', answer: '下载网易云课堂APP，进入我的学习，即可使用手机听课。'},
  {ask:'课程过期了怎么办？', answer: '课程过期无法观看了哦，请在有效期内进行观看课程。'},
]
// 课程目录
const classListData = ref([])
// mounted生命周期
onMounted(() => {
  detailsId.value = route.query.id
  // 获取课程信息
  getClassDetailsData()
  // 获取课程老师信息
  getClassTeachersData()
  // 获取课程目录
  getClassListData()
});

/** 方法定义 **/

// 获取详情数据
const getClassDetailsData = async () => {
  await getClassDetails(detailsId.value)
    .then((res) => {
      if (res.code == 200) {
        baseDetailsData.value = res.data
      } else {
        ElMessage({
          message:res.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "请求出错！",
        type: 'error'
      });
    });
};

// 获取课程讲师详情数据
const getClassTeachersData = async () => {
  await getClassTeachers(detailsId.value)
    .then((res) => {
      if (res.code == 200) {
        // 过滤可展示项
        const data = res.data.filter(n => n.isShow);
        let catchArr = []
        // 数据重组 展示幻灯片用
        data.forEach((n, i) => {
          if(catchArr.length == 0){
            catchArr.push([n])
          } else {
            const lastTag = catchArr.at(-1);
            if(lastTag.length == 2){
              catchArr.push([n])
            } else {
              lastTag.push(n)
            catchArr.push([n])
            }
          }
        })
        baseClassTeacher.value = catchArr
      } else {
        ElMessage({
          message:res.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "请求出错！",
        type: 'error'
      });
    });
};

// 获取课程目录
const getClassListData = async () => {
  await getClassList(detailsId.value)
    .then((res) => {
      if (res.code == 200) {
        classListData.value = res.data
      } else {
        ElMessage({
          message:res.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "课程目录数据请求出错！",
        type: 'error'
      });
    });
};
// table切换 当前展示信息 课程介绍、课程目录
const changeTable = id => {
  actId.value = id
  console.log(actId.value)
}
</script>
<style lang="scss" src="./index.scss"> </style>
