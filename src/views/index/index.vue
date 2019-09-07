<template>
    <div class="index-wrap">
        <vue-particles
            color="#2E2E2E"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#2E2E2E"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.7"
            :linesDistance="150"
            :moveSpeed="2"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="false"
            clickMode="repulse"
            class="lizi"
        >
        </vue-particles>
        <div class="welcome-wrap">
            <h3>{{$t('indexInfo.WelcomeToPlatON')}}</h3>
            <div class="search search-index" :class="{'search-active':isFocus,'search-hide':!hideSearch}">
                <el-input :placeholder="$t('search.placeHolder')" @focus="isFocus=true;" @blur="isFocus=false;" v-model="searchKey"  @keyup.enter.native="searchFn" size="mini"></el-input>
                <el-button type="primary" class="el-btn el-searchs" :class="{'search-btn-active':isFocus}" @click="searchFn" :disabled='disabledBtn'>{{ $t("search.searchBtn") }}</el-button>
            </div>
            <img class="polyhedron-big polyhedron" src="@/assets/images/polyhedron.png">
            <img class="polyhedron-mid polyhedron" src="@/assets/images/polyhedron2.png">
            <img class="polyhedron-small polyhedron" src="@/assets/images/polyhedron3.png">
        </div>
        <el-row type="flex" class="bar-wrap">
            <el-col :span="12" class="bar-left bar">
                <h3>{{$t('indexInfo.LIVEBLOCKTIME')}}</h3>
                <div class="chart" ref="blockTimeChart"></div>
                <ul class="block-statistics">
                    <li class="statistics-link statistics-odd">
                        <div class="statistics-label">{{$t('indexInfo.LIVEBLOCKHEIGHT')}}</div>
                        <a class="cursor" @click="goBlockDetail(blockStatisticData.currentNumber)">{{blockStatisticData.currentNumber}}</a>
                    </li>
                    <li class="statistics-link statistics-even">
                        <div class="statistics-label">{{$t('blockAbout.producer').toUpperCase()}}</div>
                        <a class="cursor" @click="goNodeDetail(blockStatisticData.nodeId)">{{blockStatisticData.nodeName}}</a>
                    </li>
                    <li class="statistics-odd">
                        <div class="statistics-label">{{$t('indexInfo.CIRCULATINGSUPPLY')}}(LAT)</div>
                        <p>
                            {{blockStatisticData.turnValue | unit}}&nbsp;/
                            <b class="tip">
                                {{blockStatisticData.issueValue | unit}}
                                <i>{{$t('indexInfo.totalSUPPLY')}}</i>
                            </b> 
                        </p>
                        <el-progress class="progress-supply" :percentage="blockStatisticData.turnValue | percentage(blockStatisticData.issueValue)"></el-progress>
                    </li>
                    <li class="statistics-even">
                        <div class="statistics-label">{{$t('nodeInfo.stakeRate').toUpperCase()}}</div>
                        <p>{{blockStatisticData.stakingDelegationValue | percentage(blockStatisticData.issueValue)}}%&nbsp;
                            <b class="tip">{{blockStatisticData.stakingDelegationValue | formatNumber}}
                                <i>{{$t('indexInfo.totalSTAKE')}}</i>
                            </b> 
                        </p>
                        <el-progress :percentage="blockStatisticData.stakingDelegationValue | percentage(blockStatisticData.issueValue)"></el-progress>
                    </li>
                </ul>
                <img class="polyhedron-mini polyhedron" src="@/assets/images/polyhedron2.png">
            </el-col>
            <el-col :span="12" class="bar-right bar">
                <h3>{{$t('indexInfo.LIVEBLOCKTRANSACTIONS')}}</h3>
                <div class="chart" ref="blockTradeChart"></div>
                <ul class="block-statistics">
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.LIVETRANSACTIONS')}}</div>
                        <a class="cursor" @click="$router.push('/trade')">{{blockStatisticData.txQty | unit}}</a>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.CURRNTMAXTPS')}}</div>
                        <a>{{blockStatisticData.currentTps | formatNumber}}<span class="lightblue">/{{blockStatisticData.maxTps | formatNumber}}</span> </a>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.LIVEADDRESS')}}</div>
                        <a>{{blockStatisticData.addressQty | formatNumber}}</a>
                    </li>
                    <li class="cursor" @click="goProposal">
                        <div class="statistics-label">{{$t('indexInfo.PENDINGTOTAL')}}</div>
                        <a>{{blockStatisticData.doingProposalQty | formatNumber}}<span class="lightblue">/{{blockStatisticData.proposalQty | formatNumber}}</span></a>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <el-row class="block-and-node" type="flex" justify="space-between">
            <el-col :span="11">
                <h3>{{$t('blockAbout.Block')}}</h3>
                <div class="block-list-wrap">
                    <div class="zhezhao" id="zhezhao" :class="{active:isMove2}"></div>
                    <ul class="blocks-ul blocks-ul-new" :class="{'blocks-active':isMove2}">                  
                        <li v-if="blockData.length">
                            <div class="list-item">
                                <span class="item-number cursor" @click="goBlockDetail(blockData[0].number)">{{blockData[0].number}}</span>
                                <p>{{$t('blockAbout.producer')}}<a class="cursor" @click="goNodeDetail(blockData[0].nodeId)">{{blockData[0].nodeName}}</a></p>
                            </div>
                            <div class="list-item item-right">
                                <span class="item-txns">{{blockData[0].statTxQty}}&nbsp;{{$t('indexInfo.txns')}}</span>
                                <span class="item-time">{{timeDiffFn(blockData[0].serverTime,blockData[0].timestamp)}}&nbsp;{{$t('tradeAbout.before')}}</span>
                            </div>
                            <!-- <img src="../../assets/images/avtor-black.png"> -->
                        </li>
                    </ul>
                    <ul class="blocks-ul blocks-ul-new2" id="blocks-ul-new2" :class="{'blocks-active2':isMove}">                  
                        <li v-for="(item,index) in blockData" :key="index">
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
                    <ul class="node-ul" :class="{'node-animation':ValidatorData.dataList.length>8}">
                        <li class="cursor" v-for="(item,index) in ValidatorData.dataList" :key="index" @click="goNodeDetail(item.nodeId)">
                            <div class="list-item">
                                <span class="item-number cursor">{{item.nodeName}}</span>
                                <p>{{$t('nodeInfo.totalStakePower')}}<a>{{item.totalValue | formatMoney}}LAT</a></p>
                            </div>
                            <div class="list-item item-right">
                                <span class="item-txns" v-if="item.expectedIncome">{{item.expectedIncome}}&nbsp;{{$t('nodeInfo.yield2')}}</span>
                                <span class="item-txns" v-else>--</span>
                                <span class="item-time">{{item.ranking}}&nbsp;{{$t('nodeInfo.rank')}}</span>
                            </div>
                            <img :src="item.stakingIcon" v-if="item.stakingIcon">
                            <img src="../../assets/images/avtor-black.png" v-else>
                        </li>
                        <li class="cursor" v-for="(item,index) in showedValidatorData" :key="index" @click="goNodeDetail(item.nodeId)">
                            <div class="list-item">
                                <span class="item-number cursor">{{item.nodeName}}</span>
                                <p>{{$t('nodeInfo.totalStakePower')}}<a>{{item.totalValue | formatMoney}}LAT</a></p>
                            </div>
                            <div class="list-item item-right">
                                <span class="item-txns" v-if="item.expectedIncome">{{item.expectedIncome}}&nbsp;{{$t('nodeInfo.yield2')}}</span>
                                <span class="item-txns" v-else>--</span>
                                <span class="item-time">{{item.ranking}}&nbsp;{{$t('nodeInfo.rank')}}</span>
                            </div>
                            <img :src="item.stakingIcon" v-if="item.stakingIcon">
                            <img src="../../assets/images/avtor-black.png" v-else>
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
                // isMove:false,
                isMove2:false,
                styleEle:null,
                ele:null
            }
        },
        props: {

        },
        computed: {
            ...mapGetters(['chartData','blockStatisticData','blockData','ValidatorData','hideSearch','isMove']),
            showedValidatorData(){
                if(this.ValidatorData.dataList.length>8){
                    if(this.styleEle&&this.ValidatorData.isRefresh){
                        // const index = document.styleSheets[0].cssRules.length
                        // debugger
                        // console.log('bbbb',this.styleEle)
                        if(this.styleEle.cssRules[0]){
                            this.styleEle.deleteRule(0);
                        }                   
                        this.addCSSRule(this.styleEle,'@keyframes nodeMove',`from {
                            transform: translate(0,${this.ValidatorData.dataList.length*-83}px);
                        }               
                        to {
                            transform: translate(0,0);
                        }`,0)
                    }
                    return this.ValidatorData.dataList.slice(0,8);
                }else{
                    return [];
                }
                
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
                hide:'HIDE_SEARCH',
                updateIsMove:'UPDATE_IS_MOVE',
            }),
            //查询
            searchFn(){
                this.disabledBtn=true;
                let param = {
                    parameter:this.searchKey.trim(),
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
                blockTimeChart.chart.on('mouseover',(e)=>{
                    indexService.unsubBlock();
                });
                blockTimeChart.chart.on('mouseout',()=>{
                    indexService.getChartData();
                })
            },
            initBlockTradeChart(){
                let r = this.$refs;
                blockTradeChart.init(r.blockTradeChart, blockTradeChart.blockTradeOption);
                blockTradeChart.chart.on('mouseover',(e)=>{
                    indexService.unsubBlock();
                });
                blockTradeChart.chart.on('mouseout',()=>{
                    indexService.getChartData();
                })
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
                    // if(data.yb){
                    //     data.ya.shift();
                    //     data.x.shift();
                    //     data.ya.push(data.ya[6]);
                    //     data.x.push(data.x[6]);
                    //     // return;
                    // }  
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
            scrollHandle(){
                const top = document.documentElement.scrollTop || document.body.scrollTop
                if(top>160){
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
            //进入提案列表
            goProposal(){
                this.$router.push('/proposal');
            },
            // 动态追加css
            addCSSRule(sheet, selector, rules, index) {               
                if("insertRule" in sheet) {
                    sheet.insertRule(selector + "{" + rules + "}", index);
                }else if("addRule" in sheet) {
                    sheet.addRule(selector, rules, index);
                }
            },
            //处理验证人轮播
            createStyle(){
                this.ele = document.createElement('style');
                // 设置style属性
                this.ele.type = 'text/css';
                // 将 keyframes样式写入style内
                // 将style样式存放到head标签
                document.getElementsByTagName('head')[0].appendChild(this.ele);
                this.styleEle = document.styleSheets[document.styleSheets.length-1];
                console.log('aaaa',this.styleEle);
            }

        },
        //生命周期函数
        created() {
            console.log('aaa',IndexService)
            indexService = new IndexService();          
        },
        mounted() {
            // console.log('aaaa',document.styleSheets);
            // this.styleEle = document.styleSheets[0];
            this.createStyle();

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

            const block1 = document.getElementById('zhezhao');
            const block2 = document.getElementById('blocks-ul-new2');
            block2.addEventListener('transitionend',()=>{
                this.isMove2 = true;
            },false)
            block1.addEventListener('transitionend',()=>{
                console.log('cccc',this.isMove)
                this.updateIsMove(false);
                // this.isMove = false;
                this.isMove2 = false;
            },false)            
        },
        beforeDestroy() {
            indexService.disconnect();           
        },
        destroyed() {
            window.removeEventListener('scroll',this.scrollHandle);
            indexService.disconnect();
            //视图摧毁需要将IsMove重置为false,否则在区块生长过程中的时候离开了视图，IsMove一直都是true；
            this.updateIsMove(false);
            // 移除动态追加的style
            document.getElementsByTagName('head')[0].removeChild(this.ele);
        },   
    }
</script>
<style lang="less" scoped>
    .index-wrap{
        // background: #000;
        position: relative;
        .tip{
            position: relative;           
            i{
                position: absolute;
                left: 0;
                top: 26px;
                z-index: 9999;
                display: none;
                background: rgba(0,0,0,0.8);
                color: #fff;
                padding: 4px 10px;
                font-size: 14px;
                border-radius: 4px;
                min-width: 120px;
                text-align: center;
            }
            &:hover i{
                display: inline-block;
            }
        }
        .lizi{
            position: absolute;
            height: 700px;
            width: 100%;
            top: -180px;
        }
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
                &.statistics-link a:hover{
                    color: #66B7DE;
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
                &.statistics-odd{
                    width: 55%;
                }      
                &.statistics-even{
                    width: 45%;
                }    
            }
        }
        .search-index{
            height: 69px;
            position: relative;
            &.search .el-input input{
                color: #fff;
            }
            &.search-active{
                border: 1px solid #fff;
            }
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
            margin: 140px auto;         
            h3{
                font-size: 40px;
                line-height: 47px;
                text-align: center;
                color: #fff;
                position: relative;
            }
            .search{
                margin-top: 50px;
                &.search-index .el-button.el-searchs{
                    width: 120px;
                    position: relative;
                }
                &.search-hide{
                    transition: transform 3.0s ease, opacity 3.0s ease;       
                    transform: translate(500px,-500px);
                    opacity: 0.0;
                }
            }
        }
        .bar-wrap{
            position: relative;
            .bar-right{
                position: absolute;
                right: -90px;
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
            @media only screen and (max-width: 1680px) {
                &.polyhedron-mini{
                    left: -68px;
                }
            }
            &.polyhedron-small{
                width: 50px;
                height: 50px;
                top: -26px;
                right: 10px;
            }
        }
    }
    .block-list-wrap{
        height: 650px;
        overflow: hidden;
        position: relative;
        .zhezhao{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 0px;
            z-index: 9999;
            // display: none;
            background: #000;
            &.active{
                transition: top 0.5s linear;
                height: 83px;
                top: -83px;                
            }
        }
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
                    position: absolute;
                    top: 0px;
                    left: 0;
                    width: 100%; 
                    opacity:0;
                    // visibility: hidden;        
                    &.blocks-active{
                        transition: all 0.5s linear;
                        opacity:1;
                    }
                } 
                &.blocks-ul-new2{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    &.blocks-active2{
                        transition: top 0.5s linear;
                        top: 83px;
                    }
                }
                li .list-item{
                    p a:hover{
                        color: #66B7DE;
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
                        border-radius: 50%;
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
                height: 100%;
                width: 100%;
                display: block;
                &:hover{
                    color: #66B7DE;
                }
            }
        }

    }
    .node-animation{
        animation: nodeMove 25s linear infinite;
        &:hover{
            animation-play-state:paused;
        }
    }

    // @keyframes nodeMove {
    //     from {
    //         transform: translate(0,-2075px);
    //     }
    
    //     to {
    //         transform: translate(0,0);
    //     }
    // }

</style>
<style lang="less">
    .index-area{
        background: #000;
        overflow: hidden;
        // padding: 86px 0 0 0;
        // height: 100%;
    }
    .search-index{
        &.search{
            border: 1px solid #6E6E6E;
            .el-input input{
                color: #fff;
            }
            .el-searchs.el-button--primary{
                background: #6E6E6E;
                color: #000;
                &:hover{
                    color: #666;
                }
                &:active{
                    color: #333;
                }
            }
            
        }
    }
    .chart canvas{
        left: -23px !important;
    }    
    .bar .el-progress{
        width: 80%;
        margin-top: 5px;
        &.progress-supply{
            width: 68%;
        }
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
        border: 1px solid #979797;
        border-radius: 4px;
        width: 210px;
        height: 69px;
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

