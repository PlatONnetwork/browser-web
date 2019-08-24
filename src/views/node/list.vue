<template>
    <div>
        <el-row v-if="type!='history'">
            <el-col :span="18" class="validators-tab">
                <div class="tabs">
                    <el-button size="medium" :class="{active:tabIndex==1}" @click="tabChange(1,'all')">{{$t('contract.all')}}</el-button>
                    <el-button size="medium" :class="{active:tabIndex==2}" @click="tabChange(2,'active')">{{$t('nodeStatus.2')}}</el-button>
                    <el-button size="medium" :class="{active:tabIndex==3}" @click="tabChange(3,'candidate')">{{$t('nodeStatus.1')}}</el-button>
                </div>         
                <div class="validators-search">
                    <el-input :placeholder="$t('nodeInfo.searchValidator')" clearable v-model.trim="keyword"  @keyup.enter.native="searchFn" @change="clearInput" size="mini"></el-input>
                    <el-button type="primary" class="el-btn el-searchs" @click="searchFn">{{ $t("search.searchBtn") }}</el-button>
                </div>   
            </el-col>
            <el-col :span="6" class="historical-validators">
                <el-button type="text" class="historical-btn" @click="goHistory">
                    {{$t('nodeInfo.historicalValidators')}}>>
                </el-button>
            </el-col>
        </el-row>
        <el-row class="history-validators-header" type="flex" justify="space-between" v-if="type=='history'">
            <el-col :span="12">
                <div style="margin-top: 14px;">
                    {{$t('nodeInfo.historicalValidators')}}(<b>{{pageTotal}}</b>)
                </div>                          
            </el-col>
            <el-col :span="12" class="historical-validators">
                <div class="validators-search history-validators-search">
                    <el-input :placeholder="$t('nodeInfo.searchValidator')" clearable v-model.trim="keyword"  @keyup.enter.native="searchFn" @change="clearInput" size="mini"></el-input>
                    <el-button type="primary" class="el-btn el-searchs" @click="searchFn">{{ $t("search.searchBtn") }}</el-button>
                </div> 
            </el-col>
        </el-row>
        <div class="table">
            <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini">
                <el-table-column type="index" :label="type!='history'?$t('nodeInfo.rank'):$t('common.serialnumber')">
                </el-table-column>
                <el-table-column :label="$t('nodeInfo.validatorName')">
                    <template slot-scope="scope">
                        <div class='flex-special validator-name'>
                            <img :src="scope.row.stakingIcon" v-if="scope.row.stakingIcon" alt="">  
                            <img src="../../assets/images/node-avtor-small.png" class="node-avtor" v-if="!scope.row.stakingIcon" alt="">                       
                            <p class='cursor normal ellipsis percent60' @click='goDetail(scope.row.nodeId)'>{{scope.row.nodeName?scope.row.nodeName:'------'}}</p>
                            <el-tooltip class="item" effect="dark"  placement="bottom"  v-if='scope.row.isInit'>
                                <div slot="content"><span class='title-warning'>{{ $t("nodeInfo.nodeMsg") }}</span></div>
                                <i class="iconfont iconxinxi cursor lightgray" style="margin-left:8px;">&#xe63f;</i>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('tradeAbout.status')">
                    <template slot-scope="scope">
                        <span :class='{green:scope.row.status==2,yellow:(scope.row.status==3 || scope.row.status==4),red:scope.row.status==1,}'>{{$t('nodeStatus.'+[scope.row.status])}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('nodeInfo.totalStakePower')" v-if="type!='history'">
                    <template slot-scope="scope">
                        <span>{{scope.row.totalValue | formatMoney}}LAT</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('nodeInfo.delegationsDelegators')" v-if="type!='history'">
                    <template slot-scope="scope">
                        <span>{{scope.row.delegateValue | formatMoney}}LAT\{{scope.row.delegateQty | formatNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('nodeInfo.pendingDelegations')" v-if="type=='history'">
                    <template slot-scope="scope">
                        <span>{{scope.row.statDelegateReduction | formatMoney}}LAT</span>
                    </template>
                </el-table-column>
                <el-table-column  :label="$t('nodeInfo.stability')">
                    <template slot-scope="scope">
                        <div class="node-stability">
                            <el-tooltip class="item" effect="dark"  placement="bottom" :content="$t('nodeInfo.lowBlockRate')">
                                <div style="margin-right:10px;">
                                    <i class="icon-low-block cursor"></i>
                                    <span>{{scope.row.slashLowQty}}</span>
                                </div>
                                
                            </el-tooltip>   
                            <el-tooltip class="item" effect="dark"  placement="bottom" :content="$t('nodeInfo.twoSignNum')">
                                <div>
                                    <i class="icon-two-sign cursor"></i>
                                    <span>{{scope.row.slashMultiQty}}</span>
                                </div>
                                
                            </el-tooltip> 
                        </div>
                        
                    </template>
                </el-table-column>
                <el-table-column  :label="$t('nodeInfo.producedBlock')">
                    <template slot-scope="scope">
                        <span>{{scope.row.blockQty | formatNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column  :label="$t('nodeInfo.yield')" v-if="type!='history'">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.isInit">{{scope.row.expectedIncome}}%</span>
                        <span v-else>--</span>
                    </template>
                </el-table-column>
                <el-table-column  :label="$t('nodeInfo.exitTime')" v-if="type=='history'">
                    <template slot-scope="scope">
                        <span>{{scope.row.leaveTime?new Date(scope.row.leaveTime).Format('yyyy-MM-dd HH:mm:ss'):0}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-box">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100,150]" :page-size="pageSize" layout="sizes,total,  prev, pager, next" :total="pageTotal" :pager-count="9">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'

    export default {
        name: 'Validator',
        data() {
            return {
                tabIndex:1,
                tableData: [],
                currentPage: 1,
                pageSize: 150,
                pageTotal: 1,
                keyword:'',
                queryStatus:'all',
            }
        },
        props: {
            type:String
        },
        computed: {

        },
		watch: {
		
		},
        components: {
        },
        methods: {
            tabChange(index,type){
                this.tabIndex = index;
                this.queryStatus = type;
                this.currentPage = 1;
                this.getList();
            },
            clearInput(value){
                this.currentPage = 1;
                this.tabIndex = 1;
                this.queryStatus = 'all';
                this.getList();
            },
             //获取交易列表 下分页
            getList() {
                let param = {
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    key:this.keyword,
                };
                let methodName = '';
                if(this.type=='history'){
                    methodName='historyStakingList';
                }else{
                    param.queryStatus = this.queryStatus;
                    methodName='aliveStakingList';
                }
                apiService.node[methodName](param)
                    .then(res => {
                        let {data, totalPages, totalCount, code, errMsg,} = res;
                        if(code==0){
                            this.tableData = data;
                            console.log(this.tableData);
                            this.pageTotal = totalCount;
                        }else{
                            this.$message.error(errMsg);
                        }
                        
                    })
                    .catch(error => {
                        let obj = {
                            errMsg:'',
                            code:0,
                            "totalCount":113817,
                            "displayTotalCount":113817,
                            "totalPages":11382,
                            data:[
                                {
                                    "ranking":11,           //排行
                                    "nodeAddr":"dassadsdsdffd",          //出块节点地址
                                    "nodeName":"验证人名称",          //验证人名称
                                    "stakingIcon":"aaa",       //验证人图标
                                    "status":"1",            //状态   1:候选中  2:活跃中  3:出块中
                                    "totalValue":"112",        //质押总数=有效的质押+委托
                                    "delegateValue":"1212",     //委托总数
                                    "delegateQty":"121",       //委托人数
                                    "slashLowQty":11,       //低出块率举报次数
                                    "slashMultiQty":11,     //多签举报次数
                                    "blockQty":11,          //产生的区块数
                                    "expectedIncome":"12",     //预计年收化率（从验证人加入时刻开始计算）
                                    "isRecommend":true,      //是否官方推荐 
                                    "leaveTime":'1221212121212213',
                                    "statDelegateReduction":'223323' //待提取的委托
                                },
                                {
                                    "ranking":11,           //排行
                                    "nodeAddr":"dassadsdsdffd",          //出块节点地址
                                    "nodeName":"验证人名称2",          //验证人名称
                                    "stakingIcon":"aaa",       //验证人图标
                                    "status":"2",            //状态   1:候选中  2:活跃中  3:出块中
                                    "totalValue":"112",        //质押总数=有效的质押+委托
                                    "delegateValue":"1212",     //委托总数
                                    "delegateQty":"121",       //委托人数
                                    "slashLowQty":11,       //低出块率举报次数
                                    "slashMultiQty":11,     //多签举报次数
                                    "blockQty":11,          //产生的区块数
                                    "expectedIncome":"12",     //预计年收化率（从验证人加入时刻开始计算）
                                    "isRecommend":true,      //是否官方推荐 
                                    "leaveTime":'1221212121212213',
                                    "statDelegateReduction":'223323' //待提取的委托
                                },
                                {
                                    "ranking":11,           //排行
                                    "nodeAddr":"dassadsdsdffd",          //出块节点地址
                                    "nodeName":"验证人名称3",          //验证人名称
                                    "stakingIcon":"aaa",       //验证人图标
                                    "status":"3",            //状态   1:候选中  2:活跃中  3:出块中
                                    "totalValue":"112",        //质押总数=有效的质押+委托
                                    "delegateValue":"1212",     //委托总数
                                    "delegateQty":"121",       //委托人数
                                    "slashLowQty":11,       //低出块率举报次数
                                    "slashMultiQty":11,     //多签举报次数
                                    "blockQty":11,          //产生的区块数
                                    "expectedIncome":"12",     //预计年收化率（从验证人加入时刻开始计算）
                                    "isRecommend":true,      //是否官方推荐 
                                    "leaveTime":'1221212121212213',
                                    "statDelegateReduction":'223323' //待提取的委托
                                },
                                {
                                    "ranking":11,           //排行
                                    "nodeAddr":"dassadsdsdffd",          //出块节点地址
                                    "nodeName":"验证人名称4",          //验证人名称
                                    "stakingIcon":"aaa",       //验证人图标
                                    "status":"1",            //状态   1:候选中  2:活跃中  3:出块中
                                    "totalValue":"112",        //质押总数=有效的质押+委托
                                    "delegateValue":"1212",     //委托总数
                                    "delegateQty":"121",       //委托人数
                                    "slashLowQty":11,       //低出块率举报次数
                                    "slashMultiQty":11,     //多签举报次数
                                    "blockQty":11,          //产生的区块数
                                    "expectedIncome":"12",     //预计年收化率（从验证人加入时刻开始计算）
                                    "isRecommend":true,      //是否官方推荐 
                                    "leaveTime":'1221212121212213',
                                    "statDelegateReduction":'223323' //待提取的委托
                                },
                            ]
                        }
                        let {data, totalPages, totalCount, code, errMsg,displayTotalCount} = obj;
                        this.tableData = data;
                        console.log(this.tableData);
                        this.pageTotal = totalCount;

                        this.$message.error(error);
                    });
            },
            handleCurrentChange(val) {               
                this.currentPage = val;
                this.getList();
            },
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                this.getList();
            },
            //查询
            searchFn(){
                this.currentPage = 1;
                this.tabIndex = 1;
                this.queryStatus = 'all';
                this.getList();
            },
            //进入节点详情
            goDetail(nodeId) {
                this.$router.push({
                    path: '/node-detail',
                    query: {
                        address: nodeId,
                    },
                });
            },
            goHistory(){
                this.$router.push({
                    path: '/history-node',
                });
            }
        },
        //生命周期函数
        created() {
            this.getList();
        },
        mounted() {

        }    
    }
</script>
<style lang="less" scoped>
.historical-validators{
    text-align: right;
    .historical-btn{
        display: inline-block;
    }
}
.validators-tab{
    display: flex;
}
.validators-search{
    width: 400px;
    height: 42px;
    border: 1px solid #E6E6E6;
    border-radius: 4px;
    display: flex;
    margin-left: 30px;
    .el-searchs{
        background: #fff;
        font-size: 14px;
        border: none;
        border-left: 1px solid #E6E6E6;
        color: #0798DE;
        &:hover{
            background: #fff;
            color: #5CB2DB;
            border-left: 1px solid #E6E6E6;
        }
    }
    
}
.node-stability{
    display: flex;
    i{
        vertical-align: sub;
    }
}
.history-validators-search{
    float: right;
}
.node-avtor{
    width: 23px;
    height: 23px;
    margin-right: 8px;
}
</style>
<style lang="less">
.validators-search{
    .el-input--mini .el-input__inner{
        height: 40px;
        line-height: 40px;
    }
}
</style>
