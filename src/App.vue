<template>
    <div id="app" :class="{'page-en':lang=='en','page-zh':lang!='en','is-safari':issafariBrowser,'is-mac':isMac,'is-ie11':isIE11}">
        <com-header></com-header>
        <div class="content-area" v-if="isRouterAlive" :class="{'index-area':$route.path=='/','gray-area':$route.path=='/address-detail' || $route.path=='/node' || $route.path=='/node-detail'}">
            <!-- <router-view></router-view> -->
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive">
                </router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <com-footer></com-footer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import comHeader from '@/components/header/header.vue'
import comFooter from '@/components/footer/footer.vue'

export default {
    //组件名
    name: 'app',
    data () {
        return {
            isRouterAlive: true,
            issafariBrowser:/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
            isMac:/macintosh|mac os x/i.test(navigator.userAgent),
            isIE11:navigator.userAgent.indexOf('Trident') > -1 && navigator.userAgent.indexOf("rv:11.0") > -1
        }
    },
    computed:{
        lang(){
            return this.$i18n.locale=='en'?'en':'zh';
        }
    },
    provide () {
        return {
            reload: this.reload
        }
    },
    components:{
        comHeader,
        comFooter
    },
    methods: {
        reload () {
            this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        }
    }
}
</script>
