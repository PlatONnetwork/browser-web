<template>
    <div class="pend-detail-wrap">
        <com-header :descriptionProp='descriptionProp' @searchFn='searchFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Tx-Information
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}}</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/trade-pending' }">{{$t('tradePendingAbout.transactions')}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{$t('tradePendingAbout.txInfo')}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="left">
                    <!-- <button @click='goLeft' :disabled='disabledLeft' class='cursor' title='查看前一个交易'>
                        <i class='iconfont iconleft'>&#xe643;</i>
                    </button> -->
                </div>
                <div class="center">
                    <div class='record'>
                        <header class="time-and-number time2">
                            Transactions
                        </header>
                        <div class='position-pending'>
                            <!-- <img src="./images/1112121.gif" alt=""> -->
                            {{$t('tradePendingAbout.pending')}}</div>
                        <div class="inputdata">
                            <span>#{{detailInfo.txHash}}</span>
                            <span v-clipboard:copy="detailInfo.txHash" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                <i class='iconfont iconcopy cursor'>&#xe63d;</i>
                            </span>
                        </div>
                    </div>
                    <div class="data-detail">
                        <div class="data-title">
                            <span>{{$t('tradePendingAbout.information')}}</span>
                        </div>
                        <div class="data" v-if='detailInfo'>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('tradePendingAbout.expectTime')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.expectTime}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('tradePendingAbout.timestamp')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{new Date(detailInfo.timestamp).Format('yyyy-MM-dd HH:mm:ss')}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('tradePendingAbout.txHash')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.txHash}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('tradePendingAbout.value')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.value}}ATP</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('tradePendingAbout.from')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='cursor normal' @click='goAddressDetail(detailInfo.from)'>{{detailInfo.from}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('tradePendingAbout.to')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span :title='$t("elseInfo.contract")' v-if='detailInfo.txType == "contractCreate" || detailInfo.txType == "transactionExecute" '><i class="iconfont iconcontract">&#xe63e;</i>Contract</span>
                                    <span v-if='detailInfo.txType == "contractCreate"'>{{$t('elseInfo.create')}}</span>
                                    <span v-if='detailInfo.txType !== "contractCreate"' class='cursor normal' @click='goDetail(detailInfo.txType,detailInfo.to)'>{{detailInfo.to}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('tradePendingAbout.fee')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='pending'>(Pending)</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('tradePendingAbout.energonLimit')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.energonLimit}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('tradePendingAbout.energonUsed')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='pending'>(Pending)</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('tradePendingAbout.energonPrice')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.energonPrice}} ATP ({{Math.pow(10,9)*detailInfo.energonPrice}}Energon)</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('tradePendingAbout.blockHeight')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='pending'>(Pending)</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('tradePendingAbout.inputData')}}:</span>
                                </el-col>
                                <el-col :span="20" class='special-input'>
                                    <el-input type="textarea" :rows="2" v-model="detailInfo.inputData" :disabled="true">
                                    </el-input>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <!-- <button @click='goRight' :disabled='disabledRight' class='cursor' title='查看后一个交易'>
                        <i class='iconfont iconleft'>&#xe644;</i>
                    </button> -->
                </div>
            </div>
        </div>
        <com-footer></com-footer>
    </div>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import comHeader from '@/components/header/header.vue';
import comFooter from '@/components/footer/footer.vue';
import apiService from '@/services/API-services';
import menu from '@/components/menu/index.vue';
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
export default {
    //组件名
    name: 'pend-detail-wrap',
    //实例的数据对象
    data() {
        return {
            txHash: '',
            btnLeftFlag:true,
            btnRightFlag:true,
            disabledLeft: false,
            disabledRight: false,
            address: '11111111111',
            detailInfo: {
                txHash: '0x234234', //交易hash
                timestamp: 123123123879, //交易接收时间
                txReceiptStatus: 1, //交易状态 -1 pending 1 成功  0 失败
                blockHeight: '15566', //交易所在区块高度
                from: '0x667766', //发送者
                to: '0x667766', //接收者
                txType: 'transfer', // 交易类型
                // transfer ：转账
                // MPCtransaction ： MPC交易
                // contractCreate ： 合约创建
                // vote ： 投票
                // transactionExecute ： 合约执行
                // authorization ： 权限
                value: '222', //数额
                actualTxCost: '22', //实际交易手续费
                energonLimit: 232, //能量限制
                energonUsed: 122, //能量消耗
                energonPrice: '123', //能量价格
                inputData: '', //附加输入数据
                expectTime: 12312333, // 预计确认时间
            },
            descriptionProp: 'pending',
        };
    },
    //数组或对象，用于接收来自父组件的数据
    props: {},
    //计算
    computed: {
        ...mapGetters(['chainId']),
    },
    //方法
    methods: {
        searchFn(data){
            console.warn('子组件header向待交易详情data>>>>',data)
            this.txHash = data.struct.txHash
            this.detailInfo = data.struct
        },
        onCopy() {
            this.$message.success(this.$t('modalInfo.copysuccess'));
        },
        onError() {
            this.$message.error(this.$t('modalInfo.copyfail'));
        },
        //获取交易信息详情
        getDetail() {
            let param = {
                // cid:'',
                txHash: this.txHash,
            };
            console.warn('待处理交易详情》》》》', param);
            apiService.trade
                .pendingDetails(param)
                .then(res => {
                    let {errMsg, code, data} = res;
                    if (code == 0) {
                        this.detailInfo = data;
                    } else {
                        this.detailInfo = {};
                        this.$message.error(errMsg);
                    }
                })
                .catch(error => {
                    this.$message.error(error);
                });
        },
        goAddressDetail(address) {
            this.$router.push({
                path: '/address-detail',
                query: {
                    address: address,
                    description: 'pending',
                },
            });
        },
        goDetail(type, to) {
            if (type == 'transactionExecute') {
                //进入合约详情
                this.$router.push({
                    path: '/contract-detail',
                    query: {
                        address: to,
                        description: 'pending',
                    },
                });
            } else {
                this.$router.push({
                    path: '/address-detail',
                    query: {
                        address: to,
                        description: 'pending',
                    },
                });
            }
        },
        //向左 上一个
        goLeft() {
            this.btnRightFlag = true;
            this.disabledRight = false;
            let param = {
                // cid:'',
                direction: 'prev',
                txHash: this.txHash,
            };
            console.warn('待处理交易详情上一个》》》》', param);
            apiService.trade
                .pendingDetailNavigate(param)
                .then(res => {
                    let {errMsg, code, data} = res;
                    if (code == 1) {
                        //这是第一个 置灰
                        this.btnLeftFlag = false;
                        this.disabledLeft = true;
                        this.$message.warning(errMsg);
                        return false;
                    } else if (code == 0) {
                        this.btnLeftFlag = true;
                        this.disabledLeft = false;
                        this.$router.replace({
                            path: 'trade-pending-detail',
                            query: {
                                txHash: data.txHash,
                            },
                        });
                        this.detailInfo = data;
                        this.txHash = data.txHash;
                    } else {
                        this.btnLeftFlag = true;
                        this.disabledLeft = false;
                        this.$message.error(errMsg);
                    }
                })
                .catch(error => {
                    this.$message.error(error);
                });
        },
        //向右 下一个
        goRight() {
            this.btnLeftFlag = true;
            this.disabledLeft = false;
            let param = {
                // cid:'',
                direction: 'next',
                txHash: this.txHash,
            };
            console.warn('待处理交易详情下一个》》》》', param);
            apiService.trade
                .pendingDetailNavigate(param)
                .then(res => {
                    let {errMsg, code, data} = res;
                    if (code == 1) {
                        //这是最后一个 置灰
                        this.btnRightFlag = false;
                        this.disabledRight = true;
                        this.$message.warning(errMsg);
                        return false;
                    } else if (code == 0) {
                        this.btnRightFlag = true;
                        this.disabledRight = false;
                        this.$router.replace({
                            path: 'trade-pending-detail',
                            query: {
                                txHash: data.txHash,
                            },
                        });
                        this.detailInfo = data;
                        this.txHash = data.txHash;
                    } else {
                        this.btnRightFlag = true;
                        this.disabledRight = false;
                        this.$message.error(errMsg);
                    }
                })
                .catch(error => {
                    this.$message.error(error);
                });
        },
    },
    //生命周期函数
    created() {
        this.txHash = this.$route.query.txHash;
        //获取交易列表
        this.getDetail();
    },
    //监视
    watch: {
        chainId: 'getDetail',
    },
    //组件
    components: {
        'v-menu': menu,
        comHeader,
        comFooter,
    },
};
</script>
<style lang="less" scoped>
.icons {
    width: 40px;
    height: 96px;
    line-height: 96px;
}
button {
    background: none;
    border: none;
    outline: none;
}
.bottom {
    padding: 30px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    box-sizing: border-box;
    .left,
    .right {
        width: 10%;
        text-align: center;
        line-height: 630px;
    }
    .center {
        width: 80%;
        box-shadow: 0px 5px 19px 1px rgba(2, 4, 23, 0.3);
        background: url(images/background.png) no-repeat center;
        background-size: 100% 100%;
    }
    .record {
        margin-top: 30px;
        position: relative;
        .time2 {
            width: 610px;
            left: 50%;
            margin-left: -305px;
            top: 30px;
            text-align: center;
        }
        .inputdata {
            width: 610px;
            height: 30px;
            padding-left: 9px;
            background-color: rgba(48, 56, 104, 0.3);
            margin: 0 auto;
            position: relative;
            span {
                letter-spacing: 0.8px;
                color: #93a5c8;
                line-height: 30px;
                &:last-child {
                    position: absolute;
                    right: 9px;
                }
            }
        }
        .position-pending {
            position: absolute;
            right: 40px;
            top: 0px;
            font-size: 12px;
            color: #fcff0a;
            background:url(images/zhuandong.gif) no-repeat left center;
            padding-left:12px;
        }
    }
    .data-detail {
        padding: 0 190px;
        margin-bottom: 58px;
        .data-title {
            letter-spacing: 1px;
            color: #ffffff;
            font-size: 16px;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 60px;
        }
        .data {
            letter-spacing: 0.8px;
            color: #93a5c8;
            font-size: 12px;
            .el-row {
                margin-bottom: 10px;
            }
        }
    }
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
.iconleft {
    color: #5c6493;
    font-size: 96px;
}
.iconcontract {
    margin-right: 4px;
}
.el-col-20 {
    color: #d7dde9;
}
.pending {
    color: #6d81a9;
}
</style>

