<template>
    <div class="index-wrap">
        <div class="welcome-wrap">
            <h3>{{$t('indexInfo.WelcomeToPlatON')}}</h3>
            <div class="search search-index" :class="{'search-active':isFocus}">
                <el-input :placeholder="$t('search.placeHolder')" @focus="isFocus=true;" @blur="isFocus=false;" v-model.trim="searchKey"  @keyup.enter.native="searchFn" size="mini"></el-input>
                <el-button type="primary" class="el-btn el-searchs" :class="{'search-btn-active':isFocus}" @click="searchFn" :disabled='disabledBtn'>{{ $t("search.searchBtn") }}</el-button>
            </div>
            <img class="polyhedron-big polyhedron" src="@/assets/images/polyhedron.png">
            <img class="polyhedron-mid polyhedron" src="@/assets/images/polyhedron.png">
        </div>
        <el-row>
            <el-col :span="12" class="bar-left bar">
                <h3>{{$t('indexInfo.LIVEBLOCKTIME')}}</h3>
                <div class="chart" ref="blockTimeChart"></div>
                <ul class="block-statistics">
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.LIVEBLOCKHEIGHT')}}</div>
                        <a class="cursor">113</a>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('blockAbout.producer').toUpperCase()}}</div>
                        <a class="cursor">113</a>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.CIRCULATINGSUPPLY')}}</div>
                        <p>
                            10.21&nbsp;/ <b>12044M</b> 
                        </p>
                        <el-progress :percentage="50"></el-progress>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('nodeInfo.stakeRate').toUpperCase()}}</div>
                        <p>10.21&nbsp;<b>12044M</b> </p>
                        <el-progress :percentage="50"></el-progress>
                    </li>
                </ul>
                <img class="polyhedron-mini polyhedron" src="@/assets/images/polyhedron.png">
            </el-col>
            <el-col :span="12" class="bar-right bar">
                <h3>{{$t('indexInfo.LIVEBLOCKTRANSACTIONS')}}</h3>
                <div class="chart" ref="blockTradeChart"></div>
                <ul class="block-statistics">
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.LIVETRANSACTIONS')}}</div>
                        <a class="cursor">113</a>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.CURRNTMAXTPS')}}</div>
                        <a class="cursor">113</a>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.LIVEADDRESS')}}</div>
                        <a class="cursor">113</a>
                    </li>
                    <li>
                        <div class="statistics-label">{{$t('indexInfo.PENDINGTOTAL')}}</div>
                        <a class="cursor">113</a>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <h3></h3>
                <div class="block-list-wrap">
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import ChartService from '@/services/chart-services';

    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'

    const blockTimeChart = new ChartService();
    const blockTradeChart = new ChartService();
    
    export default {
        name: 'index',
        data() {
            return {  
                searchKey:'',
                disabledBtn:false, 
                isFocus:false,
            }
        },
        props: {

        },
        computed: {

        },
		watch: {
		
		},
        components: {
            // List,
            // Item
        },
        methods: {
            initBlockTimeChart(){
                let r = this.$refs;
                blockTimeChart.init(r.blockTimeChart, blockTimeChart.blockTimeOption);
            },
            initBlockTradeChart(){
                let r = this.$refs;
                blockTradeChart.init(r.blockTradeChart, blockTradeChart.blockTradeOption);
            },
            //查询
            searchFn(){
                this.disabledBtn=true;
                let param = {
                    parameter:this.searchKey,
                }
                console.warn('搜索内容》》》',param)
                apiService.search.query(param).then((res)=>{
                    let {errMsg,code,data}=res
                    if(code==0){
                        //根据type不同进入不同的详情页
                        if(data.type==null){
                            this.$message.warning(this.$t('indexInfo.searchno'))
                        }else{
                            this.switchFn(data.type,data.struct)
                            this.$emit('searchFn',data);
                        }
                    }else{
                        this.$message.warning(this.$t('indexInfo.searchno'))
                            // this.$message.error(errMsg) 替换为search无结果
                    }
                }).catch((error)=>{
                    this.$message.error(error)
                });
                setTimeout(()=>{
                    this.disabledBtn=false;
                },2000);
            },
        },
        //生命周期函数
        created() {

        },
        mounted() {
            this.initBlockTimeChart();
            this.initBlockTradeChart();
            echarts.connect([blockTimeChart.chart,blockTradeChart.chart]);
        }    
    }
</script>
<style lang="less" scoped>
    .index-wrap{
        // background: #000;
        position: relative;
        .block-statistics{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
                width: 50%; 
                margin-bottom: 40px;
                .statistics-label{
                    color: #999;
                    font-size: 16px;
                    line-height: 19px;
                    margin-bottom: 13px;
                }
                a{
                    color: #fff;
                    font-size: 24px;
                    line-height: 28px;
                }    
                p{
                    color: #fff;
                    font-size: 20px;
                    line-height: 23px;
                    b{
                        color: #999;                    
                        color: #7D7D7D;
                        font-weight: normal;
                    }
                }           
            }
        }
        .search-index{
            height: 69px;
        }
        .chart{
            min-height: 80px;
        }
        .bar{
            h3{
                color: #999;
                font-size: 16px;
                line-height: 19px;
            }
            &.bar-left{
                position: relative;
            }
        }       
        .welcome-wrap{       
            width: 50%;
            margin: 180px auto;           
            h3{
                font-size: 40px;
                line-height: 47px;
                text-align: center;
                color: #fff;
            }
            .search{
                margin-top: 70px;
                &.search-index .el-button.el-searchs{
                    width: 120px;
                }
            }
        }
        .polyhedron{
            position: absolute;
            top: -70px;                
            animation: rotating 8s infinite linear;
            &.polyhedron-big{
                width: 180px;
                height: 180px;
                left: -20px;
            }
            &.polyhedron-mid{
                width: 86px;
                height: 86px;
                top: 250px;
                right: -43px;
            }
            &.polyhedron-mini{
                width: 50px;
                height: 50px;
                top: 52px;
                left: -80px;
            }
        }
    }
    // @keyframes rotate{

    // }
    
</style>
<style lang="less">
    .index-area{
        background: #000;
        // padding: 86px 0 0 0;
        // height: 100%;
    }
    .chart canvas{
        left: -23px !important;
    }    
    .bar .el-progress{
        width: 80%;
        margin-top: 5px;
        .el-progress-bar__outer{
            background: #3E3E3E;
        }
        .el-progress-bar__inner{
            background: #fff;
        }
    }   
</style>

