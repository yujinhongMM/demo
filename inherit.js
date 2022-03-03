// 原型继承
function Father() {
    this.a = 1;
    this.b = {};
}
Father.prototype.getA = function () {
    console.log(this.a)
}
function Child1() {
    this.c = 2
}
function Child2() {
    this.d = 2
}
Child1.prototype = new Father();
Child2.prototype = new Father();

let a = new Child1();
a.b = {xx: 1};
console.log('%c [ a ]-19', 'font-size:13px; background:pink; color:#bf2c9f;', a.b)

let b = new Child1();

console.log('%c [ b ]-19', 'font-size:13px; background:pink; color:#bf2c9f;', b.b)