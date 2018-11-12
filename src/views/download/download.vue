<template>
    <div class="download-wrap">
        <com-header :descriptionProp='descriptionProp'></com-header>
        <div class="content-area">
            <div class='top'>
                <header class="time-and-number">
                    Download Data
                </header>
                <div class="crumb second-floor-text">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>{{$t('download.info')}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class='bottom'>
                <div class="title">
                    <div class="record">
                        <span>Address-# {{address}}</span>
                        <br/>
                        <span>{{$t('download.title')}}</span>
                    </div>
                </div>
                <div class='download'>
                    <el-form  :inline="true" ref="form" :model="form" label-width="100px" :rules='rules'>
                        <!-- 谷歌机器人验证地方 -->
                        <!-- <div class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"  data-callback="robotVerified"></div> -->
                        <com-recaptcha ref='recaptcha' @verify='verify'
                        ></com-recaptcha>
                        <br/>
                        <br/>
                        <el-form-item :label='$t("download.date")' class='margin20' prop='value'>
                            <el-date-picker
                                v-model="form.value"
                                type="date"
                                :placeholder="$t('download.placeholder')"
                                :picker-options="pickerOptions"
                                style='width:150px;'
                                value-format='yyyy-MM-dd'
                                >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="el-btn el-download" @click='downloadFn' :disabled='disabledBtn'>{{$t('download.download')}}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
       <com-footer></com-footer>
       <iframe id="ifile" style="display:none" :src="src"></iframe>
    </div>
</template>
<script lang="ts">
    import Component from 'vue-class-component'
    import comRecaptcha from '@/components/recaptcha/recaptcha'
    import comHeader from '@/components/header/header.vue'
    import comFooter from '@/components/footer/footer.vue'
    import apiService from '@/services/API-services'
    import apiConfig from '@/config/API-config'
    import menu from '@/components/menu/index.vue'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    export default {
        //组件名
        name: '',
        //实例的数据对象
        data () {
            return {
                src:'',
                disabledBtn:false,
                address:'',
                form:{
                    value:'',
                },
                pickerOptions:{
                    disabledDate(time){
                        let myDate = new Date()
                        let val = myDate.setFullYear(myDate.getFullYear(),0,1)
                        return time.getTime() < new Date(val).getTime() || time.getTime() > Date.now()
                    }
                },
                description:'',
                descriptionProp:'',
                rules:{
                    value:[
                        { required: true, message: this.$t('download.placeholder1'), trigger: 'change'}
                    ]
                },
                response:'',
                exportname:''
            }
        },
        //数组或对象，用于接收来自父组件的数据
        props: {},
        //计算
        computed: {
            ...mapGetters(['chainId']),
        },
        //方法
        methods: {
            verify(data){
                console.warn('传给父组件的token',data)
                this.response = data
                this.response ? this.sameFn() : this.$message.error(this.$t('download.robot'))
            },
            downloadFn(){
                //父组件调用子组件方法
                this.$refs.recaptcha.getResponse()
            },
            sameFn(){
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        let param = {
                            cid:this.chainId,
                            address:this.address,
                            date:this.form.value
                        }
                        if(this.exportname=='account'){
                            //导出地址详情
                            // let iframe =document.getElementById('ifile')
                            // console.log(iframe.src)
                            // document.getElementById("ifile").src=apiService.encodeParams(apiConfig.TRADE.addressDownload,param)
                            this.src=apiService.encodeParams(apiConfig.TRADE.addressDownload,param)
                        }else if(this.exportname=='contract'){
                            this.src=apiService.encodeParams(apiConfig.TRADE.contractDownload,param)
                        }
                    }
                })
            }
        },
        //生命周期函数
        created(){
            this.address = this.$route.query.address
            this.description = this.$route.query.description
            this.descriptionProp = this.$route.query.description
            this.exportname = this.$route.query.exportname
        },
        mounted(){
        },
        //组件
        components: {
            comHeader,
            comFooter,
            comRecaptcha
        }
    }
</script>
<style lang="less" scoped>
    .download-wrap{
        .bottom{
            padding: 26px 0 40px;
            .title{
                margin-bottom:20px;
                .record{
                    font-size:12px;
                    // line-height:30px;
                    span{
                        display:inline-block;
                        &:first-child{
                            color: #D7DDE9;
                            margin-bottom:14px;
                        }
                        &:last-child{
                            color: #94A3C2;
                        }
                    }
                }
            }
            .download{
                .el-download{
                    height:34px;
                    // line-height:34px;
                    padding:0 10px;
                    border:none;
                }
            }
        }
    }
    .time-and-number{
        position:relative;
        width:592px;
        height:48px;
        font-size:64px;
        line-height:30px;
        letter-spacing: 3.8px;
        color: #3c425d;
        opacity: 0.2;
    }
    .second-floor-text{
        position: absolute;
        top:125px;
        font-size:16px;
        line-height: 16px;
        color: #ffffff;
        opacity: 1;
        letter-spacing: 1px;
    }
    .margin20{
        margin-right:20px;
    }
</style>
<style lang='less'>
    .download{
        .el-form--inline .el-form-item__label{
            font-size:14px;
            color:#fff;
            text-align:left;
        }
        .el-input--prefix .el-input__inner{
            height:34px;
            border: 1px solid #12183D;
            color: #7988AB;
            font-size:12px;
        }
    }
</style>


