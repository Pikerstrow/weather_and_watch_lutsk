import Dom from '../support/Dom.js';
import DateTime from '../date_and_time/DateTime.js';
import * as helpers from '../support/helpers.js';
import {openWeatherMapApi, cityId} from '../support/config.js';


export default class Weather {
    
    constructor(){
        this.url = "http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&appid=" + openWeatherMapApi + "&units=metric";               
    }

    receive(){
        // TODO: Change for fetch!!!!!!!!!!
        let xhr = new XMLHttpRequest();
            xhr.open('GET', this.url, false);
            xhr.send();

        if(xhr.status != 200){
            return null;
        } else {
            return JSON.parse(xhr.responseText);
        }
    }
    
}