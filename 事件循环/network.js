// let url = require('url');
let http = require('http');
process.on('message', (message) => {
    let { type, options } = message;
    if (type === 'send') {
        let urlObj = new URL(options.url);
        const config = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.pathname,
            method: options.method
        }
        let req = http.request(config, (res) => {
            let chunks = [];
            res.on('data', (data) => {
                chunks.push(data);
            });
            res.on('end', () => {
                process.send({
                    type: 'response',
                    data: JSON.parse(Buffer.concat(chunks).toString())
                })
            })
        })
        req.on('error', (err) => {
            console.error(err);
        });
        req.end();
    }
})