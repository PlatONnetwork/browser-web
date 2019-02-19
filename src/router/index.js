import Vue from 'vue'
import Router from 'vue-router'
import Index from './map/index'
import {tradeCom,tradeVoteCom,tradeVoteBlockCom,tradePendingCom,blockCom,tradeDetailCom,
    addressDetailCom,contractDetailCom,blockDetailCom,tradeBlock,tradeBlockFilter,tradePendDetailCom} from './map/block'
import {nodeCom, nodeDetailCom, nodeObsoleteCom,nodeObsoleteDetailCom} from './map/node'
import {walletCom,documentCom} from './map/more'
import DownLoad from './map/download'
import Redirect from './map/Redirect'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        Index,//主页
        tradeCom,
        tradeVoteCom,
        tradeVoteBlockCom,
        tradePendingCom,
        blockCom,
        tradeDetailCom,
        addressDetailCom,
        contractDetailCom,
        blockDetailCom,
        tradeBlock,
        tradeBlockFilter,
        tradePendDetailCom,
        nodeCom,
        nodeObsoleteCom,
        nodeDetailCom,
        nodeObsoleteDetailCom,
        walletCom,
        documentCom,
        DownLoad,
        Redirect, //路由重定向(访问不存在的页面时，重定向到这个页面) 放最后面
    ]
})
