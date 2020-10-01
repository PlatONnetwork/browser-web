const tokensListComponent = () => import("@/views/tokens/index.vue");
const tokensDetailComponent = () => import("@/views/tokens/tokens-detail.vue");

export const tokensList = {
  path: "/tokens/erc20",
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
