<template>
  <div class="trade-detail-wrap">
    <div class="page-title fontSize34">{{$t('tradeAbout.tradeDetail')}}</div>
    <div class="detail-change">
      <div class="detail-copy">
        <span>{{$t('tradeAbout.transactions')}}</span>
        <i>#{{detailInfo.txHash}}</i>
        <b
          class="cursor"
          :class="{copy:!isCopy}"
          v-clipboard:copy="detailInfo.txHash"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          <p v-show="isCopy">
            <i class="el-icon-circle-check-outline"></i>
            <span>{{copyText}}</span>
          </p>
        </b>
      </div>
      <!-- 查看上下交易按钮 -->
      <div class="detail-arrow">
        <el-tooltip :content="$t('tradeAbout.viewLeft')" placement="top">
          <el-button
            icon="el-icon-arrow-left"
            @click="detailNavigate('prev')"
            :disabled="detailInfo.preHash?false:true"
          ></el-button>
        </el-tooltip>
        <el-tooltip :content="$t('tradeAbout.viewRight')" placement="top">
          <el-button
            icon="el-icon-arrow-right"
            @click="detailNavigate('next')"
            :disabled="detailInfo.nextHash?false:true"
          ></el-button>
        </el-tooltip>
      </div>
    </div>

    <div class="infomation box-relative">
      <!-- 交易状态小图标 -->
      <i
        v-if="detailInfo.txReceiptStatus==1"
        class="el-icon-success status-icon status-icon-success"
      ></i>
      <i
        v-else-if="detailInfo.txReceiptStatus==0"
        class="el-icon-warning status-icon status-icon-warning"
      ></i>
      <!-- 基础交易 -->
      <List
        :title="detailTitle(detailInfo.txType)"
        :border="true"
        v-if="detailInfo.txType=='0' || detailInfo.txType=='1' || detailInfo.txType=='2' || detailInfo.txType=='4' || detailInfo.txType=='5'|| detailInfo.txType=='4000'"
      >
        <!-- 发送方 -->
        <Item :label="$t('tradeAbout.sender')">
          <span
            class="cursor normal ellipsis"
            @click="goAddressDetail(detailInfo.from)"
          >{{detailInfo.from}}</span>
        </Item>
        <!-- 接收方 -->
        <Item :label="$t('tradeAbout.recipient')" v-if="detailInfo.txType!='4000'">
          <span
            v-if="detailInfo.receiveType=='account'"
            class="cursor normal ellipsis"
            @click="goAddressDetail(detailInfo.to)"
          >{{detailInfo.to}}</span>
          <!-- 如果是合约显示 -->
          <!-- <div class="isContract" v-if="detailInfo.receiveType!='account'">
            <i class="iconfont iconcontract red">&#xe63e;</i>
            <b>Contract</b>
            <span class="blue" @click="goDetail(type,detailInfo.to)">{{detailInfo.to}}</span>
          </div>-->
        </Item>
        <!-- 数额 -->
        <Item
          :label="$t('tradeAbout.amount')"
          v-if="detailInfo.txType!='4000'"
        >{{detailInfo.value | formatMoney }} LAT</Item>
        <!-- 锁仓 -->
        <template v-if="detailInfo.txType=='4000'">
          <Item :label="$t('tradeAbout.restrictedAccount')">
            <span
              class="cursor normal ellipsis"
              @click="goAddressDetail(detailInfo.rpaccount)"
            >{{detailInfo.rpaccount}}</span>
          </Item>
          <Item :label="$t('tradeAbout.restrictedAmount')">
            <span>{{detailInfo.rpnum | formatMoney }} LAT</span>
          </Item>
          <Item :label="$t('tradeAbout.restrictedPlan')">
            <ul class="restricted-plan">
              <li
                v-for="(item,index) in detailInfo.rpplan"
                :key="index"
              >{{item.epoch}} Epoch({{item.blockNumber}})：{{item.amount| formatMoney}} LAT</li>
            </ul>
          </Item>
        </template>
        <!-- 交易手续费 -->
        <Item :label="$t('tradeAbout.transactionFee')">
          <span>{{detailInfo.actualTxCost | formatMoney }} LAT</span>
        </Item>
      </List>
      <!-- 委托交易 -->
      <List
        :title="detailTitle(detailInfo.txType)"
        :border="true"
        v-if="detailInfo.txType=='1005' || detailInfo.txType=='1004'"
      >
        <!-- 委托人 -->
        <Item :label="$t('tradeAbout.delegator')">
          <span
            class="cursor normal ellipsis"
            @click="goAddressDetail(detailInfo.from)"
          >{{detailInfo.from}}</span>
        </Item>
        <!-- 验证人 -->
        <Item :label="$t('tradeAbout.validator')">
          <span
            v-if="detailInfo.nodeName"
            class="cursor normal ellipsis"
            @click="goNodeDetail(detailInfo.nodeId)"
          >{{detailInfo.nodeName}}</span>
          <span v-else>Null</span>
        </Item>
        <!-- 委托数量 -->
        <Item v-if="detailInfo.txType=='1004'" :label="$t('tradeAbout.delegationAmount')">
          <!-- :prop="detailInfo.value + 'LAT'" -->
          <span>{{detailInfo.txAmount | formatMoney }} LAT</span>
        </Item>
        <!-- 赎回数量 -->
        <Item v-else-if="detailInfo.txType=='1005'" :label="$t('tradeAbout.withdrawal')">
          <!-- :prop="detailInfo.value + 'LAT'" -->
          <span>{{detailInfo.applyAmount | formatMoney }} LAT</span>
          <!-- <span>({{$t('tradeAbout.undelegat')}}:{{detailInfo.actualTxCost}} LAT/{{$t('tradeAbout.successed')}})</span> -->
          <!-- 赎回失敗 -->
          <span v-if="detailInfo.txReceiptStatus==0">({{$t('tradeAbout.withFail')}})</span>
          <template v-else>
            <!-- 剩余赎回 -->
            <!-- <span
              v-if="detailInfo.redeemLocked>0"
            >({{$t('tradeAbout.remain1')}}:{{detailInfo.redeemLocked | formatMoney}} LAT)</span> -->
            <!-- 1： 赎回中 -->
            <!-- <span
              v-else-if="(detailInfo.redeemLocked=='0' || detailInfo.redeemLocked=='') && detailInfo.redeemStatus==1"
            >({{$t('tradeAbout.undelegat')}})</span> -->
            <!-- 2：赎回成功 -->
            <span>({{$t('tradeAbout.successed1')}})</span>
          </template>
        </Item>
        <!-- 交易手续费 -->
        <Item :label="$t('tradeAbout.transactionFee')">
          <!-- :prop="detailInfo.actualTxCost + 'LAT'" -->
          <span>{{detailInfo.actualTxCost | formatMoney }} LAT</span>
        </Item>
      </List>

      <!-- 治理交易 -->
      <List
        :title="detailTitle(detailInfo.txType)"
        :border="true"
        v-if="detailInfo.txType=='2000' || detailInfo.txType=='2001' || detailInfo.txType=='2002' || detailInfo.txType=='2003' || detailInfo.txType=='2004'|| detailInfo.txType=='2005'"
      >
        <!-- 提案人（创建提案特有2000） -->
        <Item
          :label="$t('tradeAbout.'+(detailInfo.txType=='2000'||detailInfo.txType=='2001'||detailInfo.txType=='2002'?'proposer':'validator'))"
        >
          <span
            v-if="detailInfo.nodeName"
            class="cursor normal ellipsis"
            @click="goNodeDetail(detailInfo.nodeId)"
          >{{detailInfo.nodeName}}</span>
          <span v-else>Null</span>
        </Item>
        <!-- 验证人 -->
        <!-- <Item v-else :label="$t('tradeAbout.validator')">
          <span
            class="cursor normal ellipsis"
            @click="goNodeDetail(detailInfo.nodeId)"
          >{{detailInfo.nodeName}}</span>
        </Item>-->
        <!-- 操作地址 -->
        <Item :label="$t('tradeAbout.operatorAddress')">
          <span
            class="cursor normal ellipsis"
            @click="goAddressDetail(detailInfo.from)"
          >{{detailInfo.from}}</span>
        </Item>
        <template v-if="detailInfo.txType!='2004'">
          <!-- 提案类型 -->
          <Item :label="$t('tradeAbout.proposalType')">
            <!-- :prop="detailInfo.proposalOption" -->
            <span v-if="detailInfo.txType!='2003'">{{$t("createType."+detailInfo.txType)}}</span>
            <span
              v-else-if="detailInfo.proposalOption"
            >{{$t("proposalOption."+detailInfo.proposalOption)}}</span>
          </Item>
          <!-- 提案ID -->
          <Item :label="$t('tradeAbout.proposalID')" :prop="detailInfo.proposalHash"></Item>
          <!-- PIP编号 -->
          <Item :label="$t('tradeAbout.PIPSN')">
            <!-- <span
              class="cursor normal ellipsis"
              @click="goDetail(detailInfo.pipNum)"
            >{{detailInfo.pipNum}}</span>-->
            <a
              v-if="detailInfo.proposalUrl"
              class="cursor normal ellipsis"
              :href="detailInfo.proposalUrl"
              target="_blank"
              rel="noopener noreferrer"
            >{{detailInfo.pipNum}}</a>
            <a v-else class="ellipsis" rel="noopener noreferrer">{{detailInfo.pipNum}}</a>
          </Item>
          <!-- 提案标题 -->
          <Item :label="$t('tradeAbout.proposalTitle')">
            <span
              class="cursor normal ellipsis"
              v-if="detailInfo.proposalTitle"
              @click="goProposalDetail(detailInfo.proposalHash)"
            >{{detailInfo.proposalTitle}}</span>
            <span
              class="cursor normal ellipsis"
              @click="goProposalDetail(detailInfo.proposalHash)"
              v-else-if="!detailInfo.proposalTitle&&detailInfo.txType=='2000'"
            >{{$t('createType.'+[detailInfo.txType])}}-{{detailInfo.pipNum}}</span>
            <span
              class="cursor normal ellipsis"
              @click="goProposalDetail(detailInfo.proposalHash)"
              v-else-if="!detailInfo.proposalTitle&&detailInfo.txType=='2001'"
            >
              {{$t('tradeAbout.versionUp')}}-V
              <span
                style="font-size:16px;"
              >{{detailInfo.proposalNewVersion}}</span>
            </span>
            <span
              class="cursor normal ellipsis"
              @click="goProposalDetail(detailInfo.proposalHash)"
              v-else-if="!detailInfo.proposalTitle&&detailInfo.txType=='2005'"
            >{{$t('createType.'+[detailInfo.txType])}}-{{detailInfo.pipNum}}</span>
            <span
              class="cursor normal ellipsis"
              @click="goProposalDetail(detailInfo.proposalHash)"
              v-else-if="!detailInfo.proposalTitle&&detailInfo.txType=='2002'"
            >{{$t('createType.'+[detailInfo.txType])}}-{{detailInfo.pipNum}}</span>
            <span
              class="cursor normal ellipsis"
              @click="goProposalDetail(detailInfo.proposalHash)"
              v-else-if="!detailInfo.proposalTitle&&detailInfo.txType=='2003'"
            >{{$t('proposalOption.'+[detailInfo.proposalOption])}}-{{detailInfo.pipNum}}</span>
          </Item>
        </template>

        <!-- 投票（提案投票特有） -->
        <Item :label="$t('tradeAbout.vote')" v-if="detailInfo.txType=='2003'">
          <span v-if="detailInfo.proposalOption==2" class="green vote-status Gilroy-Bold">SUPPORT</span>
          <span
            class="green vote-status Gilroy-Bold"
            v-else-if="detailInfo.voteStatus"
          >{{detailInfo.voteStatus==1?'YES':detailInfo.voteStatus==2?'NO':detailInfo.voteStatus==3?'ABSTAIN':''}}</span>
        </Item>
        <!-- 声明版本(版本声明特有) -->
        <Item
          :label="$t('tradeAbout.version')"
          v-if="detailInfo.txType=='2004'"
          :prop="detailInfo.declareVersion"
        ></Item>
        <!-- 交易手续费 -->
        <Item :label="$t('tradeAbout.transactionFee')">
          <span>{{detailInfo.actualTxCost | formatMoney }} LAT</span>
        </Item>
      </List>

      <!-- 验证人交易 -->
      <List
        :title="detailTitle(detailInfo.txType)"
        :border="true"
        v-if="detailInfo.txType=='1000' || detailInfo.txType=='1001' || detailInfo.txType=='1002' || detailInfo.txType=='1003' || detailInfo.txType=='3000'"
      >
        <!-- 举报人（举报验证人特有） -->
        <Item v-if="detailInfo.txType=='3000'" :label="$t('tradeAbout.reporter')">
          <span
            class="cursor normal ellipsis"
            @click="goAddressDetail(detailInfo.from)"
          >{{detailInfo.from}}</span>
        </Item>
        <!-- 验证人(都有) -->
        <Item :label="$t('tradeAbout.validator')">
          <p
            v-if="detailInfo.txType!='3000'"
            class="cursor blue"
            @click="goNodeDetail(detailInfo.nodeId)"
          >
            <span v-if="detailInfo.nodeName">{{detailInfo.nodeName}}</span>
            <span v-else>Null</span>
          </p>
          <p
            v-else-if="detailInfo.txType=='3000'&&detailInfo.evidences.length"
            class="cursor blue"
            @click="goNodeDetail(detailInfo.evidences[0].verify)"
          >
            <span v-if="detailInfo.evidences[0].nodeName">{{detailInfo.evidences[0].nodeName}}</span>
            <span v-else>Null</span>
          </p>
        </Item>
        <!-- 举报类型，举报证据（举报验证人特有） -->
        <template v-if="detailInfo.txType=='3000'">
          <!-- 举报类型 -->
          <Item :label="$t('tradeAbout.reportType')" :prop="$t('tradeAbout.doubleSiging')"></Item>
          <!-- 举报证据 -->
          <Item :label="$t('tradeAbout.reportEvidence')" :prop="detailInfo.evidence"></Item>
          <!-- 举报结果 -->
          <Item :label="$t('tradeAbout.reportResult')">
            <span
              class="green vote-status"
              :class="{'red-status':detailInfo.reportStatus==1}"
            >{{detailInfo.reportStatus==2?$t('tradeAbout.success'):$t('tradeAbout.fail')}}</span>
          </Item>
          <!-- 举报奖励 -->
          <Item :label="$t('tradeAbout.reportReward')">
            <!-- :prop="detailInfo.reportRewards|formatMoney" -->
            <span>{{detailInfo.reportRewards | formatMoney}} LAT</span>
          </Item>
        </template>
        <!-- 操作地址（举报验证人没有） -->
        <Item v-if="detailInfo.txType!='3000'" :label="$t('tradeAbout.operatorAddress')">
          <span
            class="cursor normal ellipsis"
            @click="goAddressDetail(detailInfo.from)"
          >{{detailInfo.from}}</span>
        </Item>
        <template v-if="detailInfo.txType=='1000'||detailInfo.txType=='1001'">
          <!-- 身份认证ID(创建，编辑验证人) -->
          <Item :label="$t('tradeAbout.identity')">
            <a
              v-if="detailInfo.externalId"
              class="cursor normal ellipsis"
              :href="detailInfo.externalUrl"
              target="_blank"
            >{{detailInfo.externalId}}</a>
            <a v-else>Null</a>
          </Item>
          <!-- 奖励账户(创建，编辑验证人) -->
          <Item :label="$t('tradeAbout.rewardAddress')">
            <span
              class="cursor normal ellipsis"
              @click="goAddressDetail(detailInfo.benefitAddr)"
            >{{detailInfo.benefitAddr}}</span>
          </Item>
        </template>

        <!-- 版本（创建验证人特有） -->
        <Item
          :label="$t('tradeAbout.version1')"
          v-if="detailInfo.txType=='1000'"
          :prop="detailInfo.programVersion || 'Null'"
        ></Item>
        <template v-if="detailInfo.txType=='1000'||detailInfo.txType=='1001'">
          <!-- 官网(创建，编辑验证人) -->
          <Item :label="$t('tradeAbout.website')">
            <!-- <span class="blue" @click="goDetail(type,detailInfo.website)">{{detailInfo.website}}</span> -->
            <a
              class="cursor normal ellipsis"
              :href="'http:\/\/'+detailInfo.website"
              target="_blank"
              rel="noopener noreferrer"
            >{{detailInfo.website ||'Null'}}</a>
          </Item>
          <!-- 描述(创建，编辑验证人) -->
          <Item :label="$t('tradeAbout.introduction')" :prop="detailInfo.details || 'Null'"></Item>
        </template>

        <!-- 质押数量（创建验证人，增加质押） -->
        <Item
          v-if="detailInfo.txType=='1000'||detailInfo.txType=='1002'"
          :label="$t('tradeAbout.stakeAmount')"
        >
          <!-- :prop="detailInfo.value" -->
          <span>{{detailInfo.txAmount | formatMoney}} LAT</span>
        </Item>
        <template v-if="detailInfo.txType=='1003'">
          <!-- 退回数量（退出验证人特有） -->
          <Item :label="$t('tradeAbout.returnAmount')">
            <!-- :prop="detailInfo.applyAmount" -->
            <span>{{detailInfo.applyAmount | formatMoney}} LAT</span>
            <!-- <span>:{{detailInfo.formatMoney}} LAT/</span> -->
            <!-- 1： 退回中 -->
            <span v-if="detailInfo.redeemStatus==1">({{$t('tradeAbout.pend')}})</span>
            <!-- 2：退回成功 -->
            <span v-else-if="detailInfo.redeemStatus==2">({{$t('tradeAbout.successed')}})</span>
            <!-- 剩余退回 -->
            <span v-else>({{$t('tradeAbout.remain')}}:{{detailInfo.redeemLocked | formatMoney}} LAT)</span>
          </Item>
          <!-- 预计到账区块（退出验证人特有） -->
          <Item
            class="return-amount"
            :label="$t('tradeAbout.returnBlock')"
            :prop="detailInfo.redeemUnLockedBlock"
          ></Item>
        </template>
        <template></template>
        <!-- 交易手续费 -->
        <Item :label="$t('tradeAbout.transactionFee')">
          <!-- :prop="detailInfo.actualTxCost + 'LAT'" -->
          <span>{{detailInfo.actualTxCost | formatMoney}} LAT</span>
        </Item>
      </List>
      <!-- 交易信息infomation -->
      <List :title="$t('tradeAbout.information')" class="common-info" :border="true">
        <!-- 失败信息 -->
        <div v-if="detailInfo.txReceiptStatus==0" class="warn-info">
          <span class="yellow">{{$t('tradeAbout.warn')}}:</span>
          <span>{{detailInfo.failReason?detailInfo.failReason:$t("tradeAbout.transactionFailure")}}</span>
        </div>
        <!-- 状态 -->
        <Item :label="$t('tradeAbout.status')">
          <span
            v-if="detailInfo.txReceiptStatus==1"
            class="status-icon-success Gilroy-Bold"
          >{{$t('tradeAbout.success')}}</span>
          <span
            v-else-if="detailInfo.txReceiptStatus==0"
            class="pink Gilroy-Bold"
          >{{$t('tradeAbout.fail')}}</span>
        </Item>
        <!-- 交易哈希 -->
        <Item :label="$t('tradeAbout.txhash')" :prop="detailInfo.txHash"></Item>
        <!-- 时间戳 -->
        <Item
          :label="$t('tradeAbout.timeStamp')"
          :prop="detailInfo.timestamp | formatTime"
        ></Item>
        <!-- 区块 -->
        <Item :label="$t('tradeAbout.blockHeight')">
          <div class="cursor" @click="goBlockDetail(detailInfo.blockNumber)">
            <span class="blue">{{detailInfo.blockNumber}}</span>
            <span
              style="margin-left:5px;"
            >({{detailInfo.confirmNum+"&nbsp;"+$t('tradeAbout.confirmNum')}})</span>
          </div>
        </Item>
        <!-- 燃料限制 -->
        <Item :label="$t('tradeAbout.gasLimit')" :prop="detailInfo.gasLimit"></Item>
        <!-- 燃料消耗 -->
        <Item :label="$t('tradeAbout.gasUsed')" :prop="detailInfo.gasUsed"></Item>
        <!-- 燃料价格 -->
        <Item :label="$t('tradeAbout.gasPrice')">{{detailInfo.gasPrice| formatMoney}} LAT</Item>
        <!-- 交易数据 -->
        <Item class="extra-data" :label="$t('tradeAbout.rawData')" :prop="detailInfo.txInfo">
          <!-- <div class="rawData">{{detailInfo.txInfo}}</div> -->
        </Item>
      </List>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

import List from "@/components/list/list";
import Item from "@/components/list/item";

import apiService from "@/services/API-services";

export default {
  name: "trade-detail",
  data() {
    return {
      currentPage: null,
      pageSize: null,
      loading: false,
      txHash: "",
      btnLeftFlag: true,
      btnRightFlag: true,
      disabledLeft: false,
      disabledRight: false,
      address: "",
      detailInfo: {},
      descriptionProp: "trade",
      extraInfo: {},
      isCopy: false,
      copyText: ""
    };
  },
  props: {},
  computed: {},
  watch: {},
  components: {
    List,
    Item
  },
  methods: {
    //进入提案详情
    goProposalDetail(hx) {
      this.$router.push({
        path: "/proposal-detail",
        query: {
          proposalHash: hx
          // description: "trade",
          // currentPage: this.currentPage,
          // pageSize: this.pageSize
        }
      });
    },
    //
    goDetail(type, id) {},
    //获取交易信息详情
    getDetail() {
      let param = {
        // cid:'',
        txHash: this.txHash
      };
      this.loading = true;
      console.warn("交易详情》》》》", param);
      apiService.trade
        .transactionDetails(param)
        .then(res => {
          let { errMsg, code, data } = res;
          //改变detailInfo.txType=='1'测试
          // data.txType = 2000;
          if (code == 0) {
            this.loading = false;
            this.detailInfo = data;
            // this.extraInfo = JSON.parse(data.txInfo)
            //是否第一条记录
            if (data.first) {
              this.btnLeftFlag = false;
              this.disabledLeft = true;
            } else {
              this.btnLeftFlag = true;
              this.disabledLeft = false;
            }
            //是否最后一条数据
            if (data.last) {
              this.btnRightFlag = false;
              this.disabledRight = true;
            } else {
              this.btnRightFlag = true;
              this.disabledRight = false;
            }
          } else {
            this.detailInfo = {};
            this.$message.error(errMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    onCopy() {
      this.copyText = this.$t("modalInfo.copysuccess");
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false;
        this.copyText = "";
      }, 2000);
    },
    onError() {
      this.copyText = this.$t("modalInfo.copyfail");
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false;
        this.copyText = "";
      }, 2000);
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
    },
    //进入验证人地址详情
    goNodeDetail(id) {
      //node-detail
      this.$router.push({
        path: "/node-detail",
        query: {
          address: id
          // description: "trade",
          // currentPage: this.currentPage,
          // pageSize: this.pageSize
        }
      });
    },
    //前一条后一条
    detailNavigate(d) {
      if (d == "prev") {
        this.txHash = this.detailInfo.preHash;
      } else if (d == "next") {
        this.txHash = this.detailInfo.nextHash;
      } else {
        return;
      }
      this.$router.replace({
        path: "/trade-detail",
        query: {
          txHash: this.txHash
        }
      });
      this.getDetail();
      // this.txHash = adr;
      // this.getDetail();
      // history.pushState({}, "", "trade-detail?txHash=0xbd786677d5a6cc1c4ff79b2ec3b555b6a93d9be13a1249167bf801c18d0eace2");
    },
    //根据类型返回标题
    detailTitle(t) {
      console.warn("传入类型", t);
      let s = "tradeAbout.";
      if (t == 0) {
        s += "transfer";
      } else if (t == 1 || t == 2 || t == 4 || t == 5) {
        s += "other";
      } else if (t == 4000) {
        s += "restricting";
      } else if (t == 1004) {
        s += "delegate";
      } else if (t == 1005) {
        s += "undelegate";
      } else if (t == 2000 || t == 2001 || t == 2002 || t == 2005) {
        s += "proposal";
      } else if (t == 2003) {
        s += "voting";
      } else if (t == 2004) {
        s += "declare";
      } else if (t == 1000) {
        s += "createValidator";
      } else if (t == 1001) {
        s += "editValidator";
      } else if (t == 1002) {
        s += "increase";
      } else if (t == 1003) {
        s += "exitValidator";
      } else if (t == 3000) {
        s += "reportValidator";
      }
      return this.$t(s);
    }
  },
  //生命周期函数
  created() {
    this.txHash = this.$route.query.txHash;
    //获取交易列表
    this.getDetail();
  }
  // mounted() {}
};
</script>
<style lang="less" scoped>
.common-info {
  margin: 31px 0 50px;
}
.warn-info {
  background: #fff7e3;
  border: 1px solid #ffc017;
  width: 900px;
  margin-bottom: 20px;
  border-radius: 4px;
  padding: 10px 15px;
  line-height: 20px;
}
.restricted-plan {
  li {
    margin-bottom: 12px;
  }
}
.vote-status {
  // opacity: 0.15;
  background: rgba(59, 176, 18, 0.15);
  border-radius: 2px;
  line-height: 26px;
  padding: 0 6px;
}
.red-status {
  background: rgba(207, 50, 110, 0.15);
  color: #cf326e;
}
.box-relative {
  position: relative;
}
.status-icon {
  position: absolute;
  top: 14px;
  right: 22px;
  font-size: 1.5em;
}
.status-icon-success {
  color: #3bb012;
}
.status-icon-warning {
  color: #ffc017;
}
.pink {
  color: #cf326e;
}
.return-amount {
  height: 19px;
}

</style>
<style lang="less">
.trade-detail-wrap {
  padding-bottom: 35px;
  .extra-data {
    margin-bottom: 15px;
  }
  .item-wrap {
    padding-left: 50px;
  }
}
.trade-detail-wrap .list-item label {
  width: 140px !important;
}
</style>

