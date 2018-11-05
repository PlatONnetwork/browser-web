//返回 天-小时-分钟-秒
export function timeDiff(beginTime, endTime) {
    let dateDiff = beginTime - endTime,//时间差的毫秒数
    //计算出相差天数
    dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)),
    leave1 = dateDiff % (24 * 3600 * 1000),//计算天数后剩余的毫秒数
    hours = Math.floor(leave1 / (3600 * 1000)),//计算出小时
    leave2 = leave1 % (3600 * 1000),//计算小时后剩余的毫秒数
    minutes = Math.floor(leave2 / (60 * 1000)),//计算相差分钟
    leave3 = leave2 % (60 * 1000),//计算分钟后剩余的毫秒数
    seconds = Math.round(leave3 / 1000)
    if (dayDiff === 0 && hours !== 0 && minutes !== 0) {
        return hours + '时' + minutes + '分'
    } else if (dayDiff === 0 && hours === 0 && minutes !== 0) {
        return  minutes + '分'
    } else if (dayDiff === 0 && hours === 0 && minutes === 0) {
        return seconds + '秒'
    } else {
        return dayDiff + '天' + hours + '时'
    }
}