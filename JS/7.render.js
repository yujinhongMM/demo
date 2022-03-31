/**
 * 跨进程通信
 */
const { fork } = require('child_process');
const DelayTask = require('./delayTask');
const { macroTasksQueue, microTasksQueue } = require('./messageQueue');
// 延迟队列
let delayTasksQueue = [];

function setTimeoutFn(callback, delayTime) {
    const delayTask = new DelayTask(callback, delayTime);
    delayTasksQueue.push(delayTask);
    return delayTask.id;
}

function clearTimeoutFn(id) {
    delayTasksQueue = delayTasksQueue.filter(item => item.id !== id);
}

function processDelayTasks() {
    delayTasksQueue = delayTasksQueue.filter((delayTask) => {
        const { callback, startTime, delayTime } = delayTask;
        if (Date.now() > startTime + delayTime) {
            macroTasksQueue.put(callback);
            return false;
        } else {
            return true;
        }
    })
}

// 主线程，负责处理消息/任务
(function mainTread() {
    setInterval(() => {
        let macroTask = macroTasksQueue.get();
        macroTask && macroTask();
        // 检查处理延迟队列
        processDelayTasks();
        // 当主代码之行完之后，到达一个检查点，要检查此次宏任务执行过程中是否添加了微任务，如果有清空微任务
        let microTask;
        while (microTask = microTasksQueue.get()) {
            microTask();
        }
    }, 10)
})();


class XMLHttpRequestFn {
    constructor() {
        this.options = {};
    }
    open(method, url) {
        this.options.method = method;
        this.options.url = url;
    }
    // 现在还是浏览器的主进程中，发http要靠网络进程
    send() {
        let network = fork('./network');
        network.on('message', (message) => {
            if (message.type === 'response') {
                this.response = message.data;
                // 把onload放到我们的宏任务队列里面去
                this.onload && macroTasksQueue.put(this.onload);
            }
        });
        network.send({
            type: 'send',
            options: this.options
        });
    }

}


// IO线程,负责放入消息/任务
// IO线程负责跟外卖的其他进程进行交互的
(function ioThread() {
    let xhr = new XMLHttpRequestFn();
    xhr.open('GET', 'http://127.0.0.1:3000/data');
    xhr.onload = () => {
        console.log(xhr.response);
    }
})();





