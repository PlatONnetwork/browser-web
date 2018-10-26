<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
// import comHeader from '@/components/header/header.vue'
// import comFooter from '@/components/footer/footer.vue'
@Component({
    components:{
        // comHeader,
        // comFooter
    }
})
export default class App extends Vue {

}
</script>

<style lang="less" scoped>

</style>