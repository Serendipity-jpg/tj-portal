<!-- 登录页面 -->
<template>
  <div class="loginPass">
    <el-form
      ref="formRef"
      :model="fromData"
      :rules="rules"
      rules
      label-width="0px"
      class="demo-dynamic"
    >
      <el-form-item prop="username" label="">
        <el-input v-model="fromData.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password" label="">
        <el-input type="pass" :show-password="true" v-model="fromData.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item class="marg-b-10">
        <div class="fx-sb">
            <div>
                <el-checkbox v-model="checked" label="7天免登录" size="large" />
            </div>
            <div>找回密码</div>
        </div>
      </el-form-item>
      <el-form-item class="marg-bt-15">
        <div class="bt" @click="submitForm(formRef)">登 录</div>
      </el-form-item>
    </el-form>
    <div class="font-bt text-center">
        去注册
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import { userLogins, getUserInfo } from "@/api/user"
import { useUserStore } from '@/store'

const store = useUserStore();
const router = useRouter()

const formRef = ref();
const checked = ref(false)
const fromData = reactive({
  username: "jack",
  password: "123",
  type: 1
});

const rules = reactive({
  username: [
    { required: true, message: "请输入正确的用户名", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入正确的用密码", trigger: "blur"},
  ],
});
// 登录
const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      // 提交登录 
      await userLogins(fromData)
			.then(async res => {
				if (res.code == 200) {
                    // 用户token写入 pinia
					store.setToken(res.data);
					// 获取用户信息
          const data = await getUserInfo()
          if (data.code == 200) {
              // 记录到store 并调转到首页
              store.setUserInfo(data.data)
              router.push('/main/index')
          } 
					// 跳转到首页
				} else {
					console.log('登录失败')
				}
			})
			.catch(err => {});
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

</script>
<style lang="scss" scoped>
.loginPass {
    margin-top: 40px;
}
</style>
