function a() {
    b();
}
function b() {
    c();
}

function c() {
    console.log('welcome');
}

a();
/**
 * 当我们的a执行的时候，会把a执行的这个执行上下放到执行栈ECS中去
 * 相当于一个栈行结构
 * ECS = [
 *      globalContext
 * ]; 
 * ECS.push(functionAcontext); 此时a又回去调用b，这时候又会产生一个b的执行上下文
 * ECS.push(functionBContext);
 * ECS.push(functionCContext);
 * 
 * ECS.pop();
 * ECS.pop();
 * ECS.pop();
 * 
 * [[scope]]
 */

// 作用域是在函数定义的时候就决定了，函数会保留一个内部属性[[scope]]，这个对象里面保存了所有的父变量对象，它找的时候会在当前的函数的执行上下文查找，如果找不到话就会向上去查找，一直找到我们的全局对象


function d1() {
    function d2() {
        function d3() {

        }
    }
}

/**
 * d1.[[scope]] = [
 *      globalContext.AO
 * ]
 * 
 * d2.[[scope]] = [
 *      d1Context.AO,
 *      globalContext.AO
 * ]
 * d3.[[scope]] = [
 *      d2Context.AO,
 *      d1Context.AO,
 *      globalContext.VO
 * ]
 */

// var e = 1;
// function sum() {
//     f = 2;
//     return e + f;
// }

// sum();


// sum.[[scope]] = {
//     globalContext.VO
// }


// ECS = [
//     globalContext,
//     sumContext
// ]

// sumContext = {
//     AO: {
//         aguments: {
//             length: 0
//         },
//         f: undefined
//     },
//     Scope: [A0, sum.[[scope]]]
// } 

// ECS.pop();

// 执行上下文栈存储着我们所有的执行上下文，它是一个栈形结构
// 作用域链，函数会内部保留一个scope属性，它会保存所有的父变量对象，在函数执行的时候，它会把我们的AO对象加进去，这样的话它在函数执行的时候回去找我们的AO对象，找不到的话会通过作用域链向上查找