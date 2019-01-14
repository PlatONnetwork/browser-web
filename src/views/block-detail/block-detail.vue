<template>
    <div class="block-detail-wrap">
        <com-header :descriptionProp='descriptionProp' @searchFn='searchFn' @changeDataFn='changeDataFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Block Information
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}}</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/block',query:{
                        currentPage:currentPage,
                        pageSize:pageSize
                    } }">{{$t('blockAbout.block')}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{$t('blockAbout.info')}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="left">
                    <button @click='goLeft' :disabled='disabledLeft' class='cursor' :title="$t('blockAbout.viewLeft')" v-if='btnLeftFlag'>
                        <i class='iconfont iconleft'>&#xe643;</i>
                    </button>
                </div>
                <div class="center"
                    v-loading="loading"
                    :element-loading-text="$t('elseInfo.loading')"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(4,11,39, 0.5)">
                    <div class='record'>
                        <header class="time-and-number time2">
                            Block
                        </header>
                        <div class="inputdata">
                            <span>#{{detailInfo.height}}</span>
                            <span v-clipboard:copy="detailInfo.height" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                <i class='iconfont iconcopy cursor'>&#xe63d;</i>
                            </span>
                        </div>
                    </div>
                    <div class="data-detail">
                        <div class="data-title">{{$t('blockAbout.information')}}</div>
                        <div class="data" v-if='detailInfo'>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('blockAbout.height1')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.height}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('blockAbout.timestamp')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{new Date(detailInfo.timestamp).Format('yyyy-MM-dd HH:mm:ss')}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('blockAbout.transactions')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='normal cursor' @click='tradeBlockFn(detailInfo.height)'>{{detailInfo.transaction}}</span>
                                    <span>TX</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('blockAbout.hash')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.hash}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('blockAbout.parentHash')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='normal cursor' @click='prevFn'>{{detailInfo.parentHash}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('blockAbout.miner')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='normal cursor'>{{detailInfo.miner}}</span>
                                    <span>【{{ $t('blockAbout.in',{ timeDiff:(detailInfo.timeDiff)/1000 }) }}】</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('blockAbout.size')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.size}} bytes</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('blockAbout.energonLimit')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.energonLimit}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('blockAbout.energonUsed')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.energonUsed}}({{(detailInfo.energonUsed/detailInfo.energonLimit)*100}}%)</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('blockAbout.blockReward1')}}:</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.blockReward}} Energon</span>
                                </el-col>
                            </el-row>
                            <!-- <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>{{$t('blockAbout.extraData')}}:</span>
                                </el-col>
                                <el-col :span="20" class='special-input'>
                                    <el-input type="textarea" :rows="2" v-model="detailInfo.extraData" :disabled="true">
                                    </el-input>
                                    <span>{{detailInfo.inputData}}</span>
                                </el-col>
                            </el-row> -->
                        </div>
                    </div>
                </div>
                <div class="right">
                    <button @click='goRight' :disabled='disabledRight' class='cursor' :title="$t('blockAbout.viewRight')" v-if='btnRightFlag'>
                        <i class='iconfont iconleft'>&#xe644;</i>
                    </button>
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
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
export default {
    //组件名
    name: 'block-detail-wrap',
    //实例的数据对象
    data() {
        return {
            currentPage:null,
            pageSize:null,
            loading:false,
            height: '',
            btnLeftFlag:true,
            btnRightFlag:true,
            disabledLeft: false,
            disabledRight: false,
            detailInfo: {

            },
            descriptionProp: 'block',
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
            console.warn('子组件header向区块详情data>>>>',data)
            this.height = data.struct.height;
            this.detailInfo = data.struct;
        },
        changeDataFn(){
            console.warn('子组件告诉区块详情链id更改》》》》')
            this.getDetail();
        },
        onCopy() {
            this.$message.success(this.$t('modalInfo.copysuccess'));
        },
        onError() {
            this.$message.error(this.$t('modalInfo.copyfail'));
        },
        //获取区块信息详情
        getDetail() {
            let param = {
                // cid:'',
                height: this.height,
            };
            console.warn('区块详情》》》', param);
            apiService.block
                .blockDetails(param)
                .then(res => {
                    let {errMsg, code, data} = res;
                    if (code == 0) {
                        this.detailInfo = data;
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
                });
        },
        //向左 上一个
        goLeft() {
            this.btnRightFlag = true;
            this.disabledRight = false;
            this.loading = true;
            let param = {
                // cid:'',
                direction: 'prev',
                height: this.height,
            };
            console.warn('区块详情上一个》》》》', param);
            apiService.block
                .blockDetailNavigate(param)
                .then(res => {
                    let {errMsg, code, data} = res;
                    this.loading = false;
                    if(code==0){
                        // data.first?():();
                        if(data.first){
                            //这是第一条记录 置灰
                            this.btnLeftFlag = false;
                            this.disabledLeft = true;
                            // return false;
                        }else{
                            this.btnLeftFlag = true;
                            this.disabledLeft = false;
                        }
                        this.$router.replace({
                            path: '/block-detail',
                            query: {
                                height: data.height,
                            },
                        });
                        this.detailInfo = data;
                        this.height = data.height;
                    }else{
                        this.btnLeftFlag = true;
                        this.disabledLeft = false;
                        this.$message.error(errMsg);
                    }
                    // if (code == 1) {
                    //     //这是第一个 置灰
                    //     this.btnLeftFlag = false;
                    //     this.disabledLeft = true;
                    //     this.$message.warning(errMsg);
                    //     return false;
                    // } else if (code == 0) {
                    //     this.btnLeftFlag = true;
                    //     this.disabledLeft = false;
                    //     this.$router.replace({
                    //         path: '/block-detail',
                    //         query: {
                    //             height: data.height,
                    //         },
                    //     });
                    //     this.detailInfo = data;
                    //     this.height = data.height;
                    // } else {
                    //     this.btnLeftFlag = true;
                    //     this.disabledLeft = false;
                    //     this.$message.error(errMsg);
                    // }
                })
                .catch(error => {
                    this.loading = false;
                    this.$message.error(error);
                });
        },
        //向右 下一个
        goRight() {
            this.btnLeftFlag = true;
            this.disabledLeft = false;
            this.loading = true;
            let param = {
                // cid:'',
                direction: 'next',
                height: this.height,
            };
            console.warn('区块详情下一个》》》》', param);
            apiService.block
                .blockDetailNavigate(param)
                .then(res => {
                    let {errMsg, code, data} = res;
                    this.loading = false;
                    if(code==0){
                        if(data.last){
                            //最后一条记录
                            this.btnRightFlag = false;
                            this.disabledRight = true;
                            // return false;
                        }else{
                            this.btnRightFlag = true;
                            this.disabledRight = false;
                        }
                        this.$router.replace({
                            path: '/block-detail',
                            query: {
                                height: data.height,
                            },
                        });
                        this.detailInfo = data;
                        this.height = data.height;
                    }else{
                        this.btnRightFlag = true;
                        this.disabledRight = false;
                        this.$message.error(errMsg);
                    }
                    // if (code == 1) {
                    //     //这是最后一个 置灰
                    //     this.btnRightFlag = false;
                    //     this.disabledRight = true;
                    //     this.$message.warning(errMsg);
                    //     return false;
                    // } else if (code == 0) {
                    //     this.btnRightFlag = true;
                    //     this.disabledRight = false;
                    //     this.$router.replace({
                    //         path: '/block-detail',
                    //         query: {
                    //             height: data.height,
                    //         },
                    //     });
                    //     this.detailInfo = data;
                    //     this.height = data.height;
                    // } else {
                    //     this.btnRightFlag = true;
                    //     this.disabledRight = false;
                    //     this.$message.error(errMsg);
                    // }
                })
                .catch(error => {
                    this.loading = false;
                    this.$message.error(error);
                });
        },
        //上一块哈希值
        prevFn() {
            this.goLeft();
        },
        //交易区块
        tradeBlockFn(height) {
            this.$router.push({
                path: '/trade-block',
                query: {
                    height: height,
                },
            });
        },
    },
    //生命周期函数
    created() {
        this.currentPage=this.$route.query.currentPage;
        this.pageSize=this.$route.query.pageSize;
        this.height = this.$route.query.height;
        //获取交易列表
        this.getDetail();
    },
    //监视
    watch: {
        // chainId: 'getDetail',
    },
    //组件
    components: {
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
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 30px 0;
    .left,
    .right {
        width: 10%;
        line-height: 630px;
        text-align: center;
    }
    .center {
        width: 80%;
        box-shadow: 0px 5px 19px 1px rgba(2, 4, 23, 0.3);
        background: url(images/background.png) no-repeat center;
        background-size: 100% 100%;
    }
    .record {
        position: relative;
        margin-top: 30px;
        .time2 {
            width: 540px;
            left: 50%;
            top: 30px;
            margin-left: -270px;
            text-align: center;
        }
        .inputdata {
            position: relative;
            width: 100px;
            height: 30px;
            background-color: rgba(48, 56, 104, 0.3);
            margin: 0 auto;
            padding-left: 9px;
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

.el-col-20 {
    color: #d7dde9;
}
@media only screen and (min-width: 1400px) {
    .data {
        margin-left: 15%;
    }
}
</style>

<style lang="less">
.el-message--success{
    min-width: auto
}
</style>
