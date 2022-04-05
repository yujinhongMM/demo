// const { debounce } = require('lodash');
const debounce = require('./debounce');
const start = Date.now();
function logger(...args) {
    console.log(this);
    console.log(args);
    console.log(Math.floor((Date.now() - start) / 1000) + 's');
    return Date.now();
}
const debounced = debounce(logger, 2000, true, (res) => { console.log (res)});
let obj = {
    name: 'zhans',
    debounced
}
setTimeout(() => {
    obj.debounced(1000);
}, 1000)

setTimeout(() => {
    obj.debounced();
}, 2000)

setTimeout(() => {
    obj.debounced();
}, 3000)

setTimeout(() => {
    obj.debounced();
}, 4000)

setTimeout(() => {
    obj.debounced();
    obj.debounced.cancel(); // 调用cancel方法可以取消执行回调
}, 5000)

// 防抖在规定的时间段里面，如果函数被再次触发，会重新计时
// 输入框搜索
// 按钮的重复点击
// 上拉滚动加载
// 用户的缩放事件
