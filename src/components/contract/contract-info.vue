<template>
  <div class="address-trade-last contract-tab-wrap">
    <p>
      {{ $t('contract.contractType') }} :
      <span class="contract-name">{{
        contractTypeTitle(detailInfo.type)
      }}</span>
    </p>

    <!-- 自毁合约 -->
    <div v-if="detailInfo.isDestroy == 1" class="warn-info">
      <img src="../../assets/images/icon-contract.svg" alt="" />
      <span class="yellow">{{ $t('contract.warn') }}:</span>
      &nbsp;
      <span class="trad-hash" @click="goTradeDetail(detailInfo.destroyHash)">
        {{ detailInfo.destroyHash }}
      </span>
    </div>

    <!-- 系统合约 -->
    <div
      v-if="!detailInfo.isDestroy && detailInfo.type == '2'"
      class="warn-info"
    >
      <img src="../../assets/images/icon-contract.svg" alt="" />
      <span class="yellow">{{ $t('contract.systemBuilt') }}</span>
    </div>

    <b>Contract Bytecode</b>

    <div
      class="contract-bin"
      v-if="
        detailInfo.isDestroy == 1 ||
        detailInfo.type == '2' ||
        !detailInfo.contractBin
      "
    >
      0x
    </div>
    <div class="contract-bin" v-else>{{ detailInfo.contractBin }}</div>
  </div>
</template>

<script>
export default {
  props: ['detailInfo'],
  methods: {
    contractTypeTitle(type) {
      let s
      switch (type) {
        case 2:
          s = 'PPOS'
          break
        case 3:
          s = 'EVM'
          break
        case 4:
          s = 'WASM'
          break
        case 5:
          s = 'ERC20'
          break
        case 6:
          s = 'ERC721'
          break
      }
      return s ? this.$t(`tradeAbout.${s}`) : '--';
    },
  },
};
</script>

<style lang="less" scoped>
.contract-tab-wrap {
  p {
    margin-bottom: 20px;
  }
  .contract-name {
    font-family: Gilroy-Medium;
    font-size: 14px;
    color: #151515;
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
    max-width: 837px;
    width: 100%;
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
