
const tradeListComponent = () => import('@/views/trade/list.vue')
const tradeDetailComponent = () => import('@/views/trade/trade-detail.vue')

export const tradeList = {
    path: '/trade',
    redirect: '/block/trade'
    // component: tradeListComponent,
    // meta: {
    //     keepAlive: true, // 此组件需要被缓存
    // },
    // name: 'tradeListComponent'
}
export const tradeDetail = {
    path: '/trade-detail',
    component: tradeDetailComponent,
    name: 'tradeDetailComponent',
}
