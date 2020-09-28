<template>
  <div class="common-trade">
    <div class="address-trade-last">
      {{ $t("blockAbout.morethen") }} {{ pageTotal }}
      {{ $t("contract.transactions") }}
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        key="firstTable"
        size="mini"
      >
        <!-- 交易哈希值 -->
        <el-table-column :label="$t('tradeAbout.hash')" width="200">
          <template slot-scope="scope">
            <div class="flex-special">
              <el-tooltip
                class="item"
                effect="dark"
                placement="bottom-start"
                v-if="scope.row.txReceiptStatus == 0"
              >
                <div slot="content">
                  <span class="title-warning"
                    >{{ $t("tradeAbout.warn") }}：</span
                  >
                  {{
                    scope.row.failReason
                      ? scope.row.failReason
                      : $t("tradeAbout.transactionFailure")
                  }}
                </div>
                <i class="iconfont iconxinxi cursor yellow">&#xe63f;</i>
              </el-tooltip>
              <span
                class="cursor normal ellipsis"
                @click="goTradeDetail(scope.row.txHash)"
              >
                <!-- txHash 显示0x + 18 -->
                {{ scope.row.txHash | sliceStr(20) }}
              </span>
            </div>
          </template>
        </el-table-column>

        <!-- 块龄 -->
        <el-table-column :label="$t('tradeAbout.age')" width="300">
          <template slot-scope="scope">
            <span>
              {{ timeDiffFn(scope.row.blockTimestamp)
              }}{{ $t("tradeAbout.before") }}
            </span>
          </template>
        </el-table-column>

        <!-- From 操作地址（Operator_Address） -->
        <el-table-column :label="$t('tokens.from')">
          <template slot-scope="scope">
            <div class="flex-special">
              <!-- 操作地址：即签名交易的地址，显示0x+14 -->
              <span
                class="cursor normal ellipsis ellipsisWidth"
                @click="goAddressDetail(scope.row.txFrom)"
                >{{ scope.row.txFrom | sliceStr(16) }}</span
              >
            </div>
          </template>
        </el-table-column>

        <!--To 操作地址（Operator_Address） -->
        <el-table-column :label="$t('tokens.to')">
          <template slot-scope="scope">
            <div class="flex-special">
              <!-- 操作地址：即签名交易的地址，显示0x+14 -->
              <span
                class="cursor normal ellipsis ellipsisWidth"
                @click="goAddressDetail(scope.row.transferTo)"
                >{{ scope.row.transferTo | sliceStr(16) }}</span
              >
            </div>
          </template>
        </el-table-column>
        <template v-if="type === 'detail'">
          <!-- 数额(Value) -->
          <el-table-column label="Quantity">
            <template slot-scope="scope">
              <span>Quantity</span>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <!-- 数额(Value) -->
          <el-table-column :label="$t('tokens.value')" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.value | formatMoney }} LAT</span>
            </template>
          </el-table-column>

          <!-- token 名称+单位 -->
          <el-table-column :label="$t('tokens.token')" show-overflow-tooltip>
            <template slot-scope="scope">
              <span
                class="cursor normal ellipsis ellipsisWidth"
                @click="goTokenDetail(scope.row.contract)"
                >{{ `${scope.row.name}  (${scope.row.symbol})` }}</span
              >
            </template>
          </el-table-column>
        </template>
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
          :pager-count="9"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from "@/services/API-services";
import { timeDiff } from "@/services/time-services";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      selectIndex: 1,
      newRecordFlag: false,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      tradeTotal: 0,
      tradeType: ""
    };
  },
  props: {
    address: String,
    type: {
      type: String,
      default: "none"
    },
    tradeCount: Object
  },
  computed: {},
  watch: {},
  components: {},
  methods: {
    //获取交易列表 下分页
    getTradeList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        address: this.address
      };
      console.info("获取交易列表（参数）》》》", param);
      // apiService.trade.transactionList(param);
      apiService.token
        .tokenTransferList(param)
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
    timeDiffFn(beginTime, endTime = Date.now()) {
      return timeDiff(beginTime, endTime);
    },
    exportFn() {
      //跳转至下载页
      const { href } = this.$router.resolve({
        path: "/download",
        query: {
          address: this.address,
          exportname: "account"
        }
      });
      window.open(href, "_blank");
    },
    goTradeDetail(hash) {
      this.$router.push({
        path: "/trade-detail",
        query: {
          txHash: hash
        }
      });
    },
    goAddressDetail(address) {
      this.$router.push({
        path: "/address-detail",
        query: {
          address: address
        }
      });
    },
    goTokenDetail(address) {
      this.$router.push({
        path: "/tokens-detail",
        query: {
          address: address
        }
      });
    },
    //进入区块详情
    goBlockDetail(blockHeight) {
      this.$router.push({
        path: "/block-detail",
        query: {
          height: blockHeight
        }
      });
    }
  },
  //生命周期函数
  created() {
    this.getTradeList();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.block-trade .common-trade.block-trade-wrap {
  padding-left: 0px;
  .pagination-box {
    padding-bottom: 60px;
    margin-right: 30px;
  }
  .table .el-table th {
    padding-left: 30px;
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
</style>
<style lang="less">
.block-trade-wrap {
  .table .el-table {
    th {
      padding-left: 20px;
    }
    td {
      padding-left: 20px;
    }
  }
}
</style>
