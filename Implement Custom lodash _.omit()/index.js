// Note:  The _.omit() method is slower than the _.pick() method.
// _.omit(object, [paths])

function omit(obj, props) {
    const result = {};
    for (let key of Object.keys(obj)) {
        if (!props.includes(key)) {
            result[key] = obj[key];
        }
    }
    return result;
}
