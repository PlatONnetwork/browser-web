<template>
    <div class="index">
        首页
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Getter} from 'vuex-class'


@Component({})
export default class HelloWorld extends Vue {
    @Getter
    info;

    mounted() {
    }
}
</script>

<style lang="less" scoped>
    .index{
        color:#000;
    }
</style>