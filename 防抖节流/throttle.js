// 获取返回值可以采用callback或者返回一个promise
/**
 * 
 * @param {*} func 
 * @param {*} wait 
 * @param {*} options 
 * leading 是否要执行第一次，第一次触发的事情的时候必须执行的回调
 * trailing 是否要执行最后一次
 * @returns 
 */
function throttle(func, wait, options = { leading: true, trailing: true }, callback = () => {}) {
    const { leading, trailing } = options;
    let timer;
    // 上一次回调执行的时间
    let lastExecTime = 0;
    const throttledFn = function(...args) {
        // 当前的时间戳
        const currentTime = Date.now();
        // 如果说lastExecTime=0说明当前是第一次，并且第一次不执行
        if (lastExecTime === 0 && !leading) {
            lastExecTime = currentTime;
        }
        // 下次要执行的时间 = 上次执行的时间 + 等待的时间;
        const nextExecTime = lastExecTime + wait;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (currentTime >= nextExecTime) {
            try {
                const result = func.apply(this, args);
                callback(result);
            } catch (error) {
                callback(error);
            }
            lastExecTime = currentTime;

        } else {
            if (trailing) {
                let remaining = nextExecTime - currentTime;
                timer = setTimeout(() => {
                    try {
                        const result = func.apply(this, args);
                        callback(result);
                    } catch (error) {
                        callback(error);
                    }
                    lastExecTime = currentTime;
                }, remaining);
            }
        }
    }
    throttledFn.cancel = function () {

    }
    return throttledFn;
}
module.exports = throttle;