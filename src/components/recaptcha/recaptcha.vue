<template>
    <div>
        <!-- <div id='g-recaptcha' class="g-recaptcha" :data-sitekey="sitekey"></div> -->
        <div id='g-recaptcha' class="g-recaptcha" data-sitekey="6Ld7HHgUAAAAAAVlPtxPBJtxdthQ6c55Wp9J8Xjq"  data-callback="flushStatus"></div>
        <div>{{message}}</div>
        <remote-js1 @getResponse='getResponse'></remote-js1>
        <remote-js src="https://www.google.com/recaptcha/api.js" ></remote-js>
    </div>
</template>
<script lang='ts'>
    function flushStatus(data){
        console.log('data>>>>',data)
    }
    export default{
        data(){
            return {
                grecaptcha:null,
                // sitekey:'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
                sitekey:'6Ld7HHgUAAAAAAVlPtxPBJtxdthQ6c55Wp9J8Xjq',
                widgetId:0,
                message:'',
            }
        },
        methods:{
            execute(){
                this.grecaptcha.execute(this.widgetId)
            },
            reset(){
                this.grecaptcha.reset(this.widgetId)
            },
            render(){
                console.log(this.grecaptcha)
                if(this.grecaptcha){
                    this.widgetId=this.grecaptcha.render('g-recaptcha',{
                        sitekey: this.sitekey,
                        size: 'invisible',
                        callback:(response)=>{
                            this.$emit('verify',response)
                            this.reset()
                        }
                    })
                }
            },
            getResponse(data){
                console.warn(data)
            },
            flushStatus(data){
                console.warn(data)
            }
        },
        mounted(){
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
                        `function flushStatus(data){
                            console.log('data>>>>',data)
                            localStorage.setItem('response',data)
                        }`
                    )
                },

            }
        }
    }
</script>
<style lang='less'>

</style>

