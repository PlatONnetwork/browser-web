<template>
  <div>
    <div class="address-trade-last space-between-div">
      <span class="lineheight-with-btn">
        <!-- 总计代币交易数量 -->
        {{ $t('blockAbout.morethen') }} {{ pageTotal }}
        {{ $t('tradeAbout.tokens') }}
        <span style="color: #3f3f3f" v-if="pageTotal > 5000">{{
          $t('contract.showingLast')
        }}</span>
      </span>
    </div>
    <div class="inventory-box">
      <div class="box-item">
        <img src="@/assets/images/Alaya-logo.svg" alt="token" class="token-pic" />
        <p class="token-id">
          #
          <span class="normal cursor" @click="goTokenDetail('', 'erc721id')">id</span>
        </p>
        <p class="token-owner">
          Owner
          <span class="normal cursor" @click="goAddressDetail('')">apt123XXXXXXXXXXX...</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageTotal: 0,
      inventory: [],
    };
  },
  methods: {
    getInventory() {
      this.inventory = [];
    },
  },
};
</script>

<style lang="less">
.inventory-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  grid-auto-rows: 180px;
  row-gap: 16px;
  justify-content: space-between;
  padding-bottom: 48px;
  .box-item {
    // border: 1px solid green;
    .token-pic {
      width: 230px;
      height: 120px;
      background: #ddd;
    }
    .token-id {
      padding: 8px 0;
    }
  }
}
</style>