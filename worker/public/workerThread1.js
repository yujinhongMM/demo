// 第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且只能加载 JS 脚本，否则报错
// 第二个参数是配置对象，该对象可选。它的一个作用就是指定 Worker 的名称，用来区分多个 Worker 线程
// var myWorker = new Worker('worker.js', { name : 'myWorker' })

self.onmessage = function (msg) {
    self.postMessage(msg.data);
}
