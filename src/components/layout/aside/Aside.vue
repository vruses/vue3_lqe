<template>
  <div class="aside">
    <Logo></Logo>
    <el-scrollbar>
      <Menu></Menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import Menu from './Menu.vue'
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.el-scrollbar {
  height: calc(100vh - 40px);
  padding-top: 10px;
  text-align: center;
  background-color: $asideColor;
}
</style>
