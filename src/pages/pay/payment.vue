<!-- 支付 - 支付页面 -->
<template>
  <div class="paymenttWrapper container bg-wt">
    <div class="title">支付订单</div>
    <div class="successCont fx-sb">
      <div class="fx">
        <img src="@/assets/icon_success.png" width="72" height="72" alt="">
        <div class="">
          <p class="tit">订单提交成功！请尽快完成支付。</p>
          <p>支付还剩 <span class="ft-cl-err">24分钟59分59秒</span> , 超时后将取消订单</p>
        </div>
      </div>
      <div class="price">
        <span>应付金额：</span>
        <span class="ft-cl-err">¥ 1456.00</span>
      </div>
    </div>
    <div class="pay">
      <div class="tit">选择一下支付方式付款</div>
      <div class="fx">
        <div @click="payMethodCheck('zhifubao')" class="cont marg-rt-20" :class="{act: payMethod == 'zhifubao'}"><img src="@/assets/icon_zhifubao.png" width="44" height="44" alt=""> 支付宝 </div>
        <div @click="payMethodCheck('weixin')"  class="cont" :class="{act: payMethod == 'weixin'}"><img src="@/assets/icon_weixin.png" width="44" height="44" alt=""> 微信支付 </div>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      width="440px"
    >
      <template #header class="dialog-title">
        <span>{{dialogCont.title}}</span>
      </template>
      <div style="padding: 0 40px">
        <qrcode-vue value="http://www.baidu.com" :size="320" level="H" />
      </div>
      <template #footer>
        <div class="dialog-footer" v-html="dialogCont.desc"></div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
/** 数据导入 **/
import { onMounted,reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { getClassCourses, postQuestions, putQuestions, getQuestionsDetails } from "@/api/classDetails.js";
import QrcodeVue from 'qrcode.vue'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  // 获取章节列表 - 下拉选择
  
})

const dialogVisible = ref(false)
const dialogCont = reactive({
  title: '',
  desc: ''
})
const title = ref('')
// 选择支付方式
const payMethod = ref('')
const payMethodCheck = (item) => {
  payMethod.value = item
  dialogCont.title = item == 'weixin' ? '微信支付' : '支付宝支付'
  dialogCont.desc = item == 'weixin' 
  ? '<p>请使用<em> 微信 </em>扫一扫</p> <p>二维码完成支付</p>' 
  : '<p>请使用<em> 支付宝 </em>扫一扫</p> <p>二维码完成支付</p>'
  dialogVisible.value = true
  setTimeout(() => {
    router.push('/pay/success')
  }, 2000)
} 




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
