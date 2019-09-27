<template>
    <div id="app" :class="lang=='en'?'page-en':'page-zh'">
        <com-header></com-header>
        <div class="content-area" v-if="isRouterAlive" :class="{'index-area':$route.path=='/'}">
            <router-view></router-view>
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
            isRouterAlive: true
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
