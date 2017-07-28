var timerId = 0; // process ID for RTC

var fsd = new Date("2017-09-07T00:00:00Z"); // florida start date
var fed = new Date("2017-09-11T00:00:00Z"); // florida end date

Date.prototype.addDays = function (days) {
    var dt = new Date(this.valueOf());
    dt.setDate(dt.getDate() + days);
    return dt;
}

$(function () {
    $('#rtc-btn').click(function () {
        if (timerId) {
            stopRealTimeCountdown();
        }
        else {
            startRealTimeCountdown();
        }
    });

    $('#florida-start-date').html(formatDate(fsd));
    $('#florida-end-date').html(formatDate(fed));
    showTimeRemaining();
});

function startRealTimeCountdown() {
    $('#rtc-btn').html('Stop real-time countdown');
    $('#rtc-btn').removeClass('btn-success').addClass('btn-danger');

    timerId = setInterval(showTimeRemaining, 1000);
}

function stopRealTimeCountdown() {
    clearInterval(timerId);
    timerId = 0;

    $('#rtc-btn').html('Start real-time countdown');
    $('#rtc-btn').removeClass('btn-danger').addClass('btn-success');
}

function showTimeRemaining() {
    var now = new Date();

    if (now >= fed) {
        $('#total-days').html('It\'s over <i class="fa fa-frown-o"></i>');
        $('#working-days').hide();
        $('#precise-ctr').hide();
    }
    else if (now < fsd) {
        // here is the countdown
        var days = dateDiffDays(now, fsd);
        $('#total-days').html(days + ' days');

        days = dateDiffWeekdays(now, fsd);
        $('#working-days').html(days + ' weekdays');

        var dp = dateDiffFull(now, fsd);
        $('#precise-time').html(dp.days + ' days, ' + dp.hours + ' hours, ' +
            dp.minutes + ' minutes, ' + dp.seconds + ' seconds');
    }
    else {
        // little easter egg...
        $('#total-days').html('We\'re in Florida! <i class="fa fa-smile-o"></i>');
        $('#working-days').hide();
        $('#precise-ctr').hide();
    }
}

function formatDate(dt) {
    return dt.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function dateDiffFull(dt1, dt2) {
    var diff = Math.abs(dt2 - dt1) / 1000; // difference in SECONDS

    var days = Math.floor(diff / 86400); // (60 * 60 * 24) = 86400
    diff -= days * 86400;

    var hours = Math.floor(diff / 3600);
    diff -= hours * 3600;

    var minutes = Math.floor(diff / 60) % 60;
    diff -= minutes * 60;

    var seconds = Math.floor(diff % 60);

    return {
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds                    
    };
}

function dateDiffDays(dt1, dt2) {
    var msDiff = Math.abs(dt2 - dt1);
    return Math.floor(msDiff / (1000 * 60 * 60 * 24));
}

function dateDiffWeekdays(dt1, dt2) {
    // a not very elegant brute-force approach; ok for small ranges!
    var tmpDt = dt1;
    var diff = 0;
    while (tmpDt <= dt2) {                
        if ((tmpDt.getDay() != 0) && (tmpDt.getDay() != 6)) {
            diff += 1;
        }

        tmpDt = tmpDt.addDays(1);
    }
    return diff;
}
