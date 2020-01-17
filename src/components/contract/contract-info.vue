<template>
  <div class="address-trade-last contract-tab-wrap">
    <p>
      {{ $t("contract.contractType") }} :
      {{ contractTypeTitle(detailInfo.type) }}
    </p>

    <div v-if="detailInfo.isDestroy == 1" class="warn-info">
      <img src="../../assets/images/icon-contract.svg" alt="" />
      <span class="yellow">{{ $t("contract.warn") }}:</span>
      <span class="trad-hash" @click="goTradeDetail(detailInfo.destroy_hash)">{{
        detailInfo.destroy_hash
      }}</span>
    </div>

    <b>Contract Bytecode</b>

    <div
      class="contract-bin"
      v-if="detailInfo.isDestroy == 1 || !detailInfo.contractBin"
    >
      0x
    </div>
    <div class="contract-bin" v-else>{{ detailInfo.contractBin }}</div>
  </div>
</template>

<script>
export default {
  props: ["detailInfo"],
  methods: {
    contractTypeTitle(type) {
      let s = "tradeAbout.";
      switch (type) {
        case 2:
          s += "PPOS";
          break;
        case 3:
          s += "EVM";
          break;
        case 4:
          s += "WASM";
          break;
      }
      return this.$t(s);
    },
    //进入交易详情
    goTradeDetail(hash) {
      this.$router.push({
        path: "/trade-detail",
        query: {
          txHash: hash
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.contract-tab-wrap {
  p {
    margin-bottom: 20px;
  }
  b {
    font-size: 16px;
    display: block;
    margin-bottom: 20px;
  }
  .contract-bin {
    margin-bottom: 0;
    width: 100%;
    max-height: 480px;
    min-height: 60px;
    padding: 22px 20px;
    overflow: auto;
    background-color: #f5f5f5;
    border: 1px solid #e6e3e3;
    color: #333333;
    font-size: 12px;
    line-height: 14px;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
  }
  .warn-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #fff7e3;
    border: 1px solid #ffc017;
    width: 837px;
    margin-bottom: 25px;
    border-radius: 4px;
    padding: 10px 15px;
    line-height: 20px;
    img {
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
  }
  .trad-hash {
    cursor: pointer;
  }
}
</style>
