<template>
  <div>
    <h2 class="title">{{ $t("more.governableParameter") }}</h2>
    <!-- Staking -->
    <div class="section">
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
                <span class="green">{{'1,000,000LAT'}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="20" :show-text="false" stroke-width="20" color="#3BB012"></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{'1,000,000LAT'}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="20" :show-text="false" stroke-width="20" color="#000000"></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">[</span>
                <span class="regular">{{1000000}}LAT</span>
              </div>
              <div>
                <span class="regular">{{1000000}}LAT</span>
                <span class="medium">]</span>
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
                <span class="green">{{'10LAT'}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="1" :show-text="false" stroke-width="20" color="#3BB012"></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{'10LAT'}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="1" :show-text="false" stroke-width="20" color="#000000"></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">[</span>
                <span class="regular">{{10}}LAT</span>
              </div>
              <div>
                <span class="regular">{{10000}}LAT</span>
                <span class="medium">]</span>
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
                <span class="green">{{'101'}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="50" :show-text="false" stroke-width="20" color="#3BB012"></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{'101'}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="50" :show-text="false" stroke-width="20" color="#000000"></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">[</span>
                <span class="regular">{{25}}</span>
              </div>
              <div>
                <span class="regular">{{201}}</span>
                <span class="medium">]</span>
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
                <span class="green">{{'28'}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="10" :show-text="false" stroke-width="20" color="#3BB012"></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{'28'}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="10" :show-text="false" stroke-width="20" color="#000000"></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">[</span>
                <span class="regular">MaxEvidenceAge</span>
              </div>
              <div>
                <span class="regular">{{112}}</span>
                <span class="medium">]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Slashing -->
    <div class="section">
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
                <span class="green">{{0}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="0" :show-text="false" stroke-width="20" color="#3BB012"></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{0}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="0" :show-text="false" stroke-width="20" color="#000000"></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">[</span>
                <span class="regular">{{0}}</span>
              </div>
              <div>
                <span class="regular">{{60101}}</span>
                <span class="medium">]</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割2 -->
        <div class="cont-box">
          <h4 class="h4">MaxValidators</h4>
          <p class="exp">{{$t("more.slashingMaxValidators")}}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{$t("more.currentValue")}}</span>
                <span class="green">{{10}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="10" :show-text="false" stroke-width="20" color="#3BB012"></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{10}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="10" :show-text="false" stroke-width="20" color="#000000"></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">[</span>
                <span class="regular">{{0}}</span>
              </div>
              <div>
                <span class="regular">{{10000}}</span>
                <span class="medium">]</span>
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
                <span class="green">{{50}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="50" :show-text="false" stroke-width="20" color="#3BB012"></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{50}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="50" :show-text="false" stroke-width="20" color="#000000"></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">[</span>
                <span class="regular">{{0}}</span>
              </div>
              <div>
                <span class="regular">{{80}}</span>
                <span class="medium">]</span>
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
                <span class="green">{{0}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="0" :show-text="false" stroke-width="20" color="#3BB012"></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{0}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="0" :show-text="false" stroke-width="20" color="#000000"></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">[</span>
                <span class="regular">{{0}}</span>
              </div>
              <div>
                <span class="regular">UnStakeFreezeDuration</span>
                <span class="medium">]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Block -->
    <div class="section">
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
                <span class="green">{{210000000}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="20" :show-text="false" stroke-width="20" color="#3BB012"></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{$t("more.genesisValue")}}</span>
                <span class="black">{{100800000}}</span>
              </div>
              <div class="progress-box">
                <el-progress :percentage="20" :show-text="false" stroke-width="20" color="#000000"></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">[</span>
                <span class="regular">{{4712388}}&nbsp;gas</span>
              </div>
              <div>
                <span class="regular">{{210000000}}&nbsp;gas</span>
                <span class="medium">]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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