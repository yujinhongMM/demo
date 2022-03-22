// 1) bind方法可以绑定this指向
// 2) bind方法返回一个绑定后的函数(高阶函数)
// 3) 可以在bind调用的时候传递参数，也可以对bind返回的函数传递参数
// 4) 对返回的函数还可以进行new的操作，此时this是指向的是当前函数的实例
// 5) new后的实例可以访问原有类的原型
Function.prototype.bind = function (context) {
    let that = this;
    let bindArgs = Array.prototype.slice.call(arguments, 1);
    function Fn() {} // Object.create原理
    function fBound() { // this
        let args = Array.prototype.slice.call(arguments);
        return that.apply(this instanceof fBound ? this : context, bindArgs.concat(args));
    }
    // 用第三方变量去链接我们的原型 代替 fBound.prototype = this.prototype; 它的好处就是两个类的原型并没有公用
    Fn.prototype = this.prototype;
    // 用原型链的方式找到我们父类中的属性
    fBound.prototype = new Fn();
    return fBound;
}