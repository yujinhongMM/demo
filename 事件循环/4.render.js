/**
 * 跨进程通信
 */
const { fork } = require('child_process');
const { messageQueue } = require('./messageQueue');


// 主线程，负责处理消息/任务
(function mainTread() {
    setInterval(() => {
        let task = messageQueue.get();
        task && task();
    }, 1000)
})();

// IO线程,负责放入消息/任务
// IO线程负责跟外卖的其他进程进行交互的
(function ioThread() {
    // 打开浏览器主进程
    let browser = fork('./browser.js');
    browser.on('message', ({ type, data}) => {
        // 如果有用户点击了某个按钮，就会向消息队列中添加一个任务
        messageQueue.put(() => {
            console.log(data);
        })
    })
    browser.send({ type: 'click', data: 'clicked' });
})();


// 这种模型无法区分任务的优先级

// 为了处理新任务，我们引入了微任务，会在我们的主函数(前一个宏任务)结束后，宏任务(后一个宏任务)执行前执行

