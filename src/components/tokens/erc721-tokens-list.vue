<template>
  <div class="common-trade">
    <div v-if="selectIndex === 1" class="address-trade-last">
      {{ $t('blockAbout.morethen') }} {{ balanceTotalDisplay }}
      {{ $t('tokens.typeErc721Token') }}
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
        <li :class="{ active: selectIndex == 1 }" index="1" @click="typeChange(1, 'balance')">
          {{ $t('tokens.hold721') }} ({{ balanceTotalDisplay }})
        </li>
        <li :class="{ active: selectIndex == 2 }" index="2" @click="typeChange(2, 'transfer')">
          {{ $t('contract.transactions') }} ({{ tokensName }})
        </li>
      </ul>
      <span class="download-btn" @click="exportFn">{{ $t('common.export') }}</span>
    </div>
    <span v-else class="download-btn abs" @click="exportFn">{{ $t('common.export') }}</span>
    <!-- 持有令牌table -->
    <div v-show="selectIndex === 1" class="table">
      <el-table :data="balanceTableData" style="width: 100%" key="firstTable" size="mini" v-loading="loading.balance">
        <!-- 名称 -->
        <el-table-column :label="$t('nodeInfo.name')">
          <template slot-scope="scope">
            <div>
              {{ `${scope.row.name} (${scope.row.symbol})` | sliceStr(21) }}
            </div>
          </template>
        </el-table-column>
        <!-- 令牌ID -->
        <el-table-column :label="$t('tokens.tokenID')">
          <template slot-scope="scope">
            <router-link :to="get721IdUrl(scope.row.contract, scope.row.tokenId)" class="cursor normal">
              {{ scope.row.tokenId }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tokens.transferNum')" :min-width="$i18n.locale == 'en' ? 150 : 80">
          <template slot-scope="scope">
            <span @click="showAddressTokenList(scope.row)" class="cursor normal">
              {{ scope.row.txCount | formatNumber }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tokens.contract')">
          <template slot-scope="scope">
            <router-link :to="getContractUrl(scope.row.contract)" class="cursor normal ellipsis adr-width">
              <icon-contract></icon-contract>
              {{ scope.row.contract }}
            </router-link>
          </template>
        </el-table-column>
        <!-- 合约状态 todo  -->
        <el-table-column :label="$t('contract.status.name2')">
          <template slot-scope="scope">
            <div v-if="scope.row.isContractDestroy" class="red">{{ $t('contract.status.destructed3') }}</div>
            <div v-else>{{ $t('contract.status.normal') }}</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 下分页 -->
      <div class="pagination-box">
        <el-pagination background @size-change="handleBlanceSizeChange" @current-change="handleBlancePageChange" :current-page.sync="blanceCurPage" :page-sizes="[10, 20, 50, 100]" :page-size="blancePageSize" layout="sizes,total,  prev, pager, next" :total="balancePageTotal > 5000 ? 5000 : balancePageTotal" :pager-count="9"></el-pagination>
      </div>
    </div>
    <div v-show="selectIndex === 2" class="table">
      <el-table :data="tradeTableData" style="width: 100%" key="secondTable" size="mini" v-loading="loading.trade">
        <!-- 交易哈希值 -->
        <el-table-column :label="$t('tradeAbout.hash')" width="200">
          <template slot-scope="scope">
            <div class="flex-special">
              <router-link class="cursor normal ellipsis hash-width" :to="getTradeUrl(scope.row.txHash)">
                <!-- txHash 显示0x + 18 -->
                {{ scope.row.txHash }}
              </router-link>
            </div>
          </template>
        </el-table-column>
        
        <template v-if="pageType === 'contract'">
          <!-- 块高 -->
          <el-table-column prop="blockHeight" :label="$t('tradeAbout.block')" width="120">
            <template slot-scope="scope">
              <router-link class="cursor blue" :to="getBlockUrl(scope.row.blockNumber)">{{ scope.row.blockNumber }}</router-link>
            </template>
          </el-table-column>

          <!-- 时间 -->
          <el-table-column :label="$t('common.time')" min-width="170">
            <template slot-scope="scope">
              <span>{{ scope.row.blockTimestamp | formatTime }}</span>
            </template>
          </el-table-column>
        </template>
        <!-- 块龄 -->
        <el-table-column v-else :label="$t('tradeAbout.age')" width="120">
          <template slot-scope="scope">
            <span>
              {{
                timeDiffFn(scope.row.blockTimestamp, scope.row.systemTimestamp)
              }}{{ $t('tradeAbout.before') }}
            </span>
          </template>
        </el-table-column>

        <!-- From 操作地址（Operator_Address） -->
        <el-table-column :label="$t('tokens.from')" min-width="140">
          <template slot-scope="scope">
            <div class="flex-special">
              <!-- 操作地址：即签名交易的地址，显示0x+14 -->
              <icon-contract v-if="isContract(scope.row.fromType)" :active="scope.row.type !== 'OUT'"></icon-contract>
              <span class="ellipsis adr-width" v-if="scope.row.type === 'OUT'">{{ scope.row.txFrom }}</span>
              <router-link v-else class="cursor normal ellipsis adr-width" :to="getAddressUrl(scope.row.txFrom, scope.row.fromType)">{{ scope.row.txFrom }}</router-link>
            </div>
          </template>
        </el-table-column>

        <!-- 交易方向type, INPUT 进账，OUT 出账，NONE 无方向 -->
        <el-table-column label="" width="70px">
          <template slot-scope="scope">
            <span v-if="['INPUT', 'OUT'].includes(scope.row.type)" class="tokens-type" :class="'tokens-type--' + getTokenType(scope.row.type)">{{ getTokenType(scope.row.type, false) }}</span>
            <div v-else class="tokens-arrow fr">
              <img class="arrow-icon" src="@/assets/images/arrow-right.svg" />
            </div>
          </template>
        </el-table-column>

        <!--To 操作地址（Operator_Address） -->
        <el-table-column :label="$t('tokens.to')"  min-width="140">
          <template slot-scope="scope">
            <div class="flex-special">
              <!-- 操作地址：即签名交易的地址，显示0x+14 -->
              <icon-contract v-if="isContract(scope.row.toType)" :active="scope.row.type !== 'INPUT'"></icon-contract>
              <span class="ellipsis adr-width" v-if="scope.row.type === 'INPUT'">{{ scope.row.transferTo }}</span>
              <router-link v-else class="cursor normal ellipsis adr-width" :to="getAddressUrl(scope.row.transferTo, scope.row.toType)">{{ scope.row.transferTo }}</router-link>
            </div>
          </template>
        </el-table-column>
        <template v-if="pageType === 'contract'">
          <el-table-column :label="$t('tokens.tokenID')">
            <template slot-scope="scope">
              <router-link 
                class="cursor normal ellipsis ellipsisWidth"
                :to="get721IdUrl(scope.row)"
                >{{ scope.row.tokenId }}</router-link>
            </template>
          </el-table-column>

          <!-- todo tokens 名称+单位 -->
          <el-table-column :label="$t('tokens.tokens')">
            <template slot-scope="scope">
              <router-link
                class="cursor normal ellipsis"
                :to="getTokenUrl(scope.row.contract, 'erc721')"
                >{{ `${scope.row.name} (${scope.row.symbol})` }}</router-link
              >
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

      tradeType: 'balance',
      tokensName: 'All',
      tokenContract: '',
      tokenId: '',

      loading: {
        balance: false,
        trade: false,
      }
    };
  },
  props: {
    address: String,
    // //为contract时，没有余额tab
    // 逻辑修改: 当为contract时，ui和处理逻辑都和address一样，只有接口的addrss字段改为contract字段
    // 
    pageType: {
      type: String,
      default: 'address', // address, contract, contranctA(需求修改后的新字段，为防止其他修改，暂时不删除原有逻辑)
    },
    tradeCount: Object,
  },
  computed: {
    isAddress() {
      return this.pageType === 'address'
    }
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
    },
    'tradeCount.erc721TxQty': function() {
      !this.noTradeData && (this.tradePageTotal =  this.tradeTotalDisplay = this.tradeCount.erc721TxQty);
    },
  },
  components: { IconContract },
  methods: {
    async showAddressTokenList(token) {
      this.tradeType = 'transfer'; //切换到交易界面 展示地址下的相关交易列表
      this.tokensName = token.name;
      this.tokenContract = token.contract;
      this.tokenId = token.tokenId;
      this.tradeCurPage = 1;
      await this.getTradeAddressList(token.txCount);
      this.selectIndex = 2;
    },
    getBlanceList() {
      // let key = this.isAddress ? 'address' : 'contract';
      this.loading.balance = true;
      apiService.tokens
        .tokenBalanceList({
          type: 'erc721',
          address: this.address,
          pageNo: this.blanceCurPage,
          pageSize: this.blancePageSize,
        })
        .then((res) => {
          const { code, data, totalCount, displayTotalCount } = res;
          if (code == 0) {
            this.balanceTableData = data;
            // 返回的条数无效
            this.balancePageTotal = totalCount;
            this.balanceTotalDisplay = displayTotalCount;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        })
        .finally(() => {
          this.loading.balance = false;
        });
    },
    // 从持有令牌跳转过来的
    getTradeAddressList(txCount) {
      let param = {
        pageNo: this.tradeCurPage,
        pageSize: this.tradePageSize,
        address: this.address,
        contract: this.tokenContract,
        tokenId: this.tokenId,
      };
      // apiService.trade.transactionList(param);
      this.loading.trade = true;
      apiService.tokens
        .token721TxList(param)
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
        })
        .finally(() => {
          this.loading.trade = false;
        });
    },
    //获取交易列表 下分页
    getTradeList() {
      let param = {
        pageNo: this.tradeCurPage,
        pageSize: this.tradePageSize,
        address: this.address
      };
      // let key = this.isAddress ? 'address' : 'contract';
      // param[key] = this.address;
      this.loading.trade = true;
      apiService.tokens
        .token721TxList(param)
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
            if (data.length < 1) {
              this.noTradeData = true;
              this.tradePageTotal =  this.tradeTotalDisplay = 0;
              return
            }
            // 返回的总条数不能用, (bug: 接口并行调用问题, 放一份到watch里面)
            this.tradePageTotal =  this.tradeTotalDisplay = this.tradeCount.erc721TxQty; // || displayTotalCount;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        })
        .finally(() => {
          this.loading.trade = false;
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
    getListByTokenName() {
      if (this.tokensName === 'All') {
        this.getTradeList();
      } else {
        this.getTradeAddressList(this.tradePageTotal);
      }
    },
    handleBlancePageChange(val) {
      this.blanceCurPage = val;
      this.getBlanceList();
    },
    handleBlanceSizeChange(val) {
      this.blanceCurPage = 1;
      this.blancePageSize = val;
      this.getBlanceList();
    },
    handleTradePageChange(val) {
      this.tradeCurPage = val;
      this.getListByTokenName();
    },
    handleTradeSizeChange(val) {
      this.tradeCurPage = 1;
      this.tradePageSize = val;
      this.getListByTokenName();
    },

    typeChange(index, type) {
      if(this.selectIndex === index) { return; }
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
      // let contract = false;
      if (this.tradeType === 'balance') {
        exportname = 'holderTokenList';
      } else if (this.tradeType === 'transfer') {
        exportname = 'TokenTransferList';
        // contract = !this.isAddress;
      }
      let query = {
        address: this.address,
        tokenType: 'erc721',
        exportname,
      }
      // contract && (query.contract = 'true')
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
