<template>
  <div class="trade-list-wrap">
    <div class="page-title fontSize34">
      {{ $t('tradeAbout.transactionUp') }}
    </div>
    <div class="sub-title">
      <div class="fontSize14 trade-count">
        <template v-if="pageTotal > 500000">
          {{ $t('tradeAbout.morethen') }}>
        </template>
        <template v-else>
          {{ $t('tradeAbout.morethen2') }}
        </template>
        <b class="black">{{ pageTotal }}</b>
        {{ $t('tradeAbout.foundTransactions') }}
        <span v-if="pageTotal > 500000">{{
          $t('tradeAbout.showingLast')
        }}</span>
      </div>
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
          :pager-count="windowWidth < 750 ? 5 : 9"
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
        v-loading="loading"
      >
        <!-- 交易哈希值（TxHash） -->
        <el-table-column :label="$t('tradeAbout.hash')" min-width="150px">
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
                    >{{ $t('tradeAbout.warn') }}：</span
                  >
                  {{
                    scope.row.failReason
                      ? scope.row.failReason
                      : $t('tradeAbout.transactionFailure')
                  }}
                </div>
                <i class="iconfont iconxinxi cursor">&#xe63f;</i>
              </el-tooltip>
              <!-- <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">{{scope.row.txHash}}</div>
                            <span class='cursor normal ellipsis' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
              </el-tooltip>-->

              <!-- 交易hash: 显示0x+18 -->
              <router-link
                class="cursor normal ellipsis hash-width"
                :to="getTradeUrl(scope.row.txHash)"
                >{{ scope.row.txHash }}</router-link
              >
            </div>
            <!-- <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span> -->
          </template>
        </el-table-column>

        <!-- 区块（Block） -->
        <el-table-column :label="$t('tradeAbout.block')">
          <template slot-scope="scope">
            <router-link
              class="cursor normal"
              :to="getBlockUrl(scope.row.blockNumber)"
              >{{ scope.row.blockNumber }}</router-link
            >
          </template>
        </el-table-column>

        <!-- 块龄（Age） -->
        <el-table-column :label="$t('tradeAbout.age')">
          <template slot-scope="scope">
            <span
              >{{ timeDiffFn(scope.row.serverTime, scope.row.timestamp)
              }}{{ $t('tradeAbout.before') }}</span
            >
          </template>
        </el-table-column>

        <!-- 操作地址（Operator_Address） -->
        <el-table-column :label="$t('blockAbout.operatorAddress')" min-width="150">
          <template slot-scope="scope">
            <!-- <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span> -->
            <div class="flex-special">
              <!-- 操作地址：即签名交易的地址，显示0x+14 -->
              <router-link
                class="cursor normal ellipsis adr-width"
                :to="getAddressUrl(scope.row.from)"
                >{{ scope.row.from }}</router-link
              >
            </div>
          </template>
        </el-table-column>

        <!-- 交易类型（Type） -->
        <el-table-column :label="$t('tradeAbout.type')">
          <template slot-scope="scope">
            <span>{{ $t('TxType.' + scope.row.txType) }}</span>
            <!-- <span>{{scope.row.txType}}</span> -->
          </template>
        </el-table-column>

        <!-- 数额(Value) -->
        <el-table-column :label="$t('tradeAbout.value')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.value | formatMoney }} LAT</span>
          </template>
        </el-table-column>

        <!-- 交易费用（TxFee） -->
        <el-table-column show-overflow-tooltip width="120">
          <template slot="header">
            {{ $t('tradeAbout.fee') }}
            <span style="color: #999999">(LAT)</span>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.actualTxCost | formatMoney }}</span>
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
          :pager-count="windowWidth < 750 ? 5 : 9"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from '@/services/API-services';
import { timeDiff } from '@/services/time-services';

export default {
  name: 'trade-list',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      displayTotalCount: 0,
      loading: false,
      isLoaded: false,
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
        pageSize: this.pageSize,
      };
      this.loading = true;
      apiService.trade
        .transactionList(param)
        .then((res) => {
          let {
            data,
            totalPages,
            totalCount,
            code,
            errMsg,
            displayTotalCount,
          } = res;
          if (code == 0) {
            this.tableData = data;
            this.pageTotal = totalCount;
            this.displayTotalCount = displayTotalCount;
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
    timeDiffFn(beginTime, endTime = Date.now()) {
      return timeDiff(beginTime, endTime);
    },
    replace() {
      this.$router.replace({
        query: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
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
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      if (from.path.indexOf('-detail') == -1) {
        // 不取缓存
        vm.currentPage = 1;
        vm.pageSize = 20;
        if (vm.$route.query.currentPage) {
          vm.currentPage = vm.$route.query.currentPage - 0;
          vm.pageSize = vm.$route.query.pageSize - 0;
        }
        if (vm.isLoaded){
          vm.isLoaded = false;
          return
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
    this.isLoaded = true;
    this.getTradeList();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.title-warning {
  color: #ffc017;
}
.sub-title {
  display: flex;
  justify-content: space-between;
}
.trade-count {
  color: #333;
}
.iconxinxi {
  color: #ffc017;
  margin-right: 5px;
  font-size: 14px;
}
</style>
