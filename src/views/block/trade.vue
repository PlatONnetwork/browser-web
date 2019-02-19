<template>
    <div class="trade-wrap">
        <com-header :descriptionProp='descriptionProp' @changeDataFn='changeDataFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Transactions
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{$t('tradeAbout.transactions')}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <span>{{$t('tradeAbout.morethen')}}&nbsp;>&nbsp;{{displayTotalCount}}&nbsp;{{$t('tradeAbout.transactions1')}}</span>
                        <span v-if='newRecordFlag'>（{{$t('tradeAbout.record')}}）</span>
                    </div>
                    <div class="pagination-box1">
                        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" layout="sizes,prev, pager, next" :page-size="pageSize" :total="pageTotal" :pager-count="9">
                        </el-pagination>
                    </div>
                </div>
                <div class="table">
                    <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini" :row-class-name="tableRowClassName">
                        <el-table-column :label="$t('tradeAbout.hash')" >
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
                                <!-- <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="blockHeight"  :label="$t('tradeAbout.block')" width='80'>
                            <template slot-scope="scope">
                                <span class='cursor normal' @click='goBlockDetail(scope.$index,scope.row)'>{{scope.row.blockHeight}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  :label="$t('blockAbout.interval')"  width='120'>
                            <template slot-scope="scope">
                                <span>{{timeDiffFn(scope.row.serverTime,scope.row.blockTime)}}{{$t('tradeAbout.before')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradeAbout.from')" :width="currentScreenWidth<1440? 200:350">
                            <template slot-scope="scope">
                                <!-- <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span> -->
                                <div class='flex-special'>
                                    <el-tooltip class="item" effect="dark" placement="top">
                                        <div slot="content">{{scope.row.from}}</div>
                                        <span class='cursor normal ellipsis' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                                    </el-tooltip>
                                    <!-- <span  class='cursor'><i class="iconfont iconfilter">&#xe641;</i></span> -->
                                </div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="" width='50' align='center'>
                            <template slot-scope="scope">
                                <span>
                                    <i class='iconfont icon--icon-to iconto'></i>
                                </span>
                            </template>
                        </el-table-column> -->
                        <el-table-column :label="$t('tradeAbout.to')" >
                            <template slot-scope="scope">
                                <!-- <div class='flex-special'>
                                    <span :title='$t("elseInfo.contract")' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                    <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                    <el-tooltip class="item" effect="dark" placement="top"  v-if='scope.row.txType !== "contractCreate"'>
                                        <div slot="content">{{scope.row.to}}</div>
                                        <span class='cursor normal ellipsis' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                    </el-tooltip>
                                </div> -->
                                <div class='flex-special'>
                                    <span :title='$t("elseInfo.contract")' v-if='scope.row.txType == "contractCreate" || scope.row.receiveType == "contract" ' class='margin5'><i class="iconfont iconcontract">&#xe63e;</i></span>
                                    <!-- <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span> -->
                                    <span v-if='!scope.row.to'>{{$t('elseInfo.create')}}</span>
                                    <el-tooltip class="item" effect="dark" placement="top"  v-if='scope.row.to'>
                                        <div slot="content">{{scope.row.to}}</div>
                                        <span class='cursor normal ellipsis' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                    </el-tooltip>
                                </div>
                                <!-- <span :title='$t("elseInfo.contract")' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                <span v-if='scope.row.txType !== "contractCreate"' class='cursor normal' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('totalInfo.txType')"  width="120">
                            <template slot-scope="scope">
                                <span>{{ $t('elseInfo.' + txTypeFn[scope.row.txType])}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradeAbout.value')" show-overflow-tooltip width="160">
                            <template slot-scope="scope">
                                <span>{{scope.row.value}} Energon</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="actualTxCost" :label="$t('tradeAbout.fee')" show-overflow-tooltip :width="currentScreenWidth<1440? 120:150">
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
import { timeDiff } from '@/services/time-services';
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
export default {
    //组件名
    name: 'trade-wrap',
    //实例的数据对象
    data() {
        return {
            newRecordFlag: false,
            paginationFlag: true,
            tableData: [

            ],
            currentPage:1,
            pageSize: 10,
            pageTotal: null,
            descriptionProp: 'trade',
            displayTotalCount:0,
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
            currentScreenWidth:0
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
        changeDataFn(){
            console.warn('子组件告诉trade链id更改》》》》')
            this.getTradeList()
        },
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
            this.currentPage = 1;
            this.pageSize = val;
            this.getTradeList();
        },
        //获取交易列表 下分页
        getTradeList() {
            let param = {
                // cid:'',
                pageNo: this.currentPage,
                pageSize: this.pageSize,
            };
            console.warn('获取交易列表》》》', param);
            apiService.trade
                .transactionList(param)
                .then(res => {
                    let {data, totalPages, totalCount, code, errMsg,displayTotalCount} = res;
                    if (code == 0) {
                        this.tableData = data;
                        this.pageTotal = totalCount;
                        this.displayTotalCount = displayTotalCount;
                        //判断最新记录是否显示  总数
                        totalCount > 500000
                            ? (this.newRecordFlag = true)
                            : (this.newRecordFlag = false);
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
        //进入区块详情
        goBlockDetail(index, row) {
            this.$router.push({
                path: '/block-detail',
                query: {
                    height: row.blockHeight,
                },
            });
        },
        //进入交易哈希详情
        goTradeDetail(index, row) {
            this.$router.push({
                path: '/trade-detail',
                query: {
                    txHash: row.txHash,
                    currentPage:this.currentPage,
                    pageSize:this.pageSize
                },
            });
        },
        //进入钱包地址详情
        goAddressDetail(index, row) {
            this.$router.push({
                path: '/address-detail',
                query: {
                    address: row.from,
                    description: 'trade',
                    currentPage:this.currentPage,
                    pageSize:this.pageSize
                },
            });
        },
        //进入钱包地址详情或者合约详情
        goDetail(index, row) {
            if (row.receiveType == 'contract') {
                //进入合约详情
                this.$router.push({
                    path: '/contract-detail',
                    query: {
                        address: row.to,
                        description: 'trade',
                        currentPage:this.currentPage,
                        pageSize:this.pageSize
                    },
                });
            } else {
                //进入钱包地址详情
                this.$router.push({
                    path: '/address-detail',
                    query: {
                        address: row.to,
                        description: 'trade',
                        currentPage:this.currentPage,
                        pageSize:this.pageSize
                    },
                });
            }
        },
    },
    //生命周期函数
    created() {
        if(this.$route.query.currentPage){
            this.currentPage = Number(this.$route.query.currentPage);
        };
        if(this.$route.query.pageSize){
            this.pageSize = Number(this.$route.query.pageSize);
        };
        console.log(this.currentPage)
        //获取交易列表
        this.getTradeList();
        //获取当前屏幕尺寸
        this.currentScreenWidth = document.body.clientWidth; 

    },
    //监视
    watch: {
        // chainId: 'getTradeList',
    },
    //组件
    components: {
        comHeader,
        comFooter,
    },
};
</script>
<style lang="less" scoped>
.trade-wrap {
    .bottom {
        padding: 26px 0 28px;
        .title {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            margin-bottom: 10px;
            .record {
                font-size: 12px;
                line-height: 30px;
                letter-spacing: 0.7px;
                color: #d7dde9;
            }
        }
    }
}

</style>

