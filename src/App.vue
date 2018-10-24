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
import comHeader from '@/components/header/header.vue'
import comFooter from '@/components/footer/footer.vue'
@Component({
    components:{
        comHeader,
        comFooter
    }
})
export default class App extends Vue {

}
</script>

<style>

</style>