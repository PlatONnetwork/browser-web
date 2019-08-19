<template>
    <div class="history-node-wrap">
        <div class="page-title fontSize34">{{$t('nodeInfo.historicalValidators').toUpperCase()}}</div> 
         <Validator type="history"></Validator>
    </div>
</template>
<script>
    import Validator from './list'
    export default {
        name: 'history-node',
        data() {
            return {
                
            }
        },
        props: {

        },
        computed: {

        },
		watch: {
		
		},
        components: {
            Validator
        },
        methods: {

        },
        //生命周期函数
        created() {
            
        },
        mounted() {

        }    
    }
</script>
<style lang="less" scoped>

</style>
