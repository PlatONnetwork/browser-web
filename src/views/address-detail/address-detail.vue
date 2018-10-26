<template>
    <div class="address-detail-wrap">
        <div class="content-area">
            <v-menu :descriptionProp='descriptionProp'>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: pathFn[description] }" v-if='description'>{{descripFn[description]}}</el-breadcrumb-item>
                    <el-breadcrumb-item>地址信息</el-breadcrumb-item>
                </el-breadcrumb>
            </v-menu>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <span>地址#{{address}}</span>
                        <span
                            v-clipboard:copy="address"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                        >
                            <i class='el-icon-tickets cursor'></i>
                        </span>
                    </div>
                    <div class="view">
                        <div class="left">
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>概览</span>
                                </el-col>
                                <el-col :span="20"></el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>余额</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.balance}}ATP</span>
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
                                    <span>投票</span>
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
                    <div class="header-nav">
                        <ul>
                            <li :class="{active: activeTab == 1}" @click="changeTab(1)">交易</li>
                            <li :class="{active: activeTab == 2}" @click="changeTab(2)">投票</li>
                        </ul>
                    </div>
                    <div class="data">
                        <div v-if='activeTab == 1'>
                            <div class='data-top'>
                                <div>1个待处理交易</div>
                                <div class='search'>
                                    <el-select v-model="type"  class="margin10">
                                        <el-option
                                            v-for="item in typeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-button type="primary" class="el-btn" @click="exportFn">下载csv</el-button>
                                </div>
                            </div>
                            <div class="table">
                                <el-table :data="detailInfo.trades" style="width: 100%"    stripe border class='item-table'  key='firstTable'  size="mini">
                                    <el-table-column label="交易哈希值">
                                        <template slot-scope="scope">
                                            <span v-if='scope.row.txReceiptStatus==0' :title='scope.row.failReason'><i class="el-icon-warning"></i></span>
                                            <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="确认时间">
                                        <template slot-scope="scope">
                                            <span v-if='scope.row.txReceiptStatus == -1'>(待处理）</span>
                                            <span v-if='scope.row.txReceiptStatus == 0 || scope.row.txReceiptStatus == 1 ' class='cursor normal'>{{scope.row.blockTime}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  label="类型">
                                        <template slot-scope="scope">
                                            <span :class='{"border-abnormal":scope.row.from == address,"border-normal":scope.row.to == address}'>{{txTypeFn[scope.row.txType]}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  label="发送方">
                                        <template slot-scope="scope">
                                            <span :class='[scope.row.from !== address ? "cursor normal":""]' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="接收方">
                                        <template slot-scope="scope">
                                            <span title='合约' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="el-icon-edit"></i></span>
                                            <span v-if='scope.row.txType == "contractCreate"'>合约创建</span>
                                            <span v-else-if='scope.row.txType == "transactionExecute"' class='cursor normal' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                            <span v-else :class='[scope.row.to !== address ? "cursor normal":""]' @click='goDetail1(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop=""  label="数额">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.value}}ATP</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  label="交易费用">
                                        <template slot-scope="scope">
                                            <span v-if='scope.row.txReceiptStatus == -1'>(待处理）</span>
                                            <span v-if='scope.row.txReceiptStatus == 0 || scope.row.txReceiptStatus == 1 ' class='cursor normal'>{{scope.row.actualTxCoast}}</span>
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
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import menu from '@/components/menu/index.vue'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    export default {
        //组件名
        name: 'address-detail-wrap',
        //实例的数据对象
        data () {
            return {
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
            ...mapGetters(['chainId']),
        },
        //方法
        methods: {
            changeTab(type){
                this.activeTab=type
            },
            onCopy(){
                this.$message.success('已复制到剪贴板')
            },
            onError(){
                this.$message.error('复制失败')
            },
            exportFn(){

            },
            goTradeDetail(index,row){
                if(this.description=='trade'){
                    this.$router.push({
                        path:'/trade-detail',
                        query:{
                            txHash:row.txHash
                        }
                    })
                }else if(this.description=='pending'){
                    this.$router.push({
                        path:'/trade-pending-detail',
                        query:{
                            txHash:row.txHash
                        }
                    })
                }
            },
            goAddressDetail(index,row){
                if(row.from == this.address){
                    return false;
                }else{
                    //改变
                    this.address = row.from
                    this.$router.replace({
                        path:'/address-detail',
                        query:{
                            address:row.from,
                            description:this.description
                        }
                    })
                    this.getDetail()
                }
            },
            goDetail(index,row){
                //进入合约详情
                this.$router.push({
                    path:'/contract-detail',
                    query:{
                        address:row.to,
                        description:this.description
                    }
                })
            },
            goDetail1(index,row){
                if(row.to == this.address){
                    return false;
                }else{
                    this.address = row.to
                    this.$router.replace({
                        path:'/address-detail',
                        query:{
                            address:row.to,
                            description:this.description
                        }
                    })
                    this.getDetail()
                }
            },
            //获取地址信息详情
            getDetail(){
                let param = {
                    // cid:'',
                    address:this.address,
                    txType:this.type
                }
                console.warn('地址详情入参》》》》',param)
                apiService.trade.addressDetails(param).then((res)=>{
                    let {errMsg,code,data}= res
                    if(code==0){
                       this.detailInfo=data
                       data.trades.forEach((item)=>{
                            if(item.txReceiptStatus==-1){
                                ++this.count
                            }
                       })
                    }else{
                        this.detailInfo={}
                        this.$message.error(errMsg)
                    }
                }).catch((error)=>{
                    this.$message.error(error)
                })
            }
        },
        //生命周期函数
        created(){
            this.address=this.$route.query.address
            this.description=this.$route.query.description
            this.descriptionProp=this.$route.query.description
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
            'v-menu':menu
        }
    }
</script>
<style lang="less" scoped>
    .bottom{
        padding:20px 0;
        .title{
            margin-bottom:20px;
            .record{
               height:40px;
                line-height:40px;
                font-weight:600;
            }
            .view{
                overflow:hidden;
                .left,.right{
                    width:50%;
                    .el-row{
                        margin-bottom:10px;
                    }
                }
                .left{
                    float:left;
                }
                .right{
                    float:right;
                }
            }
        }
        .data-detail{
            .data{
                padding:10px;
                .data-top{
                    height:40px;
                    line-height: 40px;
                    display: flex;
                    flex-wrap: nowrap;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-bottom:10px;
                    .search{
                        display: flex;
                        flex-wrap: nowrap;
                        flex-direction: row;
                        justify-content: flex-start;
                    }
                }
            }
        }
    }
</style>

