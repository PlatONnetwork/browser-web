<template>
    <div class="pend-wrap">
        <com-header :descriptionProp='descriptionProp'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Transactions
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>待处理的交易</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <span>总共寻获{{pageTotal}}待处理交易</span>
                    </div>
                    <div class="pagination-box1">
                        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" layout="prev, pager, next" :page-size="pageSize" :total="pageTotal" :pager-count="9">
                        </el-pagination>
                    </div>
                </div>
                <div class="table">
                    <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini" :row-class-name="tableRowClassName">
                        <el-table-column label="交易哈希值">
                            <template slot-scope="scope">
                                <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="停留时间">
                            <template slot-scope="scope">
                                <!-- <span>{{scope.row.dwellTime/60}}秒</span> -->
                                <span>{{timeDiffFn(scope.row.serverTime,scope.row.timestamp)}}前</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="能量限制">
                            <template slot-scope="scope">
                                <!-- <span v-if='scope.row.energonLimit>100' title='超过能量限制，可能无法验证成功！'><i class="el-icon-warning"></i></span> -->
                                <span>{{scope.row.energonLimit}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="能量价值">
                            <template slot-scope="scope">
                                <span>{{scope.row.energonPrice}}Ene</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="发送方">
                            <template slot-scope="scope">
                                <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                                <span @click='filterFn(scope.row.from)' class='cursor'><i class="iconfont iconfilter">&#xe641;</i></span>
                            </template>
                        </el-table-column>
                        <el-table-column label="">
                            <template slot-scope="scope">
                                <span>
                                    <i class='iconfont icon--icon-to iconto'></i>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="接收方">
                            <template slot-scope="scope">
                                <span title='合约' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                <span v-if='scope.row.txType == "contractCreate"'>合约创建</span>
                                <span v-if='scope.row.txType !== "contractCreate"' class='cursor normal' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                <span v-if='scope.row.txType !== "contractCreate"' @click='filterFn(scope.row.to)' class='cursor'><i class="iconfont iconfilter">&#xe641;</i></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="数额">
                            <template slot-scope="scope">
                                <span>{{scope.row.value}}ATP</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-box" v-if='paginationFlag'>
                        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes,total,  prev, pager, next" :total="pageTotal" :pager-count="9">
                        </el-pagination>
                    </div>
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
import menu from '@/components/menu/index.vue';
import { timeDiff } from '@/services/time-services';
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
export default {
    //组件名
    name: 'pend-wrap',
    //实例的数据对象
    data() {
        return {
            paginationFlag: true,
            tableData: [
                {
                    txHash: '0x234234', //交易hash
                    dwellTime: 33, // 停留时间=服务器时间-交易接收时间
                    energonLimit: 55555, //能量限制
                    energonPrice: 55555, //能量价格
                    from: '0x667766', //发送方
                    to: '0x667766', //接收方
                    value: '222', //数额
                    txType: 'contractCreate', // 交易类型
                    // transfer ：转账
                    // MPCtransaction ： MPC交易
                    // contractCreate ： 合约创建
                    // vote ： 投票
                    // transactionExecute ： 合约执行
                    // authorization ： 权限
                    serverTime: 1123123, //服务器时间
                },
                {
                    txHash: '0x234234', //交易hash
                    dwellTime: 33, // 停留时间=服务器时间-交易接收时间
                    energonLimit: 55555, //能量限制
                    energonPrice: 55555, //能量价格
                    from: '0x667766', //发送方
                    to: '0x667766', //接收方
                    value: '222', //数额
                    txType: 'transfer', // 交易类型
                    // transfer ：转账
                    // MPCtransaction ： MPC交易
                    // contractCreate ： 合约创建
                    // vote ： 投票
                    // transactionExecute ： 合约执行
                    // authorization ： 权限
                    serverTime: 1123123, //服务器时间
                },
                {
                    txHash: '0x234234', //交易hash
                    dwellTime: 33, // 停留时间=服务器时间-交易接收时间
                    energonLimit: 55555, //能量限制
                    energonPrice: 55555, //能量价格
                    from: '0x667766', //发送方
                    to: '0x667766', //接收方
                    value: '222', //数额
                    txType: 'transactionExecute', // 交易类型
                    // transfer ：转账
                    // MPCtransaction ： MPC交易
                    // contractCreate ： 合约创建
                    // vote ： 投票
                    // transactionExecute ： 合约执行
                    // authorization ： 权限
                    serverTime: 1123123, //服务器时间
                },
            ],
            currentPage: 1,
            pageSize: 10,
            pageTotal: 0,
            currentPage1: 1,
            descriptionProp: 'pending',
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
        //查询
        searchFn() {},
        timeDiffFn(beginTime,endTime){
            return timeDiff(beginTime,endTime)
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex % 2 === 0) {
                return 'even-row';
            } else {
                return 'odd-row';
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTradeList();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getTradeList();
        },
        // handleCurrentChange1(val){
        //     this.currentPage1 = val
        //     let param = {
        //         cid:'',
        //         pageNo:this.currentPage1,
        //         pageSize:this.pageSize
        //     }
        //     apiService.trade.pendingList(param).then((res)=>{
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
        getTradeList() {
            let param = {
                // cid:'',
                pageNo: this.currentPage,
                pageSize: this.pageSize,
            };
            console.warn('获取待处理页面》》》', param);
            apiService.trade
                .pendingList(param)
                .then(res => {
                    let {data, totalPages, totalCount, code, errMsg} = res;
                    if (code == 0) {
                        this.tableData = data;
                        this.pageTotal = totalCount;
                        //判断是否就是一页  一页的话只显示上面的分页  多页的话上下两个分页都显示  页数
                        totalPages == 1
                            ? (this.paginationFlag = false)
                            : (this.paginationFlag = true);
                    } else {
                        this.$message.error(errMsg);
                    }
                })
                .catch(error => {
                    this.$message.error(error);
                });
        },
        //进入交易哈希详情
        goTradeDetail(index, row) {
            this.$router.push({
                path: '/trade-pending-detail',
                query: {
                    txHash: row.txHash,
                },
            });
        },
        //进入钱包地址详情
        goAddressDetail(index, row) {
            this.$router.push({
                path: '/address-detail',
                query: {
                    address: row.from,
                    description: 'pending',
                },
            });
        },
        //进入钱包地址详情或者合约详情
        goDetail(index, row) {
            if (row.txType == 'transactionExecute') {
                //进入合约详情
                this.$router.push({
                    path: '/contract-detail',
                    query: {
                        address: row.to,
                        description: 'pending',
                    },
                });
            } else {
                //进入钱包地址详情
                this.$router.push({
                    path: '/address-detail',
                    query: {
                        address: row.to,
                        description: 'pending',
                    },
                });
            }
        },
        //筛选功能
        filterFn(address) {
            this.$router.push({
                path: '/trade-block-filter',
                query: {
                    address: address,
                },
            });
        },
    },
    //生命周期函数
    created() {
        //获取交易列表
        this.getTradeList();
    },
    //监视
    watch: {
        chainId: 'getTradeList',
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
.pend-wrap {
    .bottom {
        padding: 26px 0 40px;
        .title {
            margin-bottom: 10px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            .record {
                font-size: 12px;
                line-height: 30px;
                letter-spacing: 0.7px;
                color: #d7dde9;
            }
        }
    }
}
.time-and-number {
    position: relative;
    width: 592px;
    height: 48px;
    font-size: 64px;
    line-height: 30px;
    letter-spacing: 3.8px;
    color: #3c425d;
    opacity: 0.2;
}
.second-floor-text {
    position: absolute;
    top: 125px;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
    opacity: 1;
    letter-spacing: 1px;
}
</style>

