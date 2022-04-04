process.on('message', ({ type, data }) => {
    setTimeout(() => {
        process.send({ type, data });
    }, 1000)
})