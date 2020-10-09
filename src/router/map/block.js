
const blockDetailComponent = () => import('@/views/block/block-detail.vue')
const blockListComponent = () => import('@/views/block/list.vue')
const tradeListComponent = () => import('@/views/trade/list.vue')
const emptyComponent = () => import("@/components/common/empty-router.vue")

export const blockDetail = {
    path: '/block-detail',
    component: blockDetailComponent,
    name: 'blockDetailComponent'
}

export const blockList = {
    path: '/block',
    component: emptyComponent,
    redirect: '/block/index',
    meta: {
        keepAlive: true, // 此组件需要被缓存
    },
    children: [
        {
            path: 'index',
            component: blockListComponent,
            name: 'blockListComponent'
        },
        {
            path: 'trade',
            component: tradeListComponent,
            name: 'tradeListComponent'
        }
    ]
}
