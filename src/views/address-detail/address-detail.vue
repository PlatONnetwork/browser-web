<template>
    <div class="address-detail-wrap">
        <com-header :descriptionProp='descriptionProp'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Address Info
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: pathFn[description] }" v-if='description'>{{descripFn[description]}}</el-breadcrumb-item>
                        <el-breadcrumb-item>地址信息</el-breadcrumb-item>
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
                                    <span class='row-title'>概览</span>
                                </el-col>
                                <el-col :span="20"></el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>余额</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{balance}}ATP</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>交易</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.tradeCount}}</span>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="right">
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span class='row-title'>投票</span>
                                </el-col>
                                <el-col :span="20"></el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>投票质押</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.votePledge}}ATP</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>投票节点数</span>
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
                        <li :class="{active: activeTab == 1}" @click="changeTab(1)">交易</li>
                        <li :class="{active: activeTab == 2}" @click="changeTab(2)">投票</li>
                    </ul>
                    <div class="data">
                        <div v-if='activeTab == 1'>
                            <div class='data-top'>
                                <div class='count'>{{count}}个待处理交易</div>
                                <div class='search-address'>
                                    <span class='count types'>Type：</span>
                                    <el-select v-model="type"  class="margin20" style='width:150px;' @change='getDetail'>
                                        <el-option
                                            v-for="item in typeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-button type="primary" class="el-btn el-download" @click="exportFn">下载csv</el-button>
                                </div>
                            </div>
                            <div class="table">
                                <el-table :data="detailInfo.trades" style="width: 100%"  key='firstTable'  size="mini" :row-class-name="tableRowClassName">
                                    <el-table-column label="交易哈希值">
                                        <template slot-scope="scope">
                                            <span v-if='scope.row.txReceiptStatus==0' :title='scope.row.failReason'  class='cursor'><i class="iconfont iconxinxi">&#xe63f;</i></span>
                                            <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="确认时间">
                                        <template slot-scope="scope">
                                            <span v-if='scope.row.txReceiptStatus == -1' class='pending'>(待处理）</span>
                                            <span v-if='scope.row.txReceiptStatus == 0 || scope.row.txReceiptStatus == 1 '>{{scope.row.blockTime}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="类型">
                                        <template slot-scope="scope">
                                            <span :class='{"border-abnormal":scope.row.from == address,"border-normal":scope.row.to == address}'>{{txTypeFn[scope.row.txType]}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="发送方">
                                        <template slot-scope="scope">
                                            <span :class='[scope.row.from !== address ? "cursor normal":""]' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="接收方">
                                        <template slot-scope="scope">
                                            <span title='合约' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                            <span v-if='scope.row.txType == "contractCreate"'>合约创建</span>
                                            <span v-else-if='scope.row.txType == "transactionExecute"' class='cursor normal' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                            <span v-else :class='[scope.row.to !== address ? "cursor normal":""]' @click='goDetail1(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="" label="数额">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.value}}ATP</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="交易费用">
                                        <template slot-scope="scope">
                                            <span v-if='scope.row.txReceiptStatus == -1' class='pending'>(待处理）</span>
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
    import menu from '@/components/menu/index.vue'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    import contractService from '@/services/web3-services'
    export default {
        //组件名
        name: 'address-detail-wrap',
        //实例的数据对象
        data () {
            return {
                balance:'',
                count:0,
                activeTab:1,
                type:'transfer',
                typeList:[
                    {label:'转账',value:'transfer'},
                    {label:'投票',value:'vote'},
                    {label:'合约创建',value:'contractCreate'},
                    {label:'合约执行',value:'transactionExecute'},
                    {label:'MPC交易',value:'MPCtransaction'},
                ],
                txTypeFn: {
                    transfer : '转账',
                    MPCtransaction : 'MPC交易',
                    contractCreate : '合约创建',
                    vote : '投票',
                    transactionExecute :'合约执行',
                    authorization :'权限'
                },
                address:'',
                detailInfo:{
                    "balance":131, // 余额
                    "tradeCount":236, // 交易数
                    "votePledge":131, // 投票质押
                    "nodeCount":3, // 投票节点数
                    "trades":[
                        {
                           "txHash": "0x234234",//交易hash
                           "blockTime": 18080899999,//确认时间(出块时间)
                           "from": "11111",//发送方
                           "to": "0x667766",//接收方
                           "value": "222",//数额
                           "actualTxCoast": "22",//交易费用
                           "txReceiptStatus": -1,//交易状态 -1 pending 1 成功  0 失败
                           "txType": "transactionExecute", // 交易类型
                                     // transfer ：转账
                                     // MPCtransaction ： MPC交易
                                     // contractCreate ： 合约创建
                                     // vote ： 投票
                                     // transactionExecute ： 合约执行
                                     // authorization ： 权限
                           "serverTime": 1123123,//服务器时间
                           "failReason":""//失败原因
                        },
                        {
                           "txHash": "0x234234",//交易hash
                           "blockTime": 18080899999,//确认时间(出块时间)
                           "from": "11111",//发送方
                           "to": "0x667766",//接收方
                           "value": "222",//数额
                           "actualTxCoast": "22",//交易费用
                           "txReceiptStatus": -1,//交易状态 -1 pending 1 成功  0 失败
                           "txType": "transfer", // 交易类型
                                     // transfer ：转账
                                     // MPCtransaction ： MPC交易
                                     // contractCreate ： 合约创建
                                     // vote ： 投票
                                     // transactionExecute ： 合约执行
                                     // authorization ： 权限
                           "serverTime": 1123123,//服务器时间
                           "failReason":""//失败原因
                        }
                    ]
                },
                descripFn: {
                    pending : '待处理交易',
                    trade : '交易',
                    block:'区块'
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
                this.$message.success('已复制到剪贴板');
            },
            onError() {
                this.$message.error('复制失败');
            },
            exportFn() {
                //跳转至下载页
                this.$router.push({
                    path:'/download',
                    query:{
                        address:this.address,
                        description: this.description,
                    }
                })
            },
            goTradeDetail(index, row) {
                if (this.description == 'trade') {
                    this.$router.push({
                        path: '/trade-detail',
                        query: {
                            txHash: row.txHash,
                        },
                    });
                } else if (this.description == 'pending') {
                    this.$router.push({
                        path: '/trade-pending-detail',
                        query: {
                            txHash: row.txHash,
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
                //设置节点地址
                contractService.serProvider(this.chainHttp)
                //获取余额
                this.balance = contractService.getBalance('0x81e2233101cc64be1194b71973ba536a93bd998f')
                // this.balance = contractService.getBalance(this.address)
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
            'chainId':'getDetail'
        },
        //组件
        components: {
            'v-menu': menu,
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
        padding:26px 0 40px;
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
                    margin-top:4px;
                    width:380px;
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

