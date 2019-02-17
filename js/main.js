import DateTime from './date_and_time/DateTime.js';
import * as helpers from './support/helpers.js';
import Watch from './date_and_time/Watch.js';
import Precipitation from './weather/effects/Precipitation.js';
import Dom from './support/Dom.js';
import Weather from './weather/Weather.js';

document.addEventListener("DOMContentLoaded", function (event) {
    /*App not adopted for mobile devices. So first of all we need to check client screen resolution*/

    let width = window.screen.availWidth;
    setTimeout(()=>{
        let preloader = Dom.getByClass('preloader');
            preloader.remove();
    },3000);

    if (width > 1000) {

        /*If resolution is more than 1000 px - show app*/
        Dom.getByClass('no-mobile').remove();

        let watch = new Watch('watch-body');

        let date = new DateTime();
            date.addDateToApp();
            date.addMonthToApp();
            date.addYearToApp();

        let weather = new Weather().receive(); // Ajax (see class Weather)

        if (Object.keys(weather).length > 0) {

            /*Display weather data on page*/
            let temperatureSection = Dom.getByClass('temperature');
            let temperature = document.createTextNode(weather.main.temp);

            weather.main.temp < 0 ? temperatureSection.style.color = "#002698" : temperatureSection.style.color = "red";
                temperatureSection.appendChild(temperature);

            let humiditySection = Dom.getByClass('humidity');
            let humidity = document.createTextNode(weather.main.humidity);
            humiditySection.appendChild(humidity);

            let windSection = Dom.getByClass('wind');
            let wind = document.createTextNode(weather.wind.speed);
            windSection.appendChild(wind);

            let precipitationSection = Dom.getByClass('precipitation');

            if (weather.weather[0].description == 'rain' || weather.weather[0].description == 'snow') {
                if (weather.weather[0].description == 'snow') {
                    precipitationSection.appendChild(document.createTextNode(" сніг"));
                }

                if (weather.weather[0].description == 'rain') {
                    precipitationSection.appendChild(document.createTextNode(" дощ"));
                }
            } else {
                precipitationSection.appendChild(document.createTextNode(" - "));
            }

            let cloudsSection = Dom.getByClass('clouds');
            if (weather.clouds) {
                let clouds = document.createTextNode(weather.clouds.all);
                cloudsSection.appendChild(clouds);

            } else {
                let clouds = document.createTextNode(" - ");
                cloudsSection.appendChild(clouds);
            }


            /*Diplay sky bodies*/
            let currentHours = date.getCurrentHours();
            let daysInfo = date.getDaysInfo();

            if (currentHours > daysInfo.night.start && currentHours < 24 || currentHours < daysInfo.day.start) {
                if (weather.clouds && weather.clouds.all <= 5) {
                    helpers.addSattelite('moon');
                    helpers.setSkyColor('night');
                    helpers.addStars(100);
                } else if (weather.clouds && weather.clouds.all > 5 && weather.clouds.all <= 50) {
                    helpers.addSattelite('moon');
                    helpers.addClouds(15, 'night');
                    helpers.setSkyColor('night');
                    helpers.addStars(70);
                } else if (weather.clouds && weather.clouds.all > 50 && weather.clouds.all <= 90) {
                    helpers.addSattelite('moon');
                    helpers.addClouds(30, 'night');
                    helpers.setSkyColor('night');
                    helpers.addStars(40);
                } else {
                    helpers.setSkyColor('night', 'total');
                }
            } else {
                if (weather.clouds && weather.clouds.all <= 5) {
                    helpers.addSattelite('sun');
                    helpers.setSkyColor('day');
                } else if (weather.clouds && weather.clouds.all > 5 && weather.clouds.all <= 50) {
                    helpers.addSattelite('sun');
                    helpers.addClouds(15);
                    helpers.setSkyColor('day');
                } else if (weather.clouds && weather.clouds.all > 50 && weather.clouds.all <= 90) {
                    helpers.addSattelite('sun');
                    helpers.addClouds(30);
                    helpers.setSkyColor('day');
                } else {
                    helpers.setSkyColor('day', 'total');
                }
            }

           
            /*Display weather effects*/
            let precipitation = new Precipitation();
            if (weather.weather[0].description == 'rain') {
                precipitation.rain(190);
            }
            if (weather.weather[0].description == 'snow') {
                precipitation.snow(1050);
            }

            /*Set color of grass near hte castle according to season*/
            if (date.getSeason() == 'winter') {
                Dom.getByClass('grass').setAttribute('fill', 'white');
            }

        }

        // Refresh page each 30 min for new weather
        setInterval(() => {
            location.reload();
        }, 1800000)

    }

});