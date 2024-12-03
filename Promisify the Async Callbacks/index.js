function promisify(func) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            func(...args, (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            })
        })
    }
}

function getData(value, callback) {
    setTimeout(() => {
        if (value < 0) {
            callback(new Error('Negative value'));
        } else {
            callback(null, value * 2);
        }
    }, 1000);
}

const getDataPromise = promisify(getData);

getDataPromise(5)
    .then(result => {
        console.log('Result:', result);
    })
    .catch(err => {
        console.error('Error:', err);
    });

