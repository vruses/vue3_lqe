import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 定义全局组件
export default {
  install(app: any) {
    //注册element-plus所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
