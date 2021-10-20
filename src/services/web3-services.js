/**
 * 这个文件暂时没有使用， 把pagejson的web3删除了
 */
// 引入web3.js
import Web3 from 'web3'
class contractService {
  constructor () {
    this.web3 = null
    this.provider = ''; // 节点地址
  }
  initWeb3 () {
    if (this.web3 == null) {
      this.web3 = new Web3(new Web3.providers.HttpProvider(this.provider))
    }
  }
  // 设置节点
  serProvider (url) {
    this.provider = url
    console.warn('获取节点地址》》》', this.provider)
    // 连接到节点地址
    // web3.setProvider(new Web3.providers.HttpProvider(this.provider))
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.provider))
    console.info('web3', this.web3)
  }
  // 根据地址查询余额
  getBalance (address) {
    console.warn('当前地址》》》', address)
    let number = this.web3.eth.blockNumber
    // console.log('最高区块',number)
    let result = this.web3.eth.getBalance(address)
    console.warn('根据地址查询余额》》》', result.toNumber())
    let r = this.web3.fromWei(result.toNumber(), 'ether')
    // result = this.web3.fromWei(result.toNumber(), 'ether')
    console.warn('根据地址查询余额fromWei》》》', r)
    return r
  }
}
export default new contractService
