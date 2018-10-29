<template>
    <div class="pend-detail-wrap">
        <com-header :descriptionProp='descriptionProp'></com-header>
        <div class="content-area">
            <div class="crumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/trade-pending' }">待处理交易</el-breadcrumb-item>
                    <el-breadcrumb-item>交易信息</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="bottom">
                <div class="left">
                    <button @click='goLeft' :disabled='disabledLeft' class='cursor' title='查看前一个交易'>
                        <i class='icons el-icon-arrow-left'></i>
                    </button>
                </div>
                <div class="center">
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
                    <div class="data-detail">
                        <div class="data-title">
                            <span>交易信息</span>
                            <span>待处理</span>
                        </div>
                        <div class="data" v-if='detailInfo'>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>预计确认时间</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.expectTime}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>交易接收时间</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.timestamp}}</span>
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
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>交易费用</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>(Pending)</span>
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
                                    <span>(Pending)</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>能量价格</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{detailInfo.energonPrice}} ATP (Energon)</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg">
                                <el-col :span="4">
                                    <span>区块</span>
                                </el-col>
                                <el-col :span="20">
                                    <span>(Pending)</span>
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
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <button @click='goRight' :disabled='disabledRight' class='cursor' title='查看后一个交易'>
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
        name: 'pend-detail-wrap',
        //实例的数据对象
        data () {
            return {
                txHash:'',
                disabledLeft:false,
                disabledRight:false,
                address:'11111111111',
                detailInfo:{
                  "txHash": "0x234234",//交易hash
                  "timestamp": 123123123879,//交易接收时间
                  "txReceiptStatus": 1,//交易状态 -1 pending 1 成功  0 失败
                  "blockHeight": "15566",//交易所在区块高度
                  "from": "0x667766",//发送者
                  "to": "0x667766",//接收者
                  "txType": "transfer", // 交易类型
                                // transfer ：转账
                                // MPCtransaction ： MPC交易
                                // contractCreate ： 合约创建
                                // vote ： 投票
                                // transactionExecute ： 合约执行
                                // authorization ： 权限
                  "value": "222",//数额
                  "actualTxCost": "22",//实际交易手续费
                  "energonLimit": 232,//能量限制
                  "energonUsed": 122,//能量消耗
                  "energonPrice": "123",//能量价格
                  "inputData": "",//附加输入数据
                  "expectTime": 12312333, // 预计确认时间
                },
                descriptionProp:'pending'
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
                console.warn('待处理交易详情》》》》',param)
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
                        description:'pending'
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
                            description:'pending'
                        }
                    })
                }else{
                    this.$router.push({
                        path:'/address-detail',
                        query:{
                            address:to,
                            description:'pending'
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
                console.warn('待处理交易详情上一个》》》》',param)
                apiService.trade.pendingDetailNavigate(param).then((res)=>{
                    let {errMsg,code,data}= res
                    if(code==1){
                        //这是第一个 置灰
                        this.disabledLeft=true
                        return false;
                    }else if(code==0){
                        this.disabledLeft=false
                        this.$router.replace({
                            path:'trade-pending-detail',
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
                console.warn('待处理交易详情下一个》》》》',param)
                apiService.trade.pendingDetailNavigate(param).then((res)=>{
                    let {errMsg,code,data}= res
                    if(code==1){
                        //这是最后一个 置灰
                        this.disabledRight=true
                        return false
                    }else if(code==0){
                        this.disabledRight=false
                        this.$router.replace({
                            path:'trade-pending-detail',
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

