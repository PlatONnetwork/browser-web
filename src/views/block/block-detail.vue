<template>
    <div class="block-detail-wrap">
        <div class="page-title fontSize34">{{$t('blockAbout.blockDetail')}}</div> 
        <div class="detail-change">
            <div class="detail-copy">
                <span>{{$t('nodeInfo.blocks')}}</span>
                <i>#{{detailInfo.number}}</i>
                <b v-clipboard:copy="detailInfo.number" v-clipboard:success="onCopy" v-clipboard:error="onError"></b>
            </div>
            <div class="detail-arrow">
                <el-button icon="el-icon-arrow-left"></el-button>
                <el-button icon="el-icon-arrow-right"></el-button>
            </div>
        </div>
        <div class="infomation">
            <!-- 基础交易 -->
            <List :title="$t('blockAbout.blockInformation')" :border="true">
                <Item :label="$t('tradeAbout.blockHeight')" :prop="detailInfo.number"></Item>
                <Item :label="$t('tradeAbout.timeStamp')" :prop="detailInfo.timestamp?new Date(detailInfo.timestamp).Format('yyyy-MM-dd HH:mm:ss'):0"></Item>
                <Item :label="$t('tradeAbout.transactions')" :prop="detailInfo.statTxQty+'XT'"></Item>
                <Item :label="$t('blockAbout.blockHash')" :prop="detailInfo.hash"></Item>
                <Item :label="$t('blockAbout.parentHash')">
                    <span class="blue" @click="goDetail(type,detailInfo.parentHash)">{{detailInfo.parentHash}}</span>
                </Item>
                <Item :label="$t('blockAbout.producer')" v-if="detailInfo.txType!='4000'">
                    <span class="blue" @click="goDetail(type,detailInfo.nodeId)">{{detailInfo.nodeName}}</span>
                    【】
                </Item>
                <Item :label="$t('blockAbout.size')" :prop="detailInfo.size + 'Bytes'"></Item>
                <Item :label="$t('tradeAbout.gasLimit')" :prop="detailInfo.gasLimit + 'Bytes'"></Item>
                <Item :label="$t('tradeAbout.gasUsed')" :prop="detailInfo.gasUsed"></Item>
                <Item :label="$t('blockAbout.blockReward')" :prop="detailInfo.blockReward + 'LAT'"></Item>
                <Item :label="$t('blockAbout.extraData')" :prop="detailInfo.extraData"></Item>
            </List>
        </div>  
        <div class="block-trade">
            <div class="block-trade-title">
                {{$t('tradeAbout.transactions')}}({{detailInfo.statTxQty}})
            </div>
            <trade-list class="common-trade" :address="height+''" type="block"></trade-list> 
        </div>  
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'

    import List from '@/components/list/list'
    import Item from '@/components/list/item'

    import tradeList from '@/components/trade-list'

    export default {
        name: 'block-detail',
        data() {
            return {
                height:0,
                detailInfo:{},
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
            Item,
            tradeList
        },
        methods: {
             //获取地址信息详情
            getDetail() {
                let param = {
                    // cid:'',
                    height: this.height,
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
                                "code": 0,                   //成功（0），失败则由相关失败码
                                "data": {
                                    "number":19988,           //区块高度
                                    "timestamp":123123123879, //出块时间
                                    "statTxQty":1288,         //块内交易总数
                                    "hash":"0x1238",          //区块hash
                                    "parentHash":"0x234",     //父区块hash
                                    "nodeId":"fddfsdfgggg",              //出块节点id
                                    "nodeName":"出块节点名称",            //出块节点名称
                                    "timeDiff":424234,        //当前块出块时间距离上一个块出块时间之差（毫秒）
                                    "size":123,               //区块大小
                                    "gasLimit":24234,         //能量消耗限制
                                    "gasUsed":2342,           //能量消耗
                                    "statTxGasLimit":14,      //区块所有交易可提供的gas总和
                                    "blockReward":"123123",   //区块奖励(单位:von)
                                    "extraData":"xxx",        //附加数据
                                    "first":false,            //是否第一条记录
                                    "last":true,              //是否最后一条记录
                                    "statTransferQty":11,     //块内转账交易总数
                                    "statDelegateQty":11,     //块内委托交易总数
                                    "statStakingQty":11,      //块内验证人交易总数
                                    "statProposalQty":11      //块内治理交易总数
                                }
                            }
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

            // 区块列表
            handleCurrentChange(val) {               
                this.currentPage = val;
                this.getBlockList();
            },
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                this.getBlockList();
            },
        },
        //生命周期函数
        created() {
            this.height = this.$route.query.height;
            this.getDetail();    
        },
        mounted() {

        }    
    }
</script>
<style lang="less" scoped>
 .block-trade{
    border: 1px solid #F5F5F5;
    margin-top: 31px;
    .block-trade-title{
        font-size: 20px;
        color: #000;
        line-height: 24px;
        padding: 9px 20px;
        border-top:2px solid #000;
        border-bottom: 1px solid #F5F5F5;
        margin-bottom: 20px;
    }
    .common-trade{
        padding-left: 30px;
    }
 }
</style>
<style lang="less">
 .block-detail-wrap{
    .item-wrap{
        padding-left:50px;
    }
 }
</style>

