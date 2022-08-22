<!-- 课程学习 -->
<template>
  <div class="classLearning">
    <div class="videoCont">
      <div class="head fx-sb" > 
        <div class="fx cur-pt" @click="() => $router.go(-1)">
          <img src="@/assets/icon_back.png" alt="">
          <div>返回 | {{learningData && learningData.latestSectionName}}</div>
        </div>
      </div>
      <div class="videoCont">
        <div class="video" v-show="pageType == 1">
          <video  id="videoRef" ref="videoRef" ></video>
        </div>
        <Practise v-if="pageType == 2" :id="currentPlayData.sectionId" :type="pageType-2" :chapterId="currentPlayData.chapterId" :courseId="$route.query.id" :key="currentPlayData.sectionId"></Practise>
      </div>
    </div>
    <!-- 右侧目录、问答、笔记 - start -->
    <div class="learn" :class="{close: isClose}" >
       <div class="closeRt cur-pt" :class="{close: isClose}"  @click="close">></div>
       <div class="teachInfo fx">
          <img src="@/assets/banner1.jpg" alt="">
          <div class="">
            <div class="tit">{{classDetailsData.name}}</div>
            <div class="teacher ft-14"> 讲师 : {{teacherData[0] && teacherData[0].name}}</div>
          </div>
       </div>
       <div class="cont">
         <div class="pd-lr-10">
          <TableSwitchBar :data="tableBar" @changeTable="changeTable"></TableSwitchBar>
         </div>
         <!-- 目录 -->
         <div class="catalogue" v-show="actId == 1" v-infinite-scroll="load" style="overflow: auto">
           <Catalogue :data="classListData" :statusList="learningList" :actIndex="actIndex" @playHadle="playHadle" @openCatalogue="openCatalogue"></Catalogue>
         </div>
         <!-- 问答 -->
         <div class="question"  v-show="actId == 2" v-infinite-scroll="load" style="overflow: auto">
          <Question></Question>
         </div>
         <!-- 笔记 -->
         <div class="note"  v-show="actId == 3" v-infinite-scroll="load" style="overflow: auto">
          <Note :id="currentPlayData.sectionId"></Note>
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
import { onMounted, ref, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import { getClassList, getClassDetails, getClassTeachers } from "@/api/classDetails.js";
import { getMediasSignature, getMyLearning, addPlayLog, getLearningLog } from "@/api/class.js";
import { useRoute } from "vue-router";
import { dataCacheStore } from "@/store"
// 组件导入
import TableSwitchBar from "@/components/TableSwitchBar.vue";
import Catalogue from "./components/Catalogue.vue";
import Question from "./components/Question.vue";
import Practise from "./components/Practise.vue";
import Note from "./components/Note.vue";
import { isLogin } from "@/store";

// import TcAdapter from 'tcadapter';
import router from "../../router";
import { reactive } from "@vue/reactivity";

const route = useRoute()
const store = dataCacheStore()

// 主展示区域 1 为视频 2 为练习 3 考试
const pageType = ref(1)
// 结果 - 详情Id
const detailsId = ref()
// 课程信息及讲师信息
const tableBar = [{id: 1, name: '目录'}, {id: 2, name: '问答'}, {id: 3, name: '笔记'}]
// 课程目录
const classListData = ref([])

const videoRef = ref(null)

/** 方法定义 **/
/*
* 本节有三种模式播放  
* 一、免费课程 - 先点击点击到学习计划然后进入这里学习
* 二、购买的课程 - 购买成功自动加入学习计划到这里学习
* 三、试听 - 无需加入学习计划直接学习
* 先加载当前课程信息
* 然后获取学习计划信息
* 通过课程计划自动调整到对应的小节 - 通过小节Id 获取视频签名（用于视频播放）
* 点击小节 - 通过小节Id 获取视频签名（用于视频播放）
*
*/
// 讲师信息、课程信息存储
const teacherData = ref({})
const classDetailsData = ref({})
const actIndex = ref('')
// 当前播放小节信息缓存 
const currentPlayData = reactive({
  courseId:route.query.id,    // 课程Id
  chapterId: '', // 章Id
  sectionId:'',  // 小节Id
  currentTime: '', // 播放时间
  duration: '', // 总时长
  sectionType: 1 // 播放类型 1-视频，2-练习，3-考试
})

const fileId = ref('')
const signature = ref('')
const timer = ref(null);

onMounted(async ()=>{
  //TODO 详情 - 课程ID 小节ID  课程名称 小节名称 讲师的信息 课程图片 + 当前课程是否购买
  //TODO 判断课程是否有播放记录 - 如果课程没有看过 - 从第一节开始播放
  //TODO 如果课程已经看过了 需要最后一次播放的信息 小节ID 小节名称 小节播放时间 到哪里了
  detailsId.value = route.query.id  // 课程id

  if (isLogin){
    // 查询当前课程是否有学习并获得对应的学习状态 
    await getCourseLearningData(route.query.id)
    // 查询我的某个课程表的学习记录 
    await getLearningLogData(route.query.id)
    // 获取课程详情的 - 这边先不用获取了 从vuex 里拿
    getClassDetailsData(route.query.id)
    // 获取讲师的信息
    getClassTeachersData()

    // 获取课程目录
    await getClassListData();
  } else {
    ElMessage('您还没有登录,先去登录吧！')
    router.push('/login')
  }
  // 未购买或未播放过的课程课程 定位到第一章第一节 开始播放
  if(!isPay.value){
    const data = classListData.value[0]
    learningData.value = {
      id:data.sections[0].id,  // 正在学习的小节id - 给下面的接口使用
      latestSectionId: data.sections[0].id,  // 正在学习的小节id
      latestSectionName: data.sections[0].name, // 正在学习的小节的名称
      latestSectionMoment: 0, // 正在学习的章节时间点，单位秒
      mediaDuration: data.mediaDuration, // 视频总时长
    }
    // 展开目录中已播放的部分
    actIndex.value = data.id
  } 
  // actIndex.value = data.id
  currentPlayData.duration = learningData.mediaDuration
  // 通过课程的小节id获取视频的fileId
  getMediasSignatureData(learningData.value.id);
})

// 组件卸载的时候触发 - 页面跳转的时候触发
onUnmounted(() => {
  clearInterval(timer.value)
})

// 获取课程讲师详情数据
const getClassTeachersData = async () => {
  await getClassTeachers(detailsId.value)
    .then((res) => {
      if (res.code == 200) {
        // 过滤可展示项
        const data = res.data.filter(n => n.isShow);
        teacherData.value = data
      } else {
        ElMessage({
          message:res.data.msg,
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

// 初始化视频播放器并播放视频 视频ID、播放器签名
const player = ref(null)
const initPlay = (fileID, psign) => {
  player.value = new TCPlayer(videoRef.value, {
    appID: '1312394356',
    fileID,
    psign,
    autoplay: true,
    preload:'auto',
    hlsConfig: {},
  });
  player.value.on('timeupdate', function() {
    currentPlayData.currentTime = player.value.currentTime();
  });
  player.value.on('pause', function() {
     console.log('pause')
    // 每次视频暂停的时候 停止发送播放记录请求
    clearInterval(timer.value)
    timer.value = null
  });
  player.value.on('play', function() {
    console.log('play')
    addPlayLogHandle()
    // 每次视频播放的时候 开始 发送播放记录
    timer.value = setInterval(addPlayLogHandle, 10000)
  });
  player.value.on('ended', function() {
    console.log('pauseekedse')
    // 播放结束时 停止计算器 并提交最后一次播放状态
    clearInterval(timer.value)
    timer.value = null
    addPlayLogHandle()
  });
  // 延迟自动播放 定位到对应的时间点
  setTimeout(()=> {player.value.currentTime(learningData.latestSectionMoment)}, 2000)
}
// 目录、问答、笔记滚动
const load = () => {}

// 播放新的小节的时候提交相关记录
const addPlayLogHandle = () => {
  addPlayLog(currentPlayData)
    .then((res) => {
      if (res.code == 200) {
        console.log("记录成功:", res)
      }
    })
    .catch(() => {
      ElMessage({
        message: "获取课程详情数据请求出错！",
        type: 'error'
      });
    });
};

// 获取课程详情数据
const getClassDetailsData = async (id) => {
  await getClassDetails(id)
    .then((res) => {
      if (res.code == 200) {
        classDetailsData.value = res.data
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "获取课程详情数据请求出错！",
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

// 查询我的某个课程表的学习记录
const learningList = ref([]) 
const getLearningLogData = async(sectionId) => {
  await getLearningLog(sectionId)
    .then((res) => {
      learningList.value = res.data
    })
    .catch(() => {
      ElMessage({
        message: "学习计划获取请求出错！",
        type: 'error'
      });
    });
}

// 查询我正在学习的课程
const isPay = ref(false)
const learningData = ref(null)
const getCourseLearningData = async (sectionId) => {
  await getMyLearning(sectionId)
    .then((res) => {
      if (res && !res.data){
        isPay.value = false
        return false 
      }
      if(res.code == 1){
        isPay.value = false
        return false
      }
      if (res.code == 200 && res.data) { 
        isPay.value = true
        learningData.value = res.data
      }
    })
    .catch(() => {
      ElMessage({
        message: "学习计划获取请求出错！",
        type: 'error'
      });
    });
};

// 通过课程的小节id获取视频的fileId
const getMediasSignatureData = async (sectionId) => {
  currentPlayData.sectionId = learningData.value.id; // 记录当前播放的小节Id 及 播放时间
  await getMediasSignature({sectionId})
    .then((res) => {
      if (res.code == 200) {
        fileId.value = res.data.fileId
        signature.value = res.data.signature
        if (player.value == null) {
          initPlay(res.data.fileId, res.data.signature)
        }
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
const playHadle = (val) => {
  const {item, tp} = val
  // 更新currentPlayData 提交播放记录使用
  currentPlayData.sectionId = item.id  // 小节Id
  currentPlayData.currentTime =  '' // 播放时间
  currentPlayData.duration = item.mediaDuration // 总时长
  // 初始化时的定义 与上面的信息一致 使用时的key不同 
  learningData.value.id = item.id // 小节Id
  learningData.value.latestSectionId = item.id // 小节Id
  learningData.value.latestSectionName = item.name // 名称
  learningData.value.mediaDuration = item.mediaDuration // 总时长

  // 视频播放
  if(tp == '1'){
    pageType.value = 1
    if (item.id == currentPlayData.id){
      player.value.play()
    } else {
    getMediasSignatureData(item.id)
    player.value.loadVideoByID(
      {
        appID: '1312394356',
        fileID:fileId.value,
        psign: signature.value,
      }
    )
    player.value.currentTime(item.latestSectionMoment)
    } 
  } else if (tp == '2'){
    // 打开练习题
    pageType.value = 2;
    player.value.pause()
  }
}
// 目录 - 打开一个章列表
const openCatalogue = (item) => {
  currentPlayData.chapterId = item
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
