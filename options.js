const nameInput = document.getElementById("name-input")
const saveBtn = document.getElementById("save-btn")
const currentName = document.getElementById("current-name")
const timeInput = document.getElementById("time-input")

saveBtn.addEventListener('click', () => {
    const name = nameInput.value
    const notificationTime = timeInput.value
    chrome.storage.sync.set({
        name,
        notificationTime
    }, () => {
        console.log(`Name is set to ${name}`)
    })
})

chrome.storage.sync.get(["name", "notificationTime"], res => {
    currentName.innerText = res.name ?? "???"
    timeInput.value = res.notificationTime ?? "not set"
})