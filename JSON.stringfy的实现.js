// 实现JSON.stringfiy
let a = {a1:'apply', a2: 1, a3: [1,2,3,4], a4: {b1: 'sss', b2: 1}, a5: [{c1: 'aa'},{c2: 'bb'}], a6: null, a7: {a8: null}}
let b = JSON.stringify(a); // "{"a1":"apply","a2":1,"a3":[1,2,3,4],"a4":{"b1":"sss","b2":1},"a5":[{"c1":"aa"},{"c2":"bb"}]}"
function stringfiy(param) {
    if (typeof param === 'string') {
        return '"' + param + '"';
    }
    if (param === null || Number.isNaN(param) || param === Infinity) {
        return String(null);
    }
    if (param instanceof Date) {
        return String(param.toJSON());
    }
    if (typeof  param === 'function' ||typeof param === 'undefined' || typeof param === 'symbol') {
        return String(undefined);
    }
    if (typeof param === 'number') {
        return param;
    }
    let isObject = Object.prototype.toString.call(param) === "[object Object]";
    let str = isObject ? '{' : '[';
    if (isObject) {
        for (let key in param) {
            str += '"' + key +  '"' + ':' + stringfiy(param[key]) + ',';
        }
    } else {
        param.forEach(item => {
            str += stringfiy(item) + ',';
        });
    }
    str = str.slice(0, str.length - 1);
    str +=isObject ? '}' : ']';
    return str;
}
function a1() {}
console.log(stringfiy(a))
console.log(JSON.stringify(a))
// console.log()
