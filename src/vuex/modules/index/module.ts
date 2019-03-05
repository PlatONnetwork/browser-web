/**
 * Created by 15236 on 2017/10/25.
 */
import { indexAction } from './action'
import { indexGetter } from './getter'
import { indexMutation } from './mutation'

export const index: object = {
    state: {
        currentOverViewData: {
            currentHeight: '------', //当前区块高度
            node: '------', //出块节点地址
            nodeName: '------', //出块节点名称
            currentTransaction: '------', //当前交易笔数
            consensusNodeAmount: '------', //共识节点数
            addressAmount: '------', //地址数
            voteAmount: '------', //投票数
            proportion: '0', //占比
            ticketPrice: '------', //票价
            nodeId:''
        },
        secondFloorData: {
            avgTime: 365, //平均出块时长
            current: 333, //当前交易数量
            maxTps: 333, //最大交易TPS
            avgTransaction: 33, //平均区块交易数
            dayTransaction: 33, //过去24小时交易笔数
            blockStatisticList: [
                {
                    height: 333, //区块高度
                    time: 333, //出块的时间
                    transaction: 33 //区块打包数量
                }
            ]//投票数
        },
        blockData: [
            {
                height: 0, //区块高度
                timeStamp: 0, //出块时间
                serverTime: 0, //服务器时间
                node: 'loading', //出块节点
                transaction: 0, //交易数
                blockReward: 0 //区块奖励
            }
        ],
        transactionData: [
            {
                txHash: 'loading', //交易Hash
                blockHeight: 5555, // 区块高度
                transactionIndex: 33, // 交易在区块中位置
                from: 'loading', //交易发起方地址
                to: 'loading', //交易接收方地址
                value: 0, //数额
                timestamp: 155788 //交易时间
            }
        ],
        chartData: [],
        earthData:[],
        mapData:[
            {
               "longitude": "118.1",//经度
               "latitude":"24.46",//纬度
               "nodeType":1,//节点状态：1-共识节点 2-非共识
               "netState":1 ,//节点状态 1 正常 2 异常
               "nodeName":1
            },
            {
               "longitude": "118.1",//经度
               "latitude":"24.46",//纬度
                  "nodeType":1,//节点状态：1-共识节点 2-非共识
               "netState":1 ,//节点状态 1 正常 2 异常
               "nodeName":2
            },
            {
               "longitude": "118.1",//经度
               "latitude":"24.46",//纬度
               "nodeType":1,//节点状态：1-共识节点 2-非共识
               "netState":1 ,//节点状态 1 正常 2 异常
               "nodeName":3
            },
        ]
    },
    actions: indexAction,
    getters: indexGetter,
    mutations: indexMutation
}
export default index
