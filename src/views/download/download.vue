<template>
    <div class="download-wrap">
        <div class="title">下载数据</div>
        <div class="bottom">
            <div class="address">地址#11111111111</div>
            <div class="des">下载当前地址的交易\出块记录，在下载之前，请验证您是否是机器人！</div>
            <div>i am not robot</div>
            <div class='datee'>
                <span>数据日期</span>
                <span>
                    <el-date-picker
                      v-model="value"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                </span>
                <span>下载</span>
            </div>
        </div>
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import menu from '@/components/menu/index.vue'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    export default {
        //组件名
        name: '',
        //实例的数据对象
        data () {
            return {
                value:'',
                pickerOptions:{
                    disabldDate:(time)=>{


                    }
                }
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
            console.log(new Date(new Date().getFullYear()+'01').Format('yyyy-mm-dd'))
        },
        //监视
        watch: {
        },
        //组件
        components: {
        }
    }
</script>
<style lang="less" scoped>
    .download-wrap{
        .bottom{
            padding:20px 0;
            .title{
                margin-bottom:20px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
            }
        }
    }
</style>

