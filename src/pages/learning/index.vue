<!-- 课程学习 -->
<template>
  <div class="classLearning">
    <div class="videoCont">
      <div class="head fx-sb">
        <div class="fx cur-pt" @click="() => $router.go(-1)">
          <img src="@/assets/icon_back.png" alt="">
          <div>返回 <span class="line">|</span> {{currentPlayData.sectionName}}</div>
        </div>
      </div>
      <div class="videoCont">
        <div class="video" v-show="pageType == 1">
          <video id="videoRef" ref="videoRef"></video>
        </div>
        <Practise v-if="pageType == 2" @playHadle="playHadle" :examId="examId" :key="currentPlayData.sectionId">
        </Practise>
      </div>
    </div>
    <!-- 右侧目录、问答、笔记 - start -->
    <div class="learn" :class="{close: isClose}">
      <div class="closeRt cur-pt" :class="{close: isClose}" @click="close"><i class="iconfont zhy-a-shouqi2x"></i></div>
      <div class="teachInfo fx">
        <img @click="() => $router.push({path:'/details/index', query:{id: learningClassDetails.id}})"
          :src="learningClassDetails && learningClassDetails.coverUrl" alt="">
        <div class="">
          <div class="tit">{{learningClassDetails && learningClassDetails.name}}</div>
          <div class="teacher ft-14"> 讲师 : {{learningClassDetails && learningClassDetails.teacherName}}</div>
        </div>
      </div>
      <div class="cont">
        <div class="pd-lr-10">
          <TableSwitchBar :data="tableBar" @changeTable="changeTable"></TableSwitchBar>
        </div>
        <!-- 目录 -->
        <div class="catalogue" v-show="actId == 1" v-infinite-scroll="load" style="overflow: auto">
          <Catalogue :data="learningClassDetails && learningClassDetails.chapters" :actIndex="actIndex" :playId="playId"
            @playHadle="playHadle" @openCatalogue="openCatalogue"></Catalogue>
        </div>
        <!-- 问答 -->
        <div class="question" v-if="actId == 2" v-infinite-scroll="load" style="overflow: auto">
          <Question></Question>
        </div>
        <!-- 笔记 -->
        <div class="note" v-if="actId == 3" v-infinite-scroll="load" style="overflow: auto">
          <Note :currentTime="currentPlayTime"></Note>
        </div>
      </div>
    </div>
    <!-- 右侧弹出问答、笔记 - start -->
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
import { onMounted, ref, onUnmounted, provide, h } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getMediasSignature, addPlayLog, getLearningClassDetails } from "@/api/class.js";
import { startExamination } from '@/api/subject.js';
import { useRoute } from "vue-router";
import { dataCacheStore } from "@/store"
// 组件导入
import TableSwitchBar from "./components/TableSwitchBar.vue";
import Catalogue from "./components/Catalogue.vue";
import Question from "./components/Question.vue";
import Practise from "./components/Practise.vue";
import Note from "./components/Note.vue";
import icon from '@/assets/icon_good.png'

import router from "../../router";
import { reactive } from "@vue/reactivity";

const route = useRoute()
const store = dataCacheStore()

// 主展示区域 1 为视频 2 为练习 3 考试
const pageType = ref(1)
// 结果 - 详情Id
const detailsId = ref({})
// 课程信息及讲师信息
const tableBar = [{ id: 1, name: '目录' }, { id: 2, name: '问答' }, { id: 3, name: '笔记' }]

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

// 目录默认展开章
const actIndex = ref('')
// 默认播放小节
const playId = ref('')
// 记录播放相关参数
const fileId = ref('')
const signature = ref('')
const timer = ref(null);


// 当前播放小节信息缓存 
const currentPlayData = reactive({
  courseId: route.query.id,    // 课程Id
  chapterId: '', // 章Id
  lastPlaySectionId: '', // 上一次播放的小节Id
  prevSectionId: '', // 上一个小节的id
  sectionId: '',  // 小节Id
  sectionName: '',
  nestSectionId: '', // 下一个小节的id
  currentTime: '', // 播放时间
  duration: '', // 总时长
  type: '', // 小节类型 
})

// provide('currentPlayData', currentPlayData )
//当前播放课程的全部信息
const learningClassDetails = ref()

onMounted(async () => {

  //TODO 详情 - 课程ID 小节ID  课程名称 小节名称 讲师的信息 课程图片 + 当前课程是否购买
  //TODO 判断课程是否有播放记录 - 如果课程没有看过 - 从第一节开始播放
  //TODO 如果课程已经看过了 需要最后一次播放的信息 小节ID 小节名称 小节播放时间 到哪里了
  detailsId.value = route.query.id  // 课程id

  // 使用课程id获取当前课程的细节
  await getLearningClassDetailsData()
  // 获取上传播放的小节及时间
  currentPlayData.sectionId = learningClassDetails.value.latestSectionId
  currentPlayData.currentTime = learningClassDetails.value.latestSectionMoment
  currentPlayData.sectionName = learningClassDetails.value.name
  // 通过课程的小节id获取视频的fileId
  await getMediasSignatureData(learningClassDetails.value.latestSectionId);

})
// 使用课程id获取当前课程的细节
const getLearningClassDetailsData = async (type) => {
  await getLearningClassDetails({ courseId: detailsId.value })
    .then((res) => {
      // 播放完成之后 查询过滤使用  如果是过滤的话 只更新数据不走下面的逻辑
      if (type == 'filter') {
        learningClassDetails.value = res.data
        let isFinish = true
        res.data.chapters.forEach(item => {
          const dt = item.sections.every(n => n.type == 1 || n.type == 2 && n.finished == true)
          !dt ? isFinish = false : null
        })
        // 课程上完了 弹窗
        isFinish ? classFinished() : null
        return
      }
      if (res.code == 200) {
        learningClassDetails.value = res.data
        // 试看某个课程的时候 
        if (route.query && route.query.sectionsId) {
          learningClassDetails.value.latestSectionId = route.query.sectionsId
        }
        // 第一次进入本课程 默认 第一章 第一节
        console.log('课程信息：：', res.data)
        if (res.data.latestSectionId == undefined) {
          learningClassDetails.value.latestChapterId = res.data.chapters[0].id || ''   // 章Id
          learningClassDetails.value.latestSectionId = res.data.chapters[0].sections[0].id || ""  // 小节Id
          learningClassDetails.value.latestSectionMoment = 0
        }
        // 小节的名称后端没有提供 前端遍历查询
        let data = [] // 当前小节的数据
        let chaptersId = '' // 当前小节对应的章的Id
        res.data.chapters.forEach(el => {
          const item = el.sections.filter(n => n.id == learningClassDetails.value.latestSectionId)
          if (item.length > 0) {
            data = item
            chaptersId = el.id
          }
        });
        learningClassDetails.value.latestSectionName = data.length > 0 ? data[0].name : null;
        console.log('播放信息：', learningClassDetails)
        // 缓存当前播放内容

        currentPlayData.duration = data.length > 0 ? data[0].mediaDuration : null
        currentPlayData.chapterId = learningClassDetails.value.latestChapterId, // 章Id
          currentPlayData.sectionId = learningClassDetails.value.latestSectionId,  // 小节Id
          currentPlayData.currentTime = learningClassDetails.value.currentTime, // 播放时间
          currentPlayData.sectionName = learningClassDetails.value.latestSectionName || learningClassDetails.value.name // 小节名称
        // 默认展开对应的章 
        actIndex.value = chaptersId
        playId.value = data[0].id
      } else {
        ElMessage({
          message: res.data.msg,
          type: 'error'
        });
      }
    })

  store.setCurrentPlayData(currentPlayData)
};
// 课程上完了 弹窗 去个人中心
const classFinished = () => {
  ElMessageBox({
    title: '',
    message: h('div', null, [
      h('div', { style: 'display:flex' },
        [h('img', { src: icon, style: 'width:52px;height:52px;margin-right: 10px;' }),
        [h('div', null,
          [
            h('div', { style: 'font-size: 18px;font-weight: 500;' }, '你真棒！'),
            h('div', { style: 'line-height:30px' }, '所有内容全部学完，可以开始新的征程了~')
          ])
        ]
        ]
      ),

    ]),
    showCancelButton: false,
    confirmButtonText: '我知道了',
  })
    .then(() => {
      router.push('/personal/main/myClass')
    })
}
// 组件卸载的时候触发 - 页面跳转的时候触发
onUnmounted(() => {
  clearTimeHadle(timer.value)
})
const currentPlayTime = ref(0)
// 初始化视频播放器并播放视频 视频ID、播放器签名
const player = ref(null)
const initPlay = (fileID, psign) => {
  player.value = new TCPlayer(videoRef.value, {
    appID: '1312394356',
    fileID,
    psign,
    posterImage: true,
    autoplay: true,
    preload: 'auto',
    hlsConfig: {},
  });
  player.value.on('timeupdate', function () {
    currentPlayData.currentTime = player.value.currentTime();
    currentPlayTime.value = currentPlayData.currentTime
  });
  player.value.on('pause', function () {
    // 每次视频暂停的时候 停止发送播放记录请求
    clearTimeHadle(timer.value)
  });
  player.value.on('play', function () {
    clearTimeHadle(timer.value)
    addPlayLogHandle()
    // 每次视频播放的时候 开始 发送播放记录
    timer.value = setInterval(addPlayLogHandle, 10000)
  });
  player.value.on('ended', function () {
    // 播放结束时 停止计算器 并提交最后一次播放状态
    clearTimeHadle(timer.value)
    addPlayLogHandle()
    // 播放结束 更新一下数据获取是否全部播放完了
    getLearningClassDetailsData('filter')
  });
  player.value.ready(() => {
    clearTimeHadle(timer.value)
    player.value.currentTime(currentPlayData.currentTime || 0)
    player.value.play()
  })
}

//清理定时提交
const clearTimeHadle = (time) => {
  clearInterval(time)
  time = null
}
// 目录、问答、笔记滚动
const load = () => { }

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

// 通过课程的小节id获取视频的fileId
const getMediasSignatureData = async (sectionId) => {
  await getMediasSignature({ sectionId })
    .then((res) => {
      if (res.code == 200) {
        fileId.value = res.data.fileId
        signature.value = res.data.signature
        if (player.value == null) {
          initPlay(res.data.fileId, res.data.signature)
        }
      } else if (res.code == 1){
          ElMessage('该课程章节不支持试看， 请购买后播放')
      } else {
      ElMessage({
        message: res.data.msg,
        type: 'error'
      });
      }
    })
};

// 点击小节
const playHadle = async (val) => {
  const { item, tp } = val
  // 小节名称
  currentPlayData.sectionName = item.name
  // 练习返回
  if (tp == '9') {
    pageType.value = 1;
    return
  }
  // 更新currentPlayData 提交播放记录使用
  currentPlayData.sectionId = item.id  // 小节Id
  currentPlayData.currentTime = item.currentTime // 播放时间
  currentPlayData.duration = item.mediaDuration // 总时长
  // 视频播放
  if (tp == '1') {
    pageType.value = 1
    if (item.id == currentPlayData.id) {
      player.value.play()
    } else {
      await getMediasSignatureData(item.id)
      player.value.loadVideoByID(
        {
          appID: '1312394356',
          fileID: fileId.value,
          psign: signature.value,
        }
      )
      player.value.currentTime(item.latestSectionMoment)
      player.value.play()
    }
  } else if (tp == '2' || tp == '3') {
    // 打开练习题 开始考试 
    if (item.type != 2 ){
        ElMessageBox.confirm(
        `温馨提示：考试只能考一次，如果中途退出或未提交结果，将不会允许再次考试，确认考试请点击 继续考试`,
        '确认考试',
          {
            confirmButtonText: '继续考试',
            cancelButtonText: '等会再来',
            type: 'warning',
          }
        )
        .then(() => {
          startExaminationHandle(item)
        })
      } else {
        startExaminationHandle(item)
      }
    }
  store.setCurrentPlayData(currentPlayData)
}

// 考试开始时提交
const examId = ref('')
const startExaminationHandle = async (item) => {
  const param = {
    sectionId: item.id, // 小节id
    type: item.type == 2 ? 0 : 1,  // 类型，0-练习，1-考试  item.type对应章节的类型，2-视频（小节），3-考试
    chapterId: currentPlayData.chapterId,
    courseId: currentPlayData.courseId,
  }
  await startExamination(param)
    .then((res) => {
      if (res.code == 200) {
        examId.value = res.data
        player.value.pause()
        pageType.value = 2;
      } else {
        ElMessage({
          message: res.msg || res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "考题列表获取失败！",
        type: 'error'
      });
    });
}

// 答题出错的时候
const errorHandle = (val) => {
  pageType.value = 1
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
<style lang="scss" src="./index.scss">

</style>
