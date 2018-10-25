<template>
    <div class="block-detail-wrap">
        <div class="content-area">
            <v-menu>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/block' }">区块</el-breadcrumb-item>
                    <el-breadcrumb-item>区块信息</el-breadcrumb-item>
                </el-breadcrumb>
            </v-menu>
            <div class="bottom">
                <div class="title">
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
                                <span>{{detailInfo.timeStamp}}</span>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg">
                            <el-col :span="4">
                                <span>交易</span>
                            </el-col>
                            <el-col :span="20">
                                <span class='normal'>{{detailInfo.transaction}}</span>
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
                                <span class='normal'>{{detailInfo.parentHash}}</span>
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
        </div>
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import menu from '@/components/menu/index.vue'
    export default {
        //组件名
        name: 'block-detail-wrap',
        //实例的数据对象
        data () {
            return {
                height:'11111111111',
                detailInfo:{
                  "height": 19988,//块高
                  "timeStamp": 123123123879,//出块时间
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
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {

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
                    cid:'',
                    height:this.$route.query.height
                }
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
            goAddressDetail(address){
                this.$router.push({
                    path:'/address-detail',
                    query:{
                        address:address
                    }
                })
            },
            goDetail(type,to){
                if(type=='transactionExecute'){
                    //进入合约详情
                    this.$router.push({
                        path:'/contract-detail',
                        query:{
                            address:to
                        }
                    })
                }else{
                    this.$router.push({
                        path:'/address-detail',
                        query:{
                            address:to
                        }
                    })
                }
            }
        },
        //生命周期函数
        created(){
            //获取交易列表
            // this.getDetail()
        },
        //监视
        watch: {

        },
        //组件
        components: {
            'v-menu':menu
        }
    }
</script>
<style lang="less" scoped>
    .bottom{
        padding:20px 0;
        .title{
            margin-bottom:20px;
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

