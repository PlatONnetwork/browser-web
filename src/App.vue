<template>
    <div id="app">
        <com-header></com-header>
        <router-view></router-view>
        <com-footer></com-footer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import comHeader from '@/components/Header/Header.vue'
import comFooter from '@/components/Footer/Footer.vue'
@Component({comHeader,comFooter})
export default class App extends Vue {

}
</script>

<style>

</style>