<template>
  <div class="contract-detail-wrap">
    <div class="content-top-white content-padding">
      <div class="page-title fontSize34">{{$t('nodeInfo.validatorDetail')}}</div>
      <div class="node-header">
        <div class="node-header-left">
          <img :src="detailInfo.stakingIcon" v-if="detailInfo.stakingIcon" />
          <img src="../../assets/images/node-avtor.png" v-if="!detailInfo.stakingIcon" />
          <div class="node-name-wrap">
            <div class="node-name">
              <b>{{detailInfo.nodeName}}</b>
              <!-- <span>(aaa)</span> -->
              <i></i>
            </div>
            <p
              v-if="!detailInfo.isInit && detailInfo.status!=4 && detailInfo.status!=5"
            >{{$t('nodeInfo.createdat')}}: {{detailInfo.joinTime | formatTime}}</p>
            <p
              v-if="detailInfo.status==4 || detailInfo.status==5"
            >{{$t('nodeInfo.exitTime')}}: {{detailInfo.leaveTime | formatTime}}</p>
            <p v-if="detailInfo.isInit && detailInfo.status!=4 && detailInfo.status!=5">
              <i class="iconfont iconxinxi lightgray" style="color:#D5D5D5;">&#xe63f;</i>
              <span>{{$t('nodeInfo.nodeMsg')}}</span>
            </p>
          </div>
        </div>
        <div class="node-header-right">
          <span
            class="green vote-status"
            v-if="detailInfo.status==2"
          >{{$t('nodeStatus.'+[detailInfo.status])}}</span>
          <span
            class="yellow vote-status yellow-status"
            v-else-if="detailInfo.status==3 || detailInfo.status==4"
          >{{$t('nodeStatus.'+[detailInfo.status])}}</span>
          <span
            class="red vote-status red-status"
            v-else-if="detailInfo.status==1"
          >{{$t('nodeStatus.'+[detailInfo.status])}}</span>
        </div>
      </div>
      <div class="node-statistic">
        <List class="node-statistic-left" :inline="true">
          <Item class="item-odd" :label="$t('nodeInfo.electedRoundValidator')">
            <p class="Gilroy-Medium">{{detailInfo.verifierTime}}</p>
          </Item>
          <Item class="item-even" :label="$t('nodeInfo.totalReward')">
            <p>
              <!-- {{detailInfo.rewardValue | formatMoney}} -->
              <span
                class="Gilroy-Medium black fontSize18"
              >{{detailInfo.rewardValue | formatMoney |sliceFloat(0)}}</span>
              <span class="black fontSize13">{{detailInfo.rewardValue | formatMoney |sliceFloat(1)}}</span>
              <span class="fontSize13">&nbsp;LAT</span>
            </p>
          </Item>
          <Item class="item-odd" :label="$t('nodeInfo.blocks')">
            <p class="Gilroy-Medium">{{detailInfo.blockQty | formatNumber}}</p>
          </Item>
          <Item class="item-even" :label="$t('nodeInfo.yield')">
            <p
              class="Gilroy-Medium"
            >{{detailInfo.expectedIncome?(detailInfo.expectedIncome+'%'):'--'}}</p>
          </Item>
          <Item class="item-odd" :label="$t('nodeInfo.blockRate')">
            <p class="Gilroy-Medium">{{detailInfo.blockQty | percentage(detailInfo.expectBlockQty)}}%</p>
          </Item>
          <Item class="item-even" :label="$t('nodeInfo.stability')">
            <div class="stability-wrap">
              <div style="margin-right:10px;" class="self-tooltip">
                <i class="icon-low-block cursor"></i>
                <span>{{detailInfo.slashLowQty}}</span>
                <p class="Gilroy-Medium">{{$t('nodeInfo.lowBlockRate')}}</p>
              </div>
              <div class="self-tooltip self-tooltip-sign">
                <i class="icon-two-sign cursor"></i>
                <span>{{detailInfo.slashMultiQty}}</span>
                <p class="Gilroy-Medium">{{$t('nodeInfo.twoSignNum')}}</p>
              </div>
            </div>
          </Item>
        </List>
        <div class="node-statistic-right">
          <div class="canvas">
            <canvas id="canvas" width="88" height="88"></canvas>
            <div class="imgRatio">{{imgRatio}}%</div>
          </div>
          <div class="statistic-right-data">
            <Item :label="$t('nodeInfo.totalStakePower')">
              <p class="statistic-total-stake">
                <!-- {{detailInfo.totalValue | formatMoney}} -->
                <span
                  class="Gilroy-Medium black fontSize18"
                >{{detailInfo.totalValue | formatMoney |sliceFloat(0)}}</span>
                <span class="black fontSize13">{{detailInfo.totalValue | formatMoney |sliceFloat(1)}}</span>
                <span class="fontSize13">&nbsp;LAT</span>
              </p>
            </Item>
            <ul>
              <li>
                <label class="Gilroy-Medium">{{$t('nodeInfo.selfstake')}}：</label>
                <p>
                  <!-- {{detailInfo.stakingValue | formatMoney}} -->
                  <span
                    class="Gilroy-Medium black fontSize18"
                    style="font-size: 18px;"
                  >{{detailInfo.stakingValue | formatMoney |sliceFloat(0)}}</span>
                  <span
                    class="black fontSize13"
                  >{{detailInfo.stakingValue | formatMoney |sliceFloat(1)}}</span>
                  <span class="fontSize13">&nbsp;LAT</span>
                  <span
                    class="yellow"
                    v-if="detailInfo.status==4"
                  >({{$t('nodeStatus.'+[detailInfo.status])}})</span>
                </p>
              </li>
              <li v-if="detailInfo.status!=4 || detailInfo.status!=5">
                <label class="Gilroy-Medium">{{$t('deleget.acceptDelegations')}}：</label>
                <p>
                  <!-- {{detailInfo.delegateValue | formatMoney}} -->
                  <span
                    class="Gilroy-Medium black fontSize18"
                    style="font-size: 18px;"
                  >{{detailInfo.delegateValue | formatMoney |sliceFloat(0)}}</span>
                  <span
                    class="black fontSize13"
                  >{{detailInfo.delegateValue | formatMoney |sliceFloat(1)}}</span>
                  <span class="fontSize13 lat-mini">&nbsp;LAT</span>
                </p>
              </li>
              <li v-else>
                <label class="Gilroy-Medium">{{$t('deleget.Delegating')}}：</label>
                <p>
                  <!-- {{detailInfo.statDelegateReduction | formatMoney}} -->
                  <span
                    class="Gilroy-Medium"
                    style="font-size: 18px;"
                  >{{detailInfo.statDelegateReduction | formatMoney |sliceFloat(0)}}</span>
                  <span
                    class="black fontSize13"
                  >{{detailInfo.statDelegateReduction | formatMoney |sliceFloat(1)}}</span>
                  <span class="fontSize13 lat-mini">&nbsp;LAT</span>
                  <span
                    class="yellow"
                    v-if="detailInfo.statDelegateReduction>0"
                  >({{$t('deleget.undelegating2')}})</span>
                </p>
              </li>
              <li>
                <label class="Gilroy-Medium">{{$t('deleget.delegators')}}：</label>
                <p class="Gilroy-Medium">{{detailInfo.delegateQty | formatNumber}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content-padding">
      <div class="tabs">
        <el-button
          size="medium"
          :class="{active:tabIndex==1}"
          @click="tabChange(1)"
        >{{$t('nodeInfo.nodeInfo')}}</el-button>
        <el-button
          size="medium"
          :class="{active:tabIndex==2}"
          @click="tabChange(2)"
        >{{$t('nodeInfo.producedBlocks')}}</el-button>
        <el-button
          size="medium"
          :class="{active:tabIndex==3}"
          @click="tabChange(3)"
        >{{$t('nodeInfo.validatorActions')}}</el-button>
        <el-button
          size="medium"
          v-if="!detailInfo.isInit"
          :class="{active:tabIndex==4}"
          @click="tabChange(4)"
        >{{$t('deleget.delegations')}}</el-button>
      </div>
      <div class="node-detail-content">
        <div v-show="tabIndex==1">
          <h3 class="nodeInfo">{{$t('nodeInfo.basicInfo')}}</h3>
          <List>
            <Item :label="$t('nodeInfo.nodeID')">
              <span>{{detailInfo.nodeId}}</span>
              <b
                class="cursor copyicon"
                :class="{copy:!isCopy}"
                v-clipboard:copy="detailInfo.nodeId"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              ><p v-show="isCopy" style="width:100%;"><i class="el-icon-circle-check-outline"></i><span>{{copyText}}</span></p></b>
            </Item>
            <Item :label="$t('tradeAbout.operatorAddress')">
              <span
                class="blue cursor"
                @click="goAddressDetail(detailInfo.stakingAddr)"
              >{{detailInfo.stakingAddr}}</span>
              <b
                class="cursor copyicon"
                :class="{copy:!isCopy2}"
                v-clipboard:copy="detailInfo.stakingAddr"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              ><p v-show="isCopy2" style="width:100%;"><i class="el-icon-circle-check-outline"></i><span>{{copyText2}}</span></p></b>
            </Item>
            <Item :label="$t('tradeAbout.rewardAddress')">
              <span
                class="blue cursor"
                @click="goAddressDetail(detailInfo.denefitAddr)"
              >{{detailInfo.denefitAddr}}</span>
              <span class="lightgray" v-if="detailInfo.isInit">({{$t('nodeInfo.systemBuilt')}})</span>
              <b
                class="cursor copyicon"
                :class="{copy:!isCopy3}"
                v-clipboard:copy="detailInfo.denefitAddr"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              ><p v-show="isCopy3" style="width:100%;"><i class="el-icon-circle-check-outline"></i><span>{{copyText3}}</span></p></b>
            </Item>
            <Item :label="$t('tradeAbout.website')">
              <a
                class="blue cursor"
                :href="detailInfo.website"
                target="_blank"
              >{{detailInfo.website}}</a>
            </Item>
            <Item :label="$t('tradeAbout.identity')">
              <a
                class="blue cursor"
                v-if="detailInfo.externalUrl"
                :href="detailInfo.externalUrl"
                target="_blank"
              >{{detailInfo.externalId}}</a>
              <span v-else>{{detailInfo.externalId}}</span>
            </Item>
            <Item :label="$t('tradeAbout.introduction')" :prop="detailInfo.details"></Item>
          </List>
        </div>
        <div v-show="tabIndex==2">
          <div class="address-trade-last node-last">
            {{$t('blockAbout.totalProduced')}}
            <b>{{displayTotalCount | formatNumber}}</b>
            <span style="color: #3F3F3F;" v-if="newRecordFlag">{{$t('contract.showingLast')}}</span>
            <el-button size="medium export-btn" @click="exportFn">{{$t('common.export')}}</el-button>
          </div>
          <div class="table">
            <el-table :data="tableData" style="width: 100%" key="firstTable" size="mini">
              <el-table-column :label="$t('menu.block')">
                <template slot-scope="scope">
                  <span
                    class="blue cursor"
                    @click="goBlockDetail(scope.row.number)"
                  >{{scope.row.number}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.time')">
                <template slot-scope="scope">
                  <span>{{scope.row.timestamp | formatTime}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('indexInfo.txn')" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.statTxQty | formatNumber}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('blockAbout.blockReward')">
                <template slot-scope="scope">
                  <span>{{scope.row.blockReward | formatMoney}} LAT</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-box">
              <el-pagination
                background
                @size-change="handleBlockSizeChange"
                @current-change="handleBlockCurrentChange"
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
        <div v-show="tabIndex==3">
          <div class="table">
            <el-table :data="tableOperateData" style="width: 100%" key="firstTable" size="mini">
              <el-table-column :label="$t('common.time')" width="300">
                <template slot-scope="scope">
                  <span>{{scope.row.timestamp | formatTime}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('nodeInfo.actions')">
                <template slot-scope="scope">
                  <p
                    class="percent80"
                    v-if="scope.row.type==1 || scope.row.type==2 || scope.row.type==3"
                  >{{$t('actionType.'+[scope.row.type])}}</p>
                  <p
                    class="percent80"
                    v-else-if="scope.row.type==4"
                  >{{`${$t('actionType.'+[scope.row.type])}-${scope.row.title}`}}</p>
                  <p
                    class="percent80"
                    v-else-if="scope.row.type==5"
                  >{{`${$t('actionType.'+[scope.row.type])}-${scope.row.title}-${$t('voteStatus.'+[scope.row.option])}`}}</p>
                  <p
                    class="percent80"
                    v-else-if="scope.row.type==6"
                  >{{lang=='zh'?`${$t('actionType.'+[scope.row.type])}-扣除自有质押${scope.row.percent*100}%(${scope.row.amount} LAT)，移出验证节点列表`:`${$t('actionType.'+[scope.row.type])}-${scope.row.percent*100}% of self-stake slashed (${scope.row.amount} LAT), Remove the Validator List`}}</p>
                  <p
                    class="percent80"
                    v-else-if="scope.row.type==7"
                  >{{lang=='zh'?`${$t('actionType.'+[scope.row.type])}-扣除自有质押(${scope.row.amount} LAT)，移出验证节点列表`:`${$t('actionType.'+[scope.row.type])}-slashed ${scope.row.amount} LAT from self-stake, Remove the Validator List`}}</p>
                </template>
              </el-table-column>
              <el-table-column :label="$t('nodeInfo.inTxHash')">
                <template slot-scope="scope">
                  <p
                    class="blue cursor percent60 ellipsis"
                    v-if="scope.row.type!=6 && scope.row.type!=7"
                    @click="goTradeDetail(scope.row.txHash)"
                  >{{scope.row.txHash}}</p>
                  <span class="gray" v-else>{{$t('nodeInfo.systemOperation')}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('nodeInfo.inBlock')" width="150">
                <template slot-scope="scope">
                  <span
                    class="blue cursor"
                    @click="goBlockDetail(scope.row.blockNumber)"
                  >{{scope.row.blockNumber}}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-box">
              <el-pagination
                background
                @size-change="handleOperateSizeChange"
                @current-change="handleOperateCurrentChange"
                :current-page.sync="currentPage2"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize2"
                layout="sizes,total,  prev, pager, next"
                :total="pageTotal2"
                :pager-count="9"
              ></el-pagination>
            </div>
          </div>
        </div>
        <div v-show="tabIndex==4">
          <h3 class="node-deleget-title">
            {{$t('deleget.delegators')}}
            <b>{{pageTotal3 | formatNumber}}</b>
          </h3>
          <div class="table">
            <el-table :data="tableDelegetData" style="width: 100%" key="firstTable" size="mini">
              <el-table-column :label="$t('tradeAbout.delegator')">
                <template slot-scope="scope">
                  <p
                    class="blue cursor percent60 ellipsis"
                    @click="goAddressDetail(scope.row.delegateAddr)"
                  >{{scope.row.delegateAddr}}</p>
                </template>
              </el-table-column>
              <el-table-column :label="$t('contract.delegations')+'\\'+$t('deleget.percentage')">
                <template slot-scope="scope">
                  <span>{{scope.row.delegateValue | formatMoney}}\{{scope.row.delegateValue | percentage(scope.row.delegateTotalValue)}}%</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('deleget.locked')+'\\'+$t('deleget.percentage')">
                <template slot-scope="scope">
                  <span>{{scope.row.delegateLocked | formatMoney}}\{{scope.row.delegateLocked | percentage(scope.row.allDelegateLocked)}}%</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-box">
              <el-pagination
                background
                @size-change="handleDelegetSizeChange"
                @current-change="handleDelegetCurrentChange"
                :current-page.sync="currentPage3"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize3"
                layout="sizes,total,  prev, pager, next"
                :total="pageTotal3"
                :pager-count="9"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from "@/services/API-services";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

import List from "@/components/list/list";
import Item from "@/components/list/item";

export default {
  name: "node-detail",
  data() {
    return {
      address: "",
      tabIndex: 1,
      newRecordFlag: false,
      detailInfo: {},
      cxt: null,

      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 1,

      tableOperateData: [],
      currentPage2: 1,
      pageSize2: 20,
      pageTotal2: 1,

      tableDelegetData: [],
      currentPage3: 1,
      pageSize3: 20,
      pageTotal3: 1,

      displayTotalCount: 0,
      isCopy: false,
      copyText: "",
      isCopy2: false,
      copyText2: "",
      isCopy3: false,
      copyText3: "",

      imgRatio: 0
    };
  },
  props: {},
  computed: {
    lang() {
      return this.$i18n.locale.indexOf("zh") !== -1 ? "zh" : "en";
    }
  },
  watch: {},
  components: {
    List,
    Item
  },
  methods: {
    tabChange(index) {
      this.tabIndex = index;
    },
    //获取详情
    getDetail() {
      let param = {
        nodeId: this.address
      };
      apiService.node
        .detail(param)
        .then(res => {
          let { errMsg, code, data } = res;
          if (code == 0) {
            this.detailInfo = data;
            const dag =
              this.detailInfo.delegateValue / this.detailInfo.totalValue;
            this.imgRatio = (dag * 100).toFixed(2);
            this.getDelegetList();
            this.draw(dag);
          } else {
            this.detailInfo = {};
            this.$message.error(errMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    getBlockList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        nodeId: this.address
      };
      apiService.block
        .blockListByNodeId(param)
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
            totalCount > 5000
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
    exportFn() {
      //跳转至下载页
      const { href } = this.$router.resolve({
        path: "/download",
        query: {
          address: this.address,
          // description: this.description,
          exportname: "node"
          // tab:this.activeTab-1
        }
      });
      window.open(href, "_blank");
    },
    getOperateList() {
      let param = {
        pageNo: this.currentPage2,
        pageSize: this.pageSize2,
        nodeId: this.address
      };
      apiService.node
        .stakingOptRecordList(param)
        .then(res => {
          let { data, totalPages, totalCount, code, errMsg } = res;
          if (code == 0) {
            this.tableOperateData = data;
            this.pageTotal2 = totalCount;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    getDelegetList() {
      let param = {
        pageNo: this.currentPage3,
        pageSize: this.pageSize3,
        nodeId: this.address,
        stakingBlockNum: this.detailInfo.stakingBlockNum
      };
      apiService.node
        .delegationListByStaking(param)
        .then(res => {
          let { data, totalPages, totalCount, code, errMsg } = res;
          if (code == 0) {
            this.tableDelegetData = data;
            this.pageTotal3 = totalCount;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    //进入地址详情
    goAddressDetail(address) {
      this.$router.push({
        path: "/address-detail",
        query: {
          address: address
        }
      });
    },
    //进入区块详情
    goBlockDetail(height) {
      this.$router.push({
        path: "/block-detail",
        query: {
          height: height
        }
      });
    },
    //进入交易详情
    goTradeDetail(hash) {
      this.$router.push({
        path: "/trade-detail",
        query: {
          txHash: hash
        }
      });
    },
    onCopy(copy) {
      if (copy.text == this.detailInfo.nodeId) {
        this.copyText = this.$t("modalInfo.copysuccess");
        this.isCopy = true;
      } else if (copy.text == this.detailInfo.stakingAddr) {
        this.copyText2 = this.$t("modalInfo.copysuccess");
        this.isCopy2 = true;
      } else {
        this.copyText3 = this.$t("modalInfo.copysuccess");
        this.isCopy3 = true;
      }
      setTimeout(() => {
        this.isCopy = false;
        this.copyText = "";
        this.isCopy2 = false;
        this.copyText2 = "";
        this.isCopy3 = false;
        this.copyText3 = "";
      }, 2000);
    },
    onError(index) {
      if (copy.text == this.detailInfo.nodeId) {
        this.copyText = this.$t("modalInfo.copyfail");
        this.isCopy = true;
      } else if (copy.text == this.detailInfo.stakingAddr) {
        this.copyText2 = this.$t("modalInfo.copyfail");
        this.isCopy2 = true;
      } else {
        this.copyText3 = this.$t("modalInfo.copyfail");
        this.isCopy3 = true;
      }
      setTimeout(() => {
        this.isCopy = false;
        this.copyText = "";
        this.isCopy2 = false;
        this.copyText2 = "";
        this.isCopy3 = false;
        this.copyText3 = "";
      }, 2000);
    },

    // 区块列表
    handleBlockCurrentChange(val) {
      this.currentPage = val;
      this.getBlockList();
    },
    handleBlockSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getBlockList();
    },

    // 操作列表
    handleOperateCurrentChange(val) {
      this.currentPage2 = val;
      this.getOperateList();
    },
    handleOperateSizeChange(val) {
      this.currentPage2 = 1;
      this.pageSize2 = val;
      this.getOperateList();
    },

    // 委托列表
    handleDelegetCurrentChange(val) {
      this.currentPage3 = val;
      this.getDelegetList();
    },
    handleDelegetSizeChange(val) {
      this.currentPage3 = 1;
      this.pageSize3 = val;
      this.getDelegetList();
    },
    draw(dag) {
      this.cxt.clearRect(0, 0, 88, 88);
      this.cxt.beginPath();
      this.cxt.moveTo(44, 44);
      this.cxt.fillStyle = "#000";
      this.cxt.arc(44, 44, 44, 0, -Math.PI * dag * 2, true);
      this.cxt.fill();
    }
  },
  //生命周期函数
  created() {
    this.address = this.$route.query.address;
    this.getDetail();
    this.getBlockList();
    this.getOperateList();
  },
  mounted() {
    this.cxt = document.getElementById("canvas").getContext("2d");
  }
};
</script>
<style lang="less" scoped>
.contract-detail-wrap{
  padding-bottom: 1px;
}
.contractCreator {
  a {
    width: 150px;
    display: inline-block;
    vertical-align: middle;
  }
}
.vote-status {
  // opacity: 0.15;
  background: rgba(59, 176, 18, 0.15);
  border-radius: 2px;
  line-height: 26px;
  padding: 7px 10px;
}
.page-zh{
  .vote-status{
    font-weight: bold;
  }
} 
.yellow-status {
  background: rgba(255, 192, 23, 0.15);
}
.red-status {
  background: rgba(207, 50, 110, 0.15);
}
.canvas {
  width: 88px;
  height: 88px;
  position: relative;
  background: #d5d5d5;
  border-radius: 50%;
  margin-right: 30px;
  cursor: pointer;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  &:hover .imgRatio {
    display: block;
  }
}
.node-header {
  display: flex;
  justify-content: space-between;
  margin-top: 23px;
  .node-header-left {
    display: flex;
    img {
      width: 58px;
      height: 58px;
      margin-right: 15px;
      border-radius: 50%;
    }
    .node-name {
      line-height: 24px;
      b {
        font-size: 20px;
        font-family: Gilroy-Medium;
      }
      span {
        font-size: 14px;
        color: #999999;
      }
      // i{
      //     display: inline-block;
      //     width: 14px;
      //     height: 14px;
      //     background: url()
      // }
    }
    p {
      font-size: 14px;
      color: #666666;
      line-height: 16px;
      margin-top: 8px;
    }
  }
}
.node-statistic {
  display: flex;
  margin: 36px 0 20px;
  .node-statistic-left {
    width: 48%;
    margin-right: 6%;
    .item-odd{
      width: 42%;
    }
    .item-even{
      width: 58%;
    }
  }
  .stability-wrap {
    display: flex;
    width: 85%;
    margin-top: 4px;
    .self-tooltip p {
      font-size: 12px;
    }
  }
}
.node-detail-content {
  margin-top: 30px;
  .nodeInfo {
    margin-bottom: 21px;
    font-family: Gilroy-Medium;
  }
}
.node-last {
  position: relative;
  .export-btn {
    position: absolute;
    right: 0;
    top: -8px;
    background: #FBFBFC;
    font-family: Gilroy-Medium;
  }
  b {
    font-family: Gilroy-Medium;
  }
}
.statistic-right-data {
  flex: 1;
}
// 背景色
.bj {
  background-color: #fbfbfc;
}
// 粗字体
.node-header-right {
  font-family: Gilroy-Bold;
}
// 饼图百分比
.imgRatio {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  text-align: center;
  padding: 0 10px;
  //   width: 100px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  bottom: -50px;
  left: 16px;
  z-index: 9999;
  display: none;
}
</style>
<style lang="less">
.node-statistic {
  .list-item {
    width: 50%;
    p {
      // font-weight: 700;
      font-size: 18px;
    }
    label {
      line-height: 23px;
      width: 142px;
    }
    &.item-odd {
      label {
        width: 140px;
      }
      p {
        flex: 1;
      }
    }
  }
}
.node-statistic-right {
  display: flex;
  min-width: 40%;
  .list-item {
    width: 100%;
    // justify-content: space-between;
    p.statistic-total-stake {
      width: auto;
    }
  }
  ul {
    display: flex;
    justify-content: space-between;
    li {
      margin-right: 10px;
      label {
        margin-bottom: 11px;
        display: block;
        color: #666666;
      }
      p {
        // font-weight: 700;
        font-size: 18px;
        span {
          // display: block;
          font-size: 13px;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
