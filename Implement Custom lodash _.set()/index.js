// lodash things

function set(obj, path, value) {
    path = Array.isArray(path) ? path : path.replace('[', '.').replace(']', '').split('.');
    src = obj;
    path.forEach((key, index, array) => {
        if (index == path.length - 1) {
            src[key] = value;
        } else {
            if (!src.hasOwnProperty(key)) { // if the key doesn't exist on object
                const next = array[index + 1];
                src[key] = String(Number(next)) === next ? [] : {}; // create a new object if next is item in array is not a number
            }
            src = src[key];
        }
    })
}
