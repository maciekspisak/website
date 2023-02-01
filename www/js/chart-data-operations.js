import * as dateTools from './date-tools.js';


/**
 * Gets chart data and changes all the minute values to hours (divides by 60 and rounds).
 * @param {Array.<Object>} chartData 
 * @returns {Array.<Object>}
 */
function changeMinutesToHours(chartData) {
  let formattedChartData = JSON.parse(JSON.stringify(chartData));
  for (const key of getKeys(chartData)) {
    formattedChartData.forEach(day => day[key] = (Math.round(day[key] / 6) / 10));
  }
  return formattedChartData;
}

/**
 * Checks if object fits in range of last n days.
 * @param {Object} keyValuesObject - Object of chart data containing key-value pair.
 * @param {number} n - Count of last days.
 */
function isLastNDays(keyValuesObject, n) {
  const dateNow = new Date();
  const date = dateTools.setTimeToMidnight(new Date(keyValuesObject.key));
  const startDate = new Date(dateNow.getTime() - n * dateTools.milisecondsInDay);

  if (startDate < date && date < dateNow) return true;
  return false;
}

/**
 * Pushes objects with 0 values to fill completely chart data in given date range.
 * @param {Array.<Object>} chartData 
 * @param {Date} startDate
 * @param {Date} endDate = new Date()
 */
function setZeroValuesInDateRange(chartData, startDate, endDate = new Date()) {
  const keys = getKeys(chartData);
  
  // missing objects
  let object = {};
  for (const key of keys) object[key] = 0;

  let date = new Date(endDate);
  while (startDate < date) {
    const sameDate = chartData.filter(keyValuesObject => keyValuesObject.key === dateTools.simpleStringDate(date));
    if (sameDate.length === 0) {
      let newObject = JSON.parse(JSON.stringify(object));
      newObject.key = dateTools.simpleStringDate(date);
      chartData.push(newObject);
    }
    date = new Date(date - dateTools.milisecondsInDay);
  };

  // incomplete objects
  setKeysWithZeroValue(chartData, keys);
}

/**
 * Returns all the keys of objects in chartData array. Omits key = 'key'.
 * @param {Array.<Object>} chartData 
 * @returns {Array.<string>}
 */
function getKeys(chartData) {
  let keys = [];
  for (const object of chartData) {
    keys.push(...Object.keys(object));
  }
  return keys.filter(key => key !== 'key')
    .filter((key, index, array) => array.indexOf(key) === index);
}

/**
 * Fills key-value pairs in all incomplete objects.
 * @param {Array.<Object>} chartData 
 * @param {Array.<string>} keys 
 */
function setKeysWithZeroValue(chartData, keys) {
  for (let object of chartData) {
    for (const key of keys) {
      if (!object[key])
        object[key] = 0;
    }
  }
}

/**
 * 
 * @param {Array.<Object>} chartData 
 * @param {number} daysCount 
 * @returns {Array.<Object>}
 */
function prepareChartDataForLastNDays(chartData, daysCount) {
  let alteredChartData = JSON.parse(JSON.stringify(chartData));
  alteredChartData = alteredChartData.filter(dataObject => isLastNDays(dataObject, daysCount));

  setZeroValuesInDateRange(alteredChartData, new Date(new Date().getTime() - daysCount * dateTools.milisecondsInDay));
  alteredChartData.sort((a, b) => new Date(a.key) - new Date(b.key));
  return alteredChartData;
}

export {
  changeMinutesToHours,
  getKeys,
  prepareChartDataForLastNDays
};
