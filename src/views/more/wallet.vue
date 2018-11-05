<template>
    <div class="wallet-wrap">
        <com-header :descriptionProp='descriptionProp'></com-header>
            <div class="content-area">
                <header class="time-and-number">
                    {{ $t("breadcrumb.walletWatermark") }}
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{ $t("breadcrumb.home") }}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ $t("breadcrumb.wallet") }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class='bottom'>
                    <div class="authority-wallet">
                        <h1 class="title">{{ $t("wallet.officeWallet") }}</h1>
                        <div class="introduce">
                            <div class="first-wallet">
                                <img src="./images/default-logo.png"/>
                                <div class="wallet-introduce" v-if="walletList.length>0">
                                    <h1>{{ $t("wallet.firstWallet.title") }}</h1>
                                    <p>{{ $t("wallet.firstWallet.summary") }}</p>
                                    <ul class="link clearfix">
                                        <li>
                                            <a :href="walletList[0].dowonloadLink" target="_blank">{{ $t("wallet.download") }}</a>
                                        </li>
                                        <li>
                                            <a :href="walletList[0].githubLink">github</a>
                                        </li>
                                        <li>
                                            <a :href="walletList[0].developer" class="icon-link-3">{{ $t("wallet.developer") }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="second-wallet">
                                <img src="./images/default-logo.png"/>
                                <div class="wallet-introduce"  v-if="walletList.length>0">
                                    <h1>{{ $t("wallet.secondWallet.title") }}</h1>
                                    <p>{{ $t("wallet.secondWallet.summary") }}</p>
                                    <ul class="link clearfix">
                                        <li>
                                            <a :href="walletList[1].dowonloadLink" target="_blank">{{ $t("wallet.download") }}</a>
                                        </li>
                                        <li>
                                            <a :href="walletList[1].githubLink">github</a>
                                        </li>
                                        <li>
                                            <a :href="walletList[1].developer" class="icon-link-3">{{ $t("wallet.developer") }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="third-wallet">
                                <img src="./images/default-logo.png"/>
                                <div class="wallet-introduce"  v-if="walletList.length>0">
                                    <h1>{{ $t("wallet.thirdWallet.title") }}</h1>
                                    <p>{{ $t("wallet.thirdWallet.summary") }}</p>
                                    <ul class="link clearfix">
                                        <li>
                                            <a :href="walletList[2].dowonloadLink" target="_blank">{{ $t("wallet.download") }}</a>
                                        </li>
                                        <li>
                                            <a :href="walletList[2].githubLink">github</a>
                                        </li>
                                        <li>
                                            <a :href="walletList[2].developer" class="icon-link-3">{{ $t("wallet.developer") }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 class="title">{{ $t("wallet.thirdPartyWallet") }}</h1>
                    <div class="third-party-wallet">
                        <div class="summary">
                            <span>{{ $t("wallet.nothirdPartyWallet") }}</span>
                            <!-- <button class="el-btn">Submit</button>   使用表单替换button，跳转到邮箱 -->
                            <form target="_blank">
                            <input class="el-btn" :formaction='formLink' type="submit" :value=" $t('wallet.submitBtn') ">
                            </form>
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
                // imgSrc: '/static/images/demo.png',
                formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdNoozqk-McqJtvTs9HMk8TJlDR7rQy7KLbQuUKlaSZacyxrA/viewform?usp=sf_link',
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
                // console.log(walletList[0].icon);
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
    .bottom{
        padding: 26px 0 40px;
    }
    .introduce{
        display: flex;
        justify-content: space-between;   //弹性布局，两端对齐
        flex-wrap :wrap;   //当屏幕宽度变小，一行放不下，就换行
        color: #D7DDE9;
        h1{
            padding: 15px 0 6px 0;
            // font-family: ArialMT;
            font-size: 14px;
            letter-spacing: 0;
        }
        p{
            font-size: 12px;
            padding-right: 20px;
        }
        .wallet-introduce{
            position: relative;
            height: 150px;
            margin: 0 0 0 130px;
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
            line-height: 30px;   // 设置行高，达到垂直居中
            width: 80px;
            height: 32px;
            background: #252C57;
            border: 1px solid #333A60;
            // button中的字体样式
            // font-family: ArialMT;
            font-size: 12px;
            color: #FFFF00;
            letter-spacing: 0;
            text-align: center;
            border-radius: 4px;
        }>div{
            width: 460px;
            // width: auto;
            height: 150px;
            background: url('./images/background-third-party.png') no-repeat;
            background-size: 460px 150px;
        }
    }
    form{
        display: inline;
        input{
            width: 80px;
            height: 32px;
            border: 1px solid #333A60;
        }
    }
    img{
        padding: 30px 0 0 33px;
        float: left;
    }
    h1.title{
        padding: 16px 0 16px 7px;
        font-family: ArialMT;
        font-size: 12px;
        color: #D7DDE9;
        letter-spacing: 0;
    }
    .third-party-wallet{
        width: 460px;
        height: 150px;
        background: url('./images/background-third-party.png') no-repeat;
        background-size: 460px 150px;
        .summary{
            margin: auto;
            padding: 60px 0 0 70px;
        }
        span{
            font-family: ArialMT;
            font-size: 16px;
            color: #D7DDE9;
            letter-spacing: 0;
        }
    }
    .time-and-number {
        position: relative;
        width: 592px;
        height: 48px;
        font-size: 64px;
        font-weight: 600;
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

