import Vue from 'vue';
import IView from 'iview';
import VueRouter from 'vue-router';
// import {WOW} from 'wowjs';
// import 'animate.css';
import 'iview/dist/styles/iview.css';
import axios from 'axios';

// new WOW({live:false}).init();
Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.use(IView);

import Util from './libs/util';
import Routers from './route'
import MainView from './main.vue'

const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    IView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    IView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#wrapper',
    router:router,
    components:{MainView},
    render:h=>h('main-view')
});

