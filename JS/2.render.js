// 引入事件循环，可以不断处理新的请求或者任务
const readline = require('readline-sync');
(function mainTread() {
    while(true) {
        let num1 = readline.question('num1:');
        let num2 = readline.question('num2:');
        let result = parseFloat(num1) + parseFloat(num2);
        console.log(result);
    }
})()

// 线程在同一个进程里可以共享数据
// 主线程负责执行任务，IO线程负责产生任务，它们怎么交互呢？
// 我们可以用一个消息队列让他们产生交互