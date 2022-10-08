<template>
  <div class="governable-wrapper">
    <h2 class="title">{{ $t('more.governableParameter') }}</h2>
    <!-- staking -->
    <div class="section" v-if="lis.staking">
      <h3 class="h3">staking</h3>
      <div class="cont-row">
        <!-- 内容分割1 -->
        <div class="cont-box">
          <h4 class="h4">stakeThreshold</h4>
          <p class="exp">{{ $t('more.stakeThreshold') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green"
                  >{{ lis.staking.stakeThreshold.value | formatMoney }}LAT</span
                >
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.staking.stakeThreshold, 1)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black"
                  >{{
                    lis.staking.stakeThreshold.initValue | formatMoney
                  }}LAT</span
                >
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.staking.stakeThreshold, 2)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.staking.stakeThreshold.start
                }}</span>
                <span class="regular"
                  >{{
                    lis.staking.stakeThreshold.startValue | formatMoney
                  }}LAT</span
                >
              </div>
              <div>
                <span class="regular"
                  >{{
                    lis.staking.stakeThreshold.endValue | formatMoney
                  }}LAT</span
                >
                <span class="medium">{{ lis.staking.stakeThreshold.end }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割2 -->
        <div class="cont-box">
          <h4 class="h4">operatingThreshold</h4>
          <p class="exp">{{ $t('more.operatingThreshold') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green"
                  >{{
                    lis.staking.operatingThreshold.value | formatMoney
                  }}LAT</span
                >
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.staking.operatingThreshold, 1)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black"
                  >{{
                    lis.staking.operatingThreshold.initValue | formatMoney
                  }}LAT</span
                >
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.staking.operatingThreshold, 2)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.staking.operatingThreshold.start
                }}</span>
                <span class="regular"
                  >{{
                    lis.staking.operatingThreshold.startValue | formatMoney
                  }}LAT</span
                >
              </div>
              <div>
                <span class="regular"
                  >{{
                    lis.staking.operatingThreshold.endValue | formatMoney
                  }}LAT</span
                >
                <span class="medium">{{
                  lis.staking.operatingThreshold.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割3 -->
        <div class="cont-box">
          <h4 class="h4">maxValidators</h4>
          <p class="exp">{{ $t('more.maxValidators') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{ lis.staking.maxValidators.value }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.staking.maxValidators, 1)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.staking.maxValidators.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.staking.maxValidators, 2)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.staking.maxValidators.start
                }}</span>
                <span class="regular">{{
                  lis.staking.maxValidators.startValue
                }}</span>
              </div>
              <div>
                <span class="regular">{{
                  lis.staking.maxValidators.endValue
                }}</span>
                <span class="medium">{{ lis.staking.maxValidators.end }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割4 -->
        <div class="cont-box">
          <h4 class="h4">unStakeFreezeDuration</h4>
          <p class="exp">{{ $t('more.unStakeFreezeDuration') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.staking.unStakeFreezeDuration.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.staking.unStakeFreezeDuration, 1)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.staking.unStakeFreezeDuration.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.staking.unStakeFreezeDuration, 2)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.staking.unStakeFreezeDuration.start
                }}</span>
                <span class="regular">maxEvidenceAge</span>
              </div>
              <div>
                <span class="regular">{{
                  lis.staking.unStakeFreezeDuration.endValue
                }}</span>
                <span class="medium">{{
                  lis.staking.unStakeFreezeDuration.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割4-1 -->
        <div v-if="lis.staking.unDelegateFreezeDuration" class="cont-box">
          <h4 class="h4">unDelegateFreezeDuration</h4>
          <p class="exp">{{ $t('more.unDelegateFreezeDuration') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.staking.unDelegateFreezeDuration.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.staking.unDelegateFreezeDuration, 1)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.staking.unDelegateFreezeDuration.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.staking.unDelegateFreezeDuration, 2)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.staking.unDelegateFreezeDuration.start
                }}</span>
                <span class="regular">{{
                  lis.staking.unDelegateFreezeDuration.startValue
                }}</span>
              </div>
              <div>
                <span class="regular">unStakeFreezeDuration</span>
                <span class="medium">{{
                  lis.staking.unDelegateFreezeDuration.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割5 -->
        <div class="cont-box">
          <h4 class="h4">rewardPerMaxChangeRange</h4>
          <p class="exp">{{ $t('more.rewardPerMaxChangeRange') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.staking.rewardPerMaxChangeRange.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.staking.rewardPerMaxChangeRange, 1)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.staking.rewardPerMaxChangeRange.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.staking.rewardPerMaxChangeRange, 2)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.staking.rewardPerMaxChangeRange.start
                }}</span>
                <span class="regular">{{
                  lis.staking.rewardPerMaxChangeRange.startValue
                }}</span>
              </div>
              <div>
                <span class="regular">{{
                  lis.staking.rewardPerMaxChangeRange.endValue
                }}</span>
                <span class="medium">{{
                  lis.staking.rewardPerMaxChangeRange.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割6 -->
        <div class="cont-box">
          <h4 class="h4">rewardPerChangeInterval</h4>
          <p class="exp">{{ $t('more.rewardPerChangeInterval') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.staking.rewardPerChangeInterval.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.staking.rewardPerChangeInterval, 1)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.staking.rewardPerChangeInterval.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.staking.rewardPerChangeInterval, 2)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.staking.rewardPerChangeInterval.start
                }}</span>
                <span class="regular">{{
                  lis.staking.rewardPerChangeInterval.startValue
                }}</span>
              </div>
              <div>
                <span class="regular">{{
                  lis.staking.rewardPerChangeInterval.endValue
                }}</span>
                <span class="medium">{{
                  lis.staking.rewardPerChangeInterval.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="blank"></div>
        <div class="blank"></div>
      </div>
    </div>
    <!-- slashing -->
    <div class="section" v-if="lis.slashing">
      <h3 class="h3">slashing</h3>
      <div class="cont-row">
        <!-- 内容分割1 -->
        <div class="cont-box">
          <h4 class="h4">slashBlocksReward</h4>
          <p class="exp">{{ $t('more.slashBlocksReward') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.slashing.slashBlocksReward.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.slashing.slashBlocksReward, 1)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.slashing.slashBlocksReward.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.slashing.slashBlocksReward, 2)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.slashing.slashBlocksReward.start
                }}</span>
                <span class="regular">{{
                  lis.slashing.slashBlocksReward.startValue
                }}</span>
              </div>
              <div>
                <span class="regular">{{
                  lis.slashing.slashBlocksReward.endValue
                }}</span>
                <span class="medium">{{
                  lis.slashing.slashBlocksReward.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割2 -->
        <div class="cont-box">
          <h4 class="h4">slashFractionDuplicateSign</h4>
          <p class="exp">{{ $t('more.slashFractionDuplicateSign') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.slashing.slashFractionDuplicateSign.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.slashing.slashFractionDuplicateSign, 1)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.slashing.slashFractionDuplicateSign.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.slashing.slashFractionDuplicateSign, 2)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.slashing.slashFractionDuplicateSign.start
                }}</span>
                <span class="regular">{{
                  lis.slashing.slashFractionDuplicateSign.startValue
                }}</span>
              </div>
              <div>
                <span class="regular">{{
                  lis.slashing.slashFractionDuplicateSign.endValue
                }}</span>
                <span class="medium">{{
                  lis.slashing.slashFractionDuplicateSign.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割3 -->
        <div class="cont-box">
          <h4 class="h4">duplicateSignReportReward</h4>
          <p class="exp">{{ $t('more.duplicateSignReportReward') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.slashing.duplicateSignReportReward.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.slashing.duplicateSignReportReward, 1)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.slashing.duplicateSignReportReward.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.slashing.duplicateSignReportReward, 2)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.slashing.duplicateSignReportReward.start
                }}</span>
                <span class="regular">{{
                  lis.slashing.duplicateSignReportReward.startValue
                }}</span>
              </div>
              <div>
                <span class="regular">{{
                  lis.slashing.duplicateSignReportReward.endValue
                }}</span>
                <span class="medium">{{
                  lis.slashing.duplicateSignReportReward.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割4 -->
        <div class="cont-box">
          <h4 class="h4">maxEvidenceAge</h4>
          <p class="exp">{{ $t('more.maxEvidenceAge') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.slashing.maxEvidenceAge.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.slashing.maxEvidenceAge, 1)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.slashing.maxEvidenceAge.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.slashing.maxEvidenceAge, 2)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.slashing.maxEvidenceAge.start
                }}</span>
                <span class="regular">{{
                  lis.slashing.maxEvidenceAge.startValue
                }}</span>
              </div>
              <div>
                <span class="regular">unStakeFreezeDuration</span>
                <span class="medium">{{
                  lis.slashing.maxEvidenceAge.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割5 zeroProduceCumulativeTime -->
        <div class="cont-box">
          <h4 class="h4">zeroProduceCumulativeTime</h4>
          <p class="exp">{{ $t('more.zeroProduceCumulativeTime') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.slashing.zeroProduceCumulativeTime.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.slashing.zeroProduceCumulativeTime, 1)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.slashing.zeroProduceCumulativeTime.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.slashing.zeroProduceCumulativeTime, 2)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.slashing.zeroProduceCumulativeTime.start
                }}</span>
                <span class="regular">zeroProduceNumberThreshold</span>
              </div>
              <div>
                <span class="regular">{{
                  lis.slashing.zeroProduceCumulativeTime.endValue
                }}</span>
                <span class="medium">{{
                  lis.slashing.zeroProduceCumulativeTime.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割6  zeroProduceNumberThreshold-->
        <div class="cont-box">
          <h4 class="h4">zeroProduceNumberThreshold</h4>
          <p class="exp">{{ $t('more.zeroProduceNumberThreshold') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.slashing.zeroProduceNumberThreshold.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.slashing.zeroProduceNumberThreshold, 1)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.slashing.zeroProduceNumberThreshold.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.slashing.zeroProduceNumberThreshold, 2)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.slashing.zeroProduceNumberThreshold.start
                }}</span>
                <span class="regular">{{
                  lis.slashing.zeroProduceNumberThreshold.startValue
                }}</span>
              </div>
              <div>
                <span class="regular">zeroProduceCumulativeTime </span>
                <span class="medium">{{
                  lis.slashing.zeroProduceNumberThreshold.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容分割7  zeroProduceNumberThreshold-->
        <div class="cont-box">
          <h4 class="h4">zeroProduceFreezeDuration</h4>
          <p class="exp">{{ $t('more.zeroProduceFreezeDuration') }}</p>
          <!-- 有背景内容块 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.slashing.zeroProduceFreezeDuration.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.slashing.zeroProduceFreezeDuration, 1)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.slashing.zeroProduceFreezeDuration.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.slashing.zeroProduceFreezeDuration, 2)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.slashing.zeroProduceFreezeDuration.start
                }}</span>
                <span class="regular">{{
                  lis.slashing.zeroProduceFreezeDuration.startValue
                }}</span>
              </div>
              <div>
                <!-- <span class="regular">{{
                  lis.slashing.zeroProduceFreezeDuration.endValue
                }}</span> -->
                <span class="regular">unStakeFreezeDuration</span>
                <span class="medium">{{
                  lis.slashing.zeroProduceFreezeDuration.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="blank"></div>
        <div class="blank"></div>
      </div>
    </div>
    <!-- block -->
    <div class="section" v-if="lis.block">
      <h3 class="h3">block</h3>
      <div class="cont-row">
        <div class="cont-box">
          <h4 class="h4">maxBlockGasLimit</h4>
          <p class="exp">{{ $t('more.maxBlockGasLimit') }}</p>
          <!-- 一个内容 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.block.maxBlockGasLimit.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.block.maxBlockGasLimit, 1)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.block.maxBlockGasLimit.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.block.maxBlockGasLimit, 2)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.block.maxBlockGasLimit.start
                }}</span>
                <span class="regular"
                  >{{ lis.block.maxBlockGasLimit.startValue }}&nbsp;gas</span
                >
              </div>
              <div>
                <span class="regular"
                  >{{ lis.block.maxBlockGasLimit.endValue }}&nbsp;gas</span
                >
                <span class="medium">{{ lis.block.maxBlockGasLimit.end }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="blank"></div>
        <div class="blank"></div>
      </div>
    </div>

    <!-- reward -->
    <div class="section" v-if="lis.reward">
      <h3 class="h3">reward</h3>
      <div class="cont-row">
        <div class="cont-box">
          <h4 class="h4">increaseIssuanceRatio</h4>
          <p class="exp">{{ $t('more.increaseIssuanceRatio') }}</p>
          <!-- 一个内容 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green">{{
                  lis.reward.increaseIssuanceRatio.value
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.reward.increaseIssuanceRatio, 1)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black">{{
                  lis.reward.increaseIssuanceRatio.initValue
                }}</span>
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="
                    getPercentage(lis.reward.increaseIssuanceRatio, 2)
                  "
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.reward.increaseIssuanceRatio.start
                }}</span>
                <span class="regular">{{
                  lis.reward.increaseIssuanceRatio.startValue
                }}</span>
              </div>
              <div>
                <span class="regular">{{
                  lis.reward.increaseIssuanceRatio.endValue
                }}</span>
                <span class="medium">{{
                  lis.reward.increaseIssuanceRatio.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="blank"></div>
      <div class="blank"></div>
    </div>

    <!-- restricting -->
    <div class="section" v-if="lis.restricting">
      <h3 class="h3">restricting</h3>
      <div class="cont-row">
        <div class="cont-box">
          <h4 class="h4">minimumRelease</h4>
          <p class="exp">{{ $t('more.minimumRelease') }}</p>
          <!-- 一个内容 -->
          <div class="cont-block">
            <!-- Current Value: -->
            <div class="current">
              <div>
                <span class="lable">{{ $t('more.currentValue') }}</span>
                <span class="green"
                  >{{ lis.restricting.minimumRelease.value }}LAT</span
                >
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.restricting.minimumRelease, 1)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#3BB012"
                ></el-progress>
              </div>
            </div>
            <!-- Genesis Value: -->
            <div class="genesis">
              <div>
                <span class="lable">{{ $t('more.genesisValue') }}</span>
                <span class="black"
                  >{{ lis.restricting.minimumRelease.initValue }}LAT</span
                >
              </div>
              <div class="progress-box">
                <el-progress
                  :percentage="getPercentage(lis.restricting.minimumRelease, 2)"
                  :show-text="false"
                  :stroke-width="20"
                  color="#000000"
                ></el-progress>
              </div>
            </div>
            <!-- 底部数字 -->
            <div class="bottom">
              <div>
                <span class="medium">{{
                  lis.restricting.minimumRelease.start
                }}</span>
                <span class="regular"
                  >{{ lis.restricting.minimumRelease.startValue }} LAT</span
                >
              </div>
              <div>
                <span class="regular"
                  >{{ lis.restricting.minimumRelease.endValue }} LAT</span
                >
                <span class="medium">{{
                  lis.restricting.minimumRelease.end
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="blank"></div>
      <div class="blank"></div>
    </div>
  </div>
</template>

<script>
import apiService from '@/services/API-services';
export default {
  name: 'governable-parameter',
  data() {
    return {
      lis: {
        block: null,
        slashing: null,
        staking: null,
        reward: null,
      },
    };
  },
  methods: {
    getPercentage(d, s) {
      let i = 0,
        j = d.endValue - d.startValue,
        k = 0;
      if (j <= 0) {
        return 100
      }
      if (s == 1) i = d.value - d.startValue;
      else if (s == 2) i = d.initValue - d.startValue;
      k = (i / j) * 100;
      if (k < 0.3) k = 0.3;
      return k;
    },
  },
  created() {
    apiService.more
      .queryConfig()
      .then((res) => {
        let { errMsg, code, data } = res;
        if (code == 0 && data.config) {
          for (let i = 0, d = data.config; i < d.length; i++) {
            let obj = {};
            for (let j = 0, k = d[i].detail; j < k.length; j++) {
              obj[k[j].name] = k[j];
            }
            this.lis[d[i].module] = obj;
          }
        } else {
          this.$message.error(errMsg);
        }
        // console.log('this.lis: ', this.lis);
      })
      .catch((error) => {
        this.$message.error(error);
      });
  },
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
  justify-content: space-between;
  flex-flow: wrap;
}
.blank {
  width: 495px;
  height: 0;
}
.cont-box {
  width: 495px;
  margin: 0 10px 30px 0;
  overflow: hidden;
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
  min-height: 48px;
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

@media (max-width: 750px) {
  .governable-wrapper {
    padding: 0 40px;
  }
}
@media (max-width: 500px) {
  .governable-wrapper {
    padding: 0 20px;
    .title {
      font-size: 26px;
      line-height: 46px;
    }
  }
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
