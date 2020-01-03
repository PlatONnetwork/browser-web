<template>
  <div>
    <div class="address-trade-last">
      {{ $t("tradeAbout.totalClaimedReward") }}
      <span style="color: #3F3F3F;"
        >{{ tradeCount.allRewards | formatMoney }} LAT</span
      >
    </div>
    <div>
      <div class="title">
        <span class="hash" @click="goToDetailFn()"></span>
        <span class="Date"></span>
      </div>
      <div>
        <div class="total"></div>
        <div class="table">
          <tr>
            <td class="td-title" @click="goToNodeFn()"></td>
            <td class="td-content"></td>
          </tr>
        </div>
      </div>
    </div>
    <div class="pagination-box">
      <el-pagination
        :total="totalNum"
        :current-page="curPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        @current-change="handleChange"
        layout="sizes,total,prev,pager,next"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import apiService from "@/services/API-services";
export default {
  name: "",
  data() {
    return {
      rewardTableData: [],
      totalNum: 0,
      curPage: 1,
      pageSize: 10,
      txhash: txhash
    };
  },
  props: {
    tradeCount: Object
  },
  methods: {
    handleChange(page) {},
    goToDetailFn(hash) {
      this.$router.push({
        name: "tradeDetailComponent",
        query: {
          txhash: txhash
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
      apiService.trade.queryClaimByAddress().then(res => {
        this.rewardTableData = [...res.data.data];
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped></style>
