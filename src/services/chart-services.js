import echarts from 'echarts'
import store from '@/vuex/store'
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
    constructor() {
        this.chart = null
        this.ele = null
        this.blocklineOption = {
            grid:{
                show:false,
                left:'3%',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            xAxis:[
                {
                    type:'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                    axisPointer:{
                        type:'shadow'
                    },
                    axisLabel:{
                        show:true,
                        textStyle:{
                            color: '#2F3753',
                            fontSize: '16'
                        }
                    },
                    splitLine:{
                        show:true,
                        interval:0,
                        lineStyle:{
                            color: ['#2b66f3'],
                            opacity: 0.3,
                            type:'dashed',
                            width:1
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'2b66f3',
                            width:1
                        }
                    }
                }
            ],
            yAxis:[
                {
                  type: 'value',
                  name: '',
                  position: 'left',
                  axisLabel: {
                    formatter: '{value}',
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
                    type:'value',
                    name:'',
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
            series:[
                {
                    name:'出块时间',
                    type:'line',
                    yAxisIndex:0,
                    smooth:true,
                    data: [1, 2.3, 4, 3, 3.5, 4],
                    lineStyle: {
                        color: '#2FAAF8',
                        width:2,
                        shadowBlur:4,
                        shadowColor: 'rgba(42, 63, 131, 0.50)',
                        shadowOffsetX:2,
                        shadowOffsetY:4
                    },
                    // smooth:true,
                    itemStyle:{
                        color: '#2FAAF8',
                        borderColor: '#2FAAF8',
                        boredrWidth:0,
                        opacity:0,
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
                },
                {
                    name:'交易数量',
                    type:'bar',
                    yAxisIndex: 1,
                    smooth: true,
                    data: [20, 4, 5, 30, 14, 25],
                    itemStyle: {
                      color: '#30EAF6',
                      opacity:0.3
                    },
                    barWidth:10
                }
            ]
        }
    }
    init(ele,option){
        this.ele = ele
        //基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(ele)
        this.chart.setOption(option)
    }
    update(updateOption){
        this.chart ? this.chart.setOption(updateOption) : console.warn('请先执行init方法')
    }
    changeTitle(title){
        this.echart ? this.echart.setOption({
            title:{
                text:title,
            },
        }) : console.warn('请先执行init方法')
    }
    resize(){
        return this.echart.resize()
    }
}
export default ChartService