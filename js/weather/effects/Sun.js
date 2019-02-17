import Dom from '../../support/Dom.js';
import DateTime from '../../date_and_time/DateTime.js';
import * as helpers from '../../support/helpers.js';

/*Sun class*/
export default class Sun {
    constructor() {
        this.sun = Dom.createElement('div', null, 'sun');
        this.moveInterval = null;
    }

    create() {
        Dom.getByClass('app-main').appendChild(this.sun);
        return this;
    }
    rise() {
        this.sun.style.animation = "appear 30s forwards";
        Dom.getByClass('app-main').appendChild(this.sun);
    }
    set() {
        let sun = Dom.getByClass('sun').style.animation = "disapper 30s forwards";
        setTimeout(() => {
            Dom.getByClass('sun').style.left = "0%";
        }, 30000)
    }
    move() {
        this.moveInterval = setInterval(this.setPosition.bind(this), 1000);
    }
    stop() {
        clearInterval(this.moveInterval);
        this.set();
    }
    setPosition() {
        let currentHours = new DateTime().getCurrentHours();
        let daysInfo = new DateTime().getDaysInfo();
        let sun = Dom.getByClass('sun');
        let appSectionwidth = Dom.getByClass('app-main').offsetWidth;
        let sunTraectoryWidth = ((appSectionwidth - 50) / appSectionwidth) * 100;
        let movePerHourRight = sunTraectoryWidth / daysInfo.day.duration; // %
        let dayHour = null;
        if (currentHours > daysInfo.day.start && currentHours < daysInfo.day.end) {
            dayHour = currentHours - daysInfo.day.start;
            sun.style.left = (dayHour * movePerHourRight) + '%';
            let color = 'white';
            if (Dom.getByClass('cloud')) {
                helpers.setCloudsColor(color);
            }

            return;
        } if (currentHours >= daysInfo.day.end) {
            this.stop();
        }
    }
}