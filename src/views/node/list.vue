<template>
    <div>
        <el-row>
            <el-col :span="18" class="validators-tab">
                <div class="tabs">
                    <el-button size="medium" :class="{active:tabIndex==1}" @click="tabChange(1)">{{$t('contract.all')}}</el-button>
                    <el-button size="medium" :class="{active:tabIndex==2}" @click="tabChange(2)">{{$t('nodeInfo.active')}}</el-button>
                    <el-button size="medium" :class="{active:tabIndex==3}" @click="tabChange(3)">{{$t('nodeInfo.candidate')}}</el-button>
                </div>         
                <div class="validators-search">
                    <el-input :placeholder="$t('nodeInfo.searchValidator')" v-model.trim="searchKey"  @keyup.enter.native="searchFn" size="mini"></el-input>
                    <el-button type="primary" class="el-btn el-searchs" @click="searchFn">{{ $t("search.searchBtn") }}</el-button>
                </div>   
            </el-col>
            <el-col :span="6" class="historical-validators">
                <el-button type="text" class="historical-btn">{{$t('nodeInfo.searchValidator')}}>></el-button>
            </el-col>
        </el-row>
        <div class="table">
            <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini">
                <el-table-column type="index" :label="$t('nodeInfo.rank')" show-overflow-tooltip>
                </el-table-column>
                <el-table-column :label="$t('nodeInfo.validatorName')">
                    <template slot-scope="scope">
                        <div class='flex-special validator-name'>
                            <img src="" alt="">                        
                            <span class='cursor normal ellipsis' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.nodeName}}</span>
                            <el-tooltip class="item" effect="dark"  placement="bottom"  v-if='scope.row.txReceiptStatus==0'>
                                <div slot="content"><span class='title-warning'>Warning：</span></div>
                                <i class="iconfont iconxinxi cursor">&#xe63f;</i>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('nodeInfo.Status')">
                    <template slot-scope="scope">
                        <span class='cursor normal ellipsis'>{{scope.row.txHash}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('nodeInfo.totalStakePower')">
                    <template slot-scope="scope">
                        <span class='cursor normal ellipsis'>{{scope.row.totalValue}}LAT</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('nodeInfo.delegationsDelegators')">
                    <template slot-scope="scope">
                        <span>{{scope.row.delegateValue}}LAT\{{scope.row.delegateQty}}</span>
                    </template>
                </el-table-column>
                <el-table-column  :label="$t('nodeInfo.stability')">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark"  placement="top" :content="$t('nodeInfo.lowBlockRate')">
                            <div style="margin-right:10px;">
                                <i class="icon-low-block cursor"></i>
                                <span>{{scope.row.delegateQty}}</span>
                            </div>
                            
                        </el-tooltip>   
                        <el-tooltip class="item" effect="dark"  placement="top" :content="$t('nodeInfo.twoSignNum')">
                            <div>
                                <i class="icon-two-sign cursor"></i>
                                <span>{{scope.row.delegateQty}}</span>
                            </div>
                            
                        </el-tooltip> 
                    </template>
                </el-table-column>
                <el-table-column  :label="$t('nodeInfo.producedBlock')">
                    <template slot-scope="scope">
                        <span>{{scope.row.blockQty}}</span>
                    </template>
                </el-table-column>
                <el-table-column  :label="$t('nodeInfo.yield')">
                    <template slot-scope="scope">
                        <span>{{scope.row.expectedIncome}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-box">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes,total,  prev, pager, next" :total="pageTotal" :pager-count="9">
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
                tableData: [],
                currentPage: 1,
                pageSize: 20,
                pageTotal: 1,
                keyword:'',
                queryStatus:'all'
            }
        },
        props: {

        },
        computed: {

        },
		watch: {
		
		},
        components: {
        },
        methods: {
            tabChange(index){
                this.tabIndex = index;
            },
             //获取交易列表 下分页
            getList() {
                let param = {
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    key:this.keyword,
                };
                apiService.trade
                    .transactionList(param)
                    .then(res => {
                       
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
</style>
<style lang="less">
.validators-search{
    .el-input--mini .el-input__inner{
        height: 40px;
        line-height: 40px;
    }
}
</style>
