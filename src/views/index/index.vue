<template>
    <div class="index">
        <slider :pages="pages" :sliderinit="sliderinit">
            <div>322222222222</div>
        </slider>
        <section class="first-floor">
            {{pages}}{{sliderinit}}
        </section>
        <section class="second-floor">

        </section>
        <section class="third-floor">

        </section>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Getter} from 'vuex-class';
import slider from 'vue-concise-slider';

@Component({
    components: {
        slider,
    },
})
export default class HelloWorld extends Vue {
    @Getter
    info;

    pages: Array<object> = [
        {
            title: '',
            style: {
                background: '#4bbfc3',
            },
        },
        {
            title: '',
            style: {
                background: '#4bbfc3',
            },
        },
        {
            title: 'slide3',
            style: {
                background: '#4bbfc3',
            },
        },
    ];
    // 滑动配置[obj]
    sliderinit: object = {
        currentPage: 0, // 当前页码
        thresholdDistance: 500, // 滑动判定距离
        thresholdTime: 100, // 滑动判定时间
        autoplay: 1000, // 自动滚动[ms]
        loop: true, // 循环滚动
        direction: 'vertical', // 方向设置，垂直滚动
        infinite: 1, // 无限滚动前后遍历数
        slidesToScroll: 1, // 每次滑动项数
    };
    mounted() {}
}
</script>

<style lang="less" scoped>
</style>