const proposalListComponent = () => import("@/views/proposal/index.vue");
const proposaDetailComponent = () => import("@/views/proposal/proposal-detail.vue");

export const proposalList = {
  path: "/proposal",
  component: proposalListComponent,
  name: "proposalListComponent"
};

export const proposalDetail = {
  path: "/proposal-detail",
  component: proposaDetailComponent,
  name: "proposaDetailComponent"
};
