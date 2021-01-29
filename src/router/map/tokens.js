const tokensTransferListComponent = () => import("@/views/tokens/tokens-tranfer.vue");
const tokensListComponent = () => import("@/views/tokens/tokens-list.vue");
const tokenDetailComponent = () => import("@/views/tokens/detail/index.vue");
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
    path: "/tokens-detail",
    component: tokenDetailComponent,
    name: "tokenDetailComponent"
  }
];
