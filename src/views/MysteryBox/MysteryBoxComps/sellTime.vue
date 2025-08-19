<template>
  <div class="d-flex time">
    <div>{{ d }}<span>{{ $t("mysteryBox.fontPage.day") }}</span></div>
    <div>{{ h }}<span>{{ $t("mysteryBox.fontPage.hour") }}</span></div>
    <div>{{ m }}<span>{{ $t("mysteryBox.fontPage.minute") }}</span></div>
    <div class="lastSellTime">{{ s }}<span>{{
        $t("mysteryBox.fontPage.second")
      }}</span></div>
  </div>
</template>

<script>
export default {
  name: "sellTime",
  props: ["startTime"],
  data: () => ({
    d: '',
    h: '',
    m: '',
    s: '',
  }),
  created() {
    this.countTime()
  },
  methods: {
    countTime: function () {
      //获取当前时间
      let timeNow = new Date()
      let yearNow = timeNow.getUTCFullYear()
      let monthNow = timeNow.getUTCMonth() + 1
      let dayNow = timeNow.getUTCDate()
      let hoursNow = timeNow.getUTCHours()
      let minutesNow = timeNow.getUTCMinutes()
      let secondsNow = timeNow.getUTCSeconds()
      let nowTime = [yearNow, monthNow, dayNow, hoursNow, minutesNow, secondsNow]
      let now = Date.UTC(...nowTime)
      //设置截止时间
      let time = this.startTime
      let year = time.substring(0, 4)
      let month = time.substring(5, 7)
      let day = time.substring(8, 10)
      let hours = time.substring(11, 13)
      let minutes = time.substring(14, 16)
      let seconds = time.substring(17, 19)
      let endTime = [year, month, day, hours, minutes, seconds]
      let end = Date.UTC(...endTime)

      //时间差
      var leftTime = end - now
      //定义变量 d,h,m,s保存倒计时的时间
      if (this.s === '00' && this.m === '00' && this.h === '00' && this.d === '00') {
        clearInterval(timer)
      }
      if (leftTime >= 0) {
        this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24)//天数我没用到，暂且写上
        this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
        this.m = Math.floor((leftTime / 1000 / 60) % 60)
        this.s = Math.floor((leftTime / 1000) % 60)
        if (this.s < 10) {
          this.s = '0' + this.s
        }
        if (this.m < 10) {
          this.m = '0' + this.m
        }
        if (this.h < 10) {
          this.h = '0' + this.h
        }
        if (this.d < 10) {
          this.d = '0' + this.d
        }

      }
      //递归每秒调用countTime方法，显示动态时间效果
      let timer = setTimeout(this.countTime, 1000)
    },
  }
}
</script>

<style scoped lang="scss">
.time {
  display: flex;
  justify-content: center;

  div {
    height: 50px;
    font-size: 36px;
    line-height: 50px;
    margin-right: 45px;

    span {
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      margin-left: 9px;
    }

    &.lastSellTime {
      margin-right: 0px;
    }
  }
}
</style>