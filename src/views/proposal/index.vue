<template>
  <div class="trade-list-wrap">
    <div class="page-title fontSize34">{{$t('menu.proposal').toUpperCase()}}</div>
    <div class="sub-title">
      <div class="fontSize14 trade-count">&nbsp;</div>
      <div class="pagination-box1">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" layout="prev, pager, next" :page-size="pageSize" :total="pageTotal" :pager-count="9"></el-pagination>
      </div>
    </div>

    <div class="table">
      <el-table :data="tableData" style="width: 100%" key="firstTable" size="mini">
        <el-table-column :label="$t('tradeAbout.PIPSN')" min-width="10%">
          <template slot-scope="scope">
            <span style="font-weight:bold;">
              <i class="el-icon-time"></i>
              <!-- <img src="@/assets/images/icon-code.png" /> -->
              {{scope.row.url}}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.proposalTitle')" min-width="50%">
          <template slot-scope="scope">
            <div class="flex-special" @click="goDetail(scope.row.proposalHash)">
              <span class="cursor normal ellipsis" style="font-weight:bold">{{scope.row.title}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.proposalType')" min-width="10%">
          <template slot-scope="scope">
            <span>{{scope.row.type | proposalType}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.proposalStatus')" show-overflow-tooltip min-width="10%">
          <template slot-scope="scope">
            <span v-if="scope.row.status == '1'">
              <i class="el-icon-circle-plus-outline"></i>
              &nbsp;{{scope.row.status | proposalStatus}}
            </span>
            <span v-else-if="scope.row.status == '3'">
              <i class="el-icon-circle-close"></i>
              &nbsp;{{scope.row.status | proposalStatus}}
            </span>
            <span v-else>
              <i class="el-icon-circle-check"></i>
              &nbsp;{{scope.row.status | proposalStatus}}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.proposalEndBlock')" min-width="10%">
          <template slot-scope="scope">
            <div class="flex-special">
              <span class="cursor normal ellipsis ellipsisWidth" @click="goAddressDetail(scope.$index,scope.row)">{{scope.row.endVotingBlock}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.proposalTime')" show-overflow-tooltip min-width="10%">
          <template slot-scope="scope">
            <span>{{scope.row.timestamp | dateFormat}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box" v-if="paginationFlag">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes,total,  prev, pager, next" :total="pageTotal" :pager-count="9"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from "@/services/API-services";
import { timeDiff } from '@/services/time-services';
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import moment from 'moment'

export default {
  name: "trade-list",
  data() {
    return {
      newRecordFlag: false,
      paginationFlag: true,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      pageTotal: 1,
      displayTotalCount: 0,
    };
  },
  props: {},
  computed: {},
  watch: {},
  components: {},
  methods: {
    //获取交易列表 下分页
    async getProposalList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      console.warn('获取提案列表》》》', param);
      try {
        let { data, totalPages, totalCount, code, errMsg, displayTotalCount } = await apiService.proposal.proposalList(param);
        this.tableData = data;
        this.pageTotal = totalCount;
        this.displayTotalCount = displayTotalCount || 10;
        this.newRecordFlag = (totalCount > 500000);
        this.paginationFlag = (totalPages !== 1)
      } catch (error) {
        error.errMsg && this.$message.error(error.errMsg);
      }
    },
    //进入钱包地址详情或者合约详情
    async goDetail(proposalHash) {
      this.$router.push({
        path: '/proposal-detail',
        query: {
          proposalHash: proposalHash,
        },
      });
    },
    timeDiffFn(beginTime, endTime) {
      return timeDiff(beginTime, endTime)
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getProposalList();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getProposalList();
    },
  },
  //生命周期函数
  created() {
    this.getProposalList();
  },
  filters: {
    dateFormat: function (v, isUTC = true, dateFormat = "YYYY-MM-DD HH:mm:ss") {
      // 返回秒的转为返回ms
      if (typeof v === "number" && v <= 9999999999) {
        v = v * 1000;
      }
      return v ? isUTC ? moment.utc(v).local().format(dateFormat) : moment.utc(v).format(dateFormat) : "";
    }
  },
  mounted() { }
};
</script>
<style lang="less" scoped>
.sub-title {
  display: flex;
  justify-content: space-between;
}
.trade-count {
  color: #333;
}
</style>

