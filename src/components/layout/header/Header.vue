<template>
  <div class="header">
    <div class="left-bar">
      <el-icon
        style="margin-right: 10px"
        size="20"
        @click="changeMenuState"
        v-if="!isMobile"
      >
        <component :is="useSettingStore().fold ? Fold : Expand"></component>
      </el-icon>
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="right-bar">
      <Tools v-if="!isMobile"></Tools>
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
const changeMenuState = () => {
  useSettingStore().changeFoldState()
}
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value <= 768)

onMounted(() => {
  const updateWidth = () => {
    windowWidth.value = window.innerWidth
    useSettingStore().fold = windowWidth.value <= 768
  }
  window.addEventListener('resize', updateWidth)
  onUnmounted(() => window.removeEventListener('resize', updateWidth))
  // 初始化时根据设备类型设置折叠状态
  useSettingStore().fold = isMobile.value
})
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
