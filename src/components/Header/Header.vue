<template>
    <div class="header-wrap">
        <div class="header-content">
            <div class="leftdiv">
                <a class="logo"><img class="icon" :src='iconSrc'/></a>
                <el-menu :default-active="$route.path" :router="true" class="el-menu-demo" mode="horizontal" background-color="#242c39" text-color ="#FFF" active-text-color="#FFE32C">
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
                <div>
                    <el-dropdown class="dropdown1">
                        <span class="el-dropdown-link">
                            {{net}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="changeNet('MainNet(主网络)')">MainNet(主网络)</el-dropdown-item>
                            <el-dropdown-item @click.native="changeNet('TestNet(测试网络)')">TestNet(测试网络)</el-dropdown-item>
                            <el-dropdown-item v-for="(item,index) in options" :key="index" @click.native="changeLanguage(item)">{{item.name}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown class="dropdown2">
                        <span class="el-dropdown-link">
                            {{language}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="changeLanguage('zh-cn')">简体中文</el-dropdown-item>
                            <el-dropdown-item @click.native="changeLanguage('en')">English</el-dropdown-item>
                            
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
        </div>
    </div>
</template>
<script lang="ts">
  //import  from ''
    export default {
        //组件名
        name: 'header-wrap',
        //实例的数据对象
        data () {
            return {
                iconSrc: '/static/images/platon.png',
                net: 'MainNet',
                language: '简体中文',
                options:[{
                    value: 'CN',
                    label: '中文简体',
                    cid:`1`,
                    name:'jjjjj',
                },
                {
                    value: 'EN',
                    label: 'English',
                    cid:`2`,
                    name:'22222',
                    
                }],
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {
           
        },
        //方法
        methods: {
            changeNet(item){  // 修改网络
                this.net = item.name
                //todo 把当前的CID name 放到vuex中

                
            },
            changeLanguage(lang){  // 修改语言
                this.language = lang
                let locale = this.$i18n.locale
                locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
                console.log('i18n'+this.$i18n.locale)
                console.log('local'+locale)
                
            },
            // changeLanguage(value){  //修改语言
			// 	let locale = this.$i18n.locale
			// 	locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
            // },
        },
        //生命周期函数
        created(){},
        //监视
        watch: {},
        //组件
        components: {}
    }
</script>
<style lang="less" scoped>
.header-wrap{
    background-color: #242c39;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    .header-content{
        top: 8%;
        left: 50%;
        width: 1400px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo{
            display: inline-block;
            height: 100%;
        }
        .leftdiv{
            height: 100%;
        }
    }
    .leftimg{
        position: absolute;
        top: 0;
        left: 30%;
        margin: 0 0 0 -450px
    }
    .el-menu-demo{
        display: inline-block;
    }
    .header-content el-menu-demo{
            height: 70px;
    }
    .dropdown1{
        color: #fff;
    }
    .dropdown2{
        width: 80px;
        color: #fff;
    }
    

}
</style>

