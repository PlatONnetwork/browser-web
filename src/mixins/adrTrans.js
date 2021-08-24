import { decodeBech32Address, toBech32Address, isAddress, isBech32Address } from '@/services/web3-utils';

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
        this.ethAdr = decodeBech32Address(this.address);
      } else if (isAddress(this.address)) {
        this.adrType = MAIN_ADR;
        this.ethAdr = this.address;
        this.address = toBech32Address(process.env.VUE_APP_ADR_PREV, this.address);
      } else {
        this.adrErr = true;
        return false;
      }
      return true;
    },
  }
}