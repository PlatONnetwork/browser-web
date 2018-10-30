// import API from '@/src/config/API-config'

interface StompClientConfigConfig {
    heartbeat?: {
        outgoing: number
        incoming: number
        [propName: string]: any
    }
    connect: Function
    disconnect: Function
    [propName: string]: any
}
interface MsgConfig {
    body: string
}

class Sub {
    subs: Array<Function> = []
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach((sub) => {
            sub()
        })
    }
}

const sub = new Sub()

class Ws {
    greeting: string
    stompClient: StompClientConfigConfig = null
    // websocketUrl: string = API.WS
    timeSettimeout: number = null

    constructor() {
        this.connect()
    }

    connect(): void {
        // if (this.stompClient) { return }
        // let socket = new window['SockJS'](this.websocketUrl)
        // this.stompClient = window['Stomp'].over(socket)
        // this.stompClient.heartbeat.outgoing = 10000
        // this.stompClient.heartbeat.incoming = 10000
        // this.stompClient.connect({}, (frame) => {
        //     console.log('Connected: ' + frame)
        //     //this.subscribe()
        //     sub.notify()
        // })
    }

    //由于服务断开导致连接失败，客户端自动连接
    errorCallBack(error: any): void {
        //连接失败时，服务器响应的回调方法
        console.log('连接失败【' + error + '】')
        //连接失败后重新连接；设置延迟避免请求过多
        clearTimeout(this.timeSettimeout)
        this.timeSettimeout = setTimeout(() => {
            this.stompClient = null
            this.connect()
        }, 5000)

    }
    //主动断开连接
    disconnect(): void {
        this.stompClient != null && this.stompClient.disconnect()
    }

}

class IndexService extends Ws {

    greet() {
        console.log(this, this.connect)
    }

    get

    subscribe(): any {
        return new Promise((resolve, reject) => {
            sub.addSub(() => {
                this.stompClient.subscribe('/app/node/init?cid=1', (msg: MsgConfig) => {
                    console.log(`subscribe`, msg, JSON.parse(msg.body))
                    resolve(JSON.parse(msg.body))
                }, { 'message': '434343434' })
                this.stompClient.subscribe('/topic/node/new?cid=1', (msg: MsgConfig) => {
                    console.log(`subscribe`, msg, JSON.parse(msg.body))
                    return Promise.resolve(JSON.parse(msg.body))
                })
            })
        })
    }
}

export default IndexService
