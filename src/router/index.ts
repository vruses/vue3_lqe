import { createRouter, createWebHistory } from 'vue-router'
import { constRoutes } from '@/router/constRoutes'
import nProgress from 'nprogress'
//关闭加载小圆圈
nProgress.configure({ showSpinner: false })
import 'nprogress/nprogress.css'
import useUserStore from '@/store/type/user'
const router = createRouter({
  history: createWebHistory(),
  routes: constRoutes,
})
router.beforeEach(function (to, from, next) {
  //进度条样式
  nProgress.start()
  //路由鉴权
  if (useUserStore().token) {
    //token过期需要后端业务进行统一处理
    //登录后不能访问login路由
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      next()
    }
  } else {
    //未登录只能访问login路由
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
router.afterEach(function () {
  nProgress.done()
})
export default router
