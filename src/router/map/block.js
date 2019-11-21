
const blockDetailComponent = () => import('@/views/block/block-detail.vue')
const blockListComponent = () => import('@/views/block/list.vue')

export const blockDetail = {
    path: '/block-detail',
    component: blockDetailComponent,
    name: 'blockDetailComponent'
}

export const blockList = {
    path: '/block',
    component: blockListComponent,
    meta: {
        keepAlive: true, // 此组件需要被缓存
    },
    name: 'blockListComponent'
}
