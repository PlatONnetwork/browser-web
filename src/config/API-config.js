//请求地址
const BASE = process.env.API_ROOT,//process.env.API_ROOT, //process.env.API_ROOT"http://10.10.8.232:8888" 'https://scan.platon.network'
    // FILE_BASE = process.env.FILE_ROOT,//process.env.FILE_ROOT,//http://192.168.9.85:8888
    JSON_BASE = process.env.JSON_ROOT,
	TOTAL = `${BASE}/`,
	// FILES_PUBLIC_STORE = process.env.FILESTORE_PUBLIC_ROOT,//'http://192.168.9.86:8081',公有
    // FILES_PRIVITE_STORE = process.env.FILESTORE_PRIVITE_ROOT,//'http://192.168.9.85:8081',私有
	// FILES = `${FILES_STORE}/`,
	// FILES = `${FILES_PUBLIC_STORE}/`,//公有
    // FILES = `${FILES_PRIVITE_STORE}/`,//私有
    BLOCK_URL = `${TOTAL}browser-server/block/`,
    HOME_URL = `${TOTAL}browser-server/home/`,
    // HOME_URL = `http://10.10.8.8:8080/browser-server/home/`,
   	TRADE_URL = `${TOTAL}browser-server/transaction/`,
    ACCOUNT_URL = `${TOTAL}browser-server/account/`,
    NODE_URL = `${TOTAL}browser-server/node/`,
    TICKET_URL = `${TOTAL}browser-server/ticket/`,
    PROPOSAL_URL = `${TOTAL}browser-server/proposal/`,
    //NODE
    NODE = {
        list: `${NODE_URL}list`,
        historyList: `${NODE_URL}historyList`,
        detail: `${NODE_URL}detail`,
        blockList: `${NODE_URL}blockList`,
        blockDownload: `${NODE_URL}blockDownload`
    },
	// BLOCK
	BLOCK = {
        blockList: `${BLOCK_URL}blockList`,
        blockListByNodeId: `${BLOCK_URL}blockListByNodeId`,
		blockDetails: `${BLOCK_URL}blockDetails`,
        blockDetailNavigate: `${BLOCK_URL}blockDetailNavigate`,
        blockTransactionList: `${BLOCK_URL}transactionList`,
        blockTicketList: `${BLOCK_URL}ticketList`,
	},
    // SOUSUO
	SEARCH = {
		query: `${HOME_URL}queryNavigation`,
    },
    // TRADE
	TRADE = {
		transactionList: `${TRADE_URL}transactionList`,
		transactionDetails: `${TRADE_URL}transactionDetails`,
        pendingList: `${TRADE_URL}pendingList`,
        pendingDetails: `${TRADE_URL}pendingDetails`,
        addressDetails: `${TRADE_URL}addressDetails`,
        addressDownload: `${TRADE_URL}addressDownload`,
        contractDetails: `${TRADE_URL}contractDetails`,
        contractDownload: `${TRADE_URL}contractDownload`,
        transactionDetailNavigate:`${TRADE_URL}transactionDetailNavigate`,
        pendingDetailNavigate:`${TRADE_URL}pendingDetailNavigate`,
        blockTransaction:`${TRADE_URL}blockTransaction`,
    },
    PROPOSAL = {
        proposalList: `${PROPOSAL_URL}proposalList`,
        proposalDetails: `${PROPOSAL_URL}proposalDetails`,
        voteList: `${PROPOSAL_URL}voteList`,
    },
    //TICKET
    TICKET = {
		ticketList: `${TICKET_URL}list`,
    },
    // TRADE
    ACCOUNT = {
        accountDetails: `${ACCOUNT_URL}accountDetails`,
        download: `${ACCOUNT_URL}download`,
    },
    WS_CONFIG = {
        root: `${TOTAL}browser-server/platon-websocket`,
        blockStatistic: `/topic/block/statistic/new`,
        chainStatistic: `/topic/chain/statistic/new`,
        blockList: `/topic/block/list/new`,
        stakingList: `/topic/staking/list/new`,
    };
	//文件上传
	// FILE = {
	// 	upload:`${FILE_URL}upload`,
	// };
export default {
  TOTAL,
  BLOCK,
  SEARCH,
  TRADE,
  PROPOSAL,
  ACCOUNT,
  WS_CONFIG,
  JSON_BASE,
  NODE,
  TICKET
};
