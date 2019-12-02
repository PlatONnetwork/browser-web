/**
 * Created by 15236 on 2017/10/25.
 */
export const indexMutation = {
    ['UPDATE_STATISTIC_DADA'](state, data) {
        state.blockStatisticData = data
    },
    ['UPDATE_BLACK_DADA'](state, data) {
        state.blockData = data
    },
    ['UPDATE_CHART_DADA'](state, data) {    
        state.chartData = data
    },
    ['UPDATE_VALIDATOR_DADA'](state, data) {
        state.ValidatorData = data
    },
    ['UPDATE_VALIDATOR_STATIC_DADA'](state, data) {
        state.ValidatorStatisticData = data
    },
    ['UPDATE_IS_MOVE'](state, data) {
        state.isMove = data
    },
    ['UPDATE_BAR_IS_MOVE'](state, data) {
        state.barIsMove = data
    },
}
