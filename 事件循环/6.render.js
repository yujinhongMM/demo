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

// IO线程,负责放入消息/任务
// IO线程负责跟外卖的其他进程进行交互的
(function ioThread() {
    console.log("satrt", new Date());
    const timerId = setTimeoutFn(() => {
        console.log('setTimeout', new Date());
    }, 1000);
    clearTimeoutFn(timerId);
})();


// 这种模型无法区分任务的优先级
// 为了处理新任务，我们引入了微任务，会在我们的主函数结束后，宏任务执行前执行

