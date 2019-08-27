<template>
    <div class="contract-detail-wrap">
        <div class="page-title fontSize34">{{$t('nodeInfo.validatorDetail')}}</div> 
        <div class="node-header">
            <div class="node-header-left">
                <img :src="detailInfo.stakingIcon" v-if="detailInfo.stakingIcon">
                <img src="../../assets/images/node-avtor.png" v-if="!detailInfo.stakingIcon">
                <div class="node-name-wrap">
                    <div class="node-name">
                        <b>{{detailInfo.nodeName}}</b>
                        <!-- <span>(aaa)</span> -->
                        <i></i>
                    </div>
                    <p v-if='!detailInfo.isInit && detailInfo.status!=4 && detailInfo.status!=5'>{{$t('nodeInfo.createdat')}}: {{detailInfo.joinTime?new Date(detailInfo.joinTime).Format('yyyy-MM-dd HH:mm:ss'):''}}</p>
                    <p v-if='detailInfo.status==4 || detailInfo.status==5'>{{$t('nodeInfo.exitTime')}}: {{detailInfo.leaveTime?new Date(detailInfo.leaveTime).Format('yyyy-MM-dd HH:mm:ss'):''}}</p>
                    <p v-if='detailInfo.isInit && detailInfo.status!=4 && detailInfo.status!=5'>
                        <i class="iconfont iconxinxi lightgray">&#xe63f;</i>
                        <span>{{$t('nodeInfo.nodeMsg')}}</span>
                    </p>
                </div>
            </div>
            <div class="node-header-right">
                <span class="green vote-status" v-if="detailInfo.status==2">{{$t('nodeStatus.'+[detailInfo.status])}}</span>
                <span class="yellow vote-status yellow-status" v-else-if="detailInfo.status==3 || detailInfo.status==4">{{$t('nodeStatus.'+[detailInfo.status])}}</span>
                <span class="red vote-status red-status" v-else-if="detailInfo.status==1">{{$t('nodeStatus.'+[detailInfo.status])}}</span>
            </div>
        </div>
        <div class="node-statistic">
            <List class="node-statistic-left" :inline="true">           
                <Item :label="$t('nodeInfo.electedRoundValidator')" :prop="detailInfo.verifierTime"></Item>
                <Item :label="$t('nodeInfo.totalReward')">
                    <p>{{detailInfo.rewardValue | formatMoney}}&nbsp;LAT</p>
                </Item>
                <Item :label="$t('nodeInfo.blocks')" :prop="detailInfo.blockQty | formatNumber"></Item>
                <Item :label="$t('nodeInfo.yield')" :prop="detailInfo.expectedIncome+'%'"></Item>
                <Item :label="$t('nodeInfo.blockRate')">
                    {{detailInfo.expectBlockQty | percentage(detailInfo.blockQty)}}%
                </Item>
                <Item :label="$t('nodeInfo.stability')">
                     <el-tooltip class="item" effect="dark"  placement="bottom" :content="$t('nodeInfo.lowBlockRate')">
                         <div style="margin-right:10px;">
                             <i class="icon-low-block cursor"></i>
                            <span>{{detailInfo.slashLowQty}}</span>
                         </div>                       
                    </el-tooltip>   
                    <el-tooltip class="item" effect="dark"  placement="bottom" :content="$t('nodeInfo.twoSignNum')">
                        <div>
                            <i class="icon-two-sign cursor"></i>
                            <span>{{detailInfo.slashMultiQty}}</span>
                        </div>
                        
                    </el-tooltip> 
                </Item>
            </List>
            <div class="node-statistic-right">
                <div class="canvas">
                    <canvas id="canvas" width="88" height="88"></canvas>
                </div>                
                <div class="statistic-right-data">
                    <Item :label="$t('nodeInfo.totalStakePower')">
                        <p>{{detailInfo.totalValue | formatMoney}}&nbsp;LAT</p>
                    </Item>
                    <ul>
                        <li>
                            <label>{{$t('nodeInfo.selfstake')}}：</label>
                            <p>
                                {{detailInfo.stakingValue | formatMoney}}&nbsp;LAT
                                <span class="yellow" v-if="detailInfo.status==4">({{$t('nodeStatus.'+[detailInfo.status])}})</span>
                            </p>
                        </li>
                        <li>
                            <label>{{$t('deleget.delegations')}}：</label>
                            <p>
                                {{detailInfo.delegateValue | formatMoney}}&nbsp;LAT
                                <span class="yellow" v-if="detailInfo.delegateValue>0">({{$t('deleget.undelegating2')}})</span>
                            </p>
                        </li>
                        <li>
                            <label>{{$t('deleget.delegators')}}：</label>
                            <p>{{detailInfo.delegateQty | formatNumber}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="tabs">
            <el-button size="medium" :class="{active:tabIndex==1}" @click="tabChange(1)">{{$t('nodeInfo.nodeInfo')}}</el-button>
            <el-button size="medium" :class="{active:tabIndex==2}" @click="tabChange(2)">{{$t('nodeInfo.producedBlocks')}}</el-button>
            <el-button size="medium" :class="{active:tabIndex==3}" @click="tabChange(3)">{{$t('nodeInfo.validatorActions')}}</el-button>
            <el-button size="medium" v-if="!detailInfo.isInit" :class="{active:tabIndex==4}" @click="tabChange(4)">{{$t('deleget.delegations')}}</el-button>
        </div>
        <div class="node-detail-content">
            <div v-show="tabIndex==1">
                <h3 class="nodeInfo">{{$t('nodeInfo.nodeInfo')}}</h3>
                <List>           
                    <Item :label="$t('nodeInfo.nodeID')">
                        <span>{{detailInfo.nodeId}}</span>
                        <b class="copyicon cursor" v-clipboard:copy="detailInfo.nodeId" v-clipboard:success="onCopy" v-clipboard:error="onError"></b>
                    </Item>
                    <Item :label="$t('tradeAbout.operatorAddress')">
                        <span class="blue cursor" @click="goAddressDetail(detailInfo.stakingAddr)">{{detailInfo.stakingAddr}}</span>
                        <b class="copyicon cursor" v-clipboard:copy="detailInfo.stakingAddr" v-clipboard:success="onCopy" v-clipboard:error="onError"></b>
                    </Item>
                    <Item :label="$t('tradeAbout.rewardAddress')">
                        <span class="blue cursor" @click="goAddressDetail(detailInfo.denefitAddr)">{{detailInfo.denefitAddr}}</span>
                        <span class="lightgray" v-if="detailInfo.isInit">({{$t('nodeInfo.systemBuilt')}})</span>
                        <b class="copyicon cursor" v-clipboard:copy="detailInfo.denefitAddr" v-clipboard:success="onCopy" v-clipboard:error="onError"></b>
                    </Item>
                    <Item :label="$t('tradeAbout.website')">
                        <a class="blue cursor" :href="detailInfo.website" target="_blank">{{detailInfo.website}}</a>
                    </Item>
                    <Item :label="$t('tradeAbout.identity')">
                        <a class="blue cursor" href="https://keybase.io/eeyun" target="_blank">{{detailInfo.externalId}}</a>
                    </Item>
                    <Item :label="$t('tradeAbout.introduction')" :prop="detailInfo.details"></Item>
                </List>
            </div>
            <div v-show="tabIndex==2">
                <div class="address-trade-last node-last">            
                    {{$t('blockAbout.morethen')}} <b>{{displayTotalCount}}</b>{{$t('contract.transactions')}} 
                    <span style="color: #3F3F3F;" v-if="newRecordFlag">({{$t('contract.showingLast')}})</span>
                    <el-button size="medium export-btn" @click="exportFn">{{$t('common.export')}}</el-button>
                </div>
                <div class="table">
                    <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini">                       
                        <el-table-column  :label="$t('menu.block')">
                            <template slot-scope="scope">
                                <span class="blue cursor" @click="goBlockDetail(scope.row.number)">{{scope.row.number}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('common.time')">
                            <template slot-scope="scope">
                                <span>{{scope.row.timestamp | formatTime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('indexInfo.txn')" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span>{{scope.row.statTxQty | formatNumber}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('blockAbout.blockReward')">
                            <template slot-scope="scope">
                                <span>{{scope.row.blockReward | formatMoney}} LAT</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-box">
                        <el-pagination background @size-change="handleBlockSizeChange" @current-change="handleBlockCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes,total,  prev, pager, next" :total="pageTotal" :pager-count="9">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div v-show="tabIndex==3">
                <div class="table">
                    <el-table :data="tableOperateData" style="width: 100%" key='firstTable' size="mini">                       
                        <el-table-column  :label="$t('common.time')">
                            <template slot-scope="scope">
                                <span>{{scope.row.timestamp | formatTime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('nodeInfo.actions')">
                            <template slot-scope="scope">
                                <p class="percent60">{{scope.row.desc}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('nodeInfo.inTxHash')">
                            <template slot-scope="scope">
                                <p class="blue cursor percent60 ellipsis" v-if="scope.row.txHash" @click="goTradeDetail(scope.row.txHash)">{{scope.row.txHash}}</p>
                                <span class="gray" v-if="!scope.row.txHash">{{$t('nodeInfo.systemOperation')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('nodeInfo.inBlock')">
                            <template slot-scope="scope">
                                <span class="blue cursor" @click="goBlockDetail(scope.row.blockNumber)">{{scope.row.blockNumber}}</span>
                            </template>
                        </el-table-column>                        
                    </el-table>
                    <div class="pagination-box">
                        <el-pagination background @size-change="handleOperateSizeChange" @current-change="handleOperateCurrentChange" :current-page.sync="currentPage2" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize2" layout="sizes,total,  prev, pager, next" :total="pageTotal2" :pager-count="9">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div v-show="tabIndex==4">
                <h3 class="node-deleget-title">
                    {{$t('deleget.delegators')}}<b>{{pageTotal3 | formatNumber}}</b>
                </h3>
                <div class="table">
                    <el-table :data="tableDelegetData" style="width: 100%" key='firstTable' size="mini">                       
                        <el-table-column :label="$t('tradeAbout.delegator')">
                            <template slot-scope="scope">
                                <p class="blue cursor percent60 ellipsis" @click="goAddressDetail(scope.row.delegateAddr)">{{scope.row.delegateAddr}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('contract.delegations')+'\\'+$t('deleget.percentage')">
                            <template slot-scope="scope">
                                <span>{{scope.row.delegateValue | formatMoney}}\{{scope.row.delegateValue | percentage(scope.row.delegateTotalValue)}}%</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('deleget.locked')+'\\'+$t('deleget.percentage')">
                            <template slot-scope="scope">
                                <span>{{scope.row.delegateLocked | formatMoney}}\{{scope.row.delegateLocked | percentage(scope.row.allDelegateLocked)}}%</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-box">
                        <el-pagination background @size-change="handleDelegetSizeChange" @current-change="handleDelegetCurrentChange" :current-page.sync="currentPage3" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize3" layout="sizes,total,  prev, pager, next" :total="pageTotal3" :pager-count="9">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'

    import List from '@/components/list/list'
    import Item from '@/components/list/item'

    export default {
        name: 'node-detail',
        data() {
            return {
                address:'',
                tabIndex:1,
                newRecordFlag:false,
                detailInfo:{},
                cxt:null,

                tableData:[],
                currentPage: 1,
                pageSize: 20,
                pageTotal: 1,

                tableOperateData:[],
                currentPage2: 1,
                pageSize2: 20,
                pageTotal2: 1,

                tableDelegetData:[],
                currentPage3: 1,
                pageSize3: 20,
                pageTotal3: 1,

                displayTotalCount: 0,
            }
        },
        props: {

        },
        computed: {

        },
		watch: {
		
		},
        components: {
            List,
            Item,
        },
        methods: {
            tabChange(index){
                this.tabIndex = index;
            },
            //获取详情
            getDetail() {
                let param = {
                    nodeId: this.address,
                };
                apiService.node
                    .detail(param)
                    .then(res => {
                        let {errMsg, code, data} = res;
                        if (code == 0) {
                            this.detailInfo = data;
                            const dag = this.detailInfo.stakingValue/this.detailInfo.delegateValue;

                            this.getDelegetList();
                            this.draw(dag);
                        } else {
                            this.detailInfo = {};
                            this.$message.error(errMsg);
                        }
                    })
                    .catch(error => {
                        this.$message.error(error);
                        let {errMsg, code, data} = {
                                "errMsg":"",                 //描述信息
                                "code": 0,                   //成功（0），失败则由相关失败码
                                "data": {
                                    "ranking":11,             //排行
                                    "nodeAddr":"0x1fe1b73f7f592d6c054d62fad1cc55756c6949f9",            //出块节点地址
                                    "nodeName":"是多多所",            //验证人名称
                                    "stakingIcon":"",         //验证人图标
                                    "status":"1",              //状态   1:候选中  2:活跃中  3:出块中
                                    "totalValue":"1212",          //质押总数=有效的质押+委托
                                    "delegateValue":"111",       //委托总数
                                    "stakingValue":"11111",        //质押总数
                                    "delegateQty":"11",         //委托人数
                                    "slashLowQty":11,         //低出块率举报次数
                                    "slashMultiQty":11,       //多签举报次数
                                    "blockQty":11,            //产生的区块数
                                    "expectBlockQty":"2113",      //预计的出块数
                                    "expectedIncome":"1221",      //预计年收化率（从验证人加入时刻开始计算）
                                    "joinTime":"21331111111114",            //加入时间
                                    "verifierTime":"213",        //进入共识验证轮次数
                                    "rewardValue":"2312323",         //累计的收益 
                                    "nodeId":"0x1fe1b73f7f592d6c054d62fad1cc55756c6949f9ds",              //节点id
                                    "stakingAddr":"0x1fe1b73f7f592d6c054d62fad1cc55756c6949f9",         //发起质押的账户地址
                                    "denefitAddr":"0x1fe1b73f7f592d6c054d62fad1cc55756c6949f9",         //收益地址
                                    "website":"www.baidu.com",             //节点的第三方主页
                                    "details":"节点的描述",             //节点的描述
                                    "externalId":"21123",          //身份证id
                                    "stakingBlockNum":"2222",     //最新的质押交易块高
                                    "statDelegateReduction":""//待提取的委托
                                }
                            }
                        if (code == 0) {
               
                            this.detailInfo = data;
                            // data.trades.forEach(item => {
                            //     if (item.txReceiptStatus == -1) {
                            //         ++this.count;
                            //     }
                            // });
                        } else {
                            this.detailInfo = {};
                            this.$message.error(errMsg);
                        }
                    });
            },
            getBlockList() {
                let param = {
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    nodeId:this.address,
                };
                apiService.block
                    .blockListByNodeId(param)
                    .then(res => {
                        let {data, totalPages, totalCount, code, errMsg,displayTotalCount} = res;
                        if (code == 0) {
                            this.tableData = data;
                            this.pageTotal = totalCount;
                            this.displayTotalCount = displayTotalCount;
                            //判断最新记录是否显示  总数
                            totalCount > 5000
                                ? (this.newRecordFlag = true)
                                : (this.newRecordFlag = false);
                        } else {
                            this.$message.error(errMsg);
                        }
                    })
                    .catch(error => {
                        let obj = {"errMsg":"成功","code":0,"totalCount":113817,"displayTotalCount":113817,"totalPages":11382,"data":[{"txHash":"0x13ee077df46f245b54e8bde9fbfd8e5177401cb7f3833f597a6684c072124e5c","blockHash":"0xc91ed795146b9bc0bace1a10065e96b03e4d1ce7a832fa52ed158b5797f70b1a","blockHeight":9715737,"blockTime":1565699071405,"from":"0x3f58fdc537a81a4423aae86d2c457bc2cf7d24a2","to":"0x1000000000000000000000000000000000000002","value":"1700","actualTxCost":"0.00003494","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x04c02b1a435c476a4a539c54c1815bff4ba0cddedd3da67cc3fe538ce1b4a013","blockHash":"0x0bd7cb6541d49d4d7f420f06eb124afc0a9532b27701a6f2d9d344925e2f27d7","blockHeight":9715233,"blockTime":1565698561366,"from":"0xebd8e66d30206205f35f809b3f244f8ea259a212","to":"0x1000000000000000000000000000000000000002","value":"200","actualTxCost":"0.00003494","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0xd6ce527038fa167be6f23a418513ab7285c2f177fdd438b0ee65204934063be5","blockHash":"0x30937b02cecbf90c9eb08242a26f6fe1e25d65f11770403a1938d796a5ecff20","blockHeight":9714168,"blockTime":1565697462329,"from":"0x9cc7b9bf170cfe3b8fcbcb5782c97f9dbb9a9d79","to":"0x1000000000000000000000000000000000000002","value":"2600","actualTxCost":"0.00003488","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x4b3611f7171668a8d0ac0a5a891b16bfbc1e83544adf1c0bc2dccf0bed3743c4","blockHash":"0x7504ef857d0bb14a5f5ffff1d47fe84b0c81d3acc8bd44537a97cc7f471788af","blockHeight":9714141,"blockTime":1565697435363,"from":"0x8b77ac9fabb6fe247ee91ca07ea4f62c6761e79b","to":"0x1000000000000000000000000000000000000002","value":"600","actualTxCost":"0.00003488","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x0bf5224bc83b22c59dfeb2637aa3252d5c09971316aae11b69fdd1014176c183","blockHash":"0xe00b2c786b3911c02033af42b822f8c80ac8b22c113c56b1be22f14152d59842","blockHeight":9713985,"blockTime":1565697274404,"from":"0x66d3347cc4c99b18405a64b062ec881578933211","to":"0x1000000000000000000000000000000000000002","value":"1600","actualTxCost":"0.00003494","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x8cd8159957936e67c1053c0984979882d29c3571bf47b17f63b2967e38d3ceef","blockHash":"0x75f4e9cf0a24ab8dd7dcb0245d9a55609437204e564403bdeaabc01f49af50bd","blockHeight":9713981,"blockTime":1565697270396,"from":"0xe5876a6c008f4660c2d862db0f2da5132152a545","to":"0x1000000000000000000000000000000000000002","value":"1000","actualTxCost":"0.00003494","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x45d2df9c1634c8631b19539286b080f9879686c584553c22f46cedf9f5cab353","blockHash":"0xa537c91e470b60401ab65ce10ab20feaf616132b485f46c8d54290f737e1d93c","blockHeight":9713740,"blockTime":1565697020352,"from":"0x4614dda7da840432e4df002558817247d68a1a8d","to":"0x1000000000000000000000000000000000000002","value":"1100","actualTxCost":"0.00003494","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x0707a8c090be3ef5c6524fad2dadf49c3f0b9840912efcc6a42f43d078c75ef4","blockHash":"0x1a56345b12a1be10001b2219a3056b0da6d2c1e82687bbf4a921a69400789c7d","blockHeight":9712737,"blockTime":1565696000365,"from":"0xabf1fab6afeec0b97bfb6b874737c101b795c9f4","to":"0x1000000000000000000000000000000000000002","value":"1600","actualTxCost":"0.00003494","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0x75cf414a0187e58f87e8e0c2c223fb3c10618b06f5e2d8eb4a00165568d7da38","blockHash":"0xf1faad0cb79ecf886e914645815725a47ef8ae29b8864eb8118392cc251fc023","blockHeight":9710662,"blockTime":1565693876353,"from":"0x9cc7b9bf170cfe3b8fcbcb5782c97f9dbb9a9d79","to":"0x1000000000000000000000000000000000000002","value":"2600","actualTxCost":"0.00003488","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null},{"txHash":"0xdab856d9f1eb4bb5463db192fc0b6bfa68521cab1f7308eaba44c7be9729efbd","blockHash":"0x5feb374a164e5812b7aac3e9064e44afaa3e065a03fc4b882557426e05832868","blockHeight":9710635,"blockTime":1565693848323,"from":"0x8b77ac9fabb6fe247ee91ca07ea4f62c6761e79b","to":"0x1000000000000000000000000000000000000002","value":"1600","actualTxCost":"0.00003488","txReceiptStatus":1,"txType":"voteTicket","serverTime":1565699269646,"failReason":null,"receiveType":"account","txInfo":null}]};
                        let {data, totalPages, totalCount, code, errMsg,displayTotalCount} = obj;
                        this.tableData = data;
                        console.log(this.tableData);
                        this.pageTotal = totalCount;
                        this.displayTotalCount = displayTotalCount;
                        //判断最新记录是否显示  总数
                        totalCount > 5000
                            ? (this.newRecordFlag = true)
                            : (this.newRecordFlag = false);

                        this.$message.error(error);
                    });
            },
            exportFn() {
                //跳转至下载页
                const {href} = this.$router.resolve({
                    path:'/download',
                    query:{
                        address:this.address,
                        // description: this.description,
                        exportname:'node',
                        // tab:this.activeTab-1
                    }
                })
                window.open(href,'_blank')
            },
            getOperateList() {
                let param = {
                    pageNo: this.currentPage2,
                    pageSize: this.pageSize2,
                    nodeId:this.address,
                };
                apiService.node
                    .stakingOptRecordList(param)
                    .then(res => {
                        let {data, totalPages, totalCount, code, errMsg} = res;
                        if (code == 0) {
                            this.tableOperateData = data;
                            this.pageTotal2 = totalCount;
                        } else {
                            this.$message.error(errMsg);
                        }
                        
                    })
                    .catch(error => {
                        this.$message.error(error);
                    });
            },
            getDelegetList() {
                let param = {
                    pageNo: this.currentPage3,
                    pageSize: this.pageSize3,
                    nodeId:this.address,
                    stakingBlockNum:this.detailInfo.stakingBlockNum
                };
                apiService.node
                    .delegationListByStaking(param)
                    .then(res => {
                        let {data, totalPages, totalCount, code, errMsg} = res;
                        if (code == 0) {
                            this.tableDelegetData = data;
                            this.pageTotal3 = totalCount;
                        } else {
                            this.$message.error(errMsg);
                        }
                    })
                    .catch(error => {
                        this.$message.error(error);
                    });
            },
            //进入地址详情
            goAddressDetail(address) {
                this.$router.push({
                    path: '/address-detail',
                    query: {
                        address: address,
                    },
                });
            },
            //进入区块详情
            goBlockDetail(height) {
                this.$router.push({
                    path: '/block-detail',
                    query: {
                        height: height,
                    },
                });
            },
            //进入交易详情
            goTradeDetail(hash) {
                this.$router.push({
                    path: '/trade-detail',
                    query: {
                        txHash: hash,
                    },
                });
            },
            onCopy() {
                this.$message.success(this.$t('modalInfo.copysuccess'));
            },
            onError() {
                this.$message.error(this.$t('modalInfo.copyfail'));
            },

            // 区块列表
            handleBlockCurrentChange(val) {               
                this.currentPage = val;
                this.getBlockList();
            },
            handleBlockSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                this.getBlockList();
            },

            // 操作列表
            handleOperateCurrentChange(val) {               
                this.currentPage2 = val;
                this.getOperateList();
            },
            handleOperateSizeChange(val) {
                this.currentPage2 = 1;
                this.pageSize2 = val;
                this.getOperateList();
            },

            // 委托列表
            handleDelegetCurrentChange(val) {               
                this.currentPage3 = val;
                this.getDelegetList();
            },
            handleDelegetSizeChange(val) {
                this.currentPage3 = 1;
                this.pageSize3 = val;
                this.getDelegetList();
            },
            draw(dag){
                this.cxt.clearRect(0,0,88,88);
                this.cxt.beginPath();
                this.cxt.moveTo(44,44)
                this.cxt.fillStyle="#000";  
                this.cxt.arc(44,44,44,0,-Math.PI*dag*2,true);
                this.cxt.fill();
            }
        },
        //生命周期函数
        created() {
            this.address = this.$route.query.address;
            this.getDetail();
            this.getBlockList();
            this.getOperateList();           
        },
        mounted() {
            this.cxt = document.getElementById('canvas').getContext("2d");         
        }    
    }
</script>
<style lang="less" scoped>
.contractCreator{
  a{
      width:150px;
      display: inline-block;
      vertical-align: middle;
  }
}
.vote-status{
    // opacity: 0.15;
    background: rgba(59,176,18,0.15);
    border-radius: 2px;
    line-height: 26px;
    padding: 7px 10px;
}
.yellow-status{
    background: rgba(255,192,23,0.15);
}
.red-status{
    background: rgba(207,50,110,0.15);
}
.canvas{
    width: 88px;
    height: 88px;
    position: relative;
    background: #D5D5D5;
    border-radius: 50%;
    margin-right: 30px;
    canvas{
        position: absolute;
        top: 0;
        left: 0;
    }
}
.node-header{
    display: flex;
    justify-content: space-between;
    margin-top: 23px;
    .node-header-left{
        display: flex;
        img{
            width: 58px;
            height: 58px;
            margin-right: 15px;
        }
        .node-name{
            line-height: 24px;
            b{
                font-size: 20px;
            }
            span{
                font-size: 14px;
                color: #999999;
            }
            // i{
            //     display: inline-block;
            //     width: 14px;
            //     height: 14px;
            //     background: url()
            // }
        }
        p{
            font-size: 14px;
            color: #666666;
            line-height: 16px;
            margin-top: 8px;
        }
    }
}
.node-statistic{
    display: flex;
    margin: 36px 0 40px;
    .node-statistic-left{
        width: 46%;
        margin-right: 4%;
    }
}
.node-detail-content{
    margin-top: 30px;
    .nodeInfo{
        margin-bottom: 21px;
    }

}
.node-last{
    position: relative;
    .export-btn{
        position: absolute;
        right: 0;
        top: -8px;
    }
}
.statistic-right-data{
    flex:1
}
</style>
<style lang="less">
    .node-statistic{
        .list-item{
            width: 50%;
            p{
                font-weight: 700;
            }
        }
    }
    .node-statistic-right{
        display: flex;
        width: 40%;
        .list-item{
            width: 100%;
            // justify-content: space-between;
        }
        ul{
            display: flex;
            justify-content: space-between;
            li{
                label{
                    margin-bottom: 11px;
                    display: block;
                }
                p{
                    font-weight: 700;
                    span{
                        display: block;
                        font-size: 12px;
                        font-weight: normal;
                    }
                }
            }
        }
    }
</style>
