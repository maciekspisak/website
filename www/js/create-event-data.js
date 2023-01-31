import * as dateTools from './date-tools.js';


/**
 * Creates data suitable for charts.
 * @param {Event} event 
 */
export function createEventData(event) {
  const startDateTime = dateTools.convertTimeZone(event.start.dateTime || event.start.date, event.start.timeZone);
  const endDateTime = dateTools.convertTimeZone(event.end.dateTime || event.end.date, event.end.timeZone);

  return {
    summary: event.summary,
    start: startDateTime,
    end: endDateTime,
    durationList: createDurationList(startDateTime, endDateTime)
  };
}

/**
 * Creates object matching date with event duration.
 * @param {string} startDateTime 
 * @param {string} endDateTime 
 */
function createDurationList(startDateTime, endDateTime) {
  const start = new Date(startDateTime);
  const startDate = dateTools.simpleStringDate(start);
  const end = new Date(endDateTime);
  const endDate = dateTools.simpleStringDate(end);

  const milisecondsInMinute = dateTools.milisecondsInMinute;
  const milisecondsInDay = dateTools.milisecondsInDay;

  if (startDate === endDate) {
    return {[startDate]: (end - start) / milisecondsInMinute};
  };

  let startNextMidnight = new Date(start.getTime() + milisecondsInDay);
  dateTools.setTimeToMidnight(startNextMidnight);

  let durationList = {[startDate]: (startNextMidnight - start) / milisecondsInMinute};
  
  let endMidnight = new Date(end);
  dateTools.setTimeToMidnight(endMidnight);

  while (endMidnight.getTime() != startNextMidnight.getTime()) {
    durationList[dateTools.simpleStringDate(startNextMidnight)] = 24 * 60;
    startNextMidnight = new Date(startNextMidnight.getTime() + milisecondsInDay);
  };

  if (end - endMidnight > 0) durationList[endDate] = (end - endMidnight) / milisecondsInMinute;

  return durationList;
}
