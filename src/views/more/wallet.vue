<template>
    <div class="wallet-wrap">
        <com-header :descriptionProp='descriptionProp'></com-header>
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
                <div class='bottom'>
                    <div class="authority-wallet">
                        <h1 class="title">官方钱包</h1>
                        <div class="introduce">
                            <div class="first-wallet">
                                <img src="./images/default-logo.png"/>
                                <div class="wallet-introduce" v-if="walletList.length>0">
                                    <h1>{{walletList[0].title}}</h1>
                                    <p>{{walletList[0].summary}}</p>
                                    <ul class="link clearfix">
                                        <li>
                                            <a :href="walletList[0].dowonloadLink" target="_blank">下载链接</a>
                                        </li>
                                        <li>
                                            <a :href="walletList[0].githubLink">github</a>
                                        </li>
                                        <li>
                                            <a :href="walletList[0].developer" class="icon-link-3">开发者网站</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="second-wallet">
                                <img src="./images/default-logo.png"/>
                                <div class="wallet-introduce"  v-if="walletList.length>0">
                                    <h1>{{walletList[1].title}}</h1>
                                    <p>{{walletList[1].summary}}</p>
                                    <ul class="link clearfix">
                                        <li>
                                            <a :href="walletList[1].dowonloadLink" target="_blank">下载链接</a>
                                        </li>
                                        <li>
                                            <a :href="walletList[1].githubLink">github</a>
                                        </li>
                                        <li>
                                            <a :href="walletList[1].developer" class="icon-link-3">开发者网站</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="third-wallet">
                                <img src="./images/default-logo.png"/>
                                <div class="wallet-introduce"  v-if="walletList.length>0">
                                    <h1>{{walletList[2].title}}</h1>
                                    <p>{{walletList[2].summary}}</p>
                                    <ul class="link clearfix">
                                        <li>
                                            <a :href="walletList[2].dowonloadLink" target="_blank">下载链接</a>
                                        </li>
                                        <li>
                                            <a :href="walletList[2].githubLink">github</a>
                                        </li>
                                        <li>
                                            <a :href="walletList[2].developer" class="icon-link-3">开发者网站</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 class="title">第三方钱包</h1>
                    <div class="third-party-wallet">
                        <div class="summary">
                            <span>没有第三方钱包，点击</span>
                            <button class="el-btn">Submit</button>
                        </div>
                    </div>
                </div>

            </div>
        <com-footer></com-footer>
    </div>
</template>

<script>
    //import  from ''
    import apiService from '@/services/API-services';
    import comHeader from '@/components/header/header.vue';
    import comFooter from '@/components/footer/footer.vue';
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
        }
        // padding:110px 100px 0 100px;
        .top{
            display: flex;
            justify-content: space-between;
        }
        .authority-wallet{
            .title{
            padding: 16px 0;
            }
            .introduce{
                display: flex;
                flex-direction: row;
                color: #D7DDE9;
                h1{
                    padding: 15px 0 6px 0;
                    // font-family: ArialMT;
                    font-size: 14px;
                    letter-spacing: 0;
                }
                p{
                    font-size: 12px;
                }
                .wallet-introduce{
                    height: 150px;
                    position: relative;
                }
                ul{
                    position:absolute;
                    bottom:25px;
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
                    line-height: 30px;   //设置行高，达到垂直居中
                    width: 80px;
                    height: 32px;
                    background: #252C57;
                    border: 1px solid #333A60;
                    //button中的字体样式
                    font-family: ArialMT;
                    font-size: 12px;
                    color: #FFFF00;
                    letter-spacing: 0;
                    text-align: center;
                }>div{
                    width: 460px;
                    height: 150px;
                    background-image: linear-gradient(-135deg, #272E50 0%, #0B1137 100%);
                    box-shadow: 0 2px 4px 0 rgba(9,18,47,0.50);
                }
            }
            .second-wallet{
                margin:0 60px 0 60px;
            }
            .wallet-introduce{
                // display: inline-block;
                margin-left: 130px;
            }
        }
        img{
            padding: 30px 0 0 33px;
            float: left;
        }
        h1.title{
            padding: 16px 0;
            font-family: ArialMT;
            font-size: 12px;
            color: #D7DDE9;
            letter-spacing: 0;
            // border-bottom: 1px solid rgb(100, 107, 116);   原型有下划线，UI去掉
        }
        .third-party-wallet{
            width: 460px;
            height: 150px;
            background: url('./images/background-third-party.png') no-repeat;
            .summary{
                margin: auto;
                // width: 50%;
                padding: 55px 0 0 70px;
            }
            span{
                // width: 300px;
                font-family: ArialMT;
                font-size: 16px;
                color: #D7DDE9;
                letter-spacing: 0;
            }
            button{
                border: 1px solid #333A60;
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

