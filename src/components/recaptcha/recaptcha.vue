<template>
    <div>
        <!-- <div id='g-recaptcha' class="g-recaptcha" :data-sitekey="sitekey"></div> -->
        <div id='g-recaptcha' class="g-recaptcha" data-sitekey="6LevyYQUAAAAAAhDCvW6ZwxNQ64Zox_XEGuSNJyE"  data-callback="flushStatus" ></div>
        <div id='message'></div>
        <remote-js1></remote-js1>
        <remote-js src="https://www.google.com/recaptcha/api.js" ></remote-js>
    </div>
</template>
<script lang='ts'>
    import {mapGetters, mapActions} from 'vuex';
    import Http from 'axios'
    export default{
        data(){
            return {
                grecaptcha:null,
                // sitekey:'6LevyYQUAAAAAAhDCvW6ZwxNQ64Zox_XEGuSNJyE',
                sitekey:'6LcHGHoUAAAAADDcn7bejGjLAhAuNG6Y7TnuMBYM',
                is_timeout:false,
            }
        },
        computed:{
            ...mapGetters(['googleApi']),
        },
        methods:{
            ...mapActions(['updateApiStatus']),
            getResponse(){
                this.$nextTick(()=>{
                    console.warn("document.getElementById('message').innerText",document.getElementById('message').innerText)
                    let response = document.getElementById('message').innerText
                    this.$emit('verify',response)
                })
            },
            flushStatus(data){
                console.warn('data>>>>>',data)

                this.$nextTick(()=>{
                    document.getElementById('message').innerText=data
                })
            },
            getref() {

                return Http.get('https://www.google.com/recaptcha/api.js?timeStrp='+new Date().getTime()).then((res)=>{
                    console.warn('res>>>>>',res)
                    setTimeout (function () {
                        this.is_timeout = true;
                    },10000)
                    if(res){
                        this.updateApiStatus(true)
                        // this.forIframe = true;
                    }else if(this.is_timeout){
                        // this.$message.error(this.$t('menu.goole'))
                        this.updateApiStatus(false)
                    }
                    this.is_timeout = false;
                }).catch(error=>{
                    this.$message.error(this.$t('menu.goole'))
                    console.warn('error>>>>>',error)
                })
           }
        },
        mounted(){
            console.log('mounted')
            this.getref();

        },
        components: {
            'remote-js':{
                render(createElement){
                    return createElement('script',{attrs:{type:'text/javascript',src:this.src,async:'async',defer:'defer'}})
                },
                props:{
                    src:{type:String,required:true}
                },
            },
            'remote-js1':{
                render(createElement){
                    return createElement('script',{attrs:{type:'text/javascript'}},
                        `
                            function flushStatus(data){
                                console.log('data>>>>',data)
                                document.getElementById('message').innerText=data
                            }
                        `
                    )
                },
            }
        },
        // watch:{
        //     'googleApi':function(){
        //         if(this.googleApi)
        //         this.forIframe = false;
        //     },

        // },

    }

</script>
<style lang='less'>
    #message{
        display:none;
    }
</style>

