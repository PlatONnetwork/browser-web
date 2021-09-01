<template>
  <el-table :data="data" style="width: 100%" key="firstTable" size="mini">
    <!-- 令牌名称（令牌名称） -->
    <el-table-column :label="$t('tokens.tokenName')" min-width="120px">
      <template slot-scope="scope">
        <span
          @click="goTokenDetail(scope.row.address, 'erc20')"
          class="cursor normal ellipsis"
          >{{ scope.row.name | sliceStr(21) }}</span
        >
      </template>
    </el-table-column>

    <!-- 发行总量（） -->
    <el-table-column :label="$t('tokens.totalSupply')" min-width="120px">
      <template slot-scope="scope">
        <span>{{ scope.row.totalSupply.toFixed(2) | formatNumber }}</span>
      </template>
    </el-table-column>

    <!-- 所有者 -->
    <el-table-column :label="$t('tokens.owner')">
      <template slot-scope="scope">
        <span> {{ scope.row.holder | formatNumber }}</span>
      </template>
    </el-table-column>

    <!-- 单位(Unit) -->
    <el-table-column :label="$t('tokens.symbol')">
      <template slot-scope="scope">
        <span>{{ scope.row.symbol }}</span>
      </template>
    </el-table-column>

    <!-- 合约 -->
    <el-table-column :label="$t('tokens.contract')" min-width="140px">
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