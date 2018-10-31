<template>
    <div class="wallet-wrap">
        <div class="content-area">
            <div class="top">
                <header class="time-and-number">
                    Wallet
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>钱包</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="bottom">
                <div class="authority-wallet">
                    <h1 class="title">官方钱包</h1>
                    <div class="introduce">
                        <div class="Edge1">
                            <img :src="imgSrc"/>
                            <div class="Edge1-introduce" v-if="walletList.length>0">
                                <h1>{{walletList[0].title}}</h1>
                                <p>{{walletList[0].summary}}</p>
                                <ul class="link">
                                    <li>
                                        <a href="https:www.baidu.com" target="_blank">{{walletList[0].dowonloadLink}}</a>
                                    </li>
                                    <li>
                                        <a href="https://t.me/PlatONHK">{{walletList[0].githubLink}}</a>
                                    </li>
                                    <li>
                                        <a href="https://t.me/PlatONHK" class="icon-link-3">{{walletList[0].developer}}</a>
                                    </li>
                                </ul>
                                <!-- <el-button>{{walletList[0].dowonloadLink}}</el-button>  使用ul列表代替el-button
                                <el-button>{{walletList[0].githubLink}}</el-button>
                                <el-button>{{walletList[0].developer}}</el-button> -->
                            </div>
                        </div>
                        <div class="Edge">
                            <img :src="imgSrc"/>
                            <div class="Edge-introduce"  v-if="walletList.length > 0">
                                <h1>{{walletList[1].title}}</h1>
                                <p>{{walletList[1].summary}}</p>
                                <ul class="link">
                                    <li>
                                        <a href="https:www.baidu.com" target="_blank">{{walletList[1].dowonloadLink}}</a>
                                    </li>
                                    <li>
                                        <a href="https://t.me/PlatONHK">{{walletList[1].githubLink}}</a>
                                    </li>
                                    <li>
                                        <a href="https://t.me/PlatONHK" class="icon-link-3">{{walletList[1].developer}}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 class="title">第三方钱包</h1>
                    <div>
                        暂无
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    //import  from ''
    import apiService from '@/services/API-services';
    import comHeader from '@/components/header/header.vue'
    import comFooter from '@/components/footer/footer.vue'
    export default {
        //组件名
        name: '',
        //实例的数据对象
        data () {
            return {
                imgSrc: '/static/images/demo.png',
                walletList: [],
                descriptionProp:'wallet'
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {
        },
        //计算
        computed: {

        },
        //方法
        methods: {

        },
        //生命周期函数
        created(){
            apiService.get("../../../static/json/walletConfig.json").then((data)=>{
                this.walletList = data;
        });
        },

        //监视
        watch: {

        },
        //组件
        components: {
            comHeader,
            comFooter
        }
    }
</script>

<style lang="less" scoped>
    .wallet-wrap{
        .bottom{
            padding: 26px 0 40px;
        }
        .authority-wallet{
            .introduce{
                display: flex;
                flex-direction: row;
                .link ul{
                        padding-top:6px;
	                    padding-bottom:6px;
                    }
                    .link li{
                        float: left;
                        margin-right: 10px;
                        width: 90px;
                        height: 30px;
                    }
                    .link a{
                        display: block;
                        text-align: center;
                        background-color: #fff;
                        border-style: solid;
                        line-height: 30px;   //设置行高，达到垂直居中
                    }
            }
            .Edge1{
                width: 50%;
                .Edge1-introduce{
                    // display: inline-block;
                    margin-left: 130px;

                }
            }
            .Edge{
                width: 50%;
            }
        }
        img{
            float: left;
        }
        h1.title{
            font-family: ArialMT;
            font-size: 12px;
            color: #D7DDE9;
            letter-spacing: 0;
            // border-bottom: 1px solid rgb(100, 107, 116);   原型有下划线，UI去掉
        }
        .third-party-wallet{
            width: 525px;
            height: 180px;
            background: url('./images/background-third-party.png') no-repeat;
            span{
                display: block;
                margin: auto;
                width: 50%;
                height: 18px;
                padding: 81px 0 0 0;
                //UI样式
                font-family: ArialMT;
                font-size: 16px;
                color: #D7DDE9;
                letter-spacing: 0;
            }
            button{
                width: 80px;
                height: 32px;
                margin-left: 200px;
                background: #252C57;
                border: 1px solid #333A60;
                //button中的字体样式
                font-family: ArialMT;
                font-size: 12px;
                color: #FFFF00;
                letter-spacing: 0;
                text-align: center;
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
</style>

