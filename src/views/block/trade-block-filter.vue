<template>
    <div class="trade-filter-wrap">
        <com-header :descriptionProp='descriptionProp' @changeDataFn='changeDataFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Transactions
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{$t('tradePendingAbout.transactions')}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <span>{{$t('tradePendingAbout.address')}}-{{address}}</span>
                        <span>{{$t('tradePendingAbout.morethen')}}&nbsp;{{pageTotal}}&nbsp;{{$t('tradePendingAbout.transactions1')}}</span>
                    </div>
                    <div class="pagination-box1">
                        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" layout="prev, pager, next" :page-size="pageSize" :total="pageTotal" :pager-count="9">
                        </el-pagination>
                    </div>
                </div>
                <div class="table">
                    <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini" :row-class-name="tableRowClassName">
                        <el-table-column :label="$t('tradePendingAbout.hash')"  width='200'>
                            <template slot-scope="scope">
                                <div class='flex-special'>
                                    <el-tooltip class="item" effect="dark" placement="top">
                                        <div slot="content">{{scope.row.txHash}}</div>
                                        <span class='cursor normal ellipsis' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                                    </el-tooltip>
                                </div>
                                <!-- <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradePendingAbout.age')" width='180'>
                            <template slot-scope="scope">
                                <span>{{timeDiffFn(scope.row.serverTime,scope.row.timestamp)}}{{$t('tradePendingAbout.before')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradePendingAbout.energonLimit')" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <!-- <span v-if='scope.row.energonLimit>100' title='超过能量限制，可能无法验证成功！'><i class="el-icon-warning"></i></span> -->
                                <span>{{scope.row.energonLimit}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradePendingAbout.energonPrice1')" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span>{{scope.row.energonPrice}}Ene</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradePendingAbout.from')"   width='200'>
                            <template slot-scope="scope">
                                <div class='flex-special'>
                                    <el-tooltip class="item" effect="dark" placement="top">
                                        <div slot="content">{{scope.row.from}}</div>
                                        <span class='cursor normal ellipsis' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                                    </el-tooltip>
                                    <span @click='filterFn(scope.row.from)' v-if='scope.row.from !== address' class='cursor'><i class="iconfont iconfilter">&#xe641;</i></span>
                                </div>
                                <!-- <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                                <span @click='filterFn(scope.row.from)' v-if='scope.row.from !== address' class='cursor'><i class="iconfont iconfilter">&#xe641;</i></span> -->
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label=""  width='150' align='center'>
                            <template slot-scope="scope">
                                <span>
                                    <i class='iconfont icon--icon-to iconto'></i>
                                </span>
                            </template>
                        </el-table-column> -->
                        <el-table-column :label="$t('tradePendingAbout.to')" width='200'>
                            <template slot-scope="scope">
                                <div class='flex-special'>
                                    <span :title='$t("elseInfo.contract")' v-if='scope.row.txType == "contractCreate" || scope.row.receiveType == "contract" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                    <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                    <el-tooltip class="item" effect="dark" placement="top"   v-if='scope.row.txType !== "contractCreate"'>
                                        <div slot="content">{{scope.row.to}}</div>
                                        <span v-if='scope.row.txType !== "contractCreate"' class='cursor normal  ellipsis' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                    </el-tooltip>
                                    <span v-if='scope.row.txType !== "contractCreate" && scope.row.to !== address' @click='filterFn(scope.row.to)' class='cursor'><i class="iconfont iconfilter">&#xe641;</i></span>
                                </div>
                                <!-- <span :title='$t("elseInfo.contract")' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                <span v-if='scope.row.txType !== "contractCreate"' class='cursor normal' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                <span v-if='scope.row.txType !== "contractCreate" && scope.row.to !== address' @click='filterFn(scope.row.to)' class='cursor'><i class="iconfont iconfilter">&#xe641;</i></span> -->
                            </template>
                        </el-table-column>
                        <el-table-column label="类型"  width="150">
                            <template slot-scope="scope">
                                <span>{{ $t('elseInfo.' + txTypeFn[scope.row.txType])}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradePendingAbout.value1')" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span>{{scope.row.value}} E</span>
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
import { timeDiff } from '@/services/time-services';
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
export default {
    //组件名
    name: 'trade-filter-wrap',
    //实例的数据对象
    data() {
        return {
            address: '',
            paginationFlag: true,
            tableData: [

            ],
            currentPage: 1,
            pageSize: 10,
            pageTotal: null,
            currentPage1: 1,
            descriptionProp: 'pending',
            txTypeFn:{
                transfer : 'transfer',
                MPCtransaction : 'MPCtransaction',
                contractCreate : 'contractCreate',
                vote : 'vote',
                transactionExecute :'transactionExecute',
                authorization :'authorization',
                candidateDeposit :'candidateDeposit',
                candidateApplyWithdraw :'candidateApplyWithdraw',
                candidateWithdraw :'candidateWithdraw',
                unknown :'unknown'
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
        //查询
        searchFn() {},
        changeDataFn(){
            console.warn('子组件告诉filter链id更改》》》》')
            this.getTradeList(this.address);
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
        getTradeList(address) {
            let param = {
                // cid:'',
                pageNo: this.currentPage,
                pageSize: this.pageSize,
                address: address,
            };
            console.warn('筛选待交易列表》》》', param);
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
            apiService.trade.pendingDetails({ txHash : row.txHash}).then(res=>{
                let {errMsg,code,data} = res;
                if(code == 0){
                    data.type=='pending'?this.pendingRouterFn(row.txHash):this.tradeRouterFn(row.txHash)
                }
            })
            // this.$router.push({
            //     path: '/trade-pending-detail',
            //     query: {
            //         txHash: row.txHash,
            //     },
            // });
        },
        pendingRouterFn(txHash){
            this.$router.push({
                path: '/trade-pending-detail',
                query: {
                    txHash:txHash,
                    currentPage:this.currentPage,
                    pageSize:this.pageSize
                },
            });
        },
        tradeRouterFn(txHash){
            this.$router.push({
                path: '/trade-detail',
                query: {
                    txHash:txHash,
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
            if (row.receiveType == 'contract') {
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
        filterFn(address) {
            this.address = address;
            this.$router.replace({
                path: '/trade-block-filter',
                query: {
                    address: address,
                },
            });
            this.getTradeList(address);
        },
    },
    //生命周期函数
    created() {
        // if(this.$route.query.currentPage){
        //     this.currentPage = Number(this.$route.query.currentPage);
        // };
        // if(this.$route.query.pageSize){
        //     this.pageSize = Number(this.$route.query.pageSize);
        // };
        // console.log(this.currentPage)
        this.address = this.$route.query.address;
        //获取交易列表
        this.getTradeList(this.address);
    },
    //监视
    watch: {
        // chainId: function() {
        //     this.getTradeList(this.address);
        // },
    },
    //组件
    components: {
        comHeader,
        comFooter,
    },
};
</script>
<style lang="less" scoped>
.trade-filter-wrap {
    .bottom {
        padding: 26px 0 28px;
        .title {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            margin-bottom: 10px;
            .record {
                line-height: 30px;
                span{
                    &:first-child{
                        font-size: 14px;
                        color: #FFFFFF;
                    }
                    &:last-child{
                        font-size: 12px;
                        color: #D7DDE9;
                        margin-left:20px;
                    }
                }
            }
        }
    }
}

</style>

