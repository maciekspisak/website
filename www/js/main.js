import {loadClientLibrary} from './call-google-api.js';
import {processEvents} from './process-events.js';
import {drawSplineChart} from './chart/draw-spline-chart.js';
import {drawColumnChart} from './chart/draw-column-chart.js';
import {drawPieChart} from './chart/draw-pie-chart.js';
import {drawCalendarChart} from './chart/draw-calendar-chart.js';
import {parseCalendarDescription} from './parse-calendar-description.js';


/** Fetch data */
const apiInitializationFunction = await loadClientLibrary();
const calendarData = await apiInitializationFunction();

/** Create project tiles in dashboard description */
const description = calendarData.description;
document.getElementById('all_projects').innerHTML = parseCalendarDescription(description);

/** Draw charts */
const events = calendarData.items;

const dateMultiValueObjects = processEvents(events)[2];
drawSplineChart('spline_chart', dateMultiValueObjects);

const eventTypeDurationPairs = processEvents(events)[1];
drawPieChart('pie_chart', eventTypeDurationPairs);

const dateDurationPairs = processEvents(events)[0];
drawColumnChart('column_chart', dateDurationPairs);
drawCalendarChart('calendar_chart', dateDurationPairs);
