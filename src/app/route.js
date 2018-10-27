const router = [
    { path: '/', redirect: '/index'},
    { path: '/index', component: (resolve) => require(['./pages/index.vue'], resolve), name:'index', meta:{title:'首页'}},
    { path: '/common', component: (resolve) => require(['./pages/common.vue'], resolve), name:'common', meta:{title:'常用密码'}},
    { path: '/readme', component: (resolve) => require(['./pages/readme.vue'], resolve), name:'readme', meta:{title:'说明'}},
    { path: '/*', component:(resolve) => require(['./pages/404.vue'], resolve), name:'not found', meta:{title:'未知'}}
];

export default router;