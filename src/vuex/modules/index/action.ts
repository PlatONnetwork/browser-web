export const indexAction = {
    updateBlockStatisticData({ commit, state }, data: object) {
        commit('UPDATE_STATISTIC_DADA', data)
    },
    updateBlockData({ commit, state }, list: Array<object>) {
        commit('UPDATE_BLACK_DADA', list)
    },
    updateChartData({ commit, state }, list) {
        commit('UPDATE_CHART_DADA', list)
    },
    updateValidatorData({ commit, state }, list) {
        commit('UPDATE_VALIDATOR_DADA', list)
    },
    updateValidatorStatisticData({ commit, state }, list) {
        commit('UPDATE_VALIDATOR_STATIC_DADA', list)
    },
}
