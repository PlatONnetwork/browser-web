<template>
    <div class="node-detail-wrap">
        <com-header :descriptionProp='descriptionProp' @searchFn='searchFn' @changeDataFn='changeDataFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Node Info
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}}</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/node'}" >{{$t('nodeInfo.validatorNode')}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{$t('nodeInfo.nodeinfo')}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <div class="left">
                            <p>
                                <img :src="'../static/images/'+'characters-'+detailInfo.logo+'.jpg'" alt="" class='images'>
                            </p>
                            <p>
                                <span class='account-name'>{{detailInfo.name}} <i>({{detailInfo.location}})</i></span>
                                <span>{{$t('nodeInfo.jointime')}}：{{new Date(detailInfo.joinTime?detailInfo.joinTime:new Date().getTime()).Format('yyyy-MM-dd HH:mm:ss')}}</span>
                            </p>
                        </div>
                        <div :class="[$i18n.locale=='en'?'en-right':'','right']">
                            <span :class='{"node-candidate":detailInfo.electionStatus == 1,"node-standby":detailInfo.electionStatus == 4}'>{{ $t('nodeInfo.' + detailInfo.nodeType)}}</span>
                        </div>
                    </div>
                    <div class="view">
                        <div>
                            <p>
                                <span>{{$t('nodeInfo.deposit')}}</span>
                                <span>{{detailInfo.deposit}} Energon</span>
                            </p>
                            <p>
                                <span>{{$t('nodeInfo.selected')}}</span>
                                <span>{{detailInfo.hitCount}}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>{{$t('nodeInfo.rewardratio')}}</span>
                                <span>{{detailInfo.rewardRatio?parseFloat((detailInfo.rewardRatio*100).toPrecision(12)):0}} %</span>
                            </p>
                            <p>
                                <span>{{$t('nodeInfo.blocks')}}</span>
                                <span>{{detailInfo.blockCount}}</span>
                            </p>

                        </div>
                        <div>
                            <p>
                                <span>{{$t('nodeInfo.stakedrank')}}</span>
                                <span>{{detailInfo.ranking}}</span>
                            </p>
                            <p>
                                <span>{{$t('nodeInfo.averagetime')}}</span>
                                <span>{{detailInfo.avgBlockTime}}s</span>
                            </p>

                        </div>
                        <div>
                            <p>
                                <span>{{$t('nodeInfo.totalbp')}}</span>
                                <span>{{detailInfo.profitAmount}} Energon</span>
                            </p>
                            <p>
                                <span>{{$t('nodeInfo.totalvot')}}</span>
                                <span>{{detailInfo.rewardAmount}} Energon</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>{{$t('nodeInfo.tickets')}}</span>
                                <span>{{detailInfo.ticketCount}}</span>
                            </p>
                            <p>
                                <span>{{$t('nodeInfo.ticketage')}}</span>
                                <span>{{detailInfo.ticketEpoch}} Bs</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="data-detail">
                    <ul class="ul-nav cursor">
                        <li :class="{active: activeTab == 1}" @click="changeTab(1)">{{$t('nodeInfo.nodeinfo1')}}</li>
                        <li :class="{active: activeTab == 2}" @click="changeTab(2)">{{$t('nodeInfo.nodeblock')}}</li>
                    </ul>
                    <div class="data">
                        <div v-if='activeTab == 1'>
                            <div class="data-top">{{$t('nodeInfo.baseinfo')}}</div>
                            <div class="data-info">
                                <div class="data-line">
                                    <div class="data-title">{{$t('nodeInfo.nodeinfo1')}}</div>
                                    <div class="rows">
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>{{$t('nodeInfo.nodeaddress')}}</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <span>{{detailInfo.nodeUrl}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>{{$t('nodeInfo.nodepublickey')}}</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <span class='copys'>
                                                    <span>{{detailInfo.publicKey}}</span>
                                                    <span v-clipboard:copy="detailInfo.publicKey" v-clipboard:success="onCopyPublicKey" v-clipboard:error="onErrorPublicKey">
                                                        <i class='iconfont iconcopy cursor'>&#xe63d;</i>
                                                    </span>
                                                </span>

                                            </el-col>
                                        </el-row>
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>{{$t('nodeInfo.nodewallet')}}</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <span class='copys'>
                                                    <span class='normal cursor' @click='goAddressDetail(detailInfo.wallet)'>{{detailInfo.wallet}}</span>
                                                    <span v-clipboard:copy="detailInfo.wallet" v-clipboard:success="onCopyWallet" v-clipboard:error="onErrorWallet">
                                                        <i class='iconfont iconcopy cursor'>&#xe63d;</i>
                                                    </span>
                                                </span>

                                            </el-col>
                                        </el-row>
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>{{$t('nodeInfo.nodedes')}}</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <span>{{detailInfo.intro}}</span>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                                <div class="data-line">
                                    <div class="data-title">{{$t('nodeInfo.incentiveplan')}}</div>
                                    <div class="rows">
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>{{$t('nodeInfo.rewardratio')}}</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <span>{{detailInfo.rewardRatio?parseFloat((detailInfo.rewardRatio*100).toPrecision(12)):0}} %</span>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                                <div class="data-line">
                                    <div class="data-title">{{$t('nodeInfo.info')}}</div>
                                    <div class="rows">
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>{{$t('nodeInfo.jigouname')}}</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <span>{{detailInfo.orgName}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>{{$t('nodeInfo.jigounet')}}</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <a :href="detailInfo.orgWebsite" target="_blank" class='normal'>{{detailInfo.orgWebsite}}</a>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if='activeTab == 2'>
                            <div class="data-top data-top1">
                                <span>{{$t('nodeInfo.blocks')}}：{{detailInfo.blockCount}}</span>
                                <div class='search-address'>
                                    <el-button type="primary" class="el-btn el-download" @click="exportFn">{{$t('nodeInfo.export')}}</el-button>
                                </div>
                            </div>
                            <div class="table"
                                v-loading="loading"
                                element-loading-spinner="el-icon-loading"
                                element-loading-background="rgba(4,11,39, 0.5)">
                                <el-table :data='tableData' style="width: 100%"  key='firstTable'  size="mini" :row-class-name="tableRowClassName">
                                    <el-table-column :label="$t('nodeInfo.block')" >
                                        <template slot-scope="scope">
                                            <span class='normal cursor'  @click='goBlockDetail(scope.$index,scope.row)'>{{scope.row.height}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('nodeInfo.timestamp')">
                                        <template slot-scope="scope">
                                            <span>{{new Date(scope.row.timestamp).Format('yyyy-MM-dd HH:mm:ss')}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('nodeInfo.transactions')">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.transaction}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('nodeInfo.blockreward')" :width="currentScreenWidth<1440? 150:300">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.blockReward}} Energon</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <com-footer></com-footer>
    </div>
</template>
<script lang="ts">
    import Component from 'vue-class-component'
    import comHeader from '@/components/header/header.vue'
    import comFooter from '@/components/footer/footer.vue'
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    import contractService from '@/services/web3-services'
    export default {
        //组件名
        name: 'node-detail-wrap',
        //实例的数据对象
        data () {
            return {
                activeTab:1,
                statusFn:{
                    '1':'candidate',
                    '2':'出块中',
                    '3':'validator',
                    '4':'standby'
                },
                address:'',
                descriptionProp: 'node',
                detailInfo:{

                },
                tableData:[

                ],
                total:0,
                id:'',
                nodeId:'',
                currentScreenWidth:0,
                loading:false
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {
            ...mapGetters(['chainId','chainHttp']),
        },
        //方法
        methods: {
            searchFn(data){
                console.warn('子组件header向节点地址详情data>>>>',data)
                this.address = this.$route.query.address;
                this.detailInfo = data.struct;
            },
            changeDataFn(){
                console.warn('子组件告诉地址详情链id更改》》》》')
                // this.getDetail()
            },
            tableRowClassName({row, rowIndex}) {
                if(rowIndex%2 === 0) {
                    return 'even-row';
                }else{
                    return 'odd-row';
                }
            },
            changeTab(type) {
                this.activeTab = type;
                this.activeTab == 2 ? this.getList() : this.getNodeInfo();
            },
            onCopyPublicKey(){
                this.onCopy();
            },
            onErrorPublicKey(){
                this.onError();
            },
            onCopyWallet(){
                this.onCopy();
            },
            onErrorWallet(){
                this.onError();
            },
            onCopy() {
                this.$message.success(this.$t('modalInfo.copysuccess'));
            },
            onError() {
                this.$message.error(this.$t('modalInfo.copyfail'));
            },
            exportFn() {
                //跳转至下载页
                const {href} = this.$router.resolve({
                    path:'/download',
                    query:{
                        address:this.address,
                        description: this.description,
                        exportname:'node'
                    }
                })
                window.open(href,'_blank')
            },
            //获取节点信息
            getNodeInfo(){
                let param = {
                    id:this.id,
                    nodeId:this.nodeId
                };
                apiService.node.detail(param).then(res=>{
                    let {errMsg,code,data}=res;
                    if(code==0){
                        this.detailInfo = data
                    }else{
                        this.$message.error(errMsg);
                    }
                }).catch(error=>{
                    this.$message.error(error);
                })
            },
            //获取区块列表信息/节点出的区块
            getList(){
                let param = {
                    // address:this.address 入参改为nodeId
                    id: this.detailInfo.id,
                    beginNumber: this.detailInfo.beginNumber,
                    endNumber: this.detailInfo.endNumber
                };
                this.loading = true
                apiService.node.blockList(param).then(res=>{
                    let {errMsg,code,data}=res;
                    if(code==0){
                        this.loading = false
                        this.total = data.length;
                        this.tableData = data;
                    }else{
                        this.$message.error(errMsg);
                    }
                }).catch(error=>{
                    this.$message.error(error);
                })
            },
            //进入地址详情页面
            goAddressDetail(address) {
                this.$router.push({
                    path: '/address-detail',
                    query: {
                        address: address,
                        description: 'node',
                    },
                });
            },
            //进入区块详情
            goBlockDetail(index, row) {
                this.$router.push({
                    path: '/block-detail',
                    query: {
                        height: row.height
                    },
                });
            },
        },
        //生命周期函数
        created() {
            this.address = this.$route.query.address;
            this.id = this.$route.query.id;
            this.nodeId = this.$route.query.nodeId
            // this.getNodeInfo();
            // 防止参数丢失
            if(this.id){
                this.getNodeInfo();
            }else{
                setTimeout(this.getNodeInfo(),1000)
            }
            //获取当前屏幕尺寸
            this.currentScreenWidth = document.body.clientWidth;
        },
        //监视
        watch: {
            // 'chainId':'getDetail'
        },
        //组件
        components: {
            comHeader,
            comFooter,
        },
    };
</script>
<style lang="less" scoped>
    i{
        font-style: normal;
    }
    .margin20{
        margin-right:20px;
    }
    .pending{
        font-size: 12px;
        color: #6D81A9;
    }
    .bottom{
        padding:26px 0 60px;
        .title{
            margin-bottom:40px;
            background: #0C1035;
            padding:20px 0;
            .record{
                height:60px;
                padding-left:20px;
                padding-right:20px;
                border-bottom:1px solid #151C45;
                display: flex;
                flex-direction: row;
                flex-wrap:nowrap;
                justify-content: space-between;
                .left{
                    display:flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: flex-start;
                    font-size: 12px;
                    color: #9CA7D0;
                    p{
                        &:first-child{
                            width:40px;
                            height:40px;
                            margin-right:16px;
                            img{
                                display: inline-block;
                                width:100%;
                            }
                        }
                        &:last-child{
                            span{
                                display: inline-block;
                                width:100%;
                            }
                            .account-name{
                                font-size: 14px;
                                color: #FFFFFF;
                                margin-bottom:5px;
                                i{
                                    font-size: 12px;
                                    color: #98A6CC;
                                    margin-left:6px;
                                }
                            }
                        }
                    }
                }
                .right{
                    width:77px;
                    height:28px;
                    padding-left:9px;
                    margin-top:4px;
                    background: rgba(115,130,173,0.20);
                    border-radius: 2px;
                    position: relative;
                    span{
                        letter-spacing: 0.8px;
                        color: #93A5C8;;
                        line-height:28px;
                        &:last-child{
                            position: absolute;
                            right:9px;
                        }
                    }
                }
            }
            .view{
                padding:20px 50px 0px 50px;
                display:flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                // width:25%;
                box-sizing: border-box;
                div{
                    p{
                        font-size: 12px;
                        span{
                            display: inline-block;
                            width:100%;
                            &:first-child{
                                color: #98A6CC;
                                margin-bottom:5px;
                            }
                            &:last-child{
                                color: #D8DDEA;;
                            }
                        }
                        &:first-child{
                            margin-bottom:10px;
                        }
                    }
                }
            }
        }
        .ul-nav{
            // height:34px;
            overflow:hidden;
            margin-bottom:16px;
            li{
                float:left;
                line-height:32px;
                padding:0 20px;
                color: #252C57;
                border: 1px solid #252C57;
                &:first-child{
                    border-right:none;
                }
            }
            .active{
                background: #252C57;
                color: #FFFFFF;
            }
            .left {
                float: left;
            }
            .right {
                float: right;
            }
        }
        .data-top{
            padding:20px 0;
            padding-top:0;
            font-size: 14px;
            color: #DADDEC;
        }
        .data-top1{
            padding:0;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            justify-content: space-between;
        }
        .data-info{
            padding:20px 0;
            background: #0D1333;
            .data-line{
                padding-left:20px;
                border-bottom:1px solid #151C45;
                margin-bottom:20px;
                &:last-child{
                    border-bottom:0;
                }
                .data-title{
                    font-size: 14px;
                    color: #FFFFFF;
                    margin-bottom:10px;
                }
                .rows{
                    .el-row{
                        font-size: 12px;
                        color: #98A6CC;
                        margin-bottom:18px;
                    }
                    .el-col-21 {
                        color: #D9DDEB;
                    }
                }
                .copys{
                    background: rgba(48,56,104,0.30);
                    padding:6px;
                }
            }
        }
    }
    .time-and-number{
        position:relative;
        width:592px;
        height:48px;
        font-size:64px;
        line-height:30px;
        letter-spacing: 3.8px;
        color: #3c425d;
        opacity: 0.2;
    }
    .second-floor-text{
        position: absolute;
        top:125px;
        font-size:16px;
        line-height: 16px;
        color: #ffffff;
        opacity: 1;
        letter-spacing: 1px;
    }
    .images{
        border-radius: 50%;
    }
    .bottom .title .record .en-right{
        width: 122px
    }
</style>
<style lang='less'>
    .search-address{
        .el-input--suffix .el-input__inner{
            // border: 1px solid #12183D;
            font-size: 12px;
            // color: #7988AB;
            line-height: 34px;
            height: 34px;
        }
        .el-download{
            height:34px;
            // line-height:34px;
            padding:0 10px;
            border:none;
        }
    }
    .el-loading-spinner i{
        height: 50px;
    }
</style>

