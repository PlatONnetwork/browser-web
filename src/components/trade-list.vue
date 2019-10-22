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
    <div class="table">
      <el-table :data="tableData" style="width: 100%" key="firstTable" size="mini">
        <el-table-column :label="$t('tradeAbout.hash')">
          <template slot-scope="scope">
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
          </template>
        </el-table-column>
        <el-table-column :label="$t('blockAbout.operatorAddress')" v-if="type=='block'">
          <template slot-scope="scope">
            <!-- <span
              class="cursor blue ellipsis"
              @click="goAddressDetail(scope.row.from)"
            >{{scope.row.from}}</span> -->
            <div class="flex-special">
              <span
                class="cursor normal ellipsis ellipsisWidth"
                @click="goAddressDetail(scope.row.from)"
              >{{scope.row.from|sliceStr(14)}}</span>
            </div>
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
          <!-- :label="$t('tradeAbout.fee')" prop="actualTxCost" -->
          <template slot="header">
            {{$t('tradeAbout.fee')}}
            <span style="color:#999999;">(LAT)</span>
          </template>
          <template slot-scope="scope">
            {{scope.row.actualTxCost}}
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableData" style="width: 100%" key="firstTable" size="mini">
        <el-table-column :label="$t('tradeAbout.hash')">
          <template slot-scope="scope">
            <!-- <div class="flex-special">
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
            </div> -->
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
          </template>
          
        </el-table-column>
        <el-table-column :label="$t('blockAbout.operatorAddress')" v-if="type=='block'">
          <template slot-scope="scope">
            <p
              class="cursor blue ellipsis percent60"
              @click="goAddressDetail(scope.row.from)"
            >{{scope.row.from}}</p>
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
          <!-- :label="$t('tradeAbout.fee')" prop="actualTxCost" -->
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
      tableData: [],
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
            this.tableData = {"errMsg":"","code":0,"totalCount":500000,"displayTotalCount":0,"totalPages":50000,"data":[{"txHash":"0x0055c192307447c9b2422e1c78c359d4f3a1ceb98023e84cb2bf113c57590579","from":"0x23d00a087cc428a57124f7a9a7339245f74ffd5c","to":"0xae84511a85a24ab46e3596b4299807f718955659","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571735725162,"timestamp":1571679535267,"blockNumber":182050,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0x113c5642222096232db285b9f6b98c9aea8442b2859877088da52af451f13c4b","from":"0x23d00a087cc428a57124f7a9a7339245f74ffd5c","to":"0xae84511a85a24ab46e3596b4299807f718955659","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571735725162,"timestamp":1571679535267,"blockNumber":182050,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0x3019a1f8b6ee36e3171ece8c4b2ace451d8cd1939be62d7d30077fbcfd7270e5","from":"0x23d00a087cc428a57124f7a9a7339245f74ffd5c","to":"0xae84511a85a24ab46e3596b4299807f718955659","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571735725162,"timestamp":1571679535267,"blockNumber":182050,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0xfc2141ab4003d3055e4261f907f9519f683bb370309993c187bfe0279737e38e","from":"0x40b4234fbf577213360641564dcd12e103bef787","to":"0x368d42cdcbb77721854fac465367a953b720b81d","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571735725162,"timestamp":1571679535267,"blockNumber":182050,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0xa09bc80b6414c8ef10e8b97874de4537deaf60f5243befdc6a6d88e250d33491","from":"0x40b4234fbf577213360641564dcd12e103bef787","to":"0x368d42cdcbb77721854fac465367a953b720b81d","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571735725162,"timestamp":1571679535267,"blockNumber":182050,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0x5879e8305b00ed24595b47d1f287d612d509711d9acfe3231b59a5610fc997f1","from":"0x40b4234fbf577213360641564dcd12e103bef787","to":"0x368d42cdcbb77721854fac465367a953b720b81d","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571735725162,"timestamp":1571679535267,"blockNumber":182050,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0xb684975bd0abf6644ef0dc984a7a283bc1252076e35f64f6de47a254be7fbe3a","from":"0x4de7df72920357eb3b200ffdb8c14c99a50cd35c","to":"0x2750950457b9ac0e91d027b6c7883372838c32a6","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571735725162,"timestamp":1571679535267,"blockNumber":182050,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0xae4d223358dd52739da5ad87778db6014675132dc8cfd7a26b9bbb723d0cf7fd","from":"0x4de7df72920357eb3b200ffdb8c14c99a50cd35c","to":"0x2750950457b9ac0e91d027b6c7883372838c32a6","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571735725162,"timestamp":1571679535267,"blockNumber":182050,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0x4bfadad11f89349440c5340dda82a69674a8c1766d74f7e45e7cbf4f64a1d7a6","from":"0x4de7df72920357eb3b200ffdb8c14c99a50cd35c","to":"0x2750950457b9ac0e91d027b6c7883372838c32a6","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571735725162,"timestamp":1571679535267,"blockNumber":182050,"failReason":"","receiveType":"account","txReceiptStatus":1},{"txHash":"0x693e7282da0ce53d958ee0a8d80fcc9720ac437988085574b7d32bb215336165","from":"0x2750950457b9ac0e91d027b6c7883372838c32a6","to":"0x6f8572e378ec2f5ca43b62aff42e89356b8b3b2e","value":"0","actualTxCost":"0.010534","txType":"0","serverTime":1571735725162,"timestamp":1571679535267,"blockNumber":182050,"failReason":"","receiveType":"account","txReceiptStatus":1}]}.data;
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

