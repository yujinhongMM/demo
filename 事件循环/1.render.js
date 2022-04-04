// 模拟渲染进程中的主进程
// 缺点只能按步就班，只能按书讯执行，无法跟用户进行交互
(function mainTread() {
    let task1 = 1 + 2;
    let task2 = 2 + 3;
    let task3 = 3 + 4;
    console.log(task1, task2, task3);
})()