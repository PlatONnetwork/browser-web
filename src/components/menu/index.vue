<template>
    <div class='menu-top'>
        <div class="top">
            <div class="crumb">
                <slot></slot>
            </div>
            <div class="search">
                <el-input placeholder="请输入区块高度/地址/块哈希/交易哈希" class="margin10" v-model.trim="searchKey"  @keyup.enter.native="searchFn"></el-input>
                <el-button type="primary" class="el-btn" @click="searchFn">查询</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        //组件名
        name: 'menu-top',
        //实例的数据对象
        data () {
            return {
                searchKey:'',
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {

        },
        //方法
        methods: {
            //查询
            searchFn(){

            },
        },
        //生命周期函数
        created(){
        },
        //监视
        watch: {
        },
        //组件
        components: {}
    }
</script>
<style lang="less">
    .crumb{
        .el-breadcrumb{
            line-height: 50px;
        }
    }
    .search{
        .el-input{
            width:300px;
        }

    }
</style>
<style lang="less" scoped>
    .top{
        height:50px;
        line-height:50px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        .search{
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            justify-content: flex-start;
            .el-btn{
                margin-top:4px;
            }
        }
    }
</style>