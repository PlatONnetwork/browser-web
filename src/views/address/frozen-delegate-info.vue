<template>
    <div class="restricting-detail-wrap">
        <div class="page-title fontSize34">{{$t('contract.addressDetail')}}</div> 
        <div class="detail-change">
            <div class="detail-copy">
                <span>{{$t('contract.address')}}</span>
                <i>#{{showAdr}}</i>
                <b class="cursor" :class="{copy:!isCopy}" v-clipboard:copy="showAdr" v-clipboard:success="onCopy" v-clipboard:error="onError"><p v-show="isCopy"><i class="el-icon-circle-check-outline"></i><span>{{copyText}}</span></p></b>
                <a class="code cursor">
                    <qriously
                        class="qr-code"
                        v-if="showAdr"
                        :value="showAdr"
                        :size="140"
                    />
                </a>
                <span v-if="!adrErr" class="adr-trans" @click="adrTypeChange">{{ adrType }}</span>
                <span v-else class="adr-err">{{ $t('contract.addressErr') }}</span>
            </div>
        </div>
        <div class="restricting-detail overview">
            <h3>{{$t('contract.frozenDelegateOverview')}}</h3>
            <ul>
              <li style="margin-left: 20px;padding-left: 0px;">
                <label class="Gilroy-Medium">
                  {{ $t('contract.frozenDelegate') }}
                  <el-tooltip class="item" placement="bottom">
                    <div slot="content" class="delegate-msg">
                      {{ $t('contract.frozenDelegateTips') }}
                    </div>
                    <i class="address-icon"></i>
                  </el-tooltip>
                </label>
                <div class="money">
                  {{ balance | formatMoney }}&nbsp;LAT
                </div>
              </li>
            </ul>
        </div>
               
        <div class="table restricted-table">
            <h3>{{$t('contract.frozenDelegatePlan')}}</h3>
            <el-table :data="list" style="width: 100%" size="mini">
                <el-table-column :label="$t('blockAbout.blockH')">
                    <template slot-scope="scope">
                        <span>{{scope.row.blockNum}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('contract.estimatedTime')">
                    <template slot-scope="scope">
                        <span>{{scope.row.date | formatTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('contract.thawAmount')" width="240">
                    <template slot-scope="scope">
                        <span>{{scope.row.lock | formatMoney}}&nbsp; LAT</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>             
    </div>
</template>
<script>
    import List from '@/components/list/list'
    import Item from '@/components/list/item'

    import AdrTrans from '@/mixins/adrTrans';

    export default {
        name: 'frozen-delegate-detail',
        mixins: [AdrTrans],
        data() {
            return {
                address:'',
                balance: 0,
                list: [],
                isCopy:false,
                copyText:''
            }
        },
        components: {
            List,
            Item  
        },
        methods: {
            //获取详情
            getDetail() {
                let info = JSON.parse(sessionStorage.getItem(this.address))
                if (!info) {
                    this.goAddressDetail(this.address)
                    return
                }
                this.balance = info.balance
                this.list = info.list

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
            this.checkAdr() && this.getDetail()
        },
    }
</script>
<style lang="less" scoped>
.restricted{
    font-size: 12px;
    color: #999;
    line-height: 16px;
}
.restricted-table{
    padding-bottom: 100px;
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
        margin-bottom: 60px;
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

