<template>
    <div class="list-item">
        <label>
            {{label}}：
        </label>
        <p v-if="prop" :class="{red:type=='fail',blue:type=='link',green:type=='success',}">{{prop}}</p>
        <slot></slot>
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'
    export default {
        name: 'list',
        data() {
            return {

            }
        },
        props: {
            prop:[String, Number],
            type:{
                type: String,
                default: 'normal'
            },
            width:{
                type: String,
                default: '135'
            },
            inline:{
                type: Boolean,
                default: true
            },
            label:{
                type: String,
                required: true
            }
        },
        computed: {

        },
		watch: {
		
		},
        components: {

        },
        methods: {
            // goDetail(){
            //     if(this.type=='link'){
            //         this.$emit('')
            //     }
            // }
        },
        //生命周期函数
        created() {

        },
        mounted() {

        }    
    }
</script>
<style lang="less">
    .list-item{
        display: flex;
        flex-flow: row nowrap;
        margin-bottom: 15px;
        label{
            font-size: 13px;
            color: #666;
            line-height: 15px;
            width: 135px;
        }
        p{
            word-break: break-all;
            width: 85%;
        }
    }
</style>

