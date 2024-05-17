import { defineStore } from 'pinia'

const useSettingStore = defineStore('Settings', {
  state: () => ({
    //决定header左侧icon是否fold，aside是否fold，menu是否collapse，logo文字是否显示
    fold: false,
    //监听到refresh改变，main区重新渲染，顺便实现刷新按钮旋转效果
    refresh: true,
  }),
  actions: {
    changeFoldState(): boolean {
      this.fold = !this.fold
      return this.fold
    },
  },
})
export default useSettingStore
