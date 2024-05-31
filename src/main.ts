import { createApp } from 'vue'
import App from './App.vue'
import './tailwind.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'vue3-openlayers/styles.css'
import OpenLayersMap from 'vue3-openlayers'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
//引入vue3Openlayer组件库
app.use(OpenLayersMap /*, options */)
// 引入自定义插件：包含了项目全局组件
import globalComponent from '@/components'
// 安装自定义插件
app.use(globalComponent)
// 引入全局样式
import '@/styles/index.scss'
//引入路由
import router from '@/router/index'
app.use(router)
//引入pinia
import pinia from '@/store/index'
app.use(pinia)
app.mount('#app')
