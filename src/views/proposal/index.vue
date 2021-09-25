<template>
  <div class="trade-list-wrap proposal-list">
    <div class="page-title fontSize34">{{$t('menu.proposal').toUpperCase()}}</div>
    <div class="sub-title">
      <div class="fontSize14 trade-count">&nbsp;</div>
      <div class="pagination-box1" v-if="paginationFlag">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" layout="prev, pager, next" :page-size="pageSize" :total="pageTotal" :pager-count="9"></el-pagination>
      </div>
    </div>

    <div class="table" :class="{'no-data':!tableData.length}">
      <el-table :data="tableData" v-loading="loading" style="width: 100%" key="firstTable" size="mini" :empty-text="$t('tradeAbout.noProposalData')">
        <el-table-column :label="$t('tradeAbout.PIPSN')" min-width="120">
          <template slot-scope="scope">
            <span style="font-weight:bold; display: flex;">
              <!-- <i class="el-icon-time"></i> -->
              <img class='iconlink' src="@/assets/images/icon-link.svg" />
              <!-- {{scope.row.url}} -->
              <a :href="scope.row.url" class="blue ellipsis" target="_blank">{{scope.row.pipNum}}</a>
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.proposalTitle')"  min-width="180">
          <template slot-scope="scope">
            <div class="flex-special" @click="goDetail(scope.row.proposalHash)">
              <p class="cursor blue ellipsis fontSize15" v-if="scope.row.topic">{{scope.row.topic}}</p>
              <p class="cursor blue ellipsis fontSize15" v-else-if="!scope.row.topic&&scope.row.type==1">{{$t('proposalOption.'+[scope.row.type])}}-{{scope.row.pipNum}}</p>
              <p class="cursor blue ellipsis fontSize15" v-else-if="!scope.row.topic&&scope.row.type==2">{{$t('tradeAbout.versionUp')}}-V {{scope.row.newVersion}}</p>
              <p class="cursor blue ellipsis fontSize15" v-else-if="!scope.row.topic&&scope.row.type==4">{{$t('proposalOption.'+[scope.row.type])}}-{{scope.row.pipNum}}</p>
              <p class="cursor blue ellipsis fontSize15" v-else-if="!scope.row.topic&&scope.row.type==3">{{$t('proposalOption.'+[scope.row.type])}}-{{scope.row.pipNum}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.proposalType')"   min-width="120">
          <template slot-scope="scope">
            <span>{{$t('proposalOption.'+[scope.row.type])}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.status')" width="120">
          <template slot-scope="scope">
            <span class="Gilroy-Bold" :class="{yellow:scope.row.status==1,red:scope.row.status==3||scope.row.status==6,green:scope.row.status==2||scope.row.status==4||scope.row.status==5}">{{$t('proposalStatus.'+[scope.row.status])}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.votingEndBlock')" width="260">
          <template slot-scope="scope">
            <div class="flex-special content progress percent60">
              <!-- <span class="cursor normal ellipsis ellipsisWidth" @click="goAddressDetail(scope.$index,scope.row)">{{scope.row.endVotingBlock}}</span> -->
                <div class="percentage" :style="{'width': ((scope.row.curBlock-scope.row.inBlock)/(scope.row.endVotingBlock-scope.row.inBlock))*100+'%'}"></div>
                <div class="progress-text">Block {{scope.row.endVotingBlock}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.proposalTime')"  min-width="180">
          <template slot-scope="scope">
            <span>{{scope.row.timestamp | formatTime}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box" v-if="paginationFlag">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes, total, prev, pager, next" :total="pageTotal" :pager-count="9"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from "@/services/API-services";
import { timeDiff } from '@/services/time-services';
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
      pageTotal: 0,
      loading: false,
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
      this.loading = true;
      try {
        let { data, totalPages, totalCount, code, errMsg } = await apiService.proposal.proposalList(param);
        let tmpdata = data.sort(this.proposalTimeCompare('timestamp'));
        this.tableData = tmpdata;
        this.pageTotal = totalCount;
      } catch (error) {
        error.errMsg && this.$message.error(error.errMsg);
      } finally {
        this.loading = false;
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
      this.getProposalList();
      this.replace();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getProposalList();
      this.replace();
    },
    //提案时间排序
    proposalTimeCompare(prop){
        return function(a, b){
            let value1 = a[prop];
            let value2 = b[prop];
            return value2 - value1;
        }
    }
  },
  //生命周期函数
  created() {
    if(this.$route.query.currentPage){
      this.currentPage = this.$route.query.currentPage - 0;
      this.pageSize = this.$route.query.pageSize - 0;
    }
    this.getProposalList();
  },
  mounted() { }
};
</script>
<style lang="less" scoped>
.iconlink{
    display: inline-block;
    vertical-align: middle;
}
.sub-title {
  display: flex;
  justify-content: space-between;
}
.trade-count {
  color: #333;
}
.progress {
  position: relative;
  width: 188px;
  height: 20px;
  background: #d5d5d5;
  border-radius: 1px;
  overflow: hidden;
}
.percentage {
  position: absolute;
  top: 0;
  height: 100%;
  background: #000000;
}
.progress-text {
  position: absolute;
  margin: 0px 0px 0px 35px;
  top: 0;
  font-family: Gilroy-Medium;
  font-size: 12px;
  color: white;
  letter-spacing: 0;
  height: 100%;
  line-height: 20px;
}
</style>