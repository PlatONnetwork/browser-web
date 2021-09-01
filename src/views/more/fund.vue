<template>
  <div class="fund trade-list-wrap">
    <div class="top">
      <h3 class="title">{{ $t('fund.title') }}</h3>
      <ul class="total">
        <li class="t-li">
          <p class="h3">{{ totalBalance | formatMoney }}</p>
          <p>{{ $t('fund.totalBalance') }}</p>
        </li>
        <li class="t-li">
          <p class="h3">{{ totalRestrictingBalance | formatMoney }}</p>
          <p>{{ $t('fund.totalLocked') }}</p>
        </li>
      </ul>
    </div>
    <div class="main table">
      <p class="main-title" v-html="$t('fund.pageTotal', [pageTotal])"></p>
      <el-table :data="list" style="width: 100%" size="mini">
        <el-table-column type="index" label="#" :index="indexMethod" width="50"></el-table-column>
        <el-table-column prop="address" :label="$t('fund.tAddress')" min-width="120">
          <template slot-scope="scope">
            <div class="flex-special">
              <span
                class="cursor normal ellipsis ellipsisWidth"
                @click="goAddressDetail(scope.row.address, scope.row.type)"
              >
                {{ scope.row.address }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="balance" :label="$t('fund.tBalance')" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.balance | formatMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" prop="restrictingBalance" :label="$t('fund.tLockedBalance')" min-width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.restrictingBalance | formatMoney }}</span>
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
      apiService.more
        .queryFundAddress({
          pageNo: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          let { data, totalCount, code, errMsg } = res
          if (code == 0) {
            if (data[0]) {
              this.list = data[0].internalAddressBaseResp
              this.totalBalance = data[0].totalBalance
              this.totalRestrictingBalance = data[0].totalRestrictingBalance
            }
            this.pageTotal = totalCount
          } else {
            this.$message.error(errMsg)
          }
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
    .main-title {
      margin: 20px 0;
    }
  }
}
</style>