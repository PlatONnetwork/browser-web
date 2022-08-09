<template>
  <div class="common-trade">
    <div class="address-trade-last space-between-div">
      <span class="lineheight-with-btn">
        <!-- 总计代币交易数量 -->
        {{ $t('blockAbout.morethen') }} {{ tradeCount.txCount }}
        {{ $t('tradeAbout.tokens') }}
        <span style="color: #3f3f3f" v-if="tradeCount.txCount > 5000">{{
          $t('contract.showingLast')
        }}</span>
      </span>
      <span class="download-btn" @click="exportFn">{{
        $t('common.export')
      }}</span>
    </div>
    <div class="table">
      <el-table
        :data="tradeTableData"
        style="width: 100%"
        key="secondTable"
        size="mini"
        v-loading="loading"
      >
        <!-- 交易哈希值 -->
        <el-table-column :label="$t('tradeAbout.hash')" min-width="180">
          <template slot-scope="scope">
            <div class="flex-special">
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

        <!-- 块龄 -->
        <el-table-column :label="$t('tradeAbout.age')" min-width="120">
          <template slot-scope="scope">
            <span>
              {{
                timeDiffFn(scope.row.blockTimestamp, scope.row.systemTimestamp)
              }}{{ $t('tradeAbout.before') }}
            </span>
          </template>
        </el-table-column>

        <!-- From 操作地址（Operator_Address） -->
        <el-table-column :label="$t('tokens.from')" min-width="150">
          <template slot-scope="scope">
            <div class="flex-special">
              <!-- 操作地址：即签名交易的地址，显示0x+14 -->
              <icon-contract
                v-if="isContract(scope.row.fromType)"
                :active="scope.row.type !== 'OUT'"
              ></icon-contract>
              <span
                class="ellipsis adr-width"
                v-if="scope.row.type === 'OUT'"
                >{{ scope.row.txFrom }}</span
              >
              <router-link
                v-else
                class="cursor normal ellipsis adr-width"
                :to="getAddressUrl(scope.row.txFrom, scope.row.fromType)"
                >{{ scope.row.txFrom }}</router-link
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
        <el-table-column :label="$t('tokens.to')" min-width="150">
          <template slot-scope="scope">
            <div class="flex-special">
              <!-- 操作地址：即签名交易的地址，显示0x+14 -->
              <icon-contract
                v-if="isContract(scope.row.toType)"
                :active="scope.row.type !== 'INPUT'"
              ></icon-contract>
              <span
                class="ellipsis adr-width"
                v-if="scope.row.type === 'INPUT'"
                >{{ scope.row.transferTo }}</span
              >
              <router-link
                v-else
                class="cursor normal ellipsis adr-width"
                :to="getAddressUrl(scope.row.transferTo, scope.row.toType)"
                >{{ scope.row.transferTo }}</router-link
              >
            </div>
          </template>
        </el-table-column>
        <template v-if="tableType === 'erc20'">
          <!-- 转账金额(Quantity) -->
          <el-table-column :label="$t('tokens.quantity')">
            <template slot-scope="scope">
              <span>{{ scope.row.transferValue | formatMoney }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="tableType === 'erc721'">
          <!-- 令牌ID -->
          <el-table-column :label="$t('tokens.tokenID')"  min-width="120">
            <template slot-scope="scope">
              <router-link
                class="cursor normal ellipsis ellipsisWidth"
                :title="scope.row.tokenId"
                :to="get721IdUrl(scope.row.contract, scope.row.tokenId)"
                >{{ scope.row.tokenId }}</router-link
              >
            </template>
          </el-table-column>
        </template>

        <template v-else-if="tableType === 'erc1155' || tableType === 'erc1155Id'">
          <!-- 交易数 -->
          <el-table-column :label="$t('tokens.number')">
            <template slot-scope="scope">
              <span>{{ scope.row.transferValue | formatMoney }}</span>
            </template>
          </el-table-column>

          <!-- 令牌ID -->
          <el-table-column :label="$t('tokens.tokenID')" min-width="120">
            <template slot-scope="scope">
              <router-link
                class="cursor normal ellipsis ellipsisWidth"
                :title="scope.row.tokenId"
                :to="get1155IdUrl(scope.row.contract, scope.row.tokenId)"
              >
                {{ scope.row.tokenId }}
              </router-link>
            </template>
          </el-table-column>
        </template>
        
        <el-table-column v-else-if="tableType === 'erc721Id' || tableType === 'erc1155Id'" :label="$t('tokens.tokenID')" prop="tokenId"  min-width="120">
          <template slot-scope="scope">
              <span
                class="ellipsis ellipsisWidth"
                :title="scope.row.tokenId"
                >{{ scope.row.tokenId | sliceStr(16) }}</span
              >
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
import { timeDiff } from '@/services/time-services';
const API = {
  erc20: apiService.tokens.token20TxList,
  erc721: apiService.tokens.token721TxList,
  erc721Id: apiService.tokens.token721TxList,
  erc1155: apiService.tokens.token1155TxList,
  erc1155Id: apiService.tokens.token1155TxList
};
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
      loading: false,
    };
  },
  props: {
    address: String,
    tableType: {
      type: String,
      default: 'erc20',
    },
    tradeCount: Object,
    tokenId: String
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
        contract: this.address
      };
      if (this.tableType === 'erc721Id' || this.tableType === 'erc1155Id') {
        param.tokenId = this.tokenId;
      }
      this.loading = true;
      API[this.tableType](param)
        .then((res) => {
          let { data, totalPages, totalCount, code, errMsg } = res;
          if (code == 0) {
            this.tradeTableData = data;
            // 返回的总条数不能用
            this.pageTotal = this.tradeCount.txCount; // || totalCount;
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
      let query = {
        address: this.address,
        exportname: 'TokenTransferList',
        tokenType: this.tableType,
        contract: 'true'
      }
      if (this.tableType === 'erc721Id' || this.tableType === 'erc1155Id') {
        query.tokenId = this.tokenId;
      }
      //跳转至下载页
      const { href } = this.$router.resolve({
        path: '/download',
        query
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
.lineheight-with-btn {
  line-height: 37px;
}
</style>
