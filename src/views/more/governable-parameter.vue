<template>
  <div>
    <h2 class="title">{{ $t("more.governableParameter") }}</h2>
    <!-- Staking -->
    <div class="section" v-if="lis.Staking">
      <h3 class="h3">Staking</h3>
      <div class="cont-row">
        <!-- 内容分割1 -->
        <div class="cont-box">
          <h4 class="h4">StakeThreshold</h4>
          <p class="exp">{{$t("more.stakeThreshold")}}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{$t("more.currentValue")}}</span>
                <span class="green">{{lis.Staking.StakeThreshold.value| formatMoney}}LAT</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="getPercentage(lis.Staking.StakeThreshold,1)" :show-text="false" stroke-width="20" color="#3BB012"></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{lis.Staking.StakeThreshold.initValue| formatMoney}}LAT</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="getPercentage(lis.Staking.StakeThreshold,2)" :show-text="false" stroke-width="20" color="#000000"></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{lis.Staking.StakeThreshold.start}}</span>
                <span class="regular">{{lis.Staking.StakeThreshold.startValue| formatMoney}}LAT</span>
              </div>
              <div>
                <span class="regular">{{lis.Staking.StakeThreshold.endValue| formatMoney}}LAT</span>
                <span class="medium">{{lis.Staking.StakeThreshold.end}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割2 -->
        <div class="cont-box">
          <h4 class="h4">OperatingThreshold</h4>
          <p class="exp">{{$t("more.operatingThreshold")}}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{$t("more.currentValue")}}</span>
                <span class="green">{{lis.Staking.OperatingThreshold.value| formatMoney}}LAT</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Staking.OperatingThreshold,1)"
                  :show-text="false"
                  stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{lis.Staking.OperatingThreshold.initValue| formatMoney}}LAT</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Staking.OperatingThreshold,2)"
                  :show-text="false"
                  stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{lis.Staking.OperatingThreshold.start}}</span>
                <span class="regular">{{lis.Staking.OperatingThreshold.startValue| formatMoney}}LAT</span>
              </div>
              <div>
                <span class="regular">{{lis.Staking.OperatingThreshold.endValue| formatMoney}}LAT</span>
                <span class="medium">{{lis.Staking.OperatingThreshold.end}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割3 -->
        <div class="cont-box">
          <h4 class="h4">MaxValidators</h4>
          <p class="exp">{{$t("more.maxValidators")}}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{$t("more.currentValue")}}</span>
                <span class="green">{{lis.Staking.MaxValidators.value}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Staking.MaxValidators,1)"
                  :show-text="false"
                  stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{lis.Staking.MaxValidators.initValue}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Staking.MaxValidators,2)"
                  :show-text="false"
                  stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{lis.Staking.MaxValidators.start}}</span>
                <span class="regular">{{lis.Staking.MaxValidators.startValue}}</span>
              </div>
              <div>
                <span class="regular">{{lis.Staking.MaxValidators.endValue}}</span>
                <span class="medium">{{lis.Staking.MaxValidators.end}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割4 -->
        <div class="cont-box">
          <h4 class="h4">UnStakeFreezeDuration</h4>
          <p class="exp">{{$t("more.unStakeFreezeDuration")}}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{$t("more.currentValue")}}</span>
                <span class="green">{{lis.Staking.UnStakeFreezeDuration.value}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Staking.UnStakeFreezeDuration,1)"
                  :show-text="false"
                  stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{lis.Staking.UnStakeFreezeDuration.initValue}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Staking.UnStakeFreezeDuration,2)"
                  :show-text="false"
                  stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{lis.Staking.UnStakeFreezeDuration.start}}</span>
                <span class="regular">MaxEvidenceAge</span>
              </div>
              <div>
                <span class="regular">{{lis.Staking.UnStakeFreezeDuration.endValue}}</span>
                <span class="medium">{{lis.Staking.UnStakeFreezeDuration.end}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Slashing -->
    <div class="section" v-if="lis.Slashing">
      <h3 class="h3">Slashing</h3>
      <div class="cont-row">
        <!-- 内容分割1 -->
        <div class="cont-box">
          <h4 class="h4">SlashBlocksReward</h4>
          <p class="exp">{{$t("more.slashBlocksReward")}}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{$t("more.currentValue")}}</span>
                <span class="green">{{lis.Slashing.SlashBlocksReward.value}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Slashing.SlashBlocksReward,1)"
                  :show-text="false"
                  stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{lis.Slashing.SlashBlocksReward.initValue}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Slashing.SlashBlocksReward,2)"
                  :show-text="false"
                  stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{lis.Slashing.SlashBlocksReward.start}}</span>
                <span class="regular">{{lis.Slashing.SlashBlocksReward.startValue}}</span>
              </div>
              <div>
                <span class="regular">{{lis.Slashing.SlashBlocksReward.endValue}}</span>
                <span class="medium">{{lis.Slashing.SlashBlocksReward.end}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割2 -->
        <div class="cont-box">
          <h4 class="h4">SlashFractionDuplicateSign</h4>
          <p class="exp">{{$t("more.slashFractionDuplicateSign")}}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{$t("more.currentValue")}}</span>
                <span class="green">{{lis.Slashing.SlashFractionDuplicateSign.value}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Slashing.SlashFractionDuplicateSign,1)"
                  :show-text="false"
                  stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{lis.Slashing.SlashFractionDuplicateSign.initValue}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Slashing.SlashFractionDuplicateSign,2)"
                  :show-text="false"
                  stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{lis.Slashing.SlashFractionDuplicateSign.start}}</span>
                <span class="regular">{{lis.Slashing.SlashFractionDuplicateSign.startValue}}</span>
              </div>
              <div>
                <span class="regular">{{lis.Slashing.SlashFractionDuplicateSign.endValue}}</span>
                <span class="medium">{{lis.Slashing.SlashFractionDuplicateSign.end}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割3 -->
        <div class="cont-box">
          <h4 class="h4">DuplicateSignReportReward</h4>
          <p class="exp">{{$t("more.duplicateSignReportReward")}}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{$t("more.currentValue")}}</span>
                <span class="green">{{lis.Slashing.DuplicateSignReportReward.value}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Slashing.DuplicateSignReportReward,1)"
                  :show-text="false"
                  stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{lis.Slashing.DuplicateSignReportReward.initValue}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Slashing.DuplicateSignReportReward,2)"
                  :show-text="false"
                  stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{lis.Slashing.DuplicateSignReportReward.start}}</span>
                <span class="regular">{{lis.Slashing.DuplicateSignReportReward.startValue}}</span>
              </div>
              <div>
                <span class="regular">{{lis.Slashing.DuplicateSignReportReward.endValue}}</span>
                <span class="medium">{{lis.Slashing.DuplicateSignReportReward.end}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割4 -->
        <div class="cont-box">
          <h4 class="h4">MaxEvidenceAge</h4>
          <p class="exp">{{$t("more.maxEvidenceAge")}}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{$t("more.currentValue")}}</span>
                <span class="green">{{lis.Slashing.MaxEvidenceAge.value}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Slashing.MaxEvidenceAge,1)"
                  :show-text="false"
                  stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{lis.Slashing.MaxEvidenceAge.initValue}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Slashing.MaxEvidenceAge,2)"
                  :show-text="false"
                  stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{lis.Slashing.MaxEvidenceAge.start}}</span>
                <span class="regular">{{lis.Slashing.MaxEvidenceAge.startValue}}</span>
              </div>
              <div>
                <span class="regular">UnStakeFreezeDuration</span>
                <span class="medium">{{lis.Slashing.MaxEvidenceAge.end}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Block -->
    <div class="section" v-if="lis.Block">
      <h3 class="h3">Block</h3>
      <div class="cont-row">
        <div class="cont-box">
          <h4 class="h4">MaxBlockGasLimit</h4>
          <p class="exp">{{$t("more.maxBlockGasLimit")}}</p>
          <!-- 一个内容 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{$t("more.currentValue")}}</span>
                <span class="green">{{lis.Block.MaxBlockGasLimit.value}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Block.MaxBlockGasLimit,1)"
                  :show-text="false"
                  stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{lis.Block.MaxBlockGasLimit.initValue}}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.Block.MaxBlockGasLimit,2)"
                  :show-text="false"
                  stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{lis.Block.MaxBlockGasLimit.start}}</span>
                <span class="regular">{{lis.Block.MaxBlockGasLimit.startValue}}&nbsp;gas</span>
              </div>
              <div>
                <span class="regular">{{lis.Block.MaxBlockGasLimit.endValue}}&nbsp;gas</span>
                <span class="medium">{{lis.Block.MaxBlockGasLimit.end}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "@/services/API-services";
export default {
  name: "governable-parameter",
  data() {
    return {
      lis: {
        Block: null,
        Slashing: null,
        Staking: null
      }
    };
  },
  methods: {
    getPercentage(d, s) {
      let i = 0,
        j = d.endValue - d.startValue;
      if (s == 1) i = d.value - d.startValue;
      else if (s == 2) i = d.initValue - d.startValue;
      console.log("除数", i);
      console.log("被除数", j);
      console.log("商", parseInt((i / j) * 100));
      return parseInt((i / j) * 100);
    }
  },
  created() {
    apiService.more
      .queryConfig()
      .then(res => {
        console.log("hehe ", res);
        let { errMsg, code, data } = res;
        if (code == 0 && data.config) {
          for (let i = 0, d = data.config; i < d.length; i++) {
            let obj = {};
            for (let j = 0, k = d[i].detail; j < k.length; j++) {
              obj[k[j].name] = k[j];
            }
            this.lis[d[i].module] = obj;
          }
          console.log("转换后的对象", this.lis);
        } else {
          this.$message.error(errMsg);
        }
      })
      .catch(error => {
        this.$message.error(error);
      });
  }
};
</script>

<style lang="less" scoped>
.title {
  font-family: Gilroy-Medium;
  font-size: 34px;
  color: #000000;
  letter-spacing: 0;
  line-height: 64px;
  margin: 25px 0 20px 0;
}
.section {
  margin-bottom: 20px;
  //   border: 1px solid black;
}
.h3 {
  font-family: Gilroy-Medium;
  font-size: 24px;
  color: #000000;
  letter-spacing: 0;
  line-height: 24px;
}
.cont-row {
  margin-top: 20px;
  display: flex;
  flex-flow: wrap;
}
.cont-box {
  margin: 0 74px 30px 0;
  //   border:1px solid red;
}
.h4 {
  font-family: Gilroy-Medium;
  font-size: 20px;
  color: #000000;
  letter-spacing: 0;
  line-height: 24px;
}
.exp {
  font-family: Gilroy-Regular;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  line-height: 24px;
  margin: 10px 0 6px 0;
}
.cont-block {
  background: #fbfbfc;
  padding: 20px;
  .current {
    margin-bottom: 20px;
  }
  .genesis {
    margin-bottom: 10px;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    .medium {
      font-family: Gilroy-Medium;
      font-size: 12px;
      color: #666666;
      letter-spacing: 0;
      line-height: 24px;
    }
    .regular {
      font-family: Gilroy-Regular;
      font-size: 12px;
      color: #666666;
      letter-spacing: 0;
      text-align: right;
      line-height: 24px;
    }
  }
}
.lable {
  font-family: Gilroy-Medium;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  margin-right: 8px;
}
.progress-box {
  width: 444px;
  margin-top: 12px;
  .el-progress-bar__outer {
    background: #eeeeee;
    border-radius: 1px;
  }
}
.green {
  font-family: Gilroy-Medium;
  font-size: 13px;
  color: #3bb012;
  letter-spacing: 0;
}
.black {
  font-family: Gilroy-Medium;
  font-size: 13px;
  color: #000000;
  letter-spacing: 0;
}
</style>
<style lang="less">
.progress-box {
  .el-progress-bar__outer {
    background: #eeeeee;
    border-radius: 1px;
  }
  .el-progress-bar__inner {
    border-radius: 1px;
  }
}
</style>