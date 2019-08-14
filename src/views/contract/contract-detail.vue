<template>
    <div class="contract-detail-wrap">
        <div class="page-title fontSize34">{{$t('contract.contractDetail')}}</div> 
        <div class="detail-change">
            <div class="detail-copy">
                <span>{{$t('contract.contract')}}</span>
                <i>#{{detailInfo.contractCreate}}</i>
                <b v-clipboard:copy="detailInfo.contractCreate" v-clipboard:success="onCopy" v-clipboard:error="onError"></b>
                <a class="code"></a>
            </div>
        </div>
        <el-row class="overview-wrap" type="flex" justify="space-between">
            <el-col :span="11">
                <div class="overview">
                    <h3>{{$t('contract.overview')}}</h3>
                    <ul>
                        <li>
                            <label>{{$t('contract.balance')}}</label> 
                            <div>{{detailInfo.balance}}</div>   
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
                            <label>{{$t('contract.contractName')}}</label> 
                            <div>{{detailInfo.contractName}}</div>   
                        </li>
                        <li>
                            <label>{{$t('contract.contractCreator')}}</label> 
                            <div class="contractCreator">
                                <a class="ellipsis blue">{{detailInfo.contractCreate}}</a> 
                                {{$t('contract.totxn')}} 
                                <a class="ellipsis blue">{{detailInfo.contractCreateHash}}</a>                           
                            </div>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <div class="address-trade">
            <div class="tabs">
                <el-button size="medium" class="active">{{$t('contract.transactions')}}</el-button>
            </div>
            <div class="address-trade-last">            
                {{$t('blockAbout.morethen')}} 23234 {{$t('contract.transactions')}} 
                <span style="color: #3F3F3F;">{{$t('contract.showingLast')}}</span>
            </div>
        </div>
        
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    export default {
        name: 'contract-detail',
        data() {
            return {
                currentScreenWidth:0,
                currentPage:null,
                pageSize:null,
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
                    txTypes: _type,
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
                                "delegateHes":"",         //未锁定委托（LAT）
                                "delegateLocked":"",      //已锁定委托（LAT）
                                "delegateUnlock":"",      //已解除委托（LAT）   
                                "delegateReduction":"",    //赎回中委托（LAT）   
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
            onCopy() {
                this.$message.success(this.$t('modalInfo.copysuccess'));
            },
            onError() {
                this.$message.error(this.$t('modalInfo.copyfail'));
            },
        },
        //生命周期函数
        created() {
            this.address = this.$route.query.address;
            this.getDetail();
        },
        mounted() {

        }    
    }
</script>
<style lang="less" scoped>
.contractCreator{
  a{
      width:150px;
      display: inline-block;
      vertical-align: middle;
  }
}
</style>

