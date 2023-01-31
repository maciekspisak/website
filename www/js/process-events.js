import * as createEventData from './create-event-data.js';


export function processEvents(events) {
  if (!events || events.length == 0) return;

  const eventsData = events.map(createEventData.createEventData);
  let chartData = [];
  eventsData.forEach(event => pushOrAddDuration(chartData, event.durationList));
  return chartData;
}

function pushOrAddDuration(array, durationList) {
  for (const [key, value] of Object.entries(durationList)) {
    if (array.length === 0) {
      array.push({key: key, value: value});
      continue;
    };
    
    let keyAlreadyUsed = false;
    for (const keyValuePair of array) {
      if (keyValuePair.key === key) {
        keyAlreadyUsed = true;
        keyValuePair.value += value;
        break;
      };
    };
    if (!keyAlreadyUsed) array.push({key: key, value: value});
  };
}
