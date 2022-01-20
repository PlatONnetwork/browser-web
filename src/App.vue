<template>
  <div
    id="app"
    :class="{
      'page-en': lang == 'en',
      'page-zh': lang != 'en',
      'is-safari': issafariBrowser,
      'is-mac': isMac,
      'is-ie11': isIE11,
    }"
    style="-webkit-tap-highlight-color: transparent"
  >
    <com-header></com-header>
    <div
      class="content-area"
      v-if="isRouterAlive"
      :class="{
        'index-area': $route.path == '/' || $route.path == '/add-to-extension',
        'gray-area': needGrayArea,
      }"
    >
      <!-- <router-view></router-view> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"> </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <com-footer></com-footer>
  </div>
</template>

<script>
import comHeader from '@/components/header/header.vue';
import comFooter from '@/components/footer/footer.vue';

export default {
  //组件名
  name: 'app',
  data() {
    return {
      isRouterAlive: true,
      issafariBrowser:
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent),
      isMac: /macintosh|mac os x/i.test(navigator.userAgent),
      isIE11:
        navigator.userAgent.indexOf('Trident') > -1 &&
        navigator.userAgent.indexOf('rv:11.0') > -1,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale == 'en' ? 'en' : 'zh';
    },
    needGrayArea() {
      return [
        '/address-detail',
        '/contract-detail',
        '/node',
        '/node-detail',
        '/tokens-detail',
      ].includes(this.$route.path);
    },
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  components: {
    comHeader,
    comFooter,
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  mounted() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://s9.cnzz.com/z_stat.php?id=1278248458&web_id=1278248458'; //友盟中的代码
    document.body.appendChild(script);
  },
  watch: {
    $route() {
      if (window['_czc']) {
        // window._czc.push(["_setAutoPageview", false]);
        let location = window.location; //路由变化
        let contentUrl = location.pathname + location.hash; //自定义当前url，可带上路由以此区分每个页面
        // console.log(contentUrl);
        let refererUrl = '/';
        window['_czc'].push(['_setAutoPageview', false]);
        window['_czc'].push(['_trackPageview', contentUrl, refererUrl]);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.index-area {
  background: #000;
  overflow: hidden;
  @media (max-width: 750px) {
    padding: 0 40px;
  }
  @media (max-width: 500px) {
    padding: 0 20px;
  }
}
@media (max-width: 750px) {
  .content-area {
    padding-top: 152px;
    &.index-area {
      padding-top: 122px;
    }
  }
}
@media (max-width: 500px) {
  .content-area {
    padding-top: 132px;
    &.index-area {
      padding-top: 102px;
    }
  }
}
</style>