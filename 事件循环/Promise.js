const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
function resolvePromise(promise, x, resolve, reject) {
    if (promise == x) {
        return reject(new TypeError(`TypeError: Chaining cycle detected for promise #<myPromise> `));
    }
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called = false;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                //queueMicrotask(() => {
                then.call(x, y => {
                    if (called) return;
                    called = true
                    resolvePromise(promise, y, resolve, reject);
                }, r => {
                    if (called) return;
                    called = true
                    reject(r)
                })
                //});
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true
            reject(e);
        }
    } else {
        resolve(x)
    }
}
class Promise {
    constructor(executor) {
        this.status = PENDING;// promise鐨勯粯璁ょ姸鎬�
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (value) => {
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.status == PENDING) {
                this.value = value;
                this.status = FULFILLED
                this.onResolvedCallbacks.forEach(cb => cb(this.value))
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(cb => cb(this.reason))
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }
        let p1 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                queueMicrotask(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(p1, x, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                })
            }
            if (this.status === REJECTED) {
                queueMicrotask(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(p1, x, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                })
            }
            if (this.status == PENDING) {
                this.onResolvedCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(p1, x, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    })
                });
                this.onRejectedCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(p1, x, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    })
                })
            }
        });
        return p1;
    }
    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }
    static reject(value) {
        return new Promise((resolve, reject) => {
            reject(value)
        })
    }
}
module.exports = Promise;