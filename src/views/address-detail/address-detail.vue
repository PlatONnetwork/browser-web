<template>
    <div class="address-detail-wrap">
        <com-header :descriptionProp='descriptionProp' @searchFn='searchFn' @changeDataFn='changeDataFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Address Info
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}}</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: pathFn[description] ,query:{
                        currentPage:currentPage,
                        pageSize:pageSize
                    }}" v-if='description'>{{ $t('breadCrumb.' + descripFn[description]) }}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{$t('totalInfo.info')}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <div class="left">Address</div>
                        <div class="right">
                            <span>#{{address}}</span>
                            <span v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                <i class='iconfont iconcopy cursor'>&#xe63d;</i>
                            </span>
                        </div>
                    </div>
                    <div class="view">
                        <div class="left">
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span class='row-title'>{{$t('totalInfo.overview')}}</span>
                                </el-col>
                                <el-col :span="20"></el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('totalInfo.balance')}}</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{balance}}ATP</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('totalInfo.transactions')}}</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.tradeCount}}</span>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="right">
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span class='row-title'>{{$t('totalInfo.votes')}}</span>
                                </el-col>
                                <el-col :span="20"></el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('totalInfo.votesStaked')}}</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.votePledge || 0}}ATP</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('totalInfo.votesNodes')}}</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.nodeCount}}</span>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div class="data-detail">
                    <ul class="ul-nav">
                        <li :class="{active: activeTab == 1}" @click="changeTab(1)">{{$t('totalInfo.transactions')}}</li>
                        <!-- <li :class="{active: activeTab == 2}" @click="changeTab(2)">{{$t('totalInfo.votes')}}</li> -->
                    </ul>
                    <div class="data">
                        <div v-if='activeTab == 1'>
                            <div class='data-top'>
                                <div class='count'>{{count}}{{$t('totalInfo.pendtransaction')}}</div>
                                <div class='search-address'>
                                    <span class='count types'>Type：</span>
                                    <el-select v-model="type"  class="margin20" style='width:150px;' @change='getDetail'>
                                        <el-option
                                            v-for="item in typeList"
                                            :key="item.value"
                                            :label="$t('elseInfo.'+item.label)"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-button type="primary" class="el-btn el-download" @click="exportFn">{{$t('totalInfo.download')}}csv</el-button>
                                </div>
                            </div>
                            <div class="table">
                                <el-table :data="detailInfo.trades" style="width: 100%"  key='firstTable'  size="mini" :row-class-name="tableRowClassName">
                                    <el-table-column :label='$t("totalInfo.txHash")'  width='250'>
                                        <template slot-scope="scope">
                                            <div class='flex-special'>
                                                <el-tooltip class="item" effect="dark"  placement="bottom"  v-if='scope.row.txReceiptStatus==0'>
                                                    <div slot="content"><span class='title-warning'>Warning：</span>{{scope.row.failReason}}</div>
                                                    <i class="iconfont iconxinxi cursor">&#xe63f;</i>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" placement="top">
                                                    <div slot="content">{{scope.row.txHash}}</div>
                                                    <span class='cursor normal ellipsis' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                                                </el-tooltip>
                                            </div>
                                            <!-- <el-tooltip class="item" effect="dark"  placement="bottom"  v-if='scope.row.txReceiptStatus==0'>
                                                <div slot="content"><span class='title-warning'>Warning：</span>{{scope.row.failReason}}</div>
                                                <i class="iconfont iconxinxi cursor">&#xe63f;</i>
                                            </el-tooltip>
                                            <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span> -->
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label='$t("totalInfo.blockTime")' width='200'>
                                        <template slot-scope="scope">
                                            <span v-if='scope.row.txReceiptStatus == -1' class='pending'>({{$t('totalInfo.pending')}})</span>
                                            <span v-if='scope.row.txReceiptStatus == 0 || scope.row.txReceiptStatus == 1 '>{{new Date(scope.row.blockTime).Format('yyyy-MM-dd HH:mm:ss')}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label='$t("totalInfo.txType")' width='150'>
                                        <template slot-scope="scope">
                                            <span :class='{"border-abnormal":scope.row.from == address,"border-normal":scope.row.to == address}'>{{ $t('elseInfo.' + txTypeFn[scope.row.txType])}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label='$t("totalInfo.from")'  width='250'>
                                        <template slot-scope="scope">
                                            <div class='flex-special'>
                                                <el-tooltip class="item" effect="dark" placement="top">
                                                    <div slot="content">{{scope.row.from}}</div>
                                                    <span class='ellipsis' :class='[scope.row.from !== address ? "cursor normal":""]' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                                                </el-tooltip>
                                            </div>
                                            <!-- <span :class='[scope.row.from !== address ? "cursor normal":""]' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span> -->
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label='$t("totalInfo.to")' width='250'>
                                        <template slot-scope="scope">
                                            <!-- <div class='flex-special'>
                                                <span :title='$t("elseInfo.contract")' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                                <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                                <el-tooltip class="item" effect="dark" placement="top"  v-else-if='scope.row.txType == "transactionExecute"'>
                                                    <div slot="content">{{scope.row.to}}</div>
                                                    <span class='cursor normal ellipsis' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" placement="top"  v-else>
                                                    <div slot="content">{{scope.row.to}}</div>
                                                    <span class='ellipsis' :class='[scope.row.to !== address ? "cursor normal":""]' @click='goDetail1(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                                </el-tooltip>
                                            </div> -->
                                            <div class='flex-special'>
                                                <span :title='$t("elseInfo.contract")' v-if='scope.row.txType == "contractCreate" || scope.row.receiveType == "contract" ' class='margin5'><i class="iconfont iconcontract">&#xe63e;</i></span>
                                                <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                                <el-tooltip class="item" effect="dark" placement="top"  v-else-if='scope.row.receiveType == "contract"'>
                                                    <div slot="content">{{scope.row.to}}</div>
                                                    <span class='cursor normal ellipsis' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" placement="top"  v-else>
                                                    <div slot="content">{{scope.row.to}}</div>
                                                    <span class='ellipsis' :class='[scope.row.to !== address ? "cursor normal":""]' @click='goDetail1(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                                </el-tooltip>
                                            </div>
                                            <!-- <span :title='$t("elseInfo.contract")' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                            <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                            <span v-else-if='scope.row.txType == "transactionExecute"' class='cursor normal' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                            <span v-else :class='[scope.row.to !== address ? "cursor normal":""]' @click='goDetail1(scope.$index,scope.row)'>{{scope.row.to}}</span> -->
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label='$t("totalInfo.value")' show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <span>{{scope.row.value}}ATP</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label='$t("totalInfo.actualTxCost")' show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <span v-if='scope.row.txReceiptStatus == -1' class='pending'>({{$t('totalInfo.pending')}})</span>
                                            <span v-if='scope.row.txReceiptStatus == 0 || scope.row.txReceiptStatus == 1 '>{{scope.row.actualTxCost}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div v-if='activeTab == 2'></div>
                    </div>
                </div>
            </div>
        </div>
        <com-footer></com-footer>
    </div>
</template>
<script lang="ts">
    import Component from 'vue-class-component'
    import comHeader from '@/components/header/header.vue'
    import comFooter from '@/components/footer/footer.vue'
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    import contractService from '@/services/web3-services'
    export default {
        //组件名
        name: 'address-detail-wrap',
        //实例的数据对象
        data () {
            return {
                currentPage:null,
                pageSize:null,
                balance:'',
                count:0,
                activeTab:1,
                type:'transfer',
                typeList:[
                    {label:'transfer',value:'transfer'},
                    {label:'vote',value:'vote'},
                    {label:'contractCreate',value:'contractCreate'},
                    {label:'transactionExecute',value:'transactionExecute'},
                    {label:'MPCtransaction',value:'MPCtransaction'},
                ],
                txTypeFn: {
                    transfer : 'transfer',
                    MPCtransaction : 'MPCtransaction',
                    contractCreate : 'contractCreate',
                    vote : 'vote',
                    transactionExecute :'transactionExecute',
                    authorization :'authorization'
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
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {
            ...mapGetters(['chainId','chainHttp']),
        },
        //方法
        methods: {
             //将科学计数法转为数值
            toNonExponential(num){
                let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
                return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
            },
            searchFn(data){
                console.warn('子组件header向地址详情data>>>>',data)
                this.address = this.$route.query.address;
                this.detailInfo = data.struct;
                data.struct.trades.forEach(item => {
                    if (item.txReceiptStatus == -1) {
                        ++this.count;
                    }
                });
            },
            changeDataFn(){
                console.warn('子组件告诉地址详情链id更改》》》》')
                this.getDetail()
            },
            tableRowClassName({row, rowIndex}) {
                if(rowIndex%2 === 0) {
                    return 'even-row';
                }else{
                    return 'odd-row';
                }
            },
            changeTab(type) {
                this.activeTab = type;
            },
            onCopy() {
                this.$message.success(this.$t('modalInfo.copysuccess'));
            },
            onError() {
                this.$message.error(this.$t('modalInfo.copyfail'));
            },
            exportFn() {
                //跳转至下载页
                const {href} = this.$router.resolve({
                    path:'/download',
                    query:{
                        address:this.address,
                        description: this.description,
                        exportname:'account'
                    }
                })
                window.open(href,'_blank')
                // this.$router.push({
                //     path:'/download',
                //     query:{
                //         address:this.address,
                //         description: this.description,
                //         exportname:'account'
                //     }
                // })
            },
            goTradeDetail(index, row) {
                if(row.txReceiptStatus == -1){
                    //待处理
                    this.$router.push({
                        path: '/trade-pending-detail',
                        query: {
                            txHash: row.txHash,
                            // description: 'pending',
                        },
                    });
                }else{
                    this.$router.push({
                        path: '/trade-detail',
                        query: {
                            txHash: row.txHash,
                            // description: 'trade',
                        },
                    });
                }
            },
            goAddressDetail(index, row) {
                if (row.from == this.address) {
                    return false;
                } else {
                    //改变
                    this.address = row.from;
                    this.$router.replace({
                        path: '/address-detail',
                        query: {
                            address: row.from,
                            description: this.description,
                        },
                    });
                    this.getDetail();
                }
            },
            goDetail(index, row) {
                //进入合约详情
                this.$router.push({
                    path: '/contract-detail',
                    query: {
                        address: row.to,
                        description: this.description,
                    },
                });
            },
            goDetail1(index, row) {
                if (row.to == this.address) {
                    return false;
                } else {
                    this.address = row.to;
                    this.$router.replace({
                        path: '/address-detail',
                        query: {
                            address: row.to,
                            description: this.description,
                        },
                    });
                    this.getDetail();
                }
            },
            //获取地址信息详情
            getDetail() {

                let param = {
                    // cid:'',
                    address: this.address,
                    txType: this.type,
                };
                console.warn('地址详情入参》》》》', param);
                apiService.trade
                    .addressDetails(param)
                    .then(res => {
                        let {errMsg, code, data} = res;
                        if (code == 0) {
                            this.detailInfo = data;
                            data.trades.forEach(item => {
                                if (item.txReceiptStatus == -1) {
                                    ++this.count;
                                }
                            });
                            //设置节点地址
                            contractService.serProvider(this.chainHttp)
                            //获取余额
                            // this.balance = contractService.getBalance('0x81e2233101cc64be1194b71973ba536a93bd998f')
                            this.balance = contractService.getBalance(this.address)
                        } else {
                            this.detailInfo = {};
                            this.$message.error(errMsg);
                        }
                    })
                    .catch(error => {
                        this.$message.error(error);
                    });
            },

        },
        //生命周期函数
        created() {
            this.currentPage=this.$route.query.currentPage;
            this.pageSize=this.$route.query.pageSize;
            this.address = this.$route.query.address;
            this.description = this.$route.query.description;
            this.descriptionProp = this.$route.query.description;
            //设置节点地址
            // contractService.serProvider(this.chainHttp)
            // console.log(1)
            //获取交易列表
            this.getDetail()
        },
        //监视
        watch: {
            // 'chainId':'getDetail'
        },
        //组件
        components: {
            comHeader,
            comFooter,
        },
    };
</script>
<style lang="less" scoped>
    .margin20{
        margin-right:20px;
    }
    .pending{
        font-size: 12px;
        color: #6D81A9;
    }
    .bottom{
        padding:26px 0 60px;
        .title{
            margin-bottom:40px;
            background: #0C1035;
            padding:20px 0;
            .record{
                height:36px;
                padding-left:20px;
                border-bottom:1px solid #151C45;
                display: flex;
                flex-direction: row;
                flex-wrap:nowrap;
                justify-content: flex-start;
                .left{
                    font-size: 14px;
                    color: #FFFFFF;
                    margin-right:20px;
                }
                .right{
                    width:430px;
                    height:26px;
                    padding-left:9px;
                    margin-top:4px;
                    background: rgba(48,56,104,0.30);
                    position: relative;
                    span{
                        letter-spacing: 0.8px;
                        color: #93A5C8;;
                        line-height:26px;
                        &:last-child{
                            position: absolute;
                            right:9px;
                        }
                    }
                }
            }
            .view{
                margin:30px 40px;
                margin-bottom:0;
                padding:10px;
                background: #0F133A;
                overflow:hidden;
                .left,.right{
                    width:50%;
                    .el-row{
                        margin-bottom:12px;
                    }
                }
                .left{
                    float:left;
                }
                .right{
                    float:right;
                }
                .row-title{
                    font-family: ArialMT;
                    color: #FFFFFF;
                }
                .el-col-4{
                    font-size: 12px;
                    color: #93A5C8;
                }
                .el-col-20{
                    font-size: 12px;
                    color: #D7DDE9;
                }
            }
        }
        .ul-nav{
            // height:34px;
            overflow:hidden;
            margin-bottom:16px;
            li{
                float:left;
                line-height:32px;
                padding:0 10px;
                color: #252C57;
                border: 1px solid #252C57;
                &:first-child{
                    border-right:none;
                }
            }
            .active{
                background: #252C57;
                color: #FFFFFF;
            }
            .left {
                float: left;
            }
            .right {
                float: right;
            }
        }
        .data-detail{
            .data{
                // padding:10px;
                .data-top{
                    height:34px;
                    line-height: 34px;
                    display: flex;
                    flex-wrap: nowrap;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-bottom:20px;
                    .search-address{
                        display: flex;
                        flex-wrap: nowrap;
                        flex-direction: row;
                        justify-content: flex-start;
                    }
                    .count{
                        color:#fff;
                    }
                    .types{
                        margin-right:10px;
                    }
                }
            }
        }
    }
    .time-and-number{
        position:relative;
        width:592px;
        height:48px;
        font-size:64px;
        line-height:30px;
        letter-spacing: 3.8px;
        color: #3c425d;
        opacity: 0.2;
    }
    .second-floor-text{
        position: absolute;
        top:125px;
        font-size:16px;
        line-height: 16px;
        color: #ffffff;
        opacity: 1;
        letter-spacing: 1px;
    }
</style>
<style lang='less'>
    .search-address{
        .el-input--suffix .el-input__inner{
            // border: 1px solid #12183D;
            font-size: 12px;
            // color: #7988AB;
            line-height: 34px;
            height: 34px;
        }
        .el-download{
            height:34px;
            // line-height:34px;
            padding:0 10px;
            border:none;
        }
    }
</style>

