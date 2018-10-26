<template>
    <div id="app">
        <com-header></com-header>
        <div class="com-container">
            <router-view></router-view>
        </div>
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

<style lang="less" scoped>
    .main{
        background:#f0f0f0;
        height:100%;
    }
</style>