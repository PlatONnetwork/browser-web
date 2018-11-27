<template>
    <div class="node-detail-wrap">
        <com-header :descriptionProp='descriptionProp' @searchFn='searchFn' @changeDataFn='changeDataFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Node Info
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}}</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/node'}" >{{$t('nodeInfo.index')}}</el-breadcrumb-item>
                        <el-breadcrumb-item>节点信息</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <div class="left">
                            <p>
                                <img src="./image/user.png" alt="" class='images'>
                            </p>
                            <p>
                                <span class='account-name'>账户名称 <i>(所属区域)</i></span>
                                <span>加入时间：2018-11-16 xx:xx:xx</span>
                            </p>
                        </div>
                        <div class="right">
                            <span class='node-candidate'>候选前100名</span>
                        </div>
                    </div>
                    <div class="view">
                        <div>
                            <p>
                                <span>质押金</span>
                                <span>111111111111111111111111111ATP</span>
                            </p>
                            <p>
                                <span>累计出块</span>
                                <span>11111111</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>分红比例</span>
                                <span>12%</span>
                            </p>
                            <p>
                                <span>平均出块时长</span>
                                <span>11111111s</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>质押排名</span>
                                <span>12</span>
                            </p>
                            <p>
                                <span>累计分红</span>
                                <span>11111111 ATP</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>累计收益</span>
                                <span>1111111111111111111111111111ATP</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="data-detail">
                    <ul class="ul-nav cursor">
                        <li :class="{active: activeTab == 1}" @click="changeTab(1)">节点信息</li>
                        <li :class="{active: activeTab == 2}" @click="changeTab(2)">节点出的区块</li>
                    </ul>
                    <div class="data">
                        <div v-if='activeTab == 1'>
                            <div class="data-top">基本信息</div>
                            <div class="data-info">
                                <div class="data-line">
                                    <div class="data-title">节点信息</div>
                                    <div class="rows">
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>节点地址</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <span>http</span>
                                            </el-col>
                                        </el-row>
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>节点公钥</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <span class='copys'>
                                                    <span>111111111111111111111111111111</span>
                                                    <span v-clipboard:copy="111111111111111111111111111111" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                                        <i class='iconfont iconcopy cursor'>&#xe63d;</i>
                                                    </span>
                                                </span>

                                            </el-col>
                                        </el-row>
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>节点钱包</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <span class='copys'>
                                                    <span class='normal '>111111111111111111111111111111</span>
                                                    <span v-clipboard:copy="111111111111111111111111111111" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                                        <i class='iconfont iconcopy cursor'>&#xe63d;</i>
                                                    </span>
                                                </span>

                                            </el-col>
                                        </el-row>
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>节点简介</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <span>http</span>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                                <div class="data-line">
                                    <div class="data-title">收益计划</div>
                                    <div class="rows">
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>分红比例</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <span>http%</span>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                                <div class="data-line">
                                    <div class="data-title">机构信息</div>
                                    <div class="rows">
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>机构名称</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <span>http%</span>
                                            </el-col>
                                        </el-row>
                                        <el-row type="flex" class="row-bg">
                                            <el-col :span="3">
                                                <span>机构官网</span>
                                            </el-col>
                                            <el-col :span="21">
                                                <a href="#" target="_blank" class='normal'>hhh</a>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if='activeTab == 2'>
                            <div class="data-top data-top1">
                                <span>累计出块：13111</span>
                                <div class='search-address'>
                                    <el-button type="primary" class="el-btn el-download" @click="exportFn">{{$t('totalInfo.download')}}csv</el-button>
                                </div>
                            </div>
                            <div class="table">
                                <el-table style="width: 100%"  key='firstTable'  size="mini" :row-class-name="tableRowClassName">
                                    <el-table-column label='区块' >
                                        <template slot-scope="scope">
                                            <span class='normal cursor'>11111</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label='时间戳'>
                                        <template slot-scope="scope">
                                            <span>111111111111</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label='交易数'>
                                        <template slot-scope="scope">
                                            <span>1111}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label='区块奖励'>
                                        <template slot-scope="scope">
                                            <span>111ATP</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
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
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    import contractService from '@/services/web3-services'
    export default {
        //组件名
        name: 'node-detail-wrap',
        //实例的数据对象
        data () {
            return {
                activeTab:2,
                statusFn:{
                    '1':'candidate',
                    '2':'出块中',
                    '3':'验证节点',
                    '4':'standby'
                },
                address:'',
                descriptionProp: 'node',
                detailInfo:{

                }
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {
            ...mapGetters(['chainId','chainHttp']),
        },
        //方法
        methods: {
             //将科学计数法转为数值
            toNonExponential(num){
                let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
                return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
            },
            searchFn(data){
                console.warn('子组件header向地址详情data>>>>',data)
                this.address = this.$route.query.address;
                this.detailInfo = data.struct;
                data.struct.trades.forEach(item => {
                    if (item.txReceiptStatus == -1) {
                        ++this.count;
                    }
                });
            },
            changeDataFn(){
                console.warn('子组件告诉地址详情链id更改》》》》')
                this.getDetail()
            },
            tableRowClassName({row, rowIndex}) {
                if(rowIndex%2 === 0) {
                    return 'even-row';
                }else{
                    return 'odd-row';
                }
            },
            changeTab(type) {
                this.activeTab = type;
            },
            onCopy() {
                this.$message.success(this.$t('modalInfo.copysuccess'));
            },
            onError() {
                this.$message.error(this.$t('modalInfo.copyfail'));
            },
            exportFn() {
                //跳转至下载页
                const {href} = this.$router.resolve({
                    path:'/download',
                    query:{
                        address:this.address,
                        description: this.description,
                        exportname:'node'
                    }
                })
                window.open(href,'_blank')
            },
            //获取地址信息详情
            getDetail() {

            },

        },
        //生命周期函数
        created() {
            this.address = this.$route.query.address;
            //设置节点地址
            // contractService.serProvider(this.chainHttp)
            // console.log(1)
            //获取节点信息
            this.getDetail()
        },
        //监视
        watch: {
            // 'chainId':'getDetail'
        },
        //组件
        components: {
            comHeader,
            comFooter,
        },
    };
</script>
<style lang="less" scoped>
    i{
        font-style: normal;
    }
    .margin20{
        margin-right:20px;
    }
    .pending{
        font-size: 12px;
        color: #6D81A9;
    }
    .bottom{
        padding:26px 0 60px;
        .title{
            margin-bottom:40px;
            background: #0C1035;
            padding:20px 0;
            .record{
                height:60px;
                padding-left:20px;
                padding-right:20px;
                border-bottom:1px solid #151C45;
                display: flex;
                flex-direction: row;
                flex-wrap:nowrap;
                justify-content: space-between;
                .left{
                    display:flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: flex-start;
                    font-size: 12px;
                    color: #9CA7D0;
                    p{
                        &:first-child{
                            width:40px;
                            height:40px;
                            margin-right:16px;
                            img{
                                display: inline-block;
                                width:100%;
                            }
                        }
                        &:last-child{
                            span{
                                display: inline-block;
                                width:100%;
                            }
                            .account-name{
                                font-size: 14px;
                                color: #FFFFFF;
                                margin-bottom:5px;
                                i{
                                    font-size: 12px;
                                    color: #98A6CC;
                                    margin-left:6px;
                                }
                            }
                        }
                    }
                }
                .right{
                    // width:430px;
                    // height:26px;
                    // padding-left:9px;
                    // margin-top:4px;
                    // background: rgba(48,56,104,0.30);
                    // position: relative;
                    // span{
                    //     letter-spacing: 0.8px;
                    //     color: #93A5C8;;
                    //     line-height:26px;
                    //     &:last-child{
                    //         position: absolute;
                    //         right:9px;
                    //     }
                    // }

                }
            }
            .view{
                padding:20px 0 0px 50px;
                display:flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                // width:25%;
                box-sizing: border-box;
                div{
                    p{
                        font-size: 12px;
                        span{
                            display: inline-block;
                            width:100%;
                            &:first-child{
                                color: #98A6CC;
                                margin-bottom:5px;
                            }
                            &:last-child{
                                color: #D8DDEA;;
                            }
                        }
                        &:first-child{
                            margin-bottom:10px;
                        }
                    }
                }
            }
        }
        .ul-nav{
            // height:34px;
            overflow:hidden;
            margin-bottom:16px;
            li{
                float:left;
                line-height:32px;
                padding:0 20px;
                color: #252C57;
                border: 1px solid #252C57;
                &:first-child{
                    border-right:none;
                }
            }
            .active{
                background: #252C57;
                color: #FFFFFF;
            }
            .left {
                float: left;
            }
            .right {
                float: right;
            }
        }
        .data-top{
            padding:20px 0;
            padding-top:0;
            font-size: 14px;
            color: #DADDEC;
        }
        .data-top1{
            padding:0;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            justify-content: space-between;
        }
        .data-info{
            padding:20px 0;
            background: #0D1333;
            .data-line{
                padding-left:20px;
                border-bottom:1px solid #151C45;
                margin-bottom:20px;
                &:last-child{
                    border-bottom:0;
                }
                .data-title{
                    font-size: 14px;
                    color: #FFFFFF;
                    margin-bottom:10px;
                }
                .rows{
                    .el-row{
                        font-size: 12px;
                        color: #98A6CC;
                        margin-bottom:18px;
                    }
                    .el-col-21 {
                        color: #D9DDEB;
                    }
                }
                .copys{
                    background: rgba(48,56,104,0.30);
                    padding:6px;
                }
            }
        }
    }
    .time-and-number{
        position:relative;
        width:592px;
        height:48px;
        font-size:64px;
        line-height:30px;
        letter-spacing: 3.8px;
        color: #3c425d;
        opacity: 0.2;
    }
    .second-floor-text{
        position: absolute;
        top:125px;
        font-size:16px;
        line-height: 16px;
        color: #ffffff;
        opacity: 1;
        letter-spacing: 1px;
    }
</style>
<style lang='less'>
    .search-address{
        .el-input--suffix .el-input__inner{
            // border: 1px solid #12183D;
            font-size: 12px;
            // color: #7988AB;
            line-height: 34px;
            height: 34px;
        }
        .el-download{
            height:34px;
            // line-height:34px;
            padding:0 10px;
            border:none;
        }
    }
</style>

