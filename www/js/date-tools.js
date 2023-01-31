const milisecondsInMinute = 1000 * 60;
const milisecondsInDay = milisecondsInMinute * 60 * 24;

/** 
 * Changes given date into the local date formatted in 'en-US' format.
 * @param {string} date - Date to be converted.
 * @param {string} timeZone - Timezone database name.
 */
function convertTimeZone(date, timeZone) {
  // for day-long events timezone is undefined - assume calendar to be UTC-aligned then
  if (!timeZone) timeZone = 'UTC';
  
  return new Date(date).toLocaleString('en-US', {timeZone: timeZone});
}

/**
 * Changes date format to 'YYYY-MM-DD'.
 * @param {string} dateString - String to be formatted.
 */
function formatDateString(dateString) {
  const date = new Date(dateString);
  return String(date.getFullYear()) + '-' 
    + zeroPrefix(String(date.getMonth() + 1)) + '-' 
    + zeroPrefix(String(date.getDate()));
}

/**
 * Adds zero before string representing month or day < 10.
 * @param {string} string - Day or month to be checked.
 */
function zeroPrefix(string) {
  if (string.length === 1) {return '0' + string};
  return string;
}

/**
 * Changes all the properties connected with time to 0. 
 * @param {Date} dateTime
 */
function setTimeToMidnight(dateTime) {
  dateTime.setHours(0);
  dateTime.setMinutes(0);
  dateTime.setSeconds(0);
  dateTime.setMilliseconds(0);
}

export {
  milisecondsInMinute,
  milisecondsInDay,
  convertTimeZone,
  formatDateString,
  setTimeToMidnight
};
