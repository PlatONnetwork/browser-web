import echarts from 'echarts'
import 'echarts-gl';
import 'echarts/map/js/world';
// import store from '@/vuex/store'
/*
 * fun init(ele, option) 初始化
 *  @param ele 必传
 *  @param option 必传
 *
 * fun update(updateOption) 更新数据
 * fun changeTitle(title) 改变标题
 * fun resize() 重置图表尺寸
 */


class ChartService {
    // worldMapOption = {
    //   // backgroundColor: '#fff',
    //   geo: {
    //     map: 'world',
    //     roam: 'scale',
    //     label: {
    //       emphasis: {
    //         show: false
    //       }
    //     },
    //     silent: true,
    //     itemStyle: {
    //       normal: {
    //         areaColor: '#323c48',
    //         borderColor: '#111'
    //       },
    //       emphasis: {
    //         areaColor: '#2a333d'
    //       }
    //     },
    //     scaleLimit: {
    //       min: 0.5,
    //       max: 1.5
    //     }
    //   },
    //   series: [{
    //     name: '弱',
    //     type: 'scatterGL',
    //     progressive: 1e6,
    //     coordinateSystem: 'geo',
    //     symbolSize: ((level) => {
    //       switch (level) {
    //         case 1:
    //           return 1;
    //           break;
    //         case 2:
    //           return 5;
    //           break;
    //         case 3:
    //           return 10;
    //           break;
    //         default:
    //           return 1;
    //           break;
    //       }
    //     })(2), //store.state.common.baseConfig.worldMapSymbolLevel
    //     zoomScale: 0.002,
    //     blendMode: 'lighter',
    //     large: true,
    //     itemStyle: {
    //       color: 'rgb(20, 15, 2)'
    //     },
    //     postEffect: {
    //       enable: true
    //     },
    //     silent: true,
    //     dimensions: ['lng', 'lat'],
    //     data: new Float32Array()
    //   }]
    // }

    worldMapOption = {
        tooltip: {
            trigger: 'item'
        },
        geo: {
            map: 'world',
            roam: 'false',
            label: {
                emphasis: {
                    show: false
                }
            },
            silent: true,
            itemStyle: {
                normal: {
                    areaColor: 'transparent',
                    borderColor: '#608bce',
                    borderWidth: 2,
                    shadowColor: 'rgba(63, 218, 255, 0.3)',
                    shadowBlur: 10
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            },
            scaleLimit: {
                min: 0.5,
                max: 1.5
            }
        },
        series: [
            {
                name:'共识节点',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: [

                ],
                symbolSize: 13,
                showEffectOn: 'render',
                rippleEffect: {
                    period: 5,
                    scale: 6,
                    brushType: 'fill'
                },
                hoverAnimation: true,
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,0,1)',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            },
            {
                name: '普通节点',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: [

                ],
                //   symbolSize: 10,
                showEffectOn: 'render',
                rippleEffect: {
                    period: 5,
                    scale: 6,
                    brushType: 'fill'
                },
                hoverAnimation: true,
                itemStyle: {
                    normal: {
                        color: 'rgba(44,213,230,0.8)',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
              zlevel: 1
            },
            {
                name: '异常离线节点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: [

                ],
                // symbolSize: 15,
                itemStyle: {
                    normal: {
                        color: '#b0b0b0',
                    }
                }
            }
        ]
    }
    earthOption = {
        // backgroundColor: '#000',
        globe: {
            baseTexture: 'http://echarts.baidu.com/examples/data-gl/asset/world.topo.bathy.200401.jpg',
            heightTexture: 'http://echarts.baidu.com/examples/data-gl/asset/bathymetry_bw_composite_4k.jpg',
            shading: 'lambert',
            light: {
                ambient: {
                    intensity: 0.4
                },
                main: {
                    intensity: 0.4
                }
            },
            viewControl: {
                autoRotate: false
            },
            top: '5%',
            bottom:'8%'
        },
        series: {

            type: 'lines3D',

            coordinateSystem: 'globe',

            blendMode: 'lighter',

            lineStyle: {
                width: 1,
                color: 'rgb(50, 50, 150)',
                opacity: 0.1
            },

            data: []
        }
    }

    constructor() {
        this.chart = null
        this.ele = null
        this.blocklineOption = {
            grid: {
                show: false,
                left:'3%',
            },
            //提示框组件
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#2F3753',
                            fontSize: '16'
                        },
                        // interval: 2,
                        rotate: 50,
                    },
                    splitLine: {
                        show: true,
                        interval: 0,
                        lineStyle: {
                            color: ['#2b66f3'],
                            opacity: 0.3,
                            type: 'dashed',
                            width: 1
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '2b66f3',
                            width: 1
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '',
                    position: 'left',
                    axisLabel: {
                        formatter: '{value}s',
                        textStyle: {
                            color: '#2F3753',
                            fontSize: '16'
                        }
                    },
                    splitLine: {
                        show: true,
                        interval: 0,
                        lineStyle: {
                            color: ['#2b66f3'],
                            opacity: 0.3,
                            type: 'dashed',
                            width: 1
                        }
                    },
                },
                {
                    type: 'value',
                    name: '',
                    position: 'right',
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#2F3753',
                            fontSize: '16'
                        }
                    },
                    splitLine: {
                        show: false,
                        interval: 1,
                        lineStyle: {
                            color: ['#2b66f3'],
                            opacity: 0,
                            type: 'dashed',
                            width: 1
                        }
                    },
                },

            ],
            series: [
                {
                    name: '出块时间',
                    type: 'line',
                    yAxisIndex: 0,
                    data: [1, 2.3, 4, 3, 3.5, 4],
                    lineStyle: {
                        color: '#2FAAF8',
                        width: 2,
                        shadowBlur: 4,
                        shadowColor: 'rgba(42, 63, 131, 0.50)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 4
                    },
                    // smooth:true,
                    itemStyle: {
                        color: '#2FAAF8',
                        borderColor: '#2FAAF8',
                        boredrWidth: 0,
                        opacity: 0,
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#1142FA'
                        }, {
                            offset: 1,
                            color: 'rgba(35,112,160,0.20)'
                        }])
                    },
                    symbol: 'none', //去掉折线图中的节点
                    smooth: true //true 为平滑曲线，false为直线
                },
                {
                    name: '交易数量',
                    type: 'bar',
                    yAxisIndex: 1,
                    smooth: true,
                    data: [20, 4, 5, 30, 14, 25],
                    itemStyle: {
                        color: '#30EAF6',
                        opacity: 0.3
                    },
                    barWidth: 10
                }
            ]
        }
    }
    init(ele, option) {
        this.ele = ele
        //基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(ele)
        this.chart.setOption(option)
    }
    update(updateOption) {
        this.chart ? this.chart.setOption(updateOption) : console.warn('请先执行init方法')
    }
    changeTitle(title) {
        this.echart ? this.echart.setOption({
            title: {
                text: title,
            },
        }) : console.warn('请先执行init方法')
    }
    resize() {
        return this.echart.resize()
    }
}
export default ChartService