import CallApp from 'callapp-lib'

import tokenPocketImg from '@/assets/images/connector/tp.png'
import coinbaseImg from '@/assets/images/connector/coinbase.png'
import bitgetImg from '@/assets/images/connector/bitget.png'
import okImg from '@/assets/images/connector/okc.png'
import metamaskImg from '@/assets/images/connector/metamask.png'
import c98Img from '@/assets/images/connector/c98.png'

export const callMetamaskApp = () =>
    window.open(`https://metamask.app.link/dapp/${window.location.host}`, '_blank', 'noopener noreferrer')

export const callImTokenWalletApp = () =>
    new CallApp({
        scheme: {
            protocol: 'imtokenv2',
        },
        appstore: 'https://token.im/download',
        fallback: 'https://token.im/download',
    }).open({
        path: 'navigate/DappView',
        param: {
            url: window.location.href,
        },
    })

export const callBitgetApp = () =>
    window.open(
        `https://bkcode.vip?action=dapp&url=${encodeURI(window.location.origin)}`,
        '_blank',
        'noopener noreferrer'
    )

export const callTpWalletApp = () =>
    new CallApp({
        scheme: {
            protocol: 'tpdapp',
        },
        appstore: 'https://www.tokenpocket.pro/en/download/app',
        fallback: 'https://www.tokenpocket.pro/en/download/app',
    }).open({
        path: 'open',
        param: {
            params: encodeURI(JSON.stringify({ url: window.location.origin })),
        },
    })

// export const callTrustWalletApp = () =>
//   new CallApp({
//     scheme: {
//       protocol: 'trust',
//     },
//     appstore: 'https://trustwallet.com/download',
//     fallback: 'https://trustwallet.com/download',
//   }).open({
//     path: '/',
//     param: {
//       url: window.location.origin,
//     },
//   })

export const callOkxWalletApp = () =>
    new CallApp({
        scheme: {
            protocol: 'okx',
        },
        appstore: 'https://www.okx.com/cn/download',
        fallback: 'https://www.okx.com/cn/download',
    }).open({
        path: 'wallet/dapp/details',
        param: {
            dappUrl: window.location.origin,
        },
    })

export const callCoinbaseWalletApp = () =>
    window.open(`https://go.cb-w.com/dapp?cb_url=${encodeURI(window.location.origin)}`, '_blank', 'noopener noreferrer')

export const callCoin98WalletApp = () =>
    window.open(`https://coin98.com/dapp/${window.location.host}/1`, '_blank', 'noopener noreferrer')

const walletList = [
    {
        id: 1,
        name: 'Metamask',
        img: metamaskImg,
        connect: callMetamaskApp,
    },
    {
        id: 2,
        name: 'TokenPocket',
        img: tokenPocketImg,
        connect: callTpWalletApp,
    },
    {
        id: 3,
        name: 'Bitget',
        img: bitgetImg,
        connect: callBitgetApp,
    },
    {
        id: 4,
        name: 'OkexWallet',
        img: okImg,
        connect: callOkxWalletApp,
    },
    {
        id: 5,
        name: 'Coinbase',
        img: coinbaseImg,
        connect: callCoinbaseWalletApp,
    },
    {
        id: 6,
        name: 'Coin98',
        img: c98Img,
        connect: callCoin98WalletApp,
    },
    // {
    //     id: 7,
    //     name: 'ImToken',
    //     img: imTokenimg,
    //     connect: callImTokenWalletApp,
    // },
]

export default walletList
