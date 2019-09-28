<template>
  <div class="trade-list-wrap">
    <div class="page-title fontSize34">{{$t('menu.block').toUpperCase()}}</div>
    <div class="sub-title">
      <div class="fontSize14 trade-count">
        {{$t('blockAbout.morethen')}}
        <b class="Gilroy-Medium black">{{displayTotalCount}}</b>
        {{$t('blockAbout.blocks')}}
      </div>
      <div class="pagination-box1">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="pageTotal"
          :pager-count="9"
        ></el-pagination>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" key="firstTable" size="mini">
        <el-table-column :label="$t('tradeAbout.blockHeight')">
          <template slot-scope="scope">
            <div class="flex-special">
              <span
                class="cursor blue ellipsis"
                @click="goBlockDetail(scope.row.number)"
              >{{scope.row.number}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.age')">
          <template slot-scope="scope">
            <span>{{timeDiffFn(scope.row.serverTime,scope.row.timestamp)}}{{$t('tradeAbout.before')}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('indexInfo.txn')">
          <template slot-scope="scope">
            <span>{{scope.row.statTxQty | formatNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('blockAbout.size')">
          <template slot-scope="scope">
            <span>{{scope.row.size}}&nbsp;bytes</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('blockAbout.producer')">
          <template slot-scope="scope">
            <div class="flex-special">
              <span
                class="cursor blue ellipsis ellipsisWidth"
                @click="goNodeDetail(scope.row.nodeId)"
              >{{scope.row.nodeName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.gasUsedList')">
          <template slot-scope="scope">
            <span>{{scope.row.gasUsed | formatNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column width="200">
          <!-- :label="$t('blockAbout.blockReward')+'(LAT)'" -->
          <template slot="header">
              {{$t('blockAbout.blockReward')}}
              <span style="color:#999999;">(LAT)</span>
          </template>
          <template slot-scope="scope">
            <span>{{scope.row.blockReward | formatMoney}}</span>
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
          :pager-count="9"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from "@/services/API-services";
import { timeDiff } from "@/services/time-services";

export default {
  name: "trade-list",
  data() {
    return {
      newRecordFlag: false,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 1,
      displayTotalCount: 0
    };
  },
  props: {},
  computed: {},
  watch: {},
  components: {},
  methods: {
    //获取交易列表 下分页
    getTradeList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize
      };
      apiService.block
        .blockList(param)
        .then(res => {
          let {
            data,
            totalPages,
            totalCount,
            code,
            errMsg,
            displayTotalCount
          } = res;
          console.log(res);
          if (code == 0) {
            this.tableData = data;
            console.log(this.tableData);
            this.pageTotal = totalCount;
            this.displayTotalCount = displayTotalCount;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    timeDiffFn(beginTime, endTime) {
      return timeDiff(beginTime, endTime);
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
    //进入区块详情
    goBlockDetail(blockHeight) {
      this.$router.push({
        path: "/block-detail",
        query: {
          height: blockHeight
        }
      });
    },
    //进入节点详情
    goNodeDetail(nodeId) {
      this.$router.push({
        path: "/node-detail",
        query: {
          address: nodeId
        }
      });
    }
  },
  //生命周期函数
  created() {
    this.getTradeList();
  },
  mounted() {}
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

