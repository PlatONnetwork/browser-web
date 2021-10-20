/**
 * Created by 15236 on 2017/10/25.
 */
export const commonGetter = {
  // 获取
  chainList(state) {
    return state.chainList;
  },
  //获取链id
  chainId(state) {
    return state.chainId;
  },
  //获取链http
  chainHttp(state) {
    return state.chainHttp;
  },
  chainContext(state) {
    return state.chainContext;
  },
  walletList(state) {
    return state.walletList;
  },
  country(state) {
    return state.country;
  },
  googleApi(state) {
    return state.googleApi;
  },
  i18nLocale(state) {
    return state.i18nLocale;
  },
  hideSearch(state) {
    return state.hideSearch;
  }
};
