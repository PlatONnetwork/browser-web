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
                        <span>{{$t('tradePendingAbout.morethen')}}{{pageTotal}}{{$t('tradePendingAbout.transactions1')}}</span>
                    </div>
                    <div class="pagination-box1">
                        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" layout="prev, pager, next" :page-size="pageSize" :total="pageTotal" :pager-count="9">
                        </el-pagination>
                    </div>
                </div>
                <div class="table">
                    <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini" :row-class-name="tableRowClassName">
                        <el-table-column :label="$t('tradePendingAbout.hash')" show-overflow-tooltip width='200'>
                            <template slot-scope="scope">
                                <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradePendingAbout.age')" width='150'>
                            <template slot-scope="scope">
                                <span>{{timeDiffFn(scope.row.serverTime,scope.row.timestamp)}}{{$t('tradePendingAbout.before')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradePendingAbout.energonLimit')">
                            <template slot-scope="scope">
                                <!-- <span v-if='scope.row.energonLimit>100' title='超过能量限制，可能无法验证成功！'><i class="el-icon-warning"></i></span> -->
                                <span>{{scope.row.energonLimit}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradePendingAbout.energonPrice1')">
                            <template slot-scope="scope">
                                <span>{{scope.row.energonPrice}}Ene</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradePendingAbout.from')" show-overflow-tooltip  width='200'>
                            <template slot-scope="scope">
                                <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                                <span @click='filterFn(scope.row.from)' v-if='scope.row.from !== address' class='cursor'><i class="iconfont iconfilter">&#xe641;</i></span>
                            </template>
                        </el-table-column>
                        <el-table-column label="" width='40'>
                            <template slot-scope="scope">
                                <span>
                                    <i class='iconfont icon--icon-to iconto'></i>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradePendingAbout.to')" show-overflow-tooltip  width='200'>
                            <template slot-scope="scope">
                                <span :title='$t("elseInfo.contract")' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                <span v-if='scope.row.txType !== "contractCreate"' class='cursor normal' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                <span v-if='scope.row.txType !== "contractCreate" && scope.row.to !== address' @click='filterFn(scope.row.to)' class='cursor'><i class="iconfont iconfilter">&#xe641;</i></span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('tradePendingAbout.value')">
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
        'v-menu': menu,
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

