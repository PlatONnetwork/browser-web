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
            node: '------', //出块节点
            currentTransaction: '------', //当前交易笔数
            consensusNodeAmount: '------', //共识节点数
            addressAmount: '------', //地址数
            voteAmount: '------', //投票数
            proportion: '------', //占比
            ticketPrice: '------' //票价
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
                height: 33, //区块高度
                timeStamp: 33333, //出块时间
                serverTime: 44444, //服务器时间
                node: 'node-1', //出块节点
                transaction: 333, //交易数
                blockReward: 333 //区块奖励
            }
        ],
        transactionData: [
            {
                txHash: 'x3222', //交易Hash
                blockHeight: 5555, // 区块高度
                transactionIndex: 33, // 交易在区块中位置
                from: 'ddddd', //交易发起方地址
                to: 'aaaa', //交易接收方地址
                value: 3.6, //数额
                timestamp: 155788 //交易时间
            }
        ],
        chartData: [],
        earthData:[],
        mapData:[]
    },
    actions: indexAction,
    getters: indexGetter,
    mutations: indexMutation
}
export default index
