<template>
  <div class="contract-detail-wrap">
    <div class="content-top-white contract-detail-top content-padding">
      <!-- 地址详情 -->
      <div class="page-title fontSize34">
        {{ $t('contract.addressDetail') }}
      </div>

      <div class="detail-change">
        <div class="detail-copy">
          <div>
            <span>{{ $t('contract.address') }}</span>
            <i>#{{ showAdr }}</i>
            <b
              class="cursor"
              :class="{ copy: !isCopy }"
              v-clipboard:copy="showAdr"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              ><p v-show="isCopy">
                <i class="el-icon-circle-check-outline"></i
                ><span>{{ copyText }}</span>
              </p></b
            >
          </div>

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
      <el-row class="overview-wrap" type="flex" justify="space-between">
        <el-col :span="11">
          <!-- 概览 -->
          <div class="overview">
            <h3 class="Gilroy-Medium">{{ $t('contract.overview') }}</h3>
            <ul>
              <li>
                <label class="Gilroy-Medium">{{
                  $t('contract.balance')
                }}</label>
                <div>
                  <span class="money"
                    >{{ detailInfo.balance | formatMoney }}&nbsp;LAT</span
                  >
                  <div v-if="detailInfo.isRestricting">
                    <span class="restricted"
                      >{{
                        detailInfo.restrictingBalance | formatMoney
                      }}&nbsp;LAT (<a
                        class="blue cursor"
                        @click="goRestricte"
                        >{{ $t('contract.restricted') }}</a
                      >)</span
                    >
                  </div>
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{
                  $t('contract.transactions')
                }}</label>
                <div class="money">{{ detailInfo.txQty | formatNumber }}</div>
              </li>
              <li>
                <!-- PRC20交易 -->
                <label class="Gilroy-Medium">{{
                  $t('tokens.erc20TokenTxns')
                }}</label>
                <div class="money">
                  {{ detailInfo.erc20TxQty | formatNumber }}
                </div>
              </li>
              <li>
                <!-- PRC721交易 -->
                <label class="Gilroy-Medium">{{
                  $t('tokens.erc721TokenTxns')
                }}</label>
                <div class="money">
                  {{ detailInfo.erc721TxQty | formatNumber }}
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <div style="width: 100px; flex-shrink: 0"></div>
        <!-- 地址其他 -->
        <el-col :span="11">
          <div class="others overview">
            <h3 class="Gilroy-Medium">{{ $t('contract.others') }}</h3>
            <ul>
              <li>
                <label class="Gilroy-Medium">{{
                  $t('contract.stackingAndDelegations')
                }}</label>
                <div class="money">
                  <!-- TODO! 先用质押的字段 需要合并质押和委托中 -->
                  {{ detailInfo.stakingValue | formatMoney }}&nbsp;LAT
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{
                  $t('contract.unclaimedReward')
                }}</label>
                <div class="money">
                  {{ detailInfo.delegateClaim | formatMoney }}&nbsp;LAT
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{
                  $t('contract.invalidDelegations')
                }}</label>
                <div class="money">
                  {{ detailInfo.delegateReleased | formatMoney }}&nbsp;LAT
                </div>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="address-trade gray-content content-padding">
      <!-- 地址tab -->
      <div class="tabs">
        <el-button
          size="medium"
          :class="{ active: tabIndex == 1 }"
          @click="tabChange(1)"
          >{{ $t('contract.transactions') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 2 }"
          @click="tabChange(2)"
          >{{ $t('tokens.erc20Tokens') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 3 }"
          @click="tabChange(3)"
          >{{ $t('tokens.erc721Tokens') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 4 }"
          @click="tabChange(4)"
          v-if="isAddressDetailsDelegation"
          >{{ $t('contract.delegations') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 5 }"
          @click="tabChange(5)"
          v-if="isAddressDetailsReward"
          >{{ $t('tradeAbout.rewardDetails') }}</el-button
        >
      </div>
      <!-- 交易 -->
      <trade-list
        ref="addressTrade"
        :address="address"
        v-show="tabIndex == 1"
        :tradeCount="detailInfo"
      ></trade-list>

      <!-- Erc20 Token -->
      <erc20-list v-show="tabIndex == 2" :address="address" :tradeCount="detailInfo"></erc20-list>

      <!-- Erc721 Token -->
      <erc721-list v-show="tabIndex == 3" :address="address" :tradeCount="detailInfo"></erc721-list>

      <!-- 委托 -->
      <delegation-info
        v-show="tabIndex == 4"
        :detailInfo="detailInfo"
        :address="address"
      ></delegation-info>

      <!-- 奖励领取明细 -->
      <reward-detail
        v-show="tabIndex == 5"
        ref="rewardDetail"
        :tradeCount="detailInfo"
        :address="address"
      ></reward-detail>
    </div>
  </div>
</template>
<script>
import apiService from '@/services/API-services';
import { mapGetters } from 'vuex';

import tradeList from '@/components/trade-list';
import erc20List from '@/components/tokens/erc20-tokens-list';
import erc721List from '@/components/tokens/erc721-tokens-list';
import rewardDetail from '@/components/address/rewardDetailTable';
import delegationInfo from '@/components/address/delegations-info';

import AdrTrans from '@/mixins/adrTrans';

export default {
  name: 'contract-detail',
  mixins: [AdrTrans],
  data() {
    return {
      tabIndex: 1,
      selectIndex: 1,
      tableData: [],
      activeTab: 1,
      address: '',
      detailInfo: {},
      isCopy: false,
      copyText: '',
      haveReward: 0,
    };
  },
  computed: {
    ...mapGetters(['isAddressDetailsDelegation', 'isAddressDetailsReward'])
  },
  watch: {},
  components: {
    tradeList,
    erc20List,
    erc721List,
    rewardDetail,
    delegationInfo,
  },
  methods: {
    //获取地址信息详情
    getDetail() {
      let param = {
        address: this.address,
      };
      apiService.account
        .details(param)
        .then((res) => {
          let { errMsg, code, data } = res;
          // console.log(res)
          if (code == 0) {
            this.detailInfo = data;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },

    onCopy() {
      this.copyText = this.$t('modalInfo.copysuccess');
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false;
        this.copyText = '';
      }, 2000);
    },
    onError() {
      this.copyText = this.$t('modalInfo.copyfail');
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false;
        this.copyText = '';
      }, 2000);
    },
    tabChange(index) {
      this.tabIndex = index;
    },

    goRestricte() {
      this.$router.push({
        path: '/restricting-info',
        query: {
          address: this.address,
        },
      });
    },
  },
  //生命周期函数
  created() {
    this.checkAdr() && this.getDetail()
  },
};
</script>
<style lang="less" scoped>
.restricted {
  font-size: 12px;
  color: #999;
  line-height: 16px;
}
.adr-err {
  color: #cf326e;
  font-size: 14px;
  margin-left: 4px;
  line-height:24px;
}
.money {
  color: #000;
  &.contract-create-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .normal {
      cursor: pointer;
    }
  }
  font-size: 15px;
  font-family: Gilroy-Regular;
  letter-spacing: 0;
}
.contract-detail-top {
  padding-bottom: 30px;
}
.detail-change {
  .detail-copy {
    & > *:first-child {
      display: inline;
    }
  }
}
@media (max-width: 750px) {
  .detail-change {
    .detail-copy {
      display: flex;
      & > *:first-child {
        word-break: break-all;
      }
      .code.cursor {
        width: 40px;
        min-width: 40px;
        height: 40px;
        margin-left: 10px;
      }
    }
  }
  .overview-wrap {
    flex-direction: column;
    .el-col {
      width: 100%;
      float: unset;
      .money{
        word-break: break-all;
        .contract-create-info {
          flex-wrap: wrap;
          line-height: 1.35;
        }
      }
    }
    & > * + * {
      margin-top: 16px;
    }
  }

  .address-trade {
    .tabs {
      button {
        margin-right: 12px;
        margin-left: 0 !important;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
