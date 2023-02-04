const apiKey = 'AIzaSyDn17JQGhTlYiBL5n4X_0l0R9X1jclNPXc';
const discoveryDoc = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const calendarId = 'fbb133dfa5aef25d1031b71c1c0d53d1126515ef32d14bfa4de5ff2608bfc881@group.calendar.google.com';

/** Asynchronously loads the gapi client library. */
export async function loadClientLibrary() {
  return new Promise(resolve => gapi.load('client', () => resolve(initializeGoogleApiClient)));
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGoogleApiClient() {
  await gapi.client.init({apiKey: apiKey, discoveryDocs: [discoveryDoc]});
  return fetchCalendar();
}

/** Serves Google API calendar events request. */
async function fetchCalendar() {
  let response;
  try {
    const request = {
      'calendarId': calendarId,
      'timeMax': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'orderBy': 'startTime'
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (error) {
    console.log(error.message);
    return;
  }

  // return events
  return response.result;
}
