import { sha3, decodeBech32Address, toBech32Address, isAddress, isBech32Address } from '@/services/web3-utils';

const MAIN_ADR = process.env.VUE_APP_ADR_PREV.toUpperCase();
const ETH_ADR = "HEX";

export default {
  data() {
    return {
      ethAdr: '',
      adrType: ETH_ADR,
      adrErr: false,
    }
  },
  computed: {
    showAdr() {
      return this.adrType === ETH_ADR ? this.address : this.ethAdr;
    }
  },
  methods: {
    // 地址格式改变
    adrTypeChange() {
      this.adrType = this.adrType === ETH_ADR ? MAIN_ADR : ETH_ADR;
    },
    checkAdr() {
      this.address = this.$route.query.address.toLowerCase();
      if (isBech32Address(this.address)) {
        this.adrType = ETH_ADR;
        this.ethAdr = this.transEIP55(decodeBech32Address(this.address));
      } else if (isAddress(this.address)) {
        this.adrType = MAIN_ADR;
        this.ethAdr = this.transEIP55(this.address);
        this.address = toBech32Address(process.env.VUE_APP_ADR_PREV, this.address);
      } else {
        this.adrErr = true;
        return false;
      }
      return true;
    },
    // testEIP55() {
    //   const tArr = [
    //   "0x52908400098527886E0F7030069857D2E4169EE7",
    //   "0x8617E340B3D01FA5F11F306F4090FD50E238070D",
    //   "0xde709f2102306220921060314715629080e2fb77",
    //   "0x27b1fdb04752bbc536007a920d24acb045561c26",
    //   "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
    //   "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359",
    //   "0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB",
    //   "0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb"
    //   ];
    //   console.log(tArr.toString() == tArr.map(adr => this.transEIP55(adr)).toString());
    // },
    transEIP55(address) {
      // https://eips.ethereum.org/EIPS/eip-55
      // https://learnblockchain.cn/docs/eips/eip-55.html
      address = address.toLowerCase().replace('0x', '')
      const hash = sha3(address).replace('0x', '')
      let ret = '0x'
    
      for (var i = 0; i < address.length; i++) {
        if (parseInt(hash[i], 16) >= 8) {
          ret += address[i].toUpperCase()
        } else {
          ret += address[i]
        }
      }
      return ret
    }
  }
}