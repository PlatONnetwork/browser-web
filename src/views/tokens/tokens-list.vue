<template>
  <div class="trade-list-wrap">
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
import ERC20List from './list/erc20.vue';
import ERC721List from './list/erc721.vue';
import ERC1155List from './list/erc1155.vue';
const compMap = {
  prc20: 'ERC20List',
  prc721: 'ERC721List',
  prc1155: 'ERC1155List',
};
const API = {
  prc20: apiService.tokens.tokenList,
  prc721: apiService.tokens.tokenList,
  prc1155: apiService.tokens.tokenList,
};
const typeMap = {
  prc20: 'menu.erc20Tokens',
  prc721: 'menu.erc721Tokens',
  prc1155: 'menu.erc1155Tokens',
};
const apiTypeMap = {
  prc20: 'erc20',
  prc721: 'erc721',
  prc1155: 'erc1155',
};

export default {
  name: 'tokensListComponent',
  components: { ERC20List, ERC721List, ERC1155List },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      displayTotalCount: 0,
      type: 'erc20',
      tableCompName: 'ERC20List',
      loading: false,
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.params.type && to.params.type !== this.type) {
          if (!compMap[to.params.type]) {
            this.$router.replace('/tokens/tokensList/prc20');
            return;
          }
          this.type = to.params.type;
          this.tableCompName = compMap[this.type];
          this.currentPage = 1;
          this.pageSize = 20;
          this.getTokenList();
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
    getTokenList() {
      let param = {
        type: apiTypeMap[this.type],
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
      this.getTokenList();
      this.replace();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getTokenList();
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
  //       vm.getTokenList();
  //     }
  //   });
  // },
  //生命周期函数
  created() {
    if (this.$route.query.currentPage) {
      this.currentPage = this.$route.query.currentPage - 0;
      this.pageSize = this.$route.query.pageSize - 0;
    }
    // this.getTokenList();
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
