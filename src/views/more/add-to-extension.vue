<template>
  <iframe id='addWallet' name='addWallet' ref='addWallet' :src="iframeSrc" target="_blank"
    height='1500px' frameborder="0" width="100%"></iframe>
</template>

<script>
export default {
  name: 'AddToExtension',
  data() {
    return {
      iframeSrc: 'https://uatscan.platon.network:1443/'
    }
  },
  watch: {
    "$i18n.locale": function (val) {
      console.log('postMessage', val);
      this.postMessage()
    },
  },
  methods: {

    postMessage() {
      let _this = this;
      const _iframe = document.getElementById('addWallet');
      if (_iframe) {
        _iframe.contentWindow.postMessage(_this.$i18n.locale === 'zh-cn' ? 'zh' : 'en', _this.iframeSrc);
      }
    },

    initLang() {
      let _this = this;
      const _iframe = document.getElementById('addWallet')
      if (_iframe) {
        // @ts-ignore
        if (_iframe.attachEvent) { // 兼容浏览器判断
          // @ts-ignore
          _iframe.attachEvent("onload", function () {
            // @ts-ignore
            _iframe.contentWindow.postMessage(_this.$i18n.locale ? 'zh' : 'en', _this.iframeSrc)
          })
        } else {
          _iframe.onload = function () {
            // @ts-ignore
            _iframe.contentWindow.postMessage(_this.$i18n.locale === 'zh-cn' ? 'zh' : 'en', _this.iframeSrc)
          }
        }
      }
    }
  },
  mounted() {
    this.initLang()
  },
}
</script>
