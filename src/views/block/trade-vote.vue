<template>
    <div class="trade-vote">
        <com-header :descriptionProp='descriptionProp' @changeDataFn='changeDataFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Ticket-Tx
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}}</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/trade' }" v-if='description == "trade"'>{{$t('tradeAbout.transactions')}}</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/block' }" v-if='description == "block"'>区块</el-breadcrumb-item>
                        <el-breadcrumb-item v-if='description == "trade"'>选票-交易-{{hash}}</el-breadcrumb-item>
                        <el-breadcrumb-item v-if='description == "block"'>选票-区块-{{height}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <span>总共&nbsp;&nbsp;{{displayTotalCount}}&nbsp;&nbsp;选票</span>
                    </div>
                    <div class="pagination-box1">
                        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" layout="prev, pager, next" :page-size="pageSize" :total="pageTotal" :pager-count="9">
                        </el-pagination>
                    </div>
                </div>
                <div class="table">
                    <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini" :row-class-name="tableRowClassName">
                        <el-table-column label="选票ID" >
                            <template slot-scope="scope">
                                <!-- <div class='flex-special'>
                                    <el-tooltip class="item" effect="dark" placement="top">
                                        <div slot="content">{{scope.row.txHash}}</div>
                                        <span class='cursor normal ellipsis' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                                    </el-tooltip>
                                </div> -->
                                <span>{{scope.row.ticketId}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop=""  label="投票给">
                            <template slot-scope="scope">
                                <div class='flex-special'>
                                    <el-tooltip class="item" effect="dark" placement="top">
                                        <div slot="content">{{scope.row.nodeName}}</div>
                                        <span class='cursor normal ellipsis' @click=''>{{scope.row.nodeName}}</span>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop=""  label="拥有者">
                            <template slot-scope="scope">
                                <div class='flex-special'>
                                    <el-tooltip class="item" effect="dark" placement="top">
                                        <div slot="content">{{scope.row.owner}}</div>
                                        <span class='cursor normal ellipsis' @click=''>{{scope.row.owner}}</span>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态"  width="150">
                            <template slot-scope="scope">
                                <!-- <span>{{ $t('elseInfo.' + txTypeFn[scope.row.txType])}}</span> -->
                                <span>中选票</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="收益" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.income?scope.row.income:'-'}} Energon</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="actualTxCost" label="预计/实际过期时间" >
                            <template slot-scope="scope">{{scope.row.status==3?new Date(scope.row.time).Format('yyyy-MM-dd HH:mm:ss'):new Date(scope.row.expectTime).Format('yyyy-MM-dd HH:mm:ss')}}</template>
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
    name: 'trade-vote',
    //实例的数据对象
    data() {
        return {
            paginationFlag: true,
            tableData: [
                {
                     "ticketId":  "0x35961a259f9103XXXXXXXXXXXXXXXXXX",//票id
                     "nodeName":  "0x35961a259f9103XXXXXXXXXXXXXXXXXX",//投票给
                     "owner": "0x35961a259f9103XXXXXXXXXXXXXXXXXX",//所有者
                     "status":1 ,//票状态
                     // 1->正常
                     // 2->被选中
                     // 3->过期
                     // 4->掉榜
                     "income": "11111", //收益
                     "time": 1547641874000,//实际过期时间（只有status = 3显示该时间的值，其他情况显示预期时间的值）
                     "expectTime":1547641874000//预期时间
                },
                {
                     "ticketId":  "0x35961a259f9103XXXXXXXXXXXXXXXXXX",//票id
                     "nodeName":  "0x35961a259f9103XXXXXXXXXXXXXXXXXX",//投票给
                     "owner": "0x35961a259f9103XXXXXXXXXXXXXXXXXX",//所有者
                     "status":2 ,//票状态
                     // 1->正常
                     // 2->被选中
                     // 3->过期
                     // 4->掉榜
                     "income": "1111", //收益
                     "time": 1547641874000,//实际过期时间（只有status = 3显示该时间的值，其他情况显示预期时间的值）
                     "expectTime":1547641874000//预期时间
                }
            ],
            currentPage:1,
            pageSize: 10,
            pageTotal: null,
            descriptionProp: '',
            description:'',
            hash:'',
            height:'',
            displayTotalCount:0,
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
                "pageNo": this.pageNo,//页数(必填)
                "pageSize": this.pageSize,//页大小(必填)
                "parameter": this.height//区块高度/hash(必填)
            };
            console.warn('获取选座列表》》》', param);
            apiService.trade
                .voteList(param)
                .then(res => {
                    let {data, totalPages, totalCount, code, errMsg,displayTotalCount} = res;
                    if (code == 0) {
                        this.tableData = data;
                        this.pageTotal = totalCount;
                        this.displayTotalCount = displayTotalCount;
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

    },
    //生命周期函数
    created() {
        this.description=this.$route.query.description;
        this.height=this.$route.query.height;
        this.hash=this.$route.query.hash;
        //获取选座列表
        // this.getTradeList();
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
.trade-vote {
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

