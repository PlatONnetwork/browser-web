<template>
    <div class="restricting-detail-wrap">
        <div class="page-title fontSize34">{{$t('contract.addressDetail')}}</div> 
        <div class="detail-change">
            <div class="detail-copy">
                <span>{{$t('contract.Address')}}</span>
                <i>#{{detailInfo.contractCreate}}</i>
                <b class="cursor" v-clipboard:copy="detailInfo.contractCreate" v-clipboard:success="onCopy" v-clipboard:error="onError"></b>
                <a class="code cursor"></a>
            </div>
        </div>
        <div class="restricting-detail">
            <h3>dsdsdd</h3>
            <List class="common-info">           
                <Item :label="$t('tradeAbout.restrictedBalance')" :prop="detailInfo.delegateHes"></Item>
                <Item :label="$t('tradeAbout.released')" :prop="detailInfo.delegateHes"></Item>
                <Item :label="$t('tradeAbout.forDelegations')" :prop="detailInfo.delegateHes"></Item>
                <Item :label="$t('tradeAbout.slash')" :prop="detailInfo.delegateHes"></Item>
                <Item :label="$t('tradeAbout.debt')" :prop="detailInfo.delegateHes"></Item>
                <Item :label="$t('tradeAbout.totalRestricted')" :prop="detailInfo.delegateHes"></Item>
            </List>
        </div>
               
        <div class="table" style="width:50%;">
            <h3>dsdsdd</h3>
            <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini">
                <el-table-column :label="$t('contract.epoch')">
                    <template slot-scope="scope">
                        <span>Received</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('blockAbout.blockH')" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.value}} LAT</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('contract.estimatedTime')" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.value}} LAT</span>
                    </template>
                </el-table-column>
                <el-table-column prop="actualTxCost" :label="$t('contract.unlocksNumber')" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>             
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'

    import List from '@/components/list/list'
    import Item from '@/components/list/item'

    export default {
        name: 'contract-detail',
        data() {
            return {
                tableData: [],
                address:'',
                detailInfo:{

                },
            }
        },
        props: {

        },
        computed: {

        },
		watch: {
		
		},
        components: {
            List,
            Item  
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
.restricting-detail-wrap{
    h3{
        margin-bottom: 17px;
        font-size: 20px;
        color: #000000;
        line-height: 24px;
    }
    .restricting-detail{
        width: 50%;        
    }
}

</style>
<style lang="less">
.restricting-detail{
    .list-wrap{
        padding-left: 20px;
        padding-bottom: 0;
        .list-item{
            justify-content: space-between;
            border-bottom: 1px solid #F5F5F5;
            padding-bottom: 12px;
        }
    }
}
</style>

