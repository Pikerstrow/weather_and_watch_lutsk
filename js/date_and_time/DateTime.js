import Dom from '../support/Dom.js';


/*class DateTime*/
export default class DateTime {
    constructor() {
        this.currentTime = new Date();
        this.timezoneOffset = new Date().getTimezoneOffset();
    }
    getCurrentSeconds() {
        return (this.currentTime / 1000) % 60;
    }
    getCurrentMinutes() {
        return ((this.currentTime / 1000) / 60) % 60;
    }
    getCurrentHours() {
        return (((this.currentTime / 1000) / 60) / 60) % 24 + Math.abs(this.timezoneOffset / 60);
    }
    getMonthNameForDate() {
        let monthName = '';
        switch (this.currentTime.getMonth()) {
            case 0:
                monthName = "січня";
                break;
            case 1:
                monthName = "лютого";
                break;
            case 2:
                monthName = "березня";
                break;
            case 3:
                monthName = "квітня";
                break;
            case 4:
                monthName = "травня";
                break;
            case 5:
                monthName = "червня";
                break;
            case 6:
                monthName = "липня";
                break;
            case 7:
                monthName = "серпня";
                break;
            case 8:
                monthName = "вересня";
                break;
            case 9:
                monthName = "жовтня";
                break;
            case 10:
                monthName = "листопада";
                break;
            case 8:
                monthName = "грудня";
                break;
        }
        return monthName;
    }
    getFormattedDate() {
        let date = this.currentTime.getDate();
        if (date == 1 || date == 2 || date == 3 || date == 4 || date == 5 || date == 6 || date == 7 || date == 8 || date == 9) {
            return "0" + this.currentTime.getDate();
        }
        return this.currentTime.getDate();
    }
    addDateToApp() {
        Dom.getByClass('date-container').appendChild(
            Dom.createElement('span', this.getFormattedDate(), 'day-container')
        );
    }
    addMonthToApp() {
        Dom.getByClass('date-container').appendChild(
            Dom.createElement('span', this.getMonthNameForDate(), 'month-container')
        );
    }
    addYearToApp() {
        Dom.getByClass('date-container').appendChild(
            Dom.createElement('span', this.currentTime.getFullYear() + " року", 'year-container')
        );
    }
    getSeason() {
        let mounth = this.currentTime.getMonth();
        let season = null;
        switch (mounth) {
            case 0:
            case 1:
            case 11:
                season = 'winter';
                break;
            case 2:
            case 3:
            case 4:
                season = 'spring';
                break;
            case 5:
            case 6:
            case 7:
                season = 'summer';
                break;
            case 8:
            case 9:
            case 10:
                season = 'autumn';
                break;
        }
        return season;
    }
    getDaysInfo() {
        let mounth = this.currentTime.getMonth();
        let daysInfo = {};

        switch (mounth) {
            case 0:
                daysInfo = {
                    day: {
                        duration: 8,
                        start: 8,
                        end: 16
                    },
                    night: {
                        duration: 16,
                        start: 16,
                        end: 8
                    }
                };
                break;
            case 1:
                daysInfo = {
                    day: {
                        duration: 10,
                        start: 7,
                        end: 17
                    },
                    night: {
                        duration: 14,
                        start: 17,
                        end: 7
                    }
                };
                break;
            case 11:
                daysInfo = {
                    day: {
                        duration: 8,
                        start: 8,
                        end: 16
                    },
                    night: {
                        duration: 16,
                        start: 16,
                        end: 8
                    }
                };
                break;
            case 2:
                daysInfo = {
                    day: {
                        duration: 12,
                        start: 7,
                        end: 19
                    },
                    night: {
                        duration: 12,
                        start: 19,
                        end: 7
                    }
                };
                break;
            case 3:
                daysInfo = {
                    day: {
                        duration: 14,
                        start: 6,
                        end: 20
                    },
                    night: {
                        duration: 10,
                        start: 20,
                        end: 6
                    }
                };
                break;
            case 4:
                daysInfo = {
                    day: {
                        duration: 14,
                        start: 6,
                        end: 20
                    },
                    night: {
                        duration: 10,
                        start: 20,
                        end: 6
                    }
                };
                break;
            case 5:
                daysInfo = {
                    day: {
                        duration: 16,
                        start: 5,
                        end: 21
                    },
                    night: {
                        duration: 8,
                        start: 21,
                        end: 5
                    }
                };
                break;
            case 6:
                daysInfo = {
                    day: {
                        duration: 16,
                        start: 5,
                        end: 21
                    },
                    night: {
                        duration: 8,
                        start: 21,
                        end: 5
                    }
                };
                break;
            case 7:
                daysInfo = {
                    day: {
                        duration: 14,
                        start: 6,
                        end: 20
                    },
                    night: {
                        duration: 10,
                        start: 20,
                        end: 6
                    }
                };
                break;
            case 8:
                daysInfo = {
                    day: {
                        duration: 12,
                        start: 7,
                        end: 19
                    },
                    night: {
                        duration: 12,
                        start: 19,
                        end: 7
                    }
                };
                break;
            case 9:
                daysInfo = {
                    day: {
                        duration: 10,
                        start: 8,
                        end: 18
                    },
                    night: {
                        duration: 14,
                        start: 18,
                        end: 8
                    }
                };
                break;
            case 10:
                daysInfo = {
                    day: {
                        duration: 9,
                        start: 8,
                        end: 17
                    },
                    night: {
                        duration: 15,
                        start: 17,
                        end: 8
                    }
                };
                break;
        }
        return daysInfo;
    }
}