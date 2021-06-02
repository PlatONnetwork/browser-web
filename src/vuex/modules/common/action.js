/**
 * Created by 15236 on 2017/10/25.
 */
import apiService from '@/services/API-services';
import config from '@/config/API-config';
import Http from 'axios';
// console.log('Http>>>>>>',Http)
export const commonAction = {
  initJsonData({ commit, state }, i18n) {
    let locale = i18n.indexOf('zh') !== -1 ? '/zh-cn' : '/en';
    // apiService.get(config.JSON_BASE +'/config'+ "/mock.json").then((data) => {
    //     // commit('DONE_CHAINLIST', data.chainList)
    //     // sessionStorage.setItem('chainList',JSON.stringify(data.chainList));
    //     localStorage.setItem('cid',data.chainList[0].cid)
    //     if(sessionStorage.getItem('chainList')){
    //         commit('DONE_CHAINLIST', JSON.parse(sessionStorage.getItem('chainList')));
    //     }else{
    //         sessionStorage.setItem('chainList',JSON.stringify(data.chainList));
    //         commit('DONE_CHAINLIST', data.chainList);
    //     }
    //     if(sessionStorage.getItem('commandId')){
    //         commit('CHANGE_ID', sessionStorage.getItem('commandId'));
    //     }else{
    //         sessionStorage.setItem('commandId',data.chainList[0].cid);
    //         commit('CHANGE_ID', data.chainList[0].cid);
    //     }
    //     if(sessionStorage.getItem('commandHttp')){
    //         commit('CHANGE_HTTP', sessionStorage.getItem('commandHttp'));
    //     }else{
    //         sessionStorage.setItem('commandHttp',data.chainList[0].http);
    //         commit('CHANGE_HTTP', data.chainList[0].http)
    //     }
    //     if(sessionStorage.getItem('commandContext')){
    //         commit('CHANGE_CONTEXT', sessionStorage.getItem('commandContext'))
    //     }else{
    //         sessionStorage.setItem('commandContext',data.chainList[0].context);
    //         commit('CHANGE_CONTEXT', data.chainList[0].context);
    //     }
    // });

    // apiService.get(config.JSON_BASE  +'/config' + "/country.json").then((data) => {
    //     commit('DONE_COUNTRY', data.countrys)
    // });
  },
  updateApiStatus({ commit, state }, apiStatus) {
    commit('GOOGLE_API', apiStatus);
  }
};
