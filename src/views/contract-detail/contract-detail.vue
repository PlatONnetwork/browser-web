<template>
    <div class="contract-detail-wrap">
        <com-header :descriptionProp='descriptionProp' @searchFn='searchFn' @changeDataFn='changeDataFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Address Info
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}}</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: pathFn[description],query:{
                        currentPage:currentPage,
                        pageSize:pageSize
                    } }" v-if='description !== ""'>{{ $t('breadCrumb.' + descripFn[description]) }}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{$t('totalInfo.info1')}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <div class='left'>Address</div>
                        <div class='right'>
                            <span>#{{address}}</span>
                            <span
                                v-clipboard:copy="address"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                            >
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
                                    <span>{{detailInfo.balance}} Energon</span>
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
                                    <span  class='row-title'>{{$t('totalInfo.else')}}</span>
                                </el-col>
                                <el-col :span="20"></el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('totalInfo.contractcreator')}}</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.developer?detailInfo.developer:'unkonwn'}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('totalInfo.contractowner')}}</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.ownerCount}}</span>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div class="data-detail">
                    <ul class="ul-nav">
                        <li :class="{active: activeTab == 1}">{{$t('totalInfo.transactions')}}</li>
                            <!-- <li :class="{active: activeTab == 2}" @click="changeTab(2)">投票</li> -->
                    </ul>
                    <div class="data">
                        <div v-if='activeTab == 1'>
                            <div class='data-top'>
                                <div class='count'>{{count}}&nbsp;{{$t('totalInfo.pendtransaction')}}</div>
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
                                    <el-table-column :label='$t("totalInfo.txHash")'  >
                                        <template slot-scope="scope">
                                            <div class='flex-special'>
                                                <el-tooltip class="item" effect="dark"  placement="bottom"  v-if='scope.row.txReceiptStatus==0'>
                                                    <div slot="content"><span class='title-warning'>Warning：</span>{{scope.row.failReason}}</div>
                                                    <i class="iconfont iconxinxi cursor">&#xe63f;</i>
                                                </el-tooltip>
                                                <!-- <el-tooltip class="item" effect="dark" placement="top">
                                                    <div slot="content">{{scope.row.txHash}}</div>
                                                    <span class='cursor normal ellipsis' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                                                </el-tooltip> -->
                                                <span class='cursor normal ellipsis' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                                            </div>
                                            <!-- <el-tooltip class="item" effect="dark"  placement="bottom"  v-if='scope.row.txReceiptStatus==0'>
                                                <div slot="content"><span class='title-warning'>Warning：</span>{{scope.row.failReason}}</div>
                                                <i class="iconfont iconxinxi cursor">&#xe63f;</i>
                                            </el-tooltip>
                                            <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span> -->
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label='$t("totalInfo.blockTime")' width='160'>
                                        <template slot-scope="scope">
                                            <span v-if='scope.row.txReceiptStatus == -1' class='pending'>({{$t('totalInfo.pending')}})</span>
                                            <span v-if='scope.row.txReceiptStatus == 0 || scope.row.txReceiptStatus == 1 '>{{new Date(scope.row.blockTime).Format('yyyy-MM-dd HH:mm:ss')}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label='$t("totalInfo.txType")'  :width="currentScreenWidth<1480? 100:140">
                                        <template slot-scope="scope">
                                            <span :class='{"border-abnormal":scope.row.from == address,"border-normal":scope.row.to == address}'>{{ $t('elseInfo.' + txTypeFn[scope.row.txType])}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label='$t("totalInfo.from")'   :width="currentScreenWidth<1480? 220:300">
                                        <template slot-scope="scope">
                                            <div class='flex-special'>
                                                <!-- <el-tooltip class="item" effect="dark" placement="top">
                                                    <div slot="content">{{scope.row.from}}</div>
                                                    <span class='ellipsis' :class='[scope.row.from !== address ? "cursor normal":""]' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                                                </el-tooltip> -->
                                                <span class='ellipsis' :class='[scope.row.from !== address ? "cursor normal":""]' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                                            </div>
                                            <!-- <span :class='[scope.row.from !== address ? "cursor normal":""]' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span> -->
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label='$t("totalInfo.to")'  :width="currentScreenWidth<1480? 220:300">
                                        <template slot-scope="scope">
                                            <!-- <div class='flex-special'>
                                                <span :title='$t("elseInfo.contract")' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                                <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                                <el-tooltip class="item" effect="dark" placement="top"  v-else>
                                                    <div slot="content">{{scope.row.to}}</div>
                                                    <span class='ellipsis' :class='[scope.row.to !== address ? "cursor normal":""]' @click='goDetail1(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                                </el-tooltip>
                                            </div> -->
                                            <div class='flex-special'>
                                                <span :title='$t("elseInfo.contract")' v-if='scope.row.receiveType == "contract" || scope.row.to == "0x1000000000000000000000000000000000000001" || scope.row.to == "0x1000000000000000000000000000000000000002"' class='margin5'><i class="iconfont iconcontract">&#xe63e;</i></span>
                                                <!-- <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span> -->
                                                <span v-if='!scope.row.to'>{{$t('elseInfo.create')}}</span>
                                                <!-- <el-tooltip class="item" effect="dark" placement="top"  v-else>
                                                    <div slot="content">{{scope.row.to}}</div>
                                                    <span class='ellipsis' :class='[scope.row.to !== address ? "cursor normal":""]' @click='goDetail1(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                                </el-tooltip> -->
                                                <span class='ellipsis' :class='[scope.row.to !== address ? "cursor normal":""]' @click='goDetail1(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                            </div>
                                            <!-- <span :title='$t("elseInfo.contract")' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                            <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                            <span v-else :class='[scope.row.to !== address ? "cursor normal":""]' @click='goDetail1(scope.$index,scope.row)'>{{scope.row.to}}</span> -->
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label='$t("totalInfo.value")'  width="200px">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.value}} Energon</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label='$t("totalInfo.actualTxCost")'  width="150px">
                                        <template slot-scope="scope">
                                            <span v-if='scope.row.txReceiptStatus == -1' class='pending'>({{$t('totalInfo.pending')}})</span>
                                            <span v-if='scope.row.txReceiptStatus == 0 || scope.row.txReceiptStatus == 1 '>{{scope.row.actualTxCost}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <!-- <div v-if='activeTab == 2'></div> -->
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
        name: 'contract-detail-wrap',
        //实例的数据对象
        data () {
            return {
                currentScreenWidth:0,
                currentPage:null,
                pageSize:null,
                balance:'',
                count:0,
                activeTab:1,
                type:'transfer',
                typeList:[
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
                    voteTicket : 'voteTicket',
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
            searchFn(data){
                console.warn('子组件header向合约详情data>>>>',data)
                this.address = this.$route.query.address;
                this.detailInfo = data.struct;
                data.struct.trades.forEach(item => {
                    if (item.txReceiptStatus == -1) {
                        ++this.count;
                    }
                });
            },
            changeDataFn(){
                console.warn('子组件告诉合约详情链id更改》》》》')
                this.getDetail();
            },
            tableRowClassName({row, rowIndex}) {
                if(rowIndex%2 === 0) {
                    return 'even-row';
                }else{
                    return 'odd-row';
                }
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
                        exportname:'contract'
                    }
                })
                // this.$router.push({
                //     path:'/download',
                //     query:{
                //         address:this.address,
                //         description: this.description,
                //         exportname:'contract'
                //     }
                // })
                window.open(href,'_blank')
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
                // if (this.description == 'trade') {
                //     this.$router.push({
                //         path: '/trade-detail',
                //         query: {
                //             txHash: row.txHash,
                //         },
                //     });
                // } else if (this.description == 'pending') {
                //     this.$router.push({
                //         path: '/trade-pending-detail',
                //         query: {
                //             txHash: row.txHash,
                //         },
                //     });
                // }
            },
            goAddressDetail(index, row) {
                if (row.from == this.address) {
                    return false;
                } else {
                    this.$router.push({
                        path: '/address-detail',
                        query: {
                            address: row.from,
                            description: this.description,
                        },
                    });
                }
            },
            goDetail1(index, row) {
                if (row.to == this.address) {
                    return false;
                } else {
                    if (row.receiveType == 'contract') {
                        //进入合约详情
                        this.address = row.to;
                        this.$router.replace({
                            path: '/contract-detail',
                            query: {
                                address: row.to,
                                description: this.description,
                            },
                        });
                        this.getDetail();
                    } else {
                        //进入地址详情
                        this.$router.push({
                            path: '/address-detail',
                            query: {
                                address: row.to,
                                description: this.description,
                            },
                        });
                    }
                }
            },
            //获取地址信息详情
            getDetail() {

                let param = {
                    // cid:'',
                    address: this.address,
                    txType: this.type,
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
                            //设置节点地址
                            // contractService.serProvider(this.chainHttp)
                            //获取余额
                            // this.balance = contractService.getBalance('0x81e2233101cc64be1194b71973ba536a93bd998f')
                            // this.balance = contractService.getBalance(this.address)
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
            //获取交易列表
            this.getDetail();
            //获取当前屏幕尺寸
            this.currentScreenWidth = document.body.clientWidth;
        },
        watch: {
            // chainId: 'getDetail',
        },
        //组件
        components: {
            comHeader,
            comFooter
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
            padding:0 0 20px 0;
            .record{
                height:56px;
                padding-left:20px;
                border-bottom:1px solid #151C45;
                display: flex;
                flex-direction: row;
                flex-wrap:nowrap;
                justify-content: flex-start;
                align-items: center;
                .left{
                    font-size: 14px;
                    color: #FFFFFF;
                    margin-right:20px;
                }
                .right{
                    // margin-top:4px;
                    width:430px;
                    height:26px;
                    padding-left:9px;
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
    .el-popper{
        background: #0E1438;
        border: 1px solid rgba(180,185,194,0.20);
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
    }
    .el-popper[x-placement^="bottom"] .popper__arrow::after{
        top:0;
        border-bottom-color:transparent;
    }
    .el-select-dropdown__item{
        color: #8D9BB8;
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
        background: #1F254C;
        color: #8D9BB8;
    }
    .el-select-dropdown__item.selected{
        background: #0F83CD;
        color: #FFFFFF;
    }
</style>
