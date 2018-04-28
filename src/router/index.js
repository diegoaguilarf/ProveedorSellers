import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/Views/Layout';

import Auth from '@/Views/Auth';
import AuthLogin from '@/Views/Auth/Login';

import Order from '@/Views/Layout/Order';
import OrderAll from '@/Views/Layout/Order/All';
import ShowOrder from '@/Views/Layout/Order/Order';
import OrderNew from '@/Views/Layout/Order/New';
import OrderNewCustomer from '@/Views/Layout/Order/New/Customer';
import OrderNewProducts from '@/Views/Layout/Order/New/Products';
import OrderNewSummary from '@/Views/Layout/Order/New/Summary';

// import Product from '@/Views/Layout/Product';
// import Customers from '@/Views/Layout/Customers';

import Setting from '@/Views/Layout/Setting';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '/',
          name: 'Order',
          component: Order,
          children: [
            {
              path: '/',
              name: 'OrderAll',
              component: OrderAll,
            },
            {
              path: '/order',
              name: 'ShowOrder',
              component: ShowOrder,
            },
            {
              path: '/new',
              name: 'OrderNew',
              component: OrderNew,
              children: [
                {
                  path: 'customer',
                  name: 'OrderNewCustomer',
                  component: OrderNewCustomer,
                },
                {
                  path: 'products',
                  name: 'OrderNewProducts',
                  component: OrderNewProducts,
                },
                {
                  path: 'summary',
                  name: 'OrderNewSummary',
                  component: OrderNewSummary,
                },
              ],
            },
          ],
        },
        // {
        //   path: 'product',
        //   name: 'Product',
        //   component: Product,
        // },
        // {
        //   path: 'customers',
        //   name: 'Customers',
        //   component: Customers,
        // },
        {
          path: 'setting',
          name: 'Setting',
          component: Setting,
        },
      ],
    },
    {
      path: '/auth',
      component: Auth,
      children: [
        {
          path: 'login',
          component: AuthLogin,
        },
      ],
    },
  ],
});
