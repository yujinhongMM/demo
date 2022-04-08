// 如何让 (a == 1 && a == 2 && a == 3) 的值为true
let i = 1
Number.prototype.valueOf = function() {
    return i++
}
let a = new Number(1)
if (a == 1 && a == 2 && a == 3) {
    console.log('here')
}