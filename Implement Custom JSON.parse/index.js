// JSON.parse()


function jsonParse(input) {

    switch (input) {
        case "null":
            return null
        case "{}":
            return {}
        case "[]":
            return []
        case "true":
            return true
        case "false":
            return false
    }

    if (input[0] === '"') {
        return input.slice(1, -1)
    }

    if (input[0] === "[") {
        return input.slice(1, -1).split(",").map((x) => jsonParse(x));
    }

    if (input[0] === "{") {
        return input.slice(1, -1).split(",").reduce((acc, item) => {
            const index = item.indexOf(":")
            const key = item.slice(0, index);
            const value = item.slice(index + 1);
            acc[jsonParse(key)] = jsonParse(value);
            return acc
        }, {})
    }

}