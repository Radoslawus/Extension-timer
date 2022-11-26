// console.log(this)

chrome.alarms.create("Alarm1",
    {
        periodInMinutes: 1 / 60, // smaler than 1 is alowd only in developer mode
    }
)

chrome.alarms.onAlarm.addListener( alarm => {
    // console.log(alarm)
    chrome.storage.local.get(["timer", "isRunning"], res => {
        let time = res.timer ?? 0
        let isRunning = res.isRunning ?? false
        chrome.action.setBadgeText({
            text: `${time}`
        })
        if (!isRunning) {return}
        chrome.storage.local.set({
            timer: time + 1
        })
        
        chrome.storage.sync.get(["notificationTime"], res => {
            const notificationTime = res.notificationTime ?? 600
            if (time % notificationTime == 0) {
                this.registration.showNotification("Chrome Timer extension", {
                    body: ` ${notificationTime} sec has passed`,
                    icon: "icon.png",
                    silent: true
                })
            }
        })
    })
})