const routeJump = {
  methods: {
    //进入区块详情
    getBlockUrl(height) {
      return {
        path: '/block-detail',
        query: {
          height: height
        }
      };
    },
    goBlockDetail(height) {
      this.$router.push(this.getBlockUrl(height));
    },
    //进入交易哈希详情
    getTradeUrl(hash) {
      return {
        path: '/trade-detail',
        query: {
          txHash: hash
        }
      };
    },
    goTradeDetail(hash) {
      this.$router.push(this.getTradeUrl(hash));
    },
    // 判断是否是合约
    isContract(type) {
      return [2, 3, 4, 5, 6].includes(type);
    },
    //进入钱包地址详情
    getAddressUrl(adr, type = 0) {
      let path = this.isContract(type) ? '/contract-detail' : '/address-detail';
      return {
        path,
        query: {
          address: adr
        }
      };
    },
    goAddressDetail(adr, type = 0) {
      this.$router.push(this.getAddressUrl(adr, type));
    },
    //进入合约详情
    getContractUrl(adr) {
      return {
        path: '/contract-detail',
        query: {
          address: adr
        }
      };
    },
    goContractDetail(adr) {
      this.$router.push(this.getContractUrl(adr));
    },
    //进入token详情
    getTokenUrl(address, type) {
      return {
        path: '/tokens-detail',
        query: { type, address }
      };
    },
    goTokenDetail(address, type) {
      this.$router.push(this.getTokenUrl(address, type));
    },
    //进入erc721 id 详情
    get721IdUrl(address, tokenId) {
      return {
        path: '/tokens-detail',
        query: {
          type: 'erc721Id',
          address: address,
          id: tokenId
        }
      };
    },
    go721IdDetail(address, tokenId) {
      this.$router.push(this.get721IdUrl(address, tokenId));
    },
    //进入erc1155 id 详情
    get1155IdUrl(address, tokenId) {
      return {
        path: '/tokens-detail',
        query: {
          type: 'erc1155Id',
          address: address,
          id: tokenId
        }
      }
    },
    go1155IdDetail(address, tokenId) {
      this.$router.push(this.get1155IdUrl(address, tokenId))
    },
    //进入节点详情
    getNodeUrl(nodeId) {
      return {
        path: '/node-detail',
        query: {
          address: nodeId
        }
      };
    },
    goNodeDetail(nodeId) {
      this.$router.push(this.getNodeUrl(nodeId));
    }
  }
};

export default routeJump;
