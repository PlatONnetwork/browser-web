<template>
  <div class="common-trade" :class="{ 'block-trade-wrap': type == 'block' }">
    <div class="address-trade-last" v-if="type != 'block'">
      {{ $t('blockAbout.morethen') }} {{ tradeCount.txQty }}
      {{ $t('contract.transactions') }}
      <span style="color: #3f3f3f" v-if="tradeCount.txQty > 5000">{{
        $t('contract.showingLast')
      }}</span>
    </div>

    <!-- 分类筛选tab -->
    <div class="trade-tab-wrap">
      <ul class="trade-tab">
        <li
          :class="{ active: selectIndex == 1 }"
          index="1"
          @click="typeChange(1, '')"
        >
          {{ $t('contract.all') }}
        </li>
        <li
          :class="{ active: selectIndex == 2 }"
          index="2"
          @click="typeChange(2, 'transfer')"
        >
          {{ $t('contract.transfers') }}({{ tradeCount.transferQty }})
        </li>
        <li
          :class="{ active: selectIndex == 3 }"
          index="3"
          @click="typeChange(3, 'delegate')"
        >
          {{ $t('contract.delegationsTxns') }}({{ tradeCount.delegateQty }})
        </li>
        <li
          :class="{ active: selectIndex == 4 }"
          index="4"
          @click="typeChange(4, 'staking')"
        >
          {{ $t('contract.validatorTxns') }}({{ tradeCount.stakingQty }})
        </li>
        <li
          :class="{ active: selectIndex == 5 }"
          index="5"
          @click="typeChange(5, 'proposal')"
        >
          {{ $t('contract.governanceTxns') }}({{ tradeCount.proposalQty }})
        </li>
      </ul>
      <!-- <el-button size="medium" v-if="type!='block'" @click="exportFn">{{$t('common.export')}}</el-button> -->
      <span class="download-btn" v-if="type != 'block'" @click="exportFn">{{
        $t('common.export')
      }}</span>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        key="firstTable"
        size="mini"
        v-loading="loading"
      >
        <!-- 交易哈希值 -->
        <el-table-column :label="$t('tradeAbout.hash')" min-width="200">
          <template slot-scope="scope">
            <!-- <div class="flex-special">
              <el-tooltip
                class="item"
                effect="dark"
                placement="bottom"
                v-if="scope.row.txReceiptStatus==0"
              >
                <div slot="content">
                  <span class="title-warning"></span>
                  {{scope.row.failReason?scope.row.failReason:$t("tradeAbout.transactionFailure")}}
                </div>
                <i class="iconfont iconxinxi cursor yellow">&#xe63f;</i>
              </el-tooltip>
              <p
                class="cursor blue ellipsis percent60"
                @click="goTradeDetail(scope.row.txHash)"
              >&nbsp;{{scope.row.txHash}}</p>
            </div> -->
            <div class="flex-special">
              <el-tooltip
                class="item"
                effect="dark"
                placement="bottom-start"
                v-if="scope.row.txReceiptStatus == 0"
              >
                <div slot="content">
                  <span class="title-warning"
                    >{{ $t('tradeAbout.warn') }}：</span
                  >
                  {{
                    scope.row.failReason
                      ? scope.row.failReason
                      : $t('tradeAbout.transactionFailure')
                  }}
                </div>
                <i class="iconfont iconxinxi cursor yellow">&#xe63f;</i>
              </el-tooltip>
              <router-link
                class="cursor normal ellipsis hash-width"
                :to="getTradeUrl(scope.row.txHash)"
              >
                <!-- txHash 显示0x + 18 -->
                {{ scope.row.txHash }}
              </router-link>
            </div>
          </template>
        </el-table-column>

        <!-- 操作地址 -->
        <el-table-column
          :label="$t('blockAbout.operatorAddress')"
          min-width="150"
          v-if="type == 'block'"
        >
          <!-- <template slot-scope="scope">
            <p
              class="cursor blue ellipsis percent60"
              @click="goAddressDetail(scope.row.from)"
            >{{scope.row.from}}</p>
          </template> -->
          <template slot-scope="scope">
            <div class="flex-special">
              <!-- 操作地址显示 0x + 14 -->
              <router-link
                class="cursor blue ellipsis adr-width"
                :to="getAddressUrl(scope.row.from)"
                >{{ scope.row.from }}</router-link
              >
            </div>
          </template>
        </el-table-column>

        <!-- 块高 -->
        <el-table-column
          prop="blockHeight"
          :label="$t('tradeAbout.block')"
          v-if="type != 'block'"
        >
          <template slot-scope="scope">
            <router-link
              class="cursor blue"
              :to="getBlockUrl(scope.row.blockNumber)"
              >{{ scope.row.blockNumber }}</router-link
            >
          </template>
        </el-table-column>

        <!-- 确认时间 -->
        <el-table-column
          :label="$t('tradeAbout.confirmTime')"
          v-if="type != 'block'"
          min-width="200"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | formatTime }}</span>
          </template>
        </el-table-column>

        <!-- 交易类型 -->
        <el-table-column :label="$t('tradeAbout.type')" min-width="100">
          <template slot-scope="scope">
            <span
              :class="{
                green:
                  scope.row.txType == '1005' ||
                  scope.row.txType == '1006' ||
                  scope.row.txType == '1003' ||
                  scope.row.txType == '5000' ||
                  scope.row.txType == '3000' ||
                  (scope.row.txType == '0' && scope.row.from != address),
              }"
              class="red Gilroy-Bold"
            >
              <!-- 接受还是发送 todo -->
              <template v-if="type != 'block' && scope.row.txType == '0'">{{
                scope.row.from == address
                  ? $t('tradeAbout.sender2')
                  : $t('tradeAbout.recipient2')
              }}</template>
              <template v-else>
                {{ $t('TxType.' + [scope.row.txType]) }}
              </template>
            </span>
          </template>
        </el-table-column>

        <!-- 价值 -->
        <el-table-column :label="$t('tradeAbout.value')">
          <template slot-scope="scope">
            <span>{{ scope.row.value | formatMoney }} LAT</span>
          </template>
        </el-table-column>

        <!-- 交易费用 -->
        <el-table-column min-width="120">
          <!-- :label="$t('tradeAbout.fee')" prop="actualTxCost" -->
          <template slot="header">
            {{ $t('tradeAbout.fee') }}
            <span style="color: #999999">(LAT)</span>
          </template>
          <template slot-scope="scope">
            {{ scope.row.actualTxCost }}
          </template>
        </el-table-column>
      </el-table>

      <!-- 下分页 -->
      <div class="pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="sizes,total,  prev, pager, next"
          :total="pageTotal > 5000 ? 5000 : pageTotal"
          :pager-count="windowWidth < 750 ? 5 : 9"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from '@/services/API-services';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: '',
  data() {
    return {
      selectIndex: 1,
      // newRecordFlag: false,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      tradeTotal: 0,
      tradeType: '',
      loading: false,
    };
  },
  props: {
    address: String,
    type: String,
    tradeCount: Object,
  },
  computed: {},
  watch: {},
  components: {},
  methods: {
    //获取交易列表 下分页
    getTradeList(pageNo) {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        txType: this.tradeType,
      };
      if (pageNo) {
        param.pageNo = pageNo;
      }
      let methodName = '';
      if (this.type == 'block') {
        param.blockNumber = this.address;
        methodName = 'transactionListByBlock';
      } else {
        param.address = this.address;
        methodName = 'transactionListByAddress';
      }
      this.loading = true;
      apiService.trade[methodName](param)
        .then((res) => {
          let { data, totalPages, totalCount, code, errMsg } = res;
          if (code == 0) {
            this.tableData = data;
            // 返回的总条数不能用
            this.pageTotal = totalCount; // || totalCount
            if (!this.tradeType) {
              this.tradeTotal = totalCount; //此总数并非数据库交易记录总数
            }
            // //判断最新记录是否显示  总数
            // this.tradeCount.txQty > 5000
            //   ? (this.newRecordFlag = true)
            //   : (this.newRecordFlag = false)
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTradeList();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getTradeList();
    },
    typeChange(index, type) {
      this.selectIndex = index;
      this.tradeType = type;

      this.currentPage = 1;
      this.getTradeList();
    },
    exportFn() {
      //跳转至下载页
      const { href } = this.$router.resolve({
        path: '/download',
        query: {
          address: this.address,
          exportname: "account"
        }
      })
      window.open(href, "_blank")
    }
  },
  //生命周期函数
  created() {
    this.getTradeList();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.block-trade .common-trade.block-trade-wrap {
  padding-left: 0px;
  .pagination-box {
    padding-bottom: 60px;
    margin-right: 30px;
  }
  /deep/ .table .el-table{
    th, td {
      &:first-child {
        padding-left: 20px;
      }
    }
  }
  .trade-tab-wrap {
    padding-left: 30px;
  }
}
.download-btn {
  border: 1px solid #0798de;
  border-radius: 2px;
  padding: 8px 7px;
  font-size: 14px;
  color: #0798de;
  letter-spacing: 0;
  cursor: pointer;
  font-family: Gilroy-Medium;
  white-space: nowrap;
  height: 37px;
  &:hover {
    color: #5cb2db;
    border: 1px solid #5cb2db;
  }
  &:active {
    color: #0e52ac;
    border: 1px solid #0e52ac;
  }
}
.active {
  font-family: Gilroy-Medium;
}
.iconxinxi {
  font-size: 14px;
  margin-right: 5px;
}
.title-warning {
  color: #ffc017;
}

@media (max-width: 750px) {
  .common-trade {
    .trade-tab-wrap {
      .trade-tab {
        flex-wrap: wrap;
        ul {
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
