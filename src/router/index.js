import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import Welcome from '../views/welcome'
import Vip from '../views/vip'
import Supplier from '../views/supplier'
import Goods from '../views/goods'
import Staff from '../views/staff'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    component: Home,
    redirect:'/welcome',
    meta: {
      title: '主页'
    },
    children: [
      {
        path: '/welcome',
        component: Welcome,
        meta: {
          title: '首页'
        },
      },
      {
        path: '/vip',
        component: Vip,
        meta: {
          title: '会员管理'
        }
      },
      {
        path: '/supplier',
        component: Supplier,
        meta: {
          title: '供应商管理'
        }
      },
      {
        path: '/goods',
        component: Goods,
        meta: {
          title: '商品管理'
        }

      },
      {
        path: '/staff',
        component: Staff,
        meta: {
          title: '员工管理管理'
        }
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
