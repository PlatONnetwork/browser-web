<template>
  <div class="common-trade">
    <div class="address-trade-last space-between-div">
      <span>
        {{ $t('blockAbout.morethen') }} {{ pageTotal }}
        {{ $t('tokens.holder') }}
      </span>
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
      >
        <!-- 地址 -->
        <el-table-column :label="$t('contract.address')" width="600">
          <template slot-scope="scope">
            <span
              class="cursor normal ellipsis"
              @click="goAddressDetail(scope.row.address)"
              >{{ scope.row.address }}</span
            >
          </template>
        </el-table-column>
        <el-table-column :label="$t('tokens.number')" width="300">
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
          :pager-count="9"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from '@/services/API-services';
console.log(apiService.tokens);
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
    };
  },
  props: {
    address: String,
    tableType: {
      type: String,
      default: 'none',
    },
    tradeCount: Object,
  },
  computed: {},
  watch: {
    $route(to, from) {
      this.$router.go(0);
    },
  },
  components: { IconContract },
  methods: {
    //进入钱包地址详情
    goAddressDetail(adr) {
      this.$router.push({
        path: '/address-detail',
        query: {
          address: adr,
        },
      });
    },
    //获取交易列表 下分页
    getTradeList() {
      let param = {
        contract: this.address,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      let key = this.tableType === 'none' ? 'address' : 'contract';
      param[key] = this.address;
      console.info('获取交易列表（参数）》》》', param);
      // apiService.trade.transactionList(param);
      apiService.tokens
        .tokenHolderList(param)
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
          exportname: 'tokenHolderList',
        },
      });
      window.open(href, '_blank');
    },
    goTradeDetail(hash) {
      this.$router.push({
        path: '/trade-detail',
        query: {
          txHash: hash,
        },
      });
    },
    // 判断是否是合约
    isContract(type) {
      return [2, 3, 4, 5].includes(type);
    },
    goAddressDetail(address, type = 0) {
      let path = this.isContract(type) ? '/contract-detail' : '/address-detail';
      this.$router.push({
        path,
        query: {
          address: address,
        },
      });
    },
    goTokenDetail(address) {
      this.$router.push({
        path: '/tokens-detail',
        query: {
          address: address,
        },
      });
    },
    //进入区块详情
    goBlockDetail(blockHeight) {
      this.$router.push({
        path: '/block-detail',
        query: {
          height: blockHeight,
        },
      });
    },
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
