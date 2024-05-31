<template>
  <el-container>
    <el-aside :class="{ fold: useSettingStore().fold }">
      <Aside></Aside>
    </el-aside>
    <el-container class="mainContainer">
      <el-header><Header></Header></el-header>
      <el-main><Main></Main></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Aside from '@/components/layout/aside/Aside.vue'
import Header from '@/components/layout/header/Header.vue'
import Main from '@/components/layout/main/Main.vue'
</script>

<style scoped lang="scss">
@import '@/styles/variable.scss';
.el-container {
  width: 100vw;
  height: 100vh;
  background-color: rgb(240, 242, 245);
  .el-aside {
    width: 200px;
    transition: all 0.3s ease;
    &.fold {
      width: 64px;
    }
  }
  .mainContainer {
    .el-header {
      height: 70px;
      box-shadow: 10px 1px 12px 0 #ac9898;
      background-color: $headerColor;
    }
    .el-main {
    }
  }
}
</style>
