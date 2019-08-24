<template>
    <div class="header-wrap">
        <div class="logo">
            <img class="icon1" src='@/assets/images/herder-logo-a.png'/>
            <img class="icon2" src='@/assets/images/herder-logo-b.png'/>
            <p>The PlatON Block Explorer</p>
        </div>
        <div class="menu">
            <el-menu :default-active="$route.path" :router="true" class="el-menu-demo" mode="horizontal" background-color="transparent" text-color ="#999" active-text-color="#FFF">
                <el-menu-item index="/">
                    <router-link to="/">{{ $t("menu.home") }}</router-link>
                </el-menu-item>
                <el-menu-item index="/block">
                    <router-link to="/block">{{ $t("menu.block") }}</router-link>
                </el-menu-item>
                <el-menu-item index="/trade">
                    <router-link to="/trade">{{ $t("menu.transaction") }}</router-link>
                </el-menu-item>
                <el-menu-item index="/node">
                    <router-link to="/node">{{ $t("menu.validator") }}</router-link>
                </el-menu-item>
                <el-menu-item index="/proposal">
                    <router-link to="/proposal">{{ $t("menu.proposal") }}</router-link>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="search search-header" :class="{'search-active':isFocus,'search-hide':(!hideSearch || ($route.path!='/'))}">
            <el-input :placeholder="$t('search.placeHolder')" @focus="isFocus=true;" @blur="isFocus=false;" v-model.trim="searchKey"  @keyup.enter.native="searchFn" size="mini"></el-input>
            <el-button type="primary" class="el-btn el-searchs" :class="{'search-btn-active':isFocus}" @click="searchFn" :disabled='disabledBtn'>{{ $t("search.searchBtn") }}</el-button>
        </div>
        <div class="right-most">
            <el-dropdown @command="handleCommand" placement="bottom-start" @visible-change='visibleChange1'>
                <!-- <span class="el-dropdown-link">
                    {{getNetObj(chainId)}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span> -->
                <span class="el-dropdown-link">
                    {{getNetObj(chainId)}}<i class="el-icon--right" :class='iconClass1'></i>
                </span>
                <el-dropdown-menu  slot="dropdown" >
                    <el-dropdown-item v-for='(item,index) in chainList' :key='index' :command='item.cid'>
                        {{item[lang]}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleCommandLangage" placement="bottom-start" @visible-change='visibleChange2'>
                <span class="el-dropdown-link">
                    {{languageObj[language]}}<i class="el-icon--right" :class='iconClass2'></i>
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

<script lang="ts">
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    import store from '@/vuex/store'
    export default {
        name: '',
        data() {
            return {
                iconClass1:'el-icon-arrow-down',
                iconClass2:'el-icon-arrow-down',
                disabledBtn:false,
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
                },
                isFocus:false
            }
        },
        computed: {
            ...mapGetters(['chainList','chainId','chainHttp','hideSearch']),
            lang() {
                return this.$i18n.locale.indexOf('zh') !== -1 ? 'zh' : 'en'
            },
        },
		watch: {
		
		},
        components: {

        },
        inject:['reload'],
        methods: {
            ...mapActions(['changeChainId']),
            visibleChange1(val){
                if(val){
                    this.iconClass1='el-icon-arrow-up';
                }else{
                    this.iconClass1='el-icon-arrow-down';
                }
            },
            visibleChange2(val){
                console.warn('val>>>>>',val)
                if(val){
                    this.iconClass2='el-icon-arrow-up';
                }else{
                    this.iconClass2='el-icon-arrow-down';
                }
            },
            getNetObj(id){
                console.warn('首次id》》》',id);
                let arr = this.chainList.filter((item,index)=>{
                    return item.cid == id
                })
                // let arr = sessionStorage.getItem('chainList').filter((item,index)=>{
                //     return item.cid == id
                // })
                // debugger
                if(!arr.length){
                    return '';
                }
                let arr1=arr[0]
                console.warn('首次net》》》',arr1['en']);
                return arr1['en']
            },
            handleCommand(command){
                console.log('网络切换》》》',command)
                store.commit("CHANGE_ID",command)
                let arr = this.chainList.filter((item,index)=>{
                    return item.cid == command
                })
                store.commit("CHANGE_HTTP",arr[0].http)
                store.commit("CHANGE_CONTEXT",arr[0].context)
                //切换网络之后，将当前网络存在sessionStorage
                sessionStorage.setItem('commandId',command)
                sessionStorage.setItem('commandHttp',arr[0].http)
                sessionStorage.setItem('commandContext',arr[0].context)
                localStorage.setItem('commandContext',arr[0].context)
                localStorage.setItem('cid',command)
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
                this.disabledBtn=true;
                let param = {
                    parameter:this.searchKey,
                }
                console.warn('搜索内容》》》',param)
                apiService.search.query(param).then((res)=>{
                    let {errMsg,code,data}=res

                    this.searchKey = '';
                    if(code==0){
                        //根据type不同进入不同的详情页
                        if(!data.type){
                            this.$message.warning(this.$t('indexInfo.searchno'))
                        }else{
                            this.switchFn(data.type,data.struct)
                            // this.$emit('searchFn',data);
                        }
                    }else{
                        this.$message.warning(this.$t('indexInfo.searchno'))
                            // this.$message.error(errMsg) 替换为search无结果
                    }
                }).catch((error)=>{
                    this.searchKey = '';
                    this.$message.error(error)
                });
                setTimeout(()=>{
                    this.disabledBtn=false;
                },2000);
            },
            switchFn(type,struct){
                switch (type){
                    //区块详情
                    case 'block':                       
                        this.$router.push({
                            path:'/block-detail',
                            query:{
                                height:struct.number
                            }
                        });
                        if(this.$route.path=='/block-detail'){
                            this.reload();
                        }
                        break;
                    //交易详情
                    case 'transaction':
                        // let path = ''
                        // struct.txReceiptStatus == -1 ? path='/trade-pending-detail' : path = '/trade-detail'
                        this.$router.push({
                            path:'/trade-detail',
                            query:{
                                txHash:struct.txHash
                            }
                        });
                        if(this.$route.path=='/trade-detail'){
                            this.reload();
                        }
                        break;
                    //节点详情
                    case 'staking':
                        this.$router.push({
                            path:'/node-detail',
                            query:{
                                address:struct.nodeId,
                            }
                        });
                        if(this.$route.path=='/node-detail'){
                            this.reload();
                        }
                        break;
                    //地址详情
                    case 'address':
                        this.$router.push({
                            path:'/address-detail',
                            query:{
                                address:struct.address,
                            }
                        });
                        if(this.$route.path=='/address-detail'){
                            this.reload();
                        }
                        break;
                }
            }
        },
        //生命周期函数
        created() {
            
        },
        mounted() {
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
        height: 86px;
        z-index:99;
        padding:0 5.2%;
        margin: 0 auto;
        background: #000;
        align-items: center;   //居中对齐
        justify-content: space-between;   //两端对齐
        .menu{
            margin: 0 20% 0 0;
        }
        .search{
            opacity: 0;
            transition: opacity 3.0s ease;  
            &.search-hide{                     
                opacity: 1;
            }
        }
    }
    .logo{
        display: inline-block;
        // height: 100%;
        width: 200px;
        overflow: hidden;
        .logo-right{
            margin-top: 5px;
            margin-left: 42px;
        }
        .icon1{
            // padding-top: 10px;
            padding-right: 4px;
            float: left;
        }
        .icon2{
            padding-top: 6px;
            padding-bottom: 2px;
        }
        p{
            font-family: ArialMT;
            font-size: 12px;
            color: #B3B3B3;
            letter-spacing: 0;
        }
    }
    .el-menu-demo{
        width: 580px;
        // border: 0px;
        // border-bottom-color: #040B27;
        li.el-menu-item{
            border: 0px;
        }
    }
    .right-most{
        flex-shrink: 0;   // 网络切换+中英文不缩小
        width: 200px;
        display: flex;
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
            margin:0 25px;
    }
    .el-dropdown-menu{
        background:#fff;
        padding: 0 0 0 0;
        .el-dropdown-menu__item{
            color: #222;
            background-color: #fff;
            letter-spacing: 0;
        }
        .el-dropdown-menu__item:hover{
            background: #EAEAEA;
            color: #0798DE;
        }
        .el-dropdown-menu__item:focus{
            background-color: #0F83CD;
        }
        :first-child{
            margin: 9px 0 0 0;
        }
    }
    .search-header{
        width: 500px;
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
        .search-header{
            width: 400px;
        }
        .el-menu-demo{
            width:485px;
            .el-menu-item{
                padding: 0 10px;
            }
        }
        width: 350px;
    }
    @media screen and (max-width: 1280px) {
        // .el-menu-demo{
        //     width:350px;
        // }
        .header-wrap{
            padding:0 0;
        }
        .logo{
            display: none;
        }
    }
    .to-help{
        width: 100%;
        display:inline-block;
    }


</style>
<style lang="less">
    .search-header .el-input .el-input__inner{
        color: #fff !important;
    }
    .menu{
        .el-menu-demo  > .el-menu-item{
            background: transparent !important;
            &:hover{
                color: #fff !important;
                // background: transparent !important;
            }
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
    .right-most{
        .el-select .el-input .el-input__inner{
            font-family: ArialMT;
            font-size: 14px;
            color: #D7DDE9;
            letter-spacing: 0;
            border:none;
            background: transparent;
        }
        .el-select:hover .el-input__inner {
            background: transparent;
            border: none;
            color: #D7DDE9;
        }
        .el-select .el-input.is-focus .el-input__inner{
            background: transparent;
            border: none;
            color: #D7DDE9;
        }
    }
    .el-button.el-searchs.el-btn.search-btn-active{
        background: #FFFFFF;
        color: #000;
        border-left: 1px solid #fff;
    }
    .search.search-active{
        border: 1px solid #fff;
    }
    // @media screen and (max-width: 1680px) {
    //     .search {
    //         .el-input{
    //             // width:300px;
    //             width:350px;
    //         }
    //     }
    // }
    // @media screen and (max-width: 1440px) {
    //     .search {
    //         .el-input{
    //             // width:270px;
    //             width:350px;
    //         }
    //     }
    // }
    // @media screen and (max-width: 1366px) {
    //     .search {
    //         .el-input{
    //             // width:200px;
    //             width:344px;
    //         }
    //     }

    // }
</style>

