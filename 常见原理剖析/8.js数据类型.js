// 在Javascript中，基本数据类型有哪几种？null是对象类型还是基本数据类型？
// number string boolean null undefined symbol （基本类型，原始数据类型）

var str = 'hello';
str[0] = 'z';
console.log(str); // => hello 原始值数据类型本身是无法改变的
// js中内存分为栈内存和堆内存
// 栈内存一般存储有固定大小和空间的内容，堆内存一般存储的是不固定的内容。
// js把字符串也存储在了栈内存中，字符串是个特例，因为字符串具有不变性。

// 计算机存储的时候把000开头的当成是object对象，但null比较特殊全是000，所以typeof就把它当成了obejct
console.log(typeof null === 'object');