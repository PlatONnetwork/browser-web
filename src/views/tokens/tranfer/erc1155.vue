<template>
  <el-table :data="data" style="width: 100%" key="firstTable" size="mini">
    <!-- 交易哈希值（TxHash） -->
    <el-table-column :label="$t('tradeAbout.hash')">
      <template slot-scope="scope">
        <div class="flex-special">
          <el-tooltip class="item" effect="dark" placement="bottom-start" v-if="scope.row.txReceiptStatus == 0">
            <div slot="content">
              <span class="title-warning">{{ $t('tradeAbout.warn') }}：</span>
              {{ scope.row.failReason ? scope.row.failReason : $t('tradeAbout.transactionFailure') }}
            </div>
            <i class="iconfont iconxinxi cursor">&#xe63f;</i>
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">{{scope.row.txHash}}</div>
                            <span class='cursor normal ellipsis' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span>
              </el-tooltip>-->

          <!-- 交易hash: 显示0x+18 -->
          <router-link class="cursor normal ellipsis hash-width" :to="getTradeUrl(scope.row.txHash)">
            {{ scope.row.txHash }}
          </router-link>
        </div>
        <!-- <span class='cursor normal' @click='goTradeDetail(scope.$index,scope.row)'>{{scope.row.txHash}}</span> -->
      </template>
    </el-table-column>

    <!-- 区块（Block） -->
    <el-table-column :label="$t('tradeAbout.block')">
      <template slot-scope="scope">
        <router-link class="cursor normal" :to="getBlockUrl(scope.row.blockNumber)">
          {{ scope.row.blockNumber }}
        </router-link>
      </template>
    </el-table-column>

    <!-- 块龄（Age） -->
    <el-table-column :label="$t('tradeAbout.age')" :width="windowWidth < 750 ? 112 : null">
      <template slot-scope="scope">
        <span>{{ timeDiffFn(scope.row.blockTimestamp, scope.row.systemTimestamp) }}{{ $t('tradeAbout.before') }}</span>
      </template>
    </el-table-column>

    <!-- From 操作地址（Operator_Address） -->
    <el-table-column :label="$t('tokens.from')">
      <template slot-scope="scope">
        <!-- <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span> -->
        <div class="flex-special">
          <!-- 操作地址：即签名交易的地址，显示0x+14 -->
          <icon-contract v-if="isContract(scope.row.fromType)"></icon-contract>
          <router-link
            class="cursor normal ellipsis adr-width"
            :to="getAddressUrl(scope.row.txFrom, scope.row.fromType)"
          >
            {{ scope.row.txFrom }}
          </router-link>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="" width="40px">
      <template>
        <div class="tokens-arrow">
          <img class="arrow-icon" src="@/assets/images/arrow-right.svg" />
        </div>
      </template>
    </el-table-column>

    <!--To 操作地址（Operator_Address） -->
    <el-table-column :label="$t('tokens.to')">
      <template slot-scope="scope">
        <!-- <span class='cursor normal' @click='goAddressDetail(scope.$index,scope.row)'>{{scope.row.from}}</span> -->
        <div class="flex-special">
          <icon-contract v-if="isContract(scope.row.toType)"></icon-contract>
          <!-- 操作地址：即签名交易的地址，显示0x+14 -->
          <router-link
            class="cursor normal ellipsis adr-width"
            :to="getAddressUrl(scope.row.transferTo, scope.row.toType)"
          >
            {{ scope.row.transferTo }}
          </router-link>
        </div>
      </template>
    </el-table-column>

    <!-- 令牌ID-->
    <el-table-column :label="$t('tokens.tokenID')">
      <template slot-scope="scope">
        <router-link class="cursor normal ellipsis" :to="get1155IdUrl(scope.row.contract, scope.row.tokenId)">
          {{ scope.row.tokenId }}
        </router-link>
      </template>
    </el-table-column>

    <!-- 数额(Value) -->
    <el-table-column :label="$t('tokens.value')" show-overflow-tooltip>
      <template slot-scope="scope">
        <span>{{ scope.row.transferValue | formatMoney }}</span>
      </template>
    </el-table-column>

    <!-- tokens 名称+单位 -->
    <el-table-column :label="$t('tokens.tokens')">
      <template slot-scope="scope">
        <router-link class="cursor normal ellipsis" :to="getTokenUrl(scope.row.contract, 'erc1155')">
          {{ scope.row | tokenName }}
        </router-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { timeDiff } from '@/services/time-services'
import IconContract from '@/components/common/icon-contract'
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  components: { IconContract },
  methods: {
    timeDiffFn(beginTime, endTime = Date.now()) {
      return timeDiff(beginTime, endTime)
    }
  }
}
</script>
