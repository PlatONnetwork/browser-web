<template>
    <div class="footer-wrap">
        <div class="platon">
            <p class="footer-intro">{{ $t("footer.desc") }}</p>
            <p class="copyright">COPYRIGHT © 2018 PLATSCAN INTERNATIONAL LIMITED ALL RIGHTS RESERVED.</p>
        </div>
        <div class="link">
            <p class="link-top">{{ $t("footer.links") }}</p>
            <ul>
                <li>
                    <a :href='$i18n.locale=="zh-cn"
                    ? "https://developer.platon.network/#/?lang=zh" 
                    : "https://developer.platon.network/#/?lang=en"' 
                    target="_blank">{{ $t("footer.help") }}</a>
                </li>
                <!-- <li>
                    <a href="/wallet">{{ $t("footer.wallet") }}</a>
                </li> -->
                <li>
                    <a href="https://www.platon.network/" target="_blank">{{ $t("footer.officialWebsite") }}</a>
                </li>
                <li>
                    <!-- <a href="" target="_blank">{{ $t("footer.whitePaper") }}</a> -->
                    <a :href='$i18n.locale=="zh-cn"
                    ? "https://www.platon.network/static/pdf/zh/PlatON_A%20High-Efficiency%20Trustless%20Computing%20Network_Whitepaper_ZH.pdf" 
                    : "https://www.platon.network/static/pdf/en/PlatON_A%20High-Efficiency%20Trustless%20Computing%20Network_Whitepaper_EN.pdf"' 
                    target="_blank">{{ $t("footer.whitePaper") }}</a>
                </li>
            </ul>
        </div>
        <div class="community">
            <p class="link-top">{{ $t("footer.community") }}</p>
            <ul class="clearfix">
                <li>
                    <a href="https://t.me/PlatONHK" class="icon-link-1" target="_blank"></a>
                </li>
                <li class="wxImg">
                    <el-tooltip class="item" effect="dark" placement="top">
                        <div slot="content">
                            <img src="./images/weixin.jpg" alt="" class="wx-img">
                        </div>
                        <a href="javascript:volid(0);" class="icon-link-2" >
                            <img src="./images/weixin.jpg" alt="" class="wx-img">
                        </a>
                    </el-tooltip>
                    
                </li>
                <li>
                    <a href="https://github.com/PlatONnetwork" class="icon-link-6" target="_blank"></a>
                </li>
                
                <li>
                    <a href="https://twitter.com/PlatON_Network" class="icon-link-3" target="_blank"></a>
                </li>
                <li>
                    <a href="https://www.facebook.com/PlatONNetwork/" class="icon-link-7" target="_blank"></a>
                </li>
                <li>
                    <a href="https://www.reddit.com/user/PlatON_Network" class="icon-link-4" target="_blank"></a>
                </li>
                <li>
                    <a href="https://medium.com/@PlatON_Network" class="icon-link-5" target="_blank"></a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/company/platonnetwork/" class="icon-link-8" target="_blank"></a>
                </li>
            </ul>

        </div>
        <!-- <div class="footer-bottom">   原型为最底部，UI的位置在左边
            <span class="text-left">COPYRIGHT © 2018 PLATON INTERNATIONAL LIMITED ALL RIGHTS RESERVED.</span>
        </div> -->
    </div>
</template>

<script lang="ts">
    //import  from ''
    export default {
        //组件名
        name: '',
        //实例的数据对象
        data () {
            return {
                href:'',
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
            console.warn('1111',this.$i18n.locale)
            // if(localStorage.getItem('i18nLocale')){
            //     if(localStorage.getItem('i18nLocale')=='zh-cn'){
            //         this.href='https://www.platon.network/static/pdf/zh/PlatON_A%20High-Efficiency%20Trustless%20Computing%20Network_Whitepaper_ZH.pdf'
            //     }else{
            //         this.href='https://www.platon.network/static/pdf/en/PlatON_A%20High-Efficiency%20Trustless%20Computing%20Network_Whitepaper_EN.pdf'
            //     }
            // }else{
            //     if(navigator.language.toLowerCase()=='zh-cn'){
            //         this.href='https://www.platon.network/static/pdf/zh/PlatON_A%20High-Efficiency%20Trustless%20Computing%20Network_Whitepaper_ZH.pdf'
            //     }else{
            //         this.href='https://www.platon.network/static/pdf/en/PlatON_A%20High-Efficiency%20Trustless%20Computing%20Network_Whitepaper_EN.pdf'
            //     }
            // }
        },
        //监视
        watch: {

        },
        //组件
        components: {}
    }
</script>

<style lang="less" scoped>
    .footer-wrap{
        bottom: 0;
        display: flex;
        justify-content: space-between;   //弹性布局，从上到下顺序排列子div
        height: 190px; // UI设计图 190px改为170px 2018-11-2  修改为190 2019年1月16日
        color: #FFF;
        background-color: #0D1333;
        padding: 40px 5.2% 0 5.2%;
    }
    .platon{
        background: url('./images/logo-footer.png') no-repeat;
        // background-size: 155px 54px;
        >p{
            // font-family: ArialMT;
            font-size: 12px;
            color: #93A5C8;
            letter-spacing: 0;
        }
        .footer-intro{
            padding-top: 63px;
        }
        .copyright{
            font-size: 11px;
            margin: 10px 0 0 0;
        }
    }
    .link {
        width: auto;
        font-size: 13px;
        color: #D7DDE9;
        // font-family: ArialMT;
        a{
            color: #FFFFFF;
        }
        a:hover{
            color: #2faaf8;
        }
        ul li{
            padding-bottom: 8px;
        }
    }
    .link-top{
        color: #94a3c2;
        width: 200px;
        padding-bottom: 25px;
    }
    .community{
        // font-family: ArialMT;
        font-size: 13px;
        color: #D7DDE9;
        letter-spacing: 0;
        ul{
            padding-top: 2px;
            width: 455px;
        }
        li{
            float: left;
            padding-right: 16px;
            a{
                display: block;
                width: 40px;
                height: 40px;
                background: url('./images/Sprite-figure.png')
            }
            .icon-link-1{
                background-position: 0 0;
            }
            .icon-link-1:hover{
                background: url('./images/icon-Telegram-h.png') no-repeat;
            }
            .icon-link-2{
                background-position: -56px 0;
            }
            .icon-link-2:hover{
                background: url('./images/icon-WeChat-h.png') no-repeat;
            }
            .icon-link-3{
                background-position: -112px 0;
            }
            .icon-link-3:hover{
                background: url('./images/icon-Twitter-h.png') no-repeat;
            }
            .icon-link-4{
                background-position: -168px 0;
            }
            .icon-link-4:hover{
                background: url('./images/icon-Reddit-h.png') no-repeat;
            }
            .icon-link-5{
                background-position: -224px 0;
            }
            .icon-link-5:hover{
                background: url('./images/icon-Medium-h.png') no-repeat;
            }
            .icon-link-6{
                background-position: -280px 0;
            }
            .icon-link-6:hover{
                background: url('./images/icon-GitHub-h.png') no-repeat;
            }
            .icon-link-7{
                background-position: -336px 0;
            }
            .icon-link-7:hover{
                background: url('./images/icon-Facebook-h.png') no-repeat;
            }
            .icon-link-8{
                background: url('./images/icon-in-n.png') no-repeat;
            }
            .icon-link-8:hover{
                background: url('./images/icon-in-h.png') no-repeat;
            }
        }
    }
    .wxImg{
        position: relative;
    }
    .wx-img{
        position:absolute;
        display:none; 
        width:100px;
        height:100px;
        bottom: 55px;
        left: -31px;
    }
    .wxImg:hover .wx-img{ 
        display:inline-block; 
    } 
    @media screen and (max-width: 1368px) {
        .link-top{
            padding-top:10px;
            padding-bottom:12px;
        }
        .platon .footer-intro{
            padding-top:66px;
        }
    }
</style>

