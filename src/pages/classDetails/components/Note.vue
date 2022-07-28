<!-- 笔记模块 -->
<template>
  <div class="note bg-wt marg-bt-20">
    <div class="tabLab fx-sb">
      <div class="lable">
        <span @click="askCheck('all')" :class="{act:askType == 'all'}" class="marg-rt-20">全部笔记</span> 
        <span @click="askCheck('my')" :class="{act:askType == 'my'}">我的笔记</span>
      </div> 
    </div>
    <AskChapterItems :data="chapterData" @checkCahpter="checkCahpter"></AskChapterItems>
    <div class="askCont">
      <div class="askLists" v-for="item in askListsDataes">
        <div class="userInfo fx">
          <img :src="item.author.icon" alt="" srcset="">
          {{item.author.name}}
        </div>
        <div class="ask">
          <div class="ft-16">{{item.content}}</div>
          <div class="font-bt" v-if="item.latestAnswer && item.latestAnswer.content">最新【{{item.latestAnswer.replier.name}}】的回答</div>
        </div>
        <div class="time fx-sb">
          <div>{{item.createTime}}</div>
          <div class="actBut">
            <span class="marg-rt-20" v-if="userInfo.id == item.author.id"><i class="iconfont zhy-btn_pinglun_nor1"></i> 编辑</span>
            <span class="marg-rt-20" v-if="userInfo.id == item.author.id"><i class="iconfont zhy-btn_backtop" ></i> 删除 </span>
            <span class="marg-rt-20" v-if="userInfo.id != item.author.id "><i class="iconfont zhy-icon_shoucang"></i> 采集 {{item.answerAmount}}</span>
            <span><i class="iconfont zhy-btn_zan_nor"></i> 点赞 {{item.answerAmount}}</span>
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
import { ElMessage } from "element-plus";
import { getClassChapter } from "@/api/classDetails.js"
import { getAllNotes, getMyNotes } from "@/api/notes.js"
import AskChapterItems from "../../../components/AskChapterItems.vue";
import { useUserStore } from '@/store'
// 引入父级传参
const props = defineProps({
  id:{
    type: Object,
    default:{}
  }
})
const store = useUserStore();
// 用户信息
const userInfo = ref();
onMounted(() => {
  // 获取登录信息中的我的信息
  userInfo.value = store.getUserInfo
  console.log(90, userInfo.value)
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
  const questFun = askType.value == 'all' ? getAllNotes : getMyNotes
  await questFun(params)
    .then((res) => {
      if (res.code == 200) {
        if (askType.value == 'all'){
          askListsDataes.value = res.data.list
        } else {
          askListsDataes.value = res.data.list.map(n => {
            n.author = {...userInfo.value}
            return n
          })
        }
        console.log(454545, askListsDataes.value)
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
.note{
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
