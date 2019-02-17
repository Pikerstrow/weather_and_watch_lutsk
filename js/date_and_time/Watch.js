/*Watch class*/
import Dom from '../support/Dom.js';
import DateTime from './DateTime.js';

export default class Watch {
    constructor(id) {
        this.watch = document.getElementById(id);
        this.addHourMarks();
        this.addArrows();
        this.run();
    }
    addHourMarks() {
        let rotation = 0;
        for (let i = 12; i <= 24; i++) {
            if (i % 3 != 0) {
                let hourMark = Dom.createElement('span', null, 'hour-mark');
                hourMark.style['transform'] = "rotate(" + rotation + "deg)";
                this.watch.appendChild(hourMark);
            } else {
                switch (i) {
                    case 12:
                        let twelve = Dom.createElement('div', 12, 'twelve-hours');
                        this.watch.appendChild(twelve);
                        break;
                    case 15:
                        let three = Dom.createElement('div', 3, 'three-hours');
                        this.watch.appendChild(three);
                        break;
                    case 18:
                        let six = Dom.createElement('div', 6, 'six-hours');
                        this.watch.appendChild(six);
                        break;
                    case 21:
                        let nine = Dom.createElement('div', 9, 'nine-hours');
                        this.watch.appendChild(nine);
                        break;
                }
            }
            rotation += 30;
        }
    }
    addArrows() {
        this.watch.appendChild(Dom.createElement('span', null, 'seconds-arrow'));
        this.watch.appendChild(Dom.createElement('span', null, 'minutes-arrow'));
        this.watch.appendChild(Dom.createElement('span', null, 'hours-arrow'));
    }
    getCurrentTime() {
        let date = new DateTime();
        Dom.getByClass('seconds-arrow').style.transform = "rotate(" + (date.getCurrentSeconds() * 6) + "deg)"; // each second has 6 deg (360 deg / 60 seconds)
        Dom.getByClass('minutes-arrow').style.transform = "rotate(" + (date.getCurrentMinutes() * 6) + "deg)"; // each minute has 6 deg (360 deg / 60 minutes)
        Dom.getByClass('hours-arrow').style.transform = "rotate(" + (date.getCurrentHours() * 30) + "deg)";    // each hour has 30 deg (360 deg / 12 hours) 
    }
    run() {
        setInterval(this.getCurrentTime.bind(this), 1000);
    }
}