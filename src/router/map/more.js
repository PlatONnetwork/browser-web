const walletComponent = resolve => require(['@/views/more/wallet.vue'], resolve)
const documentComponent = resolve => require(['@/views/more/document.vue'], resolve)
export const walletCom = {
    path:'/document',
    component:documentComponent,
    name:'documentComponent',
}
export const documentCom = {
    path:'/wallet',
    component:walletComponent,
    name:'walletComponent',
}
