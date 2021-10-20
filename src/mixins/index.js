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
      return [2, 3, 4, 5, 6].includes(type);
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
    goTokenDetail(address, type) {
      this.$router.push({
        path: '/tokens-detail',
        query: { type, address }
      });
    },
    //进入erc721 id 详情
    go721IdDetail(address, tokenId) {
      this.$router.push({
        path: '/tokens-detail',
        query: {
          type: 'erc721Id',
          address: address,
          id: tokenId
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
