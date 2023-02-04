import {createEventData} from './create-event-data.js';


/** Takes events list returned by Google API 
 * and processes them into charts data.
 */
export function processEvents(events) {
  if (!events || events.length == 0) return;

  const eventsData = events.map(createEventData);
  let dateDurationPairs = [];
  let eventTypeDurationPairs = [];
  let dateMultiValueObjects = [];
  
  eventsData.forEach(event => pushOrAddDateDurationPair(dateDurationPairs, event));
  eventsData.forEach(event => pushOrAddEventTypeDurationPair(eventTypeDurationPairs, event));
  eventsData.forEach(event => pushOrAddDateMultiValueObject(dateMultiValueObjects, event));

  return [dateDurationPairs, eventTypeDurationPairs, dateMultiValueObjects];
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

function pushOrAddDateMultiValueObject(array, event) {
  const valueName = event.summary;
  for (const [key, value] of Object.entries(event.durationList)) {
    pushOrAddDuration(array, key, value, valueName);
  }
}

function pushOrAddDuration(array, key, value, valueName = 'value') {
  if (array.length === 0) {
    array.push({key: key, [valueName]: value});
    return;
  };

  let keyAlreadyUsed = false;
  for (const keyValueObject of array) {
    if (keyValueObject.key === key) {
      keyAlreadyUsed = true;
      if (keyValueObject[valueName]) keyValueObject[valueName] += value;
      else keyValueObject[valueName] = value;
      break;
    };
  };
  if (!keyAlreadyUsed) array.push({key: key, [valueName]: value});
}


