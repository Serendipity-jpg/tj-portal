<!-- 课程学习 -->
<template>
  <div class="classLearning">
    <div class="videoCont">
      <div class="head fx-sb" > 
        <div class="fx cur-pt" @click="() => $router.go(-1)">
          <img src="@/assets/icon_back.png" alt="">
          <div>返回 | Java</div>
        </div>
      </div>
      <div class="video">
        <video id="videoRef" ref="videoRef" ></video>
      </div>
    </div>
    <!-- 右侧目录、问答、笔记 - start -->
    <div class="learn" :class="{close: isClose}" >
       <div class="closeRt cur-pt" :class="{close: isClose}"  @click="close">></div>
       <div class="teachInfo fx">
          <img src="@/assets/banner1.jpg" alt="">
          <div class="">
            <div class="tit">程序设计语言</div>
            <div class="teacher ft-14">讲师：黑马老师</div>
          </div>
       </div>
       <div class="cont">
         <TableSwitchBar :data="tableBar" @changeTable="changeTable"></TableSwitchBar>
         <!-- 目录 -->
         <div class="catalogue" v-show="actId == 1" v-infinite-scroll="load" style="overflow: auto">
           <Catalogue :data="classListData" @playHadle="playHadle"></Catalogue>
         </div>
         <!-- 问答 -->
         <div class="question"  v-show="actId == 2" v-infinite-scroll="load" style="overflow: auto">
          <Question></Question>
         </div>
         <!-- 笔记 -->
         <div class="note"  v-show="actId == 3" v-infinite-scroll="load" style="overflow: auto">
          <Note></Note>
         </div>
       </div>
    </div>
    <!-- 右侧目录、问答、笔记 - start -->
    <div class="askAndNote" :class="{close: !isClose}" @click="open">
      <div class="fx-cl-ct">
        <img src="../../assets/btn-wd.png" alt="">
        <p>问答</p> 
      </div>
      <div class="fx-cl-ct">
        <img src="../../assets/btn-bj.png" alt="">
        <p>笔记</p> 
      </div>
    </div>
  </div>
</template>
<script setup>
/** 数据导入 **/
import { computed, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { getClassList } from "@/api/classDetails.js";
import { getMediasSignature } from "@/api/class.js";

import { useRoute } from "vue-router";
// 组件导入
import TableSwitchBar from "@/components/TableSwitchBar.vue";
import Catalogue from "./components/Catalogue.vue";
import Question from "./components/Question.vue";
import Note from "./components/Note.vue";
import { isLogin } from "@/store";
// import '@/utils/release/libs/hls.min.0.13.2m.js';
// import '@/utils/release/tcplayer.min.js';
import TcAdapter from 'tcadapter';
import router from "../../router";
const route = useRoute()
// 结果 - 详情Id
const detailsId = ref()
// 课程信息及讲师信息
const tableBar = [{id: 1, name: '目录'}, {id: 2, name: '问答'}, {id: 3, name: '笔记'}]
// 课程目录
const classListData = ref([])

const videoRef = ref(null)
/** 方法定义 **/
onMounted(()=>{
  detailsId.value = route.query.id
  if (isLogin){
    getClassListData();
    return 
  } else {
    ElMessage('您还没有登录,先去登录吧！')
    router.push('/login')
  }
  // 通过课程的小节id获取视频的fileId
  // getMediasSignatureData();
  TcAdapter.isSupported();
})
// 初始化视频播放器并播放视频 视频ID、封面图、播放器签名
const initPlay = (fileID, signature, psign) => {
  const adapter = new TcAdapter(videoRef.value, {
      appID: '1312394356',
      fileID,
      psign,
      hlsConfig: {},
    }, () => {
      console.log('basicInfo', adapter.getVideoBasicInfo());
    });
    adapter.on(TcAdapter.TcAdapterEvents.HLSREADY, () => {
      console.log(333)
      const hls = adapter.hls;
    })
}

const load = (e) => {
  console.log(e)
}

const play = () => {
  videoRef.value.play();
}

// 获取详情数据

// 获取课程讲师详情数据
// 获取当前课程学习的状态信息

// 获取课程目录
const getClassListData = async () => {
  await getClassList(detailsId.value)
    .then((res) => {
      if (res.code == 200) {
        classListData.value = res.data
      } else {
        ElMessage({
          message:res.data.msg,
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
// 获取学习计划
const getLearningPlanData = async (sectionId) => {
  await getMediasSignature({sectionId})
    .then((res) => {
      if (res.code == 200) {
        res.data.fileId
        initPlay(res.data.fileId, signature, psign)
      } else {
        ElMessage({
          message:res.data.msg,
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
// 通过课程的小节id获取视频的fileId
const getMediasSignatureData = async (sectionId) => {
  await getMediasSignature({sectionId})
    .then((res) => {
      if (res.code == 200) {
        res.data.fileId
        initPlay(res.data.fileId, signature, psign)
      } else {
        ElMessage({
          message:res.data.msg,
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
// 点击小节
const playHadle = (sectionId) => {
  getMediasSignatureData(sectionId)
}
// table切换 目录、问答、笔记
const actId = ref(1)
const changeTable = id => {
  actId.value = id
}
// 关闭目录
const isClose = ref(false);
const close = () => {
  isClose.value = true
}
// 打开目录
const open = () => {
  isClose.value = false
}
//收藏
</script>
<style lang="scss" src="./index.scss"> </style>
