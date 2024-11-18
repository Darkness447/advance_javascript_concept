console.log(typeof "deepesh")
console.log(typeof 12)
console.log(typeof {})

console.log(typeof function () { })

function myTypeOf(value) {
    if (value === undefined) {
        return 'undefined';
    }
    if (value === null) {
        return 'object'; // Special case as per JavaScript specification
    }

    const typeTag = Object.prototype.toString.call(value);

    switch (typeTag) {
        case '[object Boolean]':
            return 'boolean';
        case '[object Number]':
            return 'number';
        case '[object String]':
            return 'string';
        case '[object Symbol]':
            return 'symbol';
        case '[object BigInt]':
            return 'bigint';
        case '[object Function]':
        case '[object AsyncFunction]':
        case '[object GeneratorFunction]':
            return 'function';
        default:
            return 'object';
    }
}
