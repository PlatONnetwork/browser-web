<template>
    <div class="restricting-detail-wrap">
        <div class="page-title fontSize34">{{$t('contract.addressDetail')}}</div> 
        <div class="detail-change">
            <div class="detail-copy">
                <span>{{$t('contract.address')}}</span>
                <i>#{{address}}</i>
                <b class="cursor" v-clipboard:copy="detailInfo.contractCreate" v-clipboard:success="onCopy" v-clipboard:error="onError"></b>
                <a class="code cursor">
                    <qriously
                        class="qr-code"
                        v-if="address"
                        :value="address"
                        :size="140"
                    />
                </a>
            </div>
        </div>
        <div class="restricting-detail">
            <h3>{{$t('contract.lockOverview')}}</h3>
            <List class="common-info">           
                <Item :label="$t('contract.restrictedBalance')" :prop="detailInfo.delegateHes"></Item>
                <Item :label="$t('contract.released')" :prop="detailInfo.delegateHes"></Item>
                <Item :label="$t('contract.forDelegations')" :prop="detailInfo.delegateHes"></Item>
                <Item :label="$t('contract.slash')" :prop="detailInfo.delegateHes"></Item>
                <Item :label="$t('contract.debt')" :prop="detailInfo.delegateHes"></Item>
                <Item :label="$t('contract.totalRestricted')" :prop="detailInfo.delegateHes"></Item>
            </List>
        </div>
               
        <div class="table" style="width:50%;">
            <h3>{{$t('tradeAbout.restrictedPlan')}}</h3>
            <el-table :data="tableData" style="width: 100%" key='firstTable' size="mini">
                <el-table-column :label="$t('contract.epoch')">
                    <template slot-scope="scope">
                        <span>Received</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('blockAbout.blockH')" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.value}} LAT</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('contract.estimatedTime')" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.value}} LAT</span>
                    </template>
                </el-table-column>
                <el-table-column prop="actualTxCost" :label="$t('contract.unlocksNumber')" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>             
    </div>
</template>
<script>
    import apiService from '@/services/API-services'
    import {mapState, mapActions, mapGetters,mapMutations} from 'vuex'

    import List from '@/components/list/list'
    import Item from '@/components/list/item'

    export default {
        name: 'contract-detail',
        data() {
            return {
                tableData: [],
                address:'',
                detailInfo:{

                },
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
            Item  
        },
        methods: {
            onCopy() {
                this.$message.success(this.$t('modalInfo.copysuccess'));
            },
            onError() {
                this.$message.error(this.$t('modalInfo.copyfail'));
            },
        },
        //生命周期函数
        created() {
            console.log(JSON.parse(this.$route.query.info))
            this.detailInfo = JSON.parse(this.$route.query.info);
            this.address = this.$route.query.address;
            // this.getDetail();
            // this.getList();
        },
        mounted() {

        }    
    }
</script>
<style lang="less" scoped>
.restricted{
    font-size: 12px;
    color: #999;
    line-height: 16px;
}
.code{
    position: relative;
    .qr-code{
        position: absolute;
        background: #fff;
        top: 32px;
        left: -55px;
        z-index: 999;
        display: none;
        box-shadow: 0px 0px 8px 0px;
    }
    &:hover .qr-code{
        display: block;
    }
}
.address-delegation{
    ul{
        display: flex;
        margin-top: 20px;
        text-align: center;
        li{
            border: 1px solid #E9E9E9;
            border-radius: 2px;
            margin-right: 20px;
            padding: 5px 10px;            
            span{
                font-size: 18px;
            }
            p{
                font-size: 12px;
                color: #999999;
            }
        }
    }
}
.restricting-detail-wrap{
    h3{
        margin-bottom: 17px;
        font-size: 20px;
        color: #000000;
        line-height: 24px;
    }
    .restricting-detail{
        width: 50%;        
    }
}

</style>
<style lang="less">
.restricting-detail{
    .list-wrap{
        padding-left: 20px;
        padding-bottom: 0;
        .list-item{
            justify-content: space-between;
            border-bottom: 1px solid #F5F5F5;
            padding-bottom: 12px;
            label{
                width: 165px;
            }
            p{
                width: auto;
                margin-right: 20px;
            }
        }
    }
}
</style>

