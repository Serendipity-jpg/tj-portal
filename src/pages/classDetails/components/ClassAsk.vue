<!-- 问答模块 -->
<template>
  <div class="classAsk bg-wt marg-bt-20">
    <div class="tabLab fx-sb">
      <div class="lable">
        <span @click="askCheck('all')" :class="{act:askType == 'all'}" class="marg-rt-20">全部问答</span> 
        <span @click="askCheck('my')" :class="{act:askType == 'my'}">我的问答</span>
      </div> 
      <div class="ask"><span @click="() => $router.push({path: '/ask', query: {id: '2334', title: '程序语言开发与设计'}})" class="bt bt-round ft-14">提问</span></div>
    </div>
    <AskChapterItems :data="chapterData" @checkCahpter="checkCahpter"></AskChapterItems>
    <div class="askCont">
      <div class="askLists" v-for="item in askListsDataes">
        <div class="userInfo fx">
          <img :src="item.user.icon" alt="" srcset="">
          {{item.user.name}}
        </div>
        <div class="ask">
          <div class="ft-16">{{item.title}}</div>
          <div class="font-bt2" @click="goDetails(item)" v-if="item.latestAnswer && item.latestAnswer.content">最新【{{item.latestAnswer.replier.name}}】的回答</div>
        </div>
        <div class="time fx-sb">
          <div>{{item.createTime}}</div>
          <div class="actBut">
            <span class="font-bt marg-rt-20" @click="() => $router.push({path:'/ask', query:{id:item.id,type:'edit',title:item.title}})" v-if="userInfo.id == item.user.id"><btnBj class="btnIcon"></btnBj> 编辑</span>
            <span class="font-bt marg-rt-20" @click="delQuestionsHandle(item.id)" v-if="userInfo.id == item.user.id"><btnDel  class="btnIcon"></btnDel> 删除 </span>
            <span class="font-bt2" @click="goDetails(item)"><i class="iconfont zhy-a-btn_pinglun_nor2x"></i> 回答 {{item.answerAmount}}</span>
          </div>
        </div>
      </div>
      <div class="pagination fx-ct">
        <el-pagination
          v-model:currentPage="params.pageNo"
          v-model:page-size="params.pageSize"
          background
          :page-sizes="[10, 20, 50, 100]"
          layout="total, prev, pager, next, sizes, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
import { getClassChapter, getAskList, getMyAskList, delQuestions } from "@/api/classDetails.js"
import AskChapterItems from "../../../components/AskChapterItems.vue";
import { useUserStore, dataCacheSrore } from '@/store'
import btnBj from '@/assets/btn_bj.svg'
import btnDel from '@/assets/btn_del.svg'
import { useRouter } from "vue-router";
import {ElMessage} from "element-plus"
const router = useRouter()
const store = useUserStore();
const dataCache = dataCacheSrore();
// 引入父级传参
const props = defineProps({
  id:{
    type: String,
    default:''
  }
})

// 用户信息
const userInfo = ref();
onMounted(() => {
  // 获取登录信息中的我的信息
  userInfo.value = store.getUserInfo
  // 获取小节数据
  getClassChapterData()
  // 获取问答列表
  getAskListsDataes()
})
// 问答列表参数
const params = ref({
  isAsc:true,
  pageNo: 1,
  pageSize: 10,
  sectionId: '',
  sortBy: ''
});
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
  await questFun(params)
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
        total.value = res.data.total
      } else {
        ElMessage({
          message:res.msg,
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
// 删除问题
const delQuestionsHandle = async id => {
await delQuestions(id)
    .then((res) => {
      if (res.code == 200) {
        // 删除成功
      } else {
        ElMessage({
          message:res.msg,
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
// 去往详情页面
const goDetails = (item) => {
  dataCache.setAskDetails(item)
  router.push({path: '/askDetails', query:{id:item.id}})
}
// 小节数据
const chapterData = ref([])

// 获取小节数据
const getClassChapterData = async () => {
  await getClassChapter(props.id)
    .then((res) => {
      if (res.code == 200) {
        chapterData.value = [{id:'all', index: '全部'},...res.data]
      } else {
        ElMessage({
          message:res.msg,
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
.classAsk{
  padding-top: 30px;
  .tabLab{
    margin-bottom: 20px;
    .lable{
      display: flex;
      align-items: center;
       span{
        cursor: pointer;
      }
    }
    .ask{
      width: 103px;
      height: 32px;
      align-items: center;
      span{
        line-height: 30px;
      }
    }
    .act{
      background: #19232B;
      border-radius: 20px;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      padding: 5px 20px;
    }
  }
  .askCont{
    padding-top: 20px;
    .askLists{
      line-height: 40px;
      font-size: 14px;
      .userInfo{
        line-height: 26px;
        color: var(--color-font3);
        img {
          width: 26px;
          height: 26px;
          border-radius: 26px;
          margin-right: 10px;
        }
      }
      .ask{
        padding-left: 36px;
      }
      .time{
        color: var(--color-font3);
        width: calc(100% - 36px);
        margin-left: 36px;
        padding-bottom:20px;
        border-bottom: 1px solid #EEEEEE;
        margin-bottom: 20px;
        .actBut{
          color: #19232B;
          cursor: pointer;
          .btnIcon{
            width: 21px;
            height: 21px;
            position: relative;
            top: 5px;
          }
        }
      }
    }
  }
  .pagination{
    padding-top: 40px;
    text-align: center;
  }
}
</style>
