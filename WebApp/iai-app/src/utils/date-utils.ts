import { format } from "path";
import AppConfig from "../config";

class DateTimeUtils {
    getCurrentDateinUTC() {
        return new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
    }

    //Date conversion function
    dateConversion(date: string) {
        var dateVal = (new Date(date)).toISOString();
        return dateVal;//.toLocaleDateString()
    }

    dateConversionFormat(date: Date) {
        let foramt = "dd-MMM-yyyy";
        var dateVal = new Date(date).toLocaleDateString();
        return dateVal;//.toLocaleDateString()
    }

    toDateWithTimeZone(time: string, zone: string, format?: string) {
        if (!format || format === '') {
            format = 'yyyy-MM-DD HH:mm';
        }
        const moment = require('moment-timezone');
        let dt = moment.tz(new Date(time), zone);
        return dt.format(format);
    }

    toDateWithTimeZoneAdd(time: string, zone: string, format?: string) {
        if (!format || format === '') {
            format = 'yyyy-MM-DD HH:00';
        }
        const moment = require('moment-timezone');
        let dt = moment.tz(new Date(time), zone);
        return dt.add(60, 'minutes').format(format);
    }

    toDateWithoutTimeZone = function (time: string, zone: string, format?: string) {
        //If format is null then default to the specific format.
        if (!format || format == '') {
            format = 'YYYY-MM-DD ';
        }
        const moment = require('moment-timezone');
        var dt = moment.tz(new Date(time), zone);
        return dt.format(format);
    }

    toDateTimeTWithTimeZone(datetime: string) {
        var format = 'YYYY-MM-DDTHH:mm';
        const moment = require('moment-timezone');
        var x = moment(datetime).format(format);
        return x;
    }

    getDayFromDate(date: string) {
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayNames[new Date(date).getDay()];
    }

    getDayFromDateFormat(date: Date) {
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayNames[new Date(date).getDay()];
    }

    getFormattedDateFromDate(date: string) {
        if (AppConfig.environment == "Dev") {
            return `${new Date(date).getDate()}-${new Date(date).getMonth() + 1}-${new Date(date).getFullYear()}`;
        } else {
            return `${new Date(date).getMonth() + 1}-${new Date(date).getDate()}-${new Date(date).getFullYear()}`;
        }
    }

    getFormattedDate(date: Date) {
        if (AppConfig.environment == "Dev") {
            return `${new Date(date).getDate()}-${new Date(date).getMonth() + 1}-${new Date(date).getFullYear()}`;
        } else {
            return `${new Date(date).getMonth() + 1}-${new Date(date).getDate()}-${new Date(date).getFullYear()}`;
        }
    }

    addDays(currentDate: Date, days: number) {
        let date = new Date(currentDate);
        date.setDate(date.getDate() + days);
        return date;
    }
}

const dateTimeUtils = new DateTimeUtils();
export default dateTimeUtils;