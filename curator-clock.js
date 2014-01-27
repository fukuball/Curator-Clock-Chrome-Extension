Date.prototype.yyyymmdd = function() {         
                            
    var yyyy = this.getFullYear().toString();                                    
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based         
    var dd  = this.getDate().toString();             
                        
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
};

Date.prototype.timeHourMinute = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
}

function shuffle(o) { //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function clearBadge() {

    chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
    chrome.browserAction.setBadgeText({
        text: ""
    });

}

function phraseArray() {
    return [
        '別忘了到<a href="http://curator.im/" target="_blank">小海嚴選正妹</a>來看我噢！',
        '快來<a href="http://curator.im/" target="_blank">小海嚴選正妹</a>看我噢！爸托爸托～',
        '你在看我嗎？那就快上<a href="http://curator.im/" target="_blank">小海嚴選正妹</a>！',
        '好多正妹都在<a href="http://curator.im/" target="_blank">小海嚴選正妹</a>噢！快來吧！',
        '你累了嗎？看看<a href="http://curator.im/" target="_blank">小海嚴選正妹</a>，讓你充滿元氣！',
        '我在<a href="http://curator.im/" target="_blank">小海嚴選正妹</a>等你喔！啾咪！',
        '在<a href="http://curator.im/" target="_blank">小海嚴選正妹</a>可以看到更多的我噢～',
        '拜託快來<a href="http://curator.im/" target="_blank">小海嚴選正妹</a>陪我嘛～',
        '休息一下，看一下<a href="http://curator.im/" target="_blank">小海嚴選正妹</a>！',
        '喝杯咖啡，逛逛<a href="http://curator.im/" target="_blank">小海嚴選正妹</a>！'
    ];
}

var girl_of_the_day_id = 0;
var girl_of_the_day_name = "";
var girl_of_the_day_image = "";
var girl_of_the_day_url = "";
var girl_of_the_day_date = "";

function getGirlOfTheDay() {

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

            var newDate = new Date();
            var current_hour_minute = newDate.timeHourMinute();

            girl_of_the_day_id = data.results[0].id;
            girl_of_the_day_name = data.results[0].name;
            girl_of_the_day_image = data.results[0].image;
            girl_of_the_day_url = data.results[0].url;
            girl_of_the_day_date = data.results[0].date;

            var phrase = shuffle(phraseArray());

            $('#phrase-block').html(
                girl_of_the_day_name+'：'+
                '現在時間 '+current_hour_minute+'，'+
                phrase[0]
            );

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

                    var newDate = new Date();
                    var current_hour = newDate.getHours();
                    var current_hour_image_index = parseInt(current_hour)%data.length;

                    girl_of_the_day_image = data[current_hour_image_index].image;

                    $("#girl-of-the-day-block").html(
                        '<div>'+
                            '<a href="'+girl_of_the_day_url+'" target="_blank">'+
                                '<img src="'+girl_of_the_day_image+'" alt="'+girl_of_the_day_name+'">'+
                            '</a>'+
                        '</div>'
                    );

                    $('#top-content-block').imagesLoaded( function() {
                        $('#top-content-block').css('display', 'block');
                        $('#loading-block').css('display', 'none');
                    });

                }

            });

        }

    });

}

function getGirls() {

    getGirlOfTheDay();
    clearBadge();

}

$(document).ready(function() {
    
    getGirls();

});