import Dom from './Dom.js';
import Moon from '../weather/effects/Moon.js';
import Sun from '../weather/effects/Sun.js';
import Cloud from '../weather/effects/Cloud.js';



export let setSkyColor = (time, density = null) => {
    let app = Dom.getByClass('app-main');

    if(time == 'night' && !density){        
        app.style.background = "linear-gradient(to bottom, rgb(35, 34, 34) 0%, rgba(35, 34, 34, .6) 100%)";
    } else if (time == 'night' && density == 'total') {
        app.style.background = "linear-gradient(to bottom, rgb(25, 32, 41) 0%, rgba(25, 32, 41, .6) 300%)";
    } else if(time == 'day' && !density) {
        app.style.background = "linear-gradient(to bottom, rgb(51, 153, 255) 0%, rgba(51, 153, 255, 0) 60%)";
    } else {
        app.style.background = "linear-gradient(to bottom, rgb(85, 85, 107) 0%, rgba(187, 188, 189, .3) 35%)";
    } 
}

export let addSattelite = (time) => {    
    if(time == 'moon'){
        let moon = new Moon().create();
            moon.move();
    } else {
        let sun = new Sun().create();
            sun.move();
    }  
}

export let addClouds = (quantity, time) => {    
    if(time == 'night'){
        let clouds = new Cloud();
            clouds.set(quantity, '#1d1c1c');
    } else {
        let clouds = new Cloud();
            clouds.set(quantity, 'white');
    }  
}

export let getIntNumberFromRange = (min, max) => {
    let number = Math.floor(Math.random() * max);
    if (number < min) {
        return getIntNumberFromRange(min, max);
    }
    return number;
}

export let getOpacityFromRange = (min, max) => {
    let opacity = Math.random().toFixed(1);
    if (opacity < min) {
        return getOpacityFromRange(min, max);
    }
    return opacity;
}

export let setCloudsColor = (color) => {
    if (Dom.getByClass('cloud')) {
        let clouds = Dom.getByClass('cloud', false);
        clouds = [].slice.call(clouds); //makes array from html collection   
        clouds.forEach(value => {
            return value.setAttribute('fill', color);
        });
    }
}

export let addStars = (quantity) => {
    let app = Dom.getByClass('app-main');
    for(let i = 0; i <= quantity; i++){
        let size = getIntNumberFromRange(1, 3);
        let star = Dom.createElement('span', null, 'star');
            star.style.left = getIntNumberFromRange(0, app.offsetWidth);
            star.style.width = size + "px";
            star.style.height = size + "px";
            star.style.top = getIntNumberFromRange(0, 100) + 'px';
            star.style.opacity = getOpacityFromRange(0.3, 0.8);
        app.appendChild(star);
    }
}