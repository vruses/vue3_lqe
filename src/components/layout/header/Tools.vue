<template>
  <el-button circle @click="refreshMainPage">
    <el-icon
      :class="{
        //实现icon旋转
        recover_roll: useSettingStore().refresh,
        roll: !useSettingStore().refresh,
      }"
    >
      <Refresh></Refresh>
    </el-icon>
  </el-button>
  <el-button circle @click="fullScreen">
    <el-icon>
      <FullScreen></FullScreen>
    </el-icon>
  </el-button>
  <el-button circle>
    <el-icon>
      <Setting></Setting>
    </el-icon>
  </el-button>
</template>

<script setup lang="ts">
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
import useSettingStore from '@/store/type/settings'
function refreshMainPage() {
  useSettingStore().refresh = !useSettingStore().refresh
}
function fullScreen() {
  if (!document.fullscreenElement) {
    //全屏
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}
</script>

<style scoped lang="scss">
.roll {
  transform: rotate(360deg);
  transition: transform 0.5s ease;
}
.recover_roll {
  animation-name: rotating;
  animation-duration: 0.5s;
}
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
