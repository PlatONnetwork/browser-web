<template>
    <div class="common-trade">
        <div class="address-trade-last" v-if="type!='block'">            
            {{$t('blockAbout.morethen')}} {{displayTotalCount}} {{$t('contract.transactions')}} 
            <span style="color: #3F3F3F;" v-if="newRecordFlag">{{$t('contract.showingLast')}}</span>
        </div>
        <div class="trade-tab-wrap">
            <ul class="trade-tab">
                    <li :class="{active:selectIndex==1}" index="1" @click="typeChange(1,'')">{{$t('contract.all')}}</li>
                    <li :class="{active:selectIndex==2}" index="2" @click="typeChange(2,'transfer')">{{$t('contract.transfers')}}({{tradeCount.statTransferQty}})</li>
                    <li :class="{active:selectIndex==3}" index="3" @click="typeChange(3,'delegate')">{{$t('contract.delegationsTxns')}}({{tradeCount.statDelegateQty}})</li>
                    <li :class="{active:selectIndex==4}" index="4" @click="typeChange(4,'staking')">{{$t('contract.validatorTxns')}}({{tradeCount.statStakingQty}})</li>
                    <li :class="{active:selectIndex==5}" index="5" @click="typeChange(5,'proposal')">{{$t('contract.governanceTxns')}}({{tradeCount.statProposalQty}})</li>
            </ul>   
            <el-button size="medium" v-if="type!='block'">{{$t('nodeInfo.export')}}</el-button>
        </div>
        <div class="table">
            <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini">
                <el-table-column :label="$t('tradeAbout.hash')">
                    <template slot-scope="scope">
                        <div class='flex-special'>
                            <el-tooltip class="item" effect="dark"  placement="bottom"  v-if='scope.row.failReason'>
                                <div slot="content"><span class='title-warning'>Warning：</span>{{scope.row.failReason}}</div>
                                <i class="iconfont iconxinxi cursor yellow">&#xe63f;</i>
                            </el-tooltip>
                            <span class='cursor normal ellipsis' @click='goTradeDetail(scope.row.txHash)'>&nbsp;{{scope.row.txHash}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('blockAbout.operatorAddress')" v-if="type=='block'">
                    <template slot-scope="scope">
                        <span class='cursor normal ellipsis' @click='goAddressDetail(scope.row.from)'>{{scope.row.from}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="blockHeight" :label="$t('tradeAbout.block')" v-if="type!='block'">
                    <template slot-scope="scope">
                        <span class='cursor normal' @click='goBlockDetail(scope.$index,scope.row)'>{{scope.row.blockHeight}}</span>
                    </template>
                </el-table-column>
                <el-table-column  :label="$t('totalInfo.blockTime')" v-if="type!='block'">
                    <template slot-scope="scope">
                        <span>{{$t('tradeAbout.before')}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('tradeAbout.type')">
                    <template slot-scope="scope">
                        <span>Received</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('tradeAbout.value')" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.value | formatMoney}} LAT</span>
                    </template>
                </el-table-column>
                <el-table-column prop="actualTxCost" :label="$t('tradeAbout.fee')" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="pagination-box">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes,total,  prev, pager, next" :total="pageTotal" :pager-count="9">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    export default {
        name: '',
        data() {
            return {
                selectIndex:1,
                newRecordFlag: false,
                tableData: [],
                currentPage: 1,
                pageSize: 20,
                pageTotal: 1,
                displayTotalCount: 0,
                tradeType:'',
            }
        },
        props: {
            address:String,
            type:String,
            tradeCount:Object
        },
        computed: {

        },
		watch: {
		
		},
        components: {

        },
        methods: {
             //获取交易列表 下分页
            getTradeList(pageNo) {
                let param = {
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    tradeType:this.tradeType
                };
                if(pageNo){
                    param.pageNo=pageNo;
                }
                let methodName = '';
                if(this.type=='block'){
                    param.blockNumber = this.address;
                    methodName='transactionListByBlock';
                }else{
                    param.address = this.address;
                    methodName='transactionListByAddress';
                }
                apiService.trade
                    [methodName](param)
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
            handleCurrentChange(val) {               
                this.currentPage = val;
                this.getTradeList();
            },
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                this.getTradeList();
            },
            typeChange(index,type){
                this.selectIndex = index;
                this.tradeType = type;

                this.currentPage = 1;
                this.getTradeList();
            },
            goTradeDetail(hash){
                this.$router.push({
                    path:'/trade-detail',
                    query:{
                        txHash:hash
                    }
                })
            },
            goAddressDetail(address){
                this.$router.push({
                    path:'/address-detail',
                    query:{
                        address:address
                    }
                })
            }
        },
        //生命周期函数
        created() {
            this.getTradeList();
        },
        mounted() {

        }    
    }
</script>
<style lang="less" scoped>

</style>

