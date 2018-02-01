import Vue from 'vue';
import Router from 'vue-router';
// import { getLogined } from '@/util/storage';
import { requestUserInfo } from '@/api';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/pages/home'], resolve),
      // beforeEnter: (to, from, next) => {
      //   // const isLogined = getLogined();
      //   requestUserInfo()
      //     .then(r => {
      //       const res = r.data;
      //       console.log('.....', res);
      //       if (r.data.code == 0) {
      //         next();
      //       } else if (res.code == 2) {
      //         next('/login');
      //       }
      //     })
      // },
      children: [
        {
          path: '',
          redirect: '/mingjue'
        },
        {
          path: '/coin',
          component: resolve => require(['@/pages/shopcoin'], resolve)
        },
        {
          path: '/mingjue',
          component: resolve => require(['@/pages/shopmingjue'], resolve)
        },
        {
          path: '/charge',
          component: resolve => require(['@/pages/charge'], resolve)
        },
        {
          path: '/profile',
          component: resolve => require(['@/pages/profile'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['@/pages/login'], resolve)
    },
    {
      path: '/register',
      component: resolve => require(['@/pages/register'], resolve)
    },
    {
      path: '/qrcode',
      component: resolve => require(['@/pages/qrcode'], resolve)
    },
    {
      path: '/bill',
      component: resolve => require(['@/pages/bill'], resolve)
    },
    {
      path: '/order',
      component: resolve => require(['@/pages/order'], resolve)
    },
    {
      path: '/alipay',
      component: resolve => require(['@/pages/alipay/'], resolve)
    },
    {
      path: '/fans',
      component: resolve => require(['@/pages/fans'], resolve)
    },
    {
      path: '/diamondlist',
      component: resolve => require(['@/pages/diamondlist'], resolve)
    },
    {
      path: '/diamond/:phone',
      component: resolve => require(['@/pages/diamond'], resolve)
    },
    {
      path: '/about',
      component: resolve => require(['@/pages/about'], resolve)
    },
    {
      path: '/logistics/:orderId',
      component: resolve => require(['@/pages/logistics'], resolve)
    },
    {
      path: '/product/:productId',
      component: resolve => require(['@/pages/product'], resolve)
    },
    {
      path: '/settlement',
      component: resolve => require(['@/pages/settlement'], resolve)
    },
    {
      path: '/privacy',
      component: resolve => require(['@/pages/privacy'], resolve)
    },
    {
      path: '/delegate',
      component: resolve => require(['@/pages/delegate'], resolve)
    },
    {
      path: '/myqr',
      component: resolve => require(['@/pages/myqr'], resolve)
    },
    {
      path: '/forgetPWD',
      component: resolve => require(['@/pages/forgetPWD'], resolve)
    }
  ]
})
