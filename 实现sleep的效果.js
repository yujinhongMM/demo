// 方法一：循环
function sleep(ms) {
    const expire = Date.now() + ms;
    while(Date.now() < expire);
    return;
}
// 方法二：通过promise来实现+定时器
function sleepPromise(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
// 调用
sleepPromise(5000).then(() => {
    // 在这里输出
    console.log("00000")
})
// 通过async封装
async function test(ms) {
    await new Promise(resolve => {
        setTimeout(resolve, ms)
    })
    console.log("hhhhh")
}

test(6000);
