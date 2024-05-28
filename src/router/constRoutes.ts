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
        path: '/lq',
        name: 'lq',
        meta: {
          title: '土地质量评价',
          menu: 'landQuality',
          icon: 'MapLocation',
        },
        children: [
          {
            path: '/lq/map',
            component: () => import('@/views/map/landQuality.vue'),
            name: 'landQualityMap',
            meta: {
              title: '地质图',
              menu: 'landQualityMap',
              icon: 'ZoomIn',
            },
          },
          {
            path: '/lq/editMap',
            component: () => import('@/views/map/edit.vue'),
            name: 'editMap',
            meta: {
              title: '地图编辑',
              menu: 'editMap',
              icon: 'EditPen',
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
