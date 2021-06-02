import * as echarts from 'echarts';

/*
 * fun init(ele, option) 初始化
 *  @param ele 必传
 *  @param option 必传
 *
 * fun update(updateOption) 更新数据
 * fun changeTitle(title) 改变标题
 * fun resize() 重置图表尺寸
 */
let data1=[],data2=[],data3=[];

class ChartService {
    constructor() {
        this.chart = null
        this.ele = null
        this.blockTimeOption = {
            color: ['rgba(255,255,255,0.5)'],
            grid: {
                show: false,
                left:'3%',
            },
            //提示框组件
            // tooltip: {
            //     trigger: 'axis',
            //     axisPointer: {
            //         type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            //         lineStyle : {          // 直线指示器样式设置
            //             width: 0,
            //             color: 'rgba(102,183,222,0.4)',
            //             type: 'solid'
            //         },
            //         crossStyle: {
            //             color: '#999'
            //         },
            //     },
            //     formatter:function(params)  
            //     {  
            //         var relVal = params[0].name;  
            //         for (var i = 0, l = params.length; i < l; i++) {  
            //                 relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value+"s";  
            //             }  
            //         return relVal;  
            //     }  
            // },
            xAxis: [
                {   
                    show:false,
                    // data: [1,2,3,4,5,6,7,8],
                    data: [],
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick:{       //y轴刻度线
                        "show":false              
                    },
                    axisLine:{       //y轴
                        "show":false              
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}s',
                        textStyle: {
                            color: '#000',
                            fontSize: '16'
                        }
                    },
                    // splitLine: {
                    //     show: true,
                    //     interval: 0,
                    //     lineStyle: {
                    //         color: ['#2b66f3'],
                    //         opacity: 0,
                    //         type: 'dashed',
                    //         width: 1
                    //     }
                    // },
                },
            ],
            series: [
                {
                    name: '出块时间',
                    type: 'bar',
                    smooth: true,
                    // data: [20, 4, 5, 30, 14, 225,30,140], //去掉默认数据
                    data: [],
                    // itemStyle: {
                    //     color: '#30EAF6',
                    //     opacity: 0.3
                    // },
                    barWidth: 6,
                    barMinHeight: 10, 
                    itemStyle: {
                        normal: {
                            //通过数组下标选择颜色
                            color: function(params) {
                                var colorList = [
                                 '#fff','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
                                 'rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
                                 'rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
                                 'rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
                                 'rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
                                 'rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
                                 ];
                                return colorList[params.dataIndex]
                            },
                        }
                    }
                }
            ],
        },
        this.blockTradeOption = {
            color: ['rgba(255,255,255,0.5)'],
            grid: {
                show: false,
                // right: '0%',
                left:'3%',
            },
            //提示框组件
            // tooltip: {
            //     trigger: 'axis',
            //     axisPointer: {
            //         type: 'line',
            //         lineStyle : {          // 直线指示器样式设置
            //             width: 0,
            //             color: 'rgba(102,183,222,0.4)',
            //             type: 'solid'
            //         },
            //         crossStyle: {
            //             color: '#999'
            //         }
            //     },
            //     formatter:function(params)  
            //     {  
            //         var relVal = params[0].name;  
            //         for (var i = 0, l = params.length; i < l; i++) {  
            //                 relVal += '<br/>' + params[i].seriesName + ' : ' + (params[i].value)+"TXs";   //设置默认交易数高度20
            //             }  
            //         return relVal;  
            //     }  
            // },            
            xAxis: [
                {   
                    show:false,
                    // data: [1,2,3,4,5,6,7,8],
                    data: [],
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick:{       //y轴刻度线
                        "show":false              
                    },
                    axisLine:{       //y轴
                        "show":false              
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}s',
                        textStyle: {
                            color: '#000',
                            fontSize: '16'
                        }
                    },
                    // splitLine: {
                    //     show: true,
                    //     interval: 0,
                    //     lineStyle: {
                    //         color: ['#2b66f3'],
                    //         opacity: 0.5,
                    //         type: 'dashed',
                    //         width: 1
                    //     }
                    // },
                },
            ],
            series: [
                {
                    name: '交易数',
                    type: 'bar',
                    smooth: true,
                    // data: [120, 42, 500, 30, 14, 225,30,140], //去掉默认数据
                    data: [],
                    // itemStyle: {
                    //     color: '#30EAF6',
                    //     opacity: 0.3
                    // },
                    barWidth: 6,
                    barMinHeight: 10, 
                    itemStyle: {
                        normal: {
                            //通过数组下标选择颜色
                            color: function(params) {
                                var colorList = [
                                 '#fff','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
                                 'rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
                                 'rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
                                 'rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
                                 'rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
                                 'rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
                                 ];
                                return colorList[params.dataIndex]
                            },
                        }
                    }
                }
            ],   
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