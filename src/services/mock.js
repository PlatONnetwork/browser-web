export default {
  proposalList: {
    errMsg: "mock error message", //描述信息
    code: 0, //成功（0），失败则由相关失败码
    totalCount: 21, //总数
    totalPages: 2, //总页数
    data: [
      {
        // url: "PIP1", //github地址  https://github.com/ethereum/EIPs/blob/master/EIPS/eip-100.md  PIP编号   eip-100
        url: "https://github.com/ethereum/EIPs/blob/master/EIPS/eip-100.md",
        proposalHash: "0x1da4b53ae05c28e8ee1679f2681fab24ccdf327f94cb98e29760296a799dc024", //提案内部标识
        topic: "Hello Proposal Hello Proposal Hello Proposal Hello Proposal Hello Proposal Hello Proposal", //提案内部标识
        type: "1", //提案类型   1：文本提案； 2：升级提案；  3参数提案。
        status: "1", //状态  1：投票中  2：通过  3：失败   4：预升级  5：升级完成    已通过=2 或4 或 5
        curBlock: "10000", //当前块高
        endVotingBlock: "15567", //投票结算的快高
        newVersion: "v1.1.1", //升级提案升级的版本
        paramName: "hello world", //参数名
        timestamp: 1566197087, //提案时间
        pipNum: "PIP-2",
      }
    ]
  },
  proposalDetails: {
    errMsg: "", //描述信息
    code: 0, //成功（0），失败则由相关失败码
    data: {
      proposalHash: "0x1da4b53ae05c28e8ee1679f2681fab24ccdf327f94cb98e29760296a799dc024", //提案内部标识
    //   url: "PIP1", //github地址  https://github.com/ethereum/EIPs/blob/master/EIPS/eip-100.md PIP编号   eip-100
      pipNum:"PIP-1",
      topoc: "版本升级-V x.x.x", //提案标题
      description: 'proposal description',
      url: "https://github.com/ethereum/EIPs/blob/master/EIPS/eip-100.md",
      type: "4", //提案类型   1：文本提案； 2：升级提案；  3参数提案; 4.取消提案
      status: "2", //状态  1：投票中  2：通过  3：失败   4：预升级  5：升级完成    已通过=2 或4 或 5
      curBlock: "1556600000", //当前块高
      endVotingBlock: "2324266666", //投票结算的快高
      timestamp: 123123879, //提案时间
      activeBlock: "234230000", //（如果投票通过）生效块高
      newVersion: "v0.7.7", //升级提案升级的版本
      paramName: "world", //参数名
      currentValue: "hello", //参数当前值
      newValue: "love", //参数的新值
      nodeName: "Platon Node 1", //发起提案的节点名称
      nodeId: "0xccaee2c88ae38d83f783cf0bedb8b5e78d1074da3ab9fc44c7942ca7f3388160a556bd28f2c83c32aed42c9e6c5bf81d2b1202bed47e5839a3a562314402c067", //发起提案的节点id
      yeas: 10, //同意的人
      nays: 100, //反对的人
      abstentions: 10, //弃权的人
      accuVerifiers: "1000", //总人数
      activeBlockTime: "2018-09-09 23:04:45", //生效块高预计时间  (activeBlock-curBlock)*period
      endVotingBlockTime: "2018-09-09 23:04:45", //投票块高的时间   (endVotingBlock-curBlock)*period
      supportRateThreshold: "60%" //通过率
    }
  },
  voteList: {
    errMsg: "", //描述信息
    code: 0, //成功（0），失败则由相关失败码
    totalCount: 18, //总数
    totalPages: 1, //总页数
    data: [
      {
        nodeName: "Platon Node 1", //投票验证人的节点名称
        nodeId: "0xccaee2c88ae38d83f783cf0bedb8b5e78d1074da3ab9fc44c7942ca7f3388160a556bd28f2c83c32aed42c9e6c5bf81d2b1202bed47e5839a3a562314402c067", //投票验证人的节点id
        option: "2", //投票选型  1：支持；  2：反对；  3弃权
        txHash: "0x1da4b53ae05c28e8ee1679f2681fab24ccdf327f94cb98e29760296a799dc024", //投票的hash
        timestamp: "2018-09-09 23:04:45" //投票的时间
      }
    ]
  }
};
