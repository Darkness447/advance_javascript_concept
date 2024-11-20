const timeoutIds = [];

// store the original method
const originalTimeoutFn = setTimeout;

//over-writing the original method
setTimeout = function (fn, delay) {
    const id = originalTimeoutFn(fn, delay);
    timeoutIds.push(id);
    return id;
}


setTimeout(() => {
    console.log("Hi my name is deepesh");
    setTimeout(() => {
        console.log("Hi my name is deepesh");
    }, 8000)

    setTimeout(() => {
        console.log("Hi my name is deepesh");
        ClearAllTimeout();
    }, 5000)
    console.log(timeoutIds)
}, 2000)


// now implement ClearAllTimeout:

function ClearAllTimeout() {
    timeoutIds.forEach((item) => {
        clearTimeout(item)
    })
}
