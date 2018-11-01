//引入web3.js
// let Web3 = require('web3')
import Web3 from 'web3'
// let web3 = new Web3()
class contractService{
    constructor(){
        this.web3 = null
        this.provider='';//节点地址
    }
    initWeb3(){
        if(this.web3 == null){
            this.web3 = new Web3(new Web3.providers.HttpProvider(this.provider));
        }
    }
    //设置节点
    serProvider(url){
        this.provider = url
        console.warn('获取节点地址》》》',this.provider)
        //连接到节点地址
        // web3.setProvider(new Web3.providers.HttpProvider(this.provider))
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.provider));
        console.info('web3', this.web3);
    }
    //根据地址查询余额
    getBalance(address){
        console.log('当前地址》》》', address)
        let number = this.web3.eth.blockNumber
        // console.log('最高区块',number)
        let result = this.web3.eth.getBalance(address)
        result = result.toNumber()
        console.warn('根据地址查询余额》》》', result)
        return result
    }
}
export default new contractService