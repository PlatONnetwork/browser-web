/**
 * Created by 15236 on 2017/10/25.
 */
import { indexAction } from './action';
import { indexGetter } from './getter';
import { indexMutation } from './mutation';

export const index = {
  state: {
    blockData: [],
    chartData: {},
    blockStatisticData: {
      currentNumber: 0, //当前区块高度
      nodeId: '', //出块节点id
      nodeName: '', //出块节点名称
      txQty: '0', //总的交易数
      currentTps: 0, //当前的TPS
      maxTps: 0, //最大交易TPS
      turnValue: '', //当前流通量
      issueValue: '', //当前发行量
      stakingDelegationValue: '', //当前质押总数=有效的质押+委托
      addressQty: '', //地址数
      proposalQty: '', //总提案数
      doingProposalQty: '' //进行中提案数
    },
    isMove: false, //控制首页区块动画
    isMove2: false, //控制首页区块动画
    barIsMove: true, //控制图表动画
    ValidatorData: {
      isRefresh: true, //false不用全量刷新、true全量刷新
      dataList: []
    },
    ValidatorStatisticData: {
      stakingDelegationValue: '', //质押委托总数
      stakingValue: '', //质押总数
      issueValue: '', //发行量
      blockReward: '', //当前的出块奖励
      stakingReward: '', //当前的质押奖励
      currentNumber: 0, //当前区块高度
      addIssueBegin: 0, //当前增发周期的开始快高
      addIssueEnd: 0, //当前增发周期的结束块高
      nextSetting: 0
    },
    isAddressDetailsDelegation: false,
    isAddressDetailsReward: false,
    configData: {}
  },
  actions: indexAction,
  getters: indexGetter,
  mutations: indexMutation
};
export default index;
