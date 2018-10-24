<template>
    <div class="header-wrap">
        <el-menu :default-active="$route.path" :router="true" class="el-menu-demo" mode="horizontal" active-text-color="#FFE32C">
            <el-menu-item index="/">
                <router-link to="/">首页</router-link>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">区块链</template>
                <el-menu-item index="/trade">
                    <router-link to="/trade">查看交易</router-link>
                </el-menu-item>
                <el-menu-item index="/trade-pending">
                    <router-link to="/trade-pending">查看待处理交易</router-link>
                </el-menu-item>
                <el-menu-item index="/block">
                    <router-link to="/block">查看区块</router-link>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="/node">
                <router-link to="/node">节点</router-link>
            </el-menu-item>
            <el-submenu index="3">
                <template slot="title">更多</template>
                <el-menu-item index="/wallet">
                    <router-link to="/wallet">钱包</router-link>
                </el-menu-item>
                <el-menu-item index="/document">
                    <router-link to="/document">开发帮助</router-link>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script lang="ts">
  //import  from ''
    export default {
        //组件名
        name: 'header',
        //实例的数据对象
        data () {
          return {

                }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {

            },
        //方法
        methods: {

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

<style lang="less" scoped>

</style>

