<template>
  <div class="contract-detail-wrap">
    <div class="content-top-white contract-detail-top content-padding">
      <div class="page-title fontSize34">
        {{ $t('tokens.tokenDetail') }}
      </div>

      <div class="detail-change">
        <div class="detail-copy">
          <span>{{ $t('tokens.tokens') }} </span>
          <i>{{ `${detailInfo.name} (${detailInfo.symbol})` }}</i>
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
                  $t('tokens.totalSupply')
                }}</label>
                <div class="money">
                  {{ detailInfo.totalSupply | formatNumber }}
                </div>
              </li>
              <!-- 持有数 暂时没有 -->
              <!-- <li>
                <label class="Gilroy-Medium">{{ $t("tokens.holders") }}</label>
                <div class="money">
                  {{ detailInfo.txCount }}
                </div>
              </li> -->
              <!-- 交易数 -->
              <li>
                <label class="Gilroy-Medium">{{
                  $t('tokens.transfers')
                }}</label>
                <div class="money">{{ detailInfo.txCount }}</div>
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
                <label class="Gilroy-Medium">{{ $t('tokens.contract') }}</label>
                <div class="money contract-create-info">
                  <span
                    class="normal"
                    @click="goContractDetail(detailInfo.address)"
                  >
                    <!-- {{ detailInfo.address | sliceStr(16) }} -->
                    {{ detailInfo.address }}
                  </span>
                  <div class="detail-copy" style="margin-left: 10px">
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
              </li>
              <li>
                <label class="Gilroy-Medium">{{ $t('tokens.decimals') }}</label>
                <div class="money">
                  {{ detailInfo.decimal }}
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{ $t('tokens.website') }}</label>
                <div class="money contract-create-info">
                  <a class="normal" :href="detailInfo.webSite">{{
                    detailInfo.webSite
                  }}</a>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="address-trade gray-content content-padding">
      <div class="tabs">
        <el-button size="medium" class="active">{{
          $t('contract.transactions')
        }}</el-button>
      </div>

      <tokens-list
        :address="address"
        table-type="detail"
        :currency="detailInfo.symbol"
      ></tokens-list>
    </div>
  </div>
</template>
<script>
import apiService from '@/services/API-services';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

import tokensList from '@/components/rec20-tokens-list';
import contractInfo from '@/components/contract/contract-info';
export default {
  name: 'tokensDetailComponent',
  data() {
    return {
      activeTab: 1,
      address: '',
      detailInfo: {},
      isCopy: false,
      copyText: '',
    };
  },
  props: {},
  computed: {},
  watch: {},
  components: {
    tokensList,
    contractInfo,
  },
  methods: {
    //获取地址信息详情
    getDetail() {
      let param = {
        address: this.address,
      };
      apiService.tokens
        .tokenDetail(param)
        .then((res) => {
          let { errMsg, code, data } = res;
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
    goRestricte() {
      this.$router.push({
        path: '/restricting-info',
        query: {
          address: this.address,
        },
      });
    },
    //合约详情
    goContractDetail(adr) {
      this.$router.push({
        path: '/contract-detail',
        query: {
          address: adr,
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
