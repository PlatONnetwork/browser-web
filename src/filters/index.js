import Vue from "vue";
import BigNumber from "bignumber.js";

// 数字国际千分位
const formatNumber = Vue.filter("formatNumber", (num, count) => {
  if (!num) {
    return "0";
  }
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  let str = num + "";
  if (str.indexOf(".") == -1) {
    return str.replace(reg, "$&,");
  } else {
    if (count) {
      str = Number(num)
        .toFixed(count)
        .toString();
    } else {
      str = Number(num)
        .toFixed(2)
        .toString();
    }
    return str.split(".")[0].replace(reg, "$&,") + "." + str.split(".")[1];
  }
});
// 数字国际千分位
const formatNumberUseFloor = Vue.filter("formatNumberUseFloor", (num, count) => {
  if (!num) {
    return "0";
  }
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  let str = num + "";
  if (str.indexOf(".") == -1) {
    return str.replace(reg, "$&,");
  } else {
    if (count) {
      str = Number(num)
        .toFixed(count)
        .toString();
    } else {
      str = (Math.floor(Number(num).toFixed(2) * 100) / 100).toString();
    }
    console.log(str);

    return str.split(".")[0].replace(reg, "$&,") + "." + str.split(".")[1];
  }
});
// 金额国际千分位
const formatMoney = Vue.filter("formatMoney", num => {
  if (!num) {
    return "0";
  }
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  let str = num + "";
  if (str.indexOf(".") == -1) {
    return str.replace(reg, "$&,");
  } else {
    return str.split(".")[0].replace(reg, "$&,") + "." + str.split(".")[1];
  }
});
// 百分比
const percentage = Vue.filter("percentage", (a, b) => {
  if (a && b && b != 0) {
    const x = (a / b) * 100;
    if (x % 1 == 0) {
      return x;
    }
    return parseFloat(x.toFixed(2));
  }
  return 0;
});
//超过1k,以K为单位，超过1000K，单位M，小数点2位
const unit = Vue.filter("unit", value => {
  if (value < 1000) {
    return value;
  } else if (1000 < value && value < 1000000) {
    return (value / 1000).toFixed(2) + "K";
  } else if (value > 1000000) {
    return (value / 1000000).toFixed(2) + "M";
  }
});

// 截取字符串
const sliceStr = Vue.filter("sliceStr", (str, num) => {
  return str ? (str.length > num ? str.slice(0, num) + "..." : str) : '';
});

const fromWei = Vue.filter('fromWei', (num, decimal) => {
  return new BigNumber(num).div(new BigNumber(10).pow(new BigNumber(decimal))).toFixed()
})

// 世界标准时间
const formatTime = Vue.filter("formatTime", data => {
  if (data) {
    const d = new Date();
    //本地时间与GMT时间的时间偏移差
    const offset = d.getTimezoneOffset() * 60000;
    //得到现在的格林尼治时间
    const utcTime = data + offset;
    return new Date(utcTime + 3600000 * (-d.getTimezoneOffset() / 60))
      .toString()
      .split("GMT")[0];
    // return new Date(data).toUTCString();
  }
  return "";
});

// 截取小数点前后
const sliceFloat = Vue.filter("sliceFloat", (str, num) => {
  const idx = str.indexOf(".");
  if (num == 0) {
    if (idx != -1) {
      return str.slice(0, idx + 1);
    } else {
      return str;
    }
  } else if (num == 1) {
    if (idx != -1) {
      return str.slice(idx + 1);
    } else {
      return "";
    }
  } else {
    return "";
  }
});

// 展示token 名称
const dealTokenName = Vue.filter("tokenName", (row, attrMap = ['name', 'symbol']) => {
  const emptyStr = '--'
  if (typeof row === "string") {
    return row || emptyStr
  }
  let name, symbol;
  name = row[attrMap[0]]
  if (!name) {
   return emptyStr 
  }
  symbol = row[attrMap[1]]
  if (!symbol) {
    return name
  }
  return `${name} (${symbol})`
});

export default [
  formatNumber,
  formatNumberUseFloor,
  percentage,
  unit,
  formatMoney,
  sliceStr,
  fromWei,
  formatTime,
  sliceFloat,
  dealTokenName 
];
