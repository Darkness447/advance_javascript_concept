function wrapper(args) {
    const n = args.length;
    for (let i = n - 1; i >= 0; i--) {
        args[-1 * (n - i)] = args[i];
    }

    return args
}

const arr = [1, 2, 3, 4, 5]
const negativeWrapper = wrapper(arr);




console.log(negativeWrapper[-4])
console.log(negativeWrapper[-3])
console.log(negativeWrapper[-2])
console.log(negativeWrapper[-1])

const legacyFontSize = {}
// using javascript proxy 
const proxyOptions = {
    get: (target, propName, receiver) => {
        if (propName in legacyFontSize) {
            console.warn("deprecated")
            return legacyFontSize[propName].replacementValue;
        }
        return Reflect.get(target, propName, receiver)
    }
}

const proxiedFontSizes = new Proxy({}, proxyOptions)

