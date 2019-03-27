//
//  API-servies.js
//  <project>
//
//  Created by yann_liang on 2017-05-25.
//  Copyright 2017 yann_liang. All rights reserved.
//

import Http from 'axios'
import API from '@/config/API-config'
import store from '@/vuex/store'
Http.defaults.headers.post['Content-Type'] = "application/json;charset=utf-8"
// Http.defaults.headers.post['Accept-Language'] = localStorage.getItem('i18nLocale') ? localStorage.getItem('i18nLocale') : navigator.language.toLowerCase()

console.warn(localStorage.getItem('i18nLocale'))

const encodeParams = (params) => {
    let r = '?',
        p = [];
    for(let key in params) {
        p.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    }
    return r + p.join('&')
};

//请求类
class ApiService {
    constructor() {
	    this.block = {
		    blockList: this.post.bind(this, API.BLOCK.blockList),
		    blockDetails: this.post.bind(this, API.BLOCK.blockDetails),
            blockDetailNavigate: this.post.bind(this, API.BLOCK.blockDetailNavigate),
            blockTransactionList: this.post.bind(this, API.BLOCK.blockTransactionList),
            blockTicketList: this.post.bind(this, API.BLOCK.blockTicketList),
	    }
        this.search = {
	        query: this.post.bind(this, API.SEARCH.query),
        }
        this.trade = {
	        transactionList: this.post.bind(this, API.TRADE.transactionList),
	        transactionDetails: this.post.bind(this, API.TRADE.transactionDetails),
            pendingList: this.post.bind(this, API.TRADE.pendingList),
            pendingDetails: this.post.bind(this, API.TRADE.pendingDetails),
            addressDetails: this.post.bind(this, API.TRADE.addressDetails),
            addressDownload: this.post.bind(this, API.TRADE.addressDownload),
            contractDetails: this.post.bind(this, API.TRADE.contractDetails),
            contractDownload: this.post.bind(this, API.TRADE.contractDownload),
            transactionDetailNavigate: this.post.bind(this, API.TRADE.transactionDetailNavigate),
            pendingDetailNavigate: this.post.bind(this, API.TRADE.pendingDetailNavigate),
            blockTransaction: this.post.bind(this, API.TRADE.blockTransaction),
            voteList: this.post.bind(this, API.TRADE.voteList),
        }
        this.account = {
            accountDetails: this.post.bind(this, API.ACCOUNT.accountDetails),
            download: this.post.bind(this, API.ACCOUNT.download),
        }
        this.node = {
            list: this.post.bind(this, API.NODE.list),
            historyList: this.post.bind(this, API.NODE.historyList),
            detail: this.post.bind(this, API.NODE.detail),
            blockList: this.post.bind(this, API.NODE.blockList),
            blockDownload: this.post.bind(this, API.NODE.blockDownload),
        }
        this.ticket = {
	        ticketList: this.post.bind(this, API.TICKET.ticketList),
        }
        // this.file = {
        //     upload:this.uploadFile.bind(this, API.FILE.upload),//文件上传
        // }
        this.interceptorsOfReq()
        this.interceptorsOfRes()
    }
    get(url, params) {
        if(params) {
            url += encodeParams(params);
        }
        return Http.get(url).then(res => res.data)
    }
    put(url, params) { //
        typeof params === 'undefined' ? params = {} : ''
        return Http.put(url, params).then(res => res.data)
    }
    post(url, params) {
        typeof params === 'undefined' ? params = {} : '';
        localStorage.sessionid ? params.sessionid = localStorage.sessionid : ''
        // params.userID = localStorage.user ? JSON.parse(localStorage.user).userID : ''
        // params.cid =
        // params.cid = sessionStorage.getItem('commandId') ? sessionStorage.getItem('commandId') : store.state.common.chainId
        params.cid = sessionStorage.getItem('commandId') ? store.state.common.chainId : localStorage.getItem('cid')
        return Http.post(url, params).then(res => res.data)
    }
    encodeParams(url,params){
        let r = '?',
        p = [];
        for(let key in params) {
            p.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        }
        return url + r + p.join('&')
    }
    /**
     * 上传文件
     * @param url -上传的url
     * @param fileObject -文件对象
     * @returns {Promise.<TResult>}
     */
    uploadFile(url, params) {
        let formData = new FormData();
        formData.append("file",params.file,params.fileName)
        return Http({
            url:url+"?fileName=" + params.fileName+"&fileSize="+ params.fileSize+"&policy="+params.policy,
            // url:url,
            method:'POST',
            data:formData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((res) => res.data)
    }
    interceptorsOfReq() {
        return Http.interceptors.request.use(
            config => {
                config.headers['Accept-Language'] = localStorage.getItem('i18nLocale') ? localStorage.getItem('i18nLocale') : navigator.language.toLowerCase();
                if(config.url.search('json')!= -1){
                    config.url = config.url.split("//")[0]+'//'+config.url.split("//")[1].split("/")[0]+'/'+config.url.split("/").slice(3).join('/');
                }else{
                    config.url = config.url.split("//")[0]+'//'+config.url.split("//")[1].split("/")[0]+'/'+(sessionStorage.getItem('commandContext') ? sessionStorage.getItem('commandContext'):'')+'/'+config.url.split("/").slice(3).join('/');
                }
                console.log('请求URL== ' + config.url, '\n请求参数==', config.data);
                return config
            },
            err => {
                return Promise.reject(err)
            })
    }
    interceptorsOfRes() {
        Http.interceptors.response.use(function(response) {
            console.log(response.config.url + '的响应数据↓↓↓\n', response.data);
            if(response.data.errorCode == 4) {
                localStorage.removeItem('sessionid')
                localStorage.removeItem('user')
                vueVm.loginPopFlag=true
            }
            return response
        }, function(error) {
            return Promise.reject(error)
        })
    }
}
//导出一个对象
export default new ApiService()
