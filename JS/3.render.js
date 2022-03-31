const { messageQueue } = require('./messageQueue');

// 主线程，负责处理消息/任务
(function mainTread() {
    setInterval(() => {
        let task = messageQueue.get();
        task && task();
    }, 1000)
})();

// IO线程,负责放入消息/任务
(function ioThread() {
    let counter = 1;
    setInterval(() => {
        messageQueue.put(() => {
            console.log(`task` + counter++);
        })
    }, 1000)
})();


// IPC 进程间的交互
// 浏览器进程会通过IPC通知我们的渲染进程中的IO线程，然后IO线程通过向队列里面放任务，渲染进程的主线程再去消费任务