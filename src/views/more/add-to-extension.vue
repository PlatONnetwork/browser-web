<template>
  <div class="content-wrap">
    <!-- <vue-particles color="#2E2E2E" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle"
      :particleSize="4" linesColor="#2E2E2E" :linesWidth="1" :lineLinked="true" :lineOpacity="0.7"
      :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="false"
      clickMode="repulse" class="lizi"></vue-particles> -->
    <div class="wrapper">
      <div class="head">
        <div class="head-left">
          <p class="left-title">{{ $t('add.connectTo') }} PlatON</p>
          <p class="left-content">{{ $t('add.slogan') }}</p>
        </div>
        <div class="btn white" @click="connect">
          {{ $t('add.connectWallet') }}
        </div>
      </div>
      <div class="list-box" v-for="item in supportList">
        <div class="list-head">
          <div class="list-head-left">
            <img :src="item.icon" alt="">
            <p class="title">PlatON Mainnet</p>
          </div>
          <div v-if="windowWidth >= 750" class="btn white" @click="addNetwork(item)">
            {{ $t('add.addToWallet') }}
          </div>
        </div>
        <div class="chain-info">
          <div class="cell">
            <p>{{ $t('add.chainId') }}</p>
            <p class="pointer" @click="copyFn(item.chainId)">{{ item.chainId }}</p>
          </div>
          <div class="cell">
            <p>{{ $t('add.currency') }}</p>
            <p>{{ item.currencyLabel }}</p>
          </div>
          <div class="cell">
            <p>{{ $t('add.rpc') }}</p>
            <p class="pointer" @click="copyFn(item.rpc)">{{ item.rpc }}</p>
          </div>
          <div class="cell">
            <p>{{ $t('add.explorer') }}</p>
            <a :href="item.explorer" target="_blank" rel="nofollow noopener noreferrer">
              {{ item.explorer }}
            </a>
          </div>
          <div v-if="item.faucet" class="cell">
            <p>{{ $t('add.faucet') }}</p>
            <a :href="item.faucet" target="_blank" rel="nofollow noopener noreferrer">
              {{ item.faucet }}
            </a>
          </div>
        </div>
        <div v-if="windowWidth < 750" class="btn white" @click="addNetwork(item)">
          {{ $t('add.addToWallet') }}
        </div>
        <div class="network-box" v-for="network in item.tokens">
          <el-col :span="windowWidth < 750 ? 24 : 6">
            <div class="logo">
              <img :src="network.icon" alt="">
              <p> {{ network.label }} </p>
            </div>
          </el-col>
          <el-col :span="windowWidth < 750 ? 24 : 10">
            <div class="network-cell">
              <p>{{ $t('add.contractAddress') }}</p>
              <p class="pointer" @click="copyFn(network.contractAddress)">{{ network.contractAddress
              }}</p>
            </div>
          </el-col>
          <el-col :span="windowWidth < 750 ? 24 : 2">
            <div class="network-cell">
              <p>{{ $t('add.decimal') }}</p>
              <p>{{ network.decimal }} </p>
            </div>
          </el-col>
          <el-col :span="windowWidth < 750 ? 24 : 6">
            <div class="flex-end">
              <div class="btn black" @click="addToken(network)">
                {{ $t('add.addToWallet') }}
              </div>
            </div>
          </el-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usdc from '@/assets/images/usdc-logo.png'
import usdt from '@/assets/images/usdt-logo.png'
import dus from '@/assets/images/dus-logo.png'
import platon from '@/assets/images/platon-logo.png'
import { copyFn } from '@/services/utils'
export default {
  name: 'AddToExtension',
  data() {
    return {
      isCopy: false,
      copyText: '',
      supportList: [
        {
          id: 1,
          network: 'PlatON Mainnet',
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
        {
          id: 2,
          network: 'PlatON Dev Testnet2',
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
      ]
    }
  },
  methods: {
    copyFn,
    connect() { },
    addNetwork(network) {
      console.log('token', network)
    },
    addToken(token) {
      console.log('token', token)
    }
  },
  mounted() { },
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

  .wrapper {
    width: 100%;
    height: 100%;
    padding: 0 40px;
    margin-top: 40px;
    margin-bottom: 60px;
    position: relative;
    z-index: 10;

    @media screen and (max-width:750px) {
      padding: 0;
      margin-top: 10px;
    }

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;

      @media screen and (max-width:750px) {
        width: 100%;
        flex-direction: column;
      }

      .head-left {
        display: flex;
        flex-direction: column;
        gap: 12px;
        color: #fff;

        @media screen and (max-width:750px) {
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
    }

    .list-box {
      padding: 40px;
      display: flex;
      flex-direction: column;
      background-color: #111;
      margin-top: 30px;

      @media screen and (max-width:750px) {
        padding: 24px;
      }

      .list-head {
        display: flex;
        justify-content: space-between;
        align-items: center;


        @media screen and (max-width:750px) {
          flex-direction: column;
          align-items: flex-start;
        }

        .list-head-left {
          display: flex;
          justify-content: center;
          gap: 12px;
          align-items: center;

          @media screen and (max-width:750px) {
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

        @media screen and (max-width:750px) {
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
          @media screen and (max-width:750px) {
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

        @media screen and (max-width:750px) {
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

      @media screen and (max-width:750px) {
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
        border: 1px solid #FFFFFF
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