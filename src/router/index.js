const Home = () => import(/* webpackChunkName: "home-chunk" */'@/pages/home/Home'); // 自定义名字
const About = () => import('@/pages/about/About');
const Page404 = () => import('@/pages/404.vue');
const HomeO = () => import('@/pages/home/HomeO');
const HomeT = () => import('@/pages/home/HomeT');

import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    name: 'Home',
    component: Home,
    path: '/home',
    meta: { // 元数据(可以自由放置数据)

    },

    children: [
      {
        path: 'one', // 加 / 容易出现问题
        component: HomeO
      },

      {
        path: 'two',
        component: HomeT
      }
    ]
  },

  {
    name: 'UseStore',
    path: '/useStore',
    component: () => import('@/pages/useVuex/UseVuex')
  },

  {
    name: 'About', 
    component: About,
    path: '/about/:name/:age/:form'
  },

  {
    name: '404',
    component: Page404,
    path: '/:pathMatch(.*)'
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory() // 必须指定一个模式 createWebHistory | createWebHashHistory
});



// 动态添加路由
setTimeout(() => {
  const category = 'category/Category';

  // 顶级路由添加(第一层路由)
  router.addRoute({
    path: '/category',
    component: () => import('@/pages/' + category)
  })

  // 添加二级路由对象
  router.addRoute('Home', {
    path: 'three',
    component: () => import('@/pages/home/HomeMonent')
  })

}, 1000);



// 导航守卫
router.beforeEach((to, from) => {
  to, from;
  // if (to.path !== "/home/one") {
  //   next({
  //     path: '/home/one'
  //   });
  // }
  // next()




  
})


export default router;


