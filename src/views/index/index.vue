<template>
    <div class="index">
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Getter} from 'vuex-class';

@Component({})
export default class HelloWorld extends Vue {
    @Getter
    info;

    mounted() {
    }
}
</script>

<style lang="less" scoped>
.index {
    text-align: center;
}
.img {
    margin: 0 auto;
}
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}
</style>