<template>
  <div class="contract-detail-wrap">
    <div class="content-top-white contract-detail-top content-padding">
      <div class="page-title fontSize34">
        {{ $t("contract.addressDetail") }}
      </div>
      <div class="detail-change">
        <div class="detail-copy">
          <span>{{ $t("contract.address") }}</span>
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
          <div class="overview">
            <h3 class="Gilroy-Medium">{{ $t("contract.overview") }}</h3>
            <ul>
              <li>
                <label class="Gilroy-Medium">{{
                  $t("contract.balance")
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
                        >{{ $t("contract.restricted") }}</a
                      >)</span
                    >
                  </div>
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{
                  $t("contract.transactions")
                }}</label>
                <div class="money">{{ detailInfo.txQty | formatNumber }}</div>
              </li>
            </ul>
          </div>
        </el-col>
        <div style="width:100px;flex-shrink:0"></div>
        <!-- 其他 -->
        <el-col :span="11">
          <div class="others overview">
            <h3 class="Gilroy-Medium">{{ $t("contract.others") }}</h3>
            <ul>
              <li>
                <label class="Gilroy-Medium"
                  >{{ $t("contract.staking") }}/{{
                    $t("contract.delegations")
                  }}</label
                >
                <div class="money">
                  <!-- TODO! 先用质押的字段 需要合并质押和委托中 -->
                  {{ detailInfo.staking | formatMoney }}&nbsp;LAT
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{
                  $t("contract.unclaimedReward")
                }}</label>
                <div class="money">
                  {{ detailInfo.delegateClaim | formatMoney }}&nbsp;LAT
                </div>
              </li>
              <li>
                <label class="Gilroy-Medium">{{
                  $t("contract.invalidDelegations")
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
      <div class="tabs">
        <el-button
          size="medium"
          :class="{ active: tabIndex == 1 }"
          @click="tabChange(1)"
          >{{ $t("contract.transactions") }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 2 }"
          @click="tabChange(2)"
          >{{ $t("contract.delegations") }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 3 }"
          @click="tabChange(3)"
          >{{ $t("tradeAbout.rewardDetails") }}</el-button
        >
      </div>
      <trade-list
        ref="addressTrade"
        :address="address"
        v-show="tabIndex == 1"
        :tradeCount="detailInfo"
      ></trade-list>
      <!-- 奖励领取明细 -->
      <reward-detail
        v-show="tabIndex == 3"
        ref="rewardDetail"
        :tradeCount="detailInfo"
        :address="address"
      ></reward-detail>
      <div class="address-delegation" v-show="tabIndex == 2">
        <ul>
          <li>
            <span>{{ detailInfo.delegateQty | formatMoney }}</span>
            <p>{{ $t("contract.totalDelegated") }}(LAT)</p>
          </li>
          <li>
            <!-- 总计委托 -->
            <span>{{ detailInfo.candidateCount | formatMoney }}</span>
            <p>{{ $t("deleget.validators") }}</p>
          </li>
          <li>
            <span>{{ detailInfo.delegateLocked | formatMoney }}</span>
            <p>{{ $t("deleget.lockedDelegate") }}(LAT)</p>
          </li>
          <li>
            <span>{{ detailInfo.delegateHes | formatMoney }}</span>
            <p>{{ $t("deleget.unlockedDelegate") }}(LAT)</p>
          </li>
          <!-- <li>
            <span>{{ detailInfo.delegateReleased }}</span>
            <p>{{ $t("deleget.releasedDelegate") }}(LAT)</p>
          </li> -->
          <!-- <li>
                        <span>{{detailInfo.delegateReduction}}</span>
                        <p>{{$t('deleget.undelegating')}}(LAT)</p>
                    </li> -->
        </ul>
      </div>
      <div class="table gray-table" v-show="tabIndex == 2">
        <el-table
          :data="tableData"
          style="width: 100%"
          key="firstTable"
          size="mini"
        >
          <el-table-column :label="$t('nodeInfo.validator')">
            <template slot-scope="scope">
              <div class="flex-special">
                <p
                  class="cursor blue ellipsis percent60"
                  @click="goNodeDetail(scope.row.nodeId)"
                >
                  {{ scope.row.nodeName }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header">
              {{ $t("deleget.delegationAmount") }}
              <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content" class="delegate-msg">
                  {{ $t("deleget.delegationAmountMsg") }}
                </div>
                <i class="address-icon"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.delegateValue | formatMoney }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('deleget.locked')+'\/'+ $t('deleget.percentage')">
                        <template slot-scope="scope">
                            <span>{{scope.row.delegateLocked | formatMoney}}({{scope.row.delegateLocked | percentage(scope.row.allDelegateLocked)}}%)</span>
                        </template>
                    </el-table-column> -->
          <el-table-column>
            <template slot="header">
              {{ $t("deleget.locked") }}
              <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content" class="delegate-msg">
                  {{ $t("deleget.lockedMsg") }}
                </div>
                <i class="address-icon"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.delegateLocked | formatMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header">
              {{ $t("deleget.unlocked") }}
              <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content" class="delegate-msg">
                  {{ $t("deleget.unlockedMsg") }}
                </div>
                <i class="address-icon"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.delegateHas | formatMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header">
              {{ $t("deleget.released") }}
              <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content" class="delegate-msg">
                  {{ $t("deleget.releasedMsg") }}
                </div>
                <i class="address-icon"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.delegateReleased | formatMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header">
              {{ $t("deleget.unclaimedReward") }}
              <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content" class="delegate-msg">
                  {{ $t("deleget.unclaimedRewardMsg") }}
                </div>
                <i class="address-icon"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.delegateClaim | formatMoney }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('deleget.undelegating')">
                        <template slot-scope="scope">
                            <span>{{scope.row.delegateReduction | formatMoney}}</span>
                        </template>
                    </el-table-column> -->
        </el-table>
        <div class="pagination-box">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="sizes,total,  prev, pager, next"
            :total="pageTotal"
            :pager-count="9"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from "@/services/API-services";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

import tradeList from "@/components/trade-list";
import rewardDetail from "@/components/address/rewardDetailTable";
export default {
  name: "contract-detail",
  data() {
    return {
      tabIndex: 1,
      selectIndex: 1,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,

      activeTab: 1,
      address: "",
      detailInfo: {},
      isCopy: false,
      copyText: "",
      haveReward: 0
    };
  },
  props: {},
  computed: {},
  watch: {},
  components: {
    tradeList,
    rewardDetail
  },
  methods: {
    //获取地址信息详情
    getDetail() {
      let param = {
        address: this.address
      };
      apiService.account
        .details(param)
        .then(res => {
          let { errMsg, code, data } = res;
          // console.log(res)
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
    //获取委托列表
    getList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        address: this.address
      };
      apiService.node
        .delegationListByAddress(param)
        .then(res => {
          let {
            data,
            totalPages,
            totalCount,
            code,
            errMsg,
            displayTotalCount
          } = res;
          if (code == 0) {
            this.tableData = data;
            this.pageTotal = totalCount;
            this.displayTotalCount = displayTotalCount;
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
    tabChange(index) {
      this.tabIndex = index;
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getList();
    },
    goNodeDetail(nodeId) {
      this.$router.push({
        path: "/node-detail",
        query: {
          address: nodeId
        }
      });
    },
    goRestricte() {
      this.$router.push({
        path: "/restricting-info",
        query: {
          address: this.address
        }
      });
    }
  },
  //生命周期函数
  created() {
    this.address = this.$route.query.address.toLowerCase();
    this.getDetail();
    this.getList();
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
.address-delegation {
  ul {
    display: flex;
    margin-top: 20px;
    text-align: center;
    li {
      border: 1px solid #e9e9e9;
      border-radius: 2px;
      margin-right: 20px;
      padding: 5px 10px;
      span {
        font-size: 18px;
        font-family: Gilroy-Medium;
      }
      p {
        font-size: 12px;
        color: #999999;
      }
    }
  }
}
.contract-detail-top {
  padding-bottom: 30px;
}
</style>
