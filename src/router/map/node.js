
const nodeDetailComponent = () => import('@/views/node/node-detail.vue')
const nodeListComponent = () => import('@/views/node/node-list.vue')
const historyNodeComponent = () => import('@/views/node/history-node.vue')
const zeroNodeComponent = () => import('@/views/node/zero-node.vue')

export const nodeDetail = {
  path: '/node-detail',
  component: nodeDetailComponent,
  name: 'nodeDetailComponent'
}
export const nodeList = {
  path: '/node',
  component: nodeListComponent,
  name: 'nodeListComponent'
}
export const historyNode = {
  path: '/history-node',
  component: historyNodeComponent,
  name: 'historyNodeComponent'
}

export const zeroNode = {
  path: '/zero-node',
  component: zeroNodeComponent,
  name: 'zeroNodeComponent'
}
