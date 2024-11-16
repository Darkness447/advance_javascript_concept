const data = {
    username: "snippet",
    password: {
        name: "Deepesh",
        age: [1, 2, 3, 4, "name"]
    }
}

const serializedObject = JSON.stringify(data)
console.log(serializedObject)

const deserializedObject = JSON.parse(serializedObject)
console.log(deserializedObject)

function stringify(obj) {
    if (typeof obj === "string") {
        return `"${obj}"`
    }

    if (typeof obj === "number" || typeof obj === "boolean") {
        return `${obj}`
    }

    if (Array.isArray(obj)) {
        let res = "["
        for (let i = 0; i < obj.length; i++) {
            res += `${stringify(obj[i])},`;
        }

        res = `${res.substring(0, res.length - 1)}]`;
        return res;
    }

    let res = "{";
    for (let key in obj) {
        res += `"${key}":${stringify(obj[key])},`
    }

    res = `${res.substring(0, res.length - 1)}}`;
    return res;
}

console.log(stringify(data))