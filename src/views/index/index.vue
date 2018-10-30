<template>
    <div class="index">
        <com-header></com-header>
        <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
            <slideritem>
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
                        <p class="color2">{{currentOverViewData.ticketPrice}}</p>
                        <span>票价</span>
                    </li>
                </ul>
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
                    <!-- secondFloorData.dayTransaction -->
                    <li>0</li>
                    <li>2</li>
                    <li>0</li>
                    <li>2</li>
                    <li>0</li>
                    <li>2</li>
                </ul>
            </slideritem>
            <slideritem class="third-floor">
                <div class="floor-area">
                    <div class="floor-area-box">
                        <el-button class="fr">Realtime</el-button>
                        <header class="time-and-number">
                            Blocks
                        </header>
                        <p class="second-floor-text">最新区块</p>
                        <el-table :data="blockData" style="width: 100%" :row-class-name="tableRowClassName">
                            <el-table-column prop="height" label="区块高度" width="180">
                            </el-table-column>
                            <el-table-column prop="timeStamp" label="币龄" width="180">
                            </el-table-column>
                            <el-table-column prop="node" label="出块节点">
                            </el-table-column>
                            <el-table-column prop="transaction" label="交易数">
                            </el-table-column>
                            <el-table-column prop="blockReward" label="奖励">
                            </el-table-column>
                        </el-table>

                        <div class="view-all">View All</div>
                    </div>
                    <div class="floor-area-box">
                        <el-button class="fr">Realtime</el-button>
                        <header class="time-and-number">
                            Transactions
                        </header>
                        <p class="second-floor-text">最新交易</p>
                        <el-table :data="transactionData" style="width: 100%" :row-class-name="tableRowClassName">
                            <el-table-column prop="txHash" label="交易哈希" width="180">
                            </el-table-column>
                            <el-table-column prop="from" label="From" width="180">
                            </el-table-column>
                            <el-table-column prop="to" label="to">
                            </el-table-column>
                            <el-table-column prop="value" label="数额">
                            </el-table-column>
                        </el-table>
                        <div class="view-all">View All</div>
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
import chartService from '@/services/chart-services';
import IndexService from '@/services/index-service';

const blockChart = new chartService(),
    indexService=new IndexService();

@Component({
    components: {
        comHeader,
        comFooter,
        slider,
        slideritem,
    },
})
export default class HelloWorld extends Vue {
    @Getter
    info;
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
        currentPage: 2, // 当前页码
        thresholdDistance: 500, // 滑动判定距离
        thresholdTime: 100, // 滑动判定时间
        autoplay: 0, // 自动滚动[ms]
        loop: true, // 循环滚动
        direction: 'vertical', // 方向设置，垂直滚动
        infinite: 1, // 无限滚动前后遍历数
        slidesToScroll: 1, // 每次滑动项数
    };

    blockData: Array<object> = [
        {
            height: 33, //区块高度
            timeStamp: 33333, //出块时间
            serverTime: 44444, //服务器时间
            node: 'node-1', //出块节点
            transaction: 333, //交易数
            blockReward: 333, //区块奖励
        },
    ];

    transactionData: Array<object> = [
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
        console.log('slide',data);
    }
    onTap(data) {
        console.log('onTap',data);
    }
    onInit(data) {
        console.log('onInit',data);
    }
    initChart() {
        let r = this.$refs;
        blockChart.init(r.blockChart, blockChart.blocklineOption);
    }

    tableRowClassName({row: object, rowIndex}) {
        if (rowIndex % 2 === 0) {
            return 'even-row';
        } else {
            return 'odd-row';
        }
    }

    mounted() {
        //初始化图表
        this.initChart();
    }
    created() {
        console.log(indexService)
        indexService.getSecondFloorData().then((data)=>{
            console.log('getSecondFloorData index',data)
            this.secondFloorData=data;
        })
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
        font-size: 40px;
        letter-spacing: 2.4px;
        color: #d2daea;
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
</style>