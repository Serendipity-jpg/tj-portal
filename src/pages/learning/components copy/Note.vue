<!-- 学习目录 -->
<template>
  <div class="learnNoteWrapper">
    <div class="tabCheck">
      <span class="fx-1 cur-pt" @click="activeHandle(1)" :class="{act: actIndex == 1}">我的笔记</span>
      <span class="line"></span>
      <span class="fx-1 cur-pt" @click="activeHandle(2)" :class="{act: actIndex == 2}">全部笔记</span>
    </div>
    <div class="noteCont" >
      <div class="noteLists" v-for="item in noteListsDataes">
        <div class="userInfo fx">
          <img :src="item.user.icon" :onerror="onerrorImg(item.user)" alt="" srcset="">
          {{item.user.name}}
        </div>
        <div class="note">
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
      <el-input v-model="noteParams.description" rows="4" type="textarea" @input="ruleshandle" maxlength="500" show-word-limit placeholder="请输入" />
      <div class="fx-sb fx-al-ct" style="margin-top: 12px;">
        <div></div>
        <div class="subCont">
          <span class="bt ft-14" :class="{'bt-dis':!isSend}" @click="submitForm()">保存</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
import { getAllNotes, getMyNotes } from "@/api/notes.js"
import {ElMessage} from 'element-plus'
import {useRoute} from "vue-router"
const route = useRoute()

// 引入父级传参
const props = defineProps({
  id:{
    type: String,
    default: ''
  }
})

onMounted(() => {
  // 获取笔记信息
  getAskListsDataes()
})
const isSend = ref(false)
// emit数据载入
const emit = defineEmits(['sortHandle'])

const actIndex = ref(1);
// 提问数据
const noteParams = reactive({
  courseId: '', // 课程id,
  chapterId: '',  // 章Id
  sectionId: '', // 小节Id
  anonymity: false, // 是否匿名
  description: '',
})
// 点击选中
const activeHandle = (value) => {
  actIndex.value = value
  // // 提交父级 
  // emit('sortHandle', value)
}
// 笔记数据
const noteListsDataes = ref({})
// 问答列表参数
const params = ref({
  isAsc:true,
  pageNo: 1,
  pageSize: 10,
  sectionId: props.id,
  courseId: route.query.id,
  sortBy: ''
});
// 获取笔记列表
const getAskListsDataes = async () => {
  const questFun = actIndex.value == 2 ? getAllNotes : getMyNotes
  params.value.sectionId == 1 ?  params.value.sectionId = undefined : null
  await questFun(params.value)
    .then((res) => {
      if (res.code == 200) {
        if (askType.value == 'all'){
          noteListsDataes.value = res.data.list
        } else {
          noteListsDataes.value = res.data.list.map(n => {
            n.author = {...userInfo.value}
            return n
          })
        }
        total.value =  Number(res.data.total)
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "笔记列表数据请求出错！",
        type: 'error'
      });
    });
}
// 
const ruleshandle = (item) =>{
  console.log(item)
  if (noteParams.description != ''){
    isSend.value = true
  } else {
    isSend.value = false
  }
}
</script>
<style lang="scss" scoped>
.learnNoteWrapper{
  .tabCheck{
    margin: 10px auto;
    display:flex;
    justify-content: center;
    width: 204px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #A0A9B2;
    color: #A0A9B2;
    border-radius: 16px;
    font-size: 14px;
    text-align: center;
    .line{
      position: relative;
      top: 10px;
      height: 12px;
      width: 1px;
      background-color: #A0A9B2;
    }
  }
  .act{
    color: #FFF;
  }
    .noteCont{
    .noteLists{
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
      .note{
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
