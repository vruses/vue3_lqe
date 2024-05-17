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
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
    },
  },
  {
    path: '/',
    component: () => import('@/views/Root.vue'),
    name: 'root',
    meta: {
      title: '',
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          menu: 'home',
          icon: 'House',
        },
      },
      {
        path: '/map',
        component: () => import('@/views/map/index.vue'),
        name: 'map',
        meta: {
          title: '地图',
          menu: 'map',
          icon: 'Location',
        },
      },
      {
        path: '/auth',
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
    ],
  },
  {
    //匹配任意字符零次或多次
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
