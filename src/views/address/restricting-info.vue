<template>
    <div class="restricting-detail-wrap">
        <div class="page-title fontSize34">{{$t('contract.addressDetail')}}</div> 
        <div class="detail-change">
            <div class="detail-copy">
                <span>{{$t('contract.address')}}</span>
                <i>#{{address}}</i>
                <b class="cursor" :class="{copy:!isCopy}" v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError"><p v-show="isCopy"><i class="el-icon-circle-check-outline"></i><span>{{copyText}}</span></p></b>
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
                <Item :label="$t('contract.restrictedBalance')">
                    <p>{{detailInfo.restrictingBalance | formatMoney}}&nbsp;LAT</p>
                </Item>
                <Item :label="$t('contract.forDelegations')">
                    <p>{{detailInfo.stakingValue | formatMoney}}&nbsp;LAT</p>
                </Item>
                <Item :label="$t('contract.debt')">
                    <p>{{detailInfo.underReleaseValue | formatMoney}}&nbsp;LAT</p>
                </Item>
            </List>
        </div>
               
        <div class="table restricted-table">
            <h3>{{$t('tradeAbout.restrictedPlan')}}</h3>
            <div class="restricted-total">
                {{$t('tradeAbout.totalRestricted')}}
                <span>{{detailInfo.totalValue | formatMoney}}&nbsp;LAT</span>
            </div>
            <el-table :data="detailInfo.rpPlans" style="width: 100%" key='firstTable' size="mini">
                <!-- <el-table-column :label="$t('contract.epoch')">
                    <template slot-scope="scope">
                        <span>{{scope.row.blockNumber}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column :label="$t('blockAbout.blockH')">
                    <template slot-scope="scope">
                        <span>{{scope.row.blockNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('contract.estimatedTime')">
                    <template slot-scope="scope">
                        <span>{{scope.row.estimateTime | formatTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('contract.unlocksNumber')" width="240">
                    <template slot-scope="scope">
                        <span>{{scope.row.amount | formatMoney}}LAT</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-box">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes,total,  prev, pager, next" :total="pageTotal" :pager-count="9">
                </el-pagination>
            </div>
        </div>             
    </div>
</template>
<script>
    import apiService from '@/services/API-services'

    import List from '@/components/list/list'
    import Item from '@/components/list/item'

    export default {
        name: 'contract-detail',
        data() {
            return {
                address:'',
                currentPage: 1,
                pageSize: 20,
                pageTotal: 0,
                detailInfo:{

                },
                isCopy:false,
                copyText:''
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
            //获取详情
            getDetail() {
                let param = {
                    address: this.address,
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                };
                apiService.account
                    .rpplanDetail(param)
                    .then(res => {
                        let {errMsg, code, data} = res;
                        // console.log(res)
                        if (code == 0) {
                            this.detailInfo = data;
                            this.pageTotal = data.total;
                        } else {
                            this.$message.error(errMsg);
                        }
                    })
                    .catch(error => {
                        this.$message.error(error);
                    });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getDetail();
            },
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                this.getDetail();
            },
            onCopy() {
                this.copyText = this.$t('modalInfo.copysuccess');
                this.isCopy = true;
                setTimeout(()=>{
                    this.isCopy = false;
                    this.copyText = '';
                },2000)
            },
            onError() {
                this.copyText = this.$t('modalInfo.copyfail');
                this.isCopy = true;
                setTimeout(()=>{
                    this.isCopy = false;
                    this.copyText = '';
                },2000)
            },
        },
        //生命周期函数
        created() {
            this.address = this.$route.query.address;
            this.getDetail();
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
        top: 32px;
        left: -55px;
        z-index: 999;
        display: none;
        background: rgba(255,255,255,0.90);
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.10);
        border-radius: 4px;
    }
    &:hover .qr-code{
        display: block;
    }
}
.restricted-table{
    .el-table{
        margin-left: 10px;
    }
    .restricted-total{
        margin-bottom: 10px;
        span{
            margin-left: 6px;
            color: #000000;
            font-size: 15px;
        }
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

