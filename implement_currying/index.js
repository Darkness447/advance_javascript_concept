function add(a, b) {
    return a + b
}

function addClosure(a) {
    return function (b) {
        return function (c) {
            return a + b + c
        }
    }
}

// console.log(addClosure(1)(2)(3)) --> 6 returned
// this type of call is called currying


// infinite currying
// use recurssion

function addInfinite(a) {
    return function (b) {
        if (b) return addInfinite(a + b);
        return a;
    }
}


// currying with placeholder
function curry(fn) {
    return function curried(...args) {
        // if number of arguments match
        if (isArgsMet(args, fn, curry.placeholder)) {
            return fn.call(this, ...args)
        }
        // otherwise return a function which merges the args
        return function (...nextArgs) {
            const mergedArgs = mergeArgs(args, nextArgs, curry.placeholder)
            return curried.call(this, ...mergedArgs)
        }
    }
}
curry.placeholder = Symbol()
function mergeArgs(argsTo, argsFrom, placeholder) {
    const mappedArgsTo = argsTo.map((item) =>
        item === placeholder && argsFrom.length ? argsFrom.shift() : item
    )
    return [...mappedArgsTo, ...argsFrom]
}

function isArgsMet(args, fn, placeholder) {
    if (args.length < fn.length) {
        return false
    }
    return args.slice(0, fn.length).every((item) => item !== placeholder)
}