import { DateTime, Settings } from 'luxon'
const dateToHuman = (date) => {
    Settings.defaultZone = 'Etc/GMT';
    return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT);
}
const dateToSql = (date) => {
    Settings.defaultZone = 'Etc/GMT';
    return DateTime.fromJSDate(date).toISO();
}
export { dateToHuman, dateToSql };
