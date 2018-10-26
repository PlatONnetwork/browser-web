<template>
    <div id="app">
        <!-- <com-header></com-header> -->
        <!-- <div class="com-container"> -->
            <router-view></router-view>
        <!-- </div> -->
        <!-- <el-row :gutter='20'>
            <el-col :span="18" :offset="3">

            </el-col>
        </el-row> -->
        <!-- <com-footer></com-footer> -->
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