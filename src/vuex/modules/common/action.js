/**
 * Created by 15236 on 2017/10/25.
 */
import apiService from '@/services/API-services'
import config from '@/config/API-config'
export const commonAction = {
    initJsonData ({ commit, state },i18n) {
        let locale = i18n.indexOf('zh') !== -1 ? '/zh-cn' : '/en';
        // apiService.get(config.JSON_BASE+locale+"/countryCode.json").then((data)=>{
        //     state.chainList = data.cid;
        // });
        apiService.get("../../../static/json/mock.json").then((data)=>{
            commit('DONE_CHAINLIST',data.chainList)
            // state.chainList = data.cid;
        });
    },
}