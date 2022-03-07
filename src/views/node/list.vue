<template>
  <div class="gray-content content-padding">
    <el-row
      class="history-validators-header"
      type="flex"
      justify="space-between"
      v-if="type == 'history' || type == 'zero'"
    >
      <el-col :span="12">
        <div style="margin-top: 14px;white-space: nowrap;" v-if="type == 'history'">
          {{ $t('nodeInfo.historicalValidators') }}
          ( <b>{{ pageTotal }}</b> )
        </div>
        <div style="margin-top: 14px;white-space: nowrap;" v-if="type == 'zero'">
          {{ $t('nodeInfo.zeroProduceValidators') }}
          ( <b>{{ pageTotal }}</b> )
        </div>
      </el-col>
      <el-col :span="12" class="historical-validators">
        <div class="validators-search history-validators-search">
          <el-input
            :placeholder="$t('nodeInfo.searchValidator')"
            clearable
            v-model="keyword"
            @keyup.enter.native="searchFn"
            @change="clearInput"
            size="mini"
          ></el-input>
          <el-button
            type="primary"
            class="el-btn el-searchs"
            @click="searchFn"
            >{{ $t('search.searchBtn') }}</el-button
          >
        </div>
      </el-col>
    </el-row>
    <!-- 验证节点表头 -->
    <el-row v-else>
      <el-col :lg="16" :md="18" :sm="24" :xs="24" class="validators-tab">
        <div class="tabs">
          <el-button
            size="medium"
            :class="{ active: tabIndex == 1 }"
            @click="tabChange(1, 'all')"
            >{{ $t('contract.all') }}</el-button
          >
          <el-button
            size="medium"
            :class="{ active: tabIndex == 2 }"
            @click="tabChange(2, 'active')"
            >{{ $t('nodeStatus.2') }}</el-button
          >
          <el-button
            size="medium"
            :class="{ active: tabIndex == 3 }"
            @click="tabChange(3, 'candidate')"
            >{{ $t('nodeStatus.1') }}</el-button
          >
        </div>
        <div class="validators-search node-validators-search">
          <el-input
            :placeholder="$t('nodeInfo.searchValidator')"
            clearable
            v-model="keyword"
            @keyup.enter.native="searchFn"
            @change="clearInput"
            size="mini"
          ></el-input>
          <el-button
            type="primary"
            class="el-btn el-searchs"
            @click="searchFn"
            >{{ $t('search.searchBtn') }}</el-button
          >
        </div>
      </el-col>
      <el-col :lg="8" class="historical-validators">
        <router-link type="text" class="historical-btn" to='/zero-node'>{{
          $t('nodeInfo.zeroProduceValidators')
        }}</router-link >
        <router-link type="text" class="historical-btn" to='/history-node'>{{
          $t('nodeInfo.historicalValidators')
        }}</router-link>
      </el-col>
    </el-row>
    <!-- 历史验证节点、零出块惩罚验证节点 表头 -->

    <!-- 历史验证节点 -->
    <div class="table node-table" v-if="type == 'history'" v-loading="tLoading">
      <div class="table-content">
        <el-table :data="tableData">
          <el-table-column
            :label="$t('common.serialnumber')"
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.ranking }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('nodeInfo.name')"
            min-width="180"
          >
            <!-- TODO历史节点 table -->
            <template slot-scope="scope">
              <div class="flex-special validator-name">
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="bottom"
                  v-if="scope.row.isRecommend"
                >
                  <div slot="content">
                    <span class="title-warning">{{
                      $t('nodeInfo.officialRecommendation')
                    }}</span>
                  </div>
                  <img
                    src="../../assets/images/icon-remark.svg"
                    class="icon-remark cursor"
                  />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="bottom"
                  v-if="scope.row.isInit"
                >
                  <!-- v-if='scope.row.isInit' -->
                  <div slot="content">
                    <span class="title-warning">{{
                      $t('nodeInfo.nodeMsg')
                    }}</span>
                  </div>
                  <!-- <i class="iconfont iconxinxi cursor" style="margin-left:8px;color:#D5D5D5;font-size:12px;">&#xe63f;</i> -->
                  <i
                    class="el-icon-info cursor"
                    style="
                      margin-left: 8px;
                      color: #d5d5d5;
                      font-size: 12px;
                      line-height: 23px;
                    "
                  ></i>
                </el-tooltip>
                <img
                  :src="scope.row.stakingIcon"
                  v-if="scope.row.stakingIcon"
                  class="node-avtor"
                  alt
                />
                <img
                  src="../../assets/images/node-avtor.svg"
                  class="node-avtor"
                  v-if="!scope.row.stakingIcon"
                  alt
                />

                <router-link
                  class="cursor normal ellipsis percent60 fontSize15"
                  :to="getDetailUrl(scope.row.nodeId)"
                >
                  {{ scope.row.nodeName ? scope.row.nodeName : '------' }}
                </router-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('tradeAbout.status')" min-width="100">
            <template slot-scope="scope">
              <span
                class="Gilroy-Bold"
                :class="{
                  green: scope.row.status == 2 || scope.row.status == 6,
                  yellow: scope.row.status == 3 || scope.row.status == 4,
                  red: scope.row.status == 1,
                }"
                >{{ $t('nodeStatus.' + [scope.row.status]) }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('nodeInfo.pendingDelegations')"
            min-width="160"
          >
            <template slot-scope="scope">
              <span
                >{{ scope.row.statDelegateReduction | formatMoney }} LAT</span
              >
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('nodeInfo.stability')"
            class="stability-cell"
          >
            <template slot-scope="scope">
              <div class="node-stability flex-special">
                <div style="margin-right: 10px" class="self-tooltip">
                  <i class="icon-low-block cursor"></i>
                  <span>{{ scope.row.slashLowQty }}</span>
                  <p>{{ $t('nodeInfo.lowBlockRate') }}</p>
                </div>
                <div class="self-tooltip self-tooltip-sign">
                  <i class="icon-two-sign cursor"></i>
                  <span>{{ scope.row.slashMultiQty }}</span>
                  <p>{{ $t('nodeInfo.twoSignNum') }}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('nodeInfo.producedBlock')" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.blockQty | formatNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('nodeInfo.exitTime')" min-width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.leaveTime | formatTime }}</span>
            </template>
          </el-table-column>
          <!-- 预估解锁块高 -->
          <el-table-column width="280">
            <template slot="header">
              <span>{{ $t('nodeInfo.unlockBlockHeight') }}</span>
              <el-tooltip placement="bottom">
                <div slot="content" class="long-tips">
                  {{ $t('nodeInfo.node3Tips') }}
                </div>
                <img
                  class="tipsImg"
                  src="@/assets/images/icon-quest.svg"
                  alt="tips"
                />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.unlockBlockNum }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="sizes,total,  prev, pager, next"
          :total="pageTotal"
          :pager-count="windowWidth < 750 ? 5 : 9"
        ></el-pagination>
      </div>
    </div>

    <!-- 零出块惩罚验证节点 -->
    <div class="table node-table" v-else-if="type == 'zero'" v-loading="tLoading">
      <div class="table-content">
        <el-table :data="tableData">
          <el-table-column
            :label="$t('common.serialnumber')"
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.ranking }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('nodeInfo.name')"
            min-width="180"
          >
            <!-- TODO历史节点 table -->
            <template slot-scope="scope">
              <div class="flex-special validator-name">
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="bottom"
                  v-if="scope.row.isRecommend"
                >
                  <div slot="content">
                    <span class="title-warning">{{
                      $t('nodeInfo.officialRecommendation')
                    }}</span>
                  </div>
                  <img
                    src="../../assets/images/icon-remark.svg"
                    class="icon-remark cursor"
                  />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="bottom"
                  v-if="scope.row.isInit"
                >
                  <!-- v-if='scope.row.isInit' -->
                  <div slot="content">
                    <span class="title-warning">{{
                      $t('nodeInfo.nodeMsg')
                    }}</span>
                  </div>
                  <!-- <i class="iconfont iconxinxi cursor" style="margin-left:8px;color:#D5D5D5;font-size:12px;">&#xe63f;</i> -->
                  <i
                    class="el-icon-info cursor"
                    style="
                      margin-left: 8px;
                      color: #d5d5d5;
                      font-size: 12px;
                      line-height: 23px;
                    "
                  ></i>
                </el-tooltip>
                <img
                  :src="scope.row.stakingIcon"
                  v-if="scope.row.stakingIcon"
                  class="node-avtor"
                  alt
                />
                <img
                  src="../../assets/images/node-avtor.svg"
                  class="node-avtor"
                  v-if="!scope.row.stakingIcon"
                  alt
                />

                <router-link
                  class="cursor normal ellipsis fontSize15"
                  :to="getDetailUrl(scope.row.nodeId)"
                >
                  {{ scope.row.nodeName ? scope.row.nodeName : '------' }}
                </router-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('tradeAbout.status')" min-width="80">
            <template slot-scope="scope">
              <span
                class="Gilroy-Bold"
                :class="{
                  red: scope.row.status == 7,
                }"
                >{{ $t('nodeStatus.' + [scope.row.status]) }}</span
              >
            </template>
          </el-table-column>
          <el-table-column :label="$t('deleget.delegationsN')" min-width="120">
            <template slot-scope="scope">
              <span> {{ scope.row.delegateValue | formatMoney }} LAT </span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('nodeInfo.stability')"
            class="stability-cell"
            min-width="100"
          >
            <template slot-scope="scope">
              <div class="node-stability flex-special">
                <div style="margin-right: 10px" class="self-tooltip">
                  <i class="icon-low-block cursor"></i>
                  <span>{{ scope.row.slashLowQty }}</span>
                  <p>{{ $t('nodeInfo.lowBlockRate') }}</p>
                </div>
                <div class="self-tooltip self-tooltip-sign">
                  <i class="icon-two-sign cursor"></i>
                  <span>{{ scope.row.slashMultiQty }}</span>
                  <p>{{ $t('nodeInfo.twoSignNum') }}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('nodeInfo.producedBlock')" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.blockQty | formatNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('nodeInfo.freezeTime')" min-width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.leaveTime | formatTime }}</span>
            </template>
          </el-table-column>
          <!-- 预估解锁块高 -->
          <el-table-column min-width="260">
            <template slot="header">
              <span>{{ $t('nodeInfo.unlockBlockHeight') }}</span>
              <el-tooltip placement="bottom">
                <div slot="content" class="long-tips">
                  {{ $t('nodeInfo.node3Tips') }}
                </div>
                <img
                  class="tipsImg"
                  src="@/assets/images/icon-quest.svg"
                  alt="tips"
                />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.unlockBlockNum }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="sizes,total,  prev, pager, next"
          :total="pageTotal"
          :pager-count="windowWidth < 750 ? 5 : 9"
        ></el-pagination>
      </div>
    </div>

    <div v-else class="table"  v-loading="tLoading" :class="{'node-table': windowWidth < 750 || windowWidth > 1800}">
      <div class="table-content">
      <!-- <div class="table-content" :style="{height: windowWidth < 750 ? 'auto' : 'calc(100vh - 280px)'}"> -->
        <el-table :data="tableData" :height="(windowWidth < 750 || windowWidth > 1800 || pageTotal.length < 10) ? null : 'calc(100vh - 280px)'">
          <el-table-column
            fixed
            :label="$t('nodeInfo.rank')"
            :width="50"
            align="center"
            prop="ranking"
          >
          </el-table-column>
          <el-table-column
            :min-width="issafariBrowser ? 158 : 180"
          >
            <template slot="header">
              <span style="padding-left: 10px;"></span>{{$t('nodeInfo.validatorName')}}
            </template>
            <!-- TODO历史节点 table -->
            <template slot-scope="scope">
              <div class="flex-special validator-name">
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="bottom"
                  v-if="scope.row.isRecommend"
                >
                  <div slot="content">
                    <span class="title-warning">{{
                      $t('nodeInfo.officialRecommendation')
                    }}</span>
                  </div>
                  <img
                    src="../../assets/images/icon-remark.svg"
                    class="icon-remark cursor"
                  />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="bottom"
                  v-if="scope.row.isInit"
                >
                  <!-- v-if='scope.row.isInit' -->
                  <div slot="content">
                    <span class="title-warning">{{
                      $t('nodeInfo.nodeMsg')
                    }}</span>
                  </div>
                  <!-- <i class="iconfont iconxinxi cursor" style="margin-left:8px;color:#D5D5D5;font-size:12px;">&#xe63f;</i> -->
                  <i
                    class="el-icon-info cursor"
                    style="
                      color: #d5d5d5;
                      font-size: 12px;
                      line-height: 23px;
                    "
                  ></i>
                </el-tooltip>
                <img
                  :src="scope.row.stakingIcon"
                  v-if="scope.row.stakingIcon"
                  class="node-avtor"
                  alt
                />
                <img
                  src="../../assets/images/node-avtor.svg"
                  class="node-avtor"
                  v-if="!scope.row.stakingIcon"
                  alt
                />

                <router-link
                  class="cursor normal ellipsis percent60 fontSize15"
                  :to="getDetailUrl(scope.row.nodeId)"
                >
                  {{ scope.row.nodeName ? scope.row.nodeName : '------' }}
                </router-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('tradeAbout.status')" width="100">
            <template slot-scope="scope">
              <span
                class="Gilroy-Bold"
                :class="{
                  green: scope.row.status == 2 || scope.row.status == 6,
                  yellow: scope.row.status == 3 || scope.row.status == 4,
                  red: scope.row.status == 1,
                }"
                >{{ $t('nodeStatus.' + [scope.row.status]) }}</span
              >
            </template>
          </el-table-column>
          <el-table-column :label="$t('nodeInfo.totalStakePower')" min-width="165">
            <template slot-scope="scope">
              <span>{{ scope.row.totalValue | formatMoney }} LAT</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('deleget.delegationsN')"  min-width="165">
            <template slot-scope="scope">
              <span> {{ scope.row.delegateValue | formatMoney }} LAT</span>
            </template>
          </el-table-column>
          <!-- 委托奖励比例 -->
          <el-table-column :label="$t('tradeAbout.rewardRatio')" prop="delegatedRewardRatio" width="180">
          </el-table-column>
          <el-table-column :label="$t('deleget.delegators')" width="100">
            <template slot-scope="scope">
              <span>
                {{ scope.row.delegateQty | formatNumber }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('nodeInfo.stability')"
            class="stability-cell"
            width="110"
          >
            <template slot-scope="scope">
              <div class="node-stability flex-special">
                <el-tooltip placement="top">
                  <div slot="content"><p style="color: #ffc017" class="slash-tips">{{ $t('nodeInfo.lowBlockRate') }}</p></div>
                  <div style="margin-right: 10px" class="self-tooltip">
                    <i class="icon-low-block cursor"></i>
                    <span>{{ scope.row.slashLowQty }}</span>
                  </div>
                </el-tooltip>
                <el-tooltip placement="top">
                  <div div slot="content"><p style="color: #cf326e" class="slash-tips">{{ $t('nodeInfo.twoSignNum') }}</p></div>
                   <div class="self-tooltip self-tooltip-sign">
                    <i class="icon-two-sign cursor"></i>
                    <span>{{ scope.row.slashMultiQty }}</span>
                  </div>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('nodeInfo.producedBlock')" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.blockQty | formatNumber }}</span>
            </template>
          </el-table-column>
          <!-- 预计年化收益率 -->
          <el-table-column
            :label="$t('nodeInfo.yield3')"
            label-class-name="yield3"
            min-width="150"
          >
            <template slot="header">
              <span class="tipsTitle"> {{ $t('nodeInfo.yield3') }}</span>
              <el-tooltip placement="bottom" :hide-after="0">
                <div slot="content" class="long-tips" v-html="$t('tips.validatorYield')">
                </div>
                <img
                  class="tipsImg"
                  src="@/assets/images/icon-quest.svg"
                  alt="tips"
                />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span class="Gilroy-Medium" v-if="!scope.row.isInit"
                >{{ scope.row.expectedIncome }}%</span
              >
              <span class="Gilroy-Medium" v-else>--</span>
            </template>
          </el-table-column>
          <!-- T预计委托年化率 -->
          <el-table-column
            :label="$t('nodeInfo.delegatedYield')"
            label-class-name="delegatedYield"
            min-width="150"
          >
            <template slot="header">
              <span class="tipsTitle">
                {{ $t('nodeInfo.delegatedYield') }}</span
              >
              <el-tooltip placement="bottom">
                <div slot="content" class="long-tips" v-html="$t('tips.delegatedYield')">
                </div>
                <img
                  class="tipsImg"
                  src="@/assets/images/icon-quest.svg"
                  alt="tips"
                />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span class="Gilroy-Medium" v-if="!scope.row.isInit"
                >{{ scope.row.deleAnnualizedRate }}%</span
              >
              <span class="Gilroy-Medium" v-else>--</span>
            </template>
          </el-table-column>
          <!-- 出块率 -->
          <el-table-column prop="genBlocksRate" min-width="150">
            <template slot="header">
              <span class="tipsTitle">
                {{ $t('nodeInfo.gBlockRate') }}</span
              >
              <el-tooltip placement="bottom">
                <div slot="content" class="long-tips" v-html="$t('tips.blockRate24h')">
                </div>
                <img
                  class="tipsImg"
                  src="@/assets/images/icon-quest.svg"
                  alt="tips"
                />
              </el-tooltip>
            </template>
          </el-table-column>
          <!-- 版本号 -->
          <el-table-column :label="$t('nodeInfo.version')" prop="version">
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="sizes,total,  prev, pager, next"
          :total="pageTotal"
          :pager-count="windowWidth < 750 ? 5 : 9"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from '@/services/API-services';
import API from '@/config/API-config';
import IconImg from '@/assets/images/icon-quest.svg';

export default {
  name: 'Validator',
  data() {
    return {
      tabIndex: 1,
      tableData: [],
      currentPage: 1,
      pageSize: 300,
      pageSizes: [10, 20, 50, 100, 150, 300, 500],
      pageTotal: 0,
      keyword: '',
      queryStatus: 'all',
      tLoading: false,
      timer: null,
      websocket: null,
      issafariBrowser:
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent),
    };
  },
  props: {
    type: String,
  },
  computed: {},
  watch: {},
  components: {},
  methods: {
    renderHeader(h, { column, $index }) {
      let tooltipsInfo = '';
      if (column.labelClassName == 'yield3') {
        //预计年化收益率
        tooltipsInfo = this.$t('tips.validatorYield');
      } else if (column.labelClassName == 'delegatedYield') {
        //预计委托年化率
        tooltipsInfo = this.$t('tips.delegatedYield');
      }
      return h('div', [
        h('span', column.label),
        h(
          'el-tooltip',
          {
            props: {
              content: tooltipsInfo,
              placement: 'bottom',
            },
          },
          [
            h('img', {
              class: 'tipsImg',
              attrs: {
                src: IconImg,
                alt: 'tips',
              },
            }),
          ],
          {
            content: tooltipsInfo,
          }
        ),
      ]);
    },
    tabChange(index, type) {
      this.tabIndex = index;
      this.queryStatus = type;
      this.currentPage = 1;
      this.getList();
      if (type == 'candidate') {
        this.websocket && this.websocket.close();
        return;
      }
      this.getListBywebsocket();
    },
    clearInput(value) {
      this.currentPage = 1;
      this.tabIndex = 1;
      this.queryStatus = 'all';
      this.getList();
      if (this.type != 'history' && this.type != 'zero') {
        this.getListBywebsocket();
      }
    },
    getList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        key: this.keyword.trim(),
      };
      let methodName = '';
      if (this.type == 'history') {
        methodName = 'historyStakingList';
      } else if (this.type == 'zero') {
        methodName = 'lockedStakingList';
      } else {
        param.queryStatus = this.queryStatus;
        methodName = 'aliveStakingList';
      }
      this.tLoading = true;
      this.tableData.length = 0;
      apiService.node[methodName](param)
        .then((res) => {
          let { data, totalPages, totalCount, code, errMsg } = res;
          if (param.queryStatus && param.queryStatus !== this.queryStatus) {
            return;
          }
          if (code == 0) {
            this.tableData = data;
            if (this.type == 'history' || this.type == 'zero') {
              this.tableData.forEach((value, index) => {
                value.ranking = index + 1;
              });
            }
            // console.log(this.tableData)
            this.pageTotal = totalCount;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        })
        .finally(() => {
          if (param.queryStatus && param.queryStatus !== this.queryStatus) {
            return;
          }
          this.tLoading = false;
        });
    },
    //从websocket获取数据
    getListBywebsocket() {
      if (this.websocket) {
        this.websocket.close();
      }
      let url = API.WS_CONFIG.serverWebsocket.toLowerCase();
      const origin = window.location.origin;

      let param = this.guid();
      param += ',' + this.currentPage;
      param += ',' + this.pageSize;
      param += ',' + this.queryStatus;
      param += ',' + this.keyword.trim();

      if (origin.indexOf('https') != -1) {
        // url = url.replace("https", "wss");
        url = origin.replace('https', 'wss') + url;
      } else if (origin.indexOf('http') != -1) {
        // url = url.replace("http", "ws");
        url = origin.replace('http', 'ws') + url;
      }

      if ('WebSocket' in window) {
        this.websocket = new WebSocket(url + param);
        this.websocket.onerror = function (e) {
          // console.log("websocket.onerror", e)
        };
        this.websocket.onopen = function (e) {};
        this.websocket.onmessage = (e) => {
          let data = JSON.parse(e.data);
          if (data.code == 0) {
            // console.log("nodeList", data)
            this.tableData = data.data;
            this.pageTotal = data.totalCount;
          } else {
            this.$message.error(data.errMsg);
          }
        };
      } else {
        alert('当前浏览器 Not support websocket');
      }
    },
    replace() {
      this.$router.replace({
        query: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
      if (this.type != 'history' && this.type != 'zero') {
        this.getListBywebsocket();
        this.replace();
      }
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getList();
      if (this.type != 'history' && this.type != 'zero') {
        this.getListBywebsocket();
        this.replace();
      }
    },
    //查询
    searchFn() {
      this.currentPage = 1;
      this.tabIndex = 1;
      this.queryStatus = 'all';
      this.getList();
      if (this.type != 'history' && this.type != 'zero') {
        this.getListBywebsocket();
      }
    },
    //进入节点详情
    getDetailUrl(nodeId) {
      return {
      path: '/node-detail',
        query: {
        address: nodeId,
         type: this.type,
        }
      };
    },
    goDetail(nodeId) {
      this.$router.push(this.getDetailUrl(nodeId));
    },
    goHistory() {
      this.$router.push({
        path: '/history-node',
      });
    },
    goZero() {
      this.$router.push({
        path: '/zero-node',
      });
    },
    //
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
  },
  //生命周期函数
  created() {
    if (this.$route.query.currentPage) {
      this.currentPage = this.$route.query.currentPage - 0;
      this.pageSize = this.$route.query.pageSize - 0;
    }
    this.getList();
    // if (this.type != "history") {
    //   this.timer = setInterval(() => {
    //     // console.log(222)
    //     this.getList();
    //   }, 5000);
    // }
  },
  mounted() {
    if (this.type != 'history' && this.type != 'zero') {
      this.getListBywebsocket();
    }
  },
  beforeDestroy() {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
  },
  destroyed() {
    // clearInterval(this.timer);
    if (this.websocket) {
      this.websocket.close();
    }
  },
};
</script>
<style lang="less" scoped>
.historical-validators {
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1200px) {
    justify-content: initial;
    margin-top: 10px;
  }
  .historical-btn {
    display: inline-block;
    margin-right: 10px;
    margin-left: 0 !important;
    color: #0798de;
  }
}
.validators-tab {
  display: flex;
}
.validators-search {
  width: 400px;
  height: 42px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  display: flex;
  margin-left: 30px;
  .el-searchs {
    background: #fff;
    font-size: 14px;
    border: none;
    border-radius: 0px 4px 4px 0px;
    border-left: 1px solid #e6e6e6;
    color: #0798de;
    &:hover {
      background: #fff;
      color: #5cb2db;
      border-left: 1px solid #e6e6e6;
    }
    &:active {
      color: #0e52ac;
    }
  }
  &.node-validators-search {
    .el-searchs {
      background: #fbfbfc;
      &:hover {
        background: #fbfbfc;
      }
    }
  }
}

.node-stability {
  display: flex;
  width: 100%;
  // i {
  //   vertical-align: sub;
  // }
}
.history-validators-search {
  float: right;
}
.validator-name {
  position: relative;
  width: 100%;
  .el-icon-info {
    position: absolute;
    left: -10px;
  }
  .icon-remark {
    position: absolute;
    top: 5px;
    left: -17px;
    width: 14px;
    height: 14px;
  }
}
.node-avtor {
  width: 30px;
  height: 30px;
  margin: 0 8px;
  border-radius: 50%;
  margin-top: -3px;
}

@media (max-width: 750px) {
  .gray-content {
    .el-row {
      .validators-tab {
        float: unset;
        width: 100%;
        flex-direction: column;
        .tabs {
          margin-top: 20px;
        }
        .validators-search {
          width: 100%;
          margin-left: 0;
          margin-top: 20px;
        }
      }
      .historical-validators {
        justify-content: initial;
        float: unset;
        width: 100%;
        text-align: left;
        margin-top: 10px;
      }
    }
    .history-validators-header {
      flex-direction: column;
      .historical-validators {
        .history-validators-search {
          float: unset !important;
          margin-left: 0;
          width: 100%;
        }
      }
    }
    .node-table {
      margin-top: 20px;
    }
  }
}
.slash-tips {
  padding: 2px 0;
  width: 140px;
  text-align: center;
}
</style>
<style lang="less">
.validators-search {
  .el-input--mini .el-input__inner {
    height: 40px;
    line-height: 40px;
    background: #fff;
  }
  &.node-validators-search {
    .el-input--mini .el-input__inner {
      background: #fbfbfc;
    }
  }
}
.node-table .el-table {
  overflow: visible;
  .cell {
    overflow: visible;
  }
  .el-table__body-wrapper {
    overflow: visible;
  }
}
.el-table {
  .tipsTitle,
  .tipsImg {
    display: inline;
    vertical-align: middle;
  }
  .tipsImg {
    width: 14px;
    margin-left: 4px;
    vertical-align: text-bottom;
  }
}
.node-table .table-content {
  width: 100%;
  overflow-x: auto;
  .el-table__header-wrapper {
    overflow: visible;
  }
}

@media (max-width: 750px) {
  .node-list-header {
    .list-item {
      width: 100%;
      .next-reward-adjustment {
        flex: 1;
      }
    }
  }
}
</style>
