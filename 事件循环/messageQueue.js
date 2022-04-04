class MessageQueue {
    constructor() {
        this.message = [];
    }
    put(message) {
        this.message.push(message);
    }
    get() {
        return this.message.shift();
    }
}

// exports.messageQueue = new MessageQueue();
exports.macroTasksQueue = new MessageQueue(); // 宏任务队列
exports.microTasksQueue = new MessageQueue(); // 微任务队列
// [1,2,3,4,5]