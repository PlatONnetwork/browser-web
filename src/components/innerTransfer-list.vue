<template>
  <div class="common-trade">
    <div class="address-trade-last">
      {{ $t('blockAbout.morethen') }} {{ this.tradeTotal }}
      {{ $t('contract.transactions') }}
      <span style="color: #3f3f3f" v-if="this.tradeTotal > 5000">{{
          $t('contract.showingLast')
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
                :to="getTradeUrl(scope.row.hash)"
              >
                <!-- txHash 显示0x + 18 -->
                {{ scope.row.hash }}
              </router-link>
            </div>
          </template>
        </el-table-column>

        <!-- 块高 -->
        <el-table-column
          prop="blockHeight"
          :label="$t('tradeAbout.block')"
        >
          <template slot-scope="scope">
            <router-link
              class="cursor blue"
              :to="getBlockUrl(scope.row.bn)"
            >{{ scope.row.bn }}</router-link
            >
          </template>
        </el-table-column>

        <!-- From 转账发起人地址 -->
        <el-table-column :label="$t('tradeAbout.from')">
          <template slot-scope="scope">
            <div class="flex-special">
              <!-- 操作地址：即签名交易的地址，显示0x+14 -->
              <router-link class="cursor normal ellipsis adr-width" :to="getAddressUrl(scope.row.from, scope.row.fromType)">{{ scope.row.from }}</router-link>
            </div>
          </template>
        </el-table-column>

        <!-- To 转账接收人地址 -->
        <el-table-column :label="$t('tradeAbout.to')">
          <template slot-scope="scope">
            <div class="flex-special">
              <!-- 操作地址：即签名交易的地址，显示0x+14 -->
              <router-link class="cursor normal ellipsis adr-width" :to="getAddressUrl(scope.row.to, scope.row.toType)">{{ scope.row.to }}</router-link>
            </div>
          </template>
        </el-table-column>

        <!-- 交易类型 -->
        <el-table-column :label="$t('tradeAbout.type')" min-width="100">
          <template slot-scope="scope">
            <span
              :class="{
                green:
                  (scope.row.from != address),
              }"
              class="red Gilroy-Bold"
            >
              <!-- 接受还是发送 todo -->
              <template>{{
                  scope.row.from == address
                    ? $t('tradeAbout.sender2')
                    : $t('tradeAbout.recipient2')
                }}</template>
            </span>
          </template>
        </el-table-column>

        <!-- 价值 -->
        <el-table-column :label="$t('tradeAbout.value')">
          <template slot-scope="scope">
            <span>{{ scope.row.value | fromWei(18) | formatMoney }} LAT</span>
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
import IconContract from '@/components/common/icon-contract';
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
      loading: false,
    };
  },
  props: {
    address: String,
  },
  computed: {},
  watch: {},
  components: { IconContract },
  methods: {
    //获取交易列表 下分页
    getInnerTransferList(pageNo) {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        address: this.address,
      };
      if (pageNo) {
        param.pageNo = pageNo;
      }
      let methodName = 'listByOwnerAddress';
      this.loading = true;
      apiService.innerTransfer[methodName](param)
        .then((res) => {
          let { data, totalPages, totalCount, code, errMsg } = res;
          if (code == 0) {
            this.tableData = data;
            // 返回的总条数不能用
            this.pageTotal = totalCount; // || totalCount
            this.tradeTotal = totalCount;
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
      this.getInnerTransferList();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getInnerTransferList();
    },
  },
  //生命周期函数
  created() {
    this.getInnerTransferList();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.common-trade.block-trade-wrap {
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

