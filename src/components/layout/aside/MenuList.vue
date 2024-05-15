<template>
  <template v-for="route in routeList" :key="route.path">
    <template v-if="route.meta && !route.children">
      <!--没有children的菜单路由-->
      <el-menu-item :index="route.path" v-if="route.meta.menu">
        <el-icon>
          <component :is="route.meta.icon"></component>
        </el-icon>
        <span>{{ route.meta.title }}</span>
      </el-menu-item>
    </template>
    <template v-if="route.children && route.children.length !== 0">
      <!--有children的菜单路由-->
      <el-sub-menu :index="route.path">
        <template #title>
          <el-icon>
            <component :is="route.meta.icon"></component>
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </template>
        <!--递归渲染子组件-->
        <MenuList :routeList="route.children"></MenuList>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
defineProps(['routeList'])
</script>
<script lang="ts">
//递归组件声明
export default {
  name: 'MenuList',
}
</script>

<style scoped></style>
