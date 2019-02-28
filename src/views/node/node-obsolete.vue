<template>
    <div class="node-obsolete-wrap">
        <com-header :descriptionProp='descriptionProp' @changeDataFn='changeDataFn'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Node
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('menu.home')}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{$t('nodeInfo.obsoleteNode')}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="title">
                    <div class='record '>
                        <span class='margin20'>{{$t('nodeInfo.obsoleteNode')}}</span>
                    </div>
                    <div class="input-search">
                        <el-button type="primary" class='icon-search'  icon="el-icon-search" @click='getNodeList'></el-button>
                        <el-input :placeholder="$t('nodeInfo.placeHolder')" v-model.trim="searchKey"  @keyup.enter.native="getNodeList" size="mini" clearable></el-input>
                    </div>
                </div>
                <div class="table">
                    <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini" :row-class-name="tableRowClassName" @row-click='rowClick'>
                        <el-table-column :label="$t('nodeInfo.No')" width='100'>
                            <template slot-scope="scope">
                                <span>{{scope.row.ranking}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  :label="$t('nodeInfo.nodeName')">
                            <template slot-scope="scope">
                                <img :src="'../static/images/'+'characters-'+scope.row.logo+'.jpg'" alt="" class='images iconImage'>
                                <span class='normal'>{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column  :label="$t('nodeInfo.electionStatus')">
                            <template slot-scope="scope">
                                <span :class='{"node-candidate":scope.row.electionStatus == 1,"node-standby":scope.row.electionStatus == 4}'>{{ $t('nodeInfo.' + statusFn[scope.row.electionStatus])}}</span>
                            </template>
                        </el-table-column> -->
                        <el-table-column :label="$t('nodeInfo.location')">
                            <template slot-scope="scope">
                                <img :src="'data:image/png;base64,' + scope.row.countryCode" alt="img"  class='images images1'>
                                <span>{{scope.row.location}}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column :label="$t('nodeInfo.deposit')" >
                            <template slot-scope="scope">
                                <span>
                                    {{scope.row.deposit}} Energon
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('nodeInfo.tickets')" >
                            <template slot-scope="scope">
                                <span>
                                    {{scope.row.tickets}}
                                </span>
                            </template>
                        </el-table-column> -->
                        <el-table-column :label="$t('nodeInfo.blockCount')" >
                            <template slot-scope="scope">
                                <span>{{scope.row.blockCount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('nodeInfo.rewardRatio')" >
                            <template slot-scope="scope">
                                <span>{{parseFloat((scope.row.rewardRatio*100).toPrecision(12))}} %</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('nodeInfo.dateObsolete')" >
                            <template slot-scope="scope">
                                <span>{{new Date(scope.row.eliminateTime).Format('yyyy-MM-dd HH:mm:ss')}}</span>
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
        name: 'node-obsolete-wrap',
        //实例的数据对象
        data () {
            return {
                searchKey:'',
                tableData:[

                ],
                statusFn:{
                    '1':'candidate',
                    '2':'出块中',
                    '3':'validator',
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
            //获取节点列表
            getNodeList(){
                let param = {
                    keyword:this.searchKey
                };
                apiService.node.historyList(param).then(res=>{
                    let {errMsg,code,data}=res,newList=[];
                    if(code == 0){
                        data.forEach((item,index)=>{
                            // console.warn(this.getFlag(item.countryCode))
                            // let countryCode = this.getFlag(item.countryCode)
                            newList.push({
                                ranking : item.ranking,
                                logo : item.logo,
                                name : item.name,
                                electionStatus : item.electionStatus,
                                countryCode : this.getFlag(item.countryCode),
                                location : item.location,
                                deposit : item.deposit,
                                blockCount : item.blockCount,
                                rewardRatio : item.rewardRatio,
                                address : item.address,
                                id : item.id,
                                eliminateTime : item.eliminateTime
                            })
                        })
                        this.tableData = newList
                    }else{
                        this.$message.error(errMsg);
                    }
                }).catch(error=>{
                    this.$message.error(error);
                })
            },
            //根据国家code获取国家国旗
            getFlag(code){
                let arr = this.country.filter((item,index)=>{
                    return code == item._id
                });
                if(arr.length){
                    return arr[0].Flag
                }
            },
            //根据国家code获取相应的中英文国家名称
            rowClick(row,event,column){
                this.$router.push({
                    path:'/node-obsolete-detail',
                    query:{
                        address:row.address,
                        id:row.id
                    }
                })
            }
        },
        //生命周期函数
        created(){
            this.getNodeList();
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
.node-obsolete-wrap {
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
.iconImage{
    border-radius: 50%
}
.validator-Node{
    display: flex;
    height: 100px;
    border-radius: 4px;
    margin: 25px 0 0 0;
    background: #0C1035;
    justify-content: center;
    align-items: center;
    > li {
        // height: 56px;
        width: 100/5%;
        flex: 1/5;
        text-align: center;
    }
    p {
        margin: 0 0 2px;
        // height: 45px;
        font-size: 34px;
        height: 40px;
        line-height: 40px;
        letter-spacing: 2.4px;
        color: #d2daea;
    }
    span {
        letter-spacing: 1.4px;
        color: #6d81a9;
    }
    .color-red,.subsize{
        color: #FF374F;
    }
    .subsize{
        font-size: 24px
    }
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
