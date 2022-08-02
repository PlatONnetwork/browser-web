<template>
  <div class="trade-list-wrap">
    <!-- 分类筛选tab -->
    <div class="page-title fontSize34">
      {{ $t(getTitle()) }}
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
          :pager-count="9"
        ></el-pagination>
      </div>
    </div>
    <!-- 主表格区域 -->
    <div class="table">
      <component :is="tableCompName" :data="tableData" v-loading="loading"></component>

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
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import ERC20Tranfer from './tranfer/erc20.vue';
import ERC721Tranfer from './tranfer/erc721.vue';
import ERC1155Tranfer from './tranfer/erc1155.vue';
const compMap = {
  prc20: 'ERC20Tranfer',
  prc721: 'ERC721Tranfer',
  prc1155: 'ERC1155Tranfer',
};
const API = {
  prc20: apiService.tokens.token20TxList,
  prc721: apiService.tokens.token721TxList,
  prc1155: apiService.tokens.token1155TxList,
};
const typeMap = {
  prc20: 'menu.erc20Transfer',
  prc721: 'menu.erc721Transfer',
  prc1155: 'menu.erc1155Transfer',
}

export default {
  name: 'tokensListComponent',
  components: { ERC20Tranfer, ERC721Tranfer, ERC1155Tranfer },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      displayTotalCount: 0,
      type: 'erc20',
      tableCompName: 'ERC20Tranfer',
      loading: false,
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.params.type && to.params.type !== this.type) {
          if (!compMap[to.params.type]) {
            this.$router.replace('/tokens/tokensTranfer/prc20');
            return;
          }
          this.type = to.params.type;
          this.tableCompName = compMap[this.type];
          this.tableData = []
          this.currentPage = to.query.currentPage || 1;
          this.pageSize = to.query.pageSize || 20;
          this.getTradeList();
        }
      },
      immediate: true,
    },
  },
  methods: {
    getTitle() {
      return typeMap[this.type]
    },
    //获取交易列表 下分页
    getTradeList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      this.loading = true;
      API[this.type](param)
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
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     // 通过 `vm` 访问组件实例
  //     if (from.path.indexOf('-detail') == -1) {
  //       // 不取缓存
  //       vm.currentPage = 1;
  //       vm.pageSize = 20;
  //       if (vm.$route.query.currentPage) {
  //         vm.currentPage = vm.$route.query.currentPage - 0;
  //         vm.pageSize = vm.$route.query.pageSize - 0;
  //       }
  //       vm.getTradeList();
  //     }
  //   });
  // },
  //生命周期函数
  created() {
    if (this.$route.query.currentPage) {
      this.currentPage = this.$route.query.currentPage - 0;
      this.pageSize = this.$route.query.pageSize - 0;
    }
    // this.getTradeList();
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
