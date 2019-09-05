<template>
    <div class="common-trade" :class="{'block-trade-wrap':type=='block'}">
        <div class="address-trade-last" v-if="type!='block'">            
            {{$t('blockAbout.morethen')}} {{tradeTotal}} {{$t('contract.transactions')}} 
            <span style="color: #3F3F3F;" v-if="newRecordFlag">{{$t('contract.showingLast')}}</span>
        </div>
        <div class="trade-tab-wrap">
            <ul class="trade-tab">
                    <li :class="{active:selectIndex==1}" index="1" @click="typeChange(1,'')">{{$t('contract.all')}}</li>
                    <li :class="{active:selectIndex==2}" index="2" @click="typeChange(2,'transfer')">{{$t('contract.transfers')}}({{tradeCount.transferQty}})</li>
                    <li :class="{active:selectIndex==3}" index="3" @click="typeChange(3,'delegate')">{{$t('contract.delegationsTxns')}}({{tradeCount.delegateQty}})</li>
                    <li :class="{active:selectIndex==4}" index="4" @click="typeChange(4,'staking')">{{$t('contract.validatorTxns')}}({{tradeCount.stakingQty}})</li>
                    <li :class="{active:selectIndex==5}" index="5" @click="typeChange(5,'proposal')">{{$t('contract.governanceTxns')}}({{tradeCount.proposalQty}})</li>
            </ul>   
            <el-button size="medium" v-if="type!='block'" @click="exportFn">{{$t('common.export')}}</el-button>
        </div>
        <div class="table">
            <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini">
                <el-table-column :label="$t('tradeAbout.hash')">
                    <template slot-scope="scope">
                        <div class='flex-special'>
                            <el-tooltip class="item" effect="dark"  placement="bottom"  v-if='scope.row.txReceiptStatus==0'>
                                <div slot="content"><span class='title-warning'></span>{{scope.row.failReason?scope.row.failReason:$t("tradeAbout.transactionFailure")}}</div>
                                <i class="iconfont iconxinxi cursor yellow">&#xe63f;</i>
                            </el-tooltip>
                            <p class='cursor blue ellipsis percent60' @click='goTradeDetail(scope.row.txHash)'>&nbsp;{{scope.row.txHash}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('blockAbout.operatorAddress')" v-if="type=='block'">
                    <template slot-scope="scope">
                        <span class='cursor blue ellipsis' @click='goAddressDetail(scope.row.from)'>{{scope.row.from}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="blockHeight" :label="$t('tradeAbout.block')" v-if="type!='block'">
                    <template slot-scope="scope">
                        <span class='cursor blue' @click='goBlockDetail(scope.row.blockNumber)'>{{scope.row.blockNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column  :label="$t('tradeAbout.confirmTime')" v-if="type!='block'" width="300">
                    <template slot-scope="scope">
                        <span>{{scope.row.timestamp | formatTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('tradeAbout.type')">
                    <template slot-scope="scope">
                        <span :class="{green:(scope.row.txType=='0'|| scope.row.txType=='1005')}" class="red">{{$t('TxType.'+[scope.row.txType])}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('tradeAbout.value')">
                    <template slot-scope="scope">
                        <span>{{scope.row.value | formatMoney}} LAT</span>
                    </template>
                </el-table-column>
                <el-table-column prop="actualTxCost" :label="$t('tradeAbout.fee')">
                </el-table-column>
            </el-table>
            <div class="pagination-box">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes,total,  prev, pager, next" :total="pageTotal>5000?5000:pageTotal" :pager-count="9">
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
                tradeTotal: 0,
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
                    txType:this.tradeType
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
                        let {data, totalPages, totalCount, code, errMsg} = res;
                        if (code == 0) {
                            this.tableData = data;
                            this.pageTotal = totalCount;
                            if(!this.tradeType){
                                this.tradeTotal = totalCount;
                            }                           
                            //判断最新记录是否显示  总数
                            this.tradeTotal > 5000
                                ? (this.newRecordFlag = true)
                                : (this.newRecordFlag = false);
                        } else {
                            this.$message.error(errMsg);
                        }
                    })
                    .catch(error => {
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
            exportFn() {
                //跳转至下载页
                const {href} = this.$router.resolve({
                    path:'/download',
                    query:{
                        address:this.address,
                        exportname:'account',
                    }
                })
                window.open(href,'_blank')
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
            },
            //进入区块详情
            goBlockDetail(blockHeight) {
                this.$router.push({
                    path: '/block-detail',
                    query: {
                        height: blockHeight,
                    },
                });
            },
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
.block-trade .common-trade.block-trade-wrap{
    padding-left: 0px;
    .pagination-box{
        padding-bottom: 60px;
        margin-right: 30px;
    }
    .table .el-table th{
        padding-left: 30px;
    }
    .trade-tab-wrap{
        padding-left: 30px;
    }
}
</style>
<style lang="less">
.block-trade-wrap{
    .table .el-table{
        th{
            padding-left: 20px;
        }
        td{
            padding-left: 20px;
        }
    }
}
</style>

