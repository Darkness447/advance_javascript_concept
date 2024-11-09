function pipe(...fns) {
    return (value) => {
        fns.forEach(fn => value = fn(value));
        return value;
    }
}

const firstFriend = pipe(val => val.friend, val => val[0])

const data = {
    "friend": [1, 2, 3, 4]
}

console.log(firstFriend(data))

