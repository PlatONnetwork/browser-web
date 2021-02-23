<template>
  <div class="contract-detail-wrap">
    <div class="content-top-white contract-detail-top content-padding">
      <!-- 地址详情 -->
      <div class="page-title fontSize34">
        {{ $t('contract.addressDetail') }}
      </div>

      <div class="detail-change">
        <div class="detail-copy">
          <span>{{ $t('contract.address') }}</span>
          <i>#{{ address }}</i>
          <b
            class="cursor"
            :class="{ copy: !isCopy }"
            v-clipboard:copy="address"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            ><p v-show="isCopy">
              <i class="el-icon-circle-check-outline"></i
              ><span>{{ copyText }}</span>
            </p></b
          >
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
                <!-- TODO 需要后台给值做判断 -->
                <label class="Gilroy-Medium">{{
                  $t('tokens.erc20TokenTxns')
                }}</label>
                <div class="money">
                  {{ detailInfo.tokenQty | formatNumber }}
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
          v-if="isAddressDetailsDelegation"
          >{{ $t('contract.delegations') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 4 }"
          @click="tabChange(4)"
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
      <tokens-list v-show="tabIndex == 2" :address="address" :tradeCount="detailInfo"></tokens-list>

      <!-- 委托 -->
      <delegation-info
        v-show="tabIndex == 3"
        :detailInfo="detailInfo"
        :address="address"
      ></delegation-info>

      <!-- 奖励领取明细 -->
      <reward-detail
        v-show="tabIndex == 4"
        ref="rewardDetail"
        :tradeCount="detailInfo"
        :address="address"
      ></reward-detail>
    </div>
  </div>
</template>
<script>
import apiService from '@/services/API-services';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

import tradeList from '@/components/trade-list';
import tokensList from '@/components/tokens/rec20-tokens-list';
// import tokensList from '@/components/tokens/tokens-trade';
import rewardDetail from '@/components/address/rewardDetailTable';
import delegationInfo from '@/components/address/delegations-info';
export default {
  name: 'contract-detail',
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
  props: {},
  computed: {
    ...mapGetters(['isAddressDetailsDelegation', 'isAddressDetailsReward']),
  },
  watch: {},
  components: {
    tradeList,
    tokensList,
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
    this.address = this.$route.query.address.toLowerCase();
    this.getDetail();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.restricted {
  font-size: 12px;
  color: #999;
  line-height: 16px;
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
.code {
  position: relative;
  .qr-code {
    position: absolute;
    top: 32px;
    left: -55px;
    z-index: 999;
    display: none;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  &:hover .qr-code {
    display: block;
  }
}
.contract-detail-top {
  padding-bottom: 30px;
}
</style>
