<template>
  <div class="block-detail-wrap">
    <div class="page-title fontSize34">{{ $t("blockAbout.blockDetail") }}</div>
    <div class="detail-change">
      <div class="detail-copy">
        <span>{{ $t("tradeAbout.block") }}</span>
        <i>#{{ detailInfo.number }}</i>
        <b
          class="cursor"
          :class="{ copy: !isCopy }"
          v-clipboard:copy="detailInfo.number"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          ><p v-show="isCopy">
            <i class="el-icon-circle-check-outline"></i
            ><span>{{ copyText }}</span>
          </p></b
        >
      </div>
      <div class="detail-arrow">
        <el-tooltip
          class="item"
          effect="dark"
          placement="top"
          :content="$t('blockAbout.viewPrev')"
        >
          <el-button
            icon="el-icon-arrow-left"
            @click="goDetail(height - 1)"
            :disabled="disabledLeft"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          placement="top"
          :content="$t('blockAbout.viewNext')"
        >
          <el-button
            icon="el-icon-arrow-right"
            @click="goDetail(height - 0 + 1)"
            :disabled="disabledRight"
          ></el-button>
        </el-tooltip>
        <!-- <el-button icon="el-icon-arrow-right"></el-button> -->
      </div>
    </div>
    <div class="infomation">
      <!-- 基础交易 -->
      <List :title="$t('blockAbout.blockInformation')" :border="true">
        <Item
          :label="$t('tradeAbout.blockHeight')"
          :prop="detailInfo.number"
          class="blockHeight"
        ></Item>
        <Item
          :label="$t('tradeAbout.timeStamp')"
          :prop="detailInfo.timestamp | formatTime"
        ></Item>
        <Item
          :label="$t('tradeAbout.transactions')"
          :prop="detailInfo.txQty + ' TX'"
        ></Item>
        <Item
          :label="$t('blockAbout.blockHash')"
          :prop="detailInfo.hash"
        ></Item>
        <Item :label="$t('blockAbout.parentHash')">
          <span v-if="height - 1 < 0">{{ detailInfo.parentHash }}</span>
          <span class="blue cursor" v-else @click="goDetail(height - 1)">{{
            detailInfo.parentHash
          }}</span>
        </Item>
        <Item
          :label="$t('blockAbout.producer')"
          v-if="detailInfo.txType != '4000'"
        >
          <span class="blue cursor" @click="goNodeDetail(detailInfo.nodeId)">{{
            detailInfo.nodeName
          }}</span>
          <span style="line-height:16px;"
            >【{{ timeDiffFn(detailInfo.serverTime, detailInfo.timestamp)
            }}{{ $t("tradeAbout.before") }}】</span
          >
        </Item>
        <Item
          :label="$t('blockAbout.size')"
          :prop="detailInfo.size + ' bytes'"
        ></Item>
        <Item
          :label="$t('tradeAbout.gasLimit')"
          :prop="detailInfo.gasLimit"
        ></Item>
        <Item :label="$t('tradeAbout.gasUsed')">
          <p>
            {{ detailInfo.gasUsed | formatNumber }}&nbsp;({{
              detailInfo.gasUsed | percentage(detailInfo.gasLimit)
            }}%)
          </p>
        </Item>
        <Item
          :label="$t('blockAbout.blockReward')"
          :prop="detailInfo.blockReward + ' LAT'"
        ></Item>
        <Item
          class="extra-data"
          :label="$t('blockAbout.extraData')"
          :prop="detailInfo.extraData"
        ></Item>
      </List>
    </div>
    <div class="block-trade">
      <div class="block-trade-title">
        {{ $t("tradeAbout.transactions") }}({{ detailInfo.txQty }})
      </div>
      <trade-list
        ref="blockTrade"
        class="common-trade"
        :address="height + ''"
        :tradeCount="detailInfo"
        type="block"
        :key="height"
      ></trade-list>
    </div>
  </div>
</template>
<script>
import apiService from "@/services/API-services";
import { timeDiff } from "@/services/time-services";

import List from "@/components/list/list";
import Item from "@/components/list/item";

import tradeList from "@/components/trade-list";

export default {
  name: "block-detail",
  data() {
    return {
      height: 0,
      detailInfo: {},
      disabledLeft: false,
      disabledRight: false,
      isCopy: false,
      copyText: ""
    };
  },
  props: {},
  computed: {},
  watch: {},
  components: {
    List,
    Item,
    tradeList
  },
  methods: {
    //获取地址信息详情
    getDetail() {
      let param = {
        number: this.height
      };
      apiService.block
        .blockDetails(param)
        .then(res => {
          let { errMsg, code, data } = res;
          if (code == 0) {
            this.detailInfo = data;
            //是否第一条记录
            if (data.first) {
              this.disabledLeft = true;
            } else {
              this.disabledLeft = false;
            }
            //是否最后一条数据
            if (data.last) {
              this.disabledRight = true;
            } else {
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
    timeDiffFn(beginTime, endTime) {
      return timeDiff(beginTime, endTime);
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

    // 区块列表
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBlockList();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getBlockList();
    },
    goDetail(height) {
      this.height = height;
      this.$router.replace({
        path: "/block-detail",
        query: {
          height: height
        }
      });

      this.disabledLeft = true;
      this.disabledRight = true;

      this.getDetail();
      this.$nextTick(() => {
        this.$refs.blockTrade.getTradeList(1);
      });
    },
    goNodeDetail(nodeId) {
      this.$router.push({
        path: "/node-detail",
        query: {
          address: nodeId
        }
      });
    }
  },
  //生命周期函数
  created() {
    this.height = this.$route.query.height;
    this.getDetail();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.block-trade {
  border: 1px solid #f5f5f5;
  margin: 31px 0 50px;
  .block-trade-title {
    font-size: 20px;
    color: #000;
    line-height: 24px;
    padding: 9px 20px;
    border-top: 2px solid #000;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 20px;
    font-family: Gilroy-Medium;
  }
  .common-trade {
    padding-left: 30px;
  }
}
</style>
<style lang="less">
.block-detail-wrap {
  padding-bottom: 1px;
  .item-wrap {
    // padding-left: 50px;
    margin: 0 30px 5px 30px;
  }
}
.blockHeight p {
  width: auto !important;
}
</style>
