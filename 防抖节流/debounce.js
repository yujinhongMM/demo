// 获取返回值可以采用callback或者返回一个promise
function debounce(func, wait, immediate = false, callback = () => { }) {
    let timer;
    // 是否第一次调用过了
    let immediateInvoked = false;
    const debouncedFn = function(...args) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (immediate && !immediateInvoked) {
            try {
                const result = func.apply(this, args);
                callback(result);
            } catch (error) {
                callback(error);
            } finally {
                immediateInvoked = true;
            }
        }
        timer = setTimeout(() => {
            try {
                const result = func.apply(this, args);
                callback(result);
            } catch (error) {
                callback(error);
            } finally {
                immediateInvoked = false;
            }
        }, wait);
    }
    debouncedFn.cancel = function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
            immediateInvoked = false;
        }
    }
    return debouncedFn;
}
module.exports = debounce;