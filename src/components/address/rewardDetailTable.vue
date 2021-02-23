<template>
  <div>
    <div class="address-trade-last">
      {{ $t("tradeAbout.totalClaimedReward") }}
      <span style="color: #3F3F3F;"
        >{{ tradeCount.haveReward | formatMoney }} LAT</span
      >
    </div>
    <!-- <div v-show="rewardTableData.length == 0" class="title-line">
      {{ $t("tradeAbout.noData") }}
    </div> -->
    <!-- 账户详情-奖励明细 TODO 2次循环展示数据 并且在hover时候展示边框 -->
    <div class="detail-box" v-for="item in rewardTableData" :key="item.id">
      <div class="title-box">
        <span class="hash normal cursor" @click="goToDetailFn(item.txHash)">
          {{ item.txHash }}
        </span>
        <span class="date">{{ item.timestamp | formatTime }}</span>
      </div>
      <div class="table-box">
        <div class="total">
          <span class="label">{{ $t("tradeAbout.rewardAmount") }} : </span>
          <span class="value">{{ item.allRewards | formatMoney }} LAT</span>
        </div>
        <div class="reward-box">
          <!-- <table class="reward-table-box">
            <tr
              class="reward-mini-box"
              v-for="(ele, $index) in item.rewardsDetails"
              :key="$index"
            >
              <td
                class="td-title cursor normal ellipsis"
                @click="goToNodeFn(ele.verify)"
              >
                {{ ele.nodeName | formatMoney }}
              </td>
              <td class="gap-td-box"></td>
              <td class="td-content">{{ ele.reward }} &nbsp;LAT</td>
            </tr>
          </table> -->
          <div
            class="reward-box-line"
            v-for="(ele, $index) in item.rewardsDetails"
            :key="$index"
          >
            <div
              @click="goToNodeFn(ele.verify)"
              class="td-title cursor normal ellipsis"
            >
              {{ ele.nodeName }}
            </div>
            <div class="td-content">
              {{ ele.reward | formatMoney }} &nbsp;&nbsp;LAT
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="rewardTableData.length !== 0" class="pagination-box">
      <el-pagination
        background
        :total="totalNum"
        :current-page="curPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="handleSizeFn"
        @current-change="handleChange"
        layout="sizes,total,prev,pager,next"
      ></el-pagination>
    </div>
    <!-- {{ tradeCount }} -->
    <!-- {{ address }} -->
  </div>
</template>
<script>
import apiService from "@/services/API-services";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      rewardTableData: [],
      totalNum: 0,
      curPage: 1,
      pageSize: 10,
      txhash: this.address //tradeCount.txhash
    };
  },
  props: {
    tradeCount: Object,
    address: String
  },
  methods: {
    ...mapMutations({
      updateIsAddressDetailsReward: "UPDATE_IS_ADDRESS_DETAILS_REWARD",
    }),
    handleSizeFn(pageSize) {
      this.pageSize = pageSize;
      this.queryDetailByAdd();
    },
    handleChange(page) {
      this.curPage = page;
      this.queryDetailByAdd();
    },
    goToDetailFn(hash) {
      this.$router.push({
        name: "tradeDetailComponent",
        query: {
          txHash: hash
        }
      });
    },
    goToNodeFn(node) {
      this.$router.push({
        name: "nodeDetailComponent",
        query: {
          address: node
        }
      });
    },
    queryDetailByAdd() {
      let data = {
        pageNo: this.curPage,
        address: this.address,
        pageSize: this.pageSize
      };
      apiService.trade.queryClaimByAddress(data).then(res => {
        if (res.data) {
          this.rewardTableData = [...res.data];
          this.totalNum = res.totalCount;
          if(this.rewardTableData.length > 0){
            this.updateIsAddressDetailsReward(true);
          }
        }
      });
    }
  },
  mounted() {
    this.queryDetailByAdd();
  },
  destroyed(){
    this.updateIsAddressDetailsReward(false);
  }
};
</script>
<style lang="less" scoped>
.detail-box {
  width: 100%;
  border: 1px solid transparent;
  &:hover {
    // border-top: 1px solid #0798de;
    border: 1px solid #0798de;
  }
  .title-box {
    background: #f5f5f5;
    // box-shadow: 0 -1px 0 0 #0798de;
    border-radius: 1px;
    border-radius: 1px;
    height: 40px;
    line-height: 40px;
    .hash {
      font-family: Gilroy-Regular;
      font-size: 14px;
      letter-spacing: 0;
      padding-left: 10px;
    }
    .date {
      font-family: Gilroy-Regular;
      font-size: 12px;
      color: #000000;
      letter-spacing: 0;
      padding-right: 30px;
      float: right;
    }
  }
  .table-box {
    min-height: 100px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    .total > .label {
      font-family: Gilroy-Medium;
      font-size: 14px;
      color: #666666;
      letter-spacing: 0;
    }
    .total > .value {
      display: inline-block;
      // width: 271px;
      height: 40px;
      line-height: 40px;
      background: rgba(7, 152, 222, 0.1);
      border-radius: 2px;
      border-radius: 2px;
      padding: 0 20px 0 20px;
      position: relative;
      margin-left: 10px;
      font-family: Gilroy-Medium;
      font-size: 16px;
      color: #000000;
      letter-spacing: 0;
      &::after {
        content: "";
        position: absolute;
        border-left: 20px solid rgba(7, 152, 222, 0.1);
        border-right: 20px solid transparent;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        right: -40px;
      }
    }
    .reward-box {
      .reward-box-line {
        display: flex;
        flex-direction: row;
        &:not(:last-child) {
          padding-bottom: 14px;
        }
        .td-title {
          width: 215px;
          margin-right: 100px;
          font-family: Gilroy-Medium;
          font-size: 13px;
          letter-spacing: 0;
        }
        .td-content {
          text-align: right;
          min-width: 170px;
          font-family: Gilroy-Medium;
          font-size: 13px;
          color: #000000;
          letter-spacing: 0;
          margin-right: 30px;
        }
      }
    }
  }
}
.title-line {
  font-size: 32px;
  display: flex;
  justify-content: center;
  color: #e1e2e3;
  align-items: center;
  margin: 60px auto;
}
.address-trade-last{
  color: #333;
  font-family: Gilroy-Regular;
  font-size: 14px;
  line-height: 16px;
  span{
    font-family: Gilroy-Medium;
    font-size: 16px;
    line-height: 19px;
  }
}
</style>
