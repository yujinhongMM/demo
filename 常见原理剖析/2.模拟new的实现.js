function mockNew() {
    let Constructor = [].shift.call(arguments);
    // 不能写Object.create(null),因为这样产生的对象没有原型链
    let obj = {}; // 返回的结果
    obj.__proto__ = Constructor.prototype;
    let r = Constructor.apply(obj, arguments);
    // 如果当前构造函数返回的是一个引用类型，需要把这个对象返回
    return r instanceof Object ? r : obj;
}

function create(Con, ...args) {
    // 1.新建一个新的对象
    const obj = {};
    // 2.将新对象的原型指针__proto__指向构造函数的原型
    Object.setPrototypeOf(obj, Con.prototype); // 等同于obj.__proto__ = Con.prototype;
    // 3.改变构造函数的上下文this，并将剩余参数传入
    const result = Con.apply(obj,args);
    // 4.判断构造函数有没有返回值，有返回值返回返回值，没有返回新对象
    return result instanceof Object ? result : obj;
}