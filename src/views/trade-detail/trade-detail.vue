<template>
    <div class="trade-detail-wrap">
        <com-header :descriptionProp='descriptionProp' @searchFn='searchFn' @changeDataFn='changeDataFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Tx-Information
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}} </el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/trade' ,query:{
                        currentPage:currentPage,
                        pageSize:pageSize
                    }}">{{$t('tradeAbout.transactions')}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{$t('tradeAbout.txInfo')}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="left">
                    <button @click='goLeft' :disabled='disabledLeft' class='cursor' :title="$t('tradeAbout.viewLeft')" v-if='btnLeftFlag'>
                        <i class='iconfont iconleft'>&#xe643;</i>
                    </button>
                </div>
                <div class="center"
                    v-loading="loading"
                    :element-loading-text="$t('elseInfo.loading')"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(5,12,46, 0.7)">
                    <!--:element-loading-text="$t('elseInfo.loading')"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(4,11,39, 0.5) -->
                    <div class='record'>
                        <header class="time-and-number time2">
                            Transactions
                        </header>
                        <div class="inputdata">
                            <span>#{{detailInfo.txHash}}</span>
                            <span v-clipboard:copy="detailInfo.txHash" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                <i class='iconfont iconcopy cursor'>&#xe63d;</i>
                            </span>
                        </div>
                    </div>
                    <div class="data-detail">
                        <div class="data-title">{{$t('tradeAbout.information')}}</div>
                        <div class="data" v-if='detailInfo'>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.type')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{ $t('elseInfo.' + txTypeFn[detailInfo.txType])}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.timestamp')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{new Date(detailInfo.timestamp).Format('yyyy-MM-dd HH:mm:ss')}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.txHash')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.txHash}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.txReceiptStatus')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span :class='{"market-normal":detailInfo.txReceiptStatus==1,"market-abnormal":detailInfo.txReceiptStatus==0}'>{{detailInfo.txReceiptStatus==1?$t('tradeAbout.success'):(detailInfo.txReceiptStatus==0?$t('tradeAbout.fail'):'pending ')}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" v-if='detailInfo.txType=="transfer" || detailInfo.txType=="contractCreate" || detailInfo.txType=="transactionExecute" || detailInfo.txType=="MPCtransaction"'>
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.value')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.value}} Energon</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" v-if='detailInfo.txType=="voteTicket"'>
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.voteStaked')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.value}} Energon</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" v-if='detailInfo.txType=="candidateDeposit"'>
                                <el-col :span="7">
                                    <span>{{$t('totalInfo.staked')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.value}} Energon</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" v-if='detailInfo.txType=="candidateApplyWithdraw"'>
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.reduction')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.value}} Energon</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" v-if='detailInfo.txType=="candidateWithdraw"'>
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.withdraw')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.value}} Energon</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg"  v-if='detailInfo.txType=="candidateDeposit" || detailInfo.txType=="candidateApplyWithdraw" || detailInfo.txType=="authorization" || detailInfo.txType=="transactionExecute" || detailInfo.txType=="voteTicket" || detailInfo.txType=="contractCreate" || detailInfo.txType=="MPCtransaction" || detailInfo.txType=="transfer"'>
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.from')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='cursor normal' @click='goAddressDetail(detailInfo.from)'>{{detailInfo.from}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="7">
                                    <span>{{ detailInfo.txType=="candidateWithdraw" ? '接收地址' : $t('tradeAbout.to')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span :title='$t("elseInfo.contract")' v-if='detailInfo.txType == "contractCreate" || detailInfo.receiveType == "contract" '><i class="iconfont iconcontract">&#xe63e;</i>Contract</span>
                                    <span v-if='detailInfo.to' class='cursor normal' @click='goDetail(detailInfo.receiveType,detailInfo.to)'>{{detailInfo.to}}</span>
                                    <span v-else >{{$t('elseInfo.create')}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" v-if='detailInfo.txReceiptStatus==0'>
                                <el-col :span="7">
                                </el-col>
                                <el-col :span="20">
                                    <span><i class="iconfont iconxinxi">&#xe63f;</i></span>
                                    <span>{{detailInfo.failReason}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" v-if='detailInfo.txType=="voteTicket"'>
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.votefor')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='cursor normal' @click='voteFn(detailInfo.nodeId)'>{{detailInfo.value}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" v-if='detailInfo.txType=="candidateDeposit" || detailInfo.txType=="candidateApplyWithdraw" || detailInfo.txType=="candidateWithdraw"'>
                                <el-col :span="7">
                                    <span>{{$t('totalInfo.nodeName')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='cursor normal' @click='voteFn(detailInfo.nodeId)'>{{detailInfo.nodeName}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" v-if='detailInfo.txType=="voteTicket" || detailInfo.txType=="candidateDeposit" || detailInfo.txType=="candidateApplyWithdraw" || detailInfo.txType=="candidateWithdraw"'>
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.nodeID')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class="nodeIDBreak">{{detailInfo.nodeId}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" v-if='detailInfo.txType=="voteTicket"'>
                                <el-col :span="7">
                                    <span>{{$t('totalInfo.ticketPrice')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>票价未知</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" v-if='detailInfo.txType=="voteTicket"'>
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.tickets')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='cursor normal' @click='voteNumFn(detailInfo.blockHeight,detailInfo.txHash)'>{{detailInfo.voteCount}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.actualTxCost')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <!-- <span>{{ toNonExponential(detailInfo.actualTxCost / Math.pow(10,18) )}} Energon</span> 不需要转换-->
                                    <span>{{ detailInfo.actualTxCost}} Energon</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.energonLimit')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.energonLimit}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.energonUsed')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.energonUsed}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.energonPrice')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <!-- <span>{{ toNonExponential(detailInfo.energonPrice / Math.pow(10,18) )}} Energon ({{Math.pow(10,9)*detailInfo.energonPrice}}E)</span> -->
                                    <span>{{detailInfo.priceInEnergon}} Energon ({{detailInfo.priceInE}}E)</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.blockHeight')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>
                                        <span class='cursor normal' @click='viewBlock(detailInfo.blockHeight)'>{{detailInfo.blockHeight}}</span><span>({{detailInfo.confirmNum}}{{$t('tradeAbout.confirmNum')}})</span></span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="7">
                                    <span>{{$t('tradeAbout.inputData')}}:</span>
                                </el-col>
                                <el-col :span="20" class='special-input'>
                                    <el-input type="textarea" :rows="2" v-model="detailInfo.inputData" :disabled="true" resize="none">
                                    </el-input>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <button @click='goRight' :disabled='disabledRight' class='cursor' :title="$t('tradeAbout.viewRight')"  v-if='btnRightFlag'>
                        <i class='iconfont iconleft'>&#xe644;</i>
                    </button>
                </div>
            </div>
        </div>
        <com-footer></com-footer>
    </div>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import comHeader from '@/components/header/header.vue';
import comFooter from '@/components/footer/footer.vue';
import apiService from '@/services/API-services';
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
export default {
    //组件名
    name: 'trade-detail-wrap',
    //实例的数据对象
    data() {
        return {
            currentPage:null,
            pageSize:null,
            loading:false,
            txHash: '',
            btnLeftFlag:true,
            btnRightFlag:true,
            disabledLeft: false,
            disabledRight: false,
            address: '11111111111',
            detailInfo: {

            },
            descriptionProp: 'trade',
            txTypeFn:{
                transfer : 'transfer',
                MPCtransaction : 'MPCtransaction',
                contractCreate : 'contractCreate',
                voteTicket : 'voteTicket',
                transactionExecute :'transactionExecute',
                authorization :'authorization',
                candidateDeposit :'candidateDeposit',
                candidateApplyWithdraw :'candidateApplyWithdraw',
                candidateWithdraw :'candidateWithdraw',
                unknown :'unknown'
            },
            extraInfo:{

            }
        };
    },
    //数组或对象，用于接收来自父组件的数据
    props: {},
    //计算
    computed: {
        ...mapGetters(['chainId']),
    },
    //方法
    methods: {
        //投票给 跳转到竞选节点详情
        voteFn(nodeId){
            this.$router.push({
                path:'/node-detail',
                query:{
                    nodeId:nodeId
                }
            });
        },
        //票数 跳转到选票列表
        voteNumFn(height,hash){
            this.$router.push({
                path:'/trade-vote',
                query:{
                    height:height,
                    description: 'trade',
                    hash:hash
                }
            });
        },
        goBack(){
            // :to="{ path: '/trade' }"
            this.$router.push({
                path:'/trade',
                query:{
                    currentPage:this.$route.query.currentPage,
                    pageSize:this.$route.query.pageSize
                }
            });
        },
        //将科学计数法转为数值
        toNonExponential(num){
            let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
            console.warn(m,m[1])
            return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
        },
        searchFn(data){
            console.warn('子组件header向交易详情data>>>>',data)
            this.txHash = data.struct.txHash
            this.detailInfo = data.struct
        },
        changeDataFn(){
            console.warn('子组件告诉交易详情链id更改》》》》')
            this.getDetail();
        },
        onCopy() {
            this.$message.success(this.$t('modalInfo.copysuccess'));
        },
        onError() {
            this.$message.error(this.$t('modalInfo.copyfail'));
        },
        //获取交易信息详情
        getDetail() {
            let param = {
                // cid:'',
                txHash: this.txHash,
            };
            console.warn('交易详情》》》》', param);
            apiService.trade
                .transactionDetails(param)
                .then(res => {
                    let {errMsg, code, data} = res;
                    if (code == 0) {
                        this.detailInfo = data;
                        // this.extraInfo = JSON.parse(data.txInfo)
                        //是否第一条记录
                        if(data.first){
                            this.btnLeftFlag = false;
                            this.disabledLeft = true;
                        }else{
                            this.btnLeftFlag = true;
                            this.disabledLeft = false
                        }
                        //是否最后一条数据
                        if(data.last){
                            this.btnRightFlag = false;
                            this.disabledRight = true;
                        }else{
                            this.btnRightFlag = true;
                            this.disabledRight = false;
                        }
                    } else {
                        this.detailInfo = {};
                        this.$message.error(errMsg);
                    }
                })
                .catch(error => {
                    this.$message.error(error);
                });
        },
        goAddressDetail(address) {
            this.$router.push({
                path: '/address-detail',
                query: {
                    address: address,
                    description: 'trade',
                },
            });
        },
        goDetail(type, to) {
            if (type == 'contract') {
                //进入合约详情
                this.$router.push({
                    path: '/contract-detail',
                    query: {
                        address: to,
                        description: 'trade',
                    },
                });
            } else {
                this.$router.push({
                    path: '/address-detail',
                    query: {
                        address: to,
                        description: 'trade',
                    },
                });
            }
        },
        //向左 上一个
        goLeft() {
            this.btnRightFlag = true;
            this.disabledRight = false;
            this.loading = true;
            let param = {
                // cid:'',
                direction: 'prev',
                txHash: this.txHash,
            };
            console.warn('交易详情上一个》》》》', param);
            apiService.trade
                .transactionDetailNavigate(param)
                .then(res => {
                    let {errMsg, code, data} = res;
                    this.loading = false;
                    if(code==0){
                        if(data.first){
                            //这是第一个 置灰
                            this.btnLeftFlag = false;
                            this.disabledLeft = true;
                            // return false;
                        }else{
                            this.btnLeftFlag = true;
                            this.disabledLeft = false;
                        }
                        this.$router.replace({
                            path: '/trade-detail',
                            query: {
                                txHash: data.txHash,
                            },
                        });
                        this.detailInfo = data;
                        this.txHash = data.txHash;
                    }else{
                        this.btnLeftFlag = true;
                        this.disabledLeft = false;
                        this.$message.error(errMsg);
                    }
                    // if (code == 1) {
                    //     //这是第一个 置灰
                    //     this.btnLeftFlag = false;
                    //     this.disabledLeft = true;
                    //     this.$message.warning(errMsg);
                    //     return false;
                    // } else if (code == 0) {
                    //     this.btnLeftFlag = true;
                    //     this.disabledLeft = false;
                    //     this.$router.replace({
                    //         path: '/trade-detail',
                    //         query: {
                    //             txHash: data.txHash,
                    //         },
                    //     });
                    //     this.detailInfo = data;
                    //     this.txHash = data.txHash;
                    // } else {
                    //     this.btnLeftFlag = true;
                    //     this.disabledLeft = false;
                    //     this.$message.error(errMsg);
                    // }
                })
                .catch(error => {
                    this.loading = false;
                    this.$message.error(error);
                });
        },
        //向右 下一个
        goRight() {
            this.btnLeftFlag = true;
            this.disabledLeft = false;
            this.loading = true;
            let param = {
                // cid:'',
                direction: 'next',
                txHash: this.txHash,
            };
            console.warn('交易详情下一个》》》》', param);
            apiService.trade
                .transactionDetailNavigate(param)
                .then(res => {
                    let {errMsg, code, data} = res;
                    this.loading = false;
                    if(code==0){
                        if(data.last){
                            //这是最后一个 置灰
                            this.btnRightFlag = false;
                            this.disabledRight = true;
                            // return false;
                        }else{
                            this.btnRightFlag = true;
                            this.disabledRight = false;
                        }
                        // debugger
                        this.$router.replace({
                            path: '/trade-detail',
                            query: {
                                txHash: data.txHash,
                            },
                        });
                        this.detailInfo = data;
                        this.txHash = data.txHash;
                    }else{
                        this.btnRightFlag = true;
                        this.disabledRight = false;
                        this.$message.error(errMsg);
                    }
                    // if (code == 1) {
                    //     //这是最后一个 置灰
                    //     this.btnRightFlag = false;
                    //     this.disabledRight = true;
                    //     this.$message.warning(errMsg);
                    //     return false;
                    // } else if (code == 0) {
                    //     this.btnRightFlag = true;
                    //     this.disabledRight = false;
                    //     this.$router.replace({
                    //         path: '/trade-detail',
                    //         query: {
                    //             txHash: data.txHash,
                    //         },
                    //     });
                    //     this.detailInfo = data;
                    //     this.txHash = data.txHash;
                    // } else {
                    //     this.btnRightFlag = true;
                    //     this.disabledRight = false;
                    //     this.$message.error(errMsg);
                    // }
                })
                .catch(error => {
                    this.loading = false;
                    this.$message.error(error);
                });
        },
        viewBlock(height){
            this.$router.push({
                path: '/block-detail',
                query: {
                    height: height,
                },
            });
        }
    },
    //生命周期函数
    created() {
        this.currentPage=this.$route.query.currentPage;
        this.pageSize=this.$route.query.pageSize;
        this.txHash = this.$route.query.txHash;
        //获取交易列表
        this.getDetail();
    },
    //监视
    watch: {
        // chainId: 'getDetail',
    },
    //组件
    components: {
        comHeader,
        comFooter,
    },
};
</script>
<style lang="less" scoped>
.icons {
    width: 40px;
    height: 96px;
    line-height: 96px;
}
button {
    background: none;
    border: none;
    outline: none;
}
.bottom {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 30px 0;
    .left,
    .right {
        width: 10%;
        text-align: center;
        line-height: 630px;
    }
    .center {
        width: 80%;
        // box-shadow: 0px 5px 19px 1px rgba(2, 4, 23, 0.3);
        background: url(images/background.png) no-repeat center;
        background-size: 100% 100%;
    }
    .record {
        margin-top: 30px;
        position: relative;
        .time2 {
            width: 610px;
            left: 50%;
            top: 30px;
            margin-left: -305px;
            text-align: center;
        }
        .inputdata {
            position: relative;
            width: 610px;
            height: 30px;
            background-color: rgba(48, 56, 104, 0.3);
            margin: 0 auto;
            padding-left: 9px;

            span {
                letter-spacing: 0.8px;
                color: #93a5c8;
                line-height: 30px;
                &:last-child {
                    position: absolute;
                    right: 9px;
                }
            }
        }
    }
    .data-detail {
        padding: 0 190px;
        margin-bottom: 58px;
        .data-title {
            letter-spacing: 1px;
            color: #ffffff;
            font-size: 16px;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 60px;
        }
        .data {
            letter-spacing: 0.8px;
            color: #93a5c8;
            font-size: 12px;
            .el-row {
                margin-bottom: 10px;
            }
        }
    }
}


.iconcontract {
    margin-right: 4px;
}
.el-col-20 {
    color: #d7dde9;
}
@media only screen and (min-width: 1400px) {
    .data {
        margin-left: 15%;
    }
}
.nodeIDBreak{
    word-break: break-all;
}
</style>

<style lang="less">
.el-loading-spinner{
    display: flex;
    height: 50px;
    background:url(images/loading-big.gif) no-repeat center top;
    justify-content: center;
    align-items: flex-end;
    .el-loading-text{
        font-size: 12px;
    }
}
</style>
