const tokensTransferListComponent = () => import("@/views/tokens/tokens-tranfer.vue");
const tokensListComponent = () => import("@/views/tokens/tokens-list.vue");
const erc20DetailComponent = () => import("@/views/tokens/detail/erc20-detail.vue");
const erc721DetailComponent = () => import("@/views/tokens/detail/erc721-detail.vue");
const erc721IdDetailComponent = () => import("@/views/tokens/detail/erc721id-detail.vue");
const emptyComponent = () => import("@/components/common/empty-router.vue");

export const tokensList = {
  path: "/tokens",
  component: emptyComponent,
  redirect: '/tokens/tokensTranfer',
  children: [
    {
      path: 'tokensTranfer/:type',
      component: tokensTransferListComponent,
      name: "tokensTranfer",
      meta: {
        keepAlive: true
      },
    },
    {
      path: 'tokensList/:type',
      component: tokensListComponent,
      name: "tokensList",
      meta: {
        keepAlive: true
      },
    }

  ]

};

export const tokensDetail = [
  {
    path: "/arc20-detail",
    component: erc20DetailComponent,
    name: "erc20DetailComponent"
  },
  {
    path: "/arc721-detail",
    component: erc721DetailComponent,
    name: "erc721DetailComponent"
  },
  {
    path: "/arc721id-detail",
    component: erc721IdDetailComponent,
    name: "erc721IdDetailComponent"
  },
];
