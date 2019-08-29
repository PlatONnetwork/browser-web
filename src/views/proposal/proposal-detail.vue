<template>
  <div class="trade-list-wrap">
    <div class="page-title fontSize34">{{$t('tradeAbout.proposalDetail').toUpperCase()}}</div>
    <el-row>
      <el-col :span="12">
        <div>
          <span class="proposal-id">{{detailData.url.split('/')[detailData.url.split('/').length-1].split('.')[0]}}</span>
          <a class="github" href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-100.md" target="_blank">See on github</a>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" style="float:right;margin-top:-50px;">
          <el-button type="primary" size="small">
            <span v-if="detailData.status == '1'">
               &nbsp;{{detailData.status | proposalStatus}}
            </span>
            <span v-else-if="detailData.status == '3'">
               &nbsp;{{detailData.status | proposalStatus}}
            </span>
            <span v-else>
               &nbsp;{{detailData.status | proposalStatus}}
            </span>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <div class="update item">{{detailData.topoc}}</div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">
                  {{$t('tradeAbout.proposalType')}}：
              </div>
            </el-col>
            <el-col :span="15">
              <div class="content">
                   <span v-if="detailData.type == '1'">
                        {{$t('tradeAbout.textProposal')}}
                  </span>
                  <span v-if="detailData.type == '2'">
                        {{$t('tradeAbout.upgradeProposal')}}
                  </span>
                  <span v-if="detailData.type == '4'">
                        {{$t('tradeAbout.quitProposal')}}
                  </span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">{{$t('tradeAbout.upgradeVersion')}}：</div>
            </el-col>
            <el-col :span="15">
              <div class="content">{{detailData.newVersion}}</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">{{$t('tradeAbout.proposer')}}：</div>
            </el-col>
            <el-col :span="15">
              <div class="content proposer">{{detailData.nodeName}}</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">{{$t('tradeAbout.proposalID')}}：</div>
            </el-col>
            <el-col :span="15">
              <div class="content">{{detailData.nodeId}}</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">{{$t('tradeAbout.proposalTime')}}：</div>
            </el-col>
            <el-col :span="15">
              <div class="content">{{detailData.timestamp | formatTime}}</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">{{$t('tradeAbout.proposalEndBlock')}}：</div>
            </el-col>
            <el-col :span="15">
              <div class="content progress">
                <div class="percentage" :style="{'width': endVotingPercentage}"></div>
                <div class="progress-text">Block {{detailData.endVotingBlock}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="desc">&nbsp;</div>
            </el-col>
            <el-col :span="15">
              <div class="content">{{$t('contract.estimatedTime')}} {{detailData.endVotingBlockTime | formatTime}} </div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="5">
              <div class="desc">{{$t('tradeAbout.activeBlock')}}：</div>
            </el-col>
            <el-col :span="15">
              <div class="content progress">
                <div class="percentage" :style="{'width': expectUpgradePercentage}"></div>
                <div class="progress-text">Block {{detailData.activeBlock}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="desc">&nbsp;</div>
            </el-col>
            <el-col :span="15">
              <div class="content">{{$t('contract.estimatedTime')}} {{detailData.activeBlockTime | formatTime}}</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="item">
          <div class="desc" style="margin:38px 0px 10px 0px;">{{$t('tradeAbout.propasalDescription')}}:</div>
          <div>{{detailData.description}}</div>
        </div>
      </el-col>
    </el-row>

    <!-- 升级提案进度 -->
    <div class="big-progress" >
        <div class="big-percentage" :style="{'width': yesPercentage}"></div>
        <div class="big-progress-text">
            <div class='vote-text'>Support</div>
            <div class='vote-number'>{{detailData.yeas}} <span>{{yesPercentage}}</span></div>
        </div>
        <div class="big-progress-pass">Pass Condition>={{detailData.supportRateThreshold}}</div>
    </div>
    <!-- 其他提案进度 -->
    <div class="other-progress" >
        <div class='voteYes'  :style="{'width': yesPercentage}">
            <div class="voteYesText">
                <div class='vote-text'>YES</div>
                <div class='vote-number'>{{detailData.yeas}} <span>{{yesPercentage}}</span></div>
            </div>
        </div>
        <div class='voteNo' v-if=quitPercentage*100 :style="{'width': noPercentage}">
            <div class="voteNoText">
                <div class='vote-text'>NO</div>
                <div class='vote-number'>{{detailData.nays}} <span>{{noPercentage}}</span></div>
            </div>
        </div>
        <div class='voteQuit' v-if=quitPercentage*100 :style="{'width': quitPercentage}">
            <div class="voteQuitText">
                 <div class='vote-text'>ABSTAIN</div>
                 <div class='vote-number'>{{detailData.abstentions}} <span>{{quitPercentage}}</span></div>
            </div>

        </div>
        <div class='passRatio'>Pass Condition>={{detailData.supportRateThreshold}}</div>
    </div>
    <div style="color:#33;font-family: Gilroy-Regular;font-size:14px;">Vote upgrade number: {{detailData.accuVerifiers}}</div>
    <div class="voteOption">
        <el-tag class="cursor" :style="styleall" @click="selectVoteOption($event)">All</el-tag>
        <el-tag class="cursor" :style="styleyes" @click="selectVoteOption($event)">YES</el-tag>
        <el-tag class="cursor" :style="styleno" @click="selectVoteOption($event)">NO</el-tag>
        <el-tag class="cursor" :style="styleabs" @click="selectVoteOption($event)">ABSTAIN</el-tag>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" key="firstTable" size="mini">
        <el-table-column :label="$t('tradeAbout.voter')" min-width="20%">
          <template slot-scope="scope">
            <span class="cursor" @click="goVerifierDetail(scope.row.nodeId)" style="font-weight:bold;">
              {{scope.row.voterName}}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.voteOption')" min-width="20%">
          <template slot-scope="scope">
            <span v-if="scope.row.option == '1'">
              &nbsp;{{scope.row.option | votePropotype}}
            </span>
            <span v-else-if="scope.row.option == '3'">
              &nbsp;{{scope.row.option | votePropotype}}
            </span>
            <span v-else>
              &nbsp;{{scope.row.option | votePropotype}}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.trasactionHash')" min-width="40%">
          <template slot-scope="scope">
            <span>{{scope.row.txHash}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tradeAbout.trasactionTime')" show-overflow-tooltip min-width="20%">
          <template slot-scope="scope">
              <span>{{scope.row.timestamp | formatTime}}</span>
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
      endVotingPercentage: '',
      expectUpgradePercentage: '',
      yesPercentage: '40%',
      noPercentage: '40%',
      quitPercentage: '20%',
      voteOptionTag: true,
      voteOptionStyle:{
          all:'#0798DE',
          yes: '#999999',
          no:'#999999',
          abs:'#999999',
      },
      detailData:{
          url: '#PIP1034',
          topoc: 'proposal title',
          type: '2',
          status:"",  //状态  1：投票中  2：通过  3：失败   4：预升级  5：升级完成   6：已取消  已通过=2 或4 或 5
          newVersion: 'v.0.7.1',
          nodeName: '节点名称',
          nodeId: '发起提案的节点ID',
          timestamp: 1566197087,
          activeBlock: '',
          description: '',
          endVotingBlock: "23242",
          endVotingBlockTime: "2018-09-09 23:04:45",
          activeBlockTime: "2018-09-09 23:04:45",
          yeas: 110, //同意的人
          nays: 11, //反对的人
          abstentions: 11, //弃权的人
          accuVerifiers: "1000", //总人数
          supportRateThreshold: "60%" //通过率
      }
    };
  },
  props: {},
  computed: {},
  watch: {},
  components: {},
  methods: {
    //获取投票列表
    async getVoteList(option='') {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        proposalHash: this.$route.query.proposalHash,
        option: option,
      };
      console.warn('获取提案详情》》》', param);
      try {
        let { data, totalPages, totalCount, code, errMsg } = await apiService.proposal.voteList(param);
        this.tableData = data;
        this.pageTotal = totalCount;

        this.newRecordFlag = (totalCount > 500000);
        this.paginationFlag = (totalPages !== 1)

      } catch (error) {
        error.errMsg && this.$message.error(error.errMsg);
      }
    },
    //获取提案详情
    async getProposalDetail(){
        console.log(this.$route.query.proposalHash);
        let param = {
            proposalHash: this.$route.query.proposalHash
        };
        try {
            let { data, code, errMsg } = await apiService.proposal.proposalDetails(param);
            // debugger
            this.detailData = data;
            let tmpYesPercentage = (data.yeas/data.accuVerifiers)*100 + '%',
                tmpNoPercentage = (data.nays/data.accuVerifiers)*100 + '%',
                tmpQuitPercentage = (data.abstentions/data.accuVerifiers)*100 + '%',
                tmpEndVotingPercentage = (data.curBlock/data.endVotingBlock > 1 ? 1 : data.curBlock/data.endVotingBlock)*100 + '%',
                tmpExpectUpgradePercentage = (data.activeBlock/data.endVotingBlock > 1 ? 1 : data.activeBlock/data.endVotingBlock)*100 + '%'
            this.expectUpgradePercentage = tmpExpectUpgradePercentage;
            this.endVotingPercentage = tmpEndVotingPercentage;
            this.yesPercentage = tmpYesPercentage;
            this.noPercentage = tmpNoPercentage;
            this.quitPercentage = tmpQuitPercentage;

        } catch(error){
            error.errMsg && this.$message.error(error.errMsg);
        }
    },
    //进入钱包地址详情或者合约详情
    async goVerifierDetail(nodeid) {
      this.$router.push({
        path: '/node-detail',
        query: {
          nodeId: nodeid,
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
    selectVoteOption(e){
        console.log(typeof(e.currentTarget.innerHTML))
        if(e.currentTarget.innerHTML == 'All'){
            this.getVoteList();
            this.voteOptionStyle = {
                all:'#0798DE',
                yes: '#999999',
                no:'#999999',
                abs:'#999999',
            };
        }else if(e.currentTarget.innerHTML == 'YES'){
            this.getVoteList('1');
            this.voteOptionStyle = {
                all:'#999999',
                yes: '#0798DE',
                no:'#999999',
                abs:'#999999',
            };
        }else if(e.currentTarget.innerHTML == 'NO'){
            this.getVoteList('2');
             this.voteOptionStyle = {
                all:'#999999',
                yes: '#999999',
                no:'#0798DE',
                abs:'#999999',
            };
        }else {
            this.getVoteList('3');
            this.voteOptionStyle = {
                all:'#999999',
                yes: '#999999',
                no:'#999999',
                abs:'#0798DE',
            };
        }
    },
  },
  //生命周期函数
  created() {
    this.getProposalDetail();
    this.getVoteList();
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
  computed: {
      styleall () {
          return {
              color: this.voteOptionStyle.all,
              backgroundColor:'white',
              borderColor: 'white',
              fontSize: '16px',
          };
      },
      styleyes(){
           return {
              color: this.voteOptionStyle.yes,
              backgroundColor:'white',
              borderColor: 'white',
              fontSize: '16px',
          };
      },
      styleno () {
          return {
              color: this.voteOptionStyle.no,
              backgroundColor:'white',
              borderColor: 'white',
              fontSize: '16px',
          };
      },
      styleabs () {
          return {
              color: this.voteOptionStyle.abs,
              backgroundColor:'white',
              borderColor: 'white',
              fontSize: '16px',
          };
      },
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
//   width: 90px;
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
//   width: 30%;
  height: 100%;
  background: #e2f3dc;
}
.big-progress-text {
  position: absolute;
  top: 0;
  font-family: Gilroy-Regular;
  font-size: 12px;
  color: #3bb012;
  letter-spacing: 0;
  line-height: 24px;
  padding:3px 0 0 5px;
  .vote-text{
       color:#3BB012;
       font-size: 12px;
       line-height: 24px;
  }
  .vote-number{
            font-size: 16px;
            color: #3BB012;
            line-height: 24px;
            span{
                font-size: 14px;
                color: #7DCB63;
                line-height: 24px;
            }
        }
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
.other-progress{
  margin: 10px 0px 30px 0px;
  width: 100%;
  height: 54px;
  background: #EEEEEE;
  border-radius: 1px;
    .voteYes{
        height: 100%;
        background: #e2f3dc;
        float:left;
        padding:3px 0 0 5px;
        .voteYesText{
            display: none;
            .vote-text{
            color:#3BB012;
            font-size: 12px;
            line-height: 24px;
        }
        .vote-number{
            font-size: 16px;
            color: #3BB012;
            line-height: 24px;
            position: relative;
            span{
                font-size: 14px;
                color: #7DCB63;
                line-height: 24px;
                position: absolute;
                left:30px;
                top:1px;
            }
        }
        }

    }
    .voteYes:hover .voteYesText{
        display:block;
    }
    .voteNo{
        height: 100%;
        background: #F8E0E9;
        float:left;
        padding:3px 0 0 5px;
        .voteNoText{
             display: none;
              .vote-text{
            color:#CF326E;
            font-size: 12px;
            line-height: 24px;
        }
        .vote-number{
            font-size: 16px;
            color: #CF326E;
            line-height: 24px;
            position: relative;
            span{
                font-size: 14px;
                color: #E798B6;
                line-height: 24px;
                position: absolute;
                left:30px;
                top:1px;
            }
        }
        }

    }
    .voteNo:hover .voteNoText{
         display:block;
    }
    .voteQuit{
        height: 100%;
        background: #D9D9D9;
        float:left;
        padding:3px 0 0 5px;
        .voteQuitText{
            display:block;
            .vote-text{
            color:#000000;
            font-size: 12px;
            line-height: 24px;
        }
        .vote-number{
            font-size: 16px;
            color: #000000;
            line-height: 24px;
            position: relative;
            span{
                font-size: 14px;
                color: #888888;
                line-height: 24px;
                position: absolute;
                left:16px;
                 top:1px;
            }
        }
        }

    }
    .voteQuit:hover .voteQuitText{
        display: block;
    }
    .passRatio{
        float:right;
        height: 100%;
        line-height: 54px;
        color: #999999;
        margin-right:60px;
    }
}

</style>

