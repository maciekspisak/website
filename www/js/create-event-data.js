import * as dateTools from './date-tools.js';


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

function createDurationList(startDateTimeString, endDateTimeString) {
  const start = new Date(startDateTimeString);
  const startDate = dateTools.formatDateString(start.toDateString());
  const end = new Date(endDateTimeString);
  const endDate = dateTools.formatDateString(end.toDateString());

  const milisecondsInMinute = 1000 * 60;
  const milisecondsInDay = milisecondsInMinute * 60 * 24;

  if (startDate === endDate) {
    return {[startDate]: (end - start) / milisecondsInMinute};
  };

  let startNextMidnight = new Date(start.getTime() + milisecondsInDay);
  dateTools.setTimeToMidnight(startNextMidnight);

  let durationList = {[startDate]: (startNextMidnight - start) / milisecondsInMinute};
  
  let endMidnight = new Date(end);
  dateTools.setTimeToMidnight(endMidnight);

  while (endMidnight.getTime() != startNextMidnight.getTime()) {
    durationList[dateTools.formatDateString(startNextMidnight.toDateString())] = 24 * 60;
    startNextMidnight = new Date(startNextMidnight.getTime() + milisecondsInDay);
  };

  if (end - endMidnight > 0) durationList[endDate] = (end - endMidnight) / milisecondsInMinute;

  return durationList;
}
