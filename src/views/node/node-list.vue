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
              <span class="fontSize13 Gilroy-Regular">LAT</span>
            </p>
          </Item>
          <Item :label="$t('nodeInfo.totalDelegations')">
            <!-- <p>{{(ValidatorStatisticData.stakingDelegationValue-ValidatorStatisticData.stakingValue) | formatMoney}}<span class="fontSize13">LAT</span></p> -->
            <p>
              <span
                class="Gilroy-Medium"
              >{{ accSub(ValidatorStatisticData.stakingDelegationValue,ValidatorStatisticData.stakingValue) | formatMoney |sliceFloat(0)}}</span>
              <span
                style="font-size: 13px;"
              >{{ accSub(ValidatorStatisticData.stakingDelegationValue,ValidatorStatisticData.stakingValue) | formatMoney |sliceFloat(1)}}</span>
              <span class="fontSize13">&nbsp;LAT</span>
            </p>
          </Item>
        <Item :label="$t('nodeInfo.stakeRate')">
          <p>
            <span
              class="Gilroy-Medium"
            >{{ValidatorStatisticData.stakingDelegationValue | percentage(ValidatorStatisticData.issueValue)}}</span>
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
            <span
              class="Gilroy-Medium"
            >{{ValidatorStatisticData.blockReward | formatMoney |sliceFloat(0)}}</span>
            <span
              style="font-size: 13px;"
            >{{ValidatorStatisticData.blockReward | formatMoney |sliceFloat(1)}}</span>
            <span class="fontSize13">&nbsp;LAT</span>
          </p>
        </Item>
        <Item :label="$t('nodeInfo.stakingReward')">
          <!-- <p>
            {{ValidatorStatisticData.stakingReward | formatMoney}}
            <span class="fontSize13">LAT</span>
          </p>-->
          <p>
            <span
              class="Gilroy-Medium"
            >{{ValidatorStatisticData.stakingReward | formatMoney |sliceFloat(0)}}</span>
            <span
              style="font-size: 13px;"
            >{{ValidatorStatisticData.stakingReward | formatMoney |sliceFloat(1)}}</span>
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
import apiService from "@/services/API-services";
import IndexService from "@/services/index-service";

import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

import List from "@/components/list/list";
import Item from "@/components/list/item";
import Validator from "./list";

let indexService = null;
export default {
  name: "node-list",
  data() {
    return {};
  },
  props: {},
  computed: {
    ...mapGetters(["ValidatorStatisticData"]),
    getPercentage() {
      if (this.ValidatorStatisticData.addIssueEnd) {
        const x =
          this.accMul(
            this.accSub(this.ValidatorStatisticData.currentNumber,this.ValidatorStatisticData.addIssueBegin),
            this.accSub(this.ValidatorStatisticData.addIssueEnd,this.ValidatorStatisticData.addIssueBegin)
            ) * 100;
        if (x % 1 == 0) {
          return x;
        }
        return x.toFixed(2);
      }
      return 0;
    },
    nextSetting() {
      let next = this.ValidatorStatisticData.nextSetting;
      if (next) {
        if (next < 10) {
          return "00000" + next;
        } else if (next < 100) {
          return "0000" + next;
        } else if (next < 1000) {
          return "000" + next;
        } else if (next < 10000) {
          return "00" + next;
        } else if (next < 100000) {
          return "0" + next;
        }
      } else {
        return "000000";
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
    getNodeStatistic() {
      let param = {};
      apiService.node
        .statistic(param)
        .then(res => {
          let { errMsg, code, data } = res;
          if(code==0){
            this.updateValidatorStatisticData(data);
          }else{
            this.$message.error(errMsg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    accSub(num1, num2) {
      num1 = Number(num1);
      num2 = Number(num2);
      var dec1, dec2, times;
      try { dec1 = this.countDecimals(num1)+1; } catch (e) { dec1 = 0; }
      try { dec2 = this.countDecimals(num2)+1; } catch (e) { dec2 = 0; }
      times = Math.pow(10, Math.max(dec1, dec2));
      var result = Number((this.accMul(num1, times) - this.accMul(num2, times)) / times);
      return this.getCorrectResult("sub", num1, num2, result);
    },

    accMul (num1, num2) {
      num1 = Number(num1);
      num2 = Number(num2);
      var times = 0, s1 = num1.toString(), s2 = num2.toString();
      try { times += this.countDecimals(s1); } catch (e) { }
      try { times += this.countDecimals(s2); } catch (e) { }
      var result = this.convertToInt(s1) * this.convertToInt(s2) / Math.pow(10, times);
      return this.getCorrectResult("mul", num1, num2, result);
    },
    countDecimals (num) {
        var len = 0;
        try {
            num = Number(num);
            var str = num.toString().toUpperCase();
            if (str.split('E').length === 2) { // scientific notation
                var isDecimal = false;
                if (str.split('.').length === 2) {
                    str = str.split('.')[1];
                    if (parseInt(str.split('E')[0]) !== 0) {
                        isDecimal = true;
                    }
                }
                let x = str.split('E');
                if (isDecimal) {
                    len = x[0].length;
                }
                len -= parseInt(x[1]);
            } else if (str.split('.').length === 2) { // decimal
                if (parseInt(str.split('.')[1]) !== 0) {
                    len = str.split('.')[1].length;
                }
            }
        } catch(e) {
            throw e;
        } finally {
            if (isNaN(len) || len < 0) {
                len = 0;
            }
            return len;
        }
    },

    convertToInt (num) {
      num = Number(num);
      var newNum = num;
      var times = this.countDecimals(num);
      var temp_num = num.toString().toUpperCase();
      if (temp_num.split('E').length === 2) {
          newNum = Math.round(num * Math.pow(10, times));
      } else {
          newNum = Number(temp_num.replace(".", ""));
      }
      return newNum;
    },

    getCorrectResult (type, num1, num2, result) {
        var temp_result = 0;
        switch (type) {
            case "add":
                temp_result = num1 + num2;
                break;
            case "sub":
                temp_result = num1 - num2;
                break;
            case "div":
                temp_result = num1 / num2;
                break;
            case "mul":
                temp_result = num1 * num2;
                break;
        }
        if (Math.abs(result - temp_result) > 1) {
            return temp_result;
        }
        return result;
    }
// 版权声明：本文为CSDN博主「f清风q」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/u013347241/article/details/79210840
  },
  //生命周期函数
  created() {
    this.getNodeStatistic();
    indexService = new IndexService();
    indexService.getValidatorStatisticData();

  },
  mounted() {
  },
  destroyed() {
    indexService.disconnect();
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

