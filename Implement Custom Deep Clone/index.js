deepClone = function (obj) {
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof String) { return new String(obj); }
    if (obj instanceof Date) { return new Date(obj); }
    if (obj instanceof Number) { return new Number(obj); }
    if (obj instanceof RegExp) { return new RegExp(obj); }
    if (obj instanceof Boolean) { return new Boolean(obj); }

    var clone = {};
    if (obj instanceof Array) {
        clone = new Array(obj.length);
    }

    for (var key in obj) {
        clone[key] = deepClone(obj[key]);
    }

    return clone;
};

const obj =
{
    string: 'primitive string',
    stringObj: new String('string object'),
    number: 100,
    numberObj: new Number(100),
    bigInt: BigInt("9007199254740991"),
    nan: NaN,
    array: [1, 2, 3],
    arrayObj: new Array(2),
    bool: false,
    boolobj: new Boolean(false),
    nul: null,
    date: new Date(),
    undef: undefined,
    inf: Infinity,
    regExp: /(\w+)\s(\w+)/
}

console.log(deepClone(obj));