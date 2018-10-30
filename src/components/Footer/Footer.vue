<template>
    <div class="footer-wrap">
        <div class="platon">
            <img class="footer-img" :src="iconSrc"/>
            <span>XXXX是PlatON区块链资源管理与分析平台</span>
            <span class="copyright">COPYRIGHT © 2018 PLATON INTERNATIONAL LIMITED ALL RIGHTS RESERVED.</span>
        </div>
        <div class="link">
            <p class="link-top">链接</p>
            <el-row>
                <span>
                    <a href="httt://www.baidu.com" target="_blank">开发帮助</a>
                </span>
                <template slot="title">链接</template>
            </el-row>
            <el-row>
                <span>
                    <a href="#" target="_blank">钱包</a>
                </span>
                <template slot="title">链接</template>
            </el-row>
            <el-row>
                <span>
                    <a href="#" target="_blank">PlatOn官网</a>
                </span>
                <template slot="title">链接</template>
            </el-row>
            <el-row>
                <span>
                    <a href="#" target="_blank">白皮书</a>
                </span>
                <template slot="title">链接</template>
            </el-row>
        </div>
        <div class="community">
            <p class="link-top">社区</p>
            <div>
                <ul>
                    <li>
                        <a href="http://www.baidu.com" class="icon-link-1" target="_blank">
                        <img :src="linkImg1"/>
                        </a>
                    </li>
                    <li>
                        <a href="http://www.baidu.com" class="icon-link-1" target="_blank">
                        <img :src="linkImg2"/>
                        </a>
                    </li>
                    <li>
                        <a href="http://www.baidu.com" class="icon-link-1" target="_blank">
                        <img :src="linkImg3"/>
                        </a>
                    </li>
                    <li>
                        <a href="http://www.baidu.com" class="icon-link-1" target="_blank">
                        <img :src="linkImg4"/>
                        </a>
                    </li>
                    <li>
                        <a href="http://www.baidu.com" class="icon-link-1" target="_blank">
                        <img :src="linkImg5"/>
                        </a>
                    </li>
                    <li>
                        <a href="http://www.baidu.com" class="icon-link-1" target="_blank">
                        <img :src="linkImg6"/>
                        </a>
                    </li>
                    <li>
                        <a href="http://www.baidu.com" class="icon-link-1" target="_blank">
                        <img :src="linkImg7"/>
                        </a>
                    </li>
                </ul>
            </div>
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
                iconSrc: '/static/images/footer-logo.png',
                linkImg1: '/static/images/icon-Telegram.png',
                linkImg2: '/static/images/icon-WeChat.png',
                linkImg3: '/static/images/icon-Twitter.png',
                linkImg4: '/static/images/icon-Rabbit.png',
                linkImg5: '/static/images/icon-Medium.png',
                linkImg6: '/static/images/icon-GitHub.png',
                linkImg7: '/static/images/icon-Facebook.png'
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
    .footer-wrap{
        bottom: 0;
        display: flex;
        justify-content: space-between;   //弹性布局，从上到下顺序排列子div
        height: 190px; // UI设计图 190px
        color: #FFF;
        background-color: #040B27;
        padding:0 100px;
        margin: 0 auto;
        >div{
            margin-top: 30px;
        }
        .platon{
            >span{
                font-family: ArialMT;
                font-size: 12px;
                color: #93A5C8;
                letter-spacing: 0;
                display: block;
                margin-top: 19px
            }
            .copyright{
                display: block;
                margin-top: 33px
            }
        }
        .link {
            width: auto;
            font-family: ArialMT;
            font-size: 13px;
            color: #D7DDE9;
            letter-spacing: 0;
            a{
                font-family: ArialMT;
                font-size: 13px;
                color: #FFFFFF;
                letter-spacing: 0;
            }
            .el-row{
                padding-bottom: 10px;
            }
        }
        
        .link-top{
            width: 200px;
            padding-bottom: 25px;
            // border-bottom: 1px dotted rgb(100, 107, 116);   原型有下划线，UI目前去掉
        }
        .community{
            ul{
                width: 400px;
            }
            li{
                display: inline;
                a{
                    display: inline-block;
                    width: 40px;
                    height: 40px;
            }
            }
        } 
    }
</style>

