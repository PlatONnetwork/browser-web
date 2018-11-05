import enLocale from 'element-ui/lib/locale/lang/en'
export default {
    menu: { // 菜单
        home:'Home',
        blockChain: 'BlockChain',
        blockChainItem:{
                viewTxns: 'ViewTxns',
                viewPendingTxns: 'View Pending Txns',
                viewBlocks: 'View Blocks'
            },
        node: 'Node',
        more: 'More',
        moreItem: {
            wallet: 'Wallet',
            help: 'Help'
        }
    },
    search: {
        searchBtn: 'Search',
        placeHolder: 'Search by block height /Address/Block hash/Txhash'
    },
    breadcrumb: {
        walletWatermark: 'Wallet',
        home: 'Home',
        wallet: 'Wallet'
    },
    footer: {
        desc: 'XXXX is a Block Explorer and Analytics Platform for PlatON',
        links: 'Links',
        help: 'Help',
        wallet: 'Wallet',
        officialWebsite: 'PlatON Official Website',
        whitePaper: 'White Paper',
        community: 'Community'
    },
    wallet: {
        officeWallet: 'Office Wallet',
        firstWallet: {
            title: 'xxxE',
            summary: 'XXXX is a completely decentralized lightweight node mobile wallet client.The PlatON blockchain address can be created through XXX and the digital assets of the PlatON blockchain can be managed and stored securely.'
        },
        secondWallet: {
            title: 'Edge',
            summary: 'Edge is a completely decentralized, full-node desktop client.In addition to supporting basic wallet creation and management, it also provides node services and functions such as management and voting.'
        },
        thirdWallet: {
            title: 'xxxE',
            summary: 'XXXX is a completely decentralized lightweight node mobile wallet client.The PlatON blockchain address can be created through XXX and the digital assets of the PlatON blockchain can be managed and stored securely.'
        },
        download: 'Download',
        developer: 'Developer',
        thirdPartyWallet: 'Third-PartyWallet',
        nothirdPartyWallet: 'No third-Party Wallet,click',
        submitBtn: 'Submit'
    },
    tradeAbout: {
        morethen: 'More Than',
        transactions: 'Transactions',
        record: 'Showing The Last 500k Records',
        hash: 'TxHash',
        block: 'Block',
        age: 'Age',
        from: 'From',
        to: 'To',
        value: 'Value',
        fee: 'TxFee',
        create: '合约创建',
        contract: '合约',
        before: 'ago',
        txInfo: 'Tx Info',
        viewLeft: '查看前一个交易',
        viewRight: '查看后一个交易',
        information: 'Transaction Information',
        timestamp: 'Time Stamp',
        txHash: 'Txhash',
        txReceiptStatus: 'TxReceipt Status',
        actualTxCost: 'Tx Cost/Fee',
        energonLimit: 'Energon Limit',
        energonUsed: 'Energon Used By Transaction',
        energonPrice: 'Energon Price',
        blockHeight: 'Block Height',
        inputData: 'Input Date',
        confirmNum: 'Block Confirmations'
    },
    ...enLocale
}
