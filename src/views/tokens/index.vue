<template>
  <div class="trade-list-wrap">
    <div class="page-title fontSize34">
      {{ $t("tokens.tokens") }}
    </div>
    <div class="sub-title">
      <!-- 暂时不要 <div class="fontSize14 trade-count">
        <template v-if="pageTotal > 500000">
          {{ $t("tradeAbout.morethen") }}>
        </template>
        <template v-else>
          {{ $t("tradeAbout.morethen2") }}
        </template>
        <b class="black">{{ pageTotal }}</b>
        {{ $t("tradeAbout.foundTransactions") }}
        <span v-if="pageTotal > 500000">{{
          $t("tradeAbout.showingLast")
        }}</span>
      </div> -->
      <!-- 上部分页标签 -->
      <div class="pagination-box1">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="pageTotal > 500000 ? 500000 : pageTotal"
          :pager-count="9"
        ></el-pagination>
      </div>
    </div>
    <!-- 主表格区域 -->
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        key="firstTable"
        size="mini"
      >
        <!-- 交易哈希值（TxHash） -->
        <el-table-column :label="$t('tradeAbout.hash')">
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
                <i class="iconfont iconxinxi cursor">&#xe63f;</i>
              </el-tooltip>
              <!-- <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">{{scope.row.txHash}}</div>
                            <span class='cursor normal ellipsis' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
              </el-tooltip>-->

              <!-- 交易hash: 显示0x+18 -->
              <span
                class="cursor normal ellipsis"
                @click="goTradeDetail(scope.row.txHash)"
                >{{ scope.row.txHash | sliceStr(20) }}</span
              >
            </div>
            <!-- <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span> -->
          </template>
        </el-table-column>

        <!-- 区块（Block） -->
        <el-table-column :label="$t('tradeAbout.block')">
          <template slot-scope="scope">
            <span
              class="cursor normal"
              @click="goBlockDetail(scope.row.blockNumber)"
              >{{ scope.row.blockNumber }}</span
            >
          </template>
        </el-table-column>

        <!-- 块龄（Age） -->
        <el-table-column :label="$t('tradeAbout.age')">
          <template slot-scope="scope">
            <span
              >{{
                timeDiffFn(scope.row.blockTimestamp, scope.row.systemTimestamp)
              }}{{ $t("tradeAbout.before") }}</span
            >
          </template>
        </el-table-column>

        <!-- From 操作地址（Operator_Address） -->
        <el-table-column :label="$t('tokens.from')">
          <template slot-scope="scope">
            <!-- <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span> -->
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

        <el-table-column label="" width="40px">
          <template slot-scope="scope">
            <div class="token-arrow">
              <img
                class="arrow-icon"
                src="@/assets/images/arrow-right.svg"
                alt=""
                srcset=""
              />
            </div>
          </template>
        </el-table-column>

        <!--To 操作地址（Operator_Address） -->
        <el-table-column :label="$t('tokens.to')">
          <template slot-scope="scope">
            <!-- <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span> -->
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

        <!-- 数额(Value) -->
        <el-table-column :label="$t('tokens.value')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.transferValue | formatMoney }} LAT</span>
          </template>
        </el-table-column>

        <!-- token 名称+单位 -->
        <el-table-column :label="$t('tokens.token')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              class="cursor normal"
              @click="goTokenDetail(scope.row.contract)"
              >{{ `${scope.row.name}  (${scope.row.symbol})` }}</span
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 表格下方分页标签 -->
      <div class="pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="sizes,total,  prev, pager, next"
          :total="pageTotal > 500000 ? 500000 : pageTotal"
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
  name: "tokensListComponent",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      displayTotalCount: 0
    };
  },
  props: {},
  computed: {},
  watch: {},
  components: {},
  methods: {
    //获取交易列表 下分页
    getTradeList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize
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
    timeDiffFn(beginTime, endTime = Date.now()) {
      return timeDiff(beginTime, endTime);
    },
    replace() {
      this.$router.replace({
        query: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTradeList();
      this.replace();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getTradeList();
      this.replace();
    },
    //进入区块详情
    goBlockDetail(height) {
      console.warn("进入区块", height);
      this.$router.push({
        path: "/block-detail",
        query: {
          height: height
        }
      });
    },
    //进入交易哈希详情
    goTradeDetail(hash) {
      this.$router.push({
        path: "/trade-detail",
        query: {
          txHash: hash
          // currentPage: this.currentPage,
          // pageSize: this.pageSize
        }
      });
    },
    //进入钱包地址详情
    goAddressDetail(adr) {
      this.$router.push({
        path: "/address-detail",
        query: {
          address: adr
          // description: "trade",
          // currentPage: this.currentPage,
          // pageSize: this.pageSize
        }
      });
    },
    //进入token详情
    goTokenDetail(address) {
      this.$router.push({
        path: "/tokens-detail",
        query: {
          address: address
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (from.path.indexOf("-detail") == -1) {
        // 不取缓存
        vm.currentPage = 1;
        vm.pageSize = 20;
        if (vm.$route.query.currentPage) {
          vm.currentPage = vm.$route.query.currentPage - 0;
          vm.pageSize = vm.$route.query.pageSize - 0;
        }
        vm.getTradeList();
      }
    });
  },
  //生命周期函数
  created() {
    if (this.$route.query.currentPage) {
      this.currentPage = this.$route.query.currentPage - 0;
      this.pageSize = this.$route.query.pageSize - 0;
    }
    this.getTradeList();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.title-warning {
  color: #ffc017;
}
.sub-title {
  display: flex;
  justify-content: flex-end;
}
.trade-count {
  color: #333;
}
.iconxinxi {
  color: #ffc017;
  margin-right: 5px;
  font-size: 14px;
}
.token-arrow {
  width: 20px;
  padding: 2px 4px;
  border-radius: 8px;
  color: #00c9a7;
  background: rgba(0, 201, 167, 0.1);
  .arrow-icon {
    width: 12px;
  }
}
</style>