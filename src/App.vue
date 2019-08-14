<template>
    <div id="app">
        <com-header></com-header>
        <div class="content-area">
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
    components:{
        comHeader,
        comFooter
    }
}
</script>
