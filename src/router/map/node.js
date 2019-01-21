const nodeComponent = resolve => require(['@/views/node/node.vue'], resolve)
const nodeObsoleteComponent = resolve => require(['@/views/node/node-obsolete.vue'], resolve)
const nodeDetailComponent = resolve => require(['@/views/node-detail/node-detail.vue'], resolve)
// export default {
//     path:'/node',
//     component:nodeComponent,
//     name:'node'
// }
export const nodeCom = {
  path: '/node',
  component: nodeComponent,
  name: 'nodeComponent',
}
export const nodeObsoleteCom = {
  path: '/node-obsolete',
  component: nodeObsoleteComponent,
  name: 'nodeObsoleteComponent',
}
export const nodeDetailCom = {
  path: '/node-detail',
  component: nodeDetailComponent,
  name: 'nodeDetailComponent',
}