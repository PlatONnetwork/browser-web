const proposalListComponent = () => import("@/views/proposal/index.vue");

export const proposalList = {
  path: "/proposal",
  component: proposalListComponent,
  name: "proposalListComponent"
};
