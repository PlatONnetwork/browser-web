<template>
    <div class="node-wrap">
        <div>
            <div class="top">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>钱包</el-breadcrumb-item>
                </el-breadcrumb>
                <div>
                    <el-button type="primary">+提交</el-button>
                </div>
            </div>
            <div class="authority-wallet">
                <p class="title">官方钱包</p>
                <div class="introduce">
                    <div class="Edge1">
                        <img :src="imgSrc"/>
                        <div class="Edge1-introduce">
                            <h1>XXXX</h1>
                            <p>XXXX 是一个完全去中心化的轻节点移动钱包客户端，通过XXX可以创建PlatON区块链地址，并安全管理和存储PlatON区块链的数字资产。</p>
                            <el-button>下载链接</el-button>
                            <el-button>github</el-button>
                            <el-button>开发者网站</el-button>
                        </div>
                    </div>
                    <div class="Edge">
                        <img :src="imgSrc"/>
                        <div class="Edge-introduce">
                            <h1>Edge</h1>
                            <p>Edge是一个完全去中心化的全节点桌面客户端，除支持基本的钱包创建与管理之外，同时提供节点服务及管理、投票等功能。</p>
                            <el-button>下载链接</el-button>
                            <el-button>github</el-button>
                            <el-button>开发者网站</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p class="title">第三方钱包</p>
                <div>
                    暂无
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import  from ''
    import module from "vuex";
    export default {
        //组件名
        name: '',
        //实例的数据对象
        data () {
            return {
                imgSrc: '/static/images/demo.png',
                walletList: []
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
    .top{
        display: flex;
        justify-content: space-between;
    }
    .authority-wallet{
        .introduce{
            display: flex;
        }
        .Edge1{
            width: 50%;
        }
            .Edge1-introduce
            {
                display: inline;
            }
        .Edge{
            display: inline;
        }
    }
        
    img{
        float: left;
    }
    p.title{
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: rgb(100, 107, 116);
    }
</style>

