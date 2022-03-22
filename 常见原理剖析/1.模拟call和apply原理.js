Function.prototype.call = function (context) {
    context = context ? Object(context) : window;
    context.fn = this;
    let args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']');
    }
    // 利用数组的toString的特性
    let r = eval('context.fn(' + args + ')');
    delete context.fn;
    return r;
}

Function.prototype.apply = function (context, args) {
    context = context ? Object(context) : window;
    context.fn = this;
    if (!args) {
        return context.fn();
    }
    // 利用数组的toString的特性
    let r = eval('context.fn(' + args + ')');
    delete context.fn;
    return r;
}