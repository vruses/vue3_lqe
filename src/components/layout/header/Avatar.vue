<template>
  <div class="avatar-container">
    <img :src="userInfo.data['avatar']" alt="用户" />
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        {{ userInfo.data['name'] }}
        <el-icon class="el-icon--right"><arrow-down-bold /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownBold } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue'
import useUserStore from '@/store/type/user'
import { useRouter } from 'vue-router'

//将数据存为reactive对象的某个属性
let userInfo = reactive({ data: {} })
//拿到用户相关信息
onMounted(async () => {
  const result = await useUserStore().getUserInfo()
  userInfo.data = result['data']
})
const $router = useRouter()
//处理退出登录
const handleLogout = () => {
  useUserStore().token = ''
  console.log($router)
  $router.replace('/login')
}
</script>

<style scoped lang="scss">
.avatar-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 32px;
  img {
    width: 24px;
    height: 24px;
  }
}
</style>
