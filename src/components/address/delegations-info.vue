<template>
  <div>
    <div class="address-delegation">
      <ul>
        <!-- 总计委托 -->
        <li>
          <span>{{ detailInfo.delegateValue | formatMoney }}</span>
          <p>{{ $t("contract.totalDelegated") }}(LAT)</p>
        </li>
        <li>
          <span>{{ detailInfo.candidateCount | formatMoney }}</span>
          <p>{{ $t("deleget.validators") }}</p>
        </li>
        <li>
          <span>{{ detailInfo.delegateLocked | formatMoney }}</span>
          <p>{{ $t("deleget.lockedDelegate") }}(LAT)</p>
        </li>
        <li>
          <span>{{ detailInfo.delegateHes | formatMoney }}</span>
          <p>{{ $t("deleget.unlockedDelegate") }}(LAT)</p>
        </li>
        <!-- <li>
          <span>{{ detailInfo.delegateReleased }}</span>
          <p>{{ $t("deleget.releasedDelegate") }}(LAT)</p>
        </li> -->
        <!-- <li>
                      <span>{{detailInfo.delegateReduction}}</span>
                      <p>{{$t('deleget.undelegating')}}(LAT)</p>
                  </li> -->
      </ul>
    </div>

    <div class="table gray-table" >
      <el-table
        :data="tableData"
        style="width: 100%"
        key="firstTable"
        size="mini"
      >
        <el-table-column :label="$t('nodeInfo.validator')">
          <template slot-scope="scope">
            <div class="flex-special">
              <p
                class="cursor blue ellipsis percent60"
                @click="goNodeDetail(scope.row.nodeId)"
              >
                {{ scope.row.nodeName }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            {{ $t("deleget.delegationAmount") }}
            <el-tooltip class="item" effect="dark" placement="bottom">
              <div slot="content" class="delegate-msg">
                {{ $t("deleget.delegationAmountMsg") }}
              </div>
              <i class="address-icon"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.delegateValue | formatMoney }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('deleget.locked')+'\/'+ $t('deleget.percentage')">
                      <template slot-scope="scope">
                          <span>{{scope.row.delegateLocked | formatMoney}}({{scope.row.delegateLocked | percentage(scope.row.allDelegateLocked)}}%)</span>
                      </template>
                  </el-table-column> -->
        <el-table-column>
          <template slot="header">
            {{ $t("deleget.locked") }}
            <el-tooltip class="item" effect="dark" placement="bottom">
              <div slot="content" class="delegate-msg">
                {{ $t("deleget.lockedMsg") }}
              </div>
              <i class="address-icon"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.delegateLocked | formatMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            {{ $t("deleget.unlocked") }}
            <el-tooltip class="item" effect="dark" placement="bottom">
              <div slot="content" class="delegate-msg">
                {{ $t("deleget.unlockedMsg") }}
              </div>
              <i class="address-icon"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.delegateHas | formatMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            {{ $t("deleget.released") }}
            <el-tooltip class="item" effect="dark" placement="bottom">
              <div slot="content" class="delegate-msg">
                {{ $t("deleget.releasedMsg") }}
              </div>
              <i class="address-icon"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.delegateReleased | formatMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            {{ $t("deleget.unclaimedReward") }}
            <el-tooltip class="item" effect="dark" placement="bottom">
              <div slot="content" class="delegate-msg">
                {{ $t("deleget.unclaimedRewardMsg") }}
              </div>
              <i class="address-icon"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.delegateClaim | formatMoney }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('deleget.undelegating')">
                      <template slot-scope="scope">
                          <span>{{scope.row.delegateReduction | formatMoney}}</span>
                      </template>
                  </el-table-column> -->
      </el-table>
      <div class="pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="sizes,total,  prev, pager, next"
          :total="pageTotal"
          :pager-count="9"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "@/services/API-services";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  props: {
    address: String,
    detailInfo: Object
  },
  data(){
    return{
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
    }
  },
  methods:{
    ...mapMutations({
      updateIsAddressDetailsDelegation: "UPDATE_IS_ADDRESS_DETAILS_DELEGATION",
    }),
    //获取委托列表
    getList() {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        address: this.address
      };
      apiService.node
        .delegationListByAddress(param)
        .then(res => {
          let {
            data,
            totalPages,
            totalCount,
            code,
            errMsg,
            displayTotalCount
          } = res;
          if (code == 0) {
            this.tableData = data;
            this.pageTotal = totalCount;
            // this.displayTotalCount = displayTotalCount;
            if(this.tableData.length > 0){
              this.updateIsAddressDetailsDelegation(true);
            }
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getList();
    },
    goNodeDetail(nodeId) {
      this.$router.push({
        path: "/node-detail",
        query: {
          address: nodeId
        }
      });
    },
  },
  created(){
    this.getList();
  },
  destroyed(){
    this.updateIsAddressDetailsDelegation(false);
  }
}
</script>

<style lang="less" scoped>
  .address-delegation {
  ul {
    display: flex;
    margin-top: 20px;
    text-align: center;
    li {
      border: 1px solid #e9e9e9;
      border-radius: 2px;
      margin-right: 20px;
      padding: 5px 10px;
      text-align: left;
      span {
        font-size: 18px;
        font-family: Gilroy-Medium;
      }
      p {
        font-size: 12px;
        color: #999999;
      }
    }
  }
}
</style>
