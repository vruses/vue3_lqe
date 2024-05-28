<template>
  <div>
    <img src="../../../../public/vite.svg" alt="logo" />
    <span v-if="!useSettingStore().fold">土地质量评价系统</span>
  </div>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/type/settings'
</script>

<style scoped lang="scss">
@import '@/styles/variable.scss';
div {
  font-size: large;
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  //background: var(--el-color-primary-light-9);
  //color: var(--el-color-primary);
  background-color: $asideColor;
  span {
    white-space: nowrap;
  }
}
</style>
