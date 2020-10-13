<template>
  <div>
    <div class="address-trade-last">
      <!-- 总计代币交易数量 -->
      {{ $t('blockAbout.morethen') }} {{ tradeTotal }}
      {{ $t('tradeAbout.tokens') }}
    </div>
    <div class="table">
      <el-table
        :data="tradeTableData"
        style="width: 100%"
        key="secondTable"
        size="mini"
      >
        <!-- 交易哈希值 -->
        <el-table-column :label="$t('tradeAbout.hash')" width="200">
          <template slot-scope="scope">
            <div class="flex-special">
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
              {{
                timeDiffFn(scope.row.blockTimestamp, scope.row.systemTimestamp)
              }}{{ $t('tradeAbout.before') }}
            </span>
          </template>
        </el-table-column>

        <!-- From 操作地址（Operator_Address） -->
        <el-table-column :label="$t('tokens.from')">
          <template slot-scope="scope">
            <div class="flex-special">
              <!-- 操作地址：即签名交易的地址，显示0x+14 -->
              <icon-contract
                v-if="isContract(scope.row.fromType)"
                :active="scope.row.type !== 'OUT'"
              ></icon-contract>
              <span
                class="ellipsis ellipsisWidth"
                v-if="scope.row.type === 'OUT'"
                >{{ scope.row.txFrom | sliceStr(16) }}</span
              >
              <span
                v-else
                class="cursor normal ellipsis ellipsisWidth"
                @click="goAddressDetail(scope.row.txFrom, scope.row.fromType)"
                >{{ scope.row.txFrom | sliceStr(16) }}</span
              >
            </div>
          </template>
        </el-table-column>

        <!-- 交易方向type, INPUT 进账，OUT 出账，NONE 无方向 -->
        <af-table-column label="" width="70px">
          <template slot-scope="scope">
            <span
              v-if="['INPUT', 'OUT'].includes(scope.row.type)"
              class="tokens-type"
              :class="'tokens-type--' + getTokenType(scope.row.type)"
              >{{ getTokenType(scope.row.type, false) }}</span
            >
            <div v-else class="tokens-arrow fr">
              <img class="arrow-icon" src="@/assets/images/arrow-right.svg" />
            </div>
          </template>
        </af-table-column>

        <!--To 操作地址（Operator_Address） -->
        <el-table-column :label="$t('tokens.to')">
          <template slot-scope="scope">
            <div class="flex-special">
              <!-- 操作地址：即签名交易的地址，显示0x+14 -->
              <icon-contract
                v-if="isContract(scope.row.toType)"
                :active="scope.row.type !== 'INPUT'"
              ></icon-contract>
              <span
                class="ellipsis ellipsisWidth"
                v-if="scope.row.type === 'INPUT'"
                >{{ scope.row.transferTo | sliceStr(16) }}</span
              >
              <span
                v-else
                class="cursor normal ellipsis ellipsisWidth"
                @click="goAddressDetail(scope.row.transferTo, scope.row.toType)"
                >{{ scope.row.transferTo | sliceStr(16) }}</span
              >
            </div>
          </template>
        </el-table-column>
        <template v-if="tableType === 'detail'">
          <!-- 转账金额(Quantity) -->
          <el-table-column :label="$t('tokens.quantity')">
            <template slot-scope="scope">
              <span>{{ scope.row.transferValue | formatMoney }} </span>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <!-- 数额(Value) -->
          <el-table-column :label="$t('tokens.value')" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.transferValue | formatMoney }} </span>
            </template>
          </el-table-column>

          <!-- tokens 名称+单位 -->
          <el-table-column :label="$t('tokens.unit')" show-overflow-tooltip>
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
import apiService from '@/services/API-services';
import IconContract from '@/components/common/icon-contract';
import { timeDiff } from '@/services/time-services';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: '',
  data() {
    return {
      selectIndex: 1,
      newRecordFlag: false,
      balanceTableData: [],
      tradeTableData: [],
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
    //获取交易列表 下分页
    getTradeList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      let key = this.tableType === 'none' ? 'address' : 'contract';
      param[key] = this.address;
      console.info('获取交易列表（参数）》》》', param);
      // apiService.trade.transactionList(param);
      apiService.tokens
        .tokenTransferList(param)
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
          exportname: 'account',
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