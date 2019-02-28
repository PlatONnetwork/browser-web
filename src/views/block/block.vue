<template>
    <div class="block-wrap">
        <com-header :descriptionProp='descriptionProp' @changeDataFn='changeDataFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Blocks
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{$t('blockAbout.block')}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <span>{{$t('blockAbout.morethen')}}&nbsp;{{displayTotalCount}}&nbsp;{{$t('blockAbout.block')}}</span>
                    </div>
                    <div class="pagination-box1">
                        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" layout="sizes,prev, pager, next" :page-size="pageSize" :total="pageTotal" :pager-count="9">
                        </el-pagination>
                    </div>
                </div>
                <div class="table">
                    <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini" :row-class-name="tableRowClassName">
                        <el-table-column :label="$t('blockAbout.height')" :width="currentScreenWidth<1440? 90:150">
                            <template slot-scope="scope">
                                <span class='cursor normal' @click='goBlockDetail(scope.$index,scope.row)'>{{scope.row.height}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('blockAbout.age')" :width="currentScreenWidth<1440? 180:180">
                            <template slot-scope="scope">
                                <span>{{timeDiffFn(scope.row.serverTime,scope.row.timestamp)}}{{$t('blockAbout.before')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="transaction" :label="$t('blockAbout.transaction')" :width="currentScreenWidth<1440? 120:180"></el-table-column>
                        <el-table-column prop="size" :label="$t('blockAbout.size')" :width="currentScreenWidth<1440? 130:180">
                            <template slot-scope="scope">
                                <span>{{scope.row.size}}Byte</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('blockAbout.miner')" :width="currentScreenWidth<1440? 130:260">
                            <template slot-scope="scope">
                                <div class='flex-special'>
                                    <el-tooltip class="item" effect="dark" placement="top">
                                        <div slot="content">{{scope.row.nodeName}}</div>
                                        <span class='cursor normal ellipsis' @click='goNodeDetail(scope.$index,scope.row)'>{{scope.row.nodeName}}</span>
                                    </el-tooltip>
                                </div>
                                <!-- <span class='cursor normal'>{{scope.row.miner}}</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('blockAbout.votes')" width='200'>
                            <template slot-scope="scope">
                                <span>{{scope.row.blockVoteAmount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('blockAbout.tickets')" width='200'>
                            <template slot-scope="scope">
                                <span>{{scope.row.blockVoteNumber}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('blockAbout.energonUsed')" show-overflow-tooltip width='200'>
                            <template slot-scope="scope">
                                <span>{{scope.row.energonUsed}}({{((scope.row.energonUsed/scope.row.energonLimit)*100).toFixed(2)}}%)</span>
                            </template>
                        </el-table-column>
                        <!-- 0.4.0去掉 平均能量价值（内部可保留，方便后续统计能量价值）
                        <el-table-column :label="$t('blockAbout.energonAverage')" show-overflow-tooltip width='200'>
                            <template slot-scope="scope">
                                <span>{{scope.row.energonAverage}} E</span>
                            </template>
                        </el-table-column> -->
                        <el-table-column :label="$t('blockAbout.blockReward')" show-overflow-tooltip >
                            <template slot-scope="scope">
                                <span>{{scope.row.blockReward}} Energon</span>
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
    name: 'block-wrap',
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
            currentPage1: 1,
            descriptionProp: 'block',
            displayTotalCount:0,
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
            console.warn('子组件告诉block链id更改》》》》')
            this.getBlockList();
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
            this.getBlockList();
        },
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
            this.getBlockList();
        },
        //获取交易列表 下分页
        getBlockList() {
            let param = {
                // cid:'',
                pageNo: this.currentPage,
                pageSize: this.pageSize,
            };
            console.warn('获得区块列表》》》', param);
            apiService.block
                .blockList(param)
                .then(res => {
                    let {data, totalPages, totalCount, code, errMsg ,displayTotalCount} = res;
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
        //进入区块详情
        goBlockDetail(index, row) {
            this.$router.push({
                path: '/block-detail',
                query: {
                    height: row.height,
                    currentPage:this.currentPage,
                    pageSize:this.pageSize
                },
            });
        },
        goNodeDetail(index, row) {
            this.$router.push({
                path: '/node-detail',
                query: {
                    // nodeName: row.nodeName,
                    cid:this.chainId,
                    nodeId:row.nodeId,
                },
            });
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
        this.getBlockList();
        //获取当前屏幕尺寸
        this.currentScreenWidth = document.body.clientWidth; 
    },
    //监视
    watch: {
        // chainId: 'getBlockList',
    },
    //组件
    components: {
        comHeader,
        comFooter,
    },
};
</script>
<style lang="less" scoped>
.block-wrap {
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

