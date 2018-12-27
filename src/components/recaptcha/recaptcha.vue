<template>
    <div>
        <!-- <div id='g-recaptcha' class="g-recaptcha" :data-sitekey="sitekey"></div> -->
        <div id='g-recaptcha' class="g-recaptcha" data-sitekey="6LevyYQUAAAAAAhDCvW6ZwxNQ64Zox_XEGuSNJyE"  data-callback="flushStatus"></div>
        <div id='message'></div>
        <remote-js1></remote-js1>
        <remote-js src="https://www.google.com/recaptcha/api.js" ></remote-js>
    </div>
</template>
<script lang='ts'>
    export default{
        data(){
            return {
                grecaptcha:null,
                // sitekey:'6LevyYQUAAAAAAhDCvW6ZwxNQ64Zox_XEGuSNJyE',
                sitekey:'6LcHGHoUAAAAADDcn7bejGjLAhAuNG6Y7TnuMBYM',
            }
        },
        computed:{
        },
        methods:{
            getResponse(){
                this.$nextTick(()=>{
                    console.warn("document.getElementById('message').innerText",document.getElementById('message').innerText)
                    let response = document.getElementById('message').innerText
                    this.$emit('verify',response)
                })
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
                        `
                            function flushStatus(data){
                                console.log('data>>>>',data)
                                document.getElementById('message').innerText=data
                            }
                        `
                    )
                },
            }
        }
    }
</script>
<style lang='less'>
    #message{
        display:none;
    }
</style>

