<template>
  <div class="content-wrap">
    <div class="wrapper">
      <div class="head">
        <div class="head-left">
          <p class="left-title">{{ $t('add.connectTo') }} PlatON</p>
          <p class="left-content">{{ $t('add.slogan') }}</p>
        </div>
        <div class="head-right">
          <div
            @click="
              () => {
                return (curNetwork = 'mainnet')
              }
            "
            class="head-net-box"
          >
            Mainnet
          </div>
          <div
            @click="
              () => {
                return (curNetwork = 'devnet')
              }
            "
            class="head-net-box"
          >
            Devnet
          </div>
          <div
            class="move-box"
            :class="curNetwork === 'mainnet' ? 'normal-left' : windowWidth < 750 ? 'mobile-left' : 'spec-left'"
          >
            {{ curNetwork === 'mainnet' ? 'Mainnet' : 'Devnet' }}
          </div>
        </div>
      </div>
      <div class="list-box">
        <div class="list-head">
          <div class="list-head-left">
            <img :src="supportList[curNetwork].icon" alt="" />
            <p class="title">{{ supportList[curNetwork].netLabel }}</p>
          </div>
          <div v-if="windowWidth >= 750" class="btn white" @click="setupNetwork(supportList[curNetwork])">
            {{ $t('add.addToWallet') }}
          </div>
        </div>
        <div class="chain-info">
          <div class="cell">
            <p>{{ $t('add.chainId') }}</p>
            <p class="pointer" @click="copyFn(supportList[curNetwork].chainId)">
              {{ supportList[curNetwork].chainId }}
            </p>
          </div>
          <div class="cell">
            <p>{{ $t('add.currency') }}</p>
            <p>{{ supportList[curNetwork].currencyLabel }}</p>
          </div>
          <div class="cell">
            <p>{{ $t('add.rpc') }}</p>
            <p class="pointer" @click="copyFn(supportList[curNetwork].rpc)">{{ supportList[curNetwork].rpc }}</p>
          </div>
          <div class="cell">
            <p>{{ $t('add.explorer') }}</p>
            <a :href="supportList[curNetwork].explorer" target="_blank" rel="nofollow noopener noreferrer">
              {{ supportList[curNetwork].explorer }}
            </a>
          </div>
          <div v-if="supportList[curNetwork].faucet" class="cell">
            <p>{{ $t('add.faucet') }}</p>
            <a :href="supportList[curNetwork].faucet" target="_blank" rel="nofollow noopener noreferrer">
              {{ supportList[curNetwork].faucet }}
            </a>
          </div>
        </div>
        <div
          v-if="windowWidth < 750"
          class="btn white"
          @click="
            if (isInApp) {
              setupNetwork(supportList[curNetwork])
            } else {
              dialogVisible = true
            }
          "
        >
          {{ $t('add.addToWallet') }}
        </div>
        <div class="network-box" v-for="token in supportList[curNetwork].tokens">
          <el-col :span="windowWidth < 750 ? 24 : 6">
            <div class="logo">
              <img :src="token.icon" alt="" />
              <p>{{ token.label }}</p>
            </div>
          </el-col>
          <el-col :span="windowWidth < 750 ? 24 : 10">
            <div class="network-cell">
              <p>{{ $t('add.contractAddress') }}</p>
              <p class="pointer" @click="copyFn(token.contractAddress)">{{ token.contractAddress }}</p>
            </div>
          </el-col>
          <el-col :span="windowWidth < 750 ? 24 : 2">
            <div class="network-cell">
              <p>{{ $t('add.decimal') }}</p>
              <p>{{ token.decimal }}</p>
            </div>
          </el-col>
          <el-col :span="windowWidth < 750 ? 24 : 6">
            <div class="flex-end">
              <div
                class="btn black"
                @click="
                  if (isInMobileBrowser) {
                    dialogVisible = true
                  } else {
                    onWatchAsset(supportList[curNetwork], token)
                  }
                "
              >
                {{ $t('add.addToWallet') }}
              </div>
            </div>
          </el-col>
        </div>
      </div>
    </div>
    <el-dialog
      custom-class="connect-dialog"
      :title="$t('add.connectWallet')"
      :visible.sync="dialogVisible"
      modal="true"
      :width="windowWidth < 750 ? '80%' : '500px'"
    >
      <div class="connect-dialog-box">
        <!-- <p class="connect-dialog-title">Connect Wallet with</p> -->
        <div v-for="item in walletList" :key="item.id" class="connect-dialog-content" @click="item.connect">
          <div class="connect-dialog-inner-box">
            <img :src="item.img" alt="" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import usdc from '@/assets/images/usdc-logo.png'
import usdt from '@/assets/images/usdt-logo.png'
import dus from '@/assets/images/dus-logo.png'
import platon from '@/assets/images/platon-logo.png'

import { copyFn, getAddress } from '@/services/utils'
import walletList from '@/config/connector'
export default {
  name: 'AddToExtension',
  data() {
    return {
      walletList,
      dialogVisible: false,
      curNetwork: 'mainnet',
      blockDropdownShow: false,
      supportList: {
        mainnet: {
          id: 1,
          network: 'PlatON Mainnet',
          netLabel: 'PlatON Mainnet',
          icon: platon,
          chainId: 210425,
          currency: 'lat',
          currencyLabel: 'LAT',
          rpc: 'https://openapi2.platon.network/rpc',
          explorer: 'https://scan.platon.network',
          decimal: 18,
          tokens: [
            {
              id: 11,
              icon: dus,
              label: 'DUS（Mainnet)',
              symbol: 'DUS',
              contractAddress: '0x8c171d2e96619fa18b8f49fdbf3eb5589b97a97d',
              decimal: 6,
            },
            {
              id: 12,
              icon: usdt,
              label: 'USDT（Mainnet)',
              symbol: 'USDT',
              contractAddress: '0xeac734fb7581D8eB2CE4949B0896FC4E76769509',
              decimal: 6,
            },
            {
              id: 13,
              icon: usdc,
              label: 'USDC（Mainnet)',
              symbol: 'USDC',
              contractAddress: '0xdA396A3C7FC762643f658B47228CD51De6cE936d',
              decimal: 6,
            },
          ],
        },
        devnet: {
          id: 2,
          network: 'PlatON Dev Testnet2',
          netLabel: 'PlatON Devnet',
          icon: platon,
          chainId: 2206132,
          currency: 'lat',
          currencyLabel: 'LAT',
          rpc: 'https://devnet2openapi.platon.network/rpc',
          explorer: 'https://devnet2scan.platon.network',
          faucet: 'https://devnet2faucet.platon.network/faucet',
          decimal: 18,
          tokens: [
            {
              id: 21,
              icon: dus,
              label: 'DUS（Devnet)',
              symbol: 'DUS',
              contractAddress: '0x085d18AB4FFD350d32025bc6a641E27C2Ea806a9',
              decimal: 6,
            },
            {
              id: 22,
              icon: usdt,
              label: 'USDT（Devnet) ',
              symbol: 'USDT',
              contractAddress: '0x1e6E4b48F6F57Aa7cefd8239e8515694D110386B',
              decimal: 6,
            },
            {
              id: 23,
              icon: usdc,
              label: 'USDC（Devnet)',
              symbol: 'USDC',
              contractAddress: '0x229b68722bF16CCc7186Dc8760b3D8C5980fe609',
              decimal: 6,
            },
          ],
        },
      },
    }
  },
  methods: {
    copyFn,
    getAddress,
    blockDropdownChangHandle(boolean) {
      this.blockDropdownShow = boolean
    },
    showSuccessMsg() {
      return this.$message.success(this.$t('add.addSuccess'))
    },

    showFailedMsg(msg) {
      return this.$message.error(msg || this.$t('add.addFailed'))
    },
    async connect() {
      if (window?.ethereum) await window?.ethereum.request({ method: 'eth_requestAccounts' })
    },
    async setupNetwork(chainConfig) {
      const provider = window?.ethereum
      if (!provider) {
        return this.$message.error(this.$t('add.missingProvider'))
      }
      const chainId = Number(chainConfig.chainId)
      const curId = await provider.request({ method: 'eth_chainId' })
      if (`0x${Number(chainId).toString(16)}` === curId)
        return this.$message.warning(this.$t('extension.error.alreadyAddNetwork'))
      await this.connect()
      const switchChain = () =>
        provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: chainConfig.network,
              nativeCurrency: {
                name: chainConfig.currency,
                symbol: chainConfig.currency,
                decimals: chainConfig.decimal,
              },
              rpcUrls: [chainConfig.rpc],
              blockExplorerUrls: [chainConfig.explorer],
            },
          ],
        })

      return provider
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        })
        .then((r) => {
          // sb coin98 插件切换失败时是 resolve 而非 reject, coinbase 的添加网络也有问题，已经添加还会继续报未添加的错， 拒绝了也不会 reject
          if ([-32603, 4902].includes(r?.code)) {
            return switchChain()
          }
          return r
        })
        .catch((e) => {
          // -32603 为手机端 metamask app 报错的 code
          if ([-32603, 4902].includes(e?.code)) {
            return switchChain()
          }
          return Promise.reject(e)
        })
    },
    async watchAsset(token) {
      const provider = window.ethereum
      if (!provider) {
        throw new Error(this.$t('add.missingProvider'))
      }
      const tokenAdded = await provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: token.contractAddress,
            symbol: token.symbol,
            decimals: token.decimal,
            image: token.icon,
          },
        },
      })

      return tokenAdded
    },
    getResolvedCb(result, provider) {
      if (this.windowWidth >= 750) {
        if (this.isTrustWallet) {
          return this.showSuccessMsg
        }

        if (this.isTokenPocket || this.isCoinbaseWallet) {
          return () => {
            if (result === true) {
              this.showSuccessMsg()
            } else {
              this.showFailedMsg(this.$t('extension.error.reject'))
            }
          }
        }

        // 默认按照 metamask 返回的结果逻辑
        return () => {
          if (result === true) {
            this.showSuccessMsg()
          } else {
            this.showFailedMsg(this.$t('extension.error.failed'))
          }
        }
      } else {
        // app 浏览器端
        if (this.isBitgetWallet) {
          // bitget app 返回的东西无法分清成功失败，全依赖于内部的提示
          return () => {}
        }

        if (this.isOkxWallet) {
          return () => {
            if (this.isIOS) {
              this.showSuccessMsg()
            } else {
              if (result === true) {
                this.showSuccessMsg()
              } else {
                this.showFailedMsg(this.$t('extension.error.failed'))
              }
            }
          }
        }

        if (this.isCoinbaseWallet) {
          return () => {
            if (result === true) {
              this.showSuccessMsg()
            } else {
              this.showFailedMsg(this.$t('extension.error.failed'))
            }
          }
        }

        // 默认按照 metamask 返回的结果逻辑
        return () => {
          if (result === true) {
            this.showSuccessMsg()
          } else {
            this.showFailedMsg(this.$t('extension.error.failed'))
          }
        }
      }
    },
    getRejectedCb(error, provider) {
      const msg = typeof error === 'string' ? error : error?.message
      const errMsg = msg || this.$t('extension.error.failed')

      if (provider?.isUniPassProvider || this.isParticleWallet || provider?.isWalletConnect) {
        return () => {
          this.showFailedMsg(this.$t('extension.error.noSupport'))
        }
      }

      if (this.windowWidth >= 750) {
        if (this.isTrustWallet) {
          return () => {
            if (error?.code === -32602) {
              this.showFailedMsg(this.$t('extension.error.already'))
            } else {
              this.showFailedMsg(errMsg)
            }
          }
        }
      }

      return () => {
        this.showFailedMsg(errMsg)
      }
    },
    async onWatchAsset(chainConfig, tokenInfo) {
      try {
        if (!window.ethereum) throw new Error(this.$t('add.missingProvider'))
        await this.connect()
        const curId = await window.ethereum.request({ method: 'eth_chainId' })
        if (`0x${Number(chainConfig.chainId).toString(16)}` !== curId) await this.setupNetwork(chainConfig)
        const result = await this.watchAsset(tokenInfo)
        const cb = this.getResolvedCb(result)
        cb()
      } catch (error) {
        const cb = this.getRejectedCb(error)
        cb()
      }
    },
  },
  computed: {
    isInApp() {
      return this.isInMobile && window?.ethereum
    },

    isInMobileBrowser() {
      return this.isInMobile && !window?.ethereum
    },

    isInMobile() {
      return this.windowWidth < 750
    },

    isBitgetWallet() {
      return window?.ethereum?.isBitKeep || window?.ethereum?.isBitEthereum
    },

    isTrustWallet() {
      return window?.ethereum?.isTrust || window?.ethereum?.isTrustWallet
    },

    isTokenPocket() {
      return window?.ethereum?.isTokenPocket
    },
    isOkxWallet() {
      return window.okxwallet || window.okxwallet
    },
    isCoinbaseWallet() {
      return window?.ethereum?.isCoinbaseWallet
    },
    isParticleWallet() {
      return window?.ethereum?.isParticle || window?.ethereum?.isParticleNetwork
    },
    isIOS() {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent)
    },
  },
  mounted() {},
}
</script>
<style lang="less">
.connect-dialog {
  background-color: #1a1a1a;
  color: #fff;
  margin: 0 auto;
  margin-bottom: 40px;
}

.el-dialog__body {
  border-top: 1px solid #242424;
}

.el-popper {
  background-color: #fff;
}

.el-dropdown-menu {
  background: #fff;
  padding: 0 0 0 0;

  .el-dropdown-menu__item {
    color: #222;
    background-color: #fff;
    letter-spacing: 0;
    border-radius: 4px;
  }

  .el-dropdown-menu__item:hover {
    background: #eaeaea;
    color: #0798de;
  }

  .el-dropdown-menu__item:focus {
    background-color: #0f83cd;
  }

  :first-child {
    margin: 9px 0 0 0;
  }
}

.content-wrap {
  position: relative;
  margin-bottom: 40px;
  .connect-dialog-box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .connect-dialog-title {
      font-size: 14px;
      line-height: 16px;
      color: #666;
    }

    .connect-dialog-content {
      width: 250px;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #000;
      border-radius: 30px;
      text-align: center;
      cursor: pointer;
      align-self: center;
      .connect-dialog-inner-box {
        color: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 120px;
        gap: 14px;
        justify-self: center;
        img {
          width: 32px;
          height: 32px;
        }
        span {
          font-size: 14px;
          line-height: 22px;
          font-family: Gilroy-Medium;
        }
      }
    }
  }

  .lizi {
    position: absolute;
    min-height: 100%;
    width: 100%;
    z-index: 0;
  }

  .wrapper {
    width: 100%;
    height: 100%;
    padding: 0 40px;
    margin-top: 40px;
    margin-bottom: 60px;
    position: relative;
    z-index: 10;

    @media screen and (max-width: 750px) {
      padding: 0;
      margin-top: 10px;
    }

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;

      @media screen and (max-width: 750px) {
        width: 100%;
        flex-direction: column;
      }

      .head-left {
        display: flex;
        flex-direction: column;
        gap: 12px;
        color: #fff;

        @media screen and (max-width: 750px) {
          margin-bottom: 16px;
        }

        .left-title {
          font-family: Gilroy-Bold;
          font-size: 24px;
          line-height: 24px;
        }

        .left-content {
          font-size: 14px;
          line-height: 14px;
          color: #999;
        }
      }

      .head-right {
        color: #fff;
        display: flex;
        cursor: pointer;
        position: relative;
        border: 1px solid #fff;
        margin: 2px;
        width: 210px;
        height: 40px;

        @media screen and (max-width: 750px) {
          margin-top: 30px;
          width: 100%;
        }

        .head-net-box {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          line-height: 16px;
        }

        .move-box {
          transition: all 200ms;
          width: 102px;
          background-color: #fff;
          position: absolute;
          top: 2px;
          height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          line-height: 16px;
          cursor: pointer;
          color: #000;

          @media screen and (max-width: 750px) {
            width: 50%;
          }
        }

        .normal-left {
          left: 2px;
        }

        .spec-left {
          left: 104px;
        }

        .mobile-left {
          left: calc(50% - 2px);
        }
      }
    }

    .list-box {
      padding: 40px;
      display: flex;
      flex-direction: column;
      background-color: #111;
      margin-top: 30px;

      @media screen and (max-width: 750px) {
        padding: 24px;
      }

      .list-head {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media screen and (max-width: 750px) {
          flex-direction: column;
          align-items: flex-start;
        }

        .list-head-left {
          display: flex;
          justify-content: center;
          gap: 12px;
          align-items: center;

          @media screen and (max-width: 750px) {
            margin-bottom: 20px;
          }

          p.title {
            color: #fff;
            font-family: Gilroy-Bold;
            font-size: 20px;
            line-height: 24px;
          }
        }
      }

      .chain-info {
        margin-top: 26px;
        width: 100%;
        height: 80px;
        border: 1px solid #333333;
        display: flex;
        padding: 20px 40px;

        @media screen and (max-width: 750px) {
          width: 100%;
          padding: 0;
          margin-bottom: 20px;
          height: auto;
          border: none;
          flex-wrap: wrap;
        }

        .cell {
          flex: auto;
          word-break: break-all;

          @media screen and (max-width: 750px) {
            border: 1px solid #333333;
            padding: 20px;
          }

          & p:nth-child(1) {
            color: #999;
            font-size: 12px;
            line-height: 14px;
            margin-bottom: 8px;
          }

          & p:nth-child(2) {
            font-family: Gilroy-Medium;
            color: #fff;
            font-size: 14px;
            line-height: 16px;
          }
        }

        .box {
          flex: auto;
        }
      }

      .network-box {
        background-color: #222;
        padding: 34px;
        margin-top: 20px;
        color: #fff;

        @media screen and (max-width: 750px) {
          display: flex;
          flex-direction: column;
          padding: 20px;
          gap: 20px;
        }

        .logo {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 14px;
          font-family: Gilroy-Bold;
          font-size: 20px;
          line-height: 24px;
        }

        .network-cell {
          display: flex;
          gap: 9px;
          flex-direction: column;

          & p:nth-child(1) {
            color: #999;
            font-size: 12px;
            line-height: 14px;
          }

          & p:nth-child(2) {
            font-size: 14px;
            line-height: 16px;
            white-space: wrap;
            word-break: break-all;
          }
        }

        .flex-end {
          display: flex;
          justify-content: flex-end;
        }
      }
    }

    .btn {
      width: 140px;
      height: 40px;
      font-family: Gilroy-Medium;
      font-size: 14px;
      line-height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      @media screen and (max-width: 750px) {
        width: 100%;
      }

      &:hover {
        opacity: 0.8;
      }

      &.white {
        background-color: #fff;
        color: #000;
      }

      &.black {
        background-color: #222;
        color: #fff;
        border: 1px solid #ffffff;
      }
    }
  }
}

a {
  color: #fff;
}

.pointer {
  cursor: pointer;
}
</style>
