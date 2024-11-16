// build promise classs

// this is enum
const STATE = {
    PENDING: "pending",
    SUCCESS: "success",
    REJECTED: "rejected"
}


class MyPromise {
    constructor(executeFunction) {
        this.val = null;
        this.state = STATE.PENDING
        this.successCallbacks = []
        this.failedCallbacks = []

        try {
            executeFunction(
                val => this.resolve(val),
                val => this.reject(val)
            )
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(val) {
        this.val = val;
        this.state = STATE.SUCCESS
        this.successCallbacks.forEach(cb => cb());
    }

    reject(val) {
        this.val = val;
        this.state = STATE.REJECTED
        this.failedCallbacks.forEach(cb => cb());

    }

    then(onResolve, onReject) {
        return new MyPromise((resolve, reject) => {

            const successCaller = () => {
                if (!onResolve) return resolve(this.val)

                try {
                    let val = onResolve(this.val);
                    resolve(onResolve)
                } catch (error) {
                    reject(error)
                }
            }

            const failedCaller = () => {
                if (!onReject) return reject(this.val)

                try {
                    let val = onReject(this.val);
                    resolve(onResolve)
                } catch (error) {
                    reject(error)
                }
            }
            switch (this.state) {
                case STATE.PENDING:
                    this.successCallbacks.push(successCaller)
                    this.failedCallbacks.push(failedCaller)
                    break;
                case STATE.SUCCESS:
                    successCaller()
                    break;
                case STATE.REJECTED:
                    failedCaller();
                    break;
                default:
                    throw new Error("State not defined")
            }
        })
    }

    catch(onReject) {
        return this.then(null, onReject)
    }
}