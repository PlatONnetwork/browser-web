/**
 * Created by 15236 on 2017/10/25.
 */
import apiService from '@/services/API-services'
import config from '@/config/API-config'
import contractService from '@/services/web3-services'
export const commonAction = {
    initJsonData({ commit, state }, i18n) {
        let locale = i18n.indexOf('zh') !== -1 ? '/zh-cn' : '/en';
        // apiService.get(config.JSON_BASE+locale+"/countryCode.json").then((data)=>{
        //     state.chainList = data.cid;
        // });
        // apiService.get("../../../static/json/mock.json").then((data)=>{
        //     commit('DONE_CHAINLIST',data.chainList)
        //     commit('CHANGE_ID',data.chainList[0].cid)
        //     commit('CHANGE_HTTP', data.chainList[0].http)
        // });
        apiService.get(config.JSON_BASE + "/mock.json").then((data) => {
            commit('DONE_CHAINLIST', data.chainList)
            sessionStorage.getItem('commandId') ? commit('CHANGE_ID', sessionStorage.getItem('commandId')) : commit('CHANGE_ID', data.chainList[0].cid)
            // commit('CHANGE_ID', data.chainList[0].cid)
            localStorage.setItem('cid',data.chainList[0].cid)
            sessionStorage.getItem('commandHttp') ? commit('CHANGE_HTTP', sessionStorage.getItem('commandHttp')) : commit('CHANGE_HTTP', data.chainList[0].http)
        });
        apiService.get(config.JSON_BASE + "/walletConfig.json").then((data) => {
            commit('DONE_WALLETLIST', data.wallList)
            //   this.walletList = data;
            // console.log(walletList[0].icon);
        });
        apiService.get(config.JSON_BASE + "/country.json").then((data) => {
            commit('DONE_COUNTRY', data.countrys)
        });
    },
    updateApiStatus({ commit, state },apiStatus){
        commit('GOOGLE_API', apiStatus)
    }
}