// Implement Promise.all    

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


function PromiseAllWrapper(args) {
    const result = [];

    return new Promise((resolve, reject) => {
        for (let x of args) {
            x.then((data) => {
                result.push(data)
                if (result.length === args.length) {
                    resolve(result)
                }
            }).catch((error) => {
                reject("Something went Wrong")
            })

        }


    })
}

// async function PromiseAllWrapper(promises) {
//     const results = [];
//     // Wrapping each promise to collect results or propagate errors.
//     for (const promise of promises) {
//         try {
//             const data = await promise; // Wait for each promise
//             results.push(data);
//         } catch (error) {
//             throw error; // Propagate error immediately on first rejection
//         }
//     }

//     return results;
// }

PromiseAllWrapper([fetchPromise(100), fetchPromise(200)]).then((result) => {
    console.log(result)
}).catch(error => {
    console.warn("Error:", error)
})


