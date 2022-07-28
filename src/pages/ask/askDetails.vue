<!-- 提问、回复详情 -->
<template>
  <div class="askDetailsWrapper">
    <div class="container" v-if="askInfo">
        <div class="fx-sb ">
          <div class="fx-1 marg-rt-20">
            <!-- 问题主体- start -->
            <div class="askCont bg-wt marg-bt-20">
              <div class="userInfo"> <img :src="askInfo.user.icon" alt=""> {{askInfo.user.name}}</div>
              <div class="askInfo">
                <div class="ft-20 ft-wt-600">{{askInfo.title}}</div>
                <div class="ft-cl-des marg-bt-10">{{askInfo.createTime}}</div>
                <div>{{askInfo.description}}</div>
              </div>
            </div> 
            <!-- 问题主体- end -->
            <!-- 回答题主- start -->
            <div class="answerCont bg-wt marg-bt-20">
              <div class="ft-20 ft-wt-600 marg-bt-20">我要回答</div>
              <div class="answer fx">
                <img :src="store.getUserInfo.icon" alt="" srcset="">
                <div class="fx-1">
                  <el-input v-model="description" rows="11" type="textarea" @input="ruleshandle" maxlength="500" show-word-limit placeholder="请发表高见" />
                  <div class="fx-sb fx-al-ct">
                    <div><el-checkbox v-model="anonymity" label="是否匿名" size="large" /></div>
                    <div class="subCont">
                      <span class="bt ft-14" :class="{'bt-dis':!isSend}" @click="answerHandle(ruleFormRef)">回答</span>
                      </div>
                  </div> 
                </div>
              </div>
            </div>
            <!-- 回答题主- end -->
            <!-- 全部回答- start -->
            <div class="answerCont bg-wt marg-bt-20">
              <div class="ft-20 ft-wt-600 marg-bt-20">全部回答({{count}})</div>
              <div class="answerItems">
                <div class="items" v-for="item in questionData" :key="item.id">
                  <div class="fx-al-ct">
                    <img class="img" :src="item.replier.icon" alt="">
                    <span class="ft-cl-des">{{item.replier.name}}</span>
                  </div>
                  <div class="cont">
                    <div class="marg-bt-10">{{item.content}}</div>
                    <div class="fx-sb">
                      <div class="ft-cl-des">{{item.createTime}}</div>
                      <div>
                        <span @click="openReply"> <i class="iconfont zhy-a-btn_pinglun_nor2x"></i> 评论{{item.replyTimes}} </span> 
                        <span> <i class="iconfont zhy-a-btn_zan_nor2x"></i> 点赞 {{item.likedTimes}}</span>
                      </div>
                    </div>
                  </div>
                  <!-- 插入回复框的位置 -->
                  <div :id="item.id"> </div>
                  <!-- 回复列表 -->
                  <div class="replyCont" v-show="replyData && isReplay == item.id">
                    <div class="items" v-for="it in replyData" :key="it.id">
                      <div class="fx-al-ct">
                        <img class="img" :src="it.replier.icon" alt="">
                        <span class="ft-cl-des">{{it.replier.name}} 88 </span>
                      </div>
                      <div class="cont">
                        <div class="marg-bt-10">{{it.content}}</div>
                        <div class="fx-sb">
                          <div class="ft-cl-des">{{it.createTime}}</div>
                          <div>
                            <span> <i class="iconfont zhy-a-btn_pinglun_nor2x"></i> 评论{{it.replyTimes}} </span> 
                            <span> <i class="iconfont zhy-a-btn_zan_nor2x"></i> 点赞 {{it.likedTimes}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 插入回复框的位置 -->
                      <div :id="item.id"> </div>
                    <!-- 回复列表 -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 相关问题 写死 -->
          <RelatedQuestions></RelatedQuestions>
      </div>
    </div>
  </div>
</template>
<script setup>
/** 数据导入 **/
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from '@/store'
import { getQuestionsDetails, postAnswers, getAllQuestions, getReply } from "@/api/classDetails.js";
import RelatedQuestions from './components/RelatedQuestions.vue'

const store = useUserStore();

const route = useRoute()
const router = useRouter()
const askInfo = ref()
onMounted(() => {
  // 获取问题详情
  getQuestionsDetailsData()
  // 获取回答的列表
  getAllQuestionsData()
})
// 获取问题详情
const getQuestionsDetailsData = async () => {
  await getQuestionsDetails(route.query.id)
    .then((res) => {
      if (res.code == 200) {
        const { data } = res
        askInfo.value = data
      } else {
        ElMessage({
          message:res.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "课程问题数据请求出错！",
        type: 'error'
      });
    });
} 
// 获取全部回答
const questParams = {
  id: route.query.id,
  pageNo: 1,
  pageSize: 10
}
// 获取回答列表
const count = ref(0)
const questionData = ref([])
const getAllQuestionsData = async () => {
  await getAllQuestions(questParams)
    .then((res) => {
      if (res.code == 200) {
        questionData.value = res.data.list
        count.value = res.data.total
      } else {
        ElMessage({
          message:res.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "课程问题数据请求出错！",
        type: 'error'
      });
    });
} 
// 我要回答 - 回答题主
const description = ref('')
// 是否匿名
const anonymity = ref(false)
// 是否可以提交回答
const isSend = ref(false)
const ruleshandle = () => {
  isSend.value = description.value != '' ?  true : false
}
// 打开当前的回答的全部回复
const isReplay = ref();
const openReply = (item) => {
  // 获取回答的答复的列表
  getReplyData(item.id)
}
// 回复数据
const replyData = ref();
const replyCont = ref();
const getReplyData = async (id) => {
    const questParams = {
      id,
      pageNo:1,
      pageSize:10,
    }
    await getReply(questParams)
    .then((res) => {
      if (res.code == 200) {
       replyData.value = res.data.list
       replyCont.value = res.data.total
       isReplay.value = id
      } else {
        ElMessage({
          message:res.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "回复数据请求出错！",
        type: 'error'
      });
    });
}


// 提交数据
const params = reactive({
  answerId:'', 
  questionId: askInfo.id, // 当前问题的ID
  targetReplyId:'',
  targetUserId:'',
  answerId:'',
  content:'',
  anonymity:''
})
// 提交回复
const answerHandle = async () => {
  params.content = description
  params.anonymity = anonymity
 await postAnswers(params)
    .then((res) => {
      if (res.code == 200) {
        ElMessage({
          message:'回复成功！',
          type: 'error'
        });
      } else {
        ElMessage({
          message:res.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "课程问题数据请求出错！",
        type: 'error'
      });
    });
}

</script>
<style lang="scss" src="./index.scss"></style>
