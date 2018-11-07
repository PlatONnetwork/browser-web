<template>
    <div class="index">
        <com-header :descriptionProp='descriptionProp'></com-header>
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
                        <span>当前区块高度</span>
                    </li>
                    <li>
                        <p>{{currentOverViewData.node}}</p>
                        <span>出块节点</span>
                    </li>
                    <li>
                        <p class="color1">{{currentOverViewData.currentTransaction}}</p>
                        <span>当前交易笔数</span>
                    </li>
                    <li>
                        <p class="color1">{{currentOverViewData.consensusNodeAmount}}</p>
                        <span>共识节点数s</span>
                    </li>
                    <li>
                        <p>{{currentOverViewData.addressAmount}}</p>
                        <span>地址数</span>
                    </li>
                    <li>
                        <p>{{currentOverViewData.voteAmount}}/{{currentOverViewData.proportion}}</p>
                        <span>投票数/占比</span>
                    </li>
                    <li>
                        <p class="color2">{{currentOverViewData.ticketPrice}}
                            <span class="atp">ATP</span>
                        </p>
                        <span>票价</span>
                    </li>
                </ul>
                <div class="earth" :class="isWorldMap?'earth2':'earth1'" @click="changeEarth"></div>
            </slideritem>
            <slideritem class="second-floor">
                <header class="time-and-number">
                    Time And Number
                </header>
                <p class="second-floor-text">出块时间及交易数量</p>
                <div class="chart-box">
                    <div class="chart" ref="blockChart"></div>
                    <ul class="chart-aside">
                        <li>
                            <p>平均出块时长</p>
                            <span>{{secondFloorData.avgTime}} s</span>
                        </li>
                        <li>
                            <p>当前/最大交易TPS</p>
                            <span>{{secondFloorData.current}} / {{secondFloorData.maxTps}}</span>
                        </li>
                        <li>
                            <p>平均区块交易数</p>
                            <span>{{secondFloorData.avgTransaction}}</span>
                        </li>
                    </ul>
                </div>
                <header class="time-and-number">
                    Transactions
                </header>
                <p class="second-floor-text second-floor-text1">每日交易笔数</p>
                <p class="transactions">过去24小时交易笔数实时统计</p>
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
                            <p class='fl'>最新区块</p>
                            <p class='fr'>
                                <el-button type="primary" class="el-same " :class="isRealtimeBlock?'el-sameon':'el-sameoff'" @click="changeRealtimeBlock">Realtime</el-button>
                            </p>
                        </div>
                        <el-table :data="blockData" style="width: 100%" :row-class-name="tableRowClassName" key='firstTable' size="mini" height="484">
                            <el-table-column prop="height" label="区块高度" width="180">
                                <template slot-scope="scope">
                                    <span class='cursor normal' @click='goBlockDetail(scope.$index,scope.row)'>{{scope.row.height}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="timestamp" label="币龄" width="180">
                                <!-- <template slot-scope="scope">
                                    <span>{{new Date(scope.row.timestamp).Format('yyyy-MM-dd')}}</span>
                                </template> -->
                            </el-table-column>
                            <el-table-column prop="node" label="出块节点">
                            </el-table-column>
                            <el-table-column prop="transaction" label="交易数">
                            </el-table-column>
                            <el-table-column prop="blockReward" label="奖励">
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
                            <p class='fl'>最新交易</p>
                            <p class='fr'>
                                <el-button type="primary" class="el-same" :class="isRealtimeTrade?'el-sameon':'el-sameoff'" @click="changeRealtimeTrade">Realtime</el-button>
                            </p>
                        </div>
                        <el-table :data="transactionData" style="width: 100%" :row-class-name="tableRowClassName" key='twoTable' size="mini" height="484">
                            <el-table-column prop="txHash" label="交易哈希" width="180">
                                <template slot-scope="scope">
                                    <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="from" label="From" width="180">
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
                            <el-table-column prop="to" label="to">
                                <!-- <template slot-scope="scope">
                                    <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                </template> -->
                                <template slot-scope="scope">
                                    <span title='合约' v-if='scope.row.txType == "contractCreate" || scope.row.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i></span>
                                    <span v-if='scope.row.txType == "contractCreate"'>合约创建</span>
                                    <span v-if='scope.row.txType !== "contractCreate"' class='cursor normal' @click='goDetail(scope.$index,scope.row)'>{{scope.row.to}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="value" label="数额">
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
import Component from 'vue-class-component';
import {Getter} from 'vuex-class';
import comHeader from '@/components/header/header.vue';
import comFooter from '@/components/footer/footer.vue';
import {slider, slideritem} from 'vue-concise-slider';
import apiServices from '@/services/API-services';
import ChartService from '@/services/chart-services';
import IndexService from '@/services/index-service';

const blockChart = new ChartService(),
    indexService = new IndexService(),
    worldMapChart = new ChartService(),
    earthChart = new ChartService();

@Component({
    components: {
        comHeader,
        comFooter,
        slider,
        slideritem,
    },
})
export default class Index extends Vue {
    // @Getter info;

    isRealtimeBlock: boolean = true;
    isRealtimeTrade:boolean=true
    descriptionProp: string = '';
    isWorldMap: boolean = true;

    currentOverViewData: object = {
        currentHeight: '666666', //当前区块高度
        node: '666666', //出块节点
        currentTransaction: '666666', //当前交易笔数
        consensusNodeAmount: '666666', //共识节点数
        addressAmount: '666666', //地址数
        voteAmount: '666666', //投票数
        proportion: '666666', //占比
        ticketPrice: '666666', //票价
    };

    secondFloorData: object = {
        avgTime: 365, //平均出块时长
        current: 333, //当前交易数量
        maxTps: 333, //最大交易TPS
        avgTransaction: 33, //平均区块交易数
        dayTransaction: 33, //过去24小时交易笔数
        blockStatisticList: [
            {
                height: 333, //区块高度
                time: 333, //出块的时间
                transaction: 33, //区块打包数量
            },
        ], //投票数
    };

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

    blockData: any = [
        {
            height: 33, //区块高度
            timeStamp: 33333, //出块时间
            serverTime: 44444, //服务器时间
            node: 'node-1', //出块节点
            transaction: 333, //交易数
            blockReward: 333, //区块奖励
        },
    ];

    transactionData: any = [
        {
            txHash: 'x3222', //交易Hash
            blockHeight: 5555, // 区块高度
            transactionIndex: 33, // 交易在区块中位置
            from: 'ddddd', //交易发起方地址
            to: 'aaaa', //交易接收方地址
            value: 3.6, //数额
            timestamp: 155788, //交易时间
        },
    ];

    slide(data) {
        // console.log('slide',data);
    }
    onTap(data) {
        // console.log('onTap',data);
    }
    onInit(data) {
        // console.log('onInit',data);
    }
    initChart() :void{
        let r = this.$refs;
        blockChart.init(r.blockChart, blockChart.blocklineOption);
        // worldMapChart.init(r.worldMap, worldMapChart.worldMapOption);
        // earthChart.init(r.earthChart,earthChart.earthOption)
    }
    initWorldMapChart():void{
        let r = this.$refs;
        worldMapChart.init(r.worldMap, worldMapChart.worldMapOption);
    }
    initEarthChart():void{
        let r = this.$refs;
        earthChart.init(r.earthChart,earthChart.earthOption)
    }
    changeEarth():void {
        this.isWorldMap = !this.isWorldMap;
        setTimeout(()=>{
                this.isWorldMap?this.initWorldMapChart():this.initEarthChart()
        },0)
    }
    tableRowClassName({row: object, rowIndex}) {
        if (rowIndex % 2 === 0) {
            return 'even-row';
        } else {
            return 'odd-row';
        }
    }
    format(timestamp) {
        let date = new Date(timestamp), //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            Y = date.getFullYear() + '-',
            M =
                (date.getMonth() + 1 < 10
                    ? '0' + (date.getMonth() + 1)
                    : date.getMonth() + 1) + '-',
            D = date.getDate() + ' ',
            h = date.getHours() + ':',
            m = date.getMinutes() + ':',
            s = date.getSeconds();
        //  debugger
        return Y + M + D + h + m + s;
    }
    updateChart(data) {
        //遍历data  得到 x轴  双 y轴
        let xList = [],
            yListTime = [],
            yListNum = [];
        data.forEach((item, index) => {
            // debugger
            // this.format(item.time)
            xList.push(item.height);
            // yListTime.push(this.format(item.time))
            yListTime.push(item.time);
            yListNum.push(item.transaction);
        });
        // debugger
        console.log(yListTime);
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
    //区块 订阅
    changeRealtimeBlock() {
        this.isRealtimeBlock = !this.isRealtimeBlock;
        //重启订阅
    }
    //交易 订阅
    changeRealtimeTrade() {
        this.isRealtimeTrade = !this.isRealtimeTrade;
        //重启订阅
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
        this.initWorldMapChart()
    }
    created() {
        indexService.getOverviewData().then(data => {
            //初始数据
            this.currentOverViewData = data;
        });
        indexService.updatOverviewData().then(data => {
            this.currentOverViewData = data;
        });
        indexService.getSecondFloorData().then(data => {
            this.secondFloorData = data;
            // let blockStatisticList = this.secondFloorData["blockStatisticList"]
            this.updateChart(this.secondFloorData['blockStatisticList']);
        });
        indexService.updateSecondFloorData().then(data => {
            this.secondFloorData = data;
            this.updateChart(this.secondFloorData['blockStatisticList']);
        });
        indexService.getBlockData().then(data => {
            this.blockData = data;
        });
        indexService.updateBlockData(this.blockData).then(data => {
            this.blockData = data;
        });
        indexService.getTransactionData().then(data => {
            this.transactionData = data;
        });
        indexService.updateTransactionData(this.transactionData).then(data => {
            this.transactionData = data;
        });
    }
    updated(){

    }
    beforeDestroy() {
        indexService.disconnect()
    }
    destroyed() {
        indexService.disconnect()
    }

}
</script>
<style lang="less">
.swiper-container-vertical .slider-pagination-bullet {
    background: #3c4fa1;
    opacity: 1;
    margin: 12px 0;
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
.swiper-container-vertical .slider-pagination-bullet {
    background: #3c4fa1;
}
.swiper-container-vertical .slider-pagination-bullets {
    right: 30px;
}
.slider-pagination-bullet {
    background-color: #3c4fa1;
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
.world-map,.earth-box{
    width:100%;
    height:100% ;
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
    min-height: calc(100% - 190px);
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