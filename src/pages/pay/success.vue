<!-- 支付 - 结算页面 -->
<template>
  <div class="successWrapper container bg-wt">
      <div class="successCont">
        <div><img src="@/assets/icon_success.png" width="72" height="72" alt=""></div>
        <div class="tit">支付成功</div>
        <div class="order">订单ID ：202203071921003</div>
        <div @click="() => $router.push('/personal/main/myOrder')"><span class="bt">查看订单详情</span></div>
      </div>
  </div>
</template>
<script setup>
/** 数据导入 **/
import { onMounted,reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { getClassCourses, postQuestions, putQuestions, getQuestionsDetails } from "@/api/classDetails.js";

const route = useRoute()
const router = useRouter()

onMounted(() => {
  // 获取章节列表 - 下拉选择
  
})

const ruleFormRef = ref()

const props = {
  expandTrigger: 'hover',
}
// 选择小节的数据
const value = ref([])

// 提问数据
const ruleForm = reactive({
  courseId: '', // 课程id,
  chapterId: '',  // 章Id
  sectionId: '', // 小节Id
  title: '', 
  anonymity: false, // 是否匿名
  description: '',
})

// 获取章节列表 - 下拉使用
let options = ref([])

const getClassCoursesDataes = async () => {
  await getClassCourses(classInfo.id)
    .then((res) => {
      if (res.code == 200) {
        const { data } = res
        const opt = data.map(n => {
            return {
              value : n.id,
              label: n.name,
              children : n.sections.map(h => {
                return {
                value: h.id,
                label: h.name
              }
            })
          }
        })
        options.value = opt
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
// 获取问题详情
const getQuestionsDetailsData = async () => {
  await getQuestionsDetails(classInfo.queryId)
    .then((res) => {
      if (res.code == 200) {
        const { data } = res
        ruleForm.courseId = data.courseId, // 课程id,
        ruleForm.chapterId= data.chapterId,  // 章Id
        ruleForm.sectionId=data.sectionId, // 小节Id
        ruleForm.title= data.title, 
        ruleForm.anonymity= data.anonymity, // 是否匿名
        ruleForm.description= data.description,
        ruleForm.id=data.id
        value.value = [data.chapterId, data.sectionId]
      } else {
        ElMessage({
          message:res.data.msg,
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

// 效验规则
const rules = reactive({})
const isSend = ref(false)

const ruleshandle = () => {
  const ruleData = {...ruleForm}
  let isValue = true
  for(let k in ruleData){
    if (ruleData[k] == '' && k != 'anonymity'){
        isValue = false
      }
  }   
  isSend.value = isValue
}

// 寻找提问章节
const handleChange = (val) => {
  ruleForm.chapterId = val[0]
  ruleForm.sectionId = val[1]
  ruleshandle()
}
// 提问数据提交
const submitForm = (formEl) => {
  if (!isSend.value) return
  formEl.validate(async (valid) => {
    if (valid) {
    //  根据不同模式执行新增或编辑提问
     const subFunc = type == 'edit' ? putQuestions : postQuestions;
     await subFunc(ruleForm).then((res) => {
        if (res.code == 200) {
          router.push({path: '/result/success', query: '查看我的问题'})
        } else {
          ElMessage({
            message:res.data.msg,
            type: 'error'
          });
        }
      })
      .catch(() => {
        ElMessage({
          message: type == 'edit' ? '问题修改出错！':'问题发布出错！',
          type: 'error'
        });
      });
    } else {
      console.log('error submit!')
      return false
    }
  })
}



</script>
<style lang="scss" src="./index.scss"> </style>
