import moment from "moment";

export function countTime(d,h,m,s,endTime) {
    //获取当前时间
    var date = new Date()
    var now = date.getTime()
    //设置截止时间
    var endDate = new Date(endTime)
    var end = endDate.getTime()
    //时间差
    var leftTime = end - now
    //定义变量 d,h,m,s保存倒计时的时间
    if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24)//天数我没用到，暂且写上
        h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
        m = Math.floor((leftTime / 1000 / 60) % 60)
        s = Math.floor((leftTime / 1000) % 60)
        if (s < 10) {
            s = '0' + s
        }
        if (m < 10) {
            m = '0' + m
        }
        if (h < 10) {
            h = '0' + h
        }
        if (d < 10) {
            d = '0' + d
        }

    }
    //递归每秒调用countTime方法，显示动态时间效果
    setTimeout(this.countTime, 1000)
    return {s:s,m:m,h:h,d:d}
}


// 将返回的UTC标准时间戳改为本地时间的时间
// "2022-03-05T09:16:13.688036" -> 2022-03-05 17:16:13
export function utcTimeStringToLocalTimeString(utcstr) {
    return moment.utc(utcstr).local().format("YYYY-MM-DD HH:mm:ss")
}
