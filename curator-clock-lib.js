Date.prototype.timeMinute = function () {
     return ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
}

Date.prototype.timeSecond = function () {
     return ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

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

function phraseArray(mode) {

    var link_text = '';
    if (mode=='use_html') {
        link_text = '<a href="http://curator.im/" target="_blank">小海嚴選正妹</a>';
    } else {
        link_text = '小海嚴選正妹';
    }

    return [
        '別忘了到'+link_text+'來看我噢！',
        '快來'+link_text+'看我噢！爸托爸托～',
        '你在看我嗎？那就快上'+link_text+'！',
        '好多正妹都在'+link_text+'噢！快來吧！',
        '你累了嗎？看看'+link_text+'，讓你充滿元氣！',
        '我在'+link_text+'等你喔！啾咪！',
        '在'+link_text+'可以看到更多的我噢～',
        '拜託快來'+link_text+'陪我嘛～',
        '休息一下，看一下'+link_text+'！',
        '喝杯咖啡，逛逛'+link_text+'！'
    ];
}