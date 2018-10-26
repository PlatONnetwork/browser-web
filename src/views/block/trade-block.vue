<template>
    <div class="trade-block-wrap">
        <div class="content-area">
            <v-menu :descriptionProp='descriptionProp'>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>交易-区块#{{height}}</el-breadcrumb-item>
                </el-breadcrumb>
            </v-menu>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <span>总共{{pageTotal}}交易</span>
                    </div>
                    <div class="pagination-box1">
                        <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-sizes="[10, 20, 50, 100]"
                            layout="prev, pager, next"
                            :pager-count="9">
                        </el-pagination>
                    </div>
                </div>
                <div class="table">
                    <el-table :data="tableData" style="width: 100%"    stripe border class='item-table'  key='firstTable'  size="mini">
                        <el-table-column label="交易哈希值">
                            <template slot-scope="scope">
                                <span v-if='scope.row.txReceiptStatus==0' :title='scope.row.failReason'><i class="el-icon-warning"></i></span>
                                <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="blockHeight" label="区块">
                            <template slot-scope="scope">
                                <span class='cursor normal' @click='goBlockDetail(scope.$index,scope.row)'>{{scope.row.blockHeight}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="块龄">
                            <template slot-scope="scope">
                                <span>{{scope.row.serverTime-scope.row.blockTime}}秒</span>
                            </template>
                        </el-table-column>
                        <el-table-column  label="发送方">
                            <template slot-scope="scope">
                                <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="接收方">
                            <template slot-scope="scope">
                                <span title='合约' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="el-icon-edit"></i></span>
                                <span v-if='scope.row.txType == "contractCreate"'>合约创建</span>
                                <span v-if='scope.row.txType !== "contractCreate"'  class='cursor normal' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  prop=""  label="数额">
                            <template slot-scope="scope">
                                <span>{{scope.row.value}}ATP</span>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="actualTxCoast"  label="交易费用"></el-table-column>
                    </el-table>
                    <div class="pagination-box" v-if='paginationFlag'>
                        <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="pageSize"
                            layout="sizes,total,  prev, pager, next"
                            :total="pageTotal"
                            :pager-count="9">
                        </el-pagination>
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
        name: 'trade-block-wrap',
        //实例的数据对象
        data () {
            return {
                height:'',
                newRecordFlag:false,
                paginationFlag:true,
                tableData:[
                    {
                        "txHash": "0x234234",//交易hash
                        "blockHeight": "15566",//交易所在区块高度
                        "blockTime": 18080899999,//出块时间
                        "from": "0x667766",//发送方
                        "to": "0x667766",//接收方
                        "value": "222",//数额
                        "actualTxCoast": "22",//交易费用
                        "txReceiptStatus": 1,//交易状态 -1 pending 1 成功  0 失败
                        "txType": "contractCreate", // 交易类型
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
                        "blockHeight": "15566",//交易所在区块高度
                        "blockTime": 18080899999,//出块时间
                        "from": "0x667766",//发送方
                        "to": "0x667766",//接收方
                        "value": "222",//数额
                        "actualTxCoast": "22",//交易费用
                        "txReceiptStatus": 0,//交易状态 -1 pending 1 成功  0 失败
                        "txType": "transactionExecute", // 交易类型
                            // transfer ：转账
                            // MPCtransaction ： MPC交易
                            // contractCreate ： 合约创建
                            // vote ： 投票
                            // transactionExecute ： 合约执行
                            // authorization ： 权限
                        "serverTime": 1123123,//服务器时间
                        "failReason":"就不告诉你哈哈哈哈"//失败原因
                    },
                    {
                        "txHash": "0x234234",//交易hash
                        "blockHeight": "15566",//交易所在区块高度
                        "blockTime": 18080899999,//出块时间
                        "from": "0x667766",//发送方
                        "to": "0x667766",//接收方
                        "value": "222",//数额
                        "actualTxCoast": "22",//交易费用
                        "txReceiptStatus": 0,//交易状态 -1 pending 1 成功  0 失败
                        "txType": "transfer", // 交易类型
                            // transfer ：转账
                            // MPCtransaction ： MPC交易
                            // contractCreate ： 合约创建
                            // vote ： 投票
                            // transactionExecute ： 合约执行
                            // authorization ： 权限
                        "serverTime": 1123123,//服务器时间
                        "failReason":"就不告诉你哈哈哈哈"//失败原因
                    }
                ],
                currentPage:1,
                pageSize:10,
                pageTotal:0,
                currentPage1:1,
                descriptionProp:'block'
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
            //查询
            searchFn(){

            },
            handleCurrentChange(val){
                this.currentPage = val
                this.getTradeList()
            },
            handleSizeChange(val){
                this.pageSize = val
                this.getTradeList()
            },
            // handleCurrentChange1(val){
            //     this.currentPage1 = val
            //     let param = {
            //         cid:'',
            //         pageNo:this.currentPage1,
            //         pageSize:this.pageSize
            //     }
            //     apiService.trade.transactionList(param).then((res)=>{
            //         let {data,totalPages,totalCount,code,errMsg}=res
            //         if(code==0){
            //             this.tableData = data
            //             this.pageTotal = totalCount
            //         }else{
            //             this.$message.error(errMsg)
            //         }
            //     }).catch((error)=>{
            //         this.$message.error(error)
            //     })
            // },
            //获取交易列表 下分页
            getTradeList(){
                let param = {
                    // cid:'',
                    height:this.height,
                    pageNo:this.currentPage,
                    pageSize:this.pageSize
                }
                console.warn('获取区块交易列表》》》',param)
                apiService.trade.blockTransaction(param).then((res)=>{
                    let {data,totalPages,totalCount,code,errMsg}=res
                    if(code==0){
                        this.tableData = data
                        this.pageTotal = totalCount
                        //判断是否就是一页  一页的话只显示上面的分页  多页的话上下两个分页都显示  页数
                        totalPages==1?this.paginationFlag=false:this.paginationFlag=true
                    }else{
                        this.$message.error(errMsg)
                    }
                }).catch((error)=>{
                    this.$message.error(error)
                })
            },
            //进入区块详情
            goBlockDetail(index,row){
                this.$router.push({
                    path:'/block-detail',
                    query:{
                        height:row.blockHeight
                    }
                })
            },
            //进入交易哈希详情
            goTradeDetail(index,row){
                this.$router.push({
                    path:'/trade-detail',
                    query:{
                        txHash:row.txHash
                    }
                })
            },
            //进入钱包地址详情
            goAddressDetail(index,row){
                this.$router.push({
                    path:'/address-detail',
                    query:{
                        address:row.from,
                        description:'block'
                    }
                })
            },
            //进入钱包地址详情或者合约详情
            goDetail(index,row){
                if(row.txType=='transactionExecute'){
                    //进入合约详情
                    this.$router.push({
                        path:'/contract-detail',
                        query:{
                            address:row.to,
                            description:'block'
                        }
                    })
                }else{
                    //进入钱包地址详情
                    this.$router.push({
                        path:'/address-detail',
                        query:{
                            address:row.to,
                            description:'block'
                        }
                    })
                }
            },
        },
        //生命周期函数
        created(){
            this.height = this.$route.query.height
            //获取交易列表
            this.getTradeList()
        },
        //监视
        watch: {
            'chainId':'getTradeList'
        },
        //组件
        components: {
            'v-menu':menu
        }
    }
</script>
<style lang="less" scoped>
    .trade-block-wrap{
        .bottom{
            padding:20px 0;
            .title{
                margin-bottom:20px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
            }
        }
    }
</style>

