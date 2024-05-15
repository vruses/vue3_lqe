<template>
  <router-view v-slot="{ Component }">
    <!--组件过渡-->
    <transition name="fade" mode="in-out">
      <component :is="Component" v-if="isRefresh" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/type/settings'
import { watch, nextTick, ref } from 'vue'
let settingStore = useSettingStore()
let isRefresh = ref(true)
watch(
  //  监听reactive对象所定义的某个属性写法
  () => settingStore.refresh,
  () => {
    isRefresh.value = false
    //保证在组件updated后才将属性改回
    nextTick(() => {
      isRefresh.value = true
    })
  },
)
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.7s ease-out;
}
.fade-leave-active {
  transition: all 0.8s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
