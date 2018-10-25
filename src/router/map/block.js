/**
 * Created by zjw on 2018/3/16.
 */
const tradeComponent = resolve => require(['@/views/block/trade.vue'], resolve)
const tradePendingComponent = resolve => require(['@/views/block/trade-pending.vue'], resolve)
const blockComponent = resolve => require(['@/views/block/block.vue'], resolve)
const tradeDetailComponent = resolve => require(['@/views/trade-detail/trade-detail.vue'], resolve)
const addressDetailComponent = resolve => require(['@/views/address-detail/address-detail.vue'], resolve)
const contractDetailComponent = resolve => require(['@/views/contract-detail/contract-detail.vue'], resolve)
const blockDetailComponent = resolve => require(['@/views/block-detail/block-detail.vue'], resolve)
export const tradeCom = {
    path:'/trade',
    component:tradeComponent,
    name:'tradeComponent',
}
export const tradePendingCom = {
    path:'/trade-pending',
    component:tradePendingComponent,
    name:'tradePendingComponent',
}
export const blockCom = {
    path:'/block',
    component:blockComponent,
    name:'blockComponent',
}
export const tradeDetailCom = {
    path:'/trade-detail',
    component:tradeDetailComponent,
    name:'blockComponent',
}
export const addressDetailCom = {
    path:'/address-detail',
    component:addressDetailComponent,
    name:'addressDetailComponent',
}
export const contractDetailCom = {
    path:'/contract-detail',
    component:contractDetailComponent,
    name:'contractDetailComponent',
}
export const blockDetailCom = {
    path:'/block-detail',
    component:blockDetailComponent,
    name:'blockDetailComponent',
}