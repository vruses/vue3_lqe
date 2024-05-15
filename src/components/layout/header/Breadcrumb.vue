<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(route, index) in useRoute().matched"
      :key="index"
      :to="route.path"
    >
      {{ route.meta['title'] }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
</script>

<style scoped></style>
