Promise.resolve().then(() => {
    console.log(0);
    return new Promise((resolve) => {
        resolve('a');
        // resolve(new Promise((resolve) => {
        //     console.log('a2');
        //     resolve('a');
        // }));
    })
}).then(res => {
    console.log(res)
})
Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(4);
}).then(() => {
    console.log(5);
})
// 0 1 2 3  4 a 5

// [0, 1, micro, 2, micro, 3, 'hello']