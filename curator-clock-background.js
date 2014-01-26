Date.prototype.timeMinute = function () {
     return ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
}

function updateBadge() {
    
    var newDate = new Date();
    var datetime = newDate.timeMinute();

    if (datetime=="00") {
        
        chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
        chrome.browserAction.setBadgeText({
            text: "N"
        });
        
    }
    
}

var pollInterval = 1000;

function startClock() {
  updateBadge();
  window.setTimeout(startClock, pollInterval);
}
function stopClock() {
  window.clearTimeout(timerId);
}

startClock();