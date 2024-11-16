// build promise from scrath


const STATE = {
    FULLFILLED: "fullfilled",
    REJECTED: "rejected",
    PENDING: "pending"
}

class MyPromise {

    #thenCbs = []
    #catchCbs = []
    #state = STATE.PENDING
    #value
    #onSuccessBind = this.#onSuccess.bind(this)
    #onFailBind = this.#onFail.bind(this)

    constructor(cb) {
        try {
            cb(this.#onSuccessBind, this.#onFailBind)
        } catch (e) {
            this.#onFail(e);
        }
    }

    #runCallBacks() {
        if (this.#state === STATE.FULLFILLED) {
            this.#thenCbs.forEach(callback => {
                callback(this.#value)
            })

            this.#thenCbs = []
        }

        if (this.#state === STATE.REJECTED) {
            this.#catchCbs.forEach(callback => {
                callback(this.#value)
            })

            this.#catchCbs = []
        }
    }

    #onSuccess(value) {
        queueMicrotask(() => {
            if (this.#state === STATE.PENDING) {

                if (value instanceof MyPromise) {
                    value.then(this.#onSuccessBind, this.#onFailBind)
                    return
                }
                this.#value = value
                this.#state = STATE.FULLFILLED
                this.#runCallBacks();
            }
        })
    }

    #onFail(value) {

        queueMicrotask(() => {
            if (this.#state === STATE.PENDING) {

                if (value instanceof MyPromise) {
                    value.then(this.#onSuccessBind, this.#onFailBind)
                    return
                }

                if (this.#catchCbs.length === 0) {
                    throw new UncaugthPromiseError("value")
                }

                this.#value = value
                this.#state = STATE.REJECTED
                this.#runCallBacks();
            }
        })
    }


    then(thenCb, catchCb) {

        return new MyPromise((resolve, reject) => {
            this.#thenCbs.push(result => {
                if (thenCb === null) {
                    resolve(result)
                    return;
                }

                try {
                    resolve(thenCb(result))
                } catch (e) {
                    reject(e)
                }
            })

            this.#catchCbs.push(result => {
                if (catchCb === null) {
                    reject(result)
                    return;
                }

                try {
                    resolve(catchCb(result))
                } catch (e) {
                    reject(e)
                }
            })

            this.#runCallBacks()
        })
    }

    catch(cb) {
        return this.then(undefined, cb)
    }

    finally(cb) {
        return this.then(result => {
            cb();
            return result
        }, result => {
            cb();
            throw result
        })
    }


    static resolve(value) {
        return new Promise((resolve) => {
            resolve(value)
        })
    }


    static reject(value) {
        return new Promise((_, reject) => {
            reject(value)
        })
    }

    static all(promises) {
        const results = []
        let completedPromises = 0
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i]
                promise
                    .then(value => {
                        completedPromises++
                        results[i] = value
                        if (completedPromises === promises.length) {
                            resolve(results)
                        }
                    })
                    .catch(reject)
            }
        })
    }

    static allSettled(promises) {
        const results = []
        let completedPromises = 0
        return new MyPromise(resolve => {
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i]
                promise
                    .then(value => {
                        results[i] = { status: STATE.FULLFILLED, value }
                    })
                    .catch(reason => {
                        results[i] = { status: STATE.REJECTED, reason }
                    })
                    .finally(() => {
                        completedPromises++
                        if (completedPromises === promises.length) {
                            resolve(results)
                        }
                    })
            }
        })
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(resolve).catch(reject)
            })
        })
    }

    static any(promises) {
        const errors = []
        let rejectedPromises = 0
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i]
                promise.then(resolve).catch(value => {
                    rejectedPromises++
                    errors[i] = value
                    if (rejectedPromises === promises.length) {
                        reject(new AggregateError(errors, "All promises were rejected"))
                    }
                })
            }
        })
    }

}

class UncaugthPromiseError extends Error {
    constructor(error) {
        super(error)
        this.stack = `(in promise) ${error.stack}`
    }
}

module.exports = MyPromise

