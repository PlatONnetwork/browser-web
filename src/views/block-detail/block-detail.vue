<template>
    <div class="block-detail-wrap">
        <com-header :descriptionProp='descriptionProp'></com-header>
        <div class="content-area">
            <div class="crumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/block' }">区块</el-breadcrumb-item>
                    <el-breadcrumb-item>区块信息</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="bottom">
                <div class="left">
                    <button @click='goLeft' :disabled='disabledLeft' class='cursor' title='查看前一个区块'>
                        <i class='icons el-icon-arrow-left'></i>
                    </button>
                </div>
                <div class="center">
                    <div class='record'>
                        <span>区块#{{detailInfo.height}}</span>
                        <span
                            v-clipboard:copy="detailInfo.height"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                        >
                            <i class='el-icon-tickets cursor'></i>
                        </span>
                    </div>
                    <div class="data-detail">
                        <div class="data-title">区块信息</div>
                        <div class="data" v-if='detailInfo'>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>区块高度</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.height}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>时间戳</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.timestamp}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>交易</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='normal cursor' @click='tradeBlockFn(detailInfo.height)'>{{detailInfo.transaction}}</span>
                                    <span>TX</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>区块哈希</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.hash}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>上一区块哈希</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='normal cursor' @click='prevFn'>{{detailInfo.parentHash}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>出块节点</span>
                                </el-col>
                                <el-col :span="20">
                                    <span class='normal'>{{detailInfo.miner}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>大小</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.size}} bytes</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>能量限制</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.energonLimit}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>能量消耗</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.energonUsed}}({{(detailInfo.energonUsed/detailInfo.energonLimit)*100}}%)</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>区块奖励</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.blockReward}}ATP</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>额外数据</span>
                                </el-col>
                                <el-col :span="20">
                                    <el-input
                                    type="textarea"
                                    :rows="2"
                                    v-model="detailInfo.extraData"
                                    :disabled="true">
                                    </el-input>
                                    <!-- <span>{{detailInfo.inputData}}</span> -->
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <button @click='goRight' :disabled='disabledRight' class='cursor' title='查看后一个区块'>
                        <i class='icons el-icon-arrow-right'></i>
                    </button>
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
    import menu from '@/components/menu/index.vue'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    export default {
        //组件名
        name: 'block-detail-wrap',
        //实例的数据对象
        data () {
            return {
                height:'',
                disabledLeft:false,
                disabledRight:false,
                detailInfo:{
                  "height": 19988,//块高
                  "timestamp": 123123123879,//出块时间
                  "transaction": 1288,//块内交易总数
                  "hash": "0x1238",//区块hash
                  "parentHash": "0x234",//父区块hash
                  "miner": "0x234", // 出块节点（多少时间内）
                  "size": 123,//区块大小
                  "energonLimit": 24234,//能量消耗限制
                  "energonUsed": 2342,//能量消耗
                  "blockReward": "123123",//区块奖励
                  "extraData": "xxx"//附加数据
                },
                descriptionProp:'block'
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {
            ...mapGetters(['chainId']),
        },
        //方法
        methods: {
            onCopy(){
                this.$message.success('已复制到剪贴板')
            },
            onError(){
                this.$message.error('复制失败')
            },
            //获取区块信息详情
            getDetail(){
                let param = {
                    // cid:'',
                    height:this.height
                }
                console.warn('区块详情》》》',param)
                apiService.block.blockDetails(param).then((res)=>{
                    let {errMsg,code,data}= res
                    if(code==0){
                       this.detailInfo=data
                    }else{
                        this.detailInfo={}
                        this.$message.error(errMsg)
                    }
                }).catch((error)=>{
                    this.$message.error(error)
                })
            },
            //向左 上一个
            goLeft(){
                this.disabledRight=false;
                let param = {
                    // cid:'',
                    direction:'prev',
                    height:this.height
                }
                console.warn('区块详情上一个》》》》',param)
                apiService.block.blockDetailNavigate(param).then((res)=>{
                    let {errMsg,code,data}= res
                    if(code==1){
                        //这是第一个 置灰
                        this.disabledLeft=true
                        return false;
                    }else if(code==0){
                        this.disabledLeft=false
                        this.$router.replace({
                            path:'/block-detail',
                            query:{
                                height:data.height
                            }
                        })
                        this.detailInfo=data
                        this.height=data.height
                    }else{
                        this.disabledLeft=false
                        this.$message.error(errMsg)
                    }
                }).catch((error)=>{
                    this.$message.error(error)
                })
            },
            //向右 下一个
            goRight(){
                this.disabledLeft=false
                let param = {
                    // cid:'',
                    direction:'next',
                    height:this.height
                }
                console.warn('区块详情下一个》》》》',param)
                apiService.block.blockDetailNavigate(param).then((res)=>{
                    let {errMsg,code,data}= res
                    if(code==1){
                        //这是最后一个 置灰
                        this.disabledRight=true
                        return false
                    }else if(code==0){
                        this.disabledRight=false
                        this.$router.replace({
                            path:'/block-detail',
                            query:{
                                height:data.height
                            }
                        })
                        this.detailInfo=data
                        this.height=data.height
                    }else{
                        this.disabledRight=false
                        this.$message.error(errMsg)
                    }
                }).catch((error)=>{
                    this.$message.error(error)
                })
            },
            //上一块哈希值
            prevFn(){
                let param = {
                    // cid:'',
                    direction:'prev',
                    height:this.height
                }
                console.warn('上一块哈希值》》》》',param)
                apiService.block.blockDetailNavigate(param).then((res)=>{
                    let {errMsg,code,data}= res
                    if(code == 0){
                        this.$router.replace({
                            path:'/block-detail',
                            query:{
                                height:data.height
                            }
                        })
                        this.detailInfo=data
                        this.height=data.height
                    }else{
                        this.detailInfo={}
                        this.$message.error(errMsg)
                    }
                }).catch((error)=>{
                    this.$message.error(error)
                })
            },
            //交易区块
            tradeBlockFn(height){
                this.$router.push({
                    path:'/trade-block',
                    query:{
                        height:height
                    }
                })
            }
        },
        //生命周期函数
        created(){
            this.height = this.$route.query.height;
            //获取交易列表
            this.getDetail()
        },
        //监视
        watch: {
            'chainId':'getDetail'
        },
        //组件
        components: {
            'v-menu':menu,
            comHeader,
            comFooter
        }
    }
</script>
<style lang="less" scoped>
    .icons{
        width: 50px;
        height: 120px;
        color: #5c6493;
        font-size:50px;
        line-height:120px;
    }
    button{
        background:none;
        border:none;
        outline:none;
    }
    .bottom{
        padding:30px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        box-sizing: border-box;
        .left,.right{
            width:10%;
            text-align: center;
            line-height:630px;
        }
        .center{
            width:80%;
            // height:630px;
            background-color: #0e1438;
	        box-shadow: 0px 5px 19px 1px  rgba(2, 4, 23, 0.3);
        }
        .record{
            width: 625px;
            height: 30px;
            background-color: #303868;
            opacity: 0.3;
            margin:0 auto;
            margin-top:58px;
            padding-left:9px;
            position: relative;
            span{
                letter-spacing: 0.8px;
                color: #fff;
                line-height:30px;
                &:last-child{
                    position: absolute;
                    right:9px;
                }
            }
        }
        .data-detail{
            padding:0 190px;
            margin-bottom:58px;
            .data-title{
                letter-spacing: 1px;
	            color: #ffffff;
                font-size:16px;
                text-align:center;
                margin-top:25px;
                margin-bottom:85px;
            }
            .data{
                letter-spacing: 0.8px;
                color: #93a5c8;
                .el-row{
                    margin-bottom:10px;
                }
            }
        }
    }
</style>

