document.getElementById("default").innerText = "Default: ";
document.getElementById("debounceOutput").innerText = "Debounced: ";
document.getElementById("throttleOutput").innerText = "Throttled: ";

const input = document.querySelector("input")
const defaultText = document.getElementById("default")
const debounceOutput = document.getElementById("debounceOutput")
const throttleOutput = document.getElementById("throttleOutput")

// this default one make fucking more network request ....

const updateDebounceText = debounce((text) => {
    debounceOutput.textContent = "Debounced: " + text
})

const updateThrottleText = throttle((text) => {
    throttleOutput.textContent = "Throttled: " + text
})

document.addEventListener("input", e => {
    defaultText.textContent = "Default: " + e.target.value
    updateDebounceText(e.target.value)
    updateThrottleText(e.target.value)
})

// debounce 
function debounce(callback, delay = 1000) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args)
        }, delay)
    }
}

function throttle(callback, delay = 1000) {
    let shouldwait = false;
    let waitingArgs;

    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldwait = false;
        } else {
            callback(...waitingArgs)
            waitingArgs = null;
            setTimeout(timeoutFunc, delay)
        }
    }

    return (...args) => {

        console.log(args)
        if (shouldwait) {
            waitingArgs = args;
            return
        }

        callback(...args)
        shouldwait = true;

        setTimeout(timeoutFunc, delay)
    }
}