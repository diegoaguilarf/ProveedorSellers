// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
// import VueTouch from 'vue-touch';
import firebase from 'firebase';
// import VueFire from 'vuefire';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueFuse from 'vue-fuse';

// Vue.use(VueTouch, { name: 'v-touch' });
// Vue.use(VueFire)
Vue.use(elementUI);
Vue.use(VueFuse);

const config = {
  apiKey: 'AIzaSyBrfDJULgypOCXTD-wEG1XPs9tC7VyfjRI',
  authDomain: 'el-proveedor.firebaseapp.com',
  databaseURL: 'https://el-proveedor.firebaseio.com',
  projectId: 'el-proveedor',
  storageBucket: 'el-proveedor.appspot.com',
  messagingSenderId: '757039733134',
};
firebase.initializeApp(config);
Vue.prototype.$firebase = firebase;

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/auth/login');
  else if (!requiresAuth && currentUser) next('/customers');
  else next();
});

let app;

Vue.config.productionTip = false;

/* eslint-disable no-new */
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      el: '#app',
      components: { App },
      template: '<App/>',
      router,
      store,
    });
  }

  if (user) {
    store.commit('GET_USER', user);
  }
});
