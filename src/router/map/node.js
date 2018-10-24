const nodeComponent = resolve => require(['@/views/node/node.vue'], resolve)

export default {
    path:'/node',
    component:nodeComponent,
    name:'node'
}