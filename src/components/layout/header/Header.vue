<template>
  <div class="header">
    <div class="left-bar">
      <el-icon style="margin-right: 10px" size="20" @click="changeMenuState">
        <component :is="useSettingStore().fold ? Fold : Expand"></component>
      </el-icon>
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="right-bar">
      <Tools></Tools>
      <Avatar class="avatar"></Avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/layout/header/Breadcrumb.vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import Tools from '@/components/layout/header/Tools.vue'
import Avatar from '@/components/layout/header/Avatar.vue'
import useSettingStore from '@/store/type/settings'
const changeMenuState = () => {
  useSettingStore().changeFoldState()
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  .left-bar {
    display: flex;
    align-items: center;
  }
  .right-bar {
    display: flex;
    align-items: center;
    .avatar {
      margin-left: 10px;
    }
  }
}
</style>
