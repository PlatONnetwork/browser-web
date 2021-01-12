const routeJump = {
  methods: {
    //进入区块详情
    goBlockDetail(height) {
      console.warn('进入区块', height);
      this.$router.push({
        path: '/block-detail',
        query: {
          height: height
        }
      });
    },
    //进入交易哈希详情
    goTradeDetail(hash) {
      this.$router.push({
        path: '/trade-detail',
        query: {
          txHash: hash
          // currentPage: this.currentPage,
          // pageSize: this.pageSize
        }
      });
    },
    // 判断是否是合约
    isContract(type) {
      return [2, 3, 4, 5].includes(type);
    },
    //进入钱包地址详情
    goAddressDetail(adr, type = 0) {
      let path = this.isContract(type) ? '/contract-detail' : '/address-detail';
      this.$router.push({
        path,
        query: {
          address: adr
          // description: "trade",
          // currentPage: this.currentPage,
          // pageSize: this.pageSize
        }
      });
    },
    //进入合约详情
    goContractDetail(adr) {
      this.$router.push({
        path: '/contract-detail',
        query: {
          address: adr
        }
      });
    },
    //进入token详情
    goTokenDetail(address, type = 'erc20') {
      const pathMap = {
        erc20: '/arc20-detail',
        erc721: '/arc721-detail',
        erc721id: '/arc721id-detail'
      }
      this.$router.push({
        path: pathMap[type],
        query: {
          address: address
        }
      });
    },
    //进入节点详情
    goNodeDetail(nodeId) {
      this.$router.push({
        path: '/node-detail',
        query: {
          address: nodeId
        }
      });
    }
  }
};

export default routeJump;
