<template>
  <div class="contract-detail-wrap">
    <div class="content-top-white contract-detail-top content-padding">
      <div class="page-title fontSize34">
        {{ $t('contract.contractDetail') }}
      </div>

      <div class="detail-change">
        <div class="detail-copy">
          <span>{{ $t('contract.contract') }}</span>
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
              <li v-if="detailInfo.type === 5">
                <label class="Gilroy-Medium">{{
                  $t('contract.ercTrade')
                }}</label>
                <div class="money">{{ detailInfo.tokenQty | formatNumber }}</div>
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
                  $t('contract.contractName')
                }}</label>
                <!-- 系统合约 -->
                <div class="money" v-if="detailInfo.type == '2'">
                  {{ detailInfo.contractName }}
                </div>
                <div class="money" v-else>Not Available</div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{
                  $t('contract.contractCreator')
                }}</label>
                <!-- 系统合约 -->
                <div class="money" v-if="detailInfo.type == '2'">
                  System Contract
                </div>
                <div v-else class="money contract-create-info">
                  <span
                    class="normal"
                    @click="goAddressDetail(detailInfo.contractCreate)"
                    v-if="detailInfo.contractCreate"
                  >
                    {{ detailInfo.contractCreate | sliceStr(16) }}
                  </span>
                  <span
                    style="padding: 0 8px"
                    v-if="
                      detailInfo.contractCreate && detailInfo.contractCreateHash
                    "
                  >
                    {{ $t('contract.transactionsIn') }}
                  </span>
                  <span
                    class="normal"
                    @click="goTradeDetail(detailInfo.contractCreateHash)"
                    v-if="detailInfo.contractCreateHash"
                  >
                    {{ detailInfo.contractCreateHash | sliceStr(20) }}
                  </span>
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{
                  $t('contract.tokenTracker')
                }}</label>
                <!-- tokens -->
                <div class="money contract-create-info">
                  <span class="normal" @click="goTokenDetail(address)">
                    <!-- // todo 暂时没有返回，请求token/detail接口合成 -->
                    {{ tokenName }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="address-trade gray-content content-padding">
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
          >{{ $t('tokens.erc20TokenTxns') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 3 }"
          @click="tabChange(3)"
          >{{ $t('contract.contract') }}</el-button
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
      <tokens-list v-show="tabIndex == 2" :address="address" :tradeCount="detailInfo" pageType="contract"></tokens-list>

      <!-- 合约 -->
      <contract-info v-show="tabIndex == 3" :detailInfo="detailInfo">
      </contract-info>
    </div>
  </div>
</template>
<script>
import apiService from '@/services/API-services';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

import tradeList from '@/components/trade-list';
import tokensList from '@/components/tokens/rec20-tokens-list';
import contractInfo from '@/components/contract/contract-info';
export default {
  name: 'contract-detail',
  data() {
    return {
      tabIndex: 1,
      selectIndex: 1,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,

      activeTab: 1,
      address: '',
      detailInfo: {},
      isCopy: false,
      copyText: '',
      haveReward: 0,
      tokenName: '',
    };
  },
  props: {},
  computed: {},
  watch: {},
  components: {
    tradeList,
    tokensList,
    contractInfo,
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
          if (code == 0) {
            this.detailInfo = data;
            // 合成token 名称
            this.getTokenDetail()
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    getTokenDetail() {
      apiService.tokens
        .tokenDetail({address: this.address})
        .then((res) => {
          let { errMsg, code, data } = res;
          if (code == 0 && data.name && data.symbol) {
            this.tokenName = data.name + ' (' + data.symbol + ')';
            this.detailInfo.tokenQty = data.txCount
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
    //token详情
    goTokenDetail(address) {
      this.$router.push({
        path: '/tokens-detail',
        query: {
          address: address,
        },
      });
    },
    //地址详情
    goAddressDetail(address) {
      this.$router.push({
        path: '/address-detail',
        query: {
          address: address,
        },
      });
    },
    //进入交易详情
    goTradeDetail(hash) {
      this.$router.push({
        path: '/trade-detail',
        query: {
          txHash: hash,
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
