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
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
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
    replace(){
      this.$router.replace({
        query: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if(from.path.indexOf('-detail')==-1){
        // 不取缓存
        vm.currentPage = 1;
        vm.pageSize = 20;
        if(vm.$route.query.currentPage){
          vm.currentPage = vm.$route.query.currentPage - 0;
          vm.pageSize = vm.$route.query.pageSize - 0;
        }
        vm.getTradeList();
      }
      console.log(to,from)
    })
  },
  //生命周期函数
  created() {
    // window.addEventListener('popstate', (event) => {
    //   console.log('aaa',this.currentPage);
    // });
    if(this.$route.query.currentPage){
      this.currentPage = this.$route.query.currentPage - 0;
      this.pageSize = this.$route.query.pageSize - 0;
    }
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

