<!-- 学习练习 -->
<template>
  <div class="practiseWrapper">
    <div class="preview">
      <div class="previewTit">答题卡</div>
      <div class="previewList">
        <span v-for="(item, index) in params" :class="{act: item.answers != undefined && String(item.answers) != ''}" :key="index">{{index + 1}}</span>
      </div>
      <div class="previewSub" @click="submit" ><span class="bt">提交试卷</span></div>
      
    </div>
    <div class="ExQuestions" v-infinite-scroll="load" style="overflow: auto">
      <div class="questions" v-for="(item, index) in subjectList" :key="index">
        <div class="title fx" v-html="` <p>${index+1}. ${subjectTypeWt(item.subjectType)}</p>${item.name}`"></div>
        <!-- 不同的题型展示不同的题 1：单选题，2：多选题，3：不定向选择题，4：判断题，5：主观题 -->
        <div v-if="item.subjectType == 1">
          <el-radio-group v-model="item.answers" class="ml-4">
            <el-radio :label="ind+1"  v-for="(it, ind) in item.options" :key="it" size="large">
              <div class="fx"><span>{{upperAlpha(ind)}}</span><span v-html="it"></span></div>
            </el-radio>
          </el-radio-group>
        </div>
        <div v-if="item.subjectType == 2">
          <el-checkbox-group v-model="item.answers" >
            <el-checkbox v-for="(it, ind) in item.options" :label="ind+1" :key="it" >
              <div class="fx"><span>{{upperAlpha(ind)}}</span><span v-html="it"></span></div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div v-if="item.subjectType == 3">
          <el-checkbox-group v-model="item.answers">
            <el-checkbox v-for="(it, ind) in item.options" :label="ind+1" :key="it" >
             <div class="fx"> <span>{{upperAlpha(ind)}}</span><span v-html="it"></span></div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div v-if="item.subjectType == 4">
            <el-radio-group v-model="item.answers" class="ml-4">
              <el-radio :label="true" size="large">A. 正确</el-radio>
              <el-radio :label="false" size="large">B. 错误</el-radio>
            </el-radio-group>
        </div>
        <div v-if="item.subjectType == 5">
          <el-input type="textarea" class="textArea" rows="5" maxlength="200" v-model="item.answers" placeholder="请输入正确答案" show-word-limit ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { onMounted, ref, reactive, onBeforeUnmount  } from 'vue'
  import {ElMessage, ElMessageBox} from 'element-plus'
  import { getSubject, postSubject } from '@/api/subject.js';
  import { dataCacheStore } from "@/store"

  const store = dataCacheStore()
  const currentPlayData = store.getCurrentPlayData

  // 接收传过来的参数
  const props = defineProps({
    id:{
      type: String,
      default: '',
    }, 
    examId:{
      type: String,
      default: '',
    },
  })
  
  const emit = defineEmits(['goHandle', 'playHadle'])

  // 生命周期
  onMounted(() => {
    // 根据小节或测试id获取练习题
    getSubjectList()
    // 开始答题
  })
  // 添加题型
  const subjectTypeWt = (type) => {
    let str = ''
    switch(type){
      case 1 :
        str = ' (选择题) ';
        break
      case 2 :
        str = ' (多选题) ';
        break
      case 3 :
        str = ' (不定项选择题) ';
        break
      case 4 :
        str = ' (判断题) ';
        break
      case 5 :
        str = ' (主观题) ';
        break
    }
    return str
  }

  // 添加 A、B、C、D
  const upperAlpha = (num) => {
    let str = ''
    switch(num){
      case 0 :
        str = 'A.';
        break
      case 1 :
        str = 'B.';
        break
      case 2 :
        str = 'C.';
        break
      case 3 :
        str = 'D.';
        break
    }
    return str
  } 

  // 根据小节或测试id获取练习题
  const subjectList = ref()
  const getSubjectList = async () => {
    await getSubject(currentPlayData.sectionId)
      .then((res) => {
        if(res.code == 200){
          subjectList.value = res.data
        } else {
          ElMessage({
            message: res.msg,
            type: 'error'
          });
        } 
      })
      .catch(() => {
        ElMessage({
          message: "学习计划获取请求出错！",
          type: 'error'
        });
      });
  }

  // 是否已经提交试卷
  const isSubmit = ref(false)

  // 确认提交试卷
  const params = reactive(subjectList)
  const submit = () =>{
    const Effective = params.value.filter(n => n.answers != "" && n.answers != undefined )
    if(Effective.length < subjectList.value.length){
      ElMessageBox.confirm(
        `还有未提交答案，是否要提交答卷。`,
        '确认交卷',
        {
          confirmButtonText: '确认提交',
          cancelButtonText: '我再看看',
          type: 'warning',
        }
      )
        .then(() => {
          postSubjectHandle()
        })
        .catch(() => {
        })
    } else {
      postSubjectHandle()
    }
  }

  // 提交了
  const postSubjectHandle = () => {
    const param = params.value.map(el => {
      const data = {questionId: el.id, answer:el.answers.toString(), questionType: el.subjectType}
      return data
    });
    postSubject({examDetails: param, id: props.examId})
      .then((res) => {
        if(res.code == 200){
          subjectList.value = res.data
          isSubmit.value = true
          console.log(currentPlayData)
          emit('playHadle', {item: currentPlayData, tp: '9'})
        } else {
          ElMessage({
            message: res.msg,
            type: 'error'
          });
        } 
      })
      .catch(() => {
        ElMessage({
          message: "学习计划获取请求出错！",
          type: 'error'
        });
      });
  }
  
  // 组件卸载前提醒交卷
  onBeforeUnmount(() => {
    // leaveConfirm()
  })
  // 已经答题但没提交前的效验
  function leaveConfirm () {
    if (isSubmit.value){
      return false;
    }
    const Effective = params.value.filter(n => n.answers != "" && n.answers != undefined )
    if(Effective.length > 0){
      ElMessageBox.confirm(
        `还有未提交答案，是否要提交答卷。`,
        '确认交卷',
        {
          confirmButtonText: '确认提交',
          cancelButtonText: '我再看看',
          type: 'warning',
        }
      )
        .then(() => {
          postSubjectHandle()
        })
        .catch(() => {
        })
    } 
  }
  const load = () => {}
</script>
<style lang="scss" scoped>
.practiseWrapper{
  background-color: black;
  color: black;
  height: calc(100vh - 60px);
  padding:30px;
  display: flex;
  .preview{
    width: 188px;
    height: max-content;
    background: #FFFFFF;
    margin-right: 20px;
    padding: 15px;
    .previewTit{
      font-size: 14px;
      color: var(--color-font1);
      margin-bottom: 20px;
    }
    .previewList{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-bottom: 30px;
      
      span{
        display: inline-block;
        width: 22px;
        line-height: 22px;
        border: 1px solid #80878C;
        color: #80878C;
        border-radius: 2px;
        margin-right: 10px;
        margin-bottom: 10px;
        text-align: center;
      }
      span:nth-child(5n){
        margin-right: 0px;
      }
      .act{
        color: #fff;
        background: #27BA9B;
        border: 1px solid #27BA9B;
      }
    }
    .previewSub{
      width: 80px;
      height: 28px;
      border-radius: 3px; 
      margin: 0 auto;
      .bt{
        font-size: 14px;
        line-height: 28px;
      }
    }
  }
  .ExQuestions{
    background-color: #FFFFFF;
    flex: 1;
    padding: 30px;
    .textArea{
      width: 100%;
    }
    .title{
      margin: 16px 0;
    }
  }
}
</style>
