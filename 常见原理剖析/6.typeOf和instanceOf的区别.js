// typeof和instanceOf的区别

// 1）typeof 6中 typeof null === 'object'
// 2) [] {} reg function


// typeof 不能准确的返回对象的具体类型
console.log(typeof []);
console.log(typeof new RegExp('/A/'));
console.log(typeof function () {});
console.log(typeof null);

// 缺点只能检测当前已经存在的类型，不能检验自定义类型
console.log(Object.prototype.toString.call(function () {}))
console.log(Object.prototype.toString.call(null))


class A {}
// inastanceof
console.log([] instanceof Array);
console.log([] instanceof Object);
const a = new A();
console.log(a instanceof A);

// 利用__proto__
console.log([].__proto__ === Array.prototype);
console.log([].__proto__.__proto__ === Object.prototype);


// 自己实现instanceof
function instanceOf(A, B) {
    prototype = B.prototype;
    while (1) {
        if (A.__proto__ === prototype) {
            return true;
        }
        if (A.__proto__ === null) {
            return false;
        }
        A = A.__proto__;
    }
}

console.log(instanceOf(a, A));

let str = 'hello';
console.log(str instanceof String); // => false
console.log(String[Symbol.hasInstance](str));

class ValidateStr {
    static [Symbol.hasInstance](x) {
        return typeof x === 'string';
    }
}

console.log('hello' instanceof ValidateStr);


// 找对象的constructor