const DeepEqual = (a, b) => {
    if (Number.isNaN(a) && Number.isNaN(b)) {
        return true
    }

    if (typeof a !== typeof b) {
        return false;
    }

    if ((typeof a !== "object" && typeof b !== "object") || (a === null && b === null)) {
        return a === b
    }

    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }

    for (const key of Object.keys(a)) {
        if (!DeepEqual(a[key], b[key])) {
            return false;
        }
    }


    return true
}

const arr = [1, 2, 4];

const check = DeepEqual(arr, [...arr, 1, 3])

console.log(check)