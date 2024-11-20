// Implementation of setTimeInterval

function createSetTimeInterval() {

    let id = 0;
    let timer = {};

    function SetInterval(cb, time, ...args) {
        id += 1;

        function triggerCallback() {
            timer[id] = setTimeout(() => {
                cb.apply(this, args);
                if (timer[id]) triggerCallback();
            }, time)

            console.log(timer[id])

        }

        triggerCallback();
        return id;
    }

    function myClearInterval(id) {
        clearTimeout(timer[id])
        delete timer[id]
    }
    return {
        SetInterval,
        myClearInterval
    }
}


const { SetInterval, myClearInterval } = createSetTimeInterval();

let timer = SetInterval((...props) => console.log("this is set interval", props), 1000, "deepesh", "agrawal");
