Function.prototype.call0 = function (context) {
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

function  fn1(a, b) {
    console.log(this);
    console.log(a,b)
}

fn1.call0('hello', '1', '2');

fn1.call('hello', '1', '2');