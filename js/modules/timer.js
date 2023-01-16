function timer(dedlain) {

    function getNewTime(endtime) {
        let timeTotal;
        if (Date.parse(new Date()) > Date.parse(endtime)) {
            timeTotal = 0;
        } else {
            timeTotal = Date.parse(endtime) - Date.parse(new Date());
        }

        let days = Math.floor((timeTotal / (1000 * 60 * 60 * 24))),
            hours = Math.floor((timeTotal / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((timeTotal / (1000 * 60) % 60)),
            seconds = Math.floor((timeTotal / 1000) % 60);
        return {
            'total': timeTotal,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function addZero(num) {
        if (num >= 0 && num < 10) return `0${num}`;
        else return num;
    }

    function setClock(selector, endtime) {
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerId = setInterval(updateClock, 1000);

        updateClock();
        function updateClock() {
            let newTime = getNewTime(endtime);

            days.textContent = addZero(newTime.days);
            hours.textContent = addZero(newTime.hours);
            minutes.textContent = addZero(newTime.minutes);
            seconds.textContent = addZero(newTime.seconds);

            if (newTime <= 0) {
                clearInterval(timerId);
            }
        }
    }
    setClock('.timer', dedlain);
}

export default timer;