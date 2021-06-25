<template>
  <div>
    <div class="address-trade-last space-between-div">
      <span class="lineheight-with-btn">
        <!-- 总计代币交易数量 -->
        {{ $t('blockAbout.morethen') }} {{ pageTotal }}
        {{ $t('tradeAbout.inventory') }}
        <span style="color: #3f3f3f" v-if="pageTotal > 5000">{{
          $t('contract.showingLast')
        }}</span>
      </span>
    </div>
    <div class="inventory-box">
      <div class="box-item" v-for="item in inventory" :key="item.tokenId">
        <div class="token-pic-wrapper">
          <img v-pic-preview :src="item.image || require('@/assets/images/Platon-cat-721.svg')" alt="token" class="token-pic" />
        </div>
        <p class="token-id">
          #
          <span class="normal cursor" @click="go721IdDetail(item.contract, item.tokenId)">{{ item.tokenId  | sliceStr(20) }}</span>
        </p>
        <p class="token-owner">
          Owner
          <span class="normal cursor" @click="goAddressDetail(item.address)">{{
            item.address | sliceStr(16)
          }}</span>
        </p>
      </div>
    </div>

    <!-- 下分页 -->
    <div class="pagination-box">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="sizes,total,  prev, pager, next"
        :total="pageTotal > 5000 ? 5000 : pageTotal"
        :pager-count="9"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import apiService from '@/services/API-services';
// token721InventoryList
export default {
  props: {
    address: {
      type: String,
      required: true,
    },
    tokenId: String,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      inventory: [],
    };
  },
  methods: {
    getInventory() {
      let param = {
        contract: this.address,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      if (this.tokenId) {
        param.tokenId = this.tokenId;
      }
      apiService.tokens.token721InventoryList(param).then((res) => {
        let { data, totalCount } = res;
        this.inventory = data;
        this.pageTotal = totalCount;
      });
    },
    handleCurrentChange() {
      this.getInventory();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getInventory();
    },
  },
  created() {
    this.getInventory();
  },
};
</script>

<style lang="less">
.inventory-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  grid-auto-rows: 180px;
  grid-gap: 16px 8px;
  justify-content: space-between;
  .box-item {
    padding: 0 8px;
    background: #fff;
    .token-pic-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 230px;
      height: 120px;
      overflow: hidden;
      .token-pic {
        max-width: 230px;
        max-height: 120px;
      }
    }
    .token-id {
      padding: 8px 0;
    }
  }
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .box-item {
      margin: 12px 24px 0 0;
    }
  }
}

@media (max-width: 500px) {
  .inventory-box {
    .box-item {
      font-size: 14px;
      .token-id,
      .token-owner {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      }
    }
  }
}

@media (max-width: 600px) {
  .inventory-box {
    grid-template-columns: repeat(auto-fill, calc(50% - 10px));
  }
}
</style>