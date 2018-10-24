const walletComponent = resolve => require(['@/views/more/wallet.vue'], resolve)
const documentComponent = resolve => require(['@/views/more/document.vue'], resolve)



export const walletCom = {
    path:'wallet',
    component:documentComponent,
    name:'documentComponent',
}

export const documentCom = {
    path:'document',
    component:walletComponent,
    name:'walletComponent',
}
