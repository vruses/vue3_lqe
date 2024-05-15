<template>
  <div class="loginContainer">
    <el-form
      :model="loginForm"
      :rules="rules"
      :hide-required-asterisk="true"
      ref="loginFormEl"
    >
      <h3>系统登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="loginForm.username"
          :prefix-icon="User"
          clearable
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          :prefix-icon="Lock"
          type="password"
          show-password
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default">注册</el-button>
        <el-button :loading="loading" type="primary" @click="login">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { LoginRequest } from '@/interfaces/user/loginReq'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/type/user'
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
//登录状态决定路由跳转
let $router = useRouter()
let $route = useRoute()
//等待加载图标效果
let loading = ref(false)
//表单数据
const loginForm = reactive<LoginRequest>({
  username: 'admin',
  password: '123456',
})
const rules = {
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
}
//表单元素
let loginFormEl = ref()
const login = async () => {
  //规则校验不通过中断运行
  try {
    await loginFormEl.value.validate()
  } catch {
    ElNotification({
      type: 'error',
      message: '请输入账号或者密码',
    })
    return
  }
  loading.value = true
  //用于接受服务器响应成功后的数据
  let result
  /*服务器错误或者网络问题的提示*/
  try {
    result = await useUserStore().userLogin(loginForm)
  } catch (error) {
    ElNotification({
      type: 'error',
      message: '网络错误！',
    })
  } finally {
    loading.value = false
  }
  /*服务器响应成功的提示*/
  if (result['code'] === 200) {
    // await $router.replace('/home')
    await $router.replace(($route.query.redirect as string) || '/home')
    ElNotification({
      type: 'success',
      message: '登录成功！',
    })
  } else {
    ElNotification({
      type: 'error',
      message: result['data'].message,
    })
  }
  //等待异步操作完成之后关闭加载效果
  loading.value = false
}
</script>

<style scoped lang="scss">
.loginContainer {
  position: absolute;
  width: 500px;
  height: 300px;
  box-sizing: border-box;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  //子元素垂直居中
  display: flex;
  justify-content: center;
  //垂直水平’居中‘
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  h3 {
    font-size: 30px;
    font-weight: bolder;
    text-align: center;
    margin: 40px 0;
  }
  .el-form-item {
    margin-bottom: 20px;
    width: 300px;
    justify-content: center;
    .el-button {
      flex: 1;
    }
  }
}
</style>
