<template>
  <div class="contract-detail-wrap">
    <div class="content-top-white content-padding">
      <div class="page-title fontSize34">
        {{ $t('nodeInfo.validatorDetail') }}
      </div>
      <div class="node-header">
        <div class="node-header-left">
          <img :src="detailInfo.stakingIcon || require('../../assets/images/node-avtor.svg')" />
          <div class="node-name-wrap">
            <div class="node-name ellipsis">
              <b>{{ detailInfo.nodeName }}</b>
              <i></i>
            </div>
            <p
              v-if="
                !detailInfo.isInit &&
                detailInfo.status != 4 &&
                detailInfo.status != 5 &&
                detailInfo.status != 7
              "
            >
              {{ $t('nodeInfo.createdat') }}:
              {{ detailInfo.joinTime | formatTime }}
            </p>
            <p v-if="detailInfo.status == 4 || detailInfo.status == 5">
              {{ $t('nodeInfo.exitTime') }}:
              {{ detailInfo.leaveTime | formatTime }}
            </p>
            <p v-if="detailInfo.status == 7">
              {{ $t('nodeInfo.freezeTime') }}:
              {{ detailInfo.leaveTime | formatTime }}
            </p>
            <p
              v-if="
                detailInfo.isInit &&
                detailInfo.status != 4 &&
                detailInfo.status != 5
              "
            >
              <i class="iconfont iconxinxi lightgray" style="color: #d5d5d5"
                >&#xe63f;</i
              >
              <span>{{ $t('nodeInfo.nodeMsg') }}</span>
            </p>
          </div>
        </div>
        <div class="node-header-right">
          <span
            class="green vote-status"
            v-if="detailInfo.status == 2 || detailInfo.status == 6"
            >{{ $t('nodeStatus.' + [detailInfo.status]) }}</span
          >
          <span
            class="yellow vote-status yellow-status"
            v-else-if="detailInfo.status == 3 || detailInfo.status == 4"
            >{{ $t('nodeStatus.' + [detailInfo.status]) }}</span
          >
          <span
            class="yellow vote-status yellow-status"
            v-else-if="detailInfo.status == 7"
            >{{ $t('nodeStatus.' + [detailInfo.status]) }}</span
          >
          <span
            class="red vote-status red-status"
            v-else-if="detailInfo.status == 1"
            >{{ $t('nodeStatus.' + [detailInfo.status]) }}</span
          >
          <span
            class="lightgray vote-status gray-status"
            v-else-if="detailInfo.status == 5"
            >{{ $t('nodeStatus.' + [detailInfo.status]) }}</span
          >
        </div>
      </div>
      <!-- TODO 验证节点 详情 从新设计 -->
      <div class="node-static-box">
        <div class="node-static-left-box">
          <div class="node-statistic">
            <List class="node-left" :inline="true">
              <!-- 当选验证节点 -->
              <Item
                :vertical="true"
                :label="$t('nodeInfo.electedRoundValidator')"
              >
                <p class="Gilroy-Medium fontSize18">
                  {{ detailInfo.verifierTime }}
                </p>
              </Item>
              <!-- 累计出块 -->
              <Item :vertical="true" :label="$t('nodeInfo.blocks')">
                <p class="Gilroy-Medium fontSize18">
                  {{ detailInfo.blockQty | formatNumber }}
                </p>
              </Item>
              <!-- 累计系统奖励 -->
              <Item
                v-if="!detailInfo.isInit"
                :vertical="true"
                :label="$t('nodeInfo.totalNodeReward') + ' (LAT)'"
              >
                <p>
                  <span class="Gilroy-Medium black fontSize18">{{
                    detailInfo.rewardValue | formatMoney | sliceFloat(0)
                  }}</span>
                  <span class="black fontSize13">{{
                    detailInfo.rewardValue | formatMoney | sliceFloat(1)
                  }}</span>
                  <span class="fontSize13"></span>
                </p>
              </Item>
              <!-- TODO -总质押：显示“--”

                -自有质押：如果自有质押位退回到验证节点账户，没有返还到节点质押账户前，显示提示语”待解锁“（Freezing）

                -赎回委托数：显示待提取的委托数量,没有全部赎回时，显示提示语“待赎回”（Undelegating）

                -当前委托者数：显示“--”

                预计节点年化收益率：显示如图

                -预计委托年化收益率：显示如图 -->
              <Item
                v-if="!detailInfo.isInit"
                :vertical="true"
                :label="$t('nodeInfo.totalStakePower') + ' (LAT)'"
                class="total-stake"
              >
                <p
                  class="Gilroy-Medium"
                  v-if="detailInfo.status != 4 && detailInfo.status != 5"
                >
                  <span class="Gilroy-Medium black fontSize18">{{
                    detailInfo.totalValue | formatMoney | sliceFloat(0)
                  }}</span>
                  <span class="black fontSize13">{{
                    detailInfo.totalValue | formatMoney | sliceFloat(1)
                  }}</span>
                  <span class="fontSize13"></span>
                </p>
                <p v-else class="Gilroy-Medium">--</p>
              </Item>
              <!-- 稳定性 -->
              <Item
                v-if="detailInfo.isInit"
                :vertical="true"
                :label="$t('nodeInfo.stability')"
              >
                <div class="stability-wrap">
                  <div style="margin-right: 10px" class="self-tooltip">
                    <i class="icon-low-block cursor"></i>
                    <span class="Gilroy-Regular fontSize13">{{
                      detailInfo.slashLowQty
                    }}</span>
                    <p class="Gilroy-Medium">
                      {{ $t('nodeInfo.lowBlockRate') }}
                    </p>
                  </div>
                  <div class="self-tooltip self-tooltip-sign">
                    <i class="icon-two-sign cursor"></i>
                    <span class="Gilroy-Regular fontSize13">{{
                      detailInfo.slashMultiQty
                    }}</span>
                    <p class="Gilroy-Medium">{{ $t('nodeInfo.twoSignNum') }}</p>
                  </div>
                </div>
              </Item>
              <!-- 自有质押 -->
              <Item
                v-if="detailInfo.isInit"
                :vertical="true"
                :label="$t('nodeInfo.selfstake') + ' (LAT)'"
                class="total-stake"
              >
                <p class="Gilroy-Medium">
                  <span class="Gilroy-Medium black fontSize18">{{
                    detailInfo.stakingValue | formatMoney | sliceFloat(0)
                  }}</span>
                  <span class="black fontSize13">{{
                    detailInfo.stakingValue | formatMoney | sliceFloat(1)
                  }}</span>
                  <span
                    v-if="
                      (detailInfo.status == 4 || detailInfo.status == 5) &&
                      detailInfo.totalValue > 0
                    "
                    class="fontSize13 onPending"
                    >({{ $t('nodeInfo.freezing') }})</span
                  >
                </p>
              </Item>
            </List>
          </div>
          <div class="node-statistic" v-if="!detailInfo.isInit">
            <List class="node-left" :inline="true">
              <Item :vertical="true" :label="$t('nodeInfo.stability')">
                <div class="stability-wrap">
                  <div style="margin-right: 10px" class="self-tooltip">
                    <i class="icon-low-block cursor"></i>
                    <span>{{ detailInfo.slashLowQty }}</span>
                    <p class="Gilroy-Medium">
                      {{ $t('nodeInfo.lowBlockRate') }}
                    </p>
                  </div>
                  <div class="self-tooltip self-tooltip-sign">
                    <i class="icon-two-sign cursor"></i>
                    <span>{{ detailInfo.slashMultiQty }}</span>
                    <p class="Gilroy-Medium">{{ $t('nodeInfo.twoSignNum') }}</p>
                  </div>
                </div>
              </Item>
              <Item :vertical="true" :label="$t('nodeInfo.blockRate')">
                <p>
                  <span class="Gilroy-Medium fontSize18">{{
                    detailInfo.blockQty | percentage(detailInfo.expectBlockQty)
                  }}</span>
                  <span class="fontSize13">%</span>
                </p>
              </Item>
              <Item
                :vertical="true"
                :label="$t('nodeInfo.totalDelegatedReward') + ' (LAT)'"
              >
                <p>
                  <span class="Gilroy-Medium black fontSize18">{{
                    detailInfo.totalDeleReward | formatMoney | sliceFloat(0)
                  }}</span>
                  <span class="black fontSize13">{{
                    detailInfo.totalDeleReward | formatMoney | sliceFloat(1)
                  }}</span>
                  <span class="fontSize13"></span>
                </p>
              </Item>
              <!-- TODO 需要在未退回到验证节点账户时，显示没有返还到节点钱 显示带解锁 此处需要一个状态 -->
              <Item
                :vertical="true"
                :label="$t('nodeInfo.selfstake') + ' (LAT)'"
                class="total-stake"
              >
                <p class="Gilroy-Medium">
                  <span class="Gilroy-Medium black fontSize18">{{
                    detailInfo.stakingValue | formatMoney | sliceFloat(0)
                  }}</span>
                  <span class="black fontSize13">{{
                    detailInfo.stakingValue | formatMoney | sliceFloat(1)
                  }}</span>
                  <span
                    v-if="
                      (detailInfo.status == 4 || detailInfo.status == 5) &&
                      detailInfo.totalValue > 0
                    "
                    class="fontSize13 onPending"
                    >({{ $t('nodeInfo.freezing') }})</span
                  >
                </p>
              </Item>
            </List>
          </div>
          <div class="node-statistic" v-if="!detailInfo.isInit">
            <List class="node-left" :inline="true">
              <Item
                v-if="detailInfo.status == 4 || detailInfo.status == 5"
                :vertical="true"
                :label="$t('nodeInfo.delegatorNum')"
              >
                <p>--</p>
              </Item>
              <Item
                v-else
                :vertical="true"
                :label="$t('nodeInfo.delegatorNum')"
              >
                <p class="Gilroy-Medium fontSize18">
                  {{ detailInfo.delegateQty }}
                </p>
              </Item>
              <Item :vertical="true">
                <div slot="tipHeader">
                  <label>
                    {{ $t('nodeInfo.blockRate24h') }}
                  </label>
                  <el-tooltip placement="bottom" class="item" effect="dark">
                    <div slot="content" class="delegate-msg" v-html="$t('tips.blockRate24h')">
                    </div>
                    <i class="address-icon"></i>
                  </el-tooltip>
                </div>
                <p>
                  <span class="Gilroy-Medium fontSize18">{{
                    detailInfo.genBlocksRate
                  }}</span>
                </p>
              </Item>
              <Item
                :vertical="true"
                :label="$t('contract.unclaimedReward') + ' (LAT)'"
              >
                <p>
                  <span class="Gilroy-Medium black fontSize18">{{
                    detailInfo.deleRewardRed | formatMoney | sliceFloat(0)
                  }}</span>
                  <span class="black fontSize13">{{
                    detailInfo.deleRewardRed | formatMoney | sliceFloat(1)
                  }}</span>
                  <span class="fontSize13"></span>
                </p>
              </Item>
              <!-- TODO 此处历史节点显示另外一个数据 -->
              <Item
                :vertical="true"
                :label="$t('deleget.acceptDelegations') + ' (LAT)'"
                v-if="detailInfo.status != 4 && detailInfo.status != 5"
              >
                <p>
                  <span
                    class="Gilroy-Medium black fontSize18"
                    style="font-size: 18px"
                    >{{
                      detailInfo.delegateValue | formatMoney | sliceFloat(0)
                    }}</span
                  >
                  <span class="black fontSize13">{{
                    detailInfo.delegateValue | formatMoney | sliceFloat(1)
                  }}</span>
                  <span class="fontSize13 lat-mini"></span>
                </p>
              </Item>
              <Item
                v-else
                :vertical="true"
                :label="$t('nodeInfo.pendingDelegations') + ' (LAT)'"
              >
                <p>
                  <span class="Gilroy-Medium black fontSize18">{{
                    detailInfo.statDelegateReduction
                      | formatMoney
                      | sliceFloat(0)
                  }}</span>
                  <span class="black fontSize13">{{
                    detailInfo.statDelegateReduction
                      | formatMoney
                      | sliceFloat(1)
                  }}</span>
                  <span class="fontSize13 onPending"
                    >({{ $t('nodeInfo.undelegating') }})</span
                  >
                </p>
              </Item>
            </List>
          </div>
        </div>
        <div class="node-static-right-box" v-if="!detailInfo.isInit">
          <div class="yield-box">
            <p
              v-if="
                detailInfo.status == 4 ||
                detailInfo.status == 5 ||
                detailInfo.status == 7
              "
              class="value"
            >
              --%
            </p>
            <p v-else class="value">{{ detailInfo.expectedIncome }}%</p>
            <p class="text">
              <!--  需要做悬停 -->
              <span>{{ $t('nodeInfo.yield3') }} </span>
              <el-tooltip placement="bottom" class="item" effect="dark">
                <div slot="content" class="delegate-msg" v-html="$t('tips.validatorYield')"></div>
                <i class="address-icon"></i>
              </el-tooltip>
            </p>
          </div>
          <div class="yield-box">
            <p
              v-if="detailInfo.status == 4 || detailInfo.status == 5"
              class="value"
            >
              --%
            </p>
            <p v-else class="value">{{ detailInfo.deleAnnualizedRate }}%</p>
            <p class="text">
              <span>{{ $t('nodeInfo.delegatedYield') }} </span>
              <el-tooltip placement="bottom" class="item" effect="dark">
                <div slot="content" class="delegate-msg" v-html="$t('tips.delegatedYield')"></div>
                <i class="address-icon"></i>
              </el-tooltip>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-padding">
      <div class="tabs">
        <el-button
          size="medium"
          :class="{ active: tabIndex == 1 }"
          @click="tabChange(1)"
          >{{ $t('nodeInfo.nodeInfo') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 2 }"
          @click="tabChange(2)"
          >{{ $t('nodeInfo.producedBlocks') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 3 }"
          @click="tabChange(3)"
          >{{ $t('nodeInfo.validatorActions') }}</el-button
        >
        <el-button
          size="medium"
          v-if="!detailInfo.isInit"
          :class="{ active: tabIndex == 4 }"
          @click="tabChange(4)"
          >{{ $t('deleget.delegations') }}</el-button
        >
        <el-button
          size="medium"
          :class="{ active: tabIndex == 5 }"
          @click="tabChange(5)"
          v-if="!detailInfo.isInit"
          >{{ $t('deleget.rewardReceiveDetails') }}</el-button
        >
      </div>
      <div class="node-detail-content">
        <div v-show="tabIndex == 1" class="basicInfo">
          <h3 class="nodeInfo">{{ $t('nodeInfo.basicInfo') }}</h3>
          <List>
            <Item :label="$t('nodeInfo.nodeID')">
              <div>
                <span>{{ detailInfo.nodeId }}</span>
                <b
                  class="cursor copyicon"
                  id="copy1"
                  :class="{ copy: !isCopy }"
                  v-clipboard:copy="detailInfo.nodeId"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  <p v-show="isCopy" style="width: 100%">
                    <i class="el-icon-circle-check-outline"></i>
                    <span>{{ copyText }}</span>
                  </p>
                </b>
              </div>
            </Item>
            <Item :label="$t('nodeInfo.version')">
              <div>
                {{ detailInfo.version }}
              </div>
            </Item>
            <Item :label="$t('tradeAbout.operatorAddress')">
              <div>
                <router-link
                  class="blue cursor"
                  :to="getAddressUrl(detailInfo.stakingAddr, detailInfo.stakingAddrType)"
                  >{{ detailInfo.stakingAddr }}</router-link
                >
                <b
                  class="cursor copyicon"
                  id="copy2"
                  :class="{ copy: !isCopy2 }"
                  v-clipboard:copy="detailInfo.stakingAddr"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  <p v-show="isCopy2" style="width: 100%">
                    <i class="el-icon-circle-check-outline"></i>
                    <span>{{ copyText2 }}</span>
                  </p>
                </b>
              </div>
            </Item>
            <Item :label="$t('tradeAbout.rewardAddress')">
              <div>
                <router-link
                  class="blue cursor"
                  :to="getAddressUrl(detailInfo.denefitAddr, detailInfo.denefitAddrType)"
                  >{{ detailInfo.denefitAddr }}</router-link
                >
                <span class="lightgray" v-if="detailInfo.isInit"
                  >({{ $t('nodeInfo.systemBuilt') }})</span
                >
                <b
                  class="cursor copyicon"
                  id="copy3"
                  :class="{ copy: !isCopy3 }"
                  v-clipboard:copy="detailInfo.denefitAddr"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  <p v-show="isCopy3" style="width: 100%">
                    <i class="el-icon-circle-check-outline"></i>
                    <span>{{ copyText3 }}</span>
                  </p>
                </b>
              </div>
            </Item>
            <Item :label="$t('tradeAbout.website')">
              <div>
                <a
                  class="blue cursor"
                  :href="detailInfo.website"
                  v-if="detailInfo.website"
                  target="_blank"
                  >{{ detailInfo.website }}</a
                >
                <span class="lightgray" v-else>Null</span>
              </div>
            </Item>
            <Item>
              <label slot="tipHeader">
                {{ $t('nodeInfo.rewardRatio') }}
                ：<el-tooltip placement="bottom" class="item" effect="dark">
                  <div slot="content" class="delegate-msg">
                    {{ $t('nodeInfo.ratioTips') }}
                  </div>
                  <i class="address-icon"></i>
                </el-tooltip>
              </label>
              <div>
                <span v-if="detailInfo.isInit">--</span>
                <span v-else class="fontSize14 Gilroy-Medium"
                  >{{ detailInfo.rewardPer }} %</span
                >
              </div>
            </Item>
            <Item
              v-if="detailInfo.rewardPer !== detailInfo.nextRewardPer"
              :label="$t('nodeInfo.nextRewardRatio')"
            >
              <div>
                <span v-if="detailInfo.isInit">--</span>
                <span v-else class="fontSize14 Gilroy-Medium"
                  >{{ detailInfo.nextRewardPer }} %</span
                >
              </div>
            </Item>
            <Item :label="$t('tradeAbout.identity')">
              <div>
                <a
                  class="blue cursor"
                  v-if="detailInfo.externalId"
                  :href="detailInfo.externalUrl"
                  target="_blank"
                  >{{ detailInfo.externalId }}</a
                >
                <span class="lightgray" v-else>Null</span>
              </div>
            </Item>
            <Item :label="$t('tradeAbout.introduction')">
              <div>
                <span v-if="detailInfo.details">{{ detailInfo.details }}</span>
                <span class="lightgray" v-else>Null</span>
              </div>
            </Item>
          </List>
        </div>
        <div v-show="tabIndex == 2">
          <div class="address-trade-last node-last">
            {{ $t('blockAbout.totalProduced') }}
            <b>{{ detailInfo.blockQty | formatNumber }}</b>
            <span style="color: #3f3f3f" v-if="newRecordFlag">{{
              $t('contract.showingLast')
            }}</span>
            <el-button size="medium export-btn" @click="exportFn">{{
              $t('common.export')
            }}</el-button>
          </div>
          <div class="table">
            <div class="node table-content">
              <el-table
                :data="tableData"
                style="width: 100%"
                key="firstTable"
                size="mini"
                v-loading="loading.block"
              >
                <el-table-column :label="$t('menu.block')">
                  <template slot-scope="scope">
                    <router-link
                      class="blue cursor"
                      :to="getBlockUrl(scope.row.number)"
                      >{{ scope.row.number }}</router-link
                    >
                  </template>
                </el-table-column>
                <el-table-column :label="$t('common.time')"  width="180">
                  <template slot-scope="scope">
                    <span>{{ scope.row.timestamp | formatTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('indexInfo.txn')"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.statTxQty | formatNumber }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('blockAbout.blockReward')" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.blockReward | formatMoney }} LAT</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination-box">
              <el-pagination
                background
                @size-change="handleBlockSizeChange"
                @current-change="handleBlockCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="sizes,total,  prev, pager, next"
                :total="pageTotal > 5000 ? 5000 : pageTotal"
                :pager-count="windowWidth < 750 ? 5 : 9"
              ></el-pagination>
            </div>
          </div>
        </div>
        <div v-show="tabIndex == 3">
          <div class="table">
            <el-table
              :data="tableOperateData"
              style="width: 100%"
              key="firstTable"
              size="mini"
              v-loading="loading.operate"
            >
              <el-table-column
                :label="$t('common.time')"
                width="200"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.timestamp | formatTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('nodeInfo.actions')"
                min-width="180"
              >
                <template slot-scope="scope">
                  <p
                    class="percent80 no-break"
                    v-if="
                      scope.row.type == 1 ||
                      scope.row.type == 3 ||
                      scope.row.type == 10
                    "
                  >
                    {{ $t('actionType.' + [scope.row.type]) }}
                  </p>
                  <p class="percent80 no-break" v-if="scope.row.type == 2">
                    {{ $t('actionType.' + [scope.row.type])
                    }}{{ $t('nodeInfo.information') }}
                    <span v-if="!!scope.row.beforeRate"
                      >- {{ $t('nodeInfo.rewardRatio') }}
                      {{ scope.row.beforeRate }}%
                      {{ $t('tradeAbout.changedTo') }}
                      {{ scope.row.afterRate }}%</span
                    >
                  </p>
                  <p
                    class="percent80 no-break"
                    v-else-if="scope.row.type == 4 || scope.row.type == 5"
                  >
                    <template v-if="scope.row.title">
                      <span>
                        {{
                          `${$t('actionType.' + [scope.row.type])}-${
                            scope.row.title
                          }`
                        }}
                        <span v-if="scope.row.type == 5"
                          >-{{ $te('voteStatus.' + scope.row.option) ? $t('voteStatus.' + scope.row.option) : $t('voteStatus.other') }}</span
                        >
                      </span>
                    </template>
                    <template v-else>
                      <span v-if="scope.row.proposalType == 2"
                        >{{ $t('actionType.' + [scope.row.type]) }}-{{
                          $t('tradeAbout.versionUp')
                        }}-V {{ scope.row.version }}-{{ scope.row.id }}</span
                      >
                      <span v-else
                        >{{ $t('actionType.' + [scope.row.type]) }}-{{
                          $t('proposalOption.' + [scope.row.proposalType])
                        }}-{{ scope.row.id }}</span
                      >
                      <span v-if="scope.row.type == 5"
                        >-{{ $te('voteStatus.' + scope.row.option) ? $t('voteStatus.' + scope.row.option) : $t('voteStatus.other') }}</span
                      >
                    </template>
                  </p>
                  <!-- <p
                    class="percent80"
                    v-else-if="scope.row.type==5"
                  >{{`${$t('actionType.'+[scope.row.type])}-${scope.row.title}-${$t('voteStatus.'+[scope.row.option])}`}}</p>-->
                  <p class="percent80 no-break" v-else-if="scope.row.type == 6">
                    {{
                      lang == 'zh'
                        ? `${$t(
                            'actionType.' + [scope.row.type]
                          )}-扣除自有质押${scope.row.percent * 100}%(${
                            scope.row.amount
                          } LAT)，移出验证节点列表`
                        : `${$t('actionType.' + [scope.row.type])}-${
                            scope.row.percent * 100
                          }% of self-stake slashed (${
                            scope.row.amount
                          } LAT), Remove the Validator List`
                    }}
                  </p>
                  <p
                    class="percent80 no-break"
                    v-else-if="scope.row.type == 7 && scope.row.percent == 0"
                  >
                    {{
                      lang == 'zh'
                        ? `${$t(
                            'actionType.' + [scope.row.type]
                          )}-移出验证节点列表`
                        : `${$t(
                            'actionType.' + [scope.row.type]
                          )}-Remove the Validator List`
                    }}
                  </p>
                  <p
                    class="percent80 no-break"
                    v-else-if="scope.row.type == 7 && scope.row.percent > 0"
                  >
                    {{
                      lang == 'zh'
                        ? `${$t(
                            'actionType.' + [scope.row.type]
                          )}-扣除自有质押(${
                            scope.row.amount
                          }LAT)，移出验证节点列表`
                        : `${$t('actionType.' + [scope.row.type])}(${
                            scope.row.amount
                          } LAT) from self-stake, Remove the Validator List`
                    }}
                  </p>
                  <p
                    class="percent80 no-break"
                    v-else-if="scope.row.type == 11"
                  >
                    {{
                      lang == 'zh'
                        ? `${$t(
                            'actionType.' + [scope.row.type]
                          )}-移出零出块惩罚验证节点列表，节点恢复正常`
                        : `${$t(
                            'actionType.' + [scope.row.type]
                          )}-Remove the node zero out-block Validator List，Node back to normal`
                    }}
                  </p>
                  <!-- 版本声明 todo -->
                  <p
                    class="percent80 no-break"
                    v-else-if="scope.row.type == 12"
                  >
                    {{ $t('actionType.' + [scope.row.type]) }}&nbsp;&nbsp;{{scope.row.version}}
                  </p>
                </template>
              </el-table-column>
              <el-table-column :label="$t('nodeInfo.inTxHash')" min-width="180">
                <template slot-scope="scope">
                  <router-link
                    class="blue cursor ellipsis hash-width"
                    v-if="
                      scope.row.type != 6 &&
                      scope.row.type != 7 &&
                      scope.row.type != 11
                    "
                    :to="getTradeUrl(scope.row.txHash)"
                  >
                    {{ scope.row.txHash }}
                  </router-link>
                  <span class="gray" v-else>{{
                    $t('nodeInfo.systemOperation')
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('nodeInfo.inBlock')" min-width="90">
                <template slot-scope="scope">
                  <router-link
                    class="blue cursor"
                    :to="getBlockUrl(scope.row.blockNumber)"
                    >{{ scope.row.blockNumber }}</router-link
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-box">
              <el-pagination
                background
                @size-change="handleOperateSizeChange"
                @current-change="handleOperateCurrentChange"
                :current-page.sync="currentPage2"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize2"
                layout="sizes,total,  prev, pager, next"
                :total="pageTotal2"
                :pager-count="windowWidth < 750 ? 5 : 9"
              ></el-pagination>
            </div>
          </div>
        </div>
        <div v-show="tabIndex == 4">
          <h3 class="node-deleget-title">
            {{
              detailInfo.status == 4 || detailInfo.status == 5
                ? $t('deleget.DelegateRecordWaiting')
                : $t('deleget.DelegateRecord')
            }}
            <b>{{ pageTotal3 | formatNumber }}</b>
          </h3>
          <div class="table">
            <el-table
              :data="tableDelegetData"
              style="width: 100%"
              key="firstTable"
              size="mini"
              v-loading="loading.deleget"
            >
              <el-table-column
                min-width="100"
                :label="$t('tradeAbout.delegater')"
              >
                <template slot-scope="scope">
                  <router-link
                    class="blue cursor percent60 ellipsis adr-width"
                    :to="getAddressUrl(scope.row.delegateAddr, scope.row.delegateAddrType)"
                  >
                    {{ scope.row.delegateAddr }}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column min-width="200">
                <template slot="header">
                  {{
                    $t('contract.delegations') + '\/' + $t('deleget.percentage')
                  }}
                  <el-tooltip class="item" effect="dark" placement="bottom">
                    <div slot="content" class="delegate-msg">
                      {{ $t('deleget.percentageMsg') }}
                    </div>
                    <i class="address-icon"></i>
                  </el-tooltip>
                </template>
                <template slot-scope="scope">
                  <span
                    >{{ scope.row.delegateValue | formatMoney }}({{
                      scope.row.delegateValue
                        | percentage(scope.row.delegateTotalValue)
                    }}%)</span
                  >
                </template>
              </el-table-column>
              <!-- <el-table-column :label="$t('deleget.locked')+'\/'+$t('deleget.percentage')">
                <template slot-scope="scope">
                  <span>{{scope.row.delegateLocked | formatMoney}}({{scope.row.delegateLocked | percentage(scope.row.allDelegateLocked)}}%)</span>
                </template>
              </el-table-column>-->
              <el-table-column  min-width="120">
                <template slot="header">
                  {{ $t('deleget.locked') }}
                  <el-tooltip class="item" effect="dark" placement="bottom">
                    <div slot="content" class="delegate-msg">
                      {{ $t('deleget.lockedMsg') }}
                    </div>
                    <i class="address-icon"></i>
                  </el-tooltip>
                </template>
                <template slot-scope="scope">
                  <span>{{ scope.row.delegateLocked | formatMoney }}</span>
                </template>
              </el-table-column>
              <el-table-column  min-width="160">
                <template slot="header">
                  {{ $t('deleget.released') }}
                  <el-tooltip class="item" effect="dark" placement="bottom">
                    <div slot="content" class="delegate-msg">
                      {{ $t('deleget.releasedMsg') }}
                    </div>
                    <i class="address-icon"></i>
                  </el-tooltip>
                </template>
                <template slot-scope="scope">
                  <span>{{ scope.row.delegateReleased | formatMoney }}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-box">
              <el-pagination
                background
                @size-change="handleDelegetSizeChange"
                @current-change="handleDelegetCurrentChange"
                :current-page.sync="currentPage3"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize3"
                layout="sizes,total,  prev, pager, next"
                :total="pageTotal3"
                :pager-count="windowWidth < 750 ? 5 : 9"
              ></el-pagination>
            </div>
          </div>
        </div>
        <div v-show="tabIndex == 5">
          <div class="address-trade-last node-last">
            {{ $t('deleget.totalReceiveReward') }}
            <b class="limit-number" style="margin-left: 20px"
              >{{ detailInfo.haveDeleReward | formatMoney }} LAT</b
            >
          </div>
          <div class="table">
            <el-table
              :data="rewardTableData"
              style="width: 100%"
              key="firstTable"
              size="mini"
              v-loading="loading.reward"
            >
              <el-table-column
                :label="$t('tradeAbout.hash')"
                :min-width="windowWidth < 750 ? 120 : ''"
              >
                <template slot-scope="scope">
                  <router-link
                    class="blue cursor ellipsis hash-width"
                    :to="getTradeUrl(scope.row.hash)"
                    >{{ scope.row.hash }}</router-link
                  >
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('tradeAbout.delegater')"
                :min-width="windowWidth < 750 ? 120 : ''"
              >
                <template slot-scope="scope">
                  <router-link
                    class="blue cursor ellipsis adr-width"
                    :to="getAddressUrl(scope.row.addr, scope.row.addrType)"
                    >{{ scope.row.addr }}</router-link
                  >
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('tradeAbout.claimTime')"
                show-overflow-tooltip
                width="180"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.time | formatTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('tradeAbout.delegateReward')"
                :min-width="windowWidth < 750 ? 120 : ''"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.reward | formatMoney }}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-box">
              <el-pagination
                background
                @size-change="handleRewardSizeChange"
                @current-change="handleRewardCurrentChange"
                :current-page.sync="currentPage5"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize5"
                layout="sizes,total,  prev, pager, next"
                :total="pageTotal5 > 5000 ? 5000 : pageTotal5"
                :pager-count="windowWidth < 750 ? 5 : 9"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from '@/services/API-services';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

import List from '@/components/list/list';
import Item from '@/components/list/item';

import itemList from '@/components/list/newlist';

export default {
  name: 'node-detail',
  data() {
    return {
      address: '',
      tabIndex: 1,
      newRecordFlag: false,
      detailInfo: {},
      cxt: null,

      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,

      tableOperateData: [],
      currentPage2: 1,
      pageSize2: 20,
      pageTotal2: 0,

      tableDelegetData: [],
      currentPage3: 1,
      pageSize3: 20,
      pageTotal3: 0,

      rewardTableData: [],
      currentPage5: 1,
      pageSize5: 20,
      pageTotal5: 0,

      displayTotalCount: 0,
      isCopy: false,
      copyText: '',
      isCopy2: false,
      copyText2: '',
      isCopy3: false,
      copyText3: '',

      imgRatio: 0,
      loading: {
        block: false,
        operate: false,
        deleget: false,
        reward: false,
      }
    };
  },
  props: {},
  computed: {
    lang() {
      return this.$i18n.locale.indexOf('zh') !== -1 ? 'zh' : 'en';
    },
  },
  watch: {},
  components: {
    List,
    Item,
  },
  methods: {
    tabChange(index) {
      this.tabIndex = index;
    },
    handleRewardSizeChange(size) {
      this.currentPage5 = 1;
      this.pageSize5 = size;
      this.getRewardData();
    },
    handleRewardCurrentChange(page) {
      this.currentPage5 = page;
      this.getRewardData();
    },
    //奖励领取明细
    getRewardData() {
      let param = {
        pageNo: this.currentPage5,
        pageSize: this.pageSize5,
        nodeId: this.address,
      };
      this.loading.reward = true;
      let self = this;
      apiService.node
        .queryClaimByStaking(param)
        .then((res) => {
          let { errMsg, code, data, totalCount } = res;
          if (code == 0) {
            self.rewardTableData = [...data];
            self.pageTotal5 = totalCount;
          } else {
            self.$message.error(errMsg);
          }
        })
        .catch((error) => {
          self.$message.error(error);
        })
        .finally(() => {
          this.loading.reward = false;
        });
    },
    //获取详情
    getDetail() {
      let param = {
        nodeId: this.address,
      };
      apiService.node
        .detail(param)
        .then((res) => {
          let { errMsg, code, data } = res;
          if (code == 0) {
            this.detailInfo = data;
            const dag =
              this.detailInfo.delegateValue / this.detailInfo.totalValue;
            if (!isNaN(dag)) {
              this.imgRatio = (dag * 100).toFixed(2);
            }
            this.getDelegetList();
            // this.draw(dag);
          } else {
            this.detailInfo = {};
            this.$message.error(errMsg);
          }
          //判断最新记录是否显示  总数
          this.detailInfo.blockQty > 5000
            ? (this.newRecordFlag = true)
            : (this.newRecordFlag = false);
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    // 已出区块
    getBlockList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        nodeId: this.address,
      };
      this.loading.block = true;
      apiService.block
        .blockListByNodeId(param)
        .then((res) => {
          let {
            data,
            totalPages,
            totalCount,
            code,
            errMsg,
            displayTotalCount,
          } = res;
          if (code == 0) {
            this.tableData = data;
            this.pageTotal = totalCount;
            this.displayTotalCount = displayTotalCount;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        })
        .finally(() => {
          this.loading.block = false;
        });
    },
    exportFn() {
      //跳转至下载页
      const { href } = this.$router.resolve({
        path: '/download',
        query: {
          address: this.address,
          // description: this.description,
          exportname: 'node',
          // tab:this.activeTab-1
        },
      });
      window.open(href, '_blank');
    },
    // 节点行为
    getOperateList() {
      let param = {
        pageNo: this.currentPage2,
        pageSize: this.pageSize2,
        nodeId: this.address,
      };
      this.loading.operate = true;
      apiService.node
        .stakingOptRecordList(param)
        .then((res) => {
          let { data, totalPages, totalCount, code, errMsg } = res;
          if (code == 0) {
            this.tableOperateData = data;
            this.pageTotal2 = totalCount;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        })
        .finally(() => {
          this.loading.operate = false;
        });
    },
    // 委托
    getDelegetList() {
      let param = {
        pageNo: this.currentPage3,
        pageSize: this.pageSize3,
        nodeId: this.address,
        stakingBlockNum: this.detailInfo.stakingBlockNum,
      };
      this.loading.deleget = true;
      apiService.node
        .delegationListByStaking(param)
        .then((res) => {
          let { data, totalPages, totalCount, code, errMsg } = res;
          if (code == 0) {
            this.tableDelegetData = data;
            this.pageTotal3 = totalCount;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        })
        .finally(() => {
          this.loading.deleget = false;
        });
    },
    onCopy(copy) {
      if (copy.trigger.id == 'copy1') {
        this.copyText = this.$t('modalInfo.copysuccess');
        this.isCopy = true;
      } else if (copy.trigger.id == 'copy2') {
        this.copyText2 = this.$t('modalInfo.copysuccess');
        this.isCopy2 = true;
      } else {
        this.copyText3 = this.$t('modalInfo.copysuccess');
        this.isCopy3 = true;
      }
      setTimeout(() => {
        this.isCopy = false;
        this.copyText = '';
        this.isCopy2 = false;
        this.copyText2 = '';
        this.isCopy3 = false;
        this.copyText3 = '';
      }, 2000);
    },
    onError(index) {
      if (copy.trigger.id == 'copy1') {
        this.copyText = this.$t('modalInfo.copyfail');
        this.isCopy = true;
      } else if (copy.trigger.id == 'copy2') {
        this.copyText2 = this.$t('modalInfo.copyfail');
        this.isCopy2 = true;
      } else {
        this.copyText3 = this.$t('modalInfo.copyfail');
        this.isCopy3 = true;
      }
      setTimeout(() => {
        this.isCopy = false;
        this.copyText = '';
        this.isCopy2 = false;
        this.copyText2 = '';
        this.isCopy3 = false;
        this.copyText3 = '';
      }, 2000);
    },

    // 区块列表
    handleBlockCurrentChange(val) {
      this.currentPage = val;
      this.getBlockList();
    },
    handleBlockSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getBlockList();
    },

    // 操作列表
    handleOperateCurrentChange(val) {
      this.currentPage2 = val;
      this.getOperateList();
    },
    handleOperateSizeChange(val) {
      this.currentPage2 = 1;
      this.pageSize2 = val;
      this.getOperateList();
    },

    // 委托列表
    handleDelegetCurrentChange(val) {
      this.currentPage3 = val;
      this.getDelegetList();
    },
    handleDelegetSizeChange(val) {
      this.currentPage3 = 1;
      this.pageSize3 = val;
      this.getDelegetList();
    },
    draw(dag) {
      this.cxt.clearRect(0, 0, 88, 88);
      this.cxt.beginPath();
      this.cxt.moveTo(44, 44);
      this.cxt.fillStyle = '#000';
      this.cxt.arc(44, 44, 44, 0, -Math.PI * dag * 2, true);
      this.cxt.fill();
    },
  },
  //生命周期函数
  created() {
    this.address = this.$route.query.address;
    this.type = this.$route.query.type;
    this.getDetail();
    this.getBlockList();
    this.getOperateList();
    this.getRewardData();
  },
  mounted() {
    //this.cxt = document.getElementById("canvas").getContext("2d");
  },
};
</script>
<style lang="less" scoped>
.contract-detail-wrap {
  padding-bottom: 1px;
}
.contractCreator {
  a {
    width: 150px;
    display: inline-block;
    vertical-align: middle;
  }
}
.vote-status {
  // opacity: 0.15;
  background: rgba(59, 176, 18, 0.15);
  border-radius: 2px;
  line-height: 26px;
  padding: 7px 10px;
  margin-left: 73px;
  @media screen and (max-width: 750px) {
    min-width: 64px;
    display: inline-block;
  }
}
.page-zh {
  .vote-status {
    font-weight: bold;
  }
}
.yellow-status {
  background: rgba(255, 192, 23, 0.15);
}
.red-status {
  background: rgba(207, 50, 110, 0.15);
}
.gray-status {
  background: #999999;
  color: #fff;
}
.canvas {
  width: 88px;
  height: 88px;
  position: relative;
  background: #d5d5d5;
  border-radius: 50%;
  margin-right: 30px;
  cursor: pointer;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  &:hover .imgRatio {
    display: block;
  }
}
.node-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 23px;
  .node-header-left {
    display: flex;
    img {
      width: 58px;
      height: 58px;
      margin-right: 15px;
      border-radius: 50%;
    }
    .node-name {
      line-height: 24px;
      b {
        font-size: 20px;
        font-family: Gilroy-Medium;
      }
      span {
        font-size: 14px;
        color: #999999;
      }
      // i{
      //     display: inline-block;
      //     width: 14px;
      //     height: 14px;
      //     background: url()
      // }
    }
    p {
      font-size: 14px;
      color: #666666;
      line-height: 16px;
      margin-top: 8px;
    }
  }
}
.node-static-box {
  display: flex;
  margin: 36px 0 20px 0;
  .node-static-left-box {
    width: 80%;
  }
  .node-static-right-box {
    flex: 1;
    .yield-box {
      padding: 10px;
      .value {
        font-family: Gilroy-Medium;
        font-size: 40px;
        color: #000000;
        letter-spacing: 0;
      }
      .text {
        margin-top: 6px;
        font-family: Gilroy-Medium;
        font-size: 14px;
        color: #666666;
        letter-spacing: 0;
      }
      @media screen and (max-width: 750px) {
        .value {
          font-size: 32px;
          word-break: break-all;
        }
      }
    }
  }
}
.node-statistic {
  margin: 0;
  flex: auto;
  .node-statistic-left {
    margin-right: 6%;
    .item-odd {
      width: 42%;
    }
    .item-even {
      width: 58%;
    }
  }
  .stability-wrap {
    display: flex;
    width: 85%;
    margin-top: 16px;
    .self-tooltip p {
      font-size: 12px;
    }
  }
  .node-left {
    .list-col-item {
      flex: 1;
      @media screen and (max-width: 750px) {
        display: block;
      }
      justify-content: center;
      &:nth-child(2) {
        margin-left: -100px;
      }
      &:nth-child(3) {
        margin-left: -100px;
      }
      & > p {
        margin-top: 14px;
      }
      .onPending {
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #ffc017;
        letter-spacing: 0;
        padding-left: 4px;
        vertical-align: text-top;
      }
    }
  }
}
.node-detail-content {
  margin-top: 30px;
  .nodeInfo {
    margin-bottom: 21px;
    font-family: Gilroy-Medium;
    font-size: 14px;
  }
  .basicInfo {
    .list-wrap {
      .item-wrap {
        .list-item {
          /deep/ & > label {
            min-width: 180px;
          }
        }
      }
    }
  }
}
.node-last {
  position: relative;
  display: flex;
  @media screen and (max-width: 750px) {
    display: block;
  }
  .export-btn {
    position: absolute;
    right: 0;
    top: -8px;
    font-family: Gilroy-Medium;
    background: #fbfbfc;
    color: #0798de;
    @media screen and (max-width: 750px) {
      position: relative;
      top: unset;
      margin: 12px 0;
      float: right;
    }
    &:hover {
      background: #fbfbfc !important;
      color: #5cb2db;
      border: 1px solid #5cb2db !important;
    }
    &:active {
      background: #fbfbfc !important;
      border: 1px solid #0e52ac !important;
      color: #0e52ac !important;
    }
  }
  b {
    font-family: Gilroy-Medium;
  }
  .limit-number {
    @media screen and (max-width: 750px) {
      width: 180px;
      word-break: break-all;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
.statistic-right-data {
  flex: 1;
}
// 背景色
.bj {
  background-color: #fbfbfc;
}
// 粗字体
.node-header-right {
  font-family: Gilroy-Bold;
}
// 饼图百分比
.imgRatio {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  text-align: center;
  padding: 0 10px;
  width: 320px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  bottom: -50px;
  left: 50%;
  margin-left: -160px;
  z-index: 9999;
  display: none;
}

@media (max-width: 750px) {
  .node-static-box {
    flex-direction: column;
    .node-static-left-box {
      width: 100%;
      .node-statistic {
        .list-wrap {
          .item-wrap {
            .list-col-item {
              width: 49%;
              flex: unset !important;
              margin-left: 0 !important;
            }
          }
        }
      }
    }
    .node-static-right-box {
      width: 100%;
      .yield-box {
        padding-left: 0;
      }
    }
  }

  .content-padding {
    .tabs {
      .el-button {
        margin-left: 0 !important;
        margin-right: 10px;
        margin-bottom: 15px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .node-detail-content {
      margin-top: 10px;
      .basicInfo {
        .list-wrap {
          .item-wrap {
            .list-item {
              & > *:nth-child(2) {
                word-break: break-all;
              }
              & > label {
                min-width: 210px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.node-statistic {
  .list-item {
    width: 50%;
    p {
      // font-weight: 700;
      font-size: 18px;
    }
    label {
      line-height: 23px;
      width: 142px;
    }
    &.item-odd {
      label {
        width: 140px;
      }
      p {
        flex: 1;
      }
    }
  }
}
.node-statistic-right {
  display: flex;
  min-width: 40%;
  .list-item {
    width: 100%;
    // justify-content: space-between;
    p.statistic-total-stake {
      width: auto;
    }
  }
  ul {
    display: flex;
    justify-content: space-between;
    li {
      margin-right: 10px;
      label {
        margin-bottom: 11px;
        display: block;
        color: #666666;
      }
      p {
        // font-weight: 700;
        font-size: 18px;
        span {
          // display: block;
          font-size: 13px;
          font-weight: normal;
        }
      }
    }
  }
}
.statistic-right-data {
  .total-stake {
    label {
      width: auto;
    }
  }
}

.node.table-content {
  width: 100%;
  overflow-x: auto;
}
</style>
