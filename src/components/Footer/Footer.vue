<template>
    <div class="footer-wrap">
        <div class="platon">
            <p class="footer-img">XXXX是PlatON区块链资源管理与分析平台</p>
            <p class="copyright">COPYRIGHT © 2018 PLATON INTERNATIONAL LIMITED ALL RIGHTS RESERVED.</p>
        </div>
        <div class="link">
            <p class="link-top">链接</p>
            <ul>
                <li>
                    <a href="http://www.baidu.com" target="_blank">开发帮助</a>
                </li>
                <li>
                    <a href="#" target="_blank">钱包</a>
                </li>
                <li>
                    <a href="#" target="_blank">PlatOn官网</a>
                </li>
                <li>
                    <a href="#" target="_blank">白皮书</a>
                </li>
            </ul>    
        </div>
        <div class="community">
            <p class="link-top">社区</p>
            <ul class="clearfix">
                <li>
                    <a href="http://www.baidu.com" class="icon-link-1" target="_blank"></a>
                </li>
                <li>
                    <a href="http://www.baidu.com" class="icon-link-2" target="_blank"></a>
                </li>
                <li>
                    <a href="http://www.baidu.com" class="icon-link-3" target="_blank"></a>
                </li>
                <li>
                    <a href="http://www.baidu.com" class="icon-link-4" target="_blank"></a>
                </li>
                <li>
                    <a href="http://www.baidu.com" class="icon-link-5" target="_blank"></a>
                </li>
                <li>
                    <a href="http://www.baidu.com" class="icon-link-6" target="_blank"></a>
                </li>
                <li>
                    <a href="http://www.baidu.com" class="icon-link-7" target="_blank"></a>
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
        height: 160px; // UI设计图 190px
        color: #FFF;
        background-color: #0D1333;
        padding: 30px 100px 0 100px;
        // margin: 30px auto 0;
    }
    .platon{
        background: url('./images/footer-logo.png');
        background-repeat: no-repeat;
        >p{
            font-family: ArialMT;
            font-size: 12px;
            color: #93A5C8;
            letter-spacing: 0;
            display: block;
        }
        .footer-img{
            padding-top: 88px;
        }
        .copyright{
            display: block;
            margin-top: 33px;
        }
    }
    .link {
        width: auto;
        font-size: 13px;
        color: #D7DDE9;
        font-family: ArialMT;
        a{
            color: #FFFFFF;
        }
        ul li{
            padding-bottom: 8px;
        }
    }
    .link-top{
        width: 200px;
        padding-bottom: 25px;
        // border-bottom: 1px dotted rgb(100, 107, 116);   原型有下划线，UI目前去掉
    }
    .community{
        font-family: ArialMT;
        font-size: 13px;
        color: #D7DDE9;
        letter-spacing: 0;
        ul{
            padding-top: 2px;
            width: 400px;
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
            .icon-link-2{
                    background-position: -56px 0;
            }
            .icon-link-3{
                    background-position: -112px 0;
            }
            .icon-link-4{
                    background-position: -168px 0;
            }
            .icon-link-5{
                    background-position: -224px 0;
            }
            .icon-link-6{
                    background-position: -280px 0;
            }
            .icon-link-7{
                    background-position: -336px 0;
            }
        }
    }
</style>

