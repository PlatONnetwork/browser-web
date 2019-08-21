/**
 * Created by 15236 on 2017/10/25.
 */
import { indexAction } from './action'
import { indexGetter } from './getter'
import { indexMutation } from './mutation'

export const index: object = {
    state: {     
        blockData: [
            {
                "number":33,           //区块高度
                "timestamp":33333,     //出块时间
                "serverTime":44444,    //服务器时间
                "nodeId":"",           //出块节点id
                "nodeName":"节点名称",         //出块节点名称
                "statTxQty":333        //交易数
            },
            {
                "number":34,           //区块高度
                "timestamp":33333,     //出块时间
                "serverTime":44444,    //服务器时间
                "nodeId":"",           //出块节点id
                "nodeName":"节点名称",         //出块节点名称
                "statTxQty":333        //交易数
            },
            {
                "number":35,           //区块高度
                "timestamp":33333,     //出块时间
                "serverTime":44444,    //服务器时间
                "nodeId":"",           //出块节点id
                "nodeName":"节点名称",         //出块节点名称
                "statTxQty":333        //交易数
            },
            {
                "number":36,           //区块高度
                "timestamp":33333,     //出块时间
                "serverTime":44444,    //服务器时间
                "nodeId":"",           //出块节点id
                "nodeName":"节点名称",         //出块节点名称
                "statTxQty":333        //交易数
            },
            {
                "number":37,           //区块高度
                "timestamp":33333,     //出块时间
                "serverTime":44444,    //服务器时间
                "nodeId":"",           //出块节点id
                "nodeName":"节点名称",         //出块节点名称
                "statTxQty":333        //交易数
            },
            {
                "number":38,           //区块高度
                "timestamp":33333,     //出块时间
                "serverTime":44444,    //服务器时间
                "nodeId":"",           //出块节点id
                "nodeName":"节点名称",         //出块节点名称
                "statTxQty":333        //交易数
            },
            {
                "number":39,           //区块高度
                "timestamp":33333,     //出块时间
                "serverTime":44444,    //服务器时间
                "nodeId":"",           //出块节点id
                "nodeName":"节点名称",         //出块节点名称
                "statTxQty":333        //交易数
            },
            {
                "number":40,           //区块高度
                "timestamp":33333,     //出块时间
                "serverTime":44444,    //服务器时间
                "nodeId":"",           //出块节点id
                "nodeName":"节点名称",         //出块节点名称
                "statTxQty":333        //交易数
            },
        ],
        chartData: [],
        blockStatisticData:{
            
        },
        ValidatorData: [],
    },
    actions: indexAction,
    getters: indexGetter,
    mutations: indexMutation
}
export default index
