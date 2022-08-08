<template>
  <div class="common-trade">
    <div class="address-trade-last space-between-div">
      <span>
        {{ $t('blockAbout.morethen') }} {{ pageTotal }}
        {{ $t('tokens.holders') }}
        <span style="color: #3f3f3f" v-if="pageTotal > 5000">{{
          $t('contract.showingLast')
        }}</span>
      </span>
      <span class="download-btn" @click="exportFn">{{
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
        <!-- 地址 -->
        <el-table-column :label="$t('contract.address')">
          <template slot-scope="scope">
            <router-link
              class="cursor normal ellipsis adr-width"
              :to="getAddressUrl(scope.row.address)"
              >{{ scope.row.address }}</router-link
            >
          </template>
        </el-table-column>
        <el-table-column :label="$t('tokens.number')">
          <template slot-scope="scope">
            {{ scope.row.balance | formatNumber }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('tokens.percentage')">
          <template slot-scope="scope">
            {{ scope.row.percent }}
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
export default {
  data() {
    return {
      selectIndex: 1,
      newRecordFlag: false,
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
    tradeCount: Object,
    tableType: {
      type: String,
      default: 'erc20',
    },
  },
  computed: {},
  watch: {
    $route(to, from) {
      this.$router.go(0);
    },
  },
  components: { IconContract },
  methods: {
    //获取交易列表 下分页
    getTradeList() {
      let param = {
        contract: this.address,
        ercType: this.tableType,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      this.loading = true;
      apiService.tokens
        .tokenHolderList(param)
        .then((res) => {
          let {
            data,
            totalPages,
            totalCount,
            code,
            errMsg,
          } = res;
          if (code == 0) {
            this.tableData = data;
            this.pageTotal = totalCount;
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
    getTokenType(type, lowerCase = true) {
      let Type = {
        INPUT: 'in',
        OUT: 'out',
        NONE: 'none',
        SELF: 'self', // 暂时没有
      };
      return lowerCase ? Type[type] : Type[type].toUpperCase();
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
        path: '/download',
        query: {
          address: this.address,
          tokenType: this.tableType,
          exportname: 'tokenHolderList',
        },
      });
      window.open(href, '_blank');
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
.space-between-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
