import Dom from '../../support/Dom.js';
import * as helpers from '../../support/helpers.js';

/*Cloud class*/
export default class Cloud {
    create(size, opacity, color) {
        let cloudBody = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        cloudBody.setAttribute("viewBox", "0 0 100 100");
        cloudBody.style.width = size + "px";
        cloudBody.style.height = size + "px";
        cloudBody.style.opacity = opacity;
        cloudBody.style.position = "absolute";
        cloudBody.style.zIndex = "5";
        let cloudInner = document.createElementNS('http://www.w3.org/2000/svg', "path");
        cloudInner.setAttribute('d', 'M 15 30 a 1 1, 0, 0 0, 0 30 h 75 a 1 1, 0, 0 0, 0 -20 h -2 a 1 1, 0, 0 0, -5 -7 a 1 1, 0, 0 0, -15 -10 a 1 1, 0, 0 0, -28 -10 a 1 1, 0, 0 0, -25.5 17.2');

    cloudInner.setAttribute('class', "cloud");
        cloudInner.setAttribute('fill', color);
        cloudBody.appendChild(cloudInner);
        return cloudBody;
    }

    set(quantity, color) {
        var delay = 0;
        var appWidth = Dom.getByClass('app-main').offsetWidth;
        var durationStart = appWidth * 60;

        for (let i = 1; i <= quantity; i++) {
            let duration = helpers.getIntNumberFromRange(durationStart, (durationStart + 7000));

            let size = helpers.getIntNumberFromRange(50, 110);
            let opacity = helpers.getOpacityFromRange(0.6, 1);
            let top = helpers.getIntNumberFromRange(0, 70) + "px";
            let left = "-" + size + "px";

            let cloud = this.create(size, opacity, color);
            cloud.style.top = top;
            cloud.style.left = left;
            cloud.setAttribute("viewBox", "0 0 100 100");

            cloud.animate([
                { left: left },
                { left: (Dom.getByClass('app-main').offsetWidth + size) + 'px' }],
                { duration: duration, iterations: Infinity, delay: delay }
            );
            Dom.getByClass('app-main').appendChild(cloud);
            if (delay > durationStart) {
                delay /= 2;
            } else {
                delay += helpers.getIntNumberFromRange(appWidth, (appWidth + 8000));
            }

        }

    }
}