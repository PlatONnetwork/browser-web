const tokensListComponent = () => import("@/views/tokens/index.vue");
const tokensDetailComponent = () => import("@/views/tokens/tokens-detail.vue");

export const tokensList = {
    path: "/tokens",
    component: tokensListComponent,
    name: "tokensListComponent"
};

export const tokensDetail = {
    path: "/tokens-detail",
    component: tokensDetailComponent,
    name: "tokensDetailComponent"
};
