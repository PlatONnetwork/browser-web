<template>
    <div class="list-wrap">
        <div class="title" v-if="title">
            {{title}}
        </div>
        <div class="item-wrap" :class="{'flex-inline':inline,'flex-vertical':!inline}">
            <slot></slot>
        </div>
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
            title:String,
            inline:{
                type: Boolean,
                default: false
            }
        },
        computed: {

        },
		watch: {
		
		},
        components: {

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
    .list-wrap{
        .title{
            font-size: 20px;
            color: #000;
            line-height: 24px;
            padding: 9px 20px;
            border-top:1px solid #000;
            margin-bottom: 31px;
        }
    }
    .item-wrap{
        display: flex;
        flex-flow: column wrap;
        padding-left: 50px;
        &.flex-inline{
            flex-flow: row wrap;
        }
    }
    
</style>

