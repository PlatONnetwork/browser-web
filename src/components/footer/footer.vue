<template>
    <div class="footer-wrap">
        <div class="sub-foot" v-if="path=='/'">
            <h3>{{$t('indexInfo.resource')}}</h3>
            <div class="tabs">
                <el-button size="medium">
                    <a :href="'https://www.platon.network/#/?lang='+ lang" target="_blank">{{$t('indexInfo.aboutPlatON')}}</a>
                </el-button>
                <el-button size="medium">
                    <a :href="'https://www.platon.network/static/pdf/'+lang+'/PlatON_A_High-Efficiency_Trustless_Computing_Network_Whitepaper_'+lang.toUpperCase()+'.pdf'" target="_blank">{{$t('indexInfo.platONWhitePaper')}}</a>
                </el-button>
                <el-button size="medium">
                    <a :href="'https://developer.platon.network/#/?lang='+lang" target="_blank">{{$t('indexInfo.atonDownload')}}</a>
                </el-button>
                <el-button size="medium" style="margin-right:0;">
                    <a :href="'https://platonnetwork.github.io/Docs/#/'+ (lang=='zh'?'zh-cn':'en-us')+'/'" target="_blank">{{$t('indexInfo.developer')}}</a>
                </el-button>
            </div>
        </div>
        <div class="foot-index" v-if="path=='/'">
            <img class="foot-logo" src="../../assets/images/logo-PlatON.png" alt="">
            <p>{{$t('indexInfo.platScan')}}</p>
            <p>{{$t('indexInfo.international')}}</p>
            <div class="link-wrap">
                <a href="https://t.me/PlatONHK" target="_blank" class="link-1"></a>
                <a href="javascript:volid(0);" target="_blank" class="link-2">
                    <img src="../../assets/images/weixin.jpg" alt="" class="wx-img">
                </a>
                <a href="https://twitter.com/PlatON_Network" target="_blank" class="link-3"></a>
                <a href="https://www.reddit.com/user/PlatON_Network" target="_blank" class="link-4"></a>
                <a href="https://medium.com/@PlatON_Network" target="_blank" class="link-5"></a>
                <a href="https://github.com/PlatONnetwork" target="_blank" class="link-6"></a>
                <a href="https://www.linkedin.com/company/platonnetwork/" target="_blank" class="link-7"></a>
                <a href="https://www.facebook.com/PlatONNetwork/" target="_blank" class="link-8"></a>
                <a href="https://bihu.com/people/1215832888" target="_blank" class="link-9"></a>
                <a href="https://www.chainnode.com/forum/267" target="_blank" class="link-10"></a>
            </div>
        </div>
        <div class="foot-no-index foot-index" v-if="path!='/'">
            <div class="foot-left">
                <img class="foot-logo" src="../../assets/images/logo-PlatON.png" alt="">
                <p>{{$t('indexInfo.platScan')}}</p>
            </div>
            <div class="foot-right">
                <div class="link-wrap">
                    <a href="https://t.me/PlatONHK" target="_blank" class="link-1"></a>
                    <a href="javascript:volid(0);" target="_blank" class="link-2">
                        <img src="../../assets/images/weixin.jpg" alt="" class="wx-img">
                    </a>
                    <a href="https://twitter.com/PlatON_Network" target="_blank" class="link-3"></a>
                    <a href="https://www.reddit.com/user/PlatON_Network" target="_blank" class="link-4"></a>
                    <a href="https://medium.com/@PlatON_Network" target="_blank" class="link-5"></a>
                    <a href="https://github.com/PlatONnetwork" target="_blank" class="link-6"></a>
                    <a href="https://www.linkedin.com/company/platonnetwork/" target="_blank" class="link-7"></a>
                    <a href="https://www.facebook.com/PlatONNetwork/" target="_blank" class="link-8"></a>
                    <a href="https://bihu.com/people/1215832888" target="_blank" class="link-9"></a>
                    <a href="https://www.chainnode.com/forum/267" target="_blank" class="link-10"></a>
                </div>
                <p>{{$t('indexInfo.international')}}</p>
            </div>           
        </div>
    </div>
</template>
<script lang="ts">
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    export default {
        name: '',
        data() {
            return {
                path:'/',
            }
        },
        props: {

        },
        computed: {
           lang() {
                return this.$i18n.locale.indexOf('zh') !== -1 ? 'zh' : 'en'
            },
        },
		watch: {
            '$route.path'(newVal,oldVal){
                this.path = newVal;
            }
		
		},
        components: {

        },
        methods: {

        },
        //生命周期函数
        created() {
            this.path = this.$route.path;
        },
        mounted() {

        }    
    }
</script>
<style lang="less" scoped>
.footer-wrap{
    background: #000;
}
 .sub-foot{      
        text-align: center;  
        padding-bottom: 83px;
        padding-top: 120px;
        border-bottom: 1px dashed #929292;
        h3{           
            margin: 0px 0 78px;
            font-size: 40px;
            color: #FFFFFF;
            font-weight: 100;
            line-height: 47px;
            text-align: center;
        }
    }
    .foot-index{
        text-align: center;
        padding: 40px 0 31px;
        .foot-logo{
            margin: 0 auto;
        }
        p:nth-of-type(1){
            font-size: 14px;
            color: #999999;
            margin: 20px 0;
        }
        p:nth-of-type(2){
            font-size: 12px;
            color: #777777;
            margin-bottom: 25px;
        }
        .link-wrap{
            display: flex;
            justify-content: center;
            width: 50%;
            margin: 0 auto;
            padding-top: 20px;
            border-top: 1px dashed #929292;
            a{
                margin-right: 20px;
                width: 30px;
                height: 30px;
                background: url(../../assets/images/footer-link-init.png);
                background-position-y: -10px;
                &.link-1{
                    background-position-x: -10px;
                }
                &.link-2{
                    position: relative;                
                    background-position-x: -60px;
                    &:hover .wx-img{
                        display: block;
                    }
                    .wx-img{
                        position: absolute;
                        width: 100px;
                        height: 100px;
                        bottom: 40px;
                        left: -31px;
                        display: none;                        
                    }
                }
                &.link-3{
                    background-position-x: -110px;
                }
                &.link-4{
                    background-position-x: -160px;
                }
                &.link-5{
                    background-position-x: -210px;
                }
                &.link-6{
                    background-position-x: -260px;
                }
                &.link-7{
                    background-position-x: -310px;
                }
                &.link-8{
                    background-position-x: -360px;
                }
                &.link-9{
                    background-position-x: -410px;
                }
                &.link-10{
                    background-position-x: -459px;
                }
                &:hover{
                    background-image: url(../../assets/images/footer-link-active.png);
                }
            }
        }
        &.foot-no-index{
            display: flex;
            justify-content: space-between;
            padding: 27px 5.2% 11px;
            @media screen and (max-width: 1280px) {
                &{
                    padding: 27px 0 11px;
                }
            }
            a.link-10{
                margin-right: 0;
            }
            .foot-left{
                width: 40%;     
                text-align: left;  
                .foot-logo{
                    margin-left: 0;
                }    
            }
            .foot-right{
                width: 40%;
                p{
                    font-size: 12px;
                    text-align: right; 
                }
            }
            .link-wrap{
                width: 100%;
                padding-top: 0;
                border: none;
                justify-content: flex-end;
            }
            p{
                margin-top: 14px;                
            }
        }
    }
</style>
<style lang="less">  
    .sub-foot .tabs .el-button{
        background: #000;
        margin-right: 8%;
        &:hover{
            background: #fff;
            a{
                color: #000;
            }
        }
        a{
            // font-size: 20px;
            color: #fff;
        }
    }
</style>

