import Dom from '../../support/Dom.js';
import * as helpers from '../../support/helpers.js';

/*Precipitation*/
export default class Precipitation {
    constructor() {
        this.app = Dom.getByClass('app-main');
    }
    // power - speed of drops falling;
    // density  - type number (drops quantity);  
    rain(density, power = 2500) {
        for (let i = 0; i <= density; i++) {
            let delay = Math.ceil((Math.random() * 5000));
            let drop = Dom.createElement('span', null, 'rain-drop');
            drop.style.left = Math.ceil((Math.random() * 99)) + "%";
            drop.style.top = '-30px';
            drop.style.opacity = Math.random();

            drop.animate([
                {top: drop.style.top, opacity: drop.style.opacity}, 
                {top: window.screen.height + 'px', opacity: '0'}], 
                {duration: power, iterations: Infinity, delay: delay});
            
            this.app.appendChild(drop);
        }
    }

    snow(density, power = 25000) {
        for (let i = 0; i <= density; i++) {
            let delay = Math.ceil((Math.random() * 25000));
            let size = helpers.getIntNumberFromRange(3, 6);
            let snow = Dom.createElement('span', null, 'snow');
            snow.style.left = Math.ceil((Math.random() * 99)) + "%";
            snow.style.width = size + "px";
            snow.style.height = size + "px";
            snow.style.top = '-30px';
            snow.style.opacity = Math.random();
            snow.animate([
                {
                    top: snow.style.top,
                    opacity: snow.style.opacity
                },
                {
                    top: window.screen.height + 'px',
                    opacity: '0'
                }
            ], {
                    duration: power,
                    iterations: Infinity,
                    delay: delay
                });
            this.app.appendChild(snow);
        }
    }
}