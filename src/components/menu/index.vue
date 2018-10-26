<template>
    <div class='menu-top'>
        <div class="top">
            <div class="crumb">
                <slot></slot>
            </div>
            <div class="search">
                <el-input placeholder="请输入区块高度/地址/块哈希/交易哈希" class="margin10" v-model.trim="searchKey"  @keyup.enter.native="searchFn"></el-input>
                <el-button type="primary" class="el-btn" @click="searchFn">查询</el-button>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
    import apiService from '@/services/API-services'
    export default {
        //组件名
        name: 'menu-top',
        //实例的数据对象
        data () {
            return {
                searchKey:'',
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: ['descriptionProp'],
        //计算
        computed: {

        },
        //方法
        methods: {
            //查询
            searchFn(){
                let param = {
                    cid:'',
                    parameter:this.searchKey,
                }
                apiService.search.query(param).then((res)=>{
                    let {errMsg,code,data}=res
                    if(code==0){
                        //根据type不同进入不同的详情页
                        this.switchFn(data.type,data.struct)
                    }
                }).catch((error)=>{
                    this.$message.error(error)
                })
            },
            switchFn(type,struct){
                switch (type){
                    //区块详情
                    case 'block':
                        return this.$router.push({
                            path:'/block-detail',
                            query:{
                                height:struct.height
                            }
                        })
                        break
                    //交易详情
                    case 'transaction':
                        let path = ''
                        struct.txReceiptStatus == -1 ? path='/trade-pending-detail' : path = '/trade-detail'
                        return this.$router.push({
                            path:path,
                            query:{
                                txHash:struct.txHash
                            }
                        })
                        break
                    //节点详情
                    case 'node':
                        return this.$router.push({
                            path:'',
                            query:{}
                        })
                        break
                    //合约详情
                    case 'contract':
                        return this.$router.push({
                            path:'/contract-detail',
                            query:{
                                address:this.searchKey,
                                description:this.descriptionProp
                            }
                        })
                        break
                    //地址详情
                    case 'account':
                        return this.$router.push({
                            path:'/address-detail',
                            query:{
                                address:this.searchKey,
                                description:this.descriptionProp
                            }
                        })
                        break
                }
            }
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
<style lang="less">
    .search{
        .el-input{
            width:300px;
        }

    }
</style>
<style lang="less" scoped>
    .top{
        height:50px;
        line-height:50px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        .search{
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            justify-content: flex-start;
            .el-btn{
                margin-top:4px;
            }
        }
    }
</style>