<template>
    <div class="index">
        <com-header :descriptionProp='descriptionProp' @changeDataFn='changeDataFn' class='header-special'></com-header>
        <div ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit' v-scroll="mousewheel">
            <div class="tmp-class">
                <div v-show="isWorldMap" class="world-map world-map1">
                    <div ref="worldMap" class="world-map"></div>
                </div>
                <div v-show="!isWorldMap" class="earth-box earch-box1">
                    <div ref="earthChart" class="earth-box"></div>
                </div>
                <ul class="footer-box">
                    <li>
                        <p class="color1 cursor" @click='viewBlock'>{{currentOverViewData.currentHeight}}</p>
                        <span>{{$t("indexInfo.blockHeight")}}</span>
                    </li>
                    <li>
                        <el-tooltip class="item" effect="dark" placement="bottom">
                            <div slot="content">{{currentOverViewData.node}}</div>
                            <p class='ellipsis'>{{currentOverViewData.node}}</p>
                        </el-tooltip>
                        <!-- <p class=''>{{currentOverViewData.node}}</p> -->
                        <span>{{$t("indexInfo.node")}}</span>
                    </li>
                    <li>
                        <p class="color1 cursor" @click='tradeAllFn'>{{currentOverViewData.currentTransaction}}</p>
                        <span>{{$t("indexInfo.currentTransaction")}}</span>
                    </li>
                    <li>
                        <p class="color1">{{currentOverViewData.consensusNodeAmount}}</p>
                        <span>{{$t("indexInfo.consensusNodeAmount")}}</span>
                    </li>
                    <li>
                        <p>{{currentOverViewData.addressAmount}}</p>
                        <span>{{$t("indexInfo.addressAmount")}}</span>
                    </li>
                    <!-- <li>
                        <p>{{currentOverViewData.voteAmount}}/{{currentOverViewData.proportion}}</p>
                        <span>{{$t("indexInfo.voteAmount")}}/{{$t("indexInfo.proportion")}}</span>
                    </li>
                    <li>
                        <p class="color2">{{currentOverViewData.ticketPrice}}
                            <span class="atp">Energon</span>
                        </p>
                        <span>{{$t("indexInfo.ticketPrice")}}</span>
                    </li> -->
                </ul>
                <div class="earth" :class="isWorldMap?'earth2':'earth1'" @click="changeEarth"></div>
            </div>
            <div class="second-floor tmp-class">
                <div class='slide-top'></div>
                <div class='slide-bottom'>
                    <!-- <header class="time-and-number">
                        Time And Number
                    </header> -->
                    <header class="time-and-number time-and-number2">
                        <span class='block'>Time And Number</span>
                        <div class="second-floor-text2">
                            <p class='fl'>{{$t("indexInfo.timeandnum")}}</p>
                        </div>
                        <!-- <p class="second-floor-text">{{$t("indexInfo.timeandnum")}}</p> -->
                    </header>
                    <!-- <p class="second-floor-text">{{$t("indexInfo.timeandnum")}}</p> -->
                    <div class="chart-box">
                        <div class="chart" ref="blockChart"></div>
                        <ul class="chart-aside">
                            <li>
                                <p>{{$t("indexInfo.avgTime")}}</p>
                                <span>{{secondFloorData.avgTime}} s</span>
                            </li>
                            <li>
                                <p>{{$t("indexInfo.current")}}/{{$t("indexInfo.maxTps")}}</p>
                                <span>{{secondFloorData.current}} / {{secondFloorData.maxTps}}</span>
                            </li>
                            <li>
                                <p>{{$t("indexInfo.avgTransaction")}}</p>
                                <span>{{secondFloorData.avgTransaction}}</span>
                            </li>
                        </ul>
                    </div>
                    <header class="time-and-number">
                        Transactions
                    </header>
                    <p class="second-floor-text second-floor-text1">{{$t("indexInfo.transactionsperday")}}</p>
                    <p class="transactions">{{$t("indexInfo.monitor")}}</p>
                    <ul class="num-box clearfix">
                        <!-- <li>{{secondFloorData.dayTransaction}}</li> -->
                        <!-- secondFloorData.dayTransaction -->
                        <li v-for='(item,index) in secondFloorData.dayTransaction.toString()' :key='index'>{{item}}</li>
                        <!-- <li>2</li>
                        <li>0</li>
                        <li>2</li>
                        <li>0</li>
                        <li>2</li> -->
                    </ul>
                </div>

            </div>
            <div class="third-floor tmp-class">
                <div class='slide-top slide-top1'></div>
                <div class='slide-bottom slide-bottom1'>
                    <div class="floor-area">
                        <div class="floor-area-box">
                            <header class="time-and-number time-and-number2">
                                <span class='block'>Blocks</span>
                                <div class="second-floor-text2">
                                    <p class='fl'>{{$t("indexInfo.blocks")}}</p>
                                    <p class='fr index-btn'>
                                        <el-button type="primary" class="el-same " :class="isRealtimeBlock?'el-sameon':'el-sameoff'" @click="changeRealtimeBlock">{{ isRealtimeBlock?$t('indexInfo.realtime'):$t('indexInfo.cancel')}}</el-button>
                                    </p>
                                </div>
                            </header>
                            <!-- <div class="second-floor-text2">
                                <p class='fl'>{{$t("indexInfo.blocks")}}</p>
                                <p class='fr index-btn'>
                                    <el-button type="primary" class="el-same " :class="isRealtimeBlock?'el-sameon':'el-sameoff'" @click="changeRealtimeBlock">{{ isRealtimeBlock?$t('indexInfo.realtime'):$t('indexInfo.cancel')}}</el-button>
                                </p>
                            </div> -->
                            <el-table :data="blockData" style="width: 100%" :row-class-name="tableRowClassName" key='firstTable' size="mini" max-height='484' class='tables'>
                                <el-table-column prop="height" :label='$t("indexInfo.height")' width="180">
                                    <template slot-scope="scope">
                                        <span class='cursor normal' @click='goBlockDetail(scope.$index,scope.row)'>{{scope.row.height}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label='$t("indexInfo.age")' width="180">
                                    <template slot-scope="scope">
                                        <span>{{timeDiffFn(scope.row.serverTime,scope.row.timestamp)}}{{$t('indexInfo.before')}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="node" :label='$t("indexInfo.node")' show-overflow-tooltip></el-table-column>
                                <el-table-column prop="transaction" :label='$t("indexInfo.txn")' show-overflow-tooltip></el-table-column>
                                <!-- <el-table-column prop="blockReward" :label='$t("indexInfo.blockReward")' width="180" show-overflow-tooltip></el-table-column> -->
                                <el-table-column prop="blockReward" :label='$t("indexInfo.blockReward")' width="180" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.blockReward}} Energon</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="view-all cursor" @click='viewBlock'>{{$t('indexInfo.view')}}</div>
                        </div>
                        <div class="floor-area-box">
                            <header class="time-and-number time-and-number2">
                                <span class='block'>Transactions</span>
                                <div class="second-floor-text2">
                                    <p class='fl'>{{$t("indexInfo.transactions")}}</p>
                                    <p class='fr index-btn'>
                                        <el-button type="primary" class="el-same" :class="isRealtimeTrade?'el-sameon':'el-sameoff'" @click="changeRealtimeTrade">{{ isRealtimeTrade?$t('indexInfo.realtime'):$t('indexInfo.cancel')}}</el-button>
                                    </p>
                                </div>
                            </header>

                            <el-table :data="transactionData" style="width: 100%" :row-class-name="tableRowClassName" key='twoTable' size="mini" max-height='484'  class='tables'>
                                <el-table-column prop="txHash" :label='$t("indexInfo.txhash")' width='190'>
                                    <template slot-scope="scope">
                                        <div class='flex-special'>
                                            <el-tooltip class="item" effect="dark" placement="top">
                                                <div slot="content">{{scope.row.txHash}}</div>
                                                <span class='cursor normal ellipsis' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                                            </el-tooltip>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="from" label="From" width='190'>
                                    <template slot-scope="scope">
                                        <div class='flex-special'>
                                            <el-tooltip class="item" effect="dark" placement="top">
                                                <div slot="content">{{scope.row.from}}</div>
                                                <span class='cursor normal ellipsis' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                                            </el-tooltip>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="" width="40">
                                    <template slot-scope="scope">
                                        <span>
                                            <i class='iconfont icon--icon-to iconto'></i>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="to" label="To" width='190'>
                                    <template slot-scope="scope">
                                        <div class='flex-special'>
                                            <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                            <el-tooltip class="item" effect="dark" placement="top" v-if='scope.row.txType !== "contractCreate"'>
                                                <div slot="content">{{scope.row.to}}</div>
                                                <span class='cursor normal ellipsis' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                            </el-tooltip>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('tradeAbout.value')" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.value}} Energon</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="view-all cursor" @click='tradeAllFn'>{{$t('indexInfo.view')}}</div>
                        </div>
                    </div>
                </div>

                <com-footer class='footerss'></com-footer>

            </div>
            <!-- 设置loading,可自定义 -->
            <!-- <div slot="loading">loading...</div> -->
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {Getter} from 'vuex-class';
import comHeader from '@/components/header/header.vue';
import comFooter from '@/components/footer/footer.vue';
import {slider, slideritem} from 'vue-concise-slider';
import apiServices from '@/services/API-services';
import ChartService from '@/services/chart-services';
import IndexService from '@/services/index-service';
import index from '@/router/map';
import {timeDiff} from '@/services/time-services';
const blockChart = new ChartService(),
    worldMapChart = new ChartService(),
    earthChart = new ChartService();

let indexService = null;

@Component({
    components: {
        comHeader,
        comFooter,
        slider,
        slideritem,
    },
    directives:{
        'scroll': {
            inserted(el, binding) {
                let cb = binding.value
                el.addEventListener('mousewheel', function (e) {
                    const direction = e.deltaY > 0 ? 'down' : 'up'
                    cb(direction)
                })
            }
        }
    }
})
export default class Index extends Vue {
    @Getter
    chainId;
    @Getter
    blockData;
    @Getter
    transactionData;
    @Getter
    currentOverViewData;
    @Getter
    secondFloorData;
    @Getter chartData;
    @Getter earthData
    @Getter mapData

    isRealtimeBlock: boolean = true;
    isRealtimeTrade: boolean = true;
    descriptionProp: string = '';
    isWorldMap: boolean = true;

    // 滑动配置[obj]
    // options: object = {
    //     currentPage: 0, // 当前页码
    //     thresholdDistance: 500, // 滑动判定距离
    //     thresholdTime: 100, // 滑动判定时间
    //     autoplay: 0, // 自动滚动[ms]
    //     loop: true, // 循环滚动
    //     direction: 'vertical', // 方向设置，垂直滚动
    //     infinite: 1, // 无限滚动前后遍历数
    //     slidesToScroll: 1, // 每次滑动项数
    //     // preventDocumentMove:true,//触发触摸事件时，整个页面会滚动
    //     effect:'slide',//切换效果
    // };
    options: object = {
        currentPage: 0, // 当前页码
        autoplay: 0, // 自动滚动[ms]
        direction: 'vertical', // 方向设置，垂直滚动
    };

    slide(data:any) {
        console.log('slide 666',data);
        this.options['currentPage']=data.currentPage
    }
    onTap(data) {
        console.log('onTap 666',data);
    }
    onInit(data) {
        console.log('onInit 666',data);
    }
    changeDataFn() {}
    timeDiffFn(beginTime, endTime) {
        return timeDiff(beginTime, endTime);
    }
    initChart(): void {
        let r = this.$refs;
        blockChart.init(r.blockChart, blockChart.blocklineOption);
        // worldMapChart.init(r.worldMap, worldMapChart.worldMapOption);
        // earthChart.init(r.earthChart,earthChart.earthOption)
    }
    initWorldMapChart(): void {
        let r = this.$refs;
        worldMapChart.init(r.worldMap, worldMapChart.worldMapOption);
        this.updateMapData(this.mapData)
    }
    initEarthChart(): void {
        let r = this.$refs;
        earthChart.init(r.earthChart, earthChart.earthOption);
        this.updateEarthChart(this.earthData)
    }
    updateEarthChart(data:Array<Array<any>>){
        console.log(earthChart)
        // if(earthChart.earthOption.globe.baseTexture){
        //     earthChart.update({
        //         series: [
        //             {
        //                 data: data[0],
        //             },
        //             {
        //                 data: data[1],
        //             },
        //             {
        //                 data: data[2],
        //             }
        //         ],
        //         globe:{
        //             show:true
        //         }
        //     });
        // }
        earthChart.update({
            series: [
                {
                    data: data[0],
                },
                {
                    data: data[1],
                },
                {
                    data: data[2],
                }
            ],
        });

    }
    changeEarth(): void {
        this.isWorldMap = !this.isWorldMap;
        setTimeout(() => {
            this.isWorldMap ? this.initWorldMapChart() : this.initEarthChart();
            // this.isWorldMap ?  this.updateMapData(this.mapData) : this.initEarthChart()
            this.isWorldMap ? worldMapChart.chart.resize() : earthChart.chart.resize();
        }, 0);
    }
    tableRowClassName({row: object, rowIndex}) {
        if (rowIndex % 2 === 0) {
            return 'even-row';
        } else {
            return 'odd-row';
        }
    }
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
        blockChart.update({
            xAxis: [
                {
                    data: xList,
                },
            ],
            series: [
                {
                    data: yListTime,
                },
                {
                    data: yListNum,
                },
            ],
        });
    }
    getBlock() {
        indexService.getBlockData();
        indexService.updateBlockData();
    }
    getTransaction() {
        indexService.getTransactionData();
        indexService.updateTransactionData();
    }
    //区块 订阅
    changeRealtimeBlock() {
        this.isRealtimeBlock = !this.isRealtimeBlock;
        //重启订阅
        this.isRealtimeBlock ? this.getBlock() : indexService.unsubBlock();
    }
    //交易 订阅
    changeRealtimeTrade() {
        this.isRealtimeTrade = !this.isRealtimeTrade;
        //重启订阅
        this.isRealtimeTrade
            ? this.getTransaction()
            : indexService.unsubTransaction();
    }
    //交易查看全部
    tradeAllFn() {
        this.$router.push({
            path: '/trade',
        });
    }
    //区块查看全部
    viewBlock() {
        console.log(11111);
        this.$router.push({
            path: '/block',
        });
    }
    //进入区块详情
    goBlockDetail(index, row) {
        this.$router.push({
            path: '/block-detail',
            query: {
                height: row.height,
            },
        });
    }
    //进入交易哈希详情
    goTradeDetail(index, row) {
        this.$router.push({
            path: '/trade-detail',
            query: {
                txHash: row.txHash,
            },
        });
    }
    //进入钱包地址详情
    goAddressDetail(index, row) {
        this.$router.push({
            path: '/address-detail',
            query: {
                address: row.from,
                description: '',
            },
        });
    }
    //进入钱包地址详情或者合约详情
    goDetail(index, row) {
        if (row.receiveType == 'contract') {
            //进入合约详情
            this.$router.push({
                path: '/contract-detail',
                query: {
                    address: row.to,
                    description: '',
                },
            });
        } else {
            //进入钱包地址详情
            this.$router.push({
                path: '/address-detail',
                query: {
                    address: row.to,
                    description: '',
                },
            });
        }
    }
    updateMapData(data){
        console.warn('地图data》》》',data)
        console.warn('地图length》》》',data.length)
        let nodeNormal=[],normal=[],annormal=[];
        data.forEach((item)=>{
            if(item.netState===1){
                //正常 判断是否是共识节点
                item.nodeType===1?nodeNormal.push([item.longitude,item.latitude]):normal.push([item.longitude,item.latitude])
            }else if(item.netState===2){
                //异常
                annormal.push([item.longitude,item.latitude])
            }
        });
        console.warn("nodeNormal",nodeNormal)
        console.warn("normal",normal)
        console.warn("annormal",annormal)
        worldMapChart.update({
            series: [
                {
                    data: nodeNormal,//正常共识节点
                },
                {
                    data: normal,//正常普通节点
                },
                {
                    data: annormal,//所有异常节点
                }
            ],
        });
    }
    mousewheel(direction:string){
        return false;

        const slider:any=this.$refs.slider
        const len:number=slider.$children.length
        let page:number=this.options['currentPage']
        if(direction==='up'){
            if(--page<0){
                page=len-1
            }
            slider.slide(page)
        }else if(direction==='down'){
            if(++page>=len){
                page=0
            }
            slider.slide(page)
        }
        this.options['currentPage']=page
    }
    mounted() {
        //初始化图表
        this.initChart();
        this.initWorldMapChart();
        this.initEarthChart();
        indexService.getChartData()
        indexService.updateChartData()

        //重置图表尺寸
		window.onresize = function() {
            // console.warn(blockChart)
            // console.warn(worldMapChart)
            // console.warn(earthChart)
            blockChart.chart.resize();
            worldMapChart.chart.resize();
            earthChart.chart.resize()
		};
    }
    created() {
        indexService = new IndexService();
        indexService.getOverviewData();
        indexService.updateOverviewData();
        indexService.getSecondFloorData();
        indexService.updateSecondFloorData();
        this.getBlock();
        this.getTransaction();
    }
    updated() {}
    beforeDestroy() {
        indexService.disconnect();
    }
    destroyed() {
        indexService.disconnect();
    }

    @Watch('chainId')
    onChainIdChanged(val: string, oldVal: string): void {
        indexService.disconnect();
        indexService.connect();
    }
    @Watch('secondFloorData')
    onSecondFloorDataChanged(val: object, oldVal: object): void {
        this.updateChart(val['graphData']);
    }
    // @Watch('chartData')
    // onChartDataChanged(val: Array<object>, oldVal: Array<object>): void {
        // console.warn('val>>>>',val)
        // worldMapChart.chart.appendData({
        //     seriesIndex: 0,
        //     data:val,
        // });
    // }
    @Watch('earthData')
    onEarthDataChanged(val: Array<Array<object>>, oldVal: Array<Array<object>>): void {
        this.updateEarthChart(val)
    }
    @Watch('mapData')
    onMapDateChanges(val: object, oldVal: object): void{
        this.updateMapData(val)
    }
}
</script>
<style lang="less">
.slider-item{
    box-sizing: border-box;
}
.swiper-container-vertical .slider-pagination-bullet {
    background: #3c4fa1;
    opacity: 1;
    margin: 12px 0;
    right: 30px;
    width: 8px;
    height: 8px;
}
.slider-pagination-bullet-active {
    background: none;
    border: solid 2px #ffff00;
}
.el-same {
    border-width: 0;
    outline: none;
    border-color: transparent;

    &:hover {
        border-width: 0;
        border-color: transparent;
    }
    &:active {
        border-width: 0;
        border-color: transparent;
    }
}
.index-btn {
    .el-same {
        border-width: 0;
        outline: none;
        border-color: transparent;
        width: 90px;
        padding: 12px 0;
        span {
            padding-left: 8px;
            font-size: 14px;
        }
    }
    .el-sameon {
        background: url(images/on.png) no-repeat #252c57 8px center;
        color: #ffff00;
        border-width: 0;
    }
    .el-sameoff {
        background: url(images/off.png) no-repeat #252c57 8px center;
        color: #ffffff;
        border-width: 0;
    }
    .el-sameon:hover {
        background: url(images/on.png) no-repeat #252c57 8px center;
        color: #ffff00;
        border-color: transparent;
        border-width: 0;
    }
    .el-sameon:focus {
        background: url(images/on.png) no-repeat #252c57 8px center;
        color: #ffff00;
        border-color: transparent;
        border-width: 0;
    }
    .el-sameon:active {
        background: url(images/on.png) no-repeat #252c57 8px center;
        color: #ffff00;
        outline: none;
        border-color: transparent;
        border-width: 0;
    }
    .el-sameoff:hover {
        background: url(images/off.png) no-repeat #252c57 8px center;
        color: #ffffff;
        border-color: transparent;
        border-width: 0;
    }
    .el-sameoff:focus {
        background: url(images/off.png) no-repeat #252c57 8px center;
        color: #ffffff;
        border-color: transparent;
        border-width: 0;
    }
    .el-sameoff:active {
        background: url(images/off.png) no-repeat #252c57 8px center;
        color: #ffffff;
        outline: none;
        border-color: transparent;
        border-width: 0;
    }
}
</style>
<style lang="less" scoped>
.header-special {
    background: none;
}
.index {
    height: 100%;
    .header-wrap{
            background:#040b27;
    }
}
div.slider-item {
    display: initial;
    font-size: 14px;
    text-align: left;
}

// .color1 {
//     color: #fcff0a;
// }
// .color2 {
//     color: #ff374f;
// }
.footer-box {
    position: absolute;
    margin: 0 200px;
    left: 0;
    right: 0;
    bottom: 30px;
    display: flex;
    > li {
        // height: 56px;
        width: 100/5%;
        flex: 1/5;
        text-align: center;
    }
    p {
        margin: 0 0 2px;
        // height: 45px;
        font-size: 40px;
        height: 40px;
        line-height: 40px;
        letter-spacing: 2.4px;
        color: #d2daea;
    }
    .atp {
        font-size: 30px;
        color: #ff374f;
    }
    .color1 {
        color: #fcff0a;
    }
    .color2 {
        color: #ff374f;
    }
    span {
        letter-spacing: 1.4px;
        color: #6d81a9;
    }
}
.world-map,
.earth-box {
    width: 100%;
    height: 100%;
}
.earth {
    position: absolute;
    bottom: 30px;
    right: 43px;
    width: 113px;
    height: 70px;
    background-repeat: no-repeat;
    cursor: pointer;
}
.earth1 {
    background-image: url('./images/big.png');
    background-position: center center;
}
.earth2 {
    background-image: url('./images/small.png');
    background-position: center center;
}

.second-floor {
    // padding: 100px 100px 0 100px;
    padding:100px 5.2% 0 5.2%
}
.third-floor {
    padding: 100px 0 0;
    // min-height:calc(100% - 190px);
}
.floor-area {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    // padding: 0 50px;
    padding:0 5.2%;
    // min-height: calc(100% - 170px);
}
.floor-area-box {
    // padding: 0 50px;
    width: 50%;
    padding-right:2.6%;
    &:first-child{

    }
}
.second-floor-text1 {
    top: 590px;
}
.chart-box {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.chart {
    flex: 1;
    padding: 35px 0 55px;
    height: 415px;
}
.chart-aside {
    // width: 163+89+88px;
    // height: 415px;
    font-family: DINCond-Regular;
    li {
        // padding: 10px 0 87px 88px;
        padding: 10px 0 48px 88px;
        padding-left:0;
    }
    p {
        padding: 0 0 12px;
        font-size: 16px;
        line-height: 30px;
        letter-spacing: 1.6px;
        color: #6d81a9;
    }
    span {
        font-size: 42px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 2.5px;
        color: #d2daea;
    }
}
.transactions {
    font-size: 12px;
    line-height: 30px;
    letter-spacing: 0.7px;
    color: #8d9bb8;
}
.num-box {
    padding: 30px 0 0;
    > li {
        margin: 0 50px 0 0;
        float: left;
        width: 121px;
        height: 140px;
        background-color: rgba(20, 33, 87, 0.5);
        font-family: DINCond-Regular;
        font-size: 100px;
        line-height: 140px;
        letter-spacing: 6px;
        color: #fcff0a;
        text-align: center;
    }
}
.view-all {
    margin: 0 0;
    height: 34px;
    line-height: 34px;
    background: #0d1333;
    text-align: center;
    color: #fcff0a;
    margin-top:5px;
}
.second-floor-text2 {
    position: relative;
    top: -31px;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
    opacity: 1;
    letter-spacing: 1px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
    .fl {
        margin-top: 25px;
    }
}
.world-map1 {
    background: url(images/background-big.png) no-repeat center,
        url(images/background-big2.png) no-repeat center;
    background-size: 100% 100%;
}
.earch-box1 {
    background: url(images/background-big2.png) no-repeat center;
    // background:url(images/background-big.png)  no-repeat center,
    // url(images/background-big2.png) no-repeat center;
    background-size: 100% 100%;
}
.second-floor{
    padding-top:0;
}
.slide-top{
    height:100px;
    width:100%;
}
.slide-bottom{
    min-height: calc(100% - 100px);
}
.third-floor {
    padding-top:0;
}
.slide-top1{
    height:100px;
}
.slide-bottom1{
    min-height: calc(100% - 270px);
}
.time-and-number2{
    opacity: 1;
    width:100%;
    .block{
        opacity: 0.2;
    }
}
.tmp-class{
    position: relative;
    width: 100%;
    height: 990px;
}
@media screen and (max-width: 1680px) {
    .footer-box p{
        font-size:34px;
        height: 34px;
        line-height: 34px;
    }
    .footer-box span{
        font-size:14px;
    }
    .chart-aside span{
        font-size:36px;
    }
    .chart-aside li{
        padding: 10px 0 48px 0px;
    }
    .num-box > li{
        width:102px;
        height:120px;
        line-height:120px;
        margin:0 24px 0 0;
        font-size:88px;
    }
    .num-box{
        padding-top:10px;
    }
    .slide-top1{
        height:75px;
    }
    .slide-bottom1{
        min-height: calc(100% - 245px);
    }


}
@media screen and (max-width: 1440px) {
    .footer-box p{
        font-size:28px;
        height: 28px;
        line-height: 28px;
    }
    .footer-box span{
        font-size:14px;
    }
    .chart-aside span{
        font-size:30px;
    }
    .chart-aside li{
        padding: 10px 0 48px 0px;
    }
    .num-box > li{
        width:88px;
        height:100px;
        line-height:100px;
        margin:0 20px 0 0;
        font-size:76px;
    }
    .num-box{
        padding-top:10px;
    }

}
@media screen and (max-width: 1368px) {
    .footer-box p{
        font-size:26px;
        height: 26px;
        line-height: 26px;
    }
    .footer-box span{
        font-size:13px;
    }
    .chart-aside span{
        font-size:26px;
    }
    .chart-aside li{
        padding: 10px 0 30px 0px;
    }
    .num-box > li{
        width:82px;
        height:94px;
        line-height:94px;
        margin:0 20px 0 0;
        font-size:74px;
    }
    .num-box{
        padding-top:10px;
    }
    .slide-top{
        height:70px;
    }
    .second-floor-text1{
        top:475px;
    }
    .slide-top1{
        height:70px;
    }
    .footerss{
        height:177px;
        padding-top:4px;
    }
    .chart-box{
        height:333px;
    }
    .chart{
        padding-top:0;
        height:350px;
        padding-bottom: 20px;
    }
    .view-all{
        height:25px;
        line-height:25px;
        margin-bottom:5px;
    }
    .transactions{
        line-height:20px;
    }
    .tmp-class{
        width: 100%;
        height: 720px;
    }
}
@media screen and (max-width: 1280px) {
    .footer-box p{
        font-size:24px;
        height: 24px;
        line-height: 24px;
    }
    .footer-box span{
        font-size:13px;
    }
    .chart-aside span{
        font-size:26px;
    }
    .chart-aside li{
        padding: 10px 0 48px 0px;
    }
    .num-box > li{
        width:78px;
        height:91px;
        line-height:91px;
        margin:0 18px 0 0;
        font-size:70px;
    }
    .num-box{
        padding-top:10px;
    }
}
// @media screen and (max-height: 768px) {
//     .chart{
//         height:405px;
//     }

// }
</style>