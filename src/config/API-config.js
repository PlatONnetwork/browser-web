//请求地址
const BASE = process.env.VUE_APP_API_ROOT,
  JSON_BASE = process.env.VUE_APP_JSON_ROOT,
  TOTAL = `${BASE}`,
  // FILES_PUBLIC_STORE = process.env.FILESTORE_PUBLIC_ROOT,//'http://192.168.9.86:8081',公有
  // FILES_PRIVITE_STORE = process.env.FILESTORE_PRIVITE_ROOT,//'http://192.168.9.85:8081',私有
  // FILES = `${FILES_STORE}`,
  // FILES = `${FILES_PUBLIC_STORE}`,//公有
  // FILES = `${FILES_PRIVITE_STORE}`,//私有
  BLOCK_URL = `${TOTAL}/block`,
  HOME_URL = `${TOTAL}/home`,
  // HOME_URL = `http://10.10.8.8:8080/home/`,
  TRADE_URL = `${TOTAL}/transaction`,
  INNERTRANSFER_URL = `${TOTAL}/internalTransfer`,
  ACCOUNT_URL = `${TOTAL}/address`,
  NODE_URL = `${TOTAL}/staking`,
  TICKET_URL = `${TOTAL}/ticket`,
  PROPOSAL_URL = `${TOTAL}/proposal`,
  MORE_URL = `${TOTAL}/extra`,
  TOKEN_URL = `${TOTAL}/token`,
  //NODE
  NODE = {
    aliveStakingList: `${NODE_URL}/aliveStakingList`,
    historyStakingList: `${NODE_URL}/historyStakingList`,
    lockedStakingList: `${NODE_URL}/lockedStakingList`,
    detail: `${NODE_URL}/stakingDetails`,
    stakingOptRecordList: `${NODE_URL}/stakingOptRecordList`,
    delegationListByStaking: `${NODE_URL}/delegationListByStaking`,
    delegationListByAddress: `${NODE_URL}/delegationListByAddress`,
    statistic: `${NODE_URL}/statistic`,
    queryClaimByStaking: `${TRADE_URL}/queryClaimByStaking`
  },
  // BLOCK
  BLOCK = {
    blockList: `${BLOCK_URL}/blockList`,
    blockListByNodeId: `${BLOCK_URL}/blockListByNodeId`,
    blockDetails: `${BLOCK_URL}/blockDetails`,
    blockListByNodeIdDownload: `${BLOCK_URL}/blockListByNodeIdDownload`,
    blockDetailNavigate: `${BLOCK_URL}/blockDetailNavigate`
  },
  // SOUSUO
  SEARCH = {
    query: `${HOME_URL}/queryNavigation`,
    stakingOnIndex: `${HOME_URL}/stakingList`,
    blockOnIndex: `${HOME_URL}/blockList`,
    blockStatistic: `${HOME_URL}/blockStatistic`,
    chainStatistic: `${HOME_URL}/chainStatistic`
  },
  // TRADE
  TRADE = {
    transactionList: `${TRADE_URL}/transactionList`,
    transactionListByBlock: `${TRADE_URL}/transactionListByBlock`,
    transactionListByAddress: `${TRADE_URL}/transactionListByAddress`,
    addressTransactionDownload: `${TRADE_URL}/addressTransactionDownload`,
    transactionDetails: `${TRADE_URL}/transactionDetails`,
    transactionDetailNavigate: `${TRADE_URL}/transactionDetailNavigate`,
    queryClaimByAddress: `${TRADE_URL}/queryClaimByAddress`
  },
  INNERTRANSFER = {
    listByOwnerAddress: `${INNERTRANSFER_URL}/listByOwnerAddress`
  },
  PROPOSAL = {
    proposalList: `${PROPOSAL_URL}/proposalList`,
    proposalDetails: `${PROPOSAL_URL}/proposalDetails`,
    voteList: `${PROPOSAL_URL}/voteList`
  },
  // TRADE
  ACCOUNT = {
    details: `${ACCOUNT_URL}/details`,
    rpplanDetail: `${ACCOUNT_URL}/rpplanDetail`
  },
  WS_CONFIG = {
    root: `${TOTAL}/platon-websocket`,
    blockStatistic: `/topic/block/statistic/new`,
    chainStatistic: `/topic/chain/statistic/new`,
    blockList: `/topic/block/list/new`,
    stakingList: `/topic/staking/list/new`,

    stakingStatistic: `/topic/staking/statistic/new`,
    stakingChange: `/topic/staking/change/new`,

    serverWebsocket: `${TOTAL}/websocket/`
  },
  TOKEN = {
    tokenDetail: `${TOKEN_URL}/detail`,
    tokenList: `${TOKEN_URL}/list`,
    token20TxList: `${TOKEN_URL}/arc20-tx/list`,
    token721TxList: `${TOKEN_URL}/arc721-tx/list`,
    token721InventoryList: `${TOKEN_URL}/arc721-inventory/list`,
    token721InventoryDetail: `${TOKEN_URL}/arc721-inventory/detail`,
    token1155TxList: `${TOKEN_URL}/arc1155-tx/list`,
    token1155InventoryList: `${TOKEN_URL}/arc1155-inventory/list`,
    token1155InventoryDetail: `${TOKEN_URL}/arc1155-inventory/detail`,
    // =================================================================
    tokenTransferList: `${TOKEN_URL}/tokenTransferList`,
    // 持有者列表
    // tokenHolderList: `${TOKEN_URL}/tokenHolderList`,
    tokenHolderList: `${TOKEN_URL}/holder/list`,
    //余额列表
    // tokenBalanceList: `${TOKEN_URL}/holderTokenList`,
    tokenBalanceList: `${TOKEN_URL}/holder-token/list`,
    //持有人列表
    // exportTokenHolderList: `${TOKEN_URL}/exportTokenHolderList`,
    exportTokenHolderList: `${TOKEN_URL}/holder/export`,
    //持有人包含列表列表
    // exportHolderTokenList: `${TOKEN_URL}/exportHolderTokenList`,
    exportHolderTokenList: `${TOKEN_URL}/holder-token/export`,
    //导出合约内部列表
    exportTokenTransferList: `${TOKEN_URL}/exportTokenTransferList`,
    exportT20TxList: `${TOKEN_URL}/arc20-tx/export`,
    exportT721TxList: `${TOKEN_URL}/arc721-tx/export`,
    exportT1155TxList: `${TOKEN_URL}/arc1155-tx/export`,
  },
  MORE = {
    queryConfig: `${MORE_URL}/queryConfig`,
    globalConfig: `${TOTAL}/config.json`,
    queryFundAddress: `${TOTAL}/internalAddress/list`,
  };
export default {
  TOTAL,
  BLOCK,
  SEARCH,
  TRADE,
  INNERTRANSFER,
  PROPOSAL,
  ACCOUNT,
  WS_CONFIG,
  JSON_BASE,
  NODE,
  BASE,
  MORE,
  TOKEN
};
