<template>
  <div class="common-trade">
    <div v-if="selectIndex === 1" class="address-trade-last">
      {{ $t('blockAbout.morethen') }} {{ balanceTotalDisplay }}
      {{ $t('tokens.typesToken') }}
      <span style="color: #3F3F3F;" v-if="balanceTotalDisplay > 5000">{{
        $t("contract.showingLast")
      }}</span>
    </div>
    <div v-else class="address-trade-last">
      <!-- 总计代币交易数量 -->
      {{ $t('blockAbout.morethen') }} {{ tradeTotalDisplay }}
      {{ $t('tradeAbout.tokens') }}
      <span style="color: #3F3F3F;" v-if="tradeTotalDisplay > 5000">{{
        $t("contract.showingLast")
      }}</span>
    </div>
    <div class="trade-tab-wrap" v-if="pageType !== 'contract'">
      <ul class="trade-tab">
        <li :class="{ active: selectIndex == 1 }" index="1" @click="typeChange(1, 'blance')">
          {{ $t('contract.balance') }} ({{ balanceTotalDisplay }})
        </li>
        <li :class="{ active: selectIndex == 2 }" index="2" @click="typeChange(2, 'transfer')">
          {{ $t('contract.transactions') }} ({{ tokensName }})
        </li>
      </ul>
      <!-- <el-button size="medium" v-if="type!='block'" @click="exportFn">{{$t('common.export')}}</el-button> -->
      <span v-if="tradeType !== 'address'" class="download-btn" @click="exportFn">{{ $t('common.export') }}</span>
    </div>
    <span v-else class="download-btn abs" @click="exportFn">{{ $t('common.export') }}</span>
    <!-- 余额table -->
    <div v-show="selectIndex === 1" class="table">
      <el-table :data="balanceTableData" style="width: 100%" key="firstTable" size="mini">
        <!-- 交易哈希值 -->
        <el-table-column :label="$t('nodeInfo.name')">
          <template slot-scope="scope">
            <div>
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tokens.unit')">
          <template slot-scope="scope">
            <div>
              {{ scope.row.symbol }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('contract.balance')">
          <template slot-scope="scope">
            <div>
              {{ scope.row.balance | formatMoney }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tokens.transfers')">
          <template slot-scope="scope">
            <span @click="showAddressTokenList(scope.row.contract, scope.row.name, scope.row.txCount)" class="cursor normal">
              {{ scope.row.txCount | formatNumber }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tokens.decimals')">
          <template slot-scope="scope">
            <div>
              {{ scope.row.decimal }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tokens.contract')">
          <template slot-scope="scope">
            <span @click="goContractDetail(scope.row.contract)" class="cursor normal ellipsis ellipsisWidth">
              <icon-contract></icon-contract>
              {{ scope.row.contract | sliceStr(20) }}
            </span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 下分页 -->
      <div class="pagination-box">
        <el-pagination background @current-change="handleBlancePageChange" :current-page.sync="blanceCurPage" :page-sizes="[20]" :page-size="blancePageSize" layout="sizes,total,  prev, pager, next" :total="balancePageTotal > 5000 ? 5000 : balancePageTotal" :pager-count="9"></el-pagination>
      </div>
    </div>
    <div v-show="selectIndex === 2" class="table">
      <el-table :data="tradeTableData" style="width: 100%" key="secondTable" size="mini">
        <!-- 交易哈希值 -->
        <el-table-column :label="$t('tradeAbout.hash')" width="200">
          <template slot-scope="scope">
            <div class="flex-special">
              <span class="cursor normal ellipsis" @click="goTradeDetail(scope.row.txHash)">
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
              <icon-contract v-if="isContract(scope.row.fromType)" :active="scope.row.type !== 'OUT'"></icon-contract>
              <span class="ellipsis ellipsisWidth" v-if="scope.row.type === 'OUT'">{{ scope.row.txFrom | sliceStr(16) }}</span>
              <span v-else class="cursor normal ellipsis ellipsisWidth" @click="goAddressDetail(scope.row.txFrom, scope.row.fromType)">{{ scope.row.txFrom | sliceStr(16) }}</span>
            </div>
          </template>
        </el-table-column>

        <!-- 交易方向type, INPUT 进账，OUT 出账，NONE 无方向 -->
        <af-table-column label="" width="70px">
          <template slot-scope="scope">
            <span v-if="['INPUT', 'OUT'].includes(scope.row.type)" class="tokens-type" :class="'tokens-type--' + getTokenType(scope.row.type)">{{ getTokenType(scope.row.type, false) }}</span>
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
              <icon-contract v-if="isContract(scope.row.toType)" :active="scope.row.type !== 'INPUT'"></icon-contract>
              <span class="ellipsis ellipsisWidth" v-if="scope.row.type === 'INPUT'">{{ scope.row.transferTo | sliceStr(16) }}</span>
              <span v-else class="cursor normal ellipsis ellipsisWidth" @click="goAddressDetail(scope.row.transferTo, scope.row.toType)">{{ scope.row.transferTo | sliceStr(16) }}</span>
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
              <span class="cursor normal ellipsis ellipsisWidth" @click="goTokenDetail(scope.row.contract)">{{ `${scope.row.name}  (${scope.row.symbol})` }}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <!-- 下分页 -->
      <div class="pagination-box">
        <el-pagination background @size-change="handleTradeSizeChange" @current-change="handleTradePageChange" :current-page.sync="tradeCurPage" :page-sizes="[10, 20, 50, 100]" :page-size="tradePageSize" layout="sizes,total,  prev, pager, next" :total="tradePageTotal > 5000 ? 5000 : tradePageTotal" :pager-count="9"></el-pagination>
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
      balanceTotalDisplay: 0, //余额寻获展示
      balancePageTotal: 0,
      blanceCurPage: 1,
      blancePageSize: 20,

      noTradeData: false,
      tradeTotalDisplay: 0, //交易寻获展示
      tradePageTotal: 0,
      tradeCurPage: 1,
      tradePageSize: 20,

      currentPage: 1,
      PageSize: 20,
      selectIndex: 1,
      newRecordFlag: false,

      balanceTableData: [],
      tradeTableData: [],

      tradeType: 'blance',
      tokensName: 'All',
      tokenContract: ''
    };
  },
  props: {
    address: String,
    // 为contract时，没有余额tab
    pageType: {
      type: String,
      default: 'address',
    },
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
    'tradeCount.tokenQty': function() {
      !noTradeData && (this.tradePageTotal =  this.tradeTotalDisplay = this.tradeCount.tokenQty);
    },
  },
  components: { IconContract },
  methods: {
    async showAddressTokenList(contract, tokensName, txCount) {
      this.tradeType = 'address'; //切换到交易界面 展示地址下的相关交易列表
      this.tokensName = tokensName;
      this.tokenContract = contract;
      this.tradeCurPage = 1;
      await this.getTradeAddressList(contract, txCount);
      this.selectIndex = 2;
    },
    getBlanceList() {
      apiService.tokens
        .tokenBalanceList({
          address: this.address,
          pageNo: this.blanceCurPage,
          pageSize: 20, //目前写死固定值
        })
        .then((res) => {
          const { code, data, totalCount, displayTotalCount } = res;
          if (code == 0) {
            this.balanceTableData = data;
            this.balancePageTotal = totalCount;
            this.balanceTotalDisplay = displayTotalCount;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    getTradeAddressList(contract, txCount) {
      let param = {
        pageNo: this.tradeCurPage,
        pageSize: this.tradePageSize,
        address: this.address,
        contract,
      };
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
            this.tradeTableData = data;
            // this.tradePageTotal = totalCount;
            // this.tradeTotalDisplay = displayTotalCount;
            // 返回的总条数不能用
            this.tradePageTotal =  this.tradeTotalDisplay = txCount; // || displayTotalCount;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    //获取交易列表 下分页
    getTradeList() {
      let param = {
        pageNo: this.tradeCurPage,
        pageSize: this.tradePageSize,
      };
      let key = [this.tableType, this.pageType].includes('contract') ? 'contract' : 'address';
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
            this.tradeTableData = data;
            // this.tradePageTotal = totalCount;
            // this.tradeTotalDisplay = displayTotalCount;
            // 返回的总条数不能用, (bug: 接口并行调用问题, 放一份到watch里面)
            if (data.length < 1) {
              this.noTradeData = true;
              this.tradePageTotal =  this.tradeTotalDisplay = 0;
              return
            }
            this.tradePageTotal =  this.tradeTotalDisplay = this.tradeCount.tokenQty;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    //合约详情
    goContractDetail(adr) {
      this.$router.push({
        path: '/contract-detail',
        query: {
          address: adr,
        },
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
    handleBlancePageChange(val) {
      this.blanceCurPage = val;
      this.getBlanceList();
    },
    getListByTokenName() {
      if (this.tokensName === 'All') {
        this.getTradeList();
      } else {
        this.getTradeAddressList(this.tokenContract, this.tradePageTotal);
      }
    },
    handleTradePageChange(val) {
      this.tradeCurPage = val;
      this.getListByTokenName()
    },
    handleTradeSizeChange(val) {
      this.tradeCurPage = 1;
      this.tradePageSize = val;
      this.getListByTokenName()
    },


    typeChange(index, type) {
      this.selectIndex = index;
      this.tradeType = type;
      if (index === 1) {
        this.tokensName = 'All'
        this.blanceCurPage = 1;
        this.getBlanceList();
      } else {
        this.tradeCurPage = 1;
        this.getTradeList();
      }
    },
    timeDiffFn(beginTime, endTime = Date.now()) {
      return timeDiff(beginTime, endTime);
    },
    exportFn() {
      let exportname;
      let contract = false;
      if (this.tradeType === 'blance') {
        exportname = 'holderTokenList';
      } else if (this.tradeType === 'transfer') {
        exportname = 'TokenTransferList';
        contract = this.pageType === 'contract'
      } else if (this.tradeType === 'address') {
        exportname = 'addressTokenList';
      }
      let query = {
        address: this.address,
        exportname,
      }
      contract && (query.contract = 'true')
      //跳转至下载页
      const { href } = this.$router.resolve({
        path: '/download',
        query
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
    // 合约只要请求交易数据
    if (this.pageType === 'contract') {
      this.typeChange(2, 'transfer')
    } else {
      this.getBlanceList();
    }
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.common-trade {
  position: relative;
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
.download-btn.abs {
  position: absolute;
  top: 0;
  right: 0;
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
