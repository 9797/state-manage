import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Edit from './views/Edit.vue'
// import About from './views/About.vue'
import SysDetail from './views/SysDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: About
    // },
    {
      path: '/sysdetail',
      name: 'SysDetail',
      component: SysDetail
    }
  ]
})
