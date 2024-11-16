// if 5 request are allowed int api per time then how to call 100 api's using promise .all will fetch 100 api's at one time
// throttlePromises can be implemented

function fetchPromise(value, error) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (error) {
                reject()
            }
            resolve(value)
        }, 5000)

    })
}

function throttleAsync(func, max) {

    return new Promise((resolve, reject) => {
        let concurrentCount = 0;
        let lastCalledIndex = -1;
        const result = [];

        const fetchNext = (func) => {

            if (lastCalledIndex + 1 === func.length) return
            const next = func[lastCalledIndex + 1];

            if (!next) {
                return
            }

            concurrentCount += 1;

            next.then((data) => {
                result[lastCalledIndex + 1] = data;
                concurrentCount -= 1;
                lastCalledIndex += 1;

                if (result.length === func.length) {
                    resolve(result)
                }

                if (concurrentCount < max) {
                    fetchNext(func);
                }

            }, (err) => {
                reject(err)
            })

        }

        fetchNext(func);
    })
}


throttleAsync([fetchPromise(200)], 5).then((data) => {
    console.log(data)
}).catch((err) => {
    console.error(err)
})