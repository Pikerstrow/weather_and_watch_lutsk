import Dom from '../../support/Dom.js';
import DateTime from '../../date_and_time/DateTime.js';
import * as helpers from '../../support/helpers.js';

/*Moon class*/
export default class Moon {
    constructor() {
        this.moon = null;
        this.moveInterval = null;
    }

    create() {
        let date = new DateTime();
        let day = date.currentTime.getDate();

        let moonBody = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            moonBody.setAttribute("viewBox", "0 0 100 100");        
            moonBody.style.position = "absolute";
            moonBody.style.zIndex = "2";
            moonBody.setAttribute("class", "moon");

        let moonInner = document.createElementNS('http://www.w3.org/2000/svg', "path");
            moonInner.setAttribute('fill', '#e0e0b4');

        switch (day) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                moonInner.setAttribute('d', 'M 40 20 a 1 1, 0, 0 0, 20 50 a 35 35, 0, 0 1, -20 -50');
                break;
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                moonInner.setAttribute('d', 'M 40 20 a 1 1, 0, 0 0, 20 50 a 55 55, 0, 0 1, -20 -50');
                break;
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
                moonInner.setAttribute('d', 'M 40 20 a 1 1, 0, 0 0, 20 50 a 80 80, 0, 0 1, -20 -50');
                break;
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:
            case 31:
                moonInner.setAttribute('d', 'M 40 20 a 1 1, 0, 0 0, 20 50 a 1 1, 0, 0 1, -20 -50');
                break;
        }

        moonBody.appendChild(moonInner);
        Dom.getByClass('app-main').appendChild(moonBody);
        return this;
    }

    rise() {
        this.moon.style.animation = "appear 30s forwards";
        Dom.getByClass('app-main').appendChild(this.moon);
    }

    set() {
        let moon = Dom.getByClass('moon').style.animation = "disapper 30s forwards";
        setTimeout(() => {
            Dom.getByClass('moon').style.left = "0%";
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
        let moon = Dom.getByClass('moon');

        let appSectionwidth = Dom.getByClass('app-main').offsetWidth;
        let moonTraectoryWidth = ((appSectionwidth - 130) / appSectionwidth) * 100;

        let movePerHourRight = moonTraectoryWidth / (daysInfo.night.duration); // %

        let nightHour;

        if (currentHours > daysInfo.night.start && currentHours < 24) {
            nightHour = currentHours - daysInfo.night.start;
            moon.style.left = (nightHour * movePerHourRight) + '%';

            if (Dom.getByClass('cloud')) {                
                helpers.setCloudsColor('darkgrey');
            }            
            return;
        } else if (currentHours < daysInfo.day.start) {
            nightHour = currentHours + (24 - daysInfo.night.start);
            moon.style.left = (nightHour * movePerHourRight) + '%';

            if (Dom.getByClass('cloud')) {                
                helpers.setCloudsColor('darkgrey');
            }  
            return;
        }

        this.stop();
    }
}