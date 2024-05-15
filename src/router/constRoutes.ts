export const constRoutes = [
  //  所有一级路由都指向Root组件
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
    },
  },
  {
    path: '/home',
    component: () => import('@/views/Root.vue'),
    name: 'home',
    meta: {
      title: '首页',
      menu: 'home',
      icon: 'House',
    },
  },
  {
    path: '/auth',
    component: () => import('@/views/Root.vue'),
    name: 'auth',
    meta: {
      title: '权限管理',
      menu: 'auth',
      icon: 'Lock',
    },
    children: [
      {
        path: '/auth/ack',
        component: () => import('@/views/userAuth/User.vue'),
        name: 'userAuth',
        meta: {
          title: '用户权限',
          menu: 'ack',
          icon: 'User',
        },
      },
    ],
  },
  {
    path: '/',
    name: 'root',
    redirect: '/home',
    meta: {
      title: 'root',
    },
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
    },
  },
  {
    //匹配任意字符零次或多次
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
