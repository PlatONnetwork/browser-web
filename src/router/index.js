import Vue from 'vue'
import Router from 'vue-router'
import Index from './map/index'
import DownLoad from './map/download'
import Redirect from './map/Redirect'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        Index,//主页
        DownLoad,
        Redirect, //路由重定向(访问不存在的页面时，重定向到这个页面) 放最后面
    ]
})
