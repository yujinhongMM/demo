let timerCounter = 1;

class DelayTask {
    constructor(callback, delayTime) {
        this.id = timerCounter++; // 自增id
        this.startTime = Date.now(); // 开始时间
        this.callback = callback; // 回调函数
        this.delayTime = delayTime; // 延迟时间
    }
}

module.exports = DelayTask;