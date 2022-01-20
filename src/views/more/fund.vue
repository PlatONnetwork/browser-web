<template>
  <div class="fund trade-list-wrap"><div class="top">
      <h3 class="title">{{ $t('fund.title') }}</h3>
    </div>
    <div class="main table">
      <el-table :data="list" style="width: 100%" size="mini">
        <el-table-column type="index" label="#" :index="indexMethod" width="50" align="center" />
        <el-table-column :label="$t('fund.tAddress')" show-overflow-tooltip min-width="120">
          <template slot-scope="scope">
            {{ scope.row }}
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="sizes,total,  prev, pager, next"
          :total="pageTotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '@/services/API-services'
export default {
  data() {
    return {
      totalBalance: '',
      totalRestrictingBalance: '',
      list: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      loading: false,
    }
  },
  methods: {
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    handleCurrentChange() {
      this.getList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getList()
    },
    getList() {
      this.loading = true
      apiService.more
        .queryFundAddress({
          pageNo: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          let { data, totalCount, code, errMsg } = res
          if (code == 0) {
            data && (this.list = data)
            this.pageTotal = totalCount
          } else {
            this.$message.error(errMsg)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  created() {
    this.getList()
  },
}
</script>

<style lang="less" scoped>
.fund {
  .title {
    font-family: Gilroy-Medium;
    font-size: 34px;
    color: #000000;
    letter-spacing: 0;
    line-height: 64px;
    margin: 25px 0 10px 0;
  }
  .h3 {
    font-family: Gilroy-Medium;
    font-size: 24px;
    color: #000000;
    letter-spacing: 0;
    line-height: 24px;
  }
  .total {
    display: flex;
    flex-wrap: wrap;
    .t-li {
      width: 400px;
      margin: 10px 20px 0 0;
      padding: 18px 30px;
      border-radius: 2px;
      box-shadow: 4px 3px 8px rgba(0, 0, 0, 0.3);
      .h3 {
        margin-bottom: 10px;
      }
    }
  }
  .main {
    user-select: none;
    .main-title {
      margin: 20px 0;
    }
  }
}
</style>