import API from '@/config/API-config'
import store from '@/vuex/store'

class Sub {
    subs = []
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach((sub) => {
            sub()
        })
    }
}
const sub = new Sub()

class Ws {
    stompClient = null
    allUrl = API.TOTAL
    // websocketUrl = API.WS_CONFIG.root
    websocketUrl = API.WS_CONFIG.root
    timeSettimeout = null
    connectFlag = false

    timer = null

    constructor() {
        this.connect()
    }

    connect() {
        // if (this.stompClient) { return }
        let socket = new window['SockJS'](API.WS_CONFIG.root)
        this.stompClient = window['Stomp'].over(socket)
        this.stompClient.heartbeat.outgoing = 10000
        this.stompClient.heartbeat.incoming = 10000
        this.stompClient.connect({}, (frame) => {
            this.connectFlag = true
            //console.log('Connected: ' + frame)
            sub.notify()
        }, (error) => {
            this.errorCallBack(error)
        })
    }

    //由于服务断开导致连接失败，客户端自动连接
    errorCallBack(error) {
        //连接失败时，服务器响应的回调方法
        //console.log('连接失败【' + error + '】')
        //连接失败后重新连接；设置延迟避免请求过多
        clearTimeout(this.timeSettimeout)
        this.timeSettimeout = setTimeout(() => {
            this.stompClient = null
            this.connectFlag = false
            this.connect()
        }, 5000)

    }
    //主动断开连接
    disconnect() {
        // 设置延时器避免页面切换太快，在视图摧毁的生命周期里，连接还没建立，执行disconnect方法无效
        this.timer = setTimeout(() => {
            console.log('connectFlag',this.connectFlag)
            if(this.connectFlag){
                this.stompClient != null && this.stompClient.disconnect();             
                clearTimeout(this.timer);
                this.timer = null;
            }
        }, 1500)    
    }

}

class IndexService extends Ws {
    // chainId = store.state.common.chainId
    blackSubHandle = null
    chartSubHandle = null

    getChainId() {
        return store.state.common.chainId
    }
    static dealData(now = []) {
        if (now.length) {
            if (now.length === 10) {
                return now
            } else {
                if (old.length >= 10) { old.shift() }
                return old.concat(now)
            }
        } else {
            // if (old.length >= 10) { old.shift() }
            return old
        }
    }
    static dealChartList(data) {
        if (!data.length) { return [] }

        let list = []
        let arr = []

        data.map(item => {
            if (item.latitude && item.longitude) {
                arr = [item.longitude, item.latitude]
                list = list.concat(arr)
            }
        })

        let newList = new Float32Array(list.length)
        list.map((item, index) => {
            newList[index] = item
        })
        return newList
    }

    static dealEarthCHartList(data) {
        let list = [[], [], []]
        data.forEach((item) => {
            if (item.netState === 1) {
                //正常 判断是否是共识节点
                item.nodeType === 1 ? list[0].push([item.longitude, item.latitude]) : list[1].push([item.longitude, item.latitude])
            } else if (item.netState === 2) {
                //异常
                list[2].push([item.longitude, item.latitude])
            }
        })
        return list
    }
    getChartData() {
        // sub.addSub(() => {
        //     this.stompClient.subscribe(API.WS_CONFIG.blockStatistic, (msg => {
        //         const res = JSON.parse(msg.body)
        //         const { data, code } = res
        //         console.log(`getChartData`, res)
        //         if (code === 0) {
        //             store.dispatch('updateChartData', data)
        //         } else {
        //             throw new Error(`todo`)
        //         }
        //     })
        // })
        const fn = () => {
            this.chartSubHandle = this.stompClient.subscribe(API.WS_CONFIG.blockStatistic, (msg) => {
                const res = JSON.parse(msg.body)
                const { data, code } = res
                console.log(`getChartData`, res)
                if (code === 0) {
                    if(store.state.index.barIsMove){
                        store.dispatch('updateChartData', data);    
                    }
                } else {
                    throw new Error(`todo`)
                }
            })
        }
        this.connectFlag ? fn() : sub.addSub(fn)
    }

    getStatisticData() {
        sub.addSub(() => {
            this.stompClient.subscribe(API.WS_CONFIG.chainStatistic, (msg) => {
                const res = JSON.parse(msg.body)
                const { data, code } = res
                console.log(`getStatisticData`, data)
                if (code === 0) {
                    //统计数据
                    store.dispatch('updateBlockStatisticData', data)
                    //区块列表数据
                    if (data.blockList[0].isRefresh) {
                        store.dispatch('updateIsMove', true);
                        // 处理ie有时动画消失的问题
                        if(!!window['ActiveXObject'] || 'ActiveXObject' in window || navigator.userAgent.indexOf("Edge") > -1){
                            store.dispatch('updateIsMove2', false);
                            setTimeout(() => {
                                store.dispatch('updateBlockData', data.blockList)  //动画完成后再更新数据
                                store.dispatch('updateIsMove', false);
                            }, 1000)
                        }else{
                            setTimeout(() => {
                                store.dispatch('updateBlockData', data.blockList)  //动画完成后再更新数据
                            }, 1000)
                        }
                    }
                } else {
                    throw new Error(`todo`)
                }
            })
        })
    }

    getValidatorData() {
        sub.addSub(() => {
            this.stompClient.subscribe(API.WS_CONFIG.stakingList, (msg) => {
                const res = JSON.parse(msg.body)
                const { data, code } = res
                // debugger                              
                console.log(`updateValidatorData`, res)
                if (code === 0) {
                    if (!data.isRefresh) {
                        const initData = store.state.index.ValidatorData;
                        initData.dataList.forEach((value, index) => {
                            const obj = data.dataList.filter((val) => {
                                return val.nodeId == value.nodeId;
                            })
                            if (obj.length) {
                                initData.dataList[index] = obj[0];
                            }

                        })
                    } else {
                        store.dispatch('updateValidatorData', data)
                    }

                } else {
                    throw new Error(`todo`)
                }
            })
        })
    }

    // getBlockData() {
    //     const fn = () => {
    //         this.blackSubHandle = this.stompClient.subscribe(API.WS_CONFIG.blockList, (msg => {
    //             const res = JSON.parse(msg.body)
    //             console.log(`updateBlockData`, res)
    //             if (res.code === 0) {
    //                 if (res.data[0].isRefresh) {
    //                     store.dispatch('updateIsMove', true);
    //                     setTimeout(() => {
    //                         store.dispatch('updateBlockData', res.data)  //动画完成后再更新数据
    //                     }, 1000)
    //                 }
    //             } else {
    //                 throw new Error(`todo`)
    //             }

    //         })
    //     }
    //     this.connectFlag ? fn() : sub.addSub(fn)
    // }

    getValidatorStatisticData() {
        sub.addSub(() => {
            this.stompClient.subscribe(API.WS_CONFIG.stakingStatistic, (msg) => {
                const res = JSON.parse(msg.body)
                const { data, code } = res
                console.log(`getValidatorStatisticData`, res)
                if (code === 0) {
                    store.dispatch('updateValidatorStatisticData', data)
                } else {
                    throw new Error(`todo`)
                }
            })
        })
    }

    unsubBlock() {
        this.chartSubHandle.unsubscribe()
    }
}

export default IndexService
