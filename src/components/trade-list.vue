<template>
  <div class="common-trade" :class="{'block-trade-wrap':type=='block'}">
    <div class="address-trade-last" v-if="type!='block'">
      {{$t('blockAbout.morethen')}} {{tradeTotal}} {{$t('contract.transactions')}}
      <span
        style="color: #3F3F3F;"
        v-if="newRecordFlag"
      >{{$t('contract.showingLast')}}</span>
    </div>
    <div class="trade-tab-wrap">
      <ul class="trade-tab">
        <li
          :class="{active:selectIndex==1}"
          index="1"
          @click="typeChange(1,'')"
        >{{$t('contract.all')}}</li>
        <li
          :class="{active:selectIndex==2}"
          index="2"
          @click="typeChange(2,'transfer')"
        >{{$t('contract.transfers')}}({{tradeCount.transferQty}})</li>
        <li
          :class="{active:selectIndex==3}"
          index="3"
          @click="typeChange(3,'delegate')"
        >{{$t('contract.delegationsTxns')}}({{tradeCount.delegateQty}})</li>
        <li
          :class="{active:selectIndex==4}"
          index="4"
          @click="typeChange(4,'staking')"
        >{{$t('contract.validatorTxns')}}({{tradeCount.stakingQty}})</li>
        <li
          :class="{active:selectIndex==5}"
          index="5"
          @click="typeChange(5,'proposal')"
        >{{$t('contract.governanceTxns')}}({{tradeCount.proposalQty}})</li>
      </ul>
      <!-- <el-button size="medium" v-if="type!='block'" @click="exportFn">{{$t('common.export')}}</el-button> -->
      <span class="download-btn" v-if="type!='block'" @click="exportFn">{{$t('common.export')}}</span>
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
            <span>{{$t('tradeAbout.before')}}</span>
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
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" key="firstTable" size="mini">
        <el-table-column :label="$t('tradeAbout.hash')">
          <!-- <template slot-scope="scope">
            <div class="flex-special">
              <el-tooltip
                class="item"
                effect="dark"
                placement="bottom"
                v-if="scope.row.txReceiptStatus==0"
              >
                <div slot="content">
                  <span class="title-warning"></span>
                  {{scope.row.failReason?scope.row.failReason:$t("tradeAbout.transactionFailure")}}
                </div>
                <i class="iconfont iconxinxi cursor yellow">&#xe63f;</i>
              </el-tooltip>
              <p
                class="cursor blue ellipsis percent60"
                @click="goTradeDetail(scope.row.txHash)"
              >&nbsp;{{scope.row.txHash}}</p>
            </div>
          </template> -->
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
        <el-table-column :label="$t('blockAbout.operatorAddress')" v-if="type=='block'">
          <template slot-scope="scope">
            <span
              class="cursor blue ellipsis"
              @click="goAddressDetail(scope.row.from)"
            >{{scope.row.from}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="blockHeight" :label="$t('tradeAbout.block')" v-if="type!='block'">
          <template slot-scope="scope">
            <span
              class="cursor blue"
              @click="goBlockDetail(scope.row.blockNumber)"
            >{{scope.row.blockNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.confirmTime')" v-if="type!='block'" width="300">
          <template slot-scope="scope">
            <span>{{scope.row.timestamp | formatTime}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.type')">
          <template slot-scope="scope">
            <span
              :class="{green:(scope.row.txType=='0'|| scope.row.txType=='1005')}"
              class="red Gilroy-Bold"
            >{{$t('TxType.'+[scope.row.txType])}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.value')">
          <template slot-scope="scope">
            <span>{{scope.row.value | formatMoney}} LAT</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            {{$t('tradeAbout.fee')}}
            <span style="color:#999999;">(LAT)</span>
          </template>
          <template slot-scope="scope">
            {{scope.row.actualTxCost}}
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
          :total="pageTotal>5000?5000:pageTotal"
          :pager-count="9"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from "@/services/API-services";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      selectIndex: 1,
      newRecordFlag: false,
      tableData: {"errMsg":"","code":0,"totalCount":500000,"displayTotalCount":0,"totalPages":50000,"data":[{"txHash":"0x088a050199e6b115c82f00f5369cff99ca878d9b7524c593e91d6d5b0cb8d342","from":"0xa24586b5114ee3d9c8a9c922226b323e05648ad4","to":"0xf15e15739d1e4e6357fe66724188dc52beff2e87","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571733385216,"timestamp":1571679103208,"blockNumber":181650,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0xe252037c9e44375d81e0f3539131a08ca268f4b19921468b91cab4bba4507bbd","from":"0xa24586b5114ee3d9c8a9c922226b323e05648ad4","to":"0xf15e15739d1e4e6357fe66724188dc52beff2e87","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571733385216,"timestamp":1571679103208,"blockNumber":181650,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0x22c76649677b173e6ac35844411239f6bd2f78c80679c5667eae9540e3dc9e30","from":"0xa24586b5114ee3d9c8a9c922226b323e05648ad4","to":"0xf15e15739d1e4e6357fe66724188dc52beff2e87","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571733385216,"timestamp":1571679103208,"blockNumber":181650,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0xb388e006206a76f5aaf3c02b796be83e0b9a58dbecf379708b49f3375d2a46e7","from":"0xa7655fdb0378074fa1d6d6c0899564586b620c40","to":"0x08645ad577cf4b9868a6773c98b2a8dff6ca65b0","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571733385216,"timestamp":1571679103208,"blockNumber":181650,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0x4b033435c0b6f8345c4f70d1e48b4b19ef60259d6c27f0503041c7daa286902e","from":"0xa7655fdb0378074fa1d6d6c0899564586b620c40","to":"0x08645ad577cf4b9868a6773c98b2a8dff6ca65b0","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571733385216,"timestamp":1571679103208,"blockNumber":181650,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0x58fbe816ee281688284d7d9864d1cd45de34ae61ca6b6005a9c08e8021f7f05b","from":"0xa7655fdb0378074fa1d6d6c0899564586b620c40","to":"0x08645ad577cf4b9868a6773c98b2a8dff6ca65b0","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571733385216,"timestamp":1571679103208,"blockNumber":181650,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0x8046ad2d7df15629c73e1dac139f59aaed21e74a3a61d4c9c915428364ea97b0","from":"0x91a537bfe39651110695053a1b0950eb79a64a0e","to":"0x69f9f27a6990556dd6482d4d22f3123d7496e938","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571733385216,"timestamp":1571679103208,"blockNumber":181650,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0x304b0f967adaa75f82cccbdb14fd82b68a04b10e9fab1fcf4d8dd95741bbed32","from":"0x91a537bfe39651110695053a1b0950eb79a64a0e","to":"0x69f9f27a6990556dd6482d4d22f3123d7496e938","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571733385216,"timestamp":1571679103208,"blockNumber":181650,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0x140379014d5cbe35e2b6e3c56d90619f21a2aaf9427861cc55eccc8d04133e93","from":"0x91a537bfe39651110695053a1b0950eb79a64a0e","to":"0x69f9f27a6990556dd6482d4d22f3123d7496e938","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571733385216,"timestamp":1571679103208,"blockNumber":181650,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0x55b9ea13d5b092fbaa885fee02b5a54f247fe546a45dd069282a19183bbc1454","from":"0x37c025e9291e0aaa998e046f25660f709bc63c8b","to":"0xab98694b5b6bced2522860329eb7127f9d61af4d","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571733385216,"timestamp":1571679103208,"blockNumber":181650,"failReason":"","receiveType":"account","txReceiptStatus":1}]}.data,
      currentPage: 1,
      pageSize: 20,
      pageTotal: 1,
      tradeTotal: 0,
      tradeType: ""
    };
  },
  props: {
    address: String,
    type: String,
    tradeCount: Object
  },
  computed: {},
  watch: {},
  components: {},
  methods: {
    //获取交易列表 下分页
    getTradeList(pageNo) {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        txType: this.tradeType
      };
      if (pageNo) {
        param.pageNo = pageNo;
      }
      let methodName = "";
      if (this.type == "block") {
        param.blockNumber = this.address;
        methodName = "transactionListByBlock";
      } else {
        param.address = this.address;
        methodName = "transactionListByAddress";
      }
      apiService.trade[methodName](param)
        .then(res => {
          let { data, totalPages, totalCount, code, errMsg } = res;
          if (code == 0) {
            this.tableData = data;
            this.pageTotal = totalCount;
            if (!this.tradeType) {
              this.tradeTotal = totalCount;
            }
            //判断最新记录是否显示  总数
            this.tradeTotal > 5000
              ? (this.newRecordFlag = true)
              : (this.newRecordFlag = false);
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
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
    typeChange(index, type) {
      this.selectIndex = index;
      this.tradeType = type;

      this.currentPage = 1;
      this.getTradeList();
    },
    exportFn() {
      //跳转至下载页
      const { href } = this.$router.resolve({
        path: "/download",
        query: {
          address: this.address,
          exportname: "account"
        }
      });
      window.open(href, "_blank");
    },
    goTradeDetail(hash) {
      this.$router.push({
        path: "/trade-detail",
        query: {
          txHash: hash
        }
      });
    },
    goAddressDetail(address) {
      this.$router.push({
        path: "/address-detail",
        query: {
          address: address
        }
      });
    },
    //进入区块详情
    goBlockDetail(blockHeight) {
      this.$router.push({
        path: "/block-detail",
        query: {
          height: blockHeight
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
.block-trade .common-trade.block-trade-wrap {
  padding-left: 0px;
  .pagination-box {
    padding-bottom: 60px;
    margin-right: 30px;
  }
  .table .el-table th {
    padding-left: 30px;
  }
  .trade-tab-wrap {
    padding-left: 30px;
  }
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
}
.active {
  font-family: Gilroy-Medium;
}
</style>
<style lang="less">
.block-trade-wrap {
  .table .el-table {
    th {
      padding-left: 20px;
    }
    td {
      padding-left: 20px;
    }
  }
}
</style>

