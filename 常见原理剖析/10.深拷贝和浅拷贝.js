// 深拷贝 拷贝后的结果是不会影响拷贝前的 拷贝前后是没有关系的
// 浅拷贝 改变拷贝前的内容，可能会对拷贝后的产生影响，反之亦然，它们可能互相影响

let obj = {name: 'jw'}

let o = {...obj}
obj.name = 'hello'
console.log(obj, o)

let a = [1,2,3];
let arr = [a];
let newArr = arr.slice();
newArr[0][0] = 100;
console.log(arr);

// ...运算符只能拷贝一层，一层的时候是深拷贝，多层的时候是钱拷贝
// 数组的slice方法也是浅拷贝

// 深拷贝
let obj = { name: 'jw', address: {x: 100, y: 100}}
let oo = JSON.parse(JSON.stringify(obj));
// JSON.parse(JSON.stringify) 不能拷贝函数， undefined等，不能实现复杂的拷贝

// 实现一个深拷贝，实现一个递归拷贝
function deepClone(obj, hash = new WeakMap) {
    if (obj == null) return obj; // 如果是null或者undefined我就不进行拷贝操作
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    // 可能是对象或者普通的值, 如果是函数的话是不需要深拷贝的
    if (typeof obj !== 'object') return obj;
    // 是对象的化就要进行深拷贝
    // [] {}
    // 解决循环引用
    if (hash.get(obj)) return hash.get(obj);
    let cloneObj = new obj.constructor;
    hash.set(obj, cloneObj);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 实现一个递归拷贝
            cloneObj[key] = deepClone(obj[key]);
        }
    }
    return cloneObj;
}

// 有个缺点是循环引用的时候会爆栈



