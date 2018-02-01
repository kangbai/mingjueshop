// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import Picker from 'mint-ui/lib/picker';
import 'mint-ui/lib/picker/style.css';
import Swipe from 'mint-ui/lib/swipe';
import 'mint-ui/lib/swipe/style.css';
import SwipeItem from 'mint-ui/lib/swipe-item';
import 'mint-ui/lib/swipe-item/style.css';

Vue.component(Picker.name, Picker);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.config.productionTip = false

import FastClick from 'fastclick';
FastClick.attach(document.body);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App />',
  components: { App }
})
