<template>
  <div class="trade-list-wrap">
    <div class="page-title fontSize34">
      {{ $t('tradeAbout.proposalDetail').toUpperCase() }}
    </div>
    <el-row class="row-info">
      <el-col :span="18">
        <div class="proposal-box">
          <a class="proposal-id" :href="detailData.url" target="_blank"
            ># {{ detailData.pipNum }}</a
          >
          <br v-if="windowWidth < 751" />
          <a class="github" :href="detailData.url" target="_blank">
            <i></i>
            See on github
          </a>
        </div>
      </el-col>
      <el-col :span="6">
        <div
          class="proposal-status grid-content bg-purple-light Gilroy-Bold"
          style="float: right; margin-top: -50px"
          v-if="detailData.status"
        >
          <span
            class="yellow vote-status yellow-status"
            v-if="detailData.status == 1"
            >{{ $t('proposalStatus.' + [detailData.status]) }}</span
          >
          <span
            class="red vote-status red-status"
            v-else-if="detailData.status == 3 || detailData.status == 6"
            >{{ $t('proposalStatus.' + [detailData.status]) }}</span
          >
          <span class="green vote-status" v-else>{{
            $t('proposalStatus.' + [detailData.status])
          }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-details">
      <el-col :span="14">
        <div class="update">
          <p v-if="detailData.topic">{{ detailData.topic }}</p>
          <p v-else-if="!detailData.topic && detailData.type == 1">
            {{ $t('proposalOption.' + [detailData.type]) }}-{{
              detailData.pipNum
            }}
          </p>
          <p v-else-if="!detailData.topic && detailData.type == 2">
            {{ $t('tradeAbout.versionUp') }}-V
            <span style="font-size: 16px">{{ detailData.newVersion }}</span>
          </p>
          <p v-else-if="!detailData.topic && detailData.type == 4">
            {{ $t('proposalOption.' + [detailData.type]) }}-{{
              detailData.pipNum
            }}
          </p>
          <p v-else-if="!detailData.topic && detailData.type == 3">
            {{ $t('proposalOption.' + [detailData.type]) }}-{{
              detailData.pipNum
            }}
          </p>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="6">
              <div class="desc">{{ $t('tradeAbout.proposalType') }}：</div>
            </el-col>
            <el-col :span="15">
              <div class="content">
                <span class="fontSize13">{{
                  $t('proposalOption.' + [detailData.type])
                }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="item" v-if="detailData.type == '4'">
          <el-row>
            <el-col :span="6">
              <div class="desc">{{ $t('tradeAbout.proposalToCancel') }}：</div>
            </el-col>
            <el-col :span="15">
              <div class="content fontSize13" v-if="detailData.canceledTopic">
                {{ detailData.canceledTopic }}
              </div>
              <div class="content fontSize13" v-else>
                {{ $t('proposalOption.' + [detailData.type]) }}-{{
                  detailData.pipNum
                }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="item" v-if="detailData.type == '4'">
          <el-row>
            <el-col :span="6">
              <div class="desc">{{ $t('tradeAbout.cancellID') }}：</div>
            </el-col>
            <el-col :span="16">
              <div
                class="content fontSize13"
                :style="{ wordBreak: 'break-all' }"
              >
                {{ detailData.canceledPipId }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="item" v-if="detailData.type == '2'">
          <el-row>
            <el-col :span="6">
              <div class="desc">{{ $t('tradeAbout.upgradeVersion') }}：</div>
            </el-col>
            <el-col :span="15">
              <div class="content new-version">{{ detailData.newVersion }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="6">
              <div class="desc">{{ $t('tradeAbout.proposer') }}：</div>
            </el-col>
            <el-col :span="15">
              <div
                class="content proposer cursor"
                @click="goNodeDetail(detailData.nodeId)"
              >
                {{ detailData.nodeName }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="6">
              <div class="desc">{{ $t('tradeAbout.proposalID') }}：</div>
            </el-col>
            <el-col :span="16">
              <div
                class="content fontSize13"
                :style="{ wordBreak: 'break-all' }"
              >
                {{ detailData.proposalHash }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="6">
              <div class="desc">{{ $t('tradeAbout.proposalTime') }}：</div>
            </el-col>
            <el-col :span="15">
              <!-- {{detailData.timestamp | formatTime}}[{{detailData.inBlock}}] -->
              <div class="content fontSize13">
                <span>{{ detailData.timestamp | formatTime }}</span
                ><span class="Gilroy-Medium">[{{ detailData.inBlock }}]</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col :span="6">
              <div class="desc">{{ $t('tradeAbout.votingEndBlock') }}：</div>
            </el-col>
            <el-col :span="15">
              <div class="content progress">
                <div
                  class="percentage"
                  :style="{ width: endVotingPercentage }"
                ></div>
                <div class="progress-text">
                  Block {{ detailData.endVotingBlock | formatNumber }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="desc">&nbsp;</div>
            </el-col>
            <el-col :span="15">
              <div class="content estimatedTime">
                {{ $t('contract.estimatedTime') }}:
                {{ detailData.endVotingBlockTime | formatTime }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="item" v-if="detailData.type == 2">
          <el-row>
            <el-col :span="6">
              <div class="desc">{{ $t('tradeAbout.activeBlock') }}：</div>
            </el-col>
            <el-col :span="15">
              <p class="active-block">
                #{{ detailData.activeBlock | formatNumber }}
              </p>
            </el-col>
          </el-row>
        </div>
        <div class="item" v-if="detailData.type == 3">
          <el-row>
            <el-col :span="6">
              <div class="desc">{{ $t('tradeAbout.effectiveBlock') }}：</div>
            </el-col>
            <el-col :span="15">
              <p class="active-block">
                #{{ detailData.activeBlock | formatNumber }}
              </p>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="item" v-if="detailData.type == 3">
          <div class="desc" style="margin: 41px 0px 21px 0px">
            {{ $t('tradeAbout.parameterDetails') }}：
          </div>
          <div class="fontSize15 Gilroy-Medium">
            <span class="parame-name">{{ detailData.paramName }}:</span
            ><span class="parame-new-value"
              >{{ detailData.newValue }}&nbsp;</span
            ><span class="parame-value"
              >({{ $t('tradeAbout.originalValue') }}：{{
                detailData.currentValue
              }})</span
            >
          </div>
        </div>
        <div class="item">
          <div
            class="desc"
            :style="{
              margin:
                detailData.type == 3
                  ? '35px 0px 10px 0px'
                  : '41px 0px 10px 0px',
            }"
          >
            {{ $t('tradeAbout.propasalDescription') }}：
          </div>
          <div class="fontSize15">
            {{
              detailData.description
                ? detailData.description
                : $t('tradeAbout.noDescription')
            }}
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 升级提案进度 type==2 -->
    <div class="big-progress" v-if="detailData.type == '2'">
      <div class="big-percentage" :style="{ width: yesPercentage + '%' }">
        <!-- <div class="otherVoteYesText" :style="{'display': voteDisplayStyle.yes ? 'block' : 'none'}">
                 <div class='vote-text'>{{$t('tradeAbout.support')}}</div>
                 <div class='vote-number'>{{detailData.yeas | formatNumber}} <span>{{yesPercentage}}</span></div>
        </div>-->
      </div>
      <div class="big-progress-text">
        <div class="vote-text">
          {{ $t('tradeAbout.support') }}&nbsp;({{
            detailData.yeas | formatNumber
          }})
        </div>
        <div class="vote-number">
          <span>{{ yesPercentage }}%</span>
        </div>
      </div>
      <div
        class="big-progress-pass"
        :style="{ left: detailData.supportRateThreshold }"
      >
        <span
          >{{ $t('tradeAbout.passCondition') }}>={{
            detailData.supportRateThreshold
          }}</span
        >
      </div>
    </div>
    <!-- 其他提案进度 -->
    <div class="other-progress" v-else>
      <div class="join-progress">
        {{ $t('tradeAbout.currentParticipationrate') }}：
        <span class="Gilroy-Medium fontSize13">
          {{ curRatio }}% ({{ $t('tradeAbout.participationRate')
          }}{{ detailData.participationRate }})</span
        >
      </div>
      <div
        class="voteYes"
        :style="{ width: yesPercentage == 0 ? '0%' : yesPercentage + 1 + '%' }"
        @mouseover="mouseoverQuit(yesPercentage, 'yes')"
        @mouseleave="mouseleaveQuit()"
      >
        <div
          class="voteYesText"
          :style="{ display: yesPercentage < 4 ? 'none' : 'block' }"
        >
          <div class="vote-text">
            {{ $t('tradeAbout.yes') }}&nbsp;({{
              detailData.yeas | formatNumber
            }})
          </div>
          <div class="vote-number">
            <span>{{ yesPercentage }}%</span>
          </div>
        </div>
        <div
          class="otherVoteYesText"
          :style="{ display: voteDisplayStyle.yes ? 'block' : 'none' }"
        >
          <div class="vote-text">
            {{ $t('tradeAbout.yes') }}&nbsp;<span
              >({{ detailData.yeas | formatNumber }})</span
            >
          </div>
          <div class="vote-number">
            <span>{{ yesPercentage }}%</span>
          </div>
        </div>
      </div>
      <div
        class="voteNo"
        :style="{ width: noPercentage == 0 ? '0%' : noPercentage + 1 + '%' }"
        @mouseover="mouseoverQuit(noPercentage, 'no')"
        @mouseleave="mouseleaveQuit()"
      >
        <div
          class="voteNoText"
          :style="{ display: noPercentage < 4 ? 'none' : 'block' }"
        >
          <div class="vote-text">
            {{ $t('tradeAbout.no') }}&nbsp;<span
              >({{ detailData.nays | formatNumber }})</span
            >
          </div>
          <div class="vote-number">
            <span>{{ noPercentage }}%</span>
          </div>
        </div>
        <div
          class="otherVoteNoText"
          :style="{ display: voteDisplayStyle.not ? 'block' : 'none' }"
        >
          <div class="vote-text">
            {{ $t('tradeAbout.no') }}&nbsp;<span
              >({{ detailData.nays | formatNumber }})</span
            >
          </div>
          <div class="vote-number">
            <span>{{ noPercentage }}%</span>
          </div>
        </div>
      </div>
      <div
        class="voteQuit"
        :style="{
          width: quitPercentage == 0 ? '0%' : quitPercentage + 1 + '%',
        }"
        @mouseover="mouseoverQuit(quitPercentage, 'quit')"
        @mouseleave="mouseleaveQuit()"
      >
        <div
          class="voteQuitText"
          :class="{ voteQuitDisplay: 'true' }"
          :style="{ display: quitPercentage < 4 ? 'none' : 'block' }"
        >
          <div class="vote-text">
            {{ $t('tradeAbout.abstain') }}&nbsp;({{
              detailData.abstentions | formatNumber
            }})
          </div>
          <div class="vote-number">
            <span>{{ quitPercentage }}%</span>
          </div>
        </div>
        <div
          class="otherVoteQuitText"
          :style="{ display: voteDisplayStyle.quit ? 'block' : 'none' }"
        >
          <div class="vote-text">
            {{ $t('tradeAbout.abstain') }}&nbsp;<span
              >({{ detailData.abstentions | formatNumber }})</span
            >
          </div>
          <div class="vote-number">
            <span>{{ quitPercentage }}%</span>
          </div>
        </div>
      </div>
      <div
        class="big-progress-pass"
        :style="{ left: detailData.supportRateThreshold }"
      >
        <span
          >{{ $t('tradeAbout.passCondition') }}>={{
            detailData.supportRateThreshold
          }}</span
        >
      </div>
    </div>
    <div style="color: #333; font-family: Gilroy-Regular; font-size: 14px">
      {{
        detailData.type == 2
          ? $t('tradeAbout.voteUpgradeNumber')
          : $t('tradeAbout.NumberOfVotes')
      }}: {{ pageTotal }}
    </div>
    <div
      class="voteOption Gilroy-Medium"
      v-if="
        detailData.type == 1 || detailData.type == 3 || detailData.type == 4
      "
    >
      <a
        class="cursor"
        :class="{ active: selectIndex == 0 }"
        @click="selectVoteOption(0, '')"
        >{{ $t('contract.all') }}</a
      >
      <a
        class="cursor"
        :class="{ active: selectIndex == 1 }"
        @click="selectVoteOption(1, '1')"
        >YES</a
      >
      <a
        class="cursor"
        :class="{ active: selectIndex == 2 }"
        @click="selectVoteOption(2, '2')"
        >NO</a
      >
      <a
        class="cursor"
        :class="{ active: selectIndex == 3 }"
        @click="selectVoteOption(3, '3')"
        >ABSTAIN</a
      >
    </div>
    <div class="table">
      <div class="table-content">
        <el-table
          :data="tableData"
          style="width: 100%"
          key="firstTable"
          size="mini"
          v-loading="loading"
        >
          <el-table-column :label="$t('tradeAbout.voter')" min-width="20%">
            <template slot-scope="scope">
              <router-link
                class="cursor blue ellipsis"
                :to="getNodeUrl(scope.row.voter)"
              >
                {{ scope.row.voterName }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column :label="$t('tradeAbout.voteOption')" min-width="20%">
            <template slot-scope="scope">
              <span>
                <span v-if="detailData.type == 2">{{$t('voteStatus.1')}}</span>
                <span v-else>{{$te('voteStatus.' + scope.row.option) ? $t('voteStatus.' + scope.row.option) : $t('voteStatus.other')}}</span>
                <!-- <span
                  class="grey"
                  v-if="
                    scope.row.option == 11 ||
                    scope.row.option == 12 ||
                    scope.row.option == 13
                  "
                >
                  {{ $t('voteStatus.invalid') }}
                </span> -->
              </span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('tradeAbout.trasactionHash')"
            min-width="40%"
          >
            <template slot-scope="scope">
              <router-link
                class="cursor blue hash-width ellipsis"
                :to="getTradeUrl(scope.row.txHash)"
              >
                {{ scope.row.txHash }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('tradeAbout.trasactionTime')"
            show-overflow-tooltip
            min-width="20%"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp | formatTime }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box" v-if="paginationFlag">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="sizes,total,  prev, pager, next"
          :total="searchTotal"
          :pager-count="9"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDecimal } from '@/services/utils';
import apiService from '@/services/API-services';
import { timeDiff } from '@/services/time-services';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'trade-list',
  data() {
    return {
      newRecordFlag: false,
      paginationFlag: true,
      curRatio: '',
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      searchTotal: 0,
      endVotingPercentage: '',
      yesPercentage: 0,
      noPercentage: 0,
      quitPercentage: 0,
      voteOptionTag: true,
      voteDisplayStyle: {
        quit: false,
        not: false,
        yes: false,
      },
      selectIndex: 0,
      detailData: {},
      loading: false,
      pageLoading: false,
    };
  },
  props: {},
  computed: {},
  watch: {},
  components: {},
  methods: {
    //获取投票列表
    async getVoteList(option = '') {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        proposalHash: this.$route.query.proposalHash,
        option: option,
      };
      this.loading = true;
      try {
        let {
          data,
          totalPages,
          totalCount,
          code,
          errMsg,
        } = await apiService.proposal.voteList(param);
        this.tableData = data;
        if (!option) {
          this.pageTotal = totalCount;
        }
        this.searchTotal = totalCount;
      } catch (error) {
        error.errMsg && this.$message.error(error.errMsg);
      } finally {
        this.loading = false;
      }
    },
    //获取提案详情
    async getProposalDetail() {
      console.log(this.$route.query.proposalHash);
      let param = {
        proposalHash: this.$route.query.proposalHash,
      };
      this.pageLoading = true;
      try {
        let { data, code, errMsg } = await apiService.proposal.proposalDetails(
          param
        );
        this.detailData = data;
        const voteCount = data.yeas + data.nays + data.abstentions;
        let tmpYesPercentage, tmpNoPercentage, tmpQuitPercentage;
        this.curRatio = (
          (Number(voteCount) / Number(data.accuVerifiers)) *
          100
        ).toFixed(2);
        if (voteCount == 0) {
          tmpYesPercentage = 0;
          tmpNoPercentage = 0;
          tmpQuitPercentage = 0;
        } else {
          tmpYesPercentage =
            data.type == '2'
              ? (data.yeas / data.accuVerifiers) * 100
              : (data.yeas / voteCount) * 100;
          tmpNoPercentage = (data.nays / voteCount) * 100;
          tmpQuitPercentage = (data.abstentions / voteCount) * 100;
        }
        let tmpEndVotingPercentage =
          data.curBlock - 0 > data.endVotingBlock - 0
            ? '100%'
            : ((data.curBlock - data.inBlock) /
                (data.endVotingBlock - data.inBlock)) *
                100 +
              '%';
        // debugger
        this.endVotingPercentage = tmpEndVotingPercentage;
        if (tmpQuitPercentage > 0) {
          //存在弃权情况
          this.yesPercentage = formatDecimal(tmpYesPercentage, 2); //.toFixed(2); 同意
          this.noPercentage = formatDecimal(tmpNoPercentage, 2); //.toFixed(2); 反对
          this.quitPercentage = formatDecimal(
            100 - (Number(this.yesPercentage) + Number(this.noPercentage)),
            2
          );
        } else {
          //非
          this.yesPercentage = formatDecimal(tmpYesPercentage, 2); //.toFixed(2); 同意
          if (voteCount == 0) {
            this.noPercentage = this.yesPercentage;
          } else {
            this.noPercentage = (100 - Number(this.yesPercentage)).toFixed(2);
          }
        }
        // this.yesPercentage = formatDecimal(tmpYesPercentage, 2); //.toFixed(2); 同意
        // this.noPercentage = formatDecimal(tmpNoPercentage, 2); //.toFixed(2); 反对
        // this.quitPercentage = formatDecimal(tmpQuitPercentage, 2); //.toFixed(2); 齐全
      } catch (error) {
        error.errMsg && this.$message.error(error.errMsg);
      } finally {
        this.pageLoading = false;
      }
    },
    //进入验证人详情
    async goVerifierDetail(nodeid) {
      this.$router.push({
        path: '/node-detail',
        query: {
          nodeId: nodeid,
        },
      });
    },
    timeDiffFn(beginTime, endTime) {
      return timeDiff(beginTime, endTime);
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
    selectVoteOption(index, type) {
      this.selectIndex = index;
      this.currentPage = 1;
      this.getVoteList(type);
    },
    mouseoverQuit(param1, param2) {
      if (param1 < 4 && param2 == 'quit') {
        this.voteDisplayStyle.quit = true;
      } else if (param1 < 4 && param2 == 'no') {
        this.voteDisplayStyle.not = true;
      } else if (param1 < 4 && param2 == 'yes') {
        this.voteDisplayStyle.yes = true;
      }
    },
    mouseleaveQuit() {
      this.voteDisplayStyle.quit = false;
      this.voteDisplayStyle.not = false;
      this.voteDisplayStyle.yes = false;
    },
  },
  //生命周期函数
  created() {
    this.getProposalDetail();
    this.getVoteList();
  },
  computed: {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.grey {
  color: #999;
}
.active-block {
  font-family: Gilroy-Medium;
  font-size: 13px;
  line-height: 20px;
}
.parame-name {
  background: #eeeeee;
  border-radius: 4px;
  border-radius: 4px;
  padding: 5px 8px;
  margin-right: 12px;
}
.parame-new-value {
  display: inline-block;
}
.parame-value {
  font-family: Gilroy-Regular;
  font-size: 13px;
  color: #999999;
  display: inline-block;
  margin-top: 8px;
  word-break: break-all;
  // line-height: 28px;
}
.sub-title {
  display: flex;
  justify-content: space-between;
}
.trade-count {
  color: #333;
}
.proposal-box {
  margin: 23px 0 10px;
}
.proposal-id {
  margin-right: 16px;
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
  i {
    background: url(../../assets/images/icon-link.svg) no-repeat;
    display: inline-block;
    width: 14px;
    height: 14px;
  }
}
.vote-status {
  // opacity: 0.15;
  background: rgba(59, 176, 18, 0.15);
  border-radius: 2px;
  line-height: 26px;
  padding: 7px 10px;
  @media screen and (max-width: 750px) {
    min-width: 64px;
  }
}
.new-version {
  color: #000000;
  font-size: 18px;
  line-height: 21px;
  font-family: Gilroy-Medium;
}
.yellow-status {
  background: rgba(255, 192, 23, 0.15);
}
.red-status {
  background: rgba(207, 50, 110, 0.15);
}
.join-progress {
  position: absolute;
  top: -28px;
  right: 0px;
  color: #666;
  span {
    color: #000000;
  }
  @media screen and (max-width: 750px) {
    top: -40px;
  }
}
.voteOption {
  margin-top: 15px;
  a {
    margin-right: 20px;
    font-size: 16px;
    line-height: 19px;
    color: #999999;
    &.active {
      color: #0798de;
    }
  }
}
.update {
  font-family: Gilroy-Medium;
  font-size: 20px;
  color: #000000;
  letter-spacing: 0;
  line-height: 24px;
  &.item {
    margin-top: 10px;
  }
}
.desc {
  font-family: Gilroy-Medium;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  width: 200px;
}
.item {
  margin: 17px 0px;
}
.proposer {
  font-family: Gilroy-Medium;
  font-size: 13px;
  color: #0798de;
  letter-spacing: 0;
  &:hover {
    color: #0e52ac;
  }
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
  height: 70px;
  background: #eee;
  border-radius: 1px;
}
.estimatedTime {
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}
.big-percentage {
  position: absolute;
  top: 0;
  //   width: 30%;
  height: 100%;
  background: #e2f3dc;
  .otherVoteYesText {
    position: absolute;
    left: 5px;
    top: 10px;
    z-index: 999;
    .vote-text {
      color: #3bb012;
      font-size: 12px;
      line-height: 24px;
    }
    .vote-number {
      font-size: 16px;
      color: #3bb012;
      line-height: 16px;
      position: relative;
      span {
        font-size: 14px;
        color: #7dcb63;
      }
    }
  }
}
.big-progress-text {
  position: absolute;
  top: 3px;
  font-family: Gilroy-Regular;
  font-size: 12px;
  color: #3bb012;
  letter-spacing: 0;
  line-height: 24px;
  padding: 3px 0 0 5px;
  .vote-text {
    color: #3bb012;
    font-size: 12px;
    line-height: 24px;
  }
  .vote-number {
    font-size: 16px;
    color: #3bb012;
    line-height: 24px;
    span {
      font-size: 14px;
      color: #7dcb63;
      line-height: 24px;
      font-family: Gilroy-Bold;
    }
  }
}
.big-progress-pass {
  position: absolute;
  height: 100%;
  // width:1px;
  border-left: 1px solid #999;
  font-family: Gilroy-Regular;
  font-size: 12px;
  color: #999999;
  line-height: 24px;
  width: 0;
  white-space: nowrap;
  // right: 24%;
  span {
    display: inline-block;
    margin: 48px 0 0 6px;
  }
}
.other-progress {
  margin: 15px 0px 30px 0px;
  @media screen and (max-width: 750px) {
    margin: 20px 0px 30px 0px;
  }
  width: 100%;
  height: 70px;
  display: flex;
  background: #eeeeee;
  border-radius: 1px;
  position: relative;
  .voteYes {
    height: 100%;
    background: #e2f3dc;
    float: left;
    padding: 3px 0 0 5px;
    position: relative;
    .voteYesText {
      margin-top: 4px;
      .vote-text {
        color: #3bb012;
        font-size: 12px;
        line-height: 24px;
      }
      .vote-number {
        font-size: 16px;
        color: #3bb012;
        line-height: 24px;
        position: relative;
        span {
          font-size: 14px;
          color: #7dcb63;
          line-height: 24px;
          font-family: Gilroy-Bold;
        }
      }
    }
    .otherVoteYesText {
      position: absolute;
      left: 2px;
      // margin-top: 4px;
      top: 54px;
      z-index: 999;
      padding: 5px 15px;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      line-height: 18px;
      .vote-text {
        color: #3bb012;
        font-size: 12px;
        // line-height: 24px;
        span {
          color: #7dcb63;
        }
      }
      .vote-number {
        font-size: 16px;
        color: #3bb012;
        // line-height: 24px;
        position: relative;
        span {
          font-size: 14px;
          color: #3bb012;
          font-family: Gilroy-Bold;
        }
      }
    }
  }

  .voteNo {
    height: 100%;
    background: #f8e0e9;
    float: left;
    padding: 3px 0 0 5px;
    position: relative;
    .voteNoText {
      //  display: none;
      // margin-left: 28px;
      margin-top: 4px;
      .vote-text {
        color: #cf326e;
        font-size: 12px;
        line-height: 24px;
      }
      .vote-number {
        font-size: 16px;
        color: #cf326e;
        line-height: 24px;
        position: relative;
        span {
          font-size: 14px;
          color: #e798b6;
          line-height: 24px;
          font-family: Gilroy-Bold;
        }
      }
    }
    .otherVoteNoText {
      position: absolute;
      left: 6px;
      top: 54px;
      z-index: 999;
      padding: 5px 15px;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      line-height: 18px;
      .vote-text {
        color: #cf326e;
        font-size: 12px;
        // line-height: 24px;
        span {
          color: #e798b6;
        }
      }
      .vote-number {
        font-size: 16px;
        color: #cf326e;
        // line-height: 24px;
        position: relative;
        span {
          font-size: 14px;
          font-family: Gilroy-Bold;
        }
      }
    }
  }
  .voteQuit {
    height: 100%;
    background: #d9d9d9;
    float: left;
    padding: 3px 0 0 5px;
    position: relative;
    .voteQuitText {
      // display:none;
      margin-top: 4px;
      .vote-text {
        color: #000000;
        font-size: 12px;
        line-height: 24px;
      }
      .vote-number {
        font-size: 16px;
        color: #000000;
        line-height: 24px;
        position: relative;
        span {
          font-size: 14px;
          color: #888888;
          line-height: 24px;
          width: 200px;
          font-family: Gilroy-Bold;
        }
      }
    }
    .otherVoteQuitText {
      // margin-top: 4px;
      position: absolute;
      left: 6px;
      top: 54px;
      z-index: 999;
      padding: 5px 15px;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      line-height: 18px;
      .vote-text {
        color: #000000;
        font-size: 12px;
        span {
          color: #888888;
        }
      }
      .vote-number {
        font-size: 16px;
        color: #000000;
        // line-height: 24px;
        position: relative;
        font-family: Gilroy-Bold;
      }
    }
  }

  .passRatio {
    float: left;
    height: 100%;
    width: 1px;
    position: absolute;
    color: #999999;
    font-size: 12px;
    border: 1px solid #999;
    span {
      position: absolute;
      bottom: 0;
      width: 150px;
      margin-left: 6px;
    }
  }
}

@media (max-width: 750px) {
  .row-info {
    .proposal-status {
      margin-top: 0 !important;
    }
  }
  .row-details {
    & > .el-col {
      width: 100%;
      float: unset;
    }
  }
}
.table-content {
  width: 100%;
  overflow-x: auto;
}
@media (max-width: 500px) {
  .row-details {
    .item {
      .el-row {
        display: flex;
        .el-col {
          float: unset;
          width: auto;
          flex: 1;
          &:first-child {
            flex: 0;
            min-width: 130px;
          }
        }
      }
    }
  }
}

@media (max-width: 750px) {
  .table-content {
    .el-table {
      overflow: visible;
      width: 750px !important;
      min-width: 750px;
    }
  }
}
</style>
