<template>
    <div class="header-wrap">
        <div class="logo">
            <img class="icon1" :src='iconSrc1'/>
            <img class="icon2" :src='iconSrc2'/>
            <p>The PlatON Block Exploer</p>
        </div>
        <div class="menu">
            <el-menu :default-active="$route.path" :router="true" class="el-menu-demo" mode="horizontal" background-color="#040B27" text-color ="#FFF" active-text-color="#FFE32C">
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
                <template slot="title">{{ $t("menu.more") }}</template>
                <el-menu-item index="/wallet">
                    <router-link to="/wallet">钱包</router-link>
                </el-menu-item>
                <el-menu-item index="/document">
                    <router-link to="/document">开发帮助</router-link>
                </el-menu-item>
            </el-submenu>
        </el-menu>
        </div>
        <div class="search">
            <el-input placeholder="请输入区块高度/地址/块哈希/交易哈希" v-model.trim="searchKey"  @keyup.enter.native="searchFn" size="mini"></el-input>
            <el-button type="primary" class="el-btn" @click="searchFn">查询</el-button>
        </div>
        <div class="right-most">
            <el-dropdown  @command="handleCommand">
                <span class="el-dropdown-link">
                    {{netObj[chainId]}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu  slot="dropdown" >
                    <el-dropdown-item v-for='(item,index) in chainList' :key='index' :command='item.cid'>
                        {{item[lang]}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleCommandLangage">
                <span class="el-dropdown-link">
                    {{languageObj[language]}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu  slot="dropdown" >
                    <el-dropdown-item v-for='(item,index) in options' :key='index' :command='item.value'>
                        {{item.label}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script lang='ts'>
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    import store from '@/vuex/store'
    // import search from '@/components/search/search.vue'
    export default {
        //组件名
        name: 'header-wrap',
        //实例的数据对象
        data () {
            return {
                searchKey:'',//搜索
                iconSrc1: '/static/images/herder-logo-a.png',
                iconSrc2: '/static/images/herder-logo-b.png',
                language: 'zh-cn',
                netObj:{
                    "1":"MainNet",
                    "2":"TestNet"
                },
                options:[
                    {
                        value: 'zh-cn',
                        label: '简体中文'
                    },
                    {
                        value: 'en',
                        label: 'English'
                    }
                ],
                languageObj:{
                    'zh-cn':'简体中文',
                    'en':'English'
                }
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: ['descriptionProp'],
        //计算
        computed: {
            ...mapGetters(['chainList','chainId']),
            lang() {
                return this.$i18n.locale.indexOf('zh') !== -1 ? 'zh' : 'en'
            }
        },
        //方法
        //方法
        methods: {
            ...mapActions(['changeChainId']),
            handleCommand(command){
                console.log('网络切换》》》',command)
                store.commit("CHANGE_ID",command)
            },
            handleCommandLangage(command){
                this.$i18n.locale = command
                this.language = command
            },
            //查询
            searchFn(){
                let param = {
                    // cid:'',
                    parameter:this.searchKey,
                }
                console.warn('搜索内容》》》',param)
                apiService.search.query(param).then((res)=>{
                    let {errMsg,code,data}=res
                    if(code==0){
                        //根据type不同进入不同的详情页
                        this.switchFn(data.type,data.struct)
                    }
                }).catch((error)=>{
                    this.$message.error(error)
                })
            },
            switchFn(type,struct){
                switch (type){
                    //区块详情
                    case 'block':
                        return this.$router.push({
                            path:'/block-detail',
                            query:{
                                height:struct.height
                            }
                        })
                        break
                    //交易详情
                    case 'transaction':
                        let path = ''
                        struct.txReceiptStatus == -1 ? path='/trade-pending-detail' : path = '/trade-detail'
                        return this.$router.push({
                            path:path,
                            query:{
                                txHash:struct.txHash
                            }
                        })
                        break
                    //节点详情
                    case 'node':
                        return this.$router.push({
                            path:'',
                            query:{}
                        })
                        break
                    //合约详情
                    case 'contract':
                        return this.$router.push({
                            path:'/contract-detail',
                            query:{
                                address:this.searchKey,
                                description:this.descriptionProp
                            }
                        })
                        break
                    //地址详情
                    case 'account':
                        return this.$router.push({
                            path:'/address-detail',
                            query:{
                                address:this.searchKey,
                                description:this.descriptionProp
                            }
                        })
                        break
                }
            }
        },
        //生命周期函数
        created(){
        },
        //监视
        watch: {},
        //组件
        components: {
            // 'v-search':search
        }
    }
</script>
<style lang="less" scoped>
    .header-wrap{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        padding:0 100px;
        margin: 0 auto;
        color: #FFF;
        background: #040B27;
        z-index:9999;
        .logo{
                display: inline-block;
                height: 100%;
                width: 289px;
                .logo-right{
                    margin-top: 5px;
                    margin-left: 42px;
                }
               .icon1{
                   float: left;
               }
            .menu{
                float: right
            }
        }
        .right-most
            div{
            font-family: ArialMT;
            font-size: 14px;
            color: #D7DDE9;
            letter-spacing: 0;
            text-align: right;
            :first-child{
                padding-right: 25px;
            }
            
        }
    }
    // .toggle-language{
    //     width:120px;
    //     height:30px;
    //     line-height:30px;
    // }
</style>
<style lang="less">
    .search{
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: flex-start;
        border-radius: 4px;
        .el-input{
            width:300px;
            height:50px;
        }
        .el-input__inner{
            background-color: #0e1438;
            color: #8d9bb8;
            letter-spacing: 0.7px;
            border-radius:4px;
            border-top-right-radius:0;
            border-bottom-right-radius:0;
            box-shadow: 0px 5px 19px 1px rgba(2, 4, 23, 0.3);
            border:none;
        }
        .el-input--mini .el-input__inner{
            height:50px;
            line-height:50px;
        }
        .el-btn{
            height:50px;
            background-color: #1a2047;
            border-radius: 0px 4px 4px 0px;
            letter-spacing: 0.8px;
            color: #fcff0a;
            border:none;
            border-radius:4px;
            border-top-left-radius:0;
            border-bottom-left-radius:0;
        }
    }
</style>

