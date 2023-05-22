<template>
  <div class="contract-detail-wrap">
    <div class="content-top-white contract-detail-top content-padding">
      <div class="page-title fontSize34">
        {{ $t('contract.contractDetail') }}
      </div>

      <div class="detail-change">
        <div class="detail-copy">
          <div>
            <span>{{ $t('contract.contract') }}</span>
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
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{
                  $t('contract.transactions')
                }}</label>
                <div class="money">{{ detailInfo.txQty | formatNumber }}</div>
              </li>
              <li>
                  <label class="Gilroy-Medium">{{
                    $t('contract.erc20Trade')
                  }}</label>
                  <div class="money">
                    {{ detailInfo.erc20TxQty | formatNumber }}
                  </div>
              </li>
              <li>
                  <label class="Gilroy-Medium">{{
                    $t('contract.erc721Trade')
                  }}</label>
                  <div class="money">
                    {{ detailInfo.erc721TxQty | formatNumber }}
                  </div>
              </li>
              <li>
                  <label class="Gilroy-Medium">{{
                    $t('contract.erc1155Trade')
                  }}</label>
                  <div class="money">
                    {{ detailInfo.erc1155TxQty | formatNumber }}
                  </div>
              </li>
              <!-- 状态 todo -->
              <li>
                <label class="Gilroy-Medium">{{
                  $t('contract.status.name')
                }}</label>
                <div v-if="detailInfo.isDestroy" class="red">{{ $t('contract.status.destructed3') }}</div>
                <div v-else>{{ $t('contract.status.normal') }}</div>
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
                  <router-link
                    class="normal ellipsis adr-width"
                    :to="getAddressUrl(detailInfo.contractCreate)"
                    v-if="detailInfo.contractCreate"
                  >
                    {{ detailInfo.contractCreate }}
                  </router-link>
                  <span
                    style="padding: 0 8px"
                    v-if="
                      detailInfo.contractCreate && detailInfo.contractCreateHash
                    "
                  >
                    {{ $t('contract.transactionsIn') }}
                  </span>
                  <router-link
                    class="normal ellipsis hash-width"
                    :to="getTradeUrl(detailInfo.contractCreateHash)"
                    v-if="detailInfo.contractCreateHash"
                  >
                    {{ detailInfo.contractCreateHash }}
                  </router-link>
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{
                  $t('contract.tokenTracker')
                }}</label>
                <!-- tokens -->
                <div class="money contract-create-info">
                  <span v-if="noTokens">N/A</span>
                  <router-link v-else class="normal" :to="getTokenUrl(address)" >
                    {{ detailInfo | tokenName(['tokenName', 'tokenSymbol']) }}
                  </router-link>
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
          >{{ $t('contract.erc20Trade') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 3 }"
          @click="tabChange(3)"
          >{{ $t('contract.erc721Trade') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 4 }"
          @click="tabChange(4)"
          >{{ $t('contract.erc1155Trade') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 5 }"
          @click="tabChange(5)"
          v-if="isAddressDetailsDelegation"
        >
          {{ $t('contract.delegations') }}
        </el-button>
        <el-button size="medium" :class="{ active: tabIndex == 6 }" @click="tabChange(6)" v-if="isAddressDetailsReward">
          {{ $t('contract.rewardDetails') }}
        </el-button>
        <el-button size="medium" :class="{ active: tabIndex == 7 }" @click="tabChange(7)">
          {{ $t('contract.contract') }}
        </el-button>

        <el-button
          size="medium"
          :class="{ active: tabIndex == 8 }"
          @click="tabChange(8)"
        >{{ $t('contract.innerTransfer') }}
        </el-button>

      </div>

      <!-- 交易 -->
      <trade-list
        ref="addressTrade"
        :address="address"
        v-show="tabIndex == 1"
        :tradeCount="detailInfo"
      ></trade-list>

      <!-- Erc20 Token -->
      <erc20-list v-show="tabIndex == 2" :address="address" :tradeCount="detailInfo" pageType="contractA" ></erc20-list>

      <!-- Erc721 Token -->
      <erc721-list v-show="tabIndex == 3" :address="address" :tradeCount="detailInfo" pageType="contractA" ></erc721-list>

      <!-- Erc1155 Token -->
      <erc1155-list v-show="tabIndex == 4" :address="address" :tradeCount="detailInfo" pageType="contractA" ></erc1155-list>
      <!-- 委托 -->
      <delegation-info v-show="tabIndex == 5" :detailInfo="detailInfo" :address="address"></delegation-info>

      <!-- 奖励领取明细 -->
      <reward-detail v-show="tabIndex == 6" :tradeCount="detailInfo" :address="address"></reward-detail>

      <!-- 合约 -->
      <contract-info v-show="tabIndex == 7" :detailInfo="detailInfo"></contract-info>

      <!-- 内部转账 -->
      <inner-transfer-list v-show="tabIndex == 8" :tradeCount="detailInfo" :address="address"></inner-transfer-list>

    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import apiService from '@/services/API-services';
import tradeList from '@/components/trade-list';
import innerTransferList from '@/components/innerTransfer-list';
import erc20List from '@/components/tokens/erc20-tokens-list';
import erc721List from '@/components/tokens/erc721-tokens-list';
import erc1155List from '@/components/tokens/erc1155-tokens-list';
import rewardDetail from '@/components/address/rewardDetailTable'
import delegationInfo from '@/components/address/delegations-info'
import contractInfo from '@/components/contract/contract-info'
import AdrTrans from '@/mixins/adrTrans';

export default {
  name: 'contract-detail',
  mixins: [AdrTrans],
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
      noTokens: false,
    };
  },
  props: {},
  computed: {
    ...mapGetters(['isAddressDetailsDelegation', 'isAddressDetailsReward']),
  },
  watch: {},
  components: {
    tradeList,
    innerTransferList,
    erc20List,
    erc721List,
    erc1155List,
    contractInfo,
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
          if (code == 0) {
            this.noTokens = !(data.hasErc20 || data.hasErc721 || data.hasErc1155);
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
  },
  //生命周期函数
  created() {
    this.checkAdr() && this.getDetail()
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
      .money.contract-create-info {
        flex-wrap: wrap;
        line-height: 1.35;
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
