<template>
  <div id="chartLine" class="line-wrap" style="width: 100%"></div>
</template>

<script>
import * as echarts from 'echarts';
import * as _ from "lodash";
import moment from "moment";
// import {numFormat} from "@/utils/math"
require('echarts/theme/shine');//引入主题
import {debounce} from 'lodash';

export default {
  name: "QuotesEchart",
  data: () => ({
    chartLine: null,
    xData: [],
    yData: [],
  }),
  props: [
    "nft",
    "choiceBtn"
  ],
  computed: {
    year() {
      if (this.choiceBtn === 0) {
        return moment().format("YYYY") + '.'
      } else return ''
    }
    // realityData() {
    //   return _.orderBy(this.nft.quotes, 'date')
    // }
  },
  watch: {
    nft() {
      if (this.nft) {
        this.xAxis()
        this.yAxis()
        this.drawLineChart();
      }
    },
    choiceBtn() {
      this.xAxis()
      this.yAxis()
      this.drawLineChart();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.nft) {
        this.xAxis()
        this.yAxis()
        this.drawLineChart();
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    xAxis() {
      if (this.choiceBtn === 0) {
        this.xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      } else if (this.choiceBtn === 1) {
        let xAxis = []
        let year = moment().format("YYYY")
        for (let i = 1; i <= 24; i++) {
          if (i < 10) {
            let x = (year - 1) + `.0${i}`
            xAxis.push(x)
          } else if (i >= 10 && i <= 12) {
            let x = (year - 1) + `.${i}`
            xAxis.push(x)
          } else if (i > 12 && i <= 21) {
            let x = (year) + `.0${i % 12}`
            xAxis.push(x)
          } else if (i > 21) {
            if (i === 24) {
              let x = (year) + `.12`
              xAxis.push(x)
            } else {
              let x = (year) + `.${i % 12}`
              xAxis.push(x)
            }
          }
        }
        this.xData = xAxis
      } else if (this.choiceBtn === 2) {
        let xAxis = []
        let year = moment().format("YYYY")
        for (let i = 1; i <= 36; i++) {
          if (i < 10) {
            let x = (year - 2) + `.0${i}`
            xAxis.push(x)
          } else if (i >= 10 && i <= 12) {
            if (i === 12) {
              let x = (year - 2) + `.12`
              xAxis.push(x)
            } else {
              let x = (year - 2) + `.${i}`
              xAxis.push(x)
            }
          } else if (i > 12 && i <= 21) {
            let x = (year - 1) + `.0${i % 12}`
            xAxis.push(x)
          } else if (i > 21 && i <= 24) {
            if (i === 24) {
              let x = (year - 1) + `.12`
              xAxis.push(x)
            } else {
              let x = (year - 1) + `.${i % 12}`
              xAxis.push(x)
            }
          } else if (i > 24 && i <= 33) {
            let x = (year) + `.0${i % 12}`
            xAxis.push(x)
          } else if (i > 33) {
            if (i === 36) {
              let x = (year) + `.12`
              xAxis.push(x)
            } else {
              let x = (year) + `.${i % 12}`
              xAxis.push(x)
            }
          }
        }
        this.xData = xAxis
      }
    },
    yAxis() {
      //按照date排序
      let realityData = _.orderBy(this.nft.quotes, 'date')
      let showY = []
      let year = moment().format("YYYY")
      if (this.choiceBtn === 0) {
        let yAxis = []
        for (let n = 0; n < 12; n++) {
          yAxis[n] = {price: 0}
        }
        //移除不是本年的
        let ReallyAxis = _.remove(realityData, function (n) {
          return n.date.substring(0, 4) === year
        })
        //移除重复月份
        for (let i = 0; i < ReallyAxis.length; i++) {
          let iMonth = ReallyAxis[i].date.substring(5, 7)
          for (let j = i + 1; j < ReallyAxis.length; j++) {
            let jMonth = ReallyAxis[j].date.substring(5, 7)
            if (iMonth === jMonth) {
              if (Number(ReallyAxis[i].price) > Number(ReallyAxis[j].price)) {
                ReallyAxis.splice(j, 1)
              } else {
                ReallyAxis.splice(i, 1)
              }
            }
          }
        }
        //将换算后的价格按顺序移入yAxis
        ReallyAxis.map(item => {
          // let month = item.date.substring(5, 7)
          let month = item.date.substring(5, 7)
          if (month < 10) {
            month = month.substring(1, 2)
          }
          yAxis[Number(month) - 1] = item
        })
        //设置第一个月的值
        let middlePrice = 0
        if (!yAxis[0].date) {
          _.orderBy(this.nft.quotes, 'date').map((item, index) => {
            if (ReallyAxis[0].date === item.date) {
              if (index - 1 != -1) {
                middlePrice = _.orderBy(this.nft.quotes, 'date')[index - 1].price
                return
              }
            }
          })
        }
        yAxis.map((item) => {
          if (item.price === 0) {
            item.price = middlePrice
          } else {
            middlePrice = item.price
          }
          showY.push(Number(_.values(_.pick(item, 'price'))))
        })
        let endMonth = ReallyAxis[ReallyAxis.length - 1].date.substring(5, 7)
        showY = showY.slice(0, endMonth)
      } else if (this.choiceBtn === 1) {
        let yAxis = []
        for (let n = 0; n < 24; n++) {
          yAxis[n] = {price: 0}
        }
        // let yAxis2 = new Array(24).fill({price: 0})
        let ReallyAxis = _.remove(realityData, function (n) {
          return year - n.date.substring(0, 4) <= 1
        })
        for (let i = 0; i < ReallyAxis.length; i++) {
          let iMonth = ReallyAxis[i].date.substring(5, 7)
          for (let j = i + 1; j < ReallyAxis.length; j++) {
            let jMonth = ReallyAxis[j].date.substring(5, 7)
            if (iMonth === jMonth) {
              if (Number(ReallyAxis[i].price) > Number(ReallyAxis[j].price)) {
                ReallyAxis.splice(j, 1)
              } else {
                ReallyAxis.splice(i, 1)
              }
            }
          }
        }
        ReallyAxis.map(item => {
          let Ymonth = item.date.substring(5, 7)
          let Yyear = item.date.substring(0, 4)
          if (Yyear === year) {
            if (Ymonth < 10) {
              Ymonth = Ymonth.substring(1, 2)
            }
            yAxis[Number(Ymonth) + 11] = item
          } else {
            if (Ymonth < 10) {
              Ymonth = Ymonth.substring(1, 2)
            }
            yAxis[Number(Ymonth) - 1] = item
          }
        })
        let middlePrice = 0
        if (!yAxis[0].date) {
          _.orderBy(this.nft.quotes, 'date').map((item, index) => {
            if (ReallyAxis[0].date === item.date) {
              if (index - 1 != -1) {
                middlePrice = _.orderBy(this.nft.quotes, 'date')[index - 1].price
              }
            }
          })
        }
        yAxis.map((item) => {
          if (item.price === 0) {
            item.price = middlePrice
          } else {
            middlePrice = item.price
          }
          showY.push(Number(_.values(_.pick(item, 'price'))))
        })
        let endDay = ReallyAxis[ReallyAxis.length - 1].date
        yAxis.map((item, index) => {
          if (endDay === item.date) {
            showY = showY.slice(0, index + 1)
          }
        })
      } else if (this.choiceBtn === 2) {
        let yAxis = []
        for (let n = 0; n < 36; n++) {
          yAxis[n] = {price: 0}
        }
        // let yAxis2 = new Array(24).fill({price: 0})
        let ReallyAxis = _.remove(realityData, function (n) {
          return year - n.date.substring(0, 4) <= 2
        })
        for (let i = 0; i < ReallyAxis.length; i++) {
          let iMonth = ReallyAxis[i].date.substring(5, 7)
          for (let j = i + 1; j < ReallyAxis.length; j++) {
            let jMonth = ReallyAxis[j].date.substring(5, 7)
            if (iMonth === jMonth) {
              if (Number(ReallyAxis[i].price) > Number(ReallyAxis[j].price)) {
                ReallyAxis.splice(j, 1)
              } else {
                ReallyAxis.splice(i, 1)
              }
            }
          }
        }
        ReallyAxis.map(item => {
          let Ymonth = item.date.substring(5, 7)
          let Yyear = item.date.substring(0, 4)
          if (Yyear === year) {
            if (Ymonth < 10) {
              Ymonth = Ymonth.substring(1, 2)
            }
            yAxis[Number(Ymonth) + 23] = item
          } else if (year - Yyear === 1) {
            if (Ymonth < 10) {
              Ymonth = Ymonth.substring(1, 2)
            }
            yAxis[Number(Ymonth) + 11] = item
          } else if (year - Yyear === 2) {

            if (Ymonth < 10) {
              Ymonth = Ymonth.substring(1, 2)
            }
            yAxis[Number(Ymonth) - 1] = item
          }
        })
        let middlePrice = 0
        if (!yAxis[0].date) {
          _.orderBy(this.nft.quotes, 'date').map((item, index) => {
            if (ReallyAxis[0].date === item.date) {
              if (index - 1 != -1) {
                middlePrice = _.orderBy(this.nft.quotes, 'date')[index - 1].price
              }
            }
          })
        }
        yAxis.map((item) => {
          if (item.price === 0) {
            item.price = middlePrice
          } else {
            middlePrice = item.price
          }
          showY.push(Number(_.values(_.pick(item, 'price'))))
        })
        let endDay = ReallyAxis[ReallyAxis.length - 1].date
        yAxis.map((item, index) => {
          if (endDay === item.date) {
            showY = showY.slice(0, index + 1)
          }
        })
      }
      this.yData = showY
    },

    drawLineChart() {
      if (this.chartLine != null && this.chartLine != "" && this.chartLine != undefined) {
        this.chartLine.dispose();//销毁
      }
      this.chartLine = echarts.init(this.$el, 'shine');// 基于准备好的dom，初始化echarts实例
      window.addEventListener('resize', this.resize)
      let xdata = this.xData;  //x轴
      let dataArr = this.yData; //value
      let option = {
        backgroundColor: '#F6F5F3',//背景颜色透明
        grid: {
          left: "2%",
          right: "7%",
          bottom: "15%",
          top: "15%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xdata,
          axisLabel: {
            show: true,
            showMinLabel: true,
            showMaxLabel: true,
            hideOverlap: true,
            fontSize: 12,
            fontWeight: 'bold',
            interval: this.choiceBtn === 0 ? 0 : this.choiceBtn === 1 ? 5 : 4,
            // interval: 0,
            // splitNumber:7,
            // axisLine: { onZero: true },
            margin: 20,
            color: "rgba(0, 0, 0, 0.54)"
          },
          axisLine: {
            lineStyle: {
              color: 'transparent',
              width: 2 //这里是为了突出显示加上的
            }
          }
        },
        tooltip: {
          show: true,
          trigger: "item",//鼠标经过提示
          // alwaysShowContent: true,
          padding: [0, 0, 0, 0],
          position: 'top',
          axisPointer: {
            type: "cross",
            lineStyle: {
              color: "rgba(30, 136, 229, 1)"//设置提示框y轴线条颜色
            },
            crossStyle: {
              color: 'rgba(30, 136, 229, 1)'//设置提示框x轴线条颜色
            },
            label: {
              show: false
            }
          },
          backgroundColor: '#E4A100',
          borderColor: '#FDD20D',
          textStyle: {
            color: "rgba(38, 19, 0, 1)",
            fontSize: '12',
            fontWeight: 'bold',
            lineHeight: '17',
          },
          formatter: (params) => {
            let value = params.value.toString().replace(/\d+/, function (n) { // 先提取整数部分
              return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
                return $1 + ",";
              });
            })
            return `<div style="min-width:109px;height:45px;background: linear-gradient(360deg, #E4A100 0%, #FDD20D 55%, #FFE362 100%);padding: 5px 9px 0px 9px;"><div>${this.year}${params.name}</div><div>KRW ${value}</div></div>`
          }
          // formatter: `<div style="min-width:109px;height:45px;background: linear-gradient(360deg, #E4A100 0%, #FDD20D 55%, #FFE362 100%);padding: 5px;9px;0px;9px;">${this.year}{b} <br/>KRW : {c}</div>`
        },
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: function (value) {
              if (value >= 10000) {
                return value.toString().substring(0, value.toString().length - 4) + 'w'
              }
            },
            margin: 20,
            color: 'rgba(0, 0, 0, 0.54)'
          },
          splitLine: {
            show: true,
            interval: 1,
            lineStyle: {
              width: 1,
              type: [1, 3],
              dashOffset: 5,
              color: 'rgba(255, 255, 255, .1)'
            }
          }
        }],
        series: [
          {
            type: 'line',
            symbol: 'circle',
            smooth: true,
            symbolSize: 10,
            showSymbol: false,
            symbolColor: 'white',
            itemStyle: {
              borderType: 'dotted',
              type: 'dashed',
              number: 1,
              color: '#fff'
            },
            lineStyle: {
              width: 3,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'rgba(255, 162, 64, 1)'
              }, {
                offset: 1,
                color: 'rgba(255, 29, 84, 1)'
              }]),
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'rgba(255, 162, 64, .1)'
              }, {
                offset: 1,
                color: 'rgba(255, 29, 84, .1)'
              }]),
            },
            data: dataArr
          },
        ]
      };
      // 使用刚指定的配置项和数据显示图表
      this.chartLine.setOption(option);
    },
    resize: debounce(function () {
      this.chartLine.resize();
    }, 500),
  }
}
</script>
<style scoped>
.line-wrap {
  width: 100%;
  height: 390px;
}
</style>