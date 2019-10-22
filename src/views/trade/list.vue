<template>
  <div class="trade-list-wrap">
    <div class="page-title fontSize34">{{$t('tradeAbout.transactionUp')}}</div>
    <div class="sub-title">
      <div class="fontSize14 trade-count">
        <template v-if="pageTotal>500000">
          {{$t('tradeAbout.morethen')}}>
        </template>          
        <template v-else>
          {{$t('tradeAbout.morethen2')}}
        </template> 
        <b class="black">{{pageTotal}}</b>
        {{$t('tradeAbout.foundTransactions')}}
        <span
          v-if="pageTotal>500000"
        >{{$t('tradeAbout.showingLast')}}</span>
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
          :total="pageTotal>500000?500000:pageTotal"
          :pager-count="9"
        ></el-pagination>
      </div>
    </div>
    <!-- 主表格区域 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%" key="firstTable" size="mini">
        <!-- 交易哈希值（TxHash） -->
        <el-table-column :label="$t('tradeAbout.hash')">
          <template slot-scope="scope">
            <div class="flex-special">
              <el-tooltip
                class="item"
                effect="dark"
                placement="bottom-start"
                v-if="scope.row.txReceiptStatus==0"
              >
                <div slot="content">
                  <span class="title-warning">{{$t("tradeAbout.warn")}}：</span>
                  {{scope.row.failReason?scope.row.failReason:$t("tradeAbout.transactionFailure")}}
                </div>
                <i class="iconfont iconxinxi cursor">&#xe63f;</i>
              </el-tooltip>
              <!-- <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">{{scope.row.txHash}}</div>
                            <span class='cursor normal ellipsis' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
              </el-tooltip>-->
              <span
                class="cursor normal ellipsis"
                @click="goTradeDetail(scope.row.txHash)"
              >{{scope.row.txHash | sliceStr(18)}}</span>
            </div>
            <!-- <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span> -->
          </template>
        </el-table-column>
        <!-- 区块（Block） -->
        <el-table-column :label="$t('tradeAbout.block')">
          <template slot-scope="scope">
            <span
              class="cursor normal"
              @click="goBlockDetail(scope.row.blockNumber)"
            >{{scope.row.blockNumber}}</span>
          </template>
        </el-table-column>
        <!-- 块龄（Age） -->
        <el-table-column :label="$t('tradeAbout.age')">
          <template slot-scope="scope">
            <span>{{timeDiffFn(scope.row.serverTime,scope.row.timestamp)}}{{$t('tradeAbout.before')}}</span>
          </template>
        </el-table-column>
        <!-- 操作地址（Operator_Address） -->
        <el-table-column :label="$t('blockAbout.operatorAddress')">
          <template slot-scope="scope">
            <!-- <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span> -->
            <div class="flex-special">
              <span
                class="cursor normal ellipsis ellipsisWidth"
                @click="goAddressDetail(scope.row.from)"
              >{{scope.row.from|sliceStr(14)}}</span>
            </div>
          </template>
        </el-table-column>
        <!-- 交易类型（Type） -->
        <el-table-column :label="$t('tradeAbout.type')">
          <template slot-scope="scope">
            <span>{{ $t('TxType.'+scope.row.txType)}}</span>
            <!-- <span>{{scope.row.txType}}</span> -->
          </template>
        </el-table-column>
        <!-- 数额(Value) -->
        <el-table-column :label="$t('tradeAbout.value')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.value | formatMoney}} LAT</span>
          </template>
        </el-table-column>
        <!-- 交易费用（TxFee） -->
        <el-table-column
          show-overflow-tooltip
          :width="currentScreenWidth<1440? 120:150"
        >
          <template slot="header">
            {{$t('tradeAbout.fee')}}
            <span style="color:#999999;">(LAT)</span>
          </template>
          <template slot-scope="scope">
            <span>{{scope.row.actualTxCost | formatMoney}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格下方分页标签 -->
      <div class="pagination-box" v-if="paginationFlag">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="sizes,total,  prev, pager, next"
          :total="pageTotal>500000?500000:pageTotal"
          :pager-count="9"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import apiService from "@/services/API-services";
import { timeDiff } from "@/services/time-services";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "trade-list",
  data() {
    return {
      newRecordFlag: false,
      paginationFlag: true,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 1,
      descriptionProp: "trade",
      displayTotalCount: 0,
      currentScreenWidth: 0
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
      console.info("获取交易列表（参数）》》》", param);
      apiService.trade
        .transactionList(param)
        .then(res => {
          let {
            data,
            totalPages,
            totalCount,
            code,
            errMsg,
            displayTotalCount
          } = res;
          if (code == 0) {
            this.tableData = data;
            this.pageTotal = totalCount;
            this.displayTotalCount = displayTotalCount;
            //判断最新记录是否显示  总数
            totalCount > 500000
              ? (this.newRecordFlag = true)
              : (this.newRecordFlag = false);
            //判断是否就是一页  一页的话只显示上面的分页  多页的话上下两个分页都显示  页数
            // totalPages == 1
            //   ? (this.paginationFlag = false)
            //   : (this.paginationFlag = true);
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    //进入钱包地址详情或者合约详情
    goDetail(index, row) {
      if (
        row.receiveType == "contract" ||
        row.to == "0x1000000000000000000000000000000000000001" ||
        row.to == "0x1000000000000000000000000000000000000002"
      ) {
        //进入合约详情
        this.$router.push({
          path: "/contract-detail",
          query: {
            address: row.to,
            description: "trade",
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }
        });
      } else {
        //进入钱包地址详情
        this.$router.push({
          path: "/address-detail",
          query: {
            address: row.to,
            description: "trade",
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }
        });
      }
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
    goBlockDetail(height) {
      console.warn("进入区块", height);
      this.$router.push({
        path: "/block-detail",
        query: {
          height: height
        }
      });
    },
    //进入交易哈希详情
    goTradeDetail(hash) {
      this.$router.push({
        path: "/trade-detail",
        query: {
          txHash: hash
          // currentPage: this.currentPage,
          // pageSize: this.pageSize
        }
      });
    },
    //进入钱包地址详情
    goAddressDetail(adr) {
      this.$router.push({
        path: "/address-detail",
        query: {
          address: adr
          // description: "trade",
          // currentPage: this.currentPage,
          // pageSize: this.pageSize
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
.title-warning{
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
  font-size: 11px;
}
</style>

