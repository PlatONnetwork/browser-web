export const indexAction = {
  updateBlockStatisticData({ commit, state }, data) {
    commit('UPDATE_STATISTIC_DADA', data);
  },
  updateBlockData({ commit, state }, list) {
    commit('UPDATE_BLACK_DADA', list);
  },
  updateChartData({ commit, state }, list) {
    // list.yb.forEach((value,index)=>{
    //     list.yb[index] = value + 1;
    // })
    commit('UPDATE_CHART_DADA', list);
  },
  updateValidatorData({ commit, state }, list) {
    commit('UPDATE_VALIDATOR_DADA', list);
  },
  updateValidatorStatisticData({ commit, state }, list) {
    commit('UPDATE_VALIDATOR_STATIC_DADA', list);
  },
  updateIsMove({ commit, state }, data) {
    commit('UPDATE_IS_MOVE', data);
  },
  updateIsMove2({ commit, state }, data) {
    commit('UPDATE_IS_MOVE2', data);
  },
  updateBarIsMove({ commit, state }, data) {
    commit('UPDATE_BAR_IS_MOVE', data);
  },
  updateIsAddressDetailsDelegation({ commit, state }, data) {
    commit('UPDATE_IS_ADDRESS_DETAILS_DELEGATION', data);
  },
  updateIsAddressDetailsReward({ commit, state }, data) {
    commit('UPDATE_IS_ADDRESS_DETAILS_REWARD', data);
  },
  updateConfigData({ commit, state }, data) {
    commit('UPDATE_CONFIG_DATA', Object.assign({ switches: [] }, data));
  }
};
