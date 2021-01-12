<template>
  <el-table :data="data" style="width: 100%" key="firstTable" size="mini">
    <!-- todo 令牌名称（令牌名称） -->
    <el-table-column :label="$t('tokens.tokenName')">
      <template slot-scope="scope">
        <span
          @click="goTokenDetail(scope.row.address, 'erc721')"
          class="cursor normal ellipsis"
          >{{ scope.row.name }}</span
        >
      </template>
    </el-table-column>

    <!-- 持有人 -->
    <el-table-column :label="$t('tokens.holder_')">
      <template slot-scope="scope">
        <span> {{ scope.row.holder | formatNumber }}</span>
      </template>
    </el-table-column>
    
    <!-- 合约 -->
    <el-table-column :label="$t('tokens.contract')">
      <template slot-scope="scope">
        <!-- <span class="cursor normal ellipsis">{{ scope.row.address }}</span> -->

        <div class="flex-special">
          <icon-contract></icon-contract>
          <!-- 操作地址：即签名交易的地址，显示0x+14 -->
          <span
            class="cursor normal ellipsis ellipsisWidth"
            @click="goContractDetail(scope.row.address)"
            >{{ scope.row.address | sliceStr(20) }}</span
          >
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
import IconContract from '@/components/common/icon-contract';
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  components: { IconContract },
};
</script>