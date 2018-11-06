import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
export default {
    menu: { // 菜单
        home: '首页',
        blockChain: '区块链',
        blockChainItem:{
            viewTxns: '查看交易',
            viewPendingTxns: '查看待处理交易',
            viewBlocks: '查看区块'
        },
        node: '节点',
        more: '更多',
        moreItem: {
            wallet: '钱包',
            help: '开发帮助'
        }
    },
    search: {
        searchBtn: '查询',
        placeHolder: ' 请输入区块高度/地址/块哈希/交易哈希'
    },
    breadcrumb: {
        walletWatermark: '钱包',
        home: '首页',
        wallet: '钱包'
    },
    footer: {
        desc: 'XXXX是PlatON区块链资源管理与分析平台',
        links: '链接',
        help: '开发帮助',
        wallet: '钱包',
        officialWebsite: 'PlatON官网',
        whitePaper: '白皮书',
        community: '社区'
    },
    wallet: {
        officeWallet: '官方钱包',
        download: '下载链接',
        developer: '开发者网站',
        thirdPartyWallet: '第三方钱包',
        nothirdPartyWallet: '无第三方钱包，请点击',
        submitBtn: '提交'
    },
    tradeAbout:{
        morethen:'总共寻获超过',
        transactions:'交易',
        record:'显示最新500k记录',
        hash:'交易哈希值',
        block:'区块',
        age:'块龄',
        from:'发送方',
        to:'接收方',
        value:'数额',
        fee:'交易费用',
        create:'合约创建',
        contract:'合约',
        before:'前',
        txInfo:'交易信息',
        viewLeft:'查看前一个交易',
        viewRight:'查看后一个交易',
        information:'Transaction Information',
        timestamp:'时间戳',
        txHash:'交易hash',
        txReceiptStatus:'状态',
        actualTxCost:'交易费用',
        energonLimit:'能量限制',
        energonUsed:'消耗的能量',
        energonPrice:'能量价格',
        blockHeight:'区块',
        inputData:'发出数据',
        confirmNum:'区块确认'
    },
    // tradePendingAbout: {
    //     morethen: '总共寻获超过',
    //     transactions: '交易',
    //     record: '显示最新500k记录',
    //     hash: '交易哈希值',
    //     block: '区块',
    //     age: '块龄',
    //     from: '发送方',
    //     to: '接收方',
    //     value: '数额',
    //     fee: '交易费用',
    //     create: '合约创建',
    //     contract: '合约',
    //     before: '前',
    //     txInfo: '交易信息',
    //     viewLeft: '查看前一个交易',
    //     viewRight: '查看后一个交易',
    //     information: 'Transaction Information',
    //     timestamp: '时间戳',
    //     txHash: '交易hash',
    //     txReceiptStatus: '状态',
    //     actualTxCost: '交易费用',
    //     energonLimit: '能量限制',
    //     energonUsed: '消耗的能量',
    //     energonPrice: '能量价格',
    //     blockHeight: '区块',
    //     inputData: '发出数据',
    //     confirmNum: '区块确认'
    // }
    ...zhLocale
}
