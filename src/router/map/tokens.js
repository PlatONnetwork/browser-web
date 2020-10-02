const tokensListComponent = () => import("@/views/tokens/tokens-erc20.vue");
const tokensDetailComponent = () => import("@/views/tokens/tokens-detail.vue");

// export const tokensList = {
//   path: "/tokens",
//   component: import('@/views/tokens/index.vue'),
//   name: "tokens",
//   children: [{
//     path: "/tokens/erc20",
//     component: tokensListComponent,
//     meta: {
//       keepAlive: true // 此组件需要被缓存
//     },
//     name: "erc20"
//   }]
// }


export const tokensList = {
  path: "/tokens",
  component: tokensListComponent,
  meta: {
    keepAlive: true // 此组件需要被缓存
  },
  name: "tokensListComponent"
};

export const tokensDetail = {
  path: "/tokens-detail",
  component: tokensDetailComponent,
  name: "tokensDetailComponent"
};
