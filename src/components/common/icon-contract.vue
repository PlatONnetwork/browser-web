
<template>
  <el-tooltip class="item" effect="dark" placement="bottom">
    <div slot="content" class="delegate-msg">
      {{ $t('contract.contract') }}
    </div>
    <i class="iconfont iconcontract" :class="{ blue: active }">&#xe63e;</i>
  </el-tooltip>
</template>

<script>
export default {
  name: 'iconContract',
  props: {
    active: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="less" scoped>
.iconcontract {
  margin-right: 4px;
  font-size: 10px;
  cursor: default;
}
</style>