<template>
  <div class="gray-content content-padding">
    <el-row v-if="type!='history'">
      <el-col :span="18" class="validators-tab">
        <div class="tabs">
          <el-button
            size="medium"
            :class="{active:tabIndex==1}"
            @click="tabChange(1,'all')"
          >{{$t('contract.all')}}</el-button>
          <el-button
            size="medium"
            :class="{active:tabIndex==2}"
            @click="tabChange(2,'active')"
          >{{$t('nodeStatus.2')}}</el-button>
          <el-button
            size="medium"
            :class="{active:tabIndex==3}"
            @click="tabChange(3,'candidate')"
          >{{$t('nodeStatus.1')}}</el-button>
        </div>
        <div class="validators-search">
          <el-input
            :placeholder="$t('nodeInfo.searchValidator')"
            clearable
            v-model="keyword"
            @keyup.enter.native="searchFn"
            @change="clearInput"
            size="mini"
          ></el-input>
          <el-button
            type="primary"
            class="el-btn el-searchs"
            @click="searchFn"
          >{{ $t("search.searchBtn") }}</el-button>
        </div>
      </el-col>
      <el-col :span="6" class="historical-validators">
        <el-button
          type="text"
          class="historical-btn"
          @click="goHistory"
        >{{$t('nodeInfo.historicalValidators')}}>></el-button>
      </el-col>
    </el-row>
    <el-row
      class="history-validators-header"
      type="flex"
      justify="space-between"
      v-if="type=='history'"
    >
      <el-col :span="12">
        <div style="margin-top: 14px;">
          {{$t('nodeInfo.historicalValidators')}}(
          <b>{{pageTotal}}</b>)
        </div>
      </el-col>
      <el-col :span="12" class="historical-validators">
        <div class="validators-search history-validators-search">
          <el-input
            :placeholder="$t('nodeInfo.searchValidator')"
            clearable
            v-model="keyword"
            @keyup.enter.native="searchFn"
            @change="clearInput"
            size="mini"
          ></el-input>
          <el-button
            type="primary"
            class="el-btn el-searchs"
            @click="searchFn"
          >{{ $t("search.searchBtn") }}</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="table node-table">
      <el-table :data="tableData" style="width: 100%" key="firstTable" size="mini">
        <el-table-column
          type="index"
          width="80"
          :label="type!='history'?$t('nodeInfo.rank'):$t('common.serialnumber')"
        ></el-table-column>
        <el-table-column :label="type!='history'?$t('nodeInfo.validatorName'):$t('nodeInfo.name')">
          <template slot-scope="scope">
            <div class="flex-special validator-name">
              <el-tooltip
                class="item"
                effect="dark"
                placement="bottom"
                v-if="scope.row.isRecommend"
              >
                <div slot="content">
                  <span class="title-warning">{{ $t("nodeInfo.officialRecommendation") }}</span>
                </div>
                <img src="../../assets/images/icon-remark.png" class="icon-remark cursor" />
              </el-tooltip>
              <img :src="scope.row.stakingIcon" v-if="scope.row.stakingIcon" class="node-avtor" alt />
              <img
                src="../../assets/images/node-avtor-small.png"
                class="node-avtor"
                v-if="!scope.row.stakingIcon"
                alt
              />
              <p
                class="cursor normal ellipsis percent60 fontSize15"
                @click="goDetail(scope.row.nodeId)"
              >{{scope.row.nodeName?scope.row.nodeName:'------'}}</p>
              <el-tooltip class="item" effect="dark" placement="bottom" v-if='scope.row.isInit'>
                <!-- v-if='scope.row.isInit' -->
                <div slot="content">
                  <span class="title-warning">{{ $t("nodeInfo.nodeMsg") }}</span>
                </div>
                <!-- <i class="iconfont iconxinxi cursor" style="margin-left:8px;color:#D5D5D5;font-size:12px;">&#xe63f;</i> -->
                <i class="el-icon-info cursor" style="margin-left:8px;color:#D5D5D5;font-size:12px;line-height: 23px;"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.status')"  width="120">
          <template slot-scope="scope">
            <span class="Gilroy-Bold"
              :class="{green:scope.row.status==2,yellow:(scope.row.status==3 || scope.row.status==4),red:scope.row.status==1,}"
            >{{$t('nodeStatus.'+[scope.row.status])}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('nodeInfo.totalStakePower')" v-if="type!='history'">
          <template slot-scope="scope">
            <span>{{scope.row.totalValue | formatMoney}} LAT</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('nodeInfo.delegationsDelegators')" v-if="type!='history'">
          <template slot-scope="scope">
            <span>{{scope.row.delegateValue | formatMoney}} LAT\<span class="Gilroy-Medium">{{scope.row.delegateQty | formatNumber}}</span></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('nodeInfo.pendingDelegations')" v-if="type=='history'">
          <template slot-scope="scope">
            <span>{{scope.row.statDelegateReduction | formatMoney}}LAT</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('nodeInfo.stability')" class="stability-cell"  width="120">
          <template slot-scope="scope">
            <div class="node-stability">
              <div style="margin-right:10px;" class="self-tooltip">
                <i class="icon-low-block cursor"></i>
                <span>{{scope.row.slashLowQty}}</span>
                <p>{{$t('nodeInfo.lowBlockRate')}}</p>
              </div>
              <div class="self-tooltip self-tooltip-sign">
                <i class="icon-two-sign cursor"></i>
                <span>{{scope.row.slashMultiQty}}</span>
                <p>{{$t('nodeInfo.twoSignNum')}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('nodeInfo.producedBlock')"  width="120">
          <template slot-scope="scope">
            <span>{{scope.row.blockQty | formatNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('nodeInfo.yield')" v-if="type!='history'" width="120">
          <template slot-scope="scope">
            <span class="Gilroy-Medium" v-if="!scope.row.isInit">{{scope.row.expectedIncome}}%</span>
            <span class="Gilroy-Medium" v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('nodeInfo.exitTime')" v-if="type=='history'" width="220">
          <template slot-scope="scope">
            <span>{{scope.row.leaveTime | formatTime}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100,150]"
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
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Validator",
  data() {
    return {
      tabIndex: 1,
      tableData: [],
      currentPage: 1,
      pageSize: 150,
      pageTotal: 1,
      keyword: "",
      queryStatus: "all",
      timer: null
    };
  },
  props: {
    type: String
  },
  computed: {},
  watch: {},
  components: {},
  methods: {
    tabChange(index, type) {
      this.tabIndex = index;
      this.queryStatus = type;
      this.currentPage = 1;
      this.getList();
    },
    clearInput(value) {
      this.currentPage = 1;
      this.tabIndex = 1;
      this.queryStatus = "all";
      this.getList();
    },
    getList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        key: this.keyword.trim()
      };
      let methodName = "";
      if (this.type == "history") {
        methodName = "historyStakingList";
      } else {
        param.queryStatus = this.queryStatus;
        methodName = "aliveStakingList";
      }
      apiService.node[methodName](param)
        .then(res => {
          let { data, totalPages, totalCount, code, errMsg } = res;
          if (code == 0) {
            this.tableData = data;
            console.log(this.tableData);
            this.pageTotal = totalCount;
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
      this.getList();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getList();
    },
    //查询
    searchFn() {
      this.currentPage = 1;
      this.tabIndex = 1;
      this.queryStatus = "all";
      this.getList();
    },
    //进入节点详情
    goDetail(nodeId) {
      this.$router.push({
        path: "/node-detail",
        query: {
          address: nodeId
        }
      });
    },
    goHistory() {
      this.$router.push({
        path: "/history-node"
      });
    }
  },
  //生命周期函数
  created() {
    this.getList();
    if (this.type != "history") {
      this.timer = setInterval(() => {
        // console.log(222)
        this.getList();
      }, 5000);
    }
  },
  mounted() {},
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
.historical-validators {
  text-align: right;
  .historical-btn {
    display: inline-block;
  }
}
.validators-tab {
  display: flex;
}
.validators-search {
  width: 400px;
  height: 42px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  display: flex;
  margin-left: 30px;
  .el-searchs {
    background: #fff;
    font-size: 14px;
    border: none;
    border-radius: 0px 4px 4px 0px;
    border-left: 1px solid #e6e6e6;
    color: #0798de;
    &:hover {
      background: #fff;
      color: #5cb2db;
      border-left: 1px solid #e6e6e6;
    }
    &:active {
      color: #0e52ac;
    }
  }
}

.node-stability {
  display: flex;
  i {
    vertical-align: sub;
  }
}
.history-validators-search {
  float: right;
}
.validator-name {
  position: relative;
  .icon-remark {
    position: absolute;
    top: 5px;
    left: -14px;
    width: 14px;
    height: 14px;
  }
}
.node-avtor {
  width: 30px;
  height: 30px;
  margin-right: 8px;
  border-radius: 50%;
  margin-top: -3px;
}
</style>
<style lang="less">
.validators-search {
  .el-input--mini .el-input__inner {
    height: 40px;
    line-height: 40px;
    background: #fff;
  }
}
.node-table .el-table {
  overflow: visible;
  .cell {
    overflow: visible;
  }
  .el-table__body-wrapper {
    overflow: visible;
  }
}
</style>
