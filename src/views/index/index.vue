<template>
    <div class="index-wrap">
        <div class="welcome-wrap">
            <h3>{{$t('indexInfo.WelcomeToPlatON')}}</h3>
            <div class="search search-index" :class="{'search-active':isFocus,'search-hide':!hideSearch}">
                <el-input :placeholder="$t('search.placeHolder')" @focus="isFocus=true;" @blur="isFocus=false;" v-model.trim="searchKey"  @keyup.enter.native="searchFn" size="mini"></el-input>
                <el-button type="primary" class="el-btn el-searchs" :class="{'search-btn-active':isFocus}" @click="searchFn" :disabled='disabledBtn'>{{ $t("search.searchBtn") }}</el-button>
            </div>
            <img class="polyhedron-big polyhedron" src="@/assets/images/polyhedron.png">
            <img class="polyhedron-mid polyhedron" src="@/assets/images/polyhedron.png">
        </div>
        <el-row>
            <el-col :span="12" class="bar-left bar">
                <h3>{{$t('indexInfo.LIVEBLOCKTIME')}}</h3>
                <div class="chart" ref="blockTimeChart"></div>
                <ul class="block-statistics">
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.LIVEBLOCKHEIGHT')}}</div>
                        <a class="cursor">{{blockStatisticData.currentNumber}}</a>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('blockAbout.producer').toUpperCase()}}</div>
                        <a class="cursor">{{blockStatisticData.nodeName}}</a>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.CIRCULATINGSUPPLY')}}</div>
                        <p>
                            {{blockStatisticData.turnValue | unit}}&nbsp;/ <b>{{blockStatisticData.issueValue | unit}}</b> 
                        </p>
                        <el-progress :percentage="blockStatisticData.turnValue | percentage(blockStatisticData.issueValue)"></el-progress>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('nodeInfo.stakeRate').toUpperCase()}}</div>
                        <p>{{blockStatisticData.stakingDelegationValue | percentage(blockStatisticData.issueValue)}}%&nbsp;<b>{{blockStatisticData.stakingDelegationValue | formatNumber}}</b> </p>
                        <el-progress :percentage="blockStatisticData.stakingDelegationValue | percentage(blockStatisticData.issueValue)"></el-progress>
                    </li>
                </ul>
                <img class="polyhedron-mini polyhedron" src="@/assets/images/polyhedron.png">
            </el-col>
            <el-col :span="12" class="bar-right bar">
                <h3>{{$t('indexInfo.LIVEBLOCKTRANSACTIONS')}}</h3>
                <div class="chart" ref="blockTradeChart"></div>
                <ul class="block-statistics">
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.LIVETRANSACTIONS')}}</div>
                        <a class="cursor">{{blockStatisticData.txQty | unit}}</a>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.CURRNTMAXTPS')}}</div>
                        <a class="cursor">{{blockStatisticData.currentTps | formatNumber}}<span class="blue">/{{blockStatisticData.maxTps | formatNumber}}</span> </a>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.LIVEADDRESS')}}</div>
                        <a class="cursor">{{blockStatisticData.addressQty | formatNumber}}</a>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.PENDINGTOTAL')}}</div>
                        <a class="cursor">{{blockStatisticData.doingProposalQty | formatNumber}}<span class="blue">/{{blockStatisticData.proposalQty | formatNumber}}</span></a>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <el-row class="block-and-node" type="flex" justify="space-between">
            <el-col :span="11">
                <h3>{{$t('nodeInfo.blocks')}}</h3>
                <div class="block-list-wrap">
                    <ul class="blocks-ul blocks-ul-new" id="blocks-ul-new" :class="{'blocks-active':isMove2}">                  
                        <li class="cursor" v-for="(item,index) in blockData" v-if="index<3" :key="index">
                            <div class="list-item">
                                <span class="item-number cursor" @click="goBlockDetail(item.number)">{{item.number}}</span>
                                <p>{{$t('blockAbout.producer')}}<a class="cursor" @click="goNodeDetail(item.nodeId)">{{item.nodeName}}</a></p>
                            </div>
                            <div class="list-item item-right">
                                <span class="item-txns">{{item.statTxQty}}&nbsp;{{$t('indexInfo.txns')}}</span>
                                <span class="item-time">{{timeDiffFn(item.serverTime,item.timestamp)}}&nbsp;{{$t('tradeAbout.before')}}</span>
                            </div>
                            <!-- <img src="../../assets/images/avtor-black.png"> -->
                        </li>
                    </ul>
                    <ul class="blocks-ul blocks-ul-new2" id="blocks-ul-new2" :class="{'blocks-active2':isMove}">                  
                        <li class="cursor" v-for="(item,index) in blockData" :key="index">
                            <div class="list-item">
                                <span class="item-number cursor" @click="goBlockDetail(item.number)">{{item.number}}</span>
                                <p>{{$t('blockAbout.producer')}}<a class="cursor" @click="goNodeDetail(item.nodeId)">{{item.nodeName}}</a></p>
                            </div>
                            <div class="list-item item-right">
                                <span class="item-txns">{{item.statTxQty}}&nbsp;{{$t('indexInfo.txns')}}</span>
                                <span class="item-time">{{timeDiffFn(item.serverTime,item.timestamp)}}&nbsp;{{$t('tradeAbout.before')}}</span>
                            </div>
                            <!-- <img src="../../assets/images/avtor-black.png"> -->
                        </li>
                    </ul>
                </div>
                <div class="view-blocks">
                    <router-link to="/block" class="view-link">{{ $t("indexInfo.viewAll")+$t("blockAbout.block")}}</router-link>
                </div>               
            </el-col>
            <el-col :span="11">
                <h3>{{$t('indexInfo.currentValidators')}}</h3>
                <div class="block-list-wrap">
                    <ul class="node-ul node-animation">
                        <li class="cursor" v-for="(item,index) in ValidatorData.dataList" :key="index" @click="goNodeDetail(item.nodeId)">
                            <div class="list-item">
                                <span class="item-number cursor">{{item.nodeName}}</span>
                                <p>{{$t('nodeInfo.totalStakePower')}}<a>{{item.nodeName}}</a></p>
                            </div>
                            <div class="list-item item-right">
                                <span class="item-txns">{{item.expectedIncome}}%&nbsp;{{$t('nodeInfo.yield')}}</span>
                                <span class="item-time">{{item.ranking}}&nbsp;{{$t('nodeInfo.rank')}}</span>
                            </div>
                            <img src="../../assets/images/avtor-black.png">
                        </li>
                        <li class="cursor" v-for="(item,index) in showedValidatorData" :key="index" @click="goNodeDetail(item.nodeId)">
                            <div class="list-item">
                                <span class="item-number cursor">{{item.nodeName}}</span>
                                <p>{{$t('nodeInfo.totalStakePower')}}<a>{{item.nodeName}}</a></p>
                            </div>
                            <div class="list-item item-right">
                                <span class="item-txns">{{item.expectedIncome}}%&nbsp;{{$t('nodeInfo.yield')}}</span>
                                <span class="item-time">{{item.ranking}}&nbsp;{{$t('nodeInfo.rank')}}</span>
                            </div>
                            <img src="../../assets/images/avtor-black.png">
                        </li>
                    </ul>                
                </div>
                <div class="view-blocks">
                    <router-link to="/node" class="view-link">{{ $t("indexInfo.viewAll")+ $t("nodeInfo.validator")}}</router-link>
                </div>               
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import ChartService from '@/services/chart-services';
    import IndexService from '@/services/index-service';
    import { timeDiff } from '@/services/time-services';

    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'

    import comHeader from '@/components/header/header.vue'

    const blockTimeChart = new ChartService();
    const blockTradeChart = new ChartService();

    let indexService = null;
    
    export default {

        name: 'index',
        data() {
            return {  
                searchKey:'',
                disabledBtn:false, 
                isFocus:false,
                tabIndex:1,
                i18nLocale:'zh-cn',
                isMove:false,
                isMove2:false,
            }
        },
        props: {

        },
        computed: {
            ...mapGetters(['chartData','blockStatisticData','blockData','ValidatorData','hideSearch']),
            showedValidatorData(){
                return this.ValidatorData.dataList.slice(0,8);
            }
        },
		watch: {
            chartData(val){
                this.updateChart(val);
            },
            chainId(val){
                indexService.disconnect();
                indexService.connect();
            },
            chainContext(val){
                indexService.disconnect();
                indexService.connect();
            }
		
		},
        components: {
            comHeader
        },
        methods: {
            ...mapMutations({
                hide:'HIDE_SEARCH'
            }),
            //查询
            searchFn(){
                this.disabledBtn=true;
                let param = {
                    parameter:this.searchKey,
                }
                console.warn('搜索内容》》》',param)
                apiService.search.query(param).then((res)=>{
                    this.searchKey = '';
                    let {errMsg,code,data}=res
                    if(code==0){                        
                        //根据type不同进入不同的详情页
                        if(!data.type){
                            this.$message.warning(this.$t('indexInfo.searchno'))
                        }else{
                            this.switchFn(data.type,data.struct)
                            // this.$emit('searchFn',data);
                        }
                    }else{
                        this.$message.warning(this.$t('indexInfo.searchno'))
                            // this.$message.error(errMsg) 替换为search无结果
                    }
                }).catch((error)=>{
                    this.searchKey = '';
                    this.$message.error(error)
                });
                setTimeout(()=>{
                    this.disabledBtn=false;
                },2000);
            },
            switchFn(type,struct){
                switch (type){
                    //区块详情
                    case 'block':
                        return this.$router.push({
                            path:'/block-detail',
                            query:{
                                height:struct.number
                            }
                        });
                        break;
                    //交易详情
                    case 'transaction':
                        // let path = ''
                        // struct.txReceiptStatus == -1 ? path='/trade-pending-detail' : path = '/trade-detail'
                        return this.$router.push({
                            path:'/trade-detail',
                            query:{
                                txHash:struct.txHash
                            }
                        });
                        break;
                    //节点详情
                    case 'staking':
                        return this.$router.push({
                            path:'/node-detail',
                            query:{
                                address:struct.nodeId,
                            }
                        });
                        break;
                    //地址详情
                    case 'address':
                        return this.$router.push({
                            path:'/address-detail',
                            query:{
                                address:struct.address,
                            }
                        });
                        break;
                }
            },
            initBlockTimeChart(){
                let r = this.$refs;
                blockTimeChart.init(r.blockTimeChart, blockTimeChart.blockTimeOption);
            },
            initBlockTradeChart(){
                let r = this.$refs;
                blockTradeChart.init(r.blockTradeChart, blockTradeChart.blockTradeOption);
            },
            updateChart(data) {
                // console.warn('data>>>>>>',typeof data,data.length)
                //遍历data  得到 x轴  双 y轴
                let xList = [],
                    yListTime = [],
                    yListNum = [];
                if(data){
                    xList = data.x
                    yListTime = data.ya
                    yListNum = data.yb
                }
                blockTimeChart.update({
                    xAxis: [
                        {
                            data: xList,
                        },
                    ],
                    series: [
                        {
                            data: yListTime,
                        },
                    ],
                });
                blockTradeChart.update({
                    xAxis: [
                        {
                            data: xList,
                        },
                    ],
                    series: [
                        {
                            data: yListNum,
                        },
                    ],
                });
            },
            timeDiffFn(beginTime,endTime){
                return timeDiff(beginTime,endTime)
            },
            // percentage(a,b){
            //     console.log(a/b*100)
            //     if(a&&b){
            //         return (a/b*100).toFixed(2);
            //     }
            //     return 0;    
            // },
            //查询
            searchFn(){
                this.disabledBtn=true;
                let param = {
                    parameter:this.searchKey,
                }
                console.warn('搜索内容》》》',param)
                apiService.search.query(param).then((res)=>{
                    let {errMsg,code,data}=res
                    if(code==0){
                        //根据type不同进入不同的详情页
                        if(data.type==null){
                            this.$message.warning(this.$t('indexInfo.searchno'))
                        }else{
                            this.switchFn(data.type,data.struct)
                            this.$emit('searchFn',data);
                        }
                    }else{
                        this.$message.warning(this.$t('indexInfo.searchno'))
                            // this.$message.error(errMsg) 替换为search无结果
                    }
                }).catch((error)=>{
                    this.$message.error(error)
                });
                setTimeout(()=>{
                    this.disabledBtn=false;
                },2000);
            },
            scrollHandle(){
                const top = document.documentElement.scrollTop || document.body.scrollTop
                if(top>240){
                    this.hide(false);                 
                }else{
                    this.hide(true); 
                }
            },
            //进入区块详情
            goBlockDetail(blockHeight) {
                this.$router.push({
                    path: '/block-detail',
                    query: {
                        height: blockHeight,
                    },
                });
            },
            //进入节点详情
            goNodeDetail(nodeId) {
                this.$router.push({
                    path: '/node-detail',
                    query: {
                        address: nodeId,
                    },
                });
            },

        },
        //生命周期函数
        created() {
            console.log('aaa',IndexService)
            indexService = new IndexService();    
            setInterval(()=>{
                this.isMove = true;
                // setTimeout(()=>{                   
                //     this.isMove2 = true;
                //     setTimeout(()=>{
                //         this.isMove = false;
                //         this.isMove2 = false;
                //     },1000)
                // },1000)
            },3000)        
        },
        mounted() {
            indexService.getChartData();
            indexService.getStatisticData();
            indexService.getValidatorData();
            indexService.getBlockData();

            this.initBlockTimeChart();
            this.initBlockTradeChart();
            echarts.connect([blockTimeChart.chart,blockTradeChart.chart]);

            window.onresize = function() {
                blockTimeChart.chart.resize();
                blockTradeChart.chart.resize();
            };
            window.addEventListener('scroll',this.scrollHandle,false)

            const block1 = document.getElementById('blocks-ul-new');
            const block2 = document.getElementById('blocks-ul-new2');
            block1.addEventListener('transitionend',()=>{
                this.isMove = false;
                this.isMove2 = false;
            },false)
            block2.addEventListener('transitionend',()=>{
                this.isMove2 = true;
            },false)
        },
        beforeDestroy() {
            indexService.disconnect();
        },
        destroyed() {
            window.removeEventListener('scroll',this.scrollHandle);
            indexService.disconnect();
        },   
    }
</script>
<style lang="less" scoped>
    .index-wrap{
        // background: #000;
        position: relative;
        .block-statistics{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
                width: 50%; 
                margin-bottom: 40px;
                .statistics-label{
                    color: #999;
                    font-size: 16px;
                    line-height: 19px;
                    margin-bottom: 13px;
                }
                a{
                    color: #fff;
                    font-size: 24px;
                    line-height: 28px;
                }    
                p{
                    color: #fff;
                    font-size: 20px;
                    line-height: 23px;
                    b{
                        color: #999;                    
                        color: #7D7D7D;
                        font-weight: normal;
                    }
                }           
            }
        }
        .search-index{
            height: 69px;
        }
        .chart{
            min-height: 180px;
        }
        .bar{
            h3{
                color: #999;
                font-size: 16px;
                line-height: 19px;
            }
            &.bar-left{
                position: relative;
            }
        }       
        .welcome-wrap{
            @media only screen and (max-width: 1680px) {
                &{
                    width: 64%;
                }
            } 
            @media only screen and (max-width: 1366px) {
                &{
                    width: 70%;
                }
            }       
            width: 50%;
            margin: 180px auto;         
            h3{
                font-size: 40px;
                line-height: 47px;
                text-align: center;
                color: #fff;
            }
            .search{
                margin-top: 70px;
                &.search-index .el-button.el-searchs{
                    width: 120px;
                }
                &.search-hide{
                    transition: transform 3.0s ease, opacity 3.0s ease;       
                    transform: translate(500px,-500px);
                    opacity: 0.0;
                }
            }
        }
        .polyhedron{
            position: absolute;
            top: -70px;                
            animation: rotating 8s infinite linear;
            &.polyhedron-big{
                width: 180px;
                height: 180px;
                left: -20px;
            }
            &.polyhedron-mid{
                width: 86px;
                height: 86px;
                top: 250px;
                right: -43px;
            }
            &.polyhedron-mini{
                width: 50px;
                height: 50px;
                top: 52px;
                left: -80px;
            }
        }
    }
    .block-list-wrap{
        height: 650px;
        overflow: hidden;
        position: relative;
    }
    .block-and-node{
        margin-top: 98px;
        h3{
            font-size: 16px;
            color: #999999;
            line-height: 19px;
            margin-bottom: 46px;
        }
        ul{          
            padding-left: 71px; 
            &.blocks-ul{                
                // margin-right: 106px;
                background: url(../../assets/images/block.png) repeat-y;
                background-position-y:  -15px;          
                &.blocks-ul-new{
                    // height: 0;   
                    // overflow: hidden;     
                    position: absolute;
                    top: 249px;
                    left: 0;
                    width: 100%; 
                    visibility: hidden;        
                    &.blocks-active{
                        transition: all 1s linear;
                        // height: 249px;
                        top: 0;
                        visibility: visible;
                    }
                } 
                &.blocks-ul-new2{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    &.blocks-active2{
                        transition: all 1s linear;
                        top: 249px;
                    }
                }
            }
            &.node-ul{
                li{
                    // padding-left: 71px; 
                    position: relative;
                    img{
                        position: absolute;
                        left: -71px;
                        top: 0;
                        width: 46px;
                        height: 46px;
                    }
                }               
            }
            li{
                border-bottom: 1px solid #333;
                margin-bottom: 15px;
                display: flex;
                justify-content: space-between;
                .list-item{
                    flex: 1;
                    &.item-right{
                        text-align: right;
                    }
                    .item-number{
                        font-size: 18px;
                        color: #FFFFFF;
                        line-height: 21px;  
                        display: block;  
                        &:hover{
                            color: #66B7DE;
                        }                    
                    }
                    .item-txns{
                        font-size: 16px;
                        color: #CCCCCC;
                    }
                    p{
                        font-size: 14px;
                        color: #999999;
                        line-height: 16px;
                        a{
                            margin-left: 18px;
                            font-size: 14px;
                            color: #DDDDDD;
                            &:hover{
                                color: #66B7DE;
                            }
                        }
                        margin: 15px 0;
                    }
                    .item-time{
                        margin: 15px 0;
                        display: block;
                        font-size: 14px;
                        color: #999999;
                        line-height: 16px;
                    }

                }
            }
        }
        .view-blocks{
            border: 1px solid #555555;
            border-radius: 2px;
            width: 100%;
            height: 48px;           
            line-height: 48px;
            text-align: center;
            margin-top: 27px;
            .view-link{
                color: #fff;
            }
        }

    }
    .node-animation{
        animation: nodeMove 50s linear infinite;
        &:hover{
            animation-play-state:paused;
        }
    }
    .fromBottomIn{
        transition: transform 1.0s ease, opacity 1.0s ease;
        
        transform: translate(0,0);
        opacity: 1.0;
    }

    .fromBottomOut{
        transition: transform 1.0s ease, opacity 1.0s ease;
        
        transform: translate(0,100%);
        opacity: 0.0;
    }

    @keyframes nodeMove {
        from {
            transform: translate(0,-2075px);
        }
    
        to {
            transform: translate(0,0);
        }
    }
</style>
<style lang="less">
    .index-area{
        background: #000;
        // padding: 86px 0 0 0;
        // height: 100%;
    }
    .chart canvas{
        left: -23px !important;
    }    
    .bar .el-progress{
        width: 80%;
        margin-top: 5px;
        .el-progress-bar__outer{
            background: #3E3E3E;
        }
        .el-progress-bar__inner{
            background: #fff;
        }
    }   
    .sub-foot .tabs .el-button{
        background: #000;
        margin-right: 8%;
        &:hover{
            background: #fff;
            a{
                color: #000;
            }
        }
        a{
            // font-size: 20px;
            color: #fff;
        }
    }
</style>

