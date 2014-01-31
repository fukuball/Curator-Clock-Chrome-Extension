function updateBadge() {
    
    var newDate = new Date();
    var current_minute = newDate.timeMinute();
    var current_second = newDate.timeSecond();

    if (current_minute=="00" && current_second=="00") {
        
        chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
        chrome.browserAction.setBadgeText({
            text: "N"
        });

        $.ajax({
    
            url: "http://curator.im/api/girl_of_the_day/",
            type: "GET",
            data: {
                token : "53b7c0f21db84334b9aaaaccb7d2538e",
                format : "json",
            },
            dataType: "json",
            beforeSend: function( xhr ) {
                //console.log('loading');
            },
            success: function(data) {

                var current_hour_minute = newDate.timeHourMinute();

                var girl_of_the_day_id = data.results[0].id;
                var girl_of_the_day_name = data.results[0].name;
                var girl_of_the_day_image = data.results[0].image;
                var girl_of_the_day_url = data.results[0].url;
                var girl_of_the_day_date = data.results[0].date;

                $.ajax({
                    
                    url: "http://curator.im/api/girl_of_the_day/"+girl_of_the_day_date+'/',
                    type: "GET",
                    data: {
                        token : "53b7c0f21db84334b9aaaaccb7d2538e",
                        format : "json",
                    },
                    dataType: "json",
                    beforeSend: function( xhr ) {
                        //console.log('loading');
                    },
                    success: function(data) {

                        var current_hour = newDate.getHours();
                        var current_hour_image_index = parseInt(current_hour)%data.length;

                        var phrase = shuffle(phraseArray());

                        girl_of_the_day_image = data[current_hour_image_index].image;

                        // Create a simple text notification:
                        var notification = webkitNotifications.createNotification(
                          girl_of_the_day_image,  // icon url - can be relative
                          '小海嚴選正妹報時',  // notification title
                          girl_of_the_day_name+'：'+
                          '現在時間 '+current_hour_minute+'，'+phrase[0]+
                          ' (請點擊小海嚴選 icon 看大圖)' 
                        );

                        // Then show the notification.
                        notification.show();

                    }

                });
                
            }

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