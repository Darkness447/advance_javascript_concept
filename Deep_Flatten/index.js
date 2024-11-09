// There are two approach iterative and recursive approach 
// part 1 only sort of multi-dimensional array
const arr = [[1, 2, undefined], [[[12, 3, 45, null]]]]

function flattenArray(args) {
    const flatten = [];

    if (Array.isArray(args)) {
        args.forEach(item => {
            const result = flattenArray(item);
            flatten.push(...result);
        })
    }
    else {
        flatten.push(args);
    }

    return flatten;
}


function flattenIterative(args) {
    const stack = [...args]
    const flattenList = [];

    while (stack.length) {
        const current = stack.shift();
        if (Array.isArray(current)) {
            console.log(...current)
            stack.unshift(...current)
        } else {
            flattenList.push(current)
        }
    }

    return flattenList;
}


// part 2 flatten objects
let arr2 = {
    a: 1,
    b: {
        c: 2,
        d: 3,
    },
    e: {
        f: 4,
        g: {
            h: 5,
        }
    }
}

function flattenObject(args) {
    let flattenObjectResult = {};

    for (let x in args) {
        if (typeof args[x] === "object") {
            const result = flattenObject(args[x]);
            flattenObjectResult = { ...flattenObjectResult, ...result };
        }
        else {
            flattenObjectResult[x] = args[x];
        }
    }

    return flattenObjectResult
}

// console.log(flattenObject(arr2))


// make output as {"bc":2,"bd":3}

function flattenObjectP3(args, prefix = '') {
    let result = {};
    for (const key in args) {
        const val = args[key]
        const prefixVal = prefix + key;

        if (typeof val === "object") {
            result = { ...result, ...flattenObjectP3(val, prefixVal) };
        } else {
            result[prefixVal] = val;
        }
    }

    return result
}

console.log(flattenObjectP3(arr2))