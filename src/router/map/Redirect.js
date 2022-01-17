export default [
  {
    path: '/address/:address?',
    redirect: to => {
      const { address } = to.params
      return address ? { path: '/address-detail', query: { address } } : '/'
    }
  },
  {
    path: '/tx/:txHash?',
    redirect: to => {
      const { txHash } = to.params
      return txHash ? { path: '/trade-detail', query: { txHash } } : '/'
    }
  },
  {
    path: '/token/:address?',
    redirect: to => {
      const { address } = to.params
      return address ? { path: '/tokens-detail', query: { address } } : '/'
    }
  },
  {
    path: '*',
    redirect: {
      path: '/'
    },
    hidden: true
  }
]
