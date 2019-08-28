/**
 * Created by 15236 on 2017/10/25.
 */
import { indexAction } from './action'
import { indexGetter } from './getter'
import { indexMutation } from './mutation'

export const index: object = {
    state: {     
        blockData: [
        ],
        chartData: [],
        blockStatisticData:{
            "currentNumber":0,      //当前区块高度
            "nodeId":"",            //出块节点id
            "nodeName":"",            //出块节点名称
            "txQty":"0",               //总的交易数
            "currentTps":0,         //当前的TPS
            "maxTps":0,             //最大交易TPS
            "turnValue":"",           //当前流通量
            "issueValue":"",          //当前发行量
            "stakingDelegationValue":"",  //当前质押总数=有效的质押+委托
            "addressQty":"",          //地址数
            "proposalQty":"",         //总提案数
            "doingProposalQty":""     //进行中提案数
            
        },
        isMove:false,  //控制首页区块动画
        ValidatorData: {
            "isRefresh":true,    //false不用全量刷新、true全量刷新
            "dataList":[
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称1",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称2",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称3",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称4",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称5",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称6",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称7",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称8",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称9",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称10",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称11",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称12",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称13",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称14",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称15",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称16",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称17",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称18",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称19",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称20",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称21",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称22",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称23",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称24",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                {
                    "nodeId":"出块节点Id",           //出块节点Id
                    "nodeName":"出块节点名称25",         //出块节点名称
                    "stakingIcon":"",      //验证人图片
                    "ranking":333,         //节点排行
                    "expectedIncome":"12",   //预计年收化率（从验证人加入时刻开始计算）
                    "isInit":true          //是否为初始化的验证人，如果是expectedIncome不显示数值
                },
                
            ]
        },
        ValidatorStatisticData: {
            "stakingDelegationValue":"", //质押委托总数
            "stakingValue":"",        //质押总数
            "issueValue":"",          //发行量
            "blockReward":"",         //当前的出块奖励
            "stakingReward":"",       //当前的质押奖励
            "currentNumber":0,      //当前区块高度
            "addIssueBegin":0,      //当前增发周期的开始快高
            "addIssueEnd":0,        //当前增发周期的结束块高
            "nextSetting":0 
        },
    },
    actions: indexAction,
    getters: indexGetter,
    mutations: indexMutation
}
export default index
