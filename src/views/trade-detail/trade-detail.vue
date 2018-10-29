<template>
    <div class="trade-detail-wrap">
        <com-header :descriptionProp='descriptionProp'></com-header>
        <div class="content-area">
            <div class="crumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/trade' }">交易</el-breadcrumb-item>
                    <el-breadcrumb-item>交易信息</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <span>交易#{{detailInfo.txHash}}</span>
                        <span
                            v-clipboard:copy="detailInfo.txHash"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                        >
                            <i class='el-icon-tickets cursor'></i>
                        </span>
                    </div>
                    <div class="arrow">
                        <button @click='goLeft' :disabled='disabledLeft' class='cursor' title='查看前一个交易'>
                            <i class='el-icon-caret-left'></i>
                        </button>
                        <button @click='goRight' :disabled='disabledRight' class='cursor' title='查看后一个交易'>
                            <i class='el-icon-caret-right'></i>
                        </button>
                    </div>
                </div>
                <div class="data-detail">
                    <div class="data-title">交易信息</div>
                    <div class="data" v-if='detailInfo'>
                        <el-row type="flex" class="row-bg">
                            <el-col :span="4">
                                <span>时间戳</span>
                            </el-col>
                            <el-col :span="20">
                                <span>{{detailInfo.timeStamp}}</span>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg">
                            <el-col :span="4">
                                <span>交易hash</span>
                            </el-col>
                            <el-col :span="20">
                                <span>{{detailInfo.txHash}}</span>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg">
                            <el-col :span="4">
                                <span>状态</span>
                            </el-col>
                            <el-col :span="20">
                                <span :class='{"market-normal":detailInfo.txReceiptStatus==1,"market-abnormal":detailInfo.txReceiptStatus==0}'>{{detailInfo.txReceiptStatus==1?'成功':(detailInfo.txReceiptStatus==0?'失败':'pending ')}}</span>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg">
                            <el-col :span="4">
                                <span>数额</span>
                            </el-col>
                            <el-col :span="20">
                                <span>{{detailInfo.value}}ATP</span>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg">
                            <el-col :span="4">
                                <span>发送方</span>
                            </el-col>
                            <el-col :span="20">
                                <span class='cursor normal' @click='goAddressDetail(detailInfo.from)'>{{detailInfo.from}}</span>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg">
                            <el-col :span="4">
                                <span>接收方</span>
                            </el-col>
                            <el-col :span="20">
                                <span title='合约' v-if='detailInfo.txType == "contractCreate" || detailInfo.txType == "transactionExecute" '><i class="el-icon-edit"></i>Contract</span>
                                <span v-if='detailInfo.txType == "contractCreate"'>合约创建</span>
                                <span v-if='detailInfo.txType !== "contractCreate"' class='cursor normal' @click='goDetail(detailInfo.txType,detailInfo.to)'>{{detailInfo.to}}</span>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" v-if='detailInfo.txReceiptStatus==0'>
                            <el-col :span="4">
                            </el-col>
                            <el-col :span="20">
                                <span><i class="el-icon-warning"></i></span>
                                <span>{{detailInfo.failReason}}</span>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg">
                            <el-col :span="4">
                                <span>交易费用</span>
                            </el-col>
                            <el-col :span="20">
                                <span>{{detailInfo.actualTxCoast}}</span>
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
                                <span>消耗的能量</span>
                            </el-col>
                            <el-col :span="20">
                                <span>{{detailInfo.energonUsed}}</span>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg">
                            <el-col :span="4">
                                <span>能量价格</span>
                            </el-col>
                            <el-col :span="20">
                                <span>{{detailInfo.energonPrice}}</span>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg">
                            <el-col :span="4">
                                <span>区块</span>
                            </el-col>
                            <el-col :span="20">
                                <span class='cursor normal'>{{detailInfo.blockHeight}}</span>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg">
                            <el-col :span="4">
                                <span>发出数据</span>
                            </el-col>
                            <el-col :span="20">
                                <el-input
                                  type="textarea"
                                  :rows="2"
                                  v-model="detailInfo.inputData"
                                  :disabled="true">
                                </el-input>
                                <!-- <span>{{detailInfo.inputData}}</span> -->
                            </el-col>
                        </el-row>
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
    import menu from '@/components/menu/index.vue'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    export default {
        //组件名
        name: 'trade-detail-wrap',
        //实例的数据对象
        data () {
            return {
                txHash:'',
                disabledLeft:false,
                disabledRight:false,
                address:'11111111111',
                detailInfo:{
                  "txHash": "0x234234",//交易hash
                  "timeStamp": 123123123879,//交易时间
                  "txReceiptStatus": 0,//交易状态 -1 pending 1 成功  0 失败
                  "blockHeight": "15566",//交易所在区块高度
                  "from": "0x667766",//发送者
                  "to": "0x667766",//接收者
                  "txType": "transactionExecute", // 交易类型
                            // transfer ：转账
                            // MPCtransaction ： MPC交易
                            // contractCreate ： 合约创建
                            // vote ： 投票
                            // transactionExecute ： 合约执行
                            // authorization ： 权限
                  "value": "222",//数额
                  "actualTxCoast": "22",//实际交易手续费
                  "energonLimit": 232,//能量限制
                  "energonUsed": 122,//能量消耗
                  "energonPrice": "123",//能量价格
                  "inputData": "1111",//附加输入数据
                  "expectTime": 12312333 // 预计确认时间
                },
                descriptionProp:'trade'
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
            //获取交易信息详情
            getDetail(){
                let param = {
                    // cid:'',
                    txHash:this.txHash
                }
                console.warn('交易详情》》》》',param)
                apiService.trade.transactionDetails(param).then((res)=>{
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
            goAddressDetail(address){
                this.$router.push({
                    path:'/address-detail',
                    query:{
                        address:address,
                        description:'trade'
                    }
                })
            },
            goDetail(type,to){
                if(type=='transactionExecute'){
                    //进入合约详情
                    this.$router.push({
                        path:'/contract-detail',
                        query:{
                            address:to,
                            description:'trade'
                        }
                    })
                }else{
                    this.$router.push({
                        path:'/address-detail',
                        query:{
                            address:to,
                            description:'trade'
                        }
                    })
                }
            },
            //向左 上一个
            goLeft(){
                this.disabledRight=false;
                let param = {
                    // cid:'',
                    direction:'prev',
                    txHash:this.txHash
                }
                console.warn('交易详情上一个》》》》',param)
                apiService.trade.transactionDetailNavigate(param).then((res)=>{
                    let {errMsg,code,data}= res
                    if(code==1){
                        //这是第一个 置灰
                        this.disabledLeft=true
                        return false;
                    }else if(code==0){
                        this.disabledLeft=false
                        this.$router.replace({
                            path:'/trade-detail',
                            query:{
                                txHash:data.txHash
                            }
                        })
                        this.detailInfo=data
                        this.txHash=data.txHash
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
                    txHash:this.txHash
                }
                console.warn('交易详情下一个》》》》',param)
                apiService.trade.transactionDetailNavigate(param).then((res)=>{
                    let {errMsg,code,data}= res
                    if(code==1){
                        //这是最后一个 置灰
                        this.disabledRight=true
                        return false
                    }else if(code==0){
                        this.disabledRight=false
                        this.$router.replace({
                            path:'/trade-detail',
                            query:{
                                txHash:data.txHash
                            }
                        })
                        this.detailInfo=data
                        this.txHash=data.txHash
                    }else{
                        this.disabledRight=false
                        this.$message.error(errMsg)
                    }
                }).catch((error)=>{
                    this.$message.error(error)
                })
            }
        },
        //生命周期函数
        created(){
            this.txHash = this.$route.query.txHash;
            //获取交易列表
            // this.getDetail()
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
    .bottom{
        padding:30px 0;
        .title{
            margin-bottom:20px;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            justify-content: space-between;
        }
        .data-detail{
            .data-title{
                height:40px;
                line-height:40px;
                background:#ebebeb;
                font-weight:600;
                padding-left:20px;
            }
            .data{
                border:1px solid #eaeaea;
                border-top:none;
                padding:20px;
                .el-row{
                    margin-bottom:15px;
                }
            }
        }
    }
</style>

