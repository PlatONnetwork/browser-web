<template>
    <div class="node-wrap">
        <com-header :descriptionProp='descriptionProp' @changeDataFn='changeDataFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Node
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{$t('nodeInfo.index')}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="title">
                    <div class='record '>
                        <span class='margin20'>{{$t('nodeInfo.validate')}}</span>
                        <span class='normal'>({{$t('nodeInfo.rule')}})</span>
                    </div>
                    <div class="input-search">
                        <el-button type="primary" class='icon-search'  icon="el-icon-search"></el-button>
                        <el-input :placeholder="$t('nodeInfo.placeHolder')" v-model.trim="searchKey"  @keyup.enter.native="searchFn" size="mini" clearable></el-input>
                    </div>
                </div>
                <div class="table">
                    <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini" :row-class-name="tableRowClassName" @row-click='rowClick'>
                        <el-table-column :label="$t('nodeInfo.ranking')" width='50'>
                            <template slot-scope="scope">
                                <span>{{scope.row.ranking}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  :label="$t('nodeInfo.name')">
                            <template slot-scope="scope">
                                <img src="./image/user.png" alt="" class='images'>
                                <span class='normal'>{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  :label="$t('nodeInfo.electionStatus')">
                            <template slot-scope="scope">
                                <!-- <span>{{scope.row.electionStatus}}</span> -->
                                <span :class='{"node-candidate":scope.row.electionStatus == 1,"node-standby":scope.row.electionStatus == 4}'>{{ $t('nodeInfo.' + statusFn[scope.row.electionStatus])}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('nodeInfo.location')"  >
                            <template slot-scope="scope">
                                <img :src="'data:image/png;base64,'+flag" alt=""  class='images images1'>
                                <span>{{scope.row.location}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('nodeInfo.deposit')" >
                            <template slot-scope="scope">
                                <span>
                                    {{scope.row.deposit}} ATP
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('nodeInfo.blockCount')" >
                            <template slot-scope="scope">
                                <span>{{scope.row.blockCount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('nodeInfo.rewardRatio')" >
                            <template slot-scope="scope">
                                <span>{{scope.row.rewardRatio}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
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
import { timeDiff } from '@/services/time-services';
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
    export default {
        //组件名
        name: 'node-wrap',
        //实例的数据对象
        data () {
            return {
                searchKey:'',
                tableData:[{
                "ranking": 1,// 排名
                "logo":"", // 节点LOGO，具体形式待定
                "name": "node-1",// 账户名称
                "electionStatus": 1,// 竞选状态:1-候选前100名,2-出块中,3-验证节点,4-备选前100名
                "countryCode":"CN", // 国家代码
                "location": "中国广东深圳",// 地理位置
                "deposit": "1.254555555", // 质押金，单位-ATP
                "blockCount": 252125,// 产生的总区块数
                "rewardRatio": 0.02,// 分红比例:小数
                "address": "0xsfjl34jfljsl435kd", // 节点地址
                },{
                "ranking": 1,// 排名
                "logo":"", // 节点LOGO，具体形式待定
                "name": "node-1",// 账户名称
                "electionStatus": 4,// 竞选状态:1-候选前100名,2-出块中,3-验证节点,4-备选前100名
                "countryCode":"CN", // 国家代码
                "location": "中国广东深圳",// 地理位置
                "deposit": "1.254555555", // 质押金，单位-ATP
                "blockCount": 252125,// 产生的总区块数
                "rewardRatio": 0.02,// 分红比例:小数
                "address": "0xsfjl34jfljsl435kd", // 节点地址
                }],
                statusFn:{
                    '1':'candidate',
                    '2':'出块中',
                    '3':'验证节点',
                    '4':'standby'
                },
                descriptionProp: 'node',
                flag:'',
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {
            ...mapGetters(['chainList','chainId','chainHttp','country']),
        },
        //方法
        methods: {
            tableRowClassName({row, rowIndex}) {
                if(rowIndex%2 === 0) {
                    return 'even-row cursor';
                }else{
                    return 'odd-row cursor';
                }
            },
            changeDataFn(){
                console.warn('子组件告诉node链id更改》》》》')
                this.getNodeList()
            },
            getNodeList(){

            },
            //根据国家code获取国家国旗
            getFlag(code){
                let arr = this.country.filter((item,index)=>{
                    return code == item._id
                });
                // debugger;
                console.warn(arr)
                // debugger
                if(arr.length){
                    this.flag = arr[0].Flag
                }
            },
            rowClick(row,event,column){
                console.log(row)
                this.$router.push({
                    path:'/node-detail',
                    address:row.address
                })
            }
        },
        //生命周期函数
        created(){
            this.getFlag('CN')
        },
        //监视
        watch: {

        },
        //组件
        components: {
            comHeader,
            comFooter,
        }
    }
</script>

<style lang="less" scoped>
.node-wrap {
    .bottom {
        padding: 26px 0 28px;
        .title {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            margin-bottom: 10px;
            .record {
                font-size: 12px;
                line-height: 30px;
                letter-spacing: 0.7px;
                color: #d7dde9;
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
.images{
    display: inline-block;
    width:20px;
    height:20px;
    vertical-align: middle;
}
.images1{
    width:30px;
}
</style>
<style lang="less">
    .input-search{
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: flex-start;
        border-radius: 4px;
        // box-shadow: 0 2px 4px 2px rgba(7,11,48,0.30);
        .el-input{
            width:270px;
            height:34px;
        }
        .el-input__inner{
            background-color: #0e1438;
            border:none;
            border-radius:4px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            color: #fff;
            letter-spacing: 0.7px;
            padding-left:0;
        }
        .el-input--mini .el-input__inner{
            height:34px;
            line-height:34px;
        }
        .icon-search{
            height: 34px;
            line-height:34px;
            background-color: #0e1438;
            border: none;
            border-radius: 4px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            padding-left: 12px;
            padding-right: 6px;
            padding-top:0;
            font-size:16px;
            color: #8d9bb8;
        }
        .el-icon-circle-close{
            // border-radius:none;
            // background:none;
            // font-size: 14px;
            // color: #FFFF00;
        }
    }
</style>
