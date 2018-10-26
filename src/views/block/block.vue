<template>
    <div class="block-wrap">
        <div class="content-area">
            <v-menu>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>区块</el-breadcrumb-item>
                </el-breadcrumb>
            </v-menu>
            <div class="bottom">
                <div class="title">
                    <div class='record'>
                        <span>总共{{pageTotal}}区块</span>
                    </div>
                    <div class="pagination-box1">
                        <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-sizes="[10, 20, 50, 100]"
                            layout="prev, pager, next"
                            :pager-count="9">
                        </el-pagination>
                    </div>
                </div>
                <div class="table">
                    <el-table :data="tableData" style="width: 100%"  stripe border class='item-table'  key='firstTable'  size="mini">
                        <el-table-column label="区块">
                            <template slot-scope="scope">
                                <span class='cursor normal' @click='goBlockDetail(scope.$index,scope.row)'>{{scope.row.height}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="块龄">
                            <template slot-scope="scope">
                                <span>{{scope.row.serverTime-scope.row.timeStamp}}秒前</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="transaction" label="交易数"></el-table-column>
                        <el-table-column  prop="size"  label="区块大小">
                            <template slot-scope="scope">
                                <span >{{scope.row.size}}Byte</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="出块节点">
                            <template slot-scope="scope">
                                <span class='cursor normal'>{{scope.row.miner}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  prop=""  label="能量消耗">
                            <template slot-scope="scope">
                                <span>{{scope.row.energonUsed}}({{(scope.row.energonUsed/scope.row.energonLimit)*100}}%)</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="平均能量价值">
                            <template slot-scope="scope">
                                <span>{{scope.row.energonAverage}}Ene</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="奖励">
                            <template slot-scope="scope">
                                <span>{{scope.row.blockReward}}ATP</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-box" v-if='paginationFlag'>
                        <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="pageSize"
                            layout="sizes,total,  prev, pager, next"
                            :total="pageTotal"
                            :pager-count="9">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import menu from '@/components/menu/index.vue'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    export default {
        //组件名
        name: 'block-wrap',
        //实例的数据对象
        data () {
            return {
                newRecordFlag:false,
                paginationFlag:true,
                tableData:[
                    {
                        "height": 17888,//块高
                        "timeStamp": 1798798798798,//出块时间
                        "transaction": 10000,//块内交易数
                        "size": 188,//块大小
                        "miner": "0x234", // 出块节点
                        "energonUsed": 111,//能量消耗
                        "energonLimit": 24234,//能量消耗限制
                        "energonAverage": 11, //平均能量价值
                        "blockReward": "123123",//区块奖励
                        "serverTime": 1708098077  //服务器时间
                    }
                ],
                currentPage:1,
                pageSize:10,
                pageTotal:0,
                currentPage1:1,
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
            //查询
            searchFn(){

            },
            handleCurrentChange(val){
                this.currentPage = val
                this.getBlockList()
            },
            handleSizeChange(val){
                this.pageSize = val
                this.getBlockList()
            },
            // handleCurrentChange1(val){
            //     this.currentPage1 = val
            //     let param = {
            //         cid:'',
            //         pageNo:this.currentPage1,
            //         pageSize:this.pageSize
            //     }
            //     apiService.block.blockList(param).then((res)=>{
            //         let {data,totalPages,totalCount,code,errMsg}=res
            //         if(code==0){
            //             this.tableData = data
            //             this.pageTotal = totalCount
            //         }else{
            //             this.$message.error(errMsg)
            //         }
            //     }).catch((error)=>{
            //         this.$message.error(error)
            //     })
            // },
            //获取交易列表 下分页
            getBlockList(){
                let param = {
                    // cid:'',
                    pageNo:this.currentPage,
                    pageSize:this.pageSize
                }
                console.warn('获得区块列表》》》',param)
                apiService.block.blockList(param).then((res)=>{
                    let {data,totalPages,totalCount,code,errMsg}=res
                    if(code==0){
                        this.tableData = data
                        this.pageTotal = totalCount
                        //判断是否就是一页  一页的话只显示上面的分页  多页的话上下两个分页都显示  页数
                        totalPages==1?this.paginationFlag=false:this.paginationFlag=true
                    }else{
                        this.$message.error(errMsg)
                    }
                }).catch((error)=>{
                    this.$message.error(error)
                })
            },
            //进入区块详情
            goBlockDetail(index,row){
                this.$router.push({
                    path:'/block-detail',
                    query:{
                        height:row.height
                    }
                })
            },

        },
        //生命周期函数
        created(){
            //获取交易列表
            this.getBlockList()
        },
        //监视
        watch: {
            'chainId':'getBlockList'
        },
        //组件
        components: {
            'v-menu':menu
        }
    }
</script>
<style lang="less" scoped>
    .block-wrap{
        .bottom{
            padding:20px 0;
            .title{
                margin-bottom:20px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
            }
        }
    }
</style>

