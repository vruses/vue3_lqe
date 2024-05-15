import { defineStore } from 'pinia'
import { getInfo, login } from '@/utils/api/user'

const useUserStore = defineStore('User', {
  //state返回一个对象
  state: () => ({
    token: '',
  }),
  getters: {},
  actions: {
    // 注解返回对象类型
    async userLogin(loginForm) {
      const result = await login(loginForm)
      //保存用户token
      if (result.token != null) {
        this.token = result.token
      }
      return result
    },
    async getUserInfo() {
      return getInfo()
    },
  },
  //本地存储
  persist: {
    key: 'user',
    storage: sessionStorage,
  },
})
export default useUserStore
