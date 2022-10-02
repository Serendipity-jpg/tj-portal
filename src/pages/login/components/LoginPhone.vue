<!-- 登录页面 - 手机号 -->
<template>
  <div class="loginPhone">
    <el-form
      ref="formRef"
      :model="fromData"
      :rules="rules"
      label-width="0px"
      class="demo-dynamic"
    >
      <el-form-item prop="userName" label="">
        <el-input v-model="fromData.cellPhone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="password" label="">
        <el-input type="pass" v-model="fromData.code" placeholder="请输入验证码" />
      </el-form-item>
      <el-form-item class="marg-b-10">
        <div class="fx-sb">
            <div>
                <el-checkbox v-model="checked1" label="7天免登录" size="large" />
            </div>
            <div>找回密码</div>
        </div>
      </el-form-item>
      <el-form-item class="marg-bt-15">
        <div class="bt" @click="submitForm(formRef)">登 录</div>
      </el-form-item>
    </el-form>
    <div class="font-bt text-center"  @click="goRegister">
        去注册
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";

const emit = defineEmits(['goHandle'])
// 登录数据初始化
const formRef = ref();
const fromData = reactive({
  cellPhone: "13500010003",
  code: "123",
  type: 2
});
// 效验规则
const rules = reactive({
  userName: [
    { required: true, message: "请输入正确的手机号", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入正确的用验证码", trigger: "blur"},
  ],
});
// 数据提交
const submitForm = (formEl) => {
  ElMessage({
      message: '暂不支持手机号登录， 请使用用户名密码登录',
  });
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

// 去注册
const goRegister = () => {
  emit('goHandle', 'register')
}
</script>
<style lang="scss" scoped>
.loginPhone {
    margin-top: 40px;
}
</style>

