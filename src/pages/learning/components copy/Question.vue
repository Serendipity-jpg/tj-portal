<!-- 问答模块 -->
<template>
  <div class="questionWrapper marg-bt-20">
    <div class="askCont" >
      <div class="askLists" v-for="item in askListsDataes">
        <div class="userInfo fx">
          <img :src="item.user.icon" :onerror="onerrorImg(item.user)" alt="" srcset="">
          {{item.user.name}}
        </div>
        <div class="ask">
          <div class="tit ft-14">{{item.title}}</div>
          <div class="font-bt2" @click="goDetails(item)" v-if="item.latestAnswer && item.latestAnswer.content">最新【{{item.latestAnswer.replier.name}}】的回答</div>
        </div>
        <div class="time fx-sb">
          <div>{{item.createTime}}</div>
          <div class="actBut">
            <span class="marg-rt-10" @click="() => $router.push({path:'/ask', query:{id:$props.id,queryId:item.id,type:'edit',title:item.title}})">回答</span>
            <span class="" @click="delQuestionsHandle(item.id)" >
              <i class="iconfont zhy-a-icon-zan2x"></i> </span>
          </div>
        </div>
      </div>
    </div>
    <div class="questCont">
      <el-input class="title" v-model.number="quest.title" maxlength="64" @input="ruleshandle"  show-word-limit placeholder="请输入"/>
      <el-input v-model="quest.description" rows="4" type="textarea" @input="ruleshandle" maxlength="500" show-word-limit placeholder="请输入" />
      <div class="fx-sb fx-al-ct" style="margin-top: 4px;">
        <div><el-checkbox v-model="quest.anonymity" label="私密" size="large" /></div>
        <div class="subCont">
          <span class="bt ft-14" :class="{'bt-dis':!isSend}" @click="submitForm(ruleFormRef)">提问</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import defaultImage from '@/assets/icon.jpeg'
import { ref, onMounted, reactive } from "vue"
import { getClassChapter, getAskList, getMyAskList, delQuestions } from "@/api/classDetails.js"
import { useUserStore, dataCacheStore, isLogin } from '@/store'
import { useRoute, useRouter } from "vue-router";
import {ElMessage} from "element-plus"
const route = useRoute()
const router = useRouter()
const store = useUserStore();
const dataCache = dataCacheStore();


// 引入父级传参
const props = defineProps({
  id:{
    type: String,
    default: ''
  }, 
})

// 默认头像
const onerrorImg = (tag) => {
  tag.icon = defaultImage;
}

// 用户信息
const userInfo = ref();
onMounted(() => {
  if(isLogin()){
    // 获取登录信息中的我的信息
    userInfo.value = store.getUserInfo
    // 获取小节数据
    getClassChapterData(route.query.id)
    // 获取问答列表
    getAskListsDataes()
  }
})

// 问答列表参数
const params = ref({
  courseId: route.query.id,
  isAsc:true,
  pageNo: 1,
  pageSize: 10,
  sectionId: '',
  sortBy: ''
});

const ruleshandle = () => {
  console.log(909)
  // const ruleData = {...ruleForm}
  // let isValue = true
  // for(let k in ruleData){
  //   if (ruleData[k] == '' && k != 'anonymity'){
  //       isValue = false
  //     }
  // }   
  // isSend.value = isValue
}
//
const isSend = ref(true)
// 提问数据
const quest = reactive({
  courseId: '', // 课程id,
  chapterId: '',  // 章Id
  sectionId: '', // 小节Id
  title: '', 
  anonymity: false, // 是否匿名
  description: '',
})
// 列表数据
const askListsDataes =  ref([])
const total = ref(0)
// 切换全部问答及我的问答
const askType = ref('all')
const askCheck = type => {
  params.value.pageNo = 1
  params.value.pageSize = 10
  askType.value = type
  getAskListsDataes()
}
const checkCahpter = (id) => {
  params.value.pageNo = 1
  params.value.pageSize = 10
  params.value.sectionId = id
  getAskListsDataes()
}
// 获取问答列表
const getAskListsDataes = async () => {
  const questFun = askType.value == 'all' ? getAskList : getMyAskList
  params.value.sectionId == 'all' ? params.value.sectionId = '' : null
  await questFun(params.value)
    .then((res) => {
      if (res.code == 200) {
        if (askType.value == 'all'){
          askListsDataes.value = res.data.list
        } else {
          askListsDataes.value = res.data.list.map(n => {
            n.user = {...userInfo.value}
            return n
          })
        }
        total.value = Number(res.data.total)
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "问答列表数据请求出错！",
        type: 'error'
      });
    });
}
// 删除问题
const delQuestionsHandle = async id => {
await delQuestions(id)
    .then((res) => {
      if (res.code == 200) {
        // 删除成功
        ElMessage({
          message:'问题删除成功！',
          type: 'success'
        });
        getAskListsDataes()
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "问题删除请求出错！",
        type: 'error'
      });
    });
}
// 去往详情页面
const goDetails = (item) => {
  dataCache.setAskDetails(item)
  router.push({path: '/askDetails', query:{id:item.id}})
}
// 小节数据
const chapterData = ref([])

// 获取小节数据
const getClassChapterData = async (id) => {
  await getClassChapter(id)
    .then((res) => {
      if (res.code == 200) {
        chapterData.value = [{id:'all', index: '全部'},...res.data]
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "课程章节数据请求出错！",
        type: 'error'
      });
    });
}

// 设置每页多少条
const handleSizeChange = (val) => {
  params.value.pageSize = val
  getAskListsDataes()
}
// 去往某一页
const handleCurrentChange = (val) => {
  params.value.pageNo = val
  getAskListsDataes()
}

</script>
<style lang="scss" scoped>
.questionWrapper{
  height: calc(100vh - 415px);
  margin-top: 15px;
  .askCont{
    .askLists{
      line-height: 40px;
      font-size: 14px;
      .userInfo{
        line-height: 20px;
        font-size: 12px;
        color: var(--color-font3);
        img {
          width: 20px;
          height: 20px;
          border-radius: 26px;
          margin-right: 10px;
        }
      }
      .ask{
        color: #A0A9B2;
        .tit{
          line-height: 24px;
          margin-top: 6px;
        }
      }
      .time{
        color: var(--color-font3);
        padding-bottom:10px;
        margin-bottom: 19px;
        border-bottom: 1px solid #000000;
        line-height: 20px;
        .actBut{
          color: #A0A9B2;
          cursor: pointer;
          .iconfont{
            position: relative;
            color: #A0A9B2;
            font-size: 20px;
            top: 2px;
          }
          .btnIcon{
            color: #A0A9B2;
            width: 21px;
            height: 21px;
            position: relative;
            top: 5px;
          }
        }
      }
    }
  }
  .questCont{
    position: absolute;
    width: 100%;
    background-color: #292F37;
    bottom: 0;
    left: 0;
    padding: 15px;
    
    .title{
      margin-bottom: 10px;
    }
    .subCont{
      .bt{
        width: 80px;
        height: 28px;
        line-height: 28px;
      }
    }
  }
  
}
</style>
