function fetchPromise(value, error) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (error) {
                reject(new Error(`Error: ${value}`));
            }
            resolve(value);
        }, 5000);
    });
}

function PromiseAllSettledWrapper(promises) {
    const results = new Array(promises.length);
    let completed = 0;

    return new Promise((resolve) => {
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((value) => {
                    results[index] = { status: "fulfilled", value };
                })
                .catch((reason) => {
                    results[index] = { status: "rejected", reason };
                })
                .finally(() => {
                    completed++;
                    if (completed === promises.length) {
                        resolve(results);
                    }
                });
        });
    });
}



// Test Case
PromiseAllSettledWrapper([fetchPromise(100), fetchPromise(200, true), fetchPromise(300)])
    .then((result) => {
        console.log("All Settled Results:", result);
    })
    .catch((error) => {
        console.error("Unexpected Error:", error);
    });
