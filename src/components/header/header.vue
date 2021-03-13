<template>
  <div class="header-wrap">
    <div class="logo cursor" @click="goIndex">
      <template v-if="configData.siteName === 'PlatScan'">
        <img class="icon1" src="@/assets/images/herder-logo-a.svg" />
        <img class="icon2" src="@/assets/images/herder-logo-b.svg" />
        <p class="text">The PlatON Blockchain Explorer</p>
      </template>
      <img v-else class="iconAlaya" :src="logoURL" alt="SCAN" title="SCAN" />
    </div>
    <div class="menu">
      <el-menu
        :default-active="$route.path"
        :router="true"
        class="el-menu-demo"
        mode="horizontal"
        background-color="transparent"
        text-color="#999"
        active-text-color="#FFF"
      >
        <el-menu-item index="/" :class="{ active: $route.path == '/' }">
          <router-link to="/">{{ $t('menu.home') }}</router-link>
        </el-menu-item>
        <el-menu-item
          index="/node"
          :class="{
            active: $route.path.indexOf('node') > -1,
          }"
        >
          <router-link to="/node">{{ $t('menu.validator') }}</router-link>
        </el-menu-item>

        <el-menu-item class="more-item">
          <!-- index="/governable-parameter" -->
          <el-dropdown
            placement="bottom-start"
            class="more-dropdown"
            @command="dropdownCommand"
            @visible-change="blockDropdownChangHandle"
          >
            <span
              class="el-dropdown-link more-title"
              :class="{
                active:
                  $route.path.indexOf('block') > -1 ||
                  $route.path.indexOf('trade') > -1 ||
                  $route.path.indexOf('address') > -1,
              }"
              >{{ $t('menu.blockChain') }}
              <i
                :class="{
                  arrowDown: blockDropdownShow == false,
                  arrowUp: blockDropdownShow == true,
                }"
                class="arrow el-icon-arrow-down arrowUp"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/block/index">{{
                $t('menu.block')
              }}</el-dropdown-item>
              <el-dropdown-item command="/block/trade">{{
                $t('menu.transaction')
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <el-menu-item class="more-item">
          <!-- index="/governable-parameter" -->
          <el-dropdown
            placement="bottom-start"
            class="more-dropdown"
            @command="dropdownCommand"
            @visible-change="tokensDropdownChangHandle"
          >
            <span
              class="el-dropdown-link more-title"
              :class="{
                active: $route.path.indexOf('tokens') > -1,
              }"
              >{{ $t('menu.tokens') }}
              <i
                :class="{
                  arrowDown: tokensDropdownShow == false,
                  arrowUp: tokensDropdownShow == true,
                }"
                class="arrow el-icon-arrow-down arrowUp"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/tokens/tokenList">{{
                $t('menu.tokenList')
              }}</el-dropdown-item>
              <el-dropdown-item command="/tokens/prc20">{{
                $t('menu.erc20Transfer')
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <!-- <el-menu-item
          index="/tokens"
          :class="{ active: $route.path.indexOf('tokens') > -1 }"
        >
          <router-link to="/tokens">{{ $t('menu.tokens') }}</router-link>
        </el-menu-item> -->
        <el-menu-item class="more-item">
          <!-- index="/governable-parameter" -->
          <el-dropdown
            placement="bottom-start"
            class="more-dropdown"
            @command="dropdownCommand"
            @visible-change="moreDropdownChangHandle"
          >
            <span
              class="el-dropdown-link more-title"
              :class="{
                active:
                  $route.path.indexOf('governable-parameter') > -1 ||
                  $route.path.indexOf('proposal') > -1,
              }"
              >{{ $t('menu.more') }}
              <i
                :class="{
                  arrowDown: moreDropdownShow == false,
                  arrowUp: moreDropdownShow == true,
                }"
                class="arrow el-icon-arrow-down arrowUp"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/proposal">{{
                $t('menu.proposal')
              }}</el-dropdown-item>
              <el-dropdown-item command="/governable-parameter">{{
                $t('more.governableParameter')
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <div style="flex: 1"></div>
    <div
      class="search search-header"
      :class="{
        'search-active': isFocus,
        'search-hide': !hideSearch || $route.path != '/',
      }"
    >
      <el-input
        :placeholder="$t('search.placeHolder')"
        @focus="isFocus = true"
        @blur="isFocus = false"
        v-model="searchKey"
        @keyup.enter.native="searchFn"
        size="mini"
      ></el-input>
      <el-button
        type="primary"
        class="btn-header el-searchs"
        :class="{ 'search-btn-active': isFocus }"
        @click="searchFn"
        :disabled="disabledBtn"
        >{{ $t('search.searchBtn') }}</el-button
      >
    </div>
    <div class="right-most">
      <el-dropdown placement="bottom-start" @visible-change="netVisibleChange">
        <span class="el-dropdown-link">
          {{ configData.headerChainName }}
          <i
            :class="{
              arrowDown: netDropdownShow == false,
              arrowUp: netDropdownShow == true,
            }"
            class="arrow el-icon-arrow-down arrowUp"
          ></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            {{ configData.headerChainName }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown
        @command="handleCommandLangage"
        placement="bottom-start"
        @visible-change="LangVisibleChange"
      >
        <span class="el-dropdown-link">
          {{ languageObj[language] == '简体中文' ? '简体中文' : 'English' }}
          <i
            :class="{
              arrowDown: langDropdownShow == false,
              arrowUp: langDropdownShow == true,
            }"
            class="arrow el-icon-arrow-down arrowUp"
          ></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in options"
            :key="index"
            :command="item.value"
            >{{ item.label }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import apiService from '@/services/API-services';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import store from '@/vuex/store';
export default {
  name: '',
  data() {
    return {
      netDropdownShow: false,
      langDropdownShow: false,
      blockDropdownShow: false,
      moreDropdownShow: false,
      tokensDropdownShow: false,
      iconClass1: 'el-icon-arrow-down',
      iconClass2: 'el-icon-arrow-down',
      disabledBtn: false,
      dropDisabled: false,
      searchKey: '', //搜索
      language: 'zh-cn',
      chainList: [
        {
          en: 'Alaya',
          zh: 'Alaya',
        },
      ],
      options: [
        {
          value: 'zh-cn',
          label: '简体中文',
        },
        {
          value: 'en',
          label: 'English',
        },
      ],
      languageObj: {
        'zh-cn': '简体中文',
        en: 'English',
      },
      isFocus: false,
    };
  },
  computed: {
    ...mapGetters(['chainId', 'chainHttp', 'hideSearch', 'configData']),
    lang() {
      return this.$i18n.locale.indexOf('zh') !== -1 ? 'zh' : 'en';
    },
    logoURL() {
      return this.configData.logo ? process.env.API_ROOT + this.configData.logo : '#';
    }
  },
  watch: {},
  components: {},
  inject: ['reload'],
  methods: {
    ...mapActions(['changeChainId', 'updateConfigData']),
    getConfig() {
      let flag = true;
      apiService.more.globalConfig().then(res => {
        flag = false;
        let sortByOrder = (a,b) => (a.order - b.order);
        res.links.sort(sortByOrder);
        res.social.sort(sortByOrder);
        !res.headerChainName && (res.headerChainName = res.chainName);
        this.updateConfigData(res);
      }).catch(err => {
        if (flag) {
          console.error('err: ', err);
          setTimeout(this.getConfig, 3000);
        }
    })
    },
    netVisibleChange(boolean) {
      this.netDropdownShow = boolean;
    },
    blockDropdownChangHandle(boolean) {
      this.blockDropdownShow = boolean;
    },
    tokensDropdownChangHandle(boolean) {
      this.tokensDropdownShow = boolean;
    },
    moreDropdownChangHandle(boolean) {
      this.moreDropdownShow = boolean;
    },
    goIndex() {
      this.$router.push('/');
    },
    visibleChange1(val) {
      if (val) {
        this.iconClass1 = 'el-icon-arrow-up';
      } else {
        this.iconClass1 = 'el-icon-arrow-down';
      }
    },
    LangVisibleChange(boolean) {
      this.langDropdownShow = boolean;
    },
    getNetObj(id) {
      console.warn('首次id》》》', id);
      let arr = this.chainList.filter((item, index) => {
        return item.cid == id;
      });
      // let arr = sessionStorage.getItem('chainList').filter((item,index)=>{
      //     return item.cid == id
      // })
      // debugger
      if (!arr.length) {
        return '';
      }
      let arr1 = arr[0];
      console.warn('首次net》》》', arr1['en']);
      return arr1['en'];
    },
    handleCommand(command) {
      console.log('网络切换》》》', command);
      store.commit('CHANGE_ID', command);
      let arr = this.chainList.filter((item, index) => {
        return item.cid == command;
      });
      store.commit('CHANGE_HTTP', arr[0].http);
      store.commit('CHANGE_CONTEXT', arr[0].context);
      //切换网络之后，将当前网络存在sessionStorage
      sessionStorage.setItem('commandId', command);
      sessionStorage.setItem('commandHttp', arr[0].http);
      sessionStorage.setItem('commandContext', arr[0].context);
      localStorage.setItem('commandContext', arr[0].context);
      localStorage.setItem('cid', command);
      this.$router.push({
        path: '/',
      });
    },
    handleCommandLangage(command) {
      console.warn('command>>>>', command);
      this.$i18n.locale = command;
      this.language = command;
      window.i18nLocale = command;
      localStorage.setItem('i18nLocale', command);

      // 处理交易失败提示语的语言切换，需要重新请求接口
      const path = this.$route.path;
      if (
        path == '/block/trade' ||
        path == '/address-detail' ||
        path == '/block-detail' ||
        path == '/trade-detail'
      ) {
        this.reload();
      }
      // this.$i18n.locale = localStorage.getItem('i18nLocale')
    },
    //查询
    searchFn() {
      this.disabledBtn = true;
      let param = {
        parameter: this.searchKey.trim(),
      };
      console.warn('搜索内容》》》', param);
      apiService.search
        .query(param)
        .then((res) => {
          let { errMsg, code, data } = res;

          this.searchKey = '';
          if (code == 0) {
            //根据type不同进入不同的详情页
            if (!data.type) {
              this.$message.warning(this.$t('indexInfo.searchno'));
            } else {
              this.switchFn(data.type, data.struct);
              // this.$emit('searchFn',data);
            }
          } else {
            this.$message.warning(this.$t('indexInfo.searchno'));
            // this.$message.error(errMsg) 替换为search无结果
          }
        })
        .catch((error) => {
          this.searchKey = '';
          this.$message.error(error);
        });
      setTimeout(() => {
        this.disabledBtn = false;
      }, 2000);
    },
    switchFn(type, struct) {
      switch (type) {
        //区块详情
        case 'block':
          this.$router.push({
            path: '/block-detail',
            query: {
              height: struct.number,
            },
          });
          if (this.$route.path == '/block-detail') {
            this.reload();
          }
          break;
        //交易详情
        case 'transaction':
          // let path = ''
          // struct.txReceiptStatus == -1 ? path='/trade-pending-detail' : path = '/trade-detail'
          this.$router.push({
            path: '/trade-detail',
            query: {
              txHash: struct.txHash,
            },
          });
          if (this.$route.path == '/trade-detail') {
            this.reload();
          }
          break;
        //节点详情
        case 'staking':
          this.$router.push({
            path: '/node-detail',
            query: {
              address: struct.nodeId,
            },
          });
          if (this.$route.path == '/node-detail') {
            this.reload();
          }
          break;
        //地址详情==(钱包地址详情)
        case 'address':
          this.$router.push({
            path: '/address-detail',
            query: {
              address: struct.address,
            },
          });
          if (this.$route.path == '/address-detail') {
            this.reload();
          }
          break;
        //合约详情
        case 'contract':
          this.$router.push({
            path: '/contract-detail',
            query: {
              address: struct.address,
            },
          });
          if (this.$route.path == '/contract-detail') {
            this.reload();
          }
          break;
      }
    },
    // 更多 选项选中事件
    dropdownCommand(command) {
      this.$router.push({
        path: command,
        query: {
          //   address: address
        },
      });
    },
  },
  //生命周期函数
  created() {
    this.language = this.$i18n.locale.indexOf('zh') !== -1 ? 'zh-cn' : 'en';
    this.getConfig();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@media screen and (max-width: 1200px) {
  .logo.cursor {
    width: auto;
    padding-right: 8px;
    .icon2, .text {
      display: none;
    }
  }
}
.header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  height: 102px;
  z-index: 99;
  padding: 0 5.2%;
  margin: 0 auto;
  background: #000;
  align-items: center; //居中对齐
  justify-content: space-between; //两端对齐
  .search {
    opacity: 0;
    transition: opacity 0.3s ease;
    &.search-hide {
      opacity: 1;
    }
  }
  .active {
    color: #fff !important;
    font-family: Gilroy-Bold;
  }
}
.logo {
  display: inline-block;
  // height: 100%;
  width: 225px;
  overflow: hidden;
  flex-shrink: 0;
  // margin-right: 20px;
  .logo-right {
    margin-top: 5px;
    margin-left: 42px;
  }
  .iconAlaya {
    width: 82px;
    height: 30px;
  }
  .icon1 {
    // padding-top: 10px;
    padding-right: 4px;
    float: left;
  }
  .icon2 {
    padding-top: 6px;
    padding-bottom: 2px;
  }
  p {
    font-family: Gilroy-Regular;
    font-size: 12px;
    color: #b3b3b3;
    letter-spacing: 0;
    white-space: nowrap;
    min-width: 84px;
  }
}
.el-menu-demo {
  display: flex;
  padding-right: 18px;
  // width: 632px;
  // border: 0px;
  // border-bottom-color: #040B27;
  li.el-menu-item {
    border: 0px;
  }
}
.right-most {
  flex-shrink: 0; // 网络切换+中英文不缩小
  // width: 200px;
  display: flex;
  justify-content: flex-end;
  div {
    font-family: Gilroy-Medium;
    font-size: 14px;
    color: #fff;
    letter-spacing: 0;
    text-align: right;
    .el-dropdown-link {
      cursor: pointer;
    }
  }
}
.right-most > .el-dropdown:first-child {
  margin: 0 25px;
}
.el-dropdown-menu {
  background: #fff;
  padding: 0 0 0 0;
  .el-dropdown-menu__item {
    color: #222;
    background-color: #fff;
    letter-spacing: 0;
    border-radius: 4px;
  }
  .el-dropdown-menu__item:hover {
    background: #eaeaea;
    color: #0798de;
  }
  .el-dropdown-menu__item:focus {
    background-color: #0f83cd;
  }
  :first-child {
    margin: 9px 0 0 0;
  }
}
.search-header {
  min-width: 355px;
  max-width: 600px;
  flex: 1;
  @media only screen and (max-width: 1366px) {
    .el-button {
      padding: 12px 14px;
    }
  }
}
.el-menu-demo {
  .el-menu-item {
    padding: 0 19px;
  }
}
@media only screen and (max-width: 1366px) {
  .header-wrap {
    padding: 0 3.2%;
  }
  .header-wrap .menu {
    margin: 0 0 0 0;
  }
  .el-menu-demo {
    .el-menu-item {
      padding: 0 10px;
    }
  }
}
// @media only screen and (max-width: 1440px) {
//     .header-wrap .menu {
//         margin: 0 0 0 0;
//     }
// }
// @media only screen and (max-width: 1366px) {
//     .header-wrap .menu {
//         margin: 0 0 0 0;
//     }
// }
@media screen and (max-width: 1280px) {
  .header-wrap {
    padding: 0 0;
    // .menu{
    //     margin-right: 10%;
    // }
  }
  // .logo{
  //     display: none;
  // }
}
.to-help {
  width: 100%;
  display: inline-block;
}

.more-title {
  font-family: Gilroy-Regular;
  font-size: 14px;
  color: inherit;
  letter-spacing: 0;
  text-align: right;
  outline: none;
}
.more-dropdown {
  display: inline;
  color: inherit;
}
.more-item {
  color: #999999 !important;
}
</style>
<style lang="less">
.search-header .el-input .el-input__inner {
  color: #fff !important;
}
.search-header .el-button.el-button--primary.is-disabled {
  color: #8e8e8e;
  background: #000;
}
.menu {
  .el-menu-demo > .el-menu-item {
    background: transparent !important;
    &:hover {
      color: #fff !important;
      // background: transparent !important;
    }
  }
}
.el-menu--horizontal,
.el-menu--horizontal > ul {
  border: 0 !important;
}
.el-menu--popup,
.el-menu--popup > li {
  background: #0e1438 !important;
}
.el-menu--popup {
  min-width: 150px;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  a {
    color: #8d9bb8;
  }
  .el-menu-item:hover {
    background: #1f254c !important;
  }
  .el-menu-item:active {
    background: #0f83cd !important;
  }
}
//右边的dropdown
.el-dropdown-menu {
  padding: 0 0 0 0 !important;
  border: 0px solid #ebeef5 !important;
}
.el-dropdown-menu__item.is-disabled {
  opacity: 0.25;
}
.right-most {
  .el-select .el-input .el-input__inner {
    font-family: ArialMT;
    font-size: 14px;
    color: #d7dde9;
    letter-spacing: 0;
    border: none;
    background: transparent;
  }
  .el-select:hover .el-input__inner {
    background: transparent;
    border: none;
    color: #d7dde9;
  }
  .el-select .el-input.is-focus .el-input__inner {
    background: transparent;
    border: none;
    color: #d7dde9;
  }
}
.search .el-button.el-searchs.btn-header {
  &.search-btn-active {
    color: #fff;
    border-left: 1px solid #666;
  }
  &:hover {
    color: #0798de;
    background: #000 !important;
    border-left: 1px solid #333;
  }
  &:active {
    color: #2d8ebc;
  }
}
.search-header.search-active {
  border: 1px solid #666;
  .search-btn-active:hover {
    border-left: 1px solid #666 !important;
  }
}
// @media screen and (max-width: 1680px) {
//     .search {
//         .el-input{
//             // width:300px;
//             width:350px;
//         }
//     }
// }
// @media screen and (max-width: 1440px) {
//     .search {
//         .el-input{
//             // width:270px;
//             width:350px;
//         }
//     }
// }
// @media screen and (max-width: 1366px) {
//     .search {
//         .el-input{
//             // width:200px;
//             width:344px;
//         }
//     }

// }
</style>
