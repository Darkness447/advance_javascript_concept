

const button = document.querySelector("button")

button.addEventListener("custom:doubleClicked", e => {
    console.log("button", e?.detail)
})


const MAX_TIME_BETWEEN_DC = 500;
let lastClick = 0

button.addEventListener("click", (e) => {
    const timeBetweenClick = performance.now() - lastClick
    console.log("timeBetweenClick", timeBetweenClick)
    if (timeBetweenClick > MAX_TIME_BETWEEN_DC) {
        lastClick = performance.now()
        return
    }

    const myEvent = new CustomEvent("custom:doubleClicked", {
        detail: {
            name: timeBetweenClick
        }
    })

    e.target.dispatchEvent(myEvent)
    lastClick = 0
})

