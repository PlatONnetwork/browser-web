<template>
  <div class="node-list-wrap">
    <div class="content-top-white content-padding">
      <div class="page-title fontSize34">{{$t('menu.validator')}}</div>
      <div class="node-list-header">
        <List class="statistic-info">
          <h3 class="Gilroy-Medium">{{$t('nodeInfo.liveStakingInfo')}}</h3>
          <Item :label="$t('nodeInfo.totalStakePower')">
            <p class="Gilroy-Medium">
              {{ValidatorStatisticData.stakingDelegationValue | unit}}
              <span class="fontSize13 Gilroy-Regular" style="padding-right:1px">LAT</span>
            </p>
          </Item>
          <Item :label="$t('nodeInfo.totalDelegations')">
            <!-- <p>{{(ValidatorStatisticData.stakingDelegationValue-ValidatorStatisticData.stakingValue) | formatMoney}}<span class="fontSize13">LAT</span></p> -->
            <p>
              <span class="Gilroy-Medium">{{ ValidatorStatisticData.delegationValue | formatMoney |sliceFloat(0)}}</span>
              <span style="font-size: 13px;">{{ ValidatorStatisticData.delegationValue | formatMoney |sliceFloat(1)}}</span>
              <span class="fontSize13">&nbsp;LAT</span>
            </p>
          </Item>
          <Item :label="$t('nodeInfo.stakeRate')">
            <p>
              <span class="Gilroy-Medium">{{ValidatorStatisticData.stakingDelegationValue | percentage(ValidatorStatisticData.issueValue)}}</span>
              <span class="fontSize13">%</span>
            </p>
          </Item>
        </List>
        <List class="statistic-info">
          <h3 class="Gilroy-Medium">{{$t('nodeInfo.currentPeriodReward')}}</h3>
          <Item :label="$t('blockAbout.blockReward')">
            <!-- <p>
            {{ValidatorStatisticData.blockReward | formatMoney}}
            <span class="fontSize13">LAT</span>
          </p>-->
            <p>
              <span class="Gilroy-Medium">{{ValidatorStatisticData.blockReward | formatMoney |sliceFloat(0)}}</span>
              <span style="font-size: 13px;">{{ValidatorStatisticData.blockReward | formatMoney |sliceFloat(1)}}</span>
              <span class="fontSize13">&nbsp;LAT</span>
            </p>
          </Item>
          <Item :label="$t('nodeInfo.stakingReward')">
            <!-- <p>
            {{ValidatorStatisticData.stakingReward | formatMoney}}
            <span class="fontSize13">LAT</span>
          </p>-->
            <p>
              <span class="Gilroy-Medium">{{ValidatorStatisticData.stakingReward | formatMoney |sliceFloat(0)}}</span>
              <span style="font-size: 13px;">{{ValidatorStatisticData.stakingReward | formatMoney |sliceFloat(1)}}</span>
              <span class="fontSize13">&nbsp;LAT</span>
            </p>
          </Item>
          <Item :label="$t('nodeInfo.nextRewardAdjustment')">
            <div class="next-reward-adjustment">
              <span :style="{width:getPercentage+'%'}"></span>
              <span></span>
              <p>{{$t('tradeAbout.block')}}&nbsp;{{getPercentage}}% of {{ValidatorStatisticData.addIssueEnd-ValidatorStatisticData.addIssueBegin}}</p>
            </div>
          </Item>
        </List>
        <div class="next-epoch">
          <h3 class="Gilroy-Medium">{{$t('nodeInfo.nextEpoch')}}</h3>
          <p>{{$t('nodeInfo.updateEpoch')}}</p>
          <ul>
            <li v-for="(item,index) in nextSetting" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <Validator></Validator>
  </div>
</template>
<script>
import apiService from "@/services/API-services"
import IndexService from "@/services/index-service"

import { mapState, mapActions, mapGetters, mapMutations } from "vuex"

import List from "@/components/list/list"
import Item from "@/components/list/item"
import Validator from "./list"

let indexService = null
export default {
  name: "node-list",
  data () {
    return {}
  },
  props: {},
  computed: {
    ...mapGetters(["ValidatorStatisticData"]),
    getPercentage () {
      if (this.ValidatorStatisticData.addIssueEnd) {
        const x =
          (
            (this.ValidatorStatisticData.currentNumber - this.ValidatorStatisticData.addIssueBegin) /
            (this.ValidatorStatisticData.addIssueEnd - this.ValidatorStatisticData.addIssueBegin)
          ) * 100
        if (x % 1 == 0) {
          return x
        }
        return x.toFixed(2)
      }
      return 0
    },
    nextSetting () {
      let next = this.ValidatorStatisticData.nextSetting
      if (next) {
        if (next < 10) {
          return "00000" + next
        } else if (next < 100) {
          return "0000" + next
        } else if (next < 1000) {
          return "000" + next
        } else if (next < 10000) {
          return "00" + next
        } else if (next < 100000) {
          return "0" + next
        }
      } else {
        return "000000"
      }
    }
  },
  watch: {},
  components: {
    List,
    Item,
    Validator
  },
  methods: {
    ...mapMutations({
      updateValidatorStatisticData: "UPDATE_VALIDATOR_STATIC_DADA",
    }),
    getNodeStatistic () {
      let param = {}
      apiService.node
        .statistic(param)
        .then(res => {
          let { errMsg, code, data } = res
          if (code == 0) {
            this.updateValidatorStatisticData(data)
          } else {
            this.$message.error(errMsg)
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
  },
  //生命周期函数
  created () {
    this.getNodeStatistic()
    indexService = new IndexService()
    indexService.getValidatorStatisticData()

  },
  mounted () {
  },
  destroyed () {
    indexService.disconnect()
  }
};
</script>
<style lang="less" scoped>
.node-list-header {
  margin-top: 23px;
  // margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .item-wrap {
    h3 {
      margin-bottom: 19px;
    }
  }
  label {
    width: 160px;
  }
  .next-reward-adjustment {
    display: flex;
    width: 188px;
    position: relative;
    span:nth-of-type(1) {
      background: #000;
      color: #fff;
      text-align: right;
    }
    span:nth-of-type(2) {
      flex: 1;
      background: #d5d5d5;
      color: #fff;
      text-align: left;
    }
    p {
      color: #fff;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      text-align: center;
      font-size: 12px;
      line-height: 21px;
    }
  }
  .next-epoch {
    p {
      margin: 19px 0 14px;
      color: #666;
    }
    ul {
      display: flex;
      li {
        width: 30px;
        height: 38px;
        background: #000;
        color: #fff;
        margin-right: 9px;
        border-radius: 1px;
        font-size: 28px;
        line-height: 38px;
        text-align: center;
      }
    }
  }
}
</style>
<style lang="less">
.node-list-header {
  .item-wrap {
    line-height: 24px;
    label {
      width: 171px;
      line-height: 21px;
      font-size: 14px;
    }
    p {
      font-size: 18px;
      width: auto;
    }
  }
}
</style>

