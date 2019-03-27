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
    BLOCK_URL = `${TOTAL}block/`,
    HOME_URL = `${TOTAL}home/`,
    // HOME_URL = `http://10.10.8.8:8080/browser-server/home/`,
   	TRADE_URL = `${TOTAL}transaction/`,
    ACCOUNT_URL = `${TOTAL}account/`,
    NODE_URL = `${TOTAL}node/`,
    TICKET_URL = `${TOTAL}ticket/`,
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
		blockDetails: `${BLOCK_URL}blockDetails`,
        blockDetailNavigate: `${BLOCK_URL}blockDetailNavigate`,
        blockTransactionList: `${BLOCK_URL}transactionList`,
        blockTicketList: `${BLOCK_URL}ticketList`,
	},
    // SOUSUO
	SEARCH = {
		query: `${HOME_URL}query`,
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
        root: `${TOTAL}platon-websocket`,
        nodeInit: `/app/node/init?cid=`,
        nodeUpdate:`/topic/node/new?cid=`,
        indexInit: `/app/index/init?cid=`,
        indexUpdate: `/topic/index/new?cid=`,
        secondInit: `/app/statistic/init?cid=`,
        secondUpdate: `/topic/statistic/new?cid=`,
        blockInit: `/app/block/init?cid=`,
        blockUpdate: `/topic/block/new?cid=`,
        transactionInit: `/app/transaction/init?cid=`,
        transactionUpdate: `/topic/transaction/new?cid=`
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
    ACCOUNT,
    WS_CONFIG,
    JSON_BASE,
    NODE,
    TICKET
}