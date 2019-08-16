
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
    name: 'blockListComponent'
}
