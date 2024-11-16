// ----- proxy ----> through something
// Object Refrences
// Object p1

// 

const p = {
    age: 18
}

// proxy box
// p.something go through proxy 

const p1 = {
    fname: "Piyush",
    lname: "Garg",
    age: 18,
};

// cool stuff
const p1Proxy = new Proxy(p1, {
    get(target, properties) {
        if (properties in target) {
            return target[properties]
        } else {
            throw new Error("Propertie is not present in the object")
        }
    }
    ,
    set(target, properties, val) {
        if (properties in target) {
            switch (val) {
                case "fname":
                    if (typeof val !== "string") throw new Error("propertie value should be string")
                    break;
                case "lname":
                    if (typeof val !== "string") throw new Error("propertie value should be string")
                    break;
                case "age":
                    if (val <= 0) throw new Error("Age should be valid value")
                    break;
                default:
                    break
            }

            Reflect.set(target, prop, val);
        }
        else {
            throw new Error("Propertie is not present in the object")
        }
    }


})



// Reflect
// 