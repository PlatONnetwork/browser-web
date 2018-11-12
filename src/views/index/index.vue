<template>
    <div class="index">
        <com-header :descriptionProp='descriptionProp' @changeDataFn='changeDataFn'></com-header>
        <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
            <slideritem>
                <div v-show="isWorldMap" class="world-map">
                    <div ref="worldMap" class="world-map"></div>
                </div>
                <div v-show="!isWorldMap" class="earth-box">
                    <div ref="earthChart" class="earth-box"></div>
                </div>
                <ul class="footer-box">
                    <li>
                        <p class="color1">{{currentOverViewData.currentHeight}}</p>
                        <span>{{$t("indexInfo.blockHeight")}}</span>
                    </li>
                    <li>
                        <el-tooltip class="item" effect="dark" placement="bottom">
                            <div slot="content">{{currentOverViewData.node}}</div>
                            <p class='ellipsis'>{{currentOverViewData.node}}</p>
                        </el-tooltip>
                        <span>{{$t("indexInfo.node")}}</span>
                    </li>
                    <li>
                        <p class="color1">{{currentOverViewData.currentTransaction}}</p>
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
                    <li>
                        <p>{{currentOverViewData.voteAmount}}/{{currentOverViewData.proportion}}</p>
                        <span>{{$t("indexInfo.voteAmount")}}/{{$t("indexInfo.proportion")}}</span>
                    </li>
                    <li>
                        <p class="color2">{{currentOverViewData.ticketPrice}}
                            <span class="atp">ATP</span>
                        </p>
                        <span>{{$t("indexInfo.ticketPrice")}}</span>
                    </li>
                </ul>
                <div class="earth" :class="isWorldMap?'earth2':'earth1'" @click="changeEarth"></div>
            </slideritem>
            <slideritem class="second-floor">
                <header class="time-and-number">
                    Time And Number
                </header>
                <p class="second-floor-text">{{$t("indexInfo.timeandnum")}}</p>
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
            </slideritem>
            <slideritem class="third-floor">
                <div class="floor-area">
                    <div class="floor-area-box">
                        <header class="time-and-number">
                            Blocks
                        </header>
                        <!-- <p class="second-floor-text">最新区块</p> -->
                        <div class="second-floor-text2">
                            <p class='fl'>{{$t("indexInfo.blocks")}}</p>
                            <p class='fr'>
                                <el-button type="primary" class="el-same " :class="isRealtimeBlock?'el-sameon':'el-sameoff'" @click="changeRealtimeBlock">Realtime</el-button>
                            </p>
                        </div>
                        <el-table :data="blockData" style="width: 100%" :row-class-name="tableRowClassName" key='firstTable' size="mini" height="484">
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
                            <el-table-column prop="node" :label='$t("indexInfo.node")' show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="transaction" :label='$t("indexInfo.txn")' show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="blockReward" :label='$t("indexInfo.blockReward")' width="180" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div class="view-all cursor" @click='viewBlock'>View All</div>
                    </div>
                    <div class="floor-area-box">
                        <!-- <el-button class="fr el-same">Realtime</el-button> -->
                        <header class="time-and-number">
                            Transactions
                        </header>
                        <!-- <p class="second-floor-text">最新交易</p> -->
                        <div class="second-floor-text2">
                            <p class='fl'>{{$t("indexInfo.transactions")}}</p>
                            <p class='fr'>
                                <el-button type="primary" class="el-same" :class="isRealtimeTrade?'el-sameon':'el-sameoff'" @click="changeRealtimeTrade">Realtime</el-button>
                            </p>
                        </div>
                        <el-table :data="transactionData" style="width: 100%" :row-class-name="tableRowClassName" key='twoTable' size="mini" height="484">
                            <el-table-column prop="txHash" :label='$t("indexInfo.txhash")' show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="from" label="From" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="" width="40">
                                <template slot-scope="scope">
                                    <span>
                                        <i class='iconfont icon--icon-to iconto'></i>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="to" label="to" show-overflow-tooltip>
                                <!-- <template slot-scope="scope">
                                    <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                </template> -->
                                <template slot-scope="scope">
                                    <span :title='$t("elseInfo.contract")' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                    <span v-if='scope.row.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                    <span v-if='scope.row.txType !== "contractCreate"' class='cursor normal' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :label="$t('tradeAbout.value')" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.value}}ATP</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="view-all cursor" @click='tradeAllFn'>View All</div>
                    </div>
                </div>
                <com-footer></com-footer>
            </slideritem>
            <!-- 设置loading,可自定义 -->
            <div slot="loading">loading...</div>
        </slider>
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

    isRealtimeBlock: boolean = true;
    isRealtimeTrade: boolean = true;
    descriptionProp: string = '';
    isWorldMap: boolean = true;

    // 滑动配置[obj]
    options: object = {
        currentPage: 0, // 当前页码
        thresholdDistance: 500, // 滑动判定距离
        thresholdTime: 100, // 滑动判定时间
        autoplay: 0, // 自动滚动[ms]
        loop: true, // 循环滚动
        direction: 'vertical', // 方向设置，垂直滚动
        infinite: 1, // 无限滚动前后遍历数
        slidesToScroll: 1, // 每次滑动项数
    };

    slide(data) {
        // console.log('slide',data);
    }
    onTap(data) {
        // console.log('onTap',data);
    }
    onInit(data) {
        // console.log('onInit',data);
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
    }
    initEarthChart(): void {
        let r = this.$refs;
        earthChart.init(r.earthChart, earthChart.earthOption);
    }
    changeEarth(): void {
        this.isWorldMap = !this.isWorldMap;
        setTimeout(() => {
            this.isWorldMap ? this.initWorldMapChart() : this.initEarthChart();
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
        if (data.length) {
            data.forEach((item, index) => {
                let time = new Date(item.time).getSeconds();
                console.warn('time>>>>', time);
                // debugger
                // this.format(item.time)
                xList.push(item.height);
                yListTime.push(time);
                // yListTime.push(time);
                yListNum.push(item.transaction);
            });
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
        if (row.txType == 'transactionExecute') {
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

    mounted() {
        //初始化图表
        this.initChart();
        this.initWorldMapChart();
        indexService.getChartData().then(data => {
            worldMapChart.chart.appendData({
                seriesIndex: 0,
                data,
            });
        });
        indexService.updateChartData().then(data => {});
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
        this.updateChart(val['blockStatisticList']);
    }
}
</script>
<style lang="less">
.swiper-container-vertical .slider-pagination-bullet {
    background: #3c4fa1;
    opacity: 1;
    margin: 12px 0;
    right: 30px;
}
.slider-pagination-bullet-active {
    background: none;
    border: solid 2px #ffff00;
}
.el-same {
    border-width: 0;
    outline: none;
    border-color: transparent;
    span {
        padding-left: 8px;
        font-size: 14px;
    }
    &:hover {
        border-width: 0;
        border-color: transparent;
    }
    &:active {
        border-width: 0;
        border-color: transparent;
    }
}
</style>
<style lang="less" scoped>
.index {
    height: 100%;
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
        height: 56px;
        width: 100/7%;
        flex: 1/7;
        text-align: center;
    }
    p {
        margin: 0 0 13px;
        height: 45px;
        font-size: 40px;
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
    padding: 100px 100px 0 100px;
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
    padding: 0 50px;
    min-height: calc(100% - 170px);
}
.floor-area-box {
    padding: 0 50px;
    width: 50%;
}
.time-and-number {
    position: relative;
    width: 592px;
    height: 48px;
    font-size: 64px;
    line-height: 30px;
    letter-spacing: 3.8px;
    color: #3c425d;
    opacity: 0.2;
}
.second-floor-text {
    position: absolute;
    top: 125px;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
    opacity: 1;
    letter-spacing: 1px;
}
.second-floor-text1 {
    top: 590px;
}
.buttons {
    // position: absolute;
}

.chart-box {
    display: flex;
}
.chart {
    flex: 1;
    padding: 35px 0 55px;
    height: 415px;
}
.chart-aside {
    width: 163+89+88px;
    height: 415px;
    font-family: DINCond-Regular;
    li {
        padding: 10px 0 87px 88px;
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
    margin: 12px 0 0;
    height: 44px;
    line-height: 44px;
    background: #0d1333;
    text-align: center;
    color: #fcff0a;
}
.second-floor-text2 {
    position: relative;
    top: -43px;
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
.el-sameon {
    background: url(images/on.png) no-repeat #252c57 8px center;
    color: #ffff00;
    border-width: 0;
}
.el-sameoff {
    background: url(images/off.png) no-repeat #131736 8px center;
    color: #2b2d45;
}
</style>