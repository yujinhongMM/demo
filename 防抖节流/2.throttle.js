// const { throttle } = require('lodash');
const throttle = require('./throttle');
const start = Date.now();
function logger(param) {
    console.log(Math.floor((Date.now() - start) / 1000) + 's');
    return param;
}
const throttled = throttle(logger, 2000,  { leading: true, trailing: false }, (res) => {console.log(res)});

setTimeout(() => {
    throttled(Date.now());
}, 1000)

setTimeout(() => {
    throttled(Date.now());
}, 2000)

setTimeout(() => {
    throttled(Date.now());
}, 3000)

setTimeout(() => {
    throttled(Date.now());
}, 4000)

setTimeout(() => {
    throttled(Date.now());
}, 5000)

// 防抖在规定的时间段里面，如果函数被再次触发，会重新计时
// 输入框搜索
// 按钮的重复点击
// 上拉滚动加载
// 用户的缩放事件
