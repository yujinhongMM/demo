var ws = require('nodejs-websocket');
console.log('开始建立连接...')

ws.createServer(function (conn) {

    var timer = setTimeout(() => {
        clearTimeout(timer);
        conn.sendText('5秒了，服务器的值发生了变化，false =》 true')
    }, 5000)

    conn.on('text', function (str) {
        console.log('浏览器给服务端收到的信息为:' + str)
        conn.sendText('服务器下发的内容=>'+str)
    })
    conn.on('connect', function(code) {
        console.log('开启连接', code)
    })
    conn.on('close', function (code, reason) {
        console.log('关闭连接', code, reason)
    });
    conn.on('error', function (code, reason) {
        console.log('异常关闭', code, reason)
    });
}).listen(8001)

console.log('WebSocket建立完毕');