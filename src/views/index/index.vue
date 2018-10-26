<template>
    <div class="index">
        <!-- <slider :pages="pages" :sliderinit="sliderinit">
            <slideritem>
                <com-header></com-header>
            </slideritem>
            <slideritem>
                <div>322222222222</div>
            </slideritem>
            <slideritem>
                <com-footer></com-footer>
            </slideritem>
        </slider> -->
        <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
          <!-- 直接使用slideritem slot -->
           <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
           <slideritem>
                <com-header></com-header>
            </slideritem>
            <slideritem>
                <div>322222222222</div>
            </slideritem>
            <slideritem>
                <com-footer></com-footer>
            </slideritem>
          <!-- 设置loading,可自定义 -->
          <div slot="loading">loading...</div>
      </slider>

        <section class="first-floor">
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
import comHeader from '@/components/header/header.vue';
import comFooter from '@/components/footer/footer.vue';
import {slider, slideritem} from 'vue-concise-slider';

@Component({
    components: {
        comHeader,
        comFooter,
        slider,
        slideritem
    },
})
export default class HelloWorld extends Vue {
    @Getter
    info;

    someList: Array<object>  = [
          {
            html: 'slide1',
            style: {
              'background': '#1bbc9b'
            }
          },
          {
            html: 'slide2',
            style: {
              'background': '#4bbfc3'
            }
          },
          {
            html: 'slide3',
            style: {
              'background': '#7baabe'
            }
          }
        ]
    // 滑动配置[obj]
    options: object = {
        currentPage: 0, // 当前页码
        thresholdDistance: 500, // 滑动判定距离
        thresholdTime: 100, // 滑动判定时间
        autoplay: 1000, // 自动滚动[ms]
        loop: false, // 循环滚动
        direction: 'vertical', // 方向设置，垂直滚动
        infinite: 1, // 无限滚动前后遍历数
        slidesToScroll: 1, // 每次滑动项数
    };

    slide (data) {
        console.log(data)
      }
      onTap (data) {
        console.log(data)
      }
      onInit (data) {
        console.log(data)
      }
    mounted() {}
}
</script>

<style lang="less" scoped>
.index {
    height: 100%;
}
</style>