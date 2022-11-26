const timeElem = document.getElementById('time')
const nameElem = document.getElementById('name')
const timerElem = document.getElementById('timer')
const startBtn = document.getElementById('start-timer')
const stopBtn = document.getElementById('stop-timer')
const resetBtn = document.getElementById('reset-timer')

startBtn.addEventListener('click', () => {
    chrome.storage.local.set({
        isRunning: true
    })
})

stopBtn.addEventListener('click', () => {
    chrome.storage.local.set({
        isRunning: false
    })
})

resetBtn.addEventListener('click', () => {
    chrome.storage.local.set({
        timer: 0,
        isRunning: false
    })
})

// chrome.action.setBadgeText({
//     text: "TIME",
// }, () => {
//     console.log("Finished setting badge text")
// })

chrome.storage.sync.get(["name"], res => {
    const name = res.name ?? "???"
    nameElem.textContent = `Your name is: ${name}`
})

function updateTime() {
    const currentTime = new Date().toLocaleTimeString()
    timeElem.textContent = `The time is: ${currentTime}`

    chrome.storage.local.get(["timer"], res => {
        const time = res.timer ?? 0
        timerElem.textContent = `The timer is at: ${time}`
    })
}

updateTime()
setInterval(updateTime,1000)
// console.log(this)