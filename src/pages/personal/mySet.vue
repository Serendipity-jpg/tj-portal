<!-- 个人设置 -->
<template>
  <div class="mySetWrapper content">
    <CardsTitle class="marg-bt-40" title="个人设置" />
    <TableSwitchBar :data="tabData" @changeTable="checkHandle"></TableSwitchBar>  
    <div v-if="act == 0" class="fx-sb pd-tp-30">
      <div>
        <div class="fx">
          <div class="item fx">
            <span class="lab">账号：</span><el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item fx">
            <span class="lab">昵称：</span> <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="item fx">
          <span class="lab">性别：</span>
          <el-radio-group class="radioGroup" v-model="radio">
            <el-radio :label="3">男</el-radio>
            <el-radio :label="6">女</el-radio>
          </el-radio-group>
        </div>
        <div class="item fx">
          <div class="bt">更新信息</div>
        </div>
      </div>
      <div>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="uploadBut"><span>上传头像</span></div>
        </el-upload>
      </div>
    </div>
    <div v-else class="set pd-tp-30">
      <div class="line fx-sb"><div><span>登录密码</span> 当前密码强度：</div><span class="font-bt">修改</span></div>
      <div class="line fx-sb"><div><span>绑定手机</span> 已绑定手机：177****8888</div><span class="font-bt">修改</span></div>
      <div class="line fx-sb"><div><span>绑定邮箱</span> 已绑定邮箱：anthony@itcast.cn</div><span class="font-bt">去解绑</span></div>
    </div>
  </div>
</template>
<script setup>

/** 数据导入 **/
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { getClassDetails, getClassTeachers, getClassList } from "@/api/classDetails.js";
import { getCourseLearning } from "@/api/class.js";
import { useRoute } from "vue-router";
import { dataCacheStore, useUserStore } from "@/store"

// 组件导入
import CardsTitle from "./components/CardsTitle.vue";
import TableSwitchBar from "@/components/TableSwitchBar.vue";


const userInfo = ref(useUserStore().getUserInfo)

const route = useRoute()
const store = dataCacheStore()

const tabData = [
  {id: 0, name: '基本信息'},
  {id: 1, name: '安全设置'}
]
const act = ref(0)
const checkHandle = val => {
  act.value = val
}
// 课程目录
const classListData = ref([])
const baseClassTeacherData = ref([])

// mounted生命周期
onMounted(async () => {
 
});

/** 方法定义 **/
// 图片上传
const imageUrl = ref('')
function handleAvatarSuccess(res, file) {
  imageUrl.value = URL.createObjectURL(file.raw);
}

//
function beforeAvatarUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    this.$message.error('上传头像图片只能是 JPG 格式!');
  }
  if (!isLt2M) {
    this.$message.error('上传头像图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
}

</script>
<style lang="scss" src="./index.scss"> </style>


