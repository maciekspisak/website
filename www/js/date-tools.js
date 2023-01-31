function convertTimeZone(date, timeZoneString) {
  // for day-long events timezone is undefined - assume calendar to be UTC-aligned then
  if (!timeZoneString) timeZoneString = 'UTC';
  
  return new Date(date).toLocaleString('en-US', {timeZone: timeZoneString});
}

function formatDateString(dateString) {
  let date = new Date(dateString);
  return String(date.getFullYear()) + '-' 
    + zeroPrefix(String(date.getMonth() + 1)) + '-' 
    + zeroPrefix(String(date.getDate()));
}

function zeroPrefix(string) {
  if (string.length === 1) {return '0' + string};
  return string;
}

function setTimeToMidnight(dateTime) {
  dateTime.setHours(0);
  dateTime.setMinutes(0);
  dateTime.setSeconds(0);
  dateTime.setMilliseconds(0);
}

export {
  convertTimeZone,
  formatDateString,
  setTimeToMidnight
};
