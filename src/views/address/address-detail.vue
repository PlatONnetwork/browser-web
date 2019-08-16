<template>
    <div class="contract-detail-wrap">
        <div class="page-title fontSize34">{{$t('contract.addressDetail')}}</div> 
        <div class="detail-change">
            <div class="detail-copy">
                <span>{{$t('contract.Address')}}</span>
                <i>#{{detailInfo.contractCreate}}</i>
                <b class="cursor" v-clipboard:copy="detailInfo.contractCreate" v-clipboard:success="onCopy" v-clipboard:error="onError"></b>
                <a class="code cursor"></a>
            </div>
        </div>
        <el-row class="overview-wrap" type="flex" justify="space-between">
            <el-col :span="11">
                <div class="overview">
                    <h3>{{$t('contract.overview')}}</h3>
                    <ul>
                        <li>
                            <label>{{$t('contract.balance')}}</label> 
                            <div>
                                <span>{{detailInfo.balance}}LAT</span>
                                <div>
                                    <span class="restricted">{{detailInfo.balance}}LAT (<a class="blue">{{$t('contract.restricted')}}</a>)</span>
                                </div>                               
                            </div>   
                        </li>
                        <li>
                            <label>{{$t('contract.transactions')}}</label> 
                            <div>{{detailInfo.txQty}}</div>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="11">
                <div class="others overview">
                    <h3>{{$t('contract.others')}}</h3>
                    <ul>
                        <li>
                            <label>{{$t('contract.delegations')}}/{{$t('contract.staking')}}</label> 
                            <div>{{detailInfo.balance}}LAT</div>   
                        </li>
                        <li>
                            <label>{{$t('contract.inRedemption')}}</label> 
                            <div>{{detailInfo.balance}}LAT</div> 
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <div class="address-trade">
            <div class="tabs">
                <el-button size="medium" :class="{active:tabIndex==1}" @click="tabChange(1)">{{$t('contract.transactions')}}</el-button>
                <el-button size="medium" :class="{active:tabIndex==2}" @click="tabChange(2)">{{$t('contract.delegations')}}</el-button>
            </div>
            <trade-list :address="address" v-show="tabIndex==1"></trade-list>   
            <div class="address-delegation" v-show="tabIndex==2">
                <ul>
                    <li>
                        <span>{{detailInfo.candidateCount}}</span>
                        <p>{{$t('deleget.validators')}}</p>
                    </li>
                    <li>
                        <span>{{detailInfo.delegateLocked}}</span>
                        <p>{{$t('deleget.lockedDelegate')}}(LAT)</p>
                    </li>
                    <li>
                        <span>{{detailInfo.delegateHes}}</span>
                        <p>{{$t('deleget.unlockedDelegate')}}(LAT)</p>
                    </li>
                    <li>
                        <span>{{detailInfo.delegateUnlock}}</span>
                        <p>{{$t('deleget.releasedDelegate')}}(LAT)</p>
                    </li>
                    <li>
                        <span>{{detailInfo.delegateReduction}}</span>
                        <p>{{$t('deleget.undelegating')}}(LAT)</p>
                    </li>
                </ul>
            </div> 
            <div class="table" v-show="tabIndex==2">
                <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini">
                    <el-table-column :label="$t('nodeInfo.validator')">
                        <template slot-scope="scope">
                            <div class='flex-special'>
                                <el-tooltip class="item" effect="dark"  placement="bottom"  v-if='scope.row.txReceiptStatus==0'>
                                    <div slot="content"><span class='title-warning'>Warning：</span>{{scope.row.failReason}}</div>
                                    <i class="iconfont iconxinxi cursor">&#xe63f;</i>
                                </el-tooltip>
                                <span class='cursor normal ellipsis' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column  :label="$t('deleget.delegationAmount')">
                        <template slot-scope="scope">
                            <span>{{$t('tradeAbout.before')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('deleget.locked')+'\\'+ $t('deleget.percentage')">
                        <template slot-scope="scope">
                            <span>Received</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('deleget.unlocked')" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.value}} LAT</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('deleget.released')" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.value}} LAT</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="actualTxCost" :label="$t('deleget.undelegating')" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="pagination-box">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes,total,  prev, pager, next" :total="pageTotal" :pager-count="9">
                    </el-pagination>
                </div>
            </div>      
        </div>
        
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'

    import tradeList from '@/components/trade-list'

    export default {
        name: 'contract-detail',
        data() {
            return {
                tabIndex:1,
                selectIndex:1,
                currentScreenWidth:0,
                tableData: [],
                currentPage: 1,
                pageSize: 20,
                pageTotal: 1,

                balance:'',
                count:0,
                activeTab:1,
                type:'voteTicket',
                type1:'transfer',
                typeList:[
                    {label:'voteTicket1',value:'voteTicket'},
                    {label:'authorization1',value:'authorization'},
                    {label:'candidateDeposit1',value:'candidateDeposit'},
                    {label:'candidateApplyWithdraw1',value:'candidateApplyWithdraw'},
                    {label:'candidateWithdraw1',value:'candidateWithdraw'},
                    {label:'transfer',value:'transfer'},
                    // {label:'vote',value:'vote'},
                    {label:'contractCreate',value:'contractCreate'},
                    {label:'transactionExecute',value:'transactionExecute'},
                    {label:'MPCtransaction',value:'MPCtransaction'},
                ],
                typeList1:[
                    {label:'transfer',value:'transfer'},
                    // {label:'vote',value:'vote'},
                    {label:'contractCreate',value:'contractCreate'},
                    {label:'transactionExecute',value:'transactionExecute'},
                    {label:'MPCtransaction',value:'MPCtransaction'},
                ],
                txTypeFn: {
                    transfer : 'transfer',
                    MPCtransaction : 'MPCtransaction',
                    contractCreate : 'contractCreate',
                    voteTicket  : 'voteTicket',
                    transactionExecute  :'transactionExecute',
                    authorization  :'authorization',
                    candidateDeposit :'candidateDeposit1',
                    candidateApplyWithdraw :'candidateApplyWithdraw1',
                    candidateWithdraw :'candidateWithdraw1'
                },
                address:'',
                detailInfo:{

                },
                descripFn: {
                    pending : 'pending',
                    trade : 'trade',
                    block : 'block',
                },
                pathFn: {
                    pending : '/trade-pending',
                    trade : '/trade',
                    block:'/block'
                },
                description:'',
                descriptionProp:'',
            }
        },
        props: {

        },
        computed: {

        },
		watch: {
		
		},
        components: {
            tradeList
        },
        methods: {
            //获取地址信息详情
            getDetail() {
                let type='';
                if(this.address == "0x1000000000000000000000000000000000000001" || this.address == "0x1000000000000000000000000000000000000002"){
                    type=this.type;
                }else{
                    type=this.type1;
                }
                let _type = [];
                _type.push(type);
                let param = {
                    // cid:'',
                    address: this.address,
                };
                console.warn('合约详情》》》', param);
                apiService.trade
                    .contractDetails(param)
                    .then(res => {
                        let {errMsg, code, data} = res;
                        if (code == 0) {
                            this.detailInfo = data;
                            data.trades.forEach(item => {
                                if (item.txReceiptStatus == -1) {
                                    ++this.count;
                                }
                            });
                        } else {
                            this.detailInfo = {};
                            this.$message.error(errMsg);
                        }
                    })
                    .catch(error => {
                        this.$message.error(error);
                        let {errMsg, code, data} = {
                            "errMsg":"",                 //描述信息
                            "code":0,                    //成功（0），失败则由相关失败码
                            "data":{
                                "type":"",                //地址详情  1：账号   2：合约   3：内置合约
                                "balance":"21223",             //余额(单位:LAT)
                                "restrictingBalance":"",  //锁仓余额(单位:LAT)
                                "stakingValue":"",        //质押的金额
                                "delegateValue":"",       //委托的金额
                                "redeemedValue":"",       //赎回中的金额
                                "txQty":1288,             //交易总数
                                "transferQty":11,         //转账交易总数
                                "delegateQty":11,         //委托交易总数
                                "stakingQty":11,          //验证人交易总数
                                "proposalQty":11,         //治理交易总数
                                "candidateCount":11,      //已委托验证人
                                "delegateHes":"222222222",         //未锁定委托（LAT）
                                "delegateLocked":"222222222",      //已锁定委托（LAT）
                                "delegateUnlock":"222222222",      //已解除委托（LAT）   
                                "delegateReduction":"222222222",    //赎回中委托（LAT）   
                                "contractName":"按订单",        //合约名称
                                "contractCreate":"0xdE41ad9010ED7ae4a7bBc42b55665151dcc8DEf4",      //合约创建者地址
                                "contractCreateHash":"0xdE41ad9010ED7ae4a7bBc42b55665151dcc8DEf4",  //合约创建哈希
                            }
                        };
                        if (code == 0) {
               
                            this.detailInfo = data;
                            // data.trades.forEach(item => {
                            //     if (item.txReceiptStatus == -1) {
                            //         ++this.count;
                            //     }
                            // });
                        } else {
                            this.detailInfo = {};
                            this.$message.error(errMsg);
                        }
                    });
            },
             //获取委托列表
            getList() {
                let param = {
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    address:this.address,
                };
                // console.warn('获取交易列表》》》', param);
                apiService.trade
                    .transactionList(param)
                    .then(res => {
                        let {data, totalPages, totalCount, code, errMsg,displayTotalCount} = res;
                        if (code == 0) {
                            this.tableData = data;
                            this.pageTotal = totalCount;
                            this.displayTotalCount = displayTotalCount;
                            //判断最新记录是否显示  总数
                            totalCount > 5000
                                ? (this.newRecordFlag = true)
                                : (this.newRecordFlag = false);
                        } else {
                            this.$message.error(errMsg);
                        }
                    })
                    .catch(error => {
                        let obj = {"errMsg":"成功","code":0,"totalCount":113817,"displayTotalCount":113817,"totalPages":11382,"data":[{"txHash":"0x13ee077df46f245b54e8bde9fbfd8e5177401cb7f3833f597a6684c072124e5c","blockHash":"0xc91ed795146b9bc0bace1a10065e96b03e4d1ce7a832fa52ed158b5797f70b1a","blockHeight":9715737,"blockTime":1565699071405,"from":"0x3f58fdc537a81a4423aae86d2c457bc2cf7d24a2","to":"0x1000000000000000000000000000000000000002","value":"1700","actualTxCost":"0.00003494","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x04c02b1a435c476a4a539c54c1815bff4ba0cddedd3da67cc3fe538ce1b4a013","blockHash":"0x0bd7cb6541d49d4d7f420f06eb124afc0a9532b27701a6f2d9d344925e2f27d7","blockHeight":9715233,"blockTime":1565698561366,"from":"0xebd8e66d30206205f35f809b3f244f8ea259a212","to":"0x1000000000000000000000000000000000000002","value":"200","actualTxCost":"0.00003494","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0xd6ce527038fa167be6f23a418513ab7285c2f177fdd438b0ee65204934063be5","blockHash":"0x30937b02cecbf90c9eb08242a26f6fe1e25d65f11770403a1938d796a5ecff20","blockHeight":9714168,"blockTime":1565697462329,"from":"0x9cc7b9bf170cfe3b8fcbcb5782c97f9dbb9a9d79","to":"0x1000000000000000000000000000000000000002","value":"2600","actualTxCost":"0.00003488","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x4b3611f7171668a8d0ac0a5a891b16bfbc1e83544adf1c0bc2dccf0bed3743c4","blockHash":"0x7504ef857d0bb14a5f5ffff1d47fe84b0c81d3acc8bd44537a97cc7f471788af","blockHeight":9714141,"blockTime":1565697435363,"from":"0x8b77ac9fabb6fe247ee91ca07ea4f62c6761e79b","to":"0x1000000000000000000000000000000000000002","value":"600","actualTxCost":"0.00003488","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x0bf5224bc83b22c59dfeb2637aa3252d5c09971316aae11b69fdd1014176c183","blockHash":"0xe00b2c786b3911c02033af42b822f8c80ac8b22c113c56b1be22f14152d59842","blockHeight":9713985,"blockTime":1565697274404,"from":"0x66d3347cc4c99b18405a64b062ec881578933211","to":"0x1000000000000000000000000000000000000002","value":"1600","actualTxCost":"0.00003494","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x8cd8159957936e67c1053c0984979882d29c3571bf47b17f63b2967e38d3ceef","blockHash":"0x75f4e9cf0a24ab8dd7dcb0245d9a55609437204e564403bdeaabc01f49af50bd","blockHeight":9713981,"blockTime":1565697270396,"from":"0xe5876a6c008f4660c2d862db0f2da5132152a545","to":"0x1000000000000000000000000000000000000002","value":"1000","actualTxCost":"0.00003494","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x45d2df9c1634c8631b19539286b080f9879686c584553c22f46cedf9f5cab353","blockHash":"0xa537c91e470b60401ab65ce10ab20feaf616132b485f46c8d54290f737e1d93c","blockHeight":9713740,"blockTime":1565697020352,"from":"0x4614dda7da840432e4df002558817247d68a1a8d","to":"0x1000000000000000000000000000000000000002","value":"1100","actualTxCost":"0.00003494","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x0707a8c090be3ef5c6524fad2dadf49c3f0b9840912efcc6a42f43d078c75ef4","blockHash":"0x1a56345b12a1be10001b2219a3056b0da6d2c1e82687bbf4a921a69400789c7d","blockHeight":9712737,"blockTime":1565696000365,"from":"0xabf1fab6afeec0b97bfb6b874737c101b795c9f4","to":"0x1000000000000000000000000000000000000002","value":"1600","actualTxCost":"0.00003494","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x75cf414a0187e58f87e8e0c2c223fb3c10618b06f5e2d8eb4a00165568d7da38","blockHash":"0xf1faad0cb79ecf886e914645815725a47ef8ae29b8864eb8118392cc251fc023","blockHeight":9710662,"blockTime":1565693876353,"from":"0x9cc7b9bf170cfe3b8fcbcb5782c97f9dbb9a9d79","to":"0x1000000000000000000000000000000000000002","value":"2600","actualTxCost":"0.00003488","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0xdab856d9f1eb4bb5463db192fc0b6bfa68521cab1f7308eaba44c7be9729efbd","blockHash":"0x5feb374a164e5812b7aac3e9064e44afaa3e065a03fc4b882557426e05832868","blockHeight":9710635,"blockTime":1565693848323,"from":"0x8b77ac9fabb6fe247ee91ca07ea4f62c6761e79b","to":"0x1000000000000000000000000000000000000002","value":"1600","actualTxCost":"0.00003488","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null}]};
                        let {data, totalPages, totalCount, code, errMsg,displayTotalCount} = obj;
                        this.tableData = data;
                        console.log(this.tableData);
                        this.pageTotal = totalCount;
                        this.displayTotalCount = displayTotalCount;
                        //判断最新记录是否显示  总数
                        totalCount > 5000
                            ? (this.newRecordFlag = true)
                            : (this.newRecordFlag = false);

                        this.$message.error(error);
                    });
            },
            onCopy() {
                this.$message.success(this.$t('modalInfo.copysuccess'));
            },
            onError() {
                this.$message.error(this.$t('modalInfo.copyfail'));
            },
            tabChange(index){
                this.tabIndex = index;
            },
            handleCurrentChange(val) {               
                this.currentPage = val;
                this.getList();
            },
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                this.getList();
            },
        },
        //生命周期函数
        created() {
            this.address = this.$route.query.address;
            this.getDetail();
            this.getList();
        },
        mounted() {

        }    
    }
</script>
<style lang="less" scoped>
.restricted{
    font-size: 12px;
    color: #999;
    line-height: 16px;
}
.address-delegation{
    ul{
        display: flex;
        margin-top: 20px;
        text-align: center;
        li{
            border: 1px solid #E9E9E9;
            border-radius: 2px;
            margin-right: 20px;
            padding: 5px 10px;            
            span{
                font-size: 18px;
            }
            p{
                font-size: 12px;
                color: #999999;
            }
        }
    }
}
</style>

