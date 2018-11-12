/**
 * Created by 15236 on 2017/10/25.
 */
import apiService from '@/services/API-services'
import config from '@/config/API-config'
export const indexAction = {
    updateOverviewData({ commit, state }, list) {
        commit('UPDATE_OVERVIEW_DADA', list)
    },
    updateBlockData({ commit, state }, list) {
        commit('UPDATE_BLACK_DADA',list)
    },
    updateTransactionData({ commit, state }, list) {
        commit('UPDATE_TRANSACTION_DADA', list)
    },
    updateSecondFloorData({ commit, state }, list) {
        commit('UPDATE_SECOND_FLOOR_DADA', list)
    }

}
