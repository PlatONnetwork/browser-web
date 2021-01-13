
const tradeListComponent = () => import('@/views/trade/list.vue')
const tradeDetailComponent = () => import('@/views/trade/trade-detail.vue')

export const tradeList = {
    path: '/trade',
    redirect: '/block/trade'
}
export const tradeDetail = {
    path: '/trade-detail',
    component: tradeDetailComponent,
    name: 'tradeDetailComponent',
}
