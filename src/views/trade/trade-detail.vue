<template>
    <div class="trade-detail-wrap">
        <div class="page-title fontSize34">{{$t('tradeAbout.tradeDetail')}}</div> 
        <div class="detail-change">
            <div class="detail-copy">
                <span>{{$t('tradeAbout.transactions')}}</span>
                <i>#{{detailInfo.txHash}}</i>
                <b v-clipboard:copy="detailInfo.txHash" v-clipboard:success="onCopy" v-clipboard:error="onError"></b>
            </div>
            <div class="detail-arrow">
                <el-button icon="el-icon-arrow-left"></el-button>
                <el-button icon="el-icon-arrow-right"></el-button>
            </div>
        </div>
        <div class="infomation">
            <!-- 基础交易 -->
            <List title="DeclareVersion" v-if="detailInfo.txType=='0' || detailInfo.txType=='1' || detailInfo.txType=='2' || detailInfo.txType=='5' || detailInfo.txType=='4000'">
                <Item :label="$t('tradeAbout.sender')">
                    <span class="blue" @click="goDetail(type,detailInfo.from)">{{detailInfo.from}}</span>
                </Item>
                <Item :label="$t('tradeAbout.recipient')" v-if="detailInfo.txType!='4000'">
                    <span v-if="detailInfo.receiveType=='account'" class="blue" @click="goDetail(type,detailInfo.to)">{{detailInfo.to}}</span>
                    <div class="isContract" v-if="detailInfo.receiveType!='account'">
                        <i class="iconfont iconcontract red">&#xe63e;</i>
                        <b>Contract</b> 
                        <span class="blue" @click="goDetail(type,detailInfo.to)">{{detailInfo.to}}></span>   
                    </div>
                </Item>
                <Item :label="$t('tradeAbout.amount')" v-if="detailInfo.txType!='4000'" :prop="detailInfo.value + 'LAT'"></Item>
                <template v-if="detailInfo.txType=='4000'">
                    <Item :label="$t('tradeAbout.restrictedAccount')" :prop="detailInfo.RPAccount"></Item>
                    <Item :label="$t('tradeAbout.restrictedAmount')" :prop="detailInfo.RPAccount"></Item>          
                    <Item :label="$t('tradeAbout.restrictedPlan')">
                        <ul class="restricted-plan">
                            <li v-for="(item,index) in detailInfo.RPPlan" :key="index">
                                N{{index}} Epoch({{item.blockNumber}})：{{item.amount}}
                            </li>
                        </ul>
                    </Item>
                </template>
                <Item :label="$t('tradeAbout.transactionFee')" :prop="detailInfo.actualTxCost + 'LAT'"></Item>
            </List>
            <!-- 委托交易 -->
            <List title="DeclareVersion" v-if="detailInfo.txType=='1005' || detailInfo.txType=='1004'">
                <Item :label="$t('tradeAbout.delegator')">
                    <span class="blue" @click="goDetail(type,detailInfo.from)">{{detailInfo.from}}</span>
                </Item>
                <Item :label="$t('tradeAbout.validator')">
                    <span class="blue" @click="goDetail(type,detailInfo.nodeId)">{{detailInfo.nodeName}}</span>
                </Item>
                <Item :label="$t('tradeAbout.delegationAmount')" :prop="detailInfo.value + 'LAT'"></Item>
                <Item :label="$t('tradeAbout.transactionFee')" :prop="detailInfo.actualTxCost + 'LAT'"></Item>
            </List>   

            <!-- 治理交易 -->
            <List title="DeclareVersion" v-if="detailInfo.txType=='2000' || detailInfo.txType=='2001' || detailInfo.txType=='2002' || detailInfo.txType=='2003' || detailInfo.txType=='2004'">
                <Item :label="$t('tradeAbout.proposer')">
                    <span class="blue" @click="goDetail(type,detailInfo.nodeId)">{{detailInfo.nodeName}}</span>
                </Item>
                <Item :label="$t('tradeAbout.operatorAddress')">
                    <span class="blue" @click="goDetail(type,detailInfo.from)">{{detailInfo.from}}</span>
                </Item>
                <Item :label="$t('tradeAbout.proposalType')" v-if="detailInfo.txType!='2004'" :prop="detailInfo.proposalOption"></Item>
                <Item :label="$t('tradeAbout.proposalID')" v-if="detailInfo.txType!='2004'" :prop="detailInfo.proposalHash"></Item>
                <Item :label="$t('tradeAbout.PIPSN')" v-if="detailInfo.txType!='2004'">
                    <span class="blue" @click="goDetail(type,detailInfo.githubID)">{{detailInfo.githubID}}</span>
                </Item>
                <Item :label="$t('tradeAbout.proposalTitle')" v-if="detailInfo.txType!='2004'">
                    <span class="blue" @click="goDetail(type,detailInfo.proposalHash)">{{detailInfo.proposalTopic}}</span>
                </Item>
                <Item :label="$t('tradeAbout.vote')" v-if="detailInfo.txType=='2003'">
                    <span class="green vote-status">{{detailInfo.proposalOption==2?'SUPPORT':'YES NO ABSTAIN'}}</span>
                </Item>
                <Item :label="$t('tradeAbout.version')" v-if="detailInfo.txType=='2004'" :prop="detailInfo.declareVersion"></Item>
                <Item :label="$t('tradeAbout.transactionFee')" :prop="detailInfo.actualTxCost + 'LAT'"></Item>
            </List>

            <!-- 验证人交易 -->
            <List title="DeclareVersion" v-if="detailInfo.txType=='1000' || detailInfo.txType=='1001' || detailInfo.txType=='1002' || detailInfo.txType=='1003' || detailInfo.txType=='3000'">
                <Item :label="$t('tradeAbout.reporter')">
                    <span class="blue" @click="goDetail(type,detailInfo.nodeId)">{{detailInfo.nodeName}}</span>
                </Item>
                <Item :label="$t('tradeAbout.validator')">
                    <span class="blue" @click="goDetail(type,detailInfo.nodeId)">{{detailInfo.nodeName}}</span>
                </Item>
                <template v-if="detailInfo.txType=='3000'">
                    <Item :label="$t('tradeAbout.ReportEvidence')" :prop="detailInfo.RPAccount"></Item>
                    <Item :label="$t('tradeAbout.reportType')" :prop="detailInfo.RPAccount"></Item>          
                    <!-- <Item :label="$t('tradeAbout.reportResult')">
                        <span class="green vote-status">{{detailInfo.proposalOption==2?'SUPPORT':'YES NO ABSTAIN'}}</span>
                    </Item> -->
                    <Item :label="$t('tradeAbout.reportReward')" :prop="detailInfo.RPAccount"></Item>  
                </template>
                <Item :label="$t('tradeAbout.operatorAddress')">
                    <span class="blue" @click="goDetail(type,detailInfo.from)">{{detailInfo.from}}</span>
                </Item>
                <Item :label="$t('tradeAbout.identity')">
                    <span class="blue" @click="goDetail(type,detailInfo.externalId)">{{detailInfo.externalId}}</span>
                </Item>            
                <Item :label="$t('tradeAbout.rewardAddress')">
                    <span class="blue" @click="goDetail(type,detailInfo.benefitAddr)">{{detailInfo.benefitAddr}}</span>
                </Item>
                <Item :label="$t('tradeAbout.version')" v-if="detailInfo.txType=='2004'" :prop="detailInfo.programVersion"></Item>
                <Item :label="$t('tradeAbout.website')">
                    <span class="blue" @click="goDetail(type,detailInfo.website)">{{detailInfo.website}}</span>
                </Item>
                <Item :label="$t('tradeAbout.introduction')" v-if="detailInfo.txType!='2004'" :prop="detailInfo.details"></Item>
                <Item :label="$t('tradeAbout.stakeAmount')" v-if="detailInfo.txType!='2004'" :prop="detailInfo.value"></Item>
                <Item :label="$t('tradeAbout.returnAmount')" v-if="detailInfo.txType=='1003'" :prop="detailInfo.applyAmount"></Item>
                <Item :label="$t('tradeAbout.returnBlock')" v-if="detailInfo.txType=='1003'" :prop="detailInfo.redeemUnLockedBlock"></Item>
                <Item :label="$t('tradeAbout.transactionFee')" :prop="detailInfo.actualTxCost + 'LAT'"></Item>
            </List>
            <List title="infomation" class="common-info">
                <div class="warn-info">
                    <span class="yellow">Warning:</span>
                    <span>{{detailInfo.failReason}}</span>
                </div>
                <Item :label="$t('tradeAbout.status')" :prop="detailInfo.from"></Item>
                <Item :label="$t('tradeAbout.txhash')" :prop="detailInfo.txHash"></Item>
                <Item :label="$t('tradeAbout.timeStamp')" :prop="detailInfo.timestamp?new Date(detailInfo.timestamp).Format('yyyy-MM-dd HH:mm:ss'):0"></Item>
                <Item :label="$t('tradeAbout.blockHeight')" :prop="detailInfo.blockNumber"></Item>
                <Item :label="$t('tradeAbout.gasLimit')" :prop="detailInfo.gasLimit"></Item>
                <Item :label="$t('tradeAbout.gasUsed')" :prop="detailInfo.gasUsed"></Item>
                <Item :label="$t('tradeAbout.gasPrice')" :prop="detailInfo.gasPrice+ 'LAT'"></Item>
                <Item :label="$t('tradeAbout.rawData')" :prop="detailInfo.txInfo"></Item>
            </List>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'

    import List from '@/components/list/list'
    import Item from '@/components/list/item'

    import apiService from '@/services/API-services'
    


    export default {
        name: 'trade-detail',
        data() {
            return {
                currentPage:null,
                pageSize:null,
                loading:false,
                txHash: '',
                btnLeftFlag:true,
                btnRightFlag:true,
                disabledLeft: false,
                disabledRight: false,
                address: '11111111111',
                detailInfo: {

                },
                descriptionProp: 'trade',
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
                extraInfo:{

                }
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
            Item    
        },
        methods: {
            goDetail(type,id){

            },
            //获取交易信息详情
            getDetail() {
                let param = {
                    // cid:'',
                    txHash: this.txHash,
                };
                this.loading = true;
                console.warn('交易详情》》》》', param);
                apiService.trade
                    .transactionDetails(param)
                    .then(res => {
                        let {errMsg, code, data} = res;
                        if (code == 0) {
                            this.loading = false;
                            this.detailInfo = data;
                            // this.extraInfo = JSON.parse(data.txInfo)
                            //是否第一条记录
                            if(data.first){
                                this.btnLeftFlag = false;
                                this.disabledLeft = true;
                            }else{
                                this.btnLeftFlag = true;
                                this.disabledLeft = false
                            }
                            //是否最后一条数据
                            if(data.last){
                                this.btnRightFlag = false;
                                this.disabledRight = true;
                            }else{
                                this.btnRightFlag = true;
                                this.disabledRight = false;
                            }
                        } else {
                            this.detailInfo = {};
                            this.$message.error(errMsg);
                        }
                    })
                    .catch(error => {
                        this.$message.error(error);

                        let {errMsg, code, data} = {
                            "errMsg":"",                 //描述信息
                            "code":0,                    //成功（0），失败则由相关失败码
                            "data":{
                                "txHash":"0x9905d49f27e2e14333b52a2ae35c7686eb9cb05fbsasaassa",      //交易hash
                                "from":"0x9905d49f27e2e14333b52a2ae35c7686eb9cb05fb",        //发送方地址
                                "to":"0x9905d49f27e2e14333b52a2ae35c7686eb9cb05fb",          //接收方地址（操作地址）
                                "timestamp":123123879,    //交易时间
                                "serverTime":1123123,      //服务器时间
                                "confirmNum":444,         //区块确认数
                                "blockNumber":"15566",    //交易所在区块高度
                                "gasLimit":232,       //能量限制
                                "gasUsed":122,        //能量消耗
                                "gasPrice":122,       //能量价格
                                "value":"222",            //金额(单位:von)
                                "actualTxCost":"22",      //交易费用(单位:von)
                                "txType":"1000",              //交易类型               
                                "input":"多少是多少多所多所多所多所多多",               //附加输入数据
                                "txInfo":"",   //附加输入数据解析后的结构
                                "failReason":"洒水多所所多多所",          //失败原因
                                "first":false,            //是否第一条记录
                                "last":true,              //是否最后一条记录
                                "receiveType":"account",  //此字段表示的是to字段存储的账户类型：account-钱包地址，contract-合约地址，
                                                            //前端页面在点击接收方的地址时，根据此字段来决定是跳转到账户详情还是合约详情
                                "RPAccount":"0x9905d49f27e2e14333b52a2ae35c7686eb9cb05fb",           //锁仓计划的地址
                                "RPPlan":[
                                    {
                                        "epoch":11,         //锁仓周期
                                        "amount":111,       //锁定金额
                                        "blockNumber":11    //锁仓周期对应快高  结束周期 * epoch
                                    },
                                    {
                                        "epoch":22,         //锁仓周期
                                        "amount":222,       //锁定金额
                                        "blockNumber":222    //锁仓周期对应快高  结束周期 * epoch
                                    }
                                ],
                                "nodeId":"0x9905d49f27e2e14333b52a2ae35c7686eb9cb05fbsasaassa",              //节点id
                                "nodeName":"aaa",            //节点名称
                                "benefitAddr":"0x9905d49f27e2e14333b52a2ae35c7686eb9cb05fb",         //用于接受出块奖励和质押奖励的收益账户
                                "externalId":"sasasa",          //外部Id(有长度限制，给第三方拉取节点描述的Id)
                                "website":"www.baidu.com",             //节点的第三方主页(有长度限制，表示该节点的主页)
                                "details":"节点的描述",             //节点的描述(有长度限制，表示该节点的描述)
                                "programVersion":"1122",      //程序的真实版本，治理rpc获取
                                "applyAmount":"1111",         //申请赎回的金额
                                "redeemLocked":"1111",        //赎回中被锁定的金额
                                "redeemStatus":"1",       //赎回状态， 1： 退回中   2：退回成功 
                                "redeemUnLockedBlock":"1111", //预计赎回到账的区块
                                "githubID":"111",            //提案的github地址  https://github.com/ethereum/EIPs/blob/master/EIPS/eip-100.md  eip-100为提案id
                                "proposalTopic":"提案的主题",       //提案的主题
                                "proposalHash":"2222",        //提案id
                                "proposalOption":"1",      //投票  1：文本提案    2：升级提案   3：参数提案
                                "declareVersion":"2344",      //声明的版本 
                            }
                        }
                        if (code == 0) {
                            this.loading = false;
                            this.detailInfo = data;
                            // this.extraInfo = JSON.parse(data.txInfo)
                            //是否第一条记录
                            if(data.first){
                                this.btnLeftFlag = false;
                                this.disabledLeft = true;
                            }else{
                                this.btnLeftFlag = true;
                                this.disabledLeft = false
                            }
                            //是否最后一条数据
                            if(data.last){
                                this.btnRightFlag = false;
                                this.disabledRight = true;
                            }else{
                                this.btnRightFlag = true;
                                this.disabledRight = false;
                            }
                        } else {
                            this.detailInfo = {};
                            this.$message.error(errMsg);
                        }
                    });
            },
            onCopy() {
                this.$message.success(this.$t('modalInfo.copysuccess'));
            },
            onError() {
                this.$message.error(this.$t('modalInfo.copyfail'));
            },
        },
        //生命周期函数
        created() {
            this.txHash = this.$route.query.txHash;
            //获取交易列表
            this.getDetail();
        },
        mounted() {

        }    
    }
</script>
<style lang="less" scoped>
    .common-info{
        margin-top: 31px;
    }
    .warn-info{
        background: #FFF7E3;
        border: 1px solid #FFC017;
        width: 500px;
        margin-bottom: 20px;
        border-radius: 4px;
        padding: 10px 15px;
        line-height: 20px;
    }
    .restricted-plan{
        li{
            margin-bottom: 12px;
        }
    }
    .vote-status{
        // opacity: 0.15;
        background: rgba(59,176,18,0.15);
        border-radius: 2px;
        line-height: 26px;
        padding: 0 6px;
    }
</style>

