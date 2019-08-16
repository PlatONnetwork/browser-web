<template>
    <div class="node-list-wrap">
        <div class="page-title fontSize34">{{$t('menu.validator')}}</div> 
        <div class="node-list-header">
            <List class="statistic-info">   
                <h3>{{$t('nodeInfo.liveStakingInfo')}}</h3>        
                <Item :label="$t('nodeInfo.totalStakePower')" prop="111"></Item>
                <Item :label="$t('nodeInfo.totalDelegations')" prop="111"></Item>
                <Item :label="$t('nodeInfo.stakeRate')" prop="111"></Item>              
            </List>
            <List class="statistic-info">   
                <h3>{{$t('nodeInfo.currentPeriodReward')}}</h3>        
                <Item :label="$t('blockAbout.blockReward')" prop="111"></Item>
                <Item :label="$t('nodeInfo.stakingReward')" prop="111"></Item>
                <Item :label="$t('nodeInfo.nextRewardAdjustment')">
                    <div class="next-reward-adjustment">
                        <span>{{$t('tradeAbout.block')}}&nbsp;10.31</span>
                        <span>of 32323332</span>
                    </div>
                </Item>              
            </List>
            <div class="next-epoch">
                <h3>{{$t('nodeInfo.nextEpoch')}}</h3> 
                <p>{{$t('nodeInfo.updateEpoch')}}</p> 
                <ul>
                    <li v-for="(item,index) in [0,2,3,5,6,5]" :key="index">{{item}}</li>
                </ul>
            </div>
        </div>
        <Validator></Validator>
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'

    import List from '@/components/list/list'
    import Item from '@/components/list/item'
    import Validator from './list'

    export default {
        name: 'node-list',
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
            List,
            Item,
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
.node-list-header{
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .item-wrap{
        h3{
            margin-bottom: 19px;
        }
    }
    label{
        width: 160px;
    }
    .next-reward-adjustment{
        display: flex;
        :nth-of-type(1){
            width: 91px;
            background: #000;
            color: #fff;
            text-align: right;
        }
        :nth-of-type(2){
            background: #D5D5D5;
            color: #fff;
            width: 97px;
            text-align: left;
        }
    }
    .next-epoch{
        p{
            margin: 19px 0 14px;
            color: #666;
        }
        ul{ 
            display: flex;
            li{
                width: 30px;
                height: 38px;
                background: #000;
                color: #fff;
                margin-right: 9px;
                border-radius: 1px;
                font-size: 28px;
                line-height: 38px;
                text-align: center;
            }
        }
    }
}
</style>
<style lang="less">
.node-list-header{
    .item-wrap{
        line-height: 24px;
        label{
            width: 166px;
        }
        p{
            font-size: 18px;
        }
    }   
}
</style>

