<template>
  <el-menu
    router
    @open="handleSubMenuOpen"
    :collapse="useSettingStore().fold"
    :collapse-transition="false"
  >
    <MenuList :routeList="routeList"></MenuList>
  </el-menu>
</template>

<script setup lang="ts">
import MenuList from './MenuList.vue'
import { constRoutes } from '@/router/constRoutes'
import { useRouter } from 'vue-router'
import useSettingStore from '@/store/type/settings'
//不用props方式传值，递归组件报错
const route = constRoutes.find((route) => route.name === 'root')
const routeList = route['children']
//sub-menu展开的事件回调
const router = useRouter()
function handleSubMenuOpen(menuIndex) {
  //去掉menuIndex的'/'则为该路由的name
  router.push({ name: menuIndex.replace(/\/\s*/g, ''), replace: true })
}
</script>

<style scoped lang="scss">
@import '@/styles/variable.scss';
.el-menu {
  background-color: $asideColor;
}
</style>
