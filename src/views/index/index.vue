<template>
    <div class="index-wrap">
        <div class="welcome-wrap">
            <h3>{{$t('indexInfo.WelcomeToPlatON')}}</h3>
            <div class="search search-header" :class="{'search-active':isFocus}">
                <el-input :placeholder="$t('search.placeHolder')" @focus="isFocus=true;" @blur="isFocus=false;" v-model.trim="searchKey"  @keyup.enter.native="searchFn" size="mini"></el-input>
                <el-button type="primary" class="el-btn el-searchs" :class="{'search-btn-active':isFocus}" @click="searchFn" :disabled='disabledBtn'>{{ $t("search.searchBtn") }}</el-button>
            </div>
        </div>
        <el-row>
            <el-col :span="12" class="bar-left">
                <h3>{{$t('indexInfo.LIVEBLOCKTIME')}}</h3>
                <div class="chart" ref="blockTimeChart"></div>
                <ul class="block-statistics">
                    <li>
                        <div>{{$t('indexInfo.LIVEBLOCKTIME')}}</div>
                        <a class="cursor">113</a>
                    </li>
                    <li>
                        <div>{{$t('indexInfo.LIVEBLOCKTIME')}}</div>
                        <a class="cursor">113</a>
                    </li>
                    <li>
                        <div>{{$t('indexInfo.LIVEBLOCKTIME')}}</div>
                        <p></p>
                        <el-progress :percentage="50"></el-progress>
                    </li>
                    <li>
                        <div>{{$t('indexInfo.LIVEBLOCKTIME')}}</div>
                        <p></p>
                        <el-progress :percentage="50"></el-progress>
                    </li>
                </ul>
            </el-col>
            <el-col :span="12" class="bar-left">
                <h3>{{$t('indexInfo.LIVEBLOCKTIME')}}</h3>
                <div class="chart" ref="blockTradeChart"></div>
                <ul class="block-statistics">
                    <li>
                        <div>{{$t('indexInfo.LIVEBLOCKTIME')}}</div>
                        <a class="cursor">113</a>
                    </li>
                    <li>
                        <div>{{$t('indexInfo.LIVEBLOCKTIME')}}</div>
                        <a class="cursor">113</a>
                    </li>
                    <li>
                        <div>{{$t('indexInfo.LIVEBLOCKTIME')}}</div>
                        <p></p>
                        <el-progress :percentage="50"></el-progress>
                    </li>
                    <li>
                        <div>{{$t('indexInfo.LIVEBLOCKTIME')}}</div>
                        <p></p>
                        <el-progress :percentage="50"></el-progress>
                    </li>
                </ul>
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
        .block-statistics{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
                width: 50%;                
            }
        }
        .chart{
            min-height: 80px;
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
        }
    }
    
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
</style>

