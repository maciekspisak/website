import {createEventData} from './create-event-data.js';


/** Takes events list returned by Google API 
 * and processes them into charts data.
 */
export function processEvents(events) {
  if (!events || events.length == 0) return;

  const eventsData = events.map(createEventData);
  let dateDurationPairs = [];
  let eventTypeDurationPairs = [];
  eventsData.forEach(event => pushOrAddDateDurationPair(dateDurationPairs, event));
  eventsData.forEach(event => pushOrAddEventTypeDurationPair(eventTypeDurationPairs, event));
  return [dateDurationPairs, eventTypeDurationPairs];
}

/**
 * Fills an array with new keys from durationList 
 * or cumulates values of keys already in array.
 * @param {Array.<Object>} array
 * @param {Object} event
 */
function pushOrAddDateDurationPair(array, event) {
  for (const [key, value] of Object.entries(event.durationList)) {
    pushOrAddDuration(array, key, value);
  };
}

function pushOrAddEventTypeDurationPair(array, event) {
  const key = event.summary;
  for (const value of Object.values(event.durationList)) {
    pushOrAddDuration(array, key, value);
  }
}

function pushOrAddDuration(array, key, value) {
  if (array.length === 0) {
    array.push({key: key, value: value});
    return;
  };

  let keyAlreadyUsed = false;
  for (const keyValueObject of array) {
    if (keyValueObject.key === key) {
      keyAlreadyUsed = true;
      keyValueObject.value += value;
      break;
    };
  };
  if (!keyAlreadyUsed) array.push({key: key, value: value});
}
