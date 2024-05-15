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

<style scoped>
.el-scrollbar {
  height: calc(100vh - 40px);
  padding-top: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
