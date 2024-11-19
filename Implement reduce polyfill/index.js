// how reduce works 

arr = [1, 2, 3, 4, 5, 6]

Array.prototype.myReduce = function (callback, initialValue) {

    if (!this.length && initialValue === undefined) {
        throw new TypeError("Reduce of empty initial array")
    }

    let lastValue = initialValue;

    for (let i = 0; i < this.length; i++) {
        lastValue = callback(lastValue, this[i], i, this);
    }

    return lastValue
}

const reduce = arr.myReduce((acc, current, index, array) => {
    console.log(acc);
    return current + acc
}, "")

