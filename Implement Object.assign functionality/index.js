// let aClone = { ...a }
// let aClone = Object.assign({}, a)

function objectAssign(target, ...sources) {

    if (target === null || target === undefined) {
        throw new Error("Invalid target")
    }

    let result = target;

    if (['number', 'string', 'boolean'].includes(typeof target)) {
        result = Object(target)
    }

    for (const source of sources) {
        if (source === null || source === undefined) continue
        const keys = [...Object.keys(source), ...Object.getOwnPropertySymbols(source).filter(item => {
            return Object.getOwnPropertyDescriptor(source, item).enumerable
        })]

        for (const Key of keys) {
            result[Key] = source[Key]
        }
    }

    return result
}


let a = {
    first: 1,
}

let b = objectAssign({}, a, 2);



console.log(Object.keys(1))