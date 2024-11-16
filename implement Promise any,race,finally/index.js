// promise . any all will get rejected
// promise .any see first promise that will resolved or all are rejected

Promise.myAny = function (promises) {
    return new Promise((resolve, reject) => {

        let rejectedCount = 0;
        let rejected = []

        if (promises.length === rejectedCount) {
            reject(new AggregateError(rejected))
        }

        promises.forEach(item => {
            item.then((value) => {
                resolve(value)
            }).catch((error) => {
                rejectedCount++;
                rejected.push(error)
                if (promises.length === rejectedCount) {
                    reject(new AggregateError(rejected))
                }
            })
        })
    })
}

Promise.myAny([]).then((value) => {
    console.log(value)
}).catch(error => {
    console.log(error)
})

// promise .race condition
// it will resolve or reject as soon as one  value is resolve of reject
// easy implementation

// promise .finally condition
// finally usecases are generally to close the file or to stop the loading

function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("successfull")
        }, 5000)
    })
}

getData().then((value) => {
    console.log(value)
})


function myFinally(promise, onFinally) {
    return promise.then((value) => {
        Promise.resolve(onFinally()).then(resolve(value));
    }, (reason) => {
        Promise.resolve(onFinally()).then(resolve(reason));
    })
}