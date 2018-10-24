import Vue from 'vue'
import Router from 'vue-router'
import Index from './modules/index'
import {tradeCom,tradePendingCom,blockCom} from './modules/block'
import Node from './modules/node'
import {walletCom,documentCom} from './modules/more'
import Redirect from './modules/Redirect'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        Index,//主页
        tradeCom,
        tradePendingCom,
        blockCom,
        Node,
        walletCom,
        documentCom,
        Redirect, //路由重定向(访问不存在的页面时，重定向到这个页面) 放最后面
    ]
})
