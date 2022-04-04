/**
 * 跨进程通信
 */
// const { fork } = require('child_process');
const { macroTasksQueue, microTasksQueue } = require('./messageQueue');


// 主线程，负责处理消息/任务
(function mainTread() {
    setInterval(() => {
        let macroTask = macroTasksQueue.get();
        macroTask && macroTask();
        // 当主代码之行完之后，到达一个检查点，要检查此次宏任务执行过程中是否添加了微任务，如果有清空微任务
        let microTask;
        while (microTask = microTasksQueue.get()) {
            microTask();
        }
    }, 1000)
})();

// IO线程,负责放入消息/任务
// IO线程负责跟外卖的其他进程进行交互的
(function ioThread() {
    macroTasksQueue.put(() => {
        console.log('macroTask1')
        microTasksQueue.put(() => {
            console.log('microTask1');
            microTasksQueue.put(() => {
                console.log('microTask2')
            });
        });
    })
    macroTasksQueue.put(() => {
        console.log('macroTask2')
    })
})();


// 这种模型无法区分任务的优先级
// 为了处理新任务，我们引入了微任务，会在我们的主函数结束后，宏任务执行前执行

