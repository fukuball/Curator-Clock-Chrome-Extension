function clearBadge() {

    chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
    chrome.browserAction.setBadgeText({
        text: ""
    });

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

            var phrase = shuffle(phraseArray('use_html'));

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