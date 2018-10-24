<template>
    <div class="block-wrap">
        区块
        <com-footer></com-footer>
    </div>
</template>

<script>
    //import  from ''
    import comHeader from '@/components/header/header.vue'
    import comFooter from '@/components/footer/footer.vue'

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
        components: {comHeader,comFooter}
    }
</script>

<style lang="less" scoped>

</style>

