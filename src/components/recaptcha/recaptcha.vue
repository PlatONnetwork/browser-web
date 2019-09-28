<template>
    <div class='script-area' id='script-area'>
        <!-- <div id='g-recaptcha' class="g-recaptcha" :data-sitekey="sitekey">6LevyYQUAAAAAAhDCvW6ZwxNQ64Zox_XEGuSNJyE</div> -->
        <!-- <script src="https://www.google.com/recaptcha/api.js?onloadCallback&render=explicit" async defer></script> -->
        <div id='g-recaptcha' class="g-recaptcha" data-sitekey="6Lf8KLcUAAAAAAde_oQ-88kTHu-pIzO8J4BBpKcz"  data-callback="flushStatus" ></div>
        <div id='message'></div>
         <remote-js1></remote-js1>
        <remote-js src="https://www.google.com/recaptcha/api.js" ></remote-js>
        <!-- <remote-js src="https://www.recaptcha.net/recaptcha/api.js" ></remote-js> -->
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
                testFlag:0,
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
                    console.warn('哈哈哈哈哈')
                    console.warn('res>>>>>',res)
                    setTimeout (function () {
                        this.is_timeout = true;
                    },10000)
                    if(res){
                        this.updateApiStatus(true)
                        // this.forIframe = true;
                    }else if(this.is_timeout){
                        // this.$message.error(this.$t('menu.goole'))
                        this.$message.warning(123)
                        this.updateApiStatus(false)
                    }
                    this.is_timeout = false;
                }).catch(error=>{
                    this.updateApiStatus(false)
                    this.$message.error(this.$t('menu.goole'))
                    console.warn('error>>>>>',error)
                })
           },
           getFlag(){
               console.log('this.testFlag>>>>',this.testFlag)
                if(this.testFlag==0){
                    console.log('未开启vpn')
                   //未加载
                    this.$message.error(this.$t('menu.goole'))
                    this.updateApiStatus(false)
                }else if(this.testFlag==1){
                    console.log('已开启vpn')
                   this.updateApiStatus(true)
                }
           }

        },
        mounted(){
            console.log('mounted')
            const script=document.getElementById('script-area');
            const s = document.createElement('script');
                s.type = 'text/javascript';
                s.src = 'https://www.google.com/recaptcha/api.js?onloadCallback&render=explicit';
                s.async=true;
            document.head.appendChild(s);
            console.log('s>>>>>',s)
            s.onload=()=>{
                console.log(1)
                function onloadCallback(){
                    console.log("grecaptcha is ready!");
                }
                onloadCallback();
                this.testFlag=1;
                this.updateApiStatus(true)
            };
            setTimeout(()=>{
               this.getFlag();
            },2000)
            // this.getFlag();
            // this.getref();


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

