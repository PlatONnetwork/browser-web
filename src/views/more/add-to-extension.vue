<template>
  <div class="content-wrap" :style="{ 'min-height': clientHeight + 'px' }">
    <vue-particles
      color="#2E2E2E"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#2E2E2E"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.7"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="repulse"
      class="lizi"
    ></vue-particles>
    <img class="polyhedron-big polyhedron" src="@/assets/images/polyhedron3.svg" />
    <img class="polyhedron-mid polyhedron" src="@/assets/images/polyhedron3.svg" />
    <img class="polyhedron-small polyhedron" src="@/assets/images/polyhedron3.svg" />
    <section class="content" v-if="config">
      <p class="title">{{ $t('extension.desc') }}</p>
      <el-steps :align-center="true">
        <el-step status="process" :title="$t('extension.steps.0')"></el-step>
        <el-step status="process" :title="$t('extension.steps.1')"></el-step>
        <el-step status="process" :title="$t('extension.steps.2')"></el-step>
      </el-steps>
      <p v-if="status.isMobile" class="mobile-err">{{ $t('extension.error.mobile') }}</p>
      <p v-else class="mobile-err">{{ $t('extension.error.isChrome') }}</p>
      <div class="detail">
        <p class="title">{{ config.title[lang] }}</p>
        <p class="item">
          <span class="desc">{{ $t('extension.form.rpc') }} :</span>
          <span class="text ellipsis1">{{ config.rpcUrl }}</span>
        </p>
        <p class="item">
          <span class="desc">{{ $t('extension.form.chainId') }} :</span>
          <span class="text ellipsis1">{{ config.chainId }}</span>
        </p>
        <p class="item">
          <span class="desc">{{ $t('extension.form.currency') }} :</span>
          <span class="text ellipsis1">{{ config.nativeCurrency.symbol }}</span>
        </p>
        <p class="item">
          <span class="desc">{{ $t('extension.form.website') }} :</span>
          <span class="text ellipsis1">{{ config.blockExplorerUrl }}</span>
        </p>
        <template v-if="!status.isMobile">
          <button
            v-if="status.accounts.length"
            @click="addToNetwork"
            class="btn add"
            :disabled="loading.add"
            :class="{ active: loading.add }"
          >
            {{ $t('extension.form.add') }}
          </button>
          <button
            v-else
            @click="connect"
            class="btn connect"
            :disabled="loading.connect"
            :class="{ active: loading.connect }"
          >
            {{ $t('extension.form.connect') }}
          </button>
        </template>
      </div>
      <!-- <ul class="tips">
        <li v-for="key in Object.keys(status)" :key="key">
          {{ `${key} : ${status[key]}` }}
        </li>
      </ul> -->
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddToExtension',
  data() {
    return {
      clientHeight: 700,
      status: {
        isMobile: true,
        isChrome: true,
        metamaskEnable: false,
        accounts: [],
      },
      loading: {
        connect: false,
        add: false,
      },
    }
  },
  computed: {
    ...mapGetters(['configData']),
    lang() {
      return this.$i18n.locale == 'en' ? 'en' : 'cn'
    },
    config() {
      return this.configData.metamask || null
    },
  },
  methods: {
    setAccounts(accounts) {
      this.status.accounts = accounts || []
    },
    handleErr(error) {
      console.log('error: ', error)
      let msg = error.message
      if (this.lang === 'cn' && error.code === 4001) {
        msg = '用户拒绝了该请求'
      }
      this.$message.error(msg)
    },
    connect() {
      if (!this.status.metamaskEnable) {
        this.$alert(this.$t('extension.error.noMetaMask'), this.$t('extension.error.tips'), {
          type: 'warning',
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
        })
        return
      }
      this.loading.connect = true
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(this.setAccounts)
        .catch(this.handleErr)
        .finally(() => {
          this.loading.connect = false
        })
    },
    async addToNetwork() {
      // try {
      //   currentChainId = await ethereum.request({ method: 'eth_chainId' })
      // } catch (error) {
      //   this.loading.add = false
      //   this.$message.warning(this.$t('extension.error.noChainId'))
      //   return
      // }
      const currentChainId = ethereum.chainId
      this.loading.add = true
      const { chainName, rpcUrl, chainId: id, nativeCurrency, blockExplorerUrl } = this.config
      const chainId = '0x' + id.toString(16)
      if (currentChainId === chainId) {
        this.$message.warning(this.$t('extension.error.already', [id]))
        this.loading.add = false
        return
      }
      ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName,
              chainId,
              rpcUrls: [rpcUrl],
              nativeCurrency,
              blockExplorerUrls: [blockExplorerUrl],
            },
          ],
        })
        .then((res) => console.log(res))
        .catch(this.handleErr)
        .finally(() => {
          this.loading.add = false
        })
    },
  },
  created() {
    const ua = navigator.userAgent
    this.status.isMobile = !!ua.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    this.status.isChrome = !!ua.match(/chrome/i)
  },
  mounted() {
    this.clientHeight = (document.documentElement.clientHeight || document.body.clientHeight) - 100
    this.status.metamaskEnable = Boolean(window.ethereum && window.ethereum.isMetaMask)
    if (this.status.metamaskEnable) {
      ethereum.request({ method: 'eth_accounts' }).then(this.setAccounts)
      ethereum.on('accountsChanged', this.setAccounts)
    }
    console.log(this.configData)
  },
}
</script>

<style lang="less" scoped>
.content-wrap {
  position: relative;
  .lizi {
    position: absolute;
    min-height: 100%;
    width: 100%;
    z-index: 0;
  }
  .content {
    position: relative;
    margin: 0 auto;
    padding: 100px 0;
    width: 915px;
    max-width: 100%;
    color: #ffffff;
    text-align: center;
    & > .title {
      font-size: 32px;
      font-size: 20px;
      line-height: 30px;
      font-weight: 500;
    }
    .detail {
      margin-top: 70px;
      padding-bottom: 20px;
      width: 100%;
      font-size: 15px;
      border: 1px solid #ffffff;
      border-radius: 4px;
      .title {
        line-height: 1;
        font-size: 18px;
        padding: 30px 0 12px 0;
      }
      & > p {
        line-height: 38px;
      }
      .item {
        text-align: left;
        padding-left: 30%;
        .desc {
          display: inline-block;
          width: 120px;
        }
      }
      .btn {
        margin: 32px 0 20px 0;
      }
    }
  }
  @media screen and (max-width: 750px) {
    .content {
      padding: 20px 0 80px 0;
      .detail {
        padding-bottom: 0;
        .title {
          padding: 30px 0 16px 0;
        }
        .item {
          display: flex;
          line-height: 1;
          padding: 0 18px 16px 18px;
          overflow: initial;
          line-height: 20px;
          .desc {
            // font-size: 13px;
            width: 104px;
            flex-shrink: 0;
          }
          .text {
            display: block;
            word-break: break-all;
          }
        }
      }
    }
  }
}
.btn {
  width: 253px;
  height: 58px;
  font-size: 20px;
  color: #ffffff;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid #979797;
  border-radius: 4px;
  cursor: pointer;
  // &:hover {
  //   color: #0798de;
  // }
  &.active {
    cursor: not-allowed;
  }
  &.active::after {
    animation: blink 2s ease-in-out infinite;
  }
  &::after {
    content: '';
    display: inline-block;
    margin-left: 14px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }
  &.connect::after {
    background-color: #979797;
  }
  &.add::after {
    background-color: #15a73e;
  }
  &.add {
    background: rgba(21, 167, 62, 0.2);
    border: 1px solid #15a73e;
  }
}
.mobile-err {
  padding-top: 20px;
  color: #e6a23c;
  &::before {
    content: '*';
    color: #f56c6c;
  }
}

.el-steps {
  margin-top: 16px;
  /deep/ .el-step__line {
    top: 23px;
    background: #fff;
  }
  /deep/ .el-step__icon {
    background: #000;
    width: 48px;
    height: 48px;
    border-width: 1px;
  }
  /deep/ .el-step__title.is-process {
    font-weight: normal;
  }
}

@keyframes blink {
  0% {
    opacity: 1;
    transform: scale(1.1);
  }
  50% {
    opacity: 0.2;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.polyhedron {
  position: absolute;
  top: 70px;
  opacity: 0.5;
  animation: rotating 8s infinite linear;
  &.polyhedron-big {
    width: 180px;
    height: 180px;
    left: -20px;
  }
  &.polyhedron-mid {
    width: 50px;
    height: 50px;
    top: 500px;
    left: 200px;
  }
  &.polyhedron-small {
    width: 50px;
    height: 50px;
    top: 150px;
    right: 0;
    opacity: 0.3;
  }
}
</style>
