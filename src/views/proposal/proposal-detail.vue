<template>
  <div class="trade-list-wrap">
    <div class="page-title fontSize34">{{$t('tradeAbout.proposalDetail').toUpperCase()}}</div>
    <el-row>
      <el-col :span="12">
        <div>
          <span class="proposal-id">#PIP1034</span>
          <span class="github">See on github</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" style="float:right;margin-top:-50px;">
          <el-button type="primary" size="small">投票中</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <div class="update item">版本升级-V x.x.x</div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">提案类型：</div>
            </el-col>
            <el-col :span="15">
              <div class="content">升级提案</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">升级版本：</div>
            </el-col>
            <el-col :span="15">
              <div class="content">V x.x.x</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">提案人：</div>
            </el-col>
            <el-col :span="15">
              <div class="content proposer">Jack</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">提案ID：</div>
            </el-col>
            <el-col :span="15">
              <div class="content">0x1da4b53ae05c28e8ee1679f2681fab24ccdf327f94cb98e29760296a799dc024</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">提案时间：</div>
            </el-col>
            <el-col :span="15">
              <div class="content">Sep-26-2018 08:27:49 AM+UTC[835215]</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">投票结束区块：</div>
            </el-col>
            <el-col :span="15">
              <div class="content progress">
                <div class="percentage"></div>
                <div class="progress-text">Block 31,519,000</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="desc">&nbsp;</div>
            </el-col>
            <el-col :span="15">
              <div class="content">预计时间 Sep-26-2018 08:27:49 AM+UTC[835215]</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">预设升级区块：</div>
            </el-col>
            <el-col :span="15">
              <div class="content progress">
                <div class="percentage"></div>
                <div class="progress-text">Block 31,519,000</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="desc">&nbsp;</div>
            </el-col>
            <el-col :span="15">
              <div class="content">预计时间 Sep-26-2018 08:27:49 AM+UTC[835215]</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="item">
          <div class="desc" style="margin:38px 0px 10px 0px;">提案描述：</div>
          <div>暂无描述</div>
        </div>
      </el-col>
    </el-row>
    <div class="big-progress">
      <div class="big-percentage"></div>
      <div class="big-progress-text">Support 519,000 50.67%</div>
      <div class="big-progress-pass">Pass Condition>=60%</div>
    </div>
    <div style="color:#33;font-family: Gilroy-Regular;font-size:14px;">Vote upgrade number: 135</div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" key="firstTable" size="mini">
        <el-table-column :label="$t('tradeAbout.PIPSN')" min-width="20%">
          <template slot-scope="scope">
            <span style="font-weight:bold;">
              <i class="el-icon-time"></i>
              {{scope.row.url}}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.proposalTitle')" min-width="20%">
          <template slot-scope="scope">
            <div class="flex-special" @click="goDetail(scope.row.proposalHash)">
              <span class="cursor normal ellipsis" style="font-weight:bold">{{scope.row.title}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.proposalType')" min-width="40%">
          <template slot-scope="scope">
            <span>{{scope.row.type | proposalType}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.proposalStatus')" show-overflow-tooltip min-width="20%">
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
    async getVoteList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      console.warn('获取提案详情》》》', param);
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
    async detail(proposalHash) {
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
      this.getVoteList();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getVoteList();
    },
  },
  //生命周期函数
  created() {
    console.log(this.$route.query.proposalHash);
    // this.getVoteList();
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
.proposal-id {
  font-family: Gilroy-Medium;
  font-size: 20px;
  color: #0798de;
  letter-spacing: 0;
  line-height: 24px;
}
.github {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  letter-spacing: 0;
}
.update {
  font-family: Gilroy-Medium;
  font-size: 20px;
  color: #000000;
  letter-spacing: 0;
  line-height: 24px;
}
.desc {
  font-family: Gilroy-Medium;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  width: 200px;
}
.item {
  margin: 8px 0px;
}
.proposer {
  font-family: Gilroy-Medium;
  font-size: 13px;
  color: #0798de;
  letter-spacing: 0;
}
.progress {
  position: relative;
  width: 188px;
  height: 20px;
  background: #d5d5d5;
  border-radius: 1px;
}
.percentage {
  position: absolute;
  top: 0;
  width: 90px;
  height: 100%;
  background: #000000;
}
.progress-text {
  position: absolute;
  margin: 2px 0px 0px 20px;
  top: 0;
  font-family: Gilroy-Medium;
  font-size: 12px;
  color: white;
  letter-spacing: 0;
}

.big-progress {
  position: relative;
  margin: 10px 0px 30px 0px;
  width: 100%;
  height: 54px;
  background: #d5d5d5;
  border-radius: 1px;
}
.big-percentage {
  position: absolute;
  top: 0;
  width: 30%;
  height: 100%;
  background: #e2f3dc;
}
.big-progress-text {
  position: absolute;
  margin: 16px 0px 0px 20px;
  top: 0;
  font-family: Gilroy-Regular;
  font-size: 12px;
  color: #3bb012;
  letter-spacing: 0;
  line-height: 24px;
}
.big-progress-pass {
  position: absolute;
  margin: 0px 20px 16px 0px;
  bottom: 0;
  right: 0;
  font-family: Gilroy-Regular;
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  line-height: 24px;
}
</style>

