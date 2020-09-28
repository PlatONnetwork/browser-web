<template>
  <div class="contract-detail-wrap">
    <div class="content-top-white contract-detail-top content-padding">
      <div class="page-title fontSize34">Token详情</div>

      <div class="detail-change">
        <div class="detail-copy">
          <span>Token </span>
          <i>{{ `${detailInfo.name} (${detailInfo.symbol})` }}</i>
          <b
            class="cursor"
            :class="{ copy: !isCopy }"
            r
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
            <h3 class="Gilroy-Medium">{{ $t("contract.overview") }}</h3>
            <ul>
              <li>
                <label class="Gilroy-Medium">Total Supply</label>
                <div class="money">
                  {{ detailInfo.totalSupply | formatNumber }}
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">Holders</label>
                <div class="money">
                  {{ detailInfo.txCount }}
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">Transfers</label>
                <div class="money">
                  {{ detailInfo.totalSupply | formatNumber }}
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <div style="width: 100px; flex-shrink: 0"></div>
        <!-- 地址其他 -->
        <el-col :span="11">
          <div class="others overview">
            <h3 class="Gilroy-Medium">{{ $t("contract.others") }}</h3>
            <ul>
              <li>
                <label class="Gilroy-Medium">Contract</label>
                <div class="money contract-create-info">
                  <span
                    class="normal"
                    @click="goAddressDetail(detailInfo.address)"
                  >
                    {{ detailInfo.address | sliceStr(16) }}
                  </span>
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">Decimals</label>
                <div class="money">
                  {{ detailInfo.decimal }}
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">Official Site</label>
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
          $t("contract.transactions")
        }}</el-button>
      </div>

      <token-list :address="address" type="detail"></token-list>
    </div>
  </div>
</template>
<script>
import apiService from "@/services/API-services";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

import tokenList from "@/components/rec20-token-list";
import contractInfo from "@/components/contract/contract-info";
export default {
  name: "contract-detail",
  data() {
    return {
      activeTab: 1,
      address: "",
      detailInfo: {},
      isCopy: false,
      copyText: ""
    };
  },
  props: {},
  computed: {},
  watch: {},
  components: {
    tokenList,
    contractInfo
  },
  methods: {
    //获取地址信息详情
    getDetail() {
      let param = {
        address: this.address
      };
      apiService.token
        .tokenDetail(param)
        .then(res => {
          let { errMsg, code, data } = res;
          if (code == 0) {
            this.detailInfo = data;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },

    onCopy() {
      this.copyText = this.$t("modalInfo.copysuccess");
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false;
        this.copyText = "";
      }, 2000);
    },
    onError() {
      this.copyText = this.$t("modalInfo.copyfail");
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false;
        this.copyText = "";
      }, 2000);
    },
    goRestricte() {
      this.$router.push({
        path: "/restricting-info",
        query: {
          address: this.address
        }
      });
    },
    //地址详情
    goAddressDetail(address) {
      this.$router.push({
        path: "/address-detail",
        query: {
          address: address
        }
      });
    },
    //进入交易详情
    goTradeDetail(hash) {
      this.$router.push({
        path: "/trade-detail",
        query: {
          txHash: hash
        }
      });
    }
  },
  //生命周期函数
  created() {
    this.address = this.$route.query.address.toLowerCase();
    this.getDetail();
  },
  mounted() {}
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
