<template>
    <div class="header-wrap">
        <div class="logo">
            <img class="icon1" src='./images/herder-logo-a.png'/>
            <img class="icon2" src='./images/logo-font.png'/>
            <p>The platScan Block Exploer</p>
        </div>
        <div class="menu">
            <el-menu :default-active="$route.path" :router="true" class="el-menu-demo" mode="horizontal" background-color="transparent" text-color ="#D7DDE9" active-text-color="#FFFF00">
                <el-menu-item index="/">
                    <router-link to="/">{{ $t("menu.home") }}</router-link>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">{{ $t("menu.blockChain") }}</template>
                    <el-menu-item index="/trade">
                        <router-link to="/trade">{{ $t("menu.blockChainItem.viewTxns") }}</router-link>
                    </el-menu-item>
                    <el-menu-item index="/trade-pending">
                        <router-link to="/trade-pending">{{ $t("menu.blockChainItem.viewPendingTxns") }}</router-link>
                    </el-menu-item>
                    <el-menu-item index="/block">
                        <router-link to="/block">{{ $t("menu.blockChainItem.viewBlocks") }}</router-link>
                    </el-menu-item>
                </el-submenu>
                <!-- <el-menu-item index="/node" disabled>
                    <el-tooltip class="item" effect="light" content="敬请期待" placement="bottom">
                    <span>{{ $t("menu.node") }}</span>
                    </el-tooltip>
                </el-menu-item> -->
                <el-menu-item index="/node">
                    <router-link to="/node">{{ $t("menu.node") }}</router-link>
                    </el-tooltip>
                </el-menu-item>
                <el-submenu index="3">
                    <template slot="title">{{ $t("menu.more") }}</template>
                    <!-- <el-menu-item index="/wallet">
                        <router-link to="/wallet">{{ $t("menu.moreItem.wallet") }}</router-link>
                    </el-menu-item> -->
                    <el-menu-item index="">
                        <a href="https://github.com/PlatONnetwork/wiki/wiki" target="_blank">{{ $t("menu.moreItem.help") }}</a>
                        <!-- <router-link to="/document">{{ $t("menu.moreItem.help") }}</router-link> -->
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="search">
            <el-input :placeholder="$t('search.placeHolder')" v-model.trim="searchKey"  @keyup.enter.native="searchFn" size="mini"></el-input>
            <el-button type="primary" class="el-btn el-searchs" @click="searchFn">{{ $t("search.searchBtn") }}</el-button>
        </div>
        <div class="right-most">
            <el-dropdown @command="handleCommand" placement="bottom-start">
                <!-- <span class="el-dropdown-link">
                    {{netObj[chainId]}}<i class="el-icon-arrow-down el-icon-right"></i>
                </span> -->
                <span class="el-dropdown-link">
                    {{getNetObj(chainId)}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu  slot="dropdown" >
                    <el-dropdown-item v-for='(item,index) in chainList' :key='index' :command='item.cid'>
                        {{item[lang]}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleCommandLangage" placement="bottom-start">
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
    import contractService from '@/services/web3-services'
    export default {
        //组件名
        name: 'header-wrap',
        //实例的数据对象
        data () {
            return {
                dropDisabled:false,
                searchKey:'',//搜索
                language: localStorage.getItem('i18nLocale')?localStorage.getItem('i18nLocale'):'zh-cn',
                netObj:{
                    "100":"MainNet",
                    "1":"TestNet"
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
            ...mapGetters(['chainList','chainId','chainHttp']),
            lang() {
                return this.$i18n.locale.indexOf('zh') !== -1 ? 'zh' : 'en'
            },
        },
        //方法
        methods: {
            ...mapActions(['changeChainId']),
            getNetObj(id){
                console.warn('首次id》》》',id);
                let arr = this.chainList.filter((item,index)=>{
                    return item.cid == id
                })
                let arr1=arr[0]
                console.warn('首次id》》》',arr1['en']);
                return arr1['en']
            },
            handleCommand(command){
                console.log('网络切换》》》',command)
                store.commit("CHANGE_ID",command)
                let arr = this.chainList.filter((item,index)=>{
                    return item.cid == command
                })
                store.commit("CHANGE_HTTP",arr[0].http)
                // this.$emit('changeDataFn')
                //切换网络之后，将当前网络存在sessionStorage
                sessionStorage.setItem('commandId',command)
                sessionStorage.setItem('commandHttp',arr[0].http)
                this.$router.push({
                    path:'/'
                })
            },
            handleCommandLangage(command){
                console.warn('command>>>>',command)
                this.$i18n.locale = command
                this.language = command
                window.i18nLocale = command
                localStorage.setItem('i18nLocale',command)
                // this.$i18n.locale = localStorage.getItem('i18nLocale')
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
                        if(data.type==null){
                            this.$message.warning(this.$t('indexInfo.searchno'))
                        }else{
                            this.switchFn(data.type,data.struct)
                            this.$emit('searchFn',data);
                        }
                    }else{
                        this.$message.error(errMsg)
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
                        });
                        break;
                    //交易详情
                    case 'transaction':
                        // let path = ''
                        // struct.txReceiptStatus == -1 ? path='/trade-pending-detail' : path = '/trade-detail'
                        return this.$router.push({
                            path:'/trade-detail',
                            query:{
                                txHash:struct.txHash
                            }
                        });
                        break;
                    //待处理
                    case 'pending':
                        return this.$router.push({
                            path:'/trade-pending-detail',
                            query:{
                                txHash:struct.txHash
                            }
                        });
                        break;
                    //节点详情
                    case 'node':
                        return this.$router.push({
                            path:'/node-detail',
                            query:{
                                address:struct.address,
                                id:struct.id
                            }
                        });
                        break;
                    //合约详情
                    case 'contract':
                        return this.$router.push({
                            path:'/contract-detail',
                            query:{
                                address:this.searchKey,
                                description:this.descriptionProp
                            }
                        });
                        break;
                    //地址详情
                    case 'account':
                        return this.$router.push({
                            path:'/address-detail',
                            query:{
                                address:this.searchKey,
                                description:this.descriptionProp
                            }
                        });
                        break;
                }
            }
        },
        //生命周期函数
        created(){

        },
        //监视
        watch: {
            // 'language':function(val){
            //    this.$i18n.locale = localStorage.getItem('i18nLocale')
            // }
        },
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
        height: 60px;
        z-index:99;
        padding:0 5.2%;
        margin: 0 auto;
        background: #040B27;
        align-items: center;   //居中对齐
        justify-content: space-between;   //两端对齐
        .menu{
            margin: 0 10% 0 0;
        }
    }
    .logo{
        display: inline-block;
        height: 100%;
        width: 289px;
        overflow: hidden;
        .logo-right{
            margin-top: 5px;
            margin-left: 42px;
        }
        .icon1{
            padding-top: 10px;
            padding-right: 4px;
            float: left;
        }
        .icon2{
            padding-top: 20px;
            padding-bottom: 2px;
        }
        p{
            font-family: ArialMT;
            font-size: 12px;
            color: #93A5C8;
            letter-spacing: 0;
        }
    }
    .el-menu-demo{
        width: 380px;
        // border: 0px;
        // border-bottom-color: #040B27;
        li.el-menu-item.is-active{
            border: 0px;
        }
    }
    .right-most{
        flex-shrink: 0;   // 网络切换+中英文不缩小
        width: 200px;
        div{
            font-family: ArialMT;
            font-size: 14px;
            color: #D7DDE9;
            letter-spacing: 0;
            text-align: right;
            .el-dropdown-link {
                cursor: pointer;
            }
        }
    }
    .right-most > .el-dropdown:first-child{
            margin-right: 25px;
    }
    .el-dropdown-menu{
        // background: #0E1438;
        padding: 0 0 0 0;
        .el-dropdown-menu__item{
            color: #8D9BB8;
            letter-spacing: 0;
        }
        .el-dropdown-menu__item:hover{
            background-color: #1F254C;
        }
        .el-dropdown-menu__item:focus{
            background-color: #0F83CD;
        }
        :first-child{
            margin: 9px 0 0 0;
        }
    }
    @media only screen and (max-width: 1680px) {
        .header-wrap .menu {
            margin: 0 0 0 0;
        }
    }
    @media only screen and (max-width: 1440px) {
        .header-wrap .menu {
            margin: 0 0 0 0;
        }
    }
    @media only screen and (max-width: 1366px) {
        .header-wrap .menu {
            margin: 0 0 0 0;
        }
        .el-menu-demo{
            width:390px;
        }
    }
    @media screen and (max-width: 1280px) {
        .el-menu-demo{
            width:350px;
        }
    }


</style>
<style lang="less">
    .search{
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: flex-start;
        border-radius: 4px;
        box-shadow: 0 2px 4px 2px rgba(7,11,48,0.30);
        .el-input{
            width:300px;
            height:40px;
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
            color: #fff;
        }
        .el-input--mini .el-input__inner{
            height:40px;
            line-height:40px;
        }
        .el-searchs{
            height:40px;
            // background-color: #1a2047;
            border-radius: 0px 4px 4px 0px;
            letter-spacing: 0.8px;
            // color: #fcff0a;
            border:none;
            border-radius:4px;
            border-top-left-radius:0;
            border-bottom-left-radius:0;
        }
    }
    .menu{
        .el-menu-demo  > .el-menu-item:hover{
            background: transparent !important;
        }
        .el-menu--horizontal > .el-submenu .el-submenu__title:hover{
            background: transparent !important;
        }
        .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
            border-bottom: 0 !important;
        }
        .el-menu--horizontal > .el-submenu .el-submenu__title{
            line-height: 62px;
        }
        .el-menu-item.is-disabled{
            opacity: 1;
        }
    }
    .el-menu--horizontal,.el-menu--horizontal>ul{
        border: 0 !important;
    }
    .el-menu--popup,.el-menu--popup>li{
        background: #0E1438 !important;
    }
    .el-menu--popup{
        min-width: 150px;
        margin: 0 0 0 0;
        padding: 0 0 0 0;
        a{
            color: #8D9BB8;
        }
        .el-menu-item:hover{
            background: #1F254C !important;
        }
        .el-menu-item:active{
            background: #0F83CD !important;
        }
    }
    //右边的dropdown
    .el-dropdown-menu{
        padding: 0 0 0 0 !important;
        border: 0px solid #ebeef5 !important;
    }
    .el-dropdown-menu__item.is-disabled{
        opacity: 0.25;
    }
    @media screen and (max-width: 1680px) {
        .search {
            .el-input{
                width:300px;
            }
        }
    }
    @media screen and (max-width: 1440px) {
        .search {
            .el-input{
                width:270px;
            }
        }
    }
    @media screen and (max-width: 1366px) {
        .search {
            .el-input{
                width:200px;
            }
        }

    }




</style>
