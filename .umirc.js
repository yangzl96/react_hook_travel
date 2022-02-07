import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mock: false, // 关闭mocl,
  proxy: {
    '/api': {
      target: 'http://localhost:7001/',
      changeOrigin: true
    }
  },
  history: {
    type: 'hash'
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: './home/index',
          title: '首页'
        },
        {
          path: '/order',
          component: './order/index',
          title: '订单',
          auth: true
        },
        {
          path: '/user',
          component: './user/index',
          title: '我的',
          auth: true
        },
        {
          path: '/search',
          component: './search/index',
          title: '搜索'
        },
        {
          path: '/observer',
          component: './observer',
        },
        {
          path: '/house',
          component: './house/index',
          title: '房屋详情'
        },
        {
          path: '/user/edit',
          component: './user/edit/index',
          title: '设置用户'
        },
        {
          path: '/login',
          component: './login/index',
          title: '登录'
        },
        {
          path: '/register',
          component: './register/index',
          title: '注册'
        },
      ]
    },
  ],
  fastRefresh: {},
});
