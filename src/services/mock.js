export default {
  proposalList: {
    errMsg: "mock error message", //描述信息
    code: 0, //成功（0），失败则由相关失败码
    totalCount: 18, //总数
    totalPages: 2, //总页数
    data: [
      {
        url: "PIP1", //github地址  https://github.com/ethereum/EIPs/blob/master/EIPS/eip-100.md  PIP编号   eip-100
        proposalHash: "0x1da4b53ae05c28e8ee1679f2681fab24ccdf327f94cb98e29760296a799dc024", //提案内部标识
        title: "Hello Proposal Hello Proposal Hello Proposal Hello Proposal Hello Proposal Hello Proposal", //提案内部标识
        type: "1", //提案类型   1：文本提案； 2：升级提案；  3参数提案。
        status: "1", //状态  1：投票中  2：通过  3：失败   4：预升级  5：升级完成    已通过=2 或4 或 5
        curBlock: "15566", //当前块高
        endVotingBlock: "15567", //投票结算的快高
        newVersion: "v1.1.1", //升级提案升级的版本
        paramName: "hello world", //参数名
        timestamp: 1566197087848 //提案时间
      }
    ]
  },
  proposalDetails: {
    errMsg: "", //描述信息
    code: 0, //成功（0），失败则由相关失败码
    data: {
      proposalHash: "", //提案内部标识
      url: "", //github地址  https://github.com/ethereum/EIPs/blob/master/EIPS/eip-100.md PIP编号   eip-100
      type: "", //提案类型   1：文本提案； 2：升级提案；  3参数提案。
      status: "", //状态  1：投票中  2：通过  3：失败   4：预升级  5：升级完成    已通过=2 或4 或 5
      curBlock: "15566", //当前块高
      endVotingBlock: "", //投票结算的快高
      timestamp: 123123879, //提案时间
      activeBlock: "", //（如果投票通过）生效块高
      newVersion: "", //升级提案升级的版本
      paramName: "", //参数名
      currentValue: "", //参数当前值
      newValue: "", //参数的新值
      nodeName: "", //发起提案的节点名称
      nodeId: "", //发起提案的节点id
      yeas: 11, //同意的人
      nays: 11, //反对的人
      abstentions: 11, //弃权的人
      accuVerifiers: "", //总人数
      activeBlockTime: "", //生效块高预计时间  (activeBlock-curBlock)*period
      endVotingBlockTime: "", //投票块高的时间   (endVotingBlock-curBlock)*period
      supportRateThreshold: "" //通过率
    }
  }
};
