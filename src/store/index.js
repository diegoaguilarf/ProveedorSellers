import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import order from './order.js';
import customer from './customer.js';
import product from './product.js';
import firebase from 'firebase';
import router from '../router';

Vue.use(Vuex);

let userDataProveedor = localStorage.getItem('userDataProveedor');
if (userDataProveedor) {
  userDataProveedor = JSON.parse(userDataProveedor);
} else {
  userDataProveedor = null;
}

export default new Vuex.Store({
  state: {
    userData: userDataProveedor,
    sidebarState: false,
    thereIsABack: null,
    productsData: [],
    orderData: {
      customer: '',
      products: [],
    },
    contapymeAuth: '/1A807880EF/2000',
  },
  mutations: {
    HANDLE_SIDEBAR(state) {
      state.sidebarState = !state.sidebarState;
    },
    ADD_BACK(state, route) {
      state.thereIsABack = route;
    },
    GET_USER(state, user) {
      firebase.database().ref('/sellers').orderByChild('uid').equalTo(user.uid)
        .once('value', (snapshot) => {
          const userData = Object.values(snapshot.val())[0];
          userData.key = Object.keys(snapshot.val())[0];
          localStorage.setItem('userDataProveedor', JSON.stringify(userData));
          state.userData = userData;
        });
    },
    LOGOUT() {
      firebase.auth().signOut().then(() => {
        router.push('/auth/login');
      });
    },
  },
  actions: {
    LOGIN(state, authData) {
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(authData.email, authData.password).then(() => {
          resolve(true)
        }).catch(() => {
          reject(false)
        });
      })
    },
  },
  modules: {
    order,
    customer,
    product,
  },
});
