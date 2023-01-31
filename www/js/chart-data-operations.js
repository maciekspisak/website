import {milisecondsInDay} from './date-tools.js';
import {formatDateString} from './date-tools.js';


/**
 * Gets chart data and changes all the minute values to hours (divides by 60 and rounds).
 * @param {Array.<Object>} chartData 
 * @returns {Array.<Object>}
 */
function changeMinutesToHours(chartData) {
  let formattedData = JSON.parse(JSON.stringify(chartData));
  formattedData.forEach(day => day.value = (Math.round(day.value / 6) / 10));
  return formattedData;
}
 /**
  * Checks if object fits in range of last n days.
  * @param {Object} keyValueObject - Object of chart data containing key-value pair.
  * @param {number} n - Count of last days.
  */
function isLastNDays(keyValueObject, n) {
  const dateNow = new Date();
  const date = new Date(keyValueObject.key);
  const startDate = new Date(dateNow.getTime() - n * milisecondsInDay);

  if (startDate < date && date < dateNow) return true;
  return false;
}

/**
 * Pushes objects with 0 value to fill completely chart data of last n days.
 * @param {Array.<Object>} chartData 
 * @param {number} n - Count of last days.
 */
function setZeroValuesLastNDays(chartData, n) {
  let date = new Date();
  for (let index = 0; index < n; index++) {
    const sameDate = chartData.filter(keyValueObject => keyValueObject.key === formatDateString(date.toDateString()));
    if (sameDate.length === 0) chartData.push({key: formatDateString(date.toDateString()), value: 0});
    date = new Date(date - milisecondsInDay);
  }
}

export {
  changeMinutesToHours,
  isLastNDays,
  setZeroValuesLastNDays
};
