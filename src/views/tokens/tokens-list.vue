<template>
  <div class="trade-list-wrap">
    <div class="page-title fontSize34">
      {{ $t('menu.tokens') }}
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
        {{ $t('tokens.typesToken') }}
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
        <!-- 令牌名称（令牌名称） -->
        <el-table-column :label="$t('tokens.tokenName')">
          <template slot-scope="scope">
            <span
              @click="goTokenDetail(scope.row.address)"
              class="cursor normal ellipsis"
              >{{ scope.row.name }}</span
            >
          </template>
        </el-table-column>

        <!-- 发行总量（） -->
        <el-table-column :label="$t('tokens.totalSupply')">
          <template slot-scope="scope">
            <span>{{ scope.row.totalSupply.toFixed(2) | formatNumber }}</span>
          </template>
        </el-table-column>

        <!-- 持有人（） -->
        <el-table-column :label="$t('tokens.holder')">
          <template slot-scope="scope">
            <span
              @click="goAddressDetail(scope.row.creator)"
              class="cursor normal ellipsis ellipsisWidth"
            >
              {{ scope.row.creator | sliceStr(16) }}</span
            >
          </template>
        </el-table-column>

        <!-- 单位(Unit) -->
        <el-table-column :label="$t('tokens.unit')">
          <template slot-scope="scope">
            <span>{{ scope.row.symbol }}</span>
          </template>
        </el-table-column>

        <!-- 合约 -->
        <el-table-column :label="$t('tokens.contract')">
          <template slot-scope="scope">
            <!-- <span class="cursor normal ellipsis">{{ scope.row.address }}</span> -->

            <div class="flex-special">
              <icon-contract></icon-contract>
              <!-- 操作地址：即签名交易的地址，显示0x+14 -->
              <span
                class="cursor normal ellipsis ellipsisWidth"
                @click="goContractDetail(scope.row.address)"
                >{{ scope.row.address | sliceStr(20) }}</span
              >
            </div>
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
import apiService from '@/services/API-services';
import { timeDiff } from '@/services/time-services';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import IconContract from '@/components/common/icon-contract';

export default {
  name: 'tokensListComponent',
  components: { IconContract },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      displayTotalCount: 0,
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    goContractDetail(adr) {
      this.$router.push({
        path: '/contract-detail',
        query: {
          address: adr,
        },
      });
    },
    //获取交易列表 下分页
    getTokenList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      console.info('获取交易列表（参数）》》》', param);
      // apiService.trade.transactionList(param);
      apiService.tokens
        .tokenList(param)
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
      this.getTokenList();
      this.replace();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getTokenList();
      this.replace();
    },
    // 判断是否是合约
    isContract(type) {
      return [2, 3, 4, 5].includes(type);
    },
    //进入钱包地址详情
    goAddressDetail(adr) {
      this.$router.push({
        path: '/address-detail',
        query: {
          address: adr,
        },
      });
    },
    //进入token详情
    goTokenDetail(address) {
      this.$router.push({
        path: '/tokens-detail',
        query: {
          address: address,
        },
      });
    },
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
        vm.getTokenList();
      }
    });
  },
  //生命周期函数
  created() {
    if (this.$route.query.currentPage) {
      this.currentPage = this.$route.query.currentPage - 0;
      this.pageSize = this.$route.query.pageSize - 0;
    }
    this.getTokenList();
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