export const indexAction = {
    updateOverviewData({ commit, state }, list: Array<object>) {
        commit('UPDATE_OVERVIEW_DADA', list)
    },
    updateBlockData({ commit, state }, list: Array<object>) {
        commit('UPDATE_BLACK_DADA', list)
    },
    updateTransactionData({ commit, state }, list: Array<object>) {
        commit('UPDATE_TRANSACTION_DADA', list)
    },
    updateSecondFloorData({ commit, state }, data: object) {
        commit('UPDATE_SECOND_FLOOR_DADA', data)
    },
    setChartData({ commit, state }, list) {
        commit('UPDATE_CHART_DADA', list)
    },
    updateChartData({ commit, state }, list) {
        let oldList = state.chartData
        let newList: any = new Float32Array(oldList.length + list.length)
        for (let index = 0; index < newList.length; index++) {
            if (index <= oldList.length) {
                newList[index] = oldList[index]
            } else {
                // debugger
                newList[index] = list[index - oldList.length - 1]
            }
        }
        // console.log('update newList', newList)
        commit('UPDATE_CHART_DADA', newList)
    },
    setEarthData({ commit, state }, list: Array<object>) {
        commit('UPDATE_EARTH_DADA', list)
    },
    updateEarthData({ commit, state }, list: Array<object>) {
        let oldData = state.earthData
        const newData = list.map((item, index) => {
            return oldData[index].concat(item)
        })
        commit('UPDATE_EARTH_DADA', newData)
    },
    updateMapData({ commit, state }, data) {
        let oldMapData = state.mapData
        let newMapData = data.concat(oldMapData)
        commit('UPDATE_MAP_DADA', newMapData)
    },
    setMapData({ commit, state }, data) {
        commit('UPDATE_MAP_DADA', data)
    }

}
