/**
 * Created by 15236 on 2017/10/25.
 */
export const indexMutation = {
    ['UPDATE_OVERVIEW_DADA'](state, data) {
        state.currentOverViewData = data
    },
    ['UPDATE_BLACK_DADA'](state, data) {
        state.blockData = data
    },
    ['UPDATE_TRANSACTION_DADA'](state, data) {
        state.transactionData = data
    }

}
