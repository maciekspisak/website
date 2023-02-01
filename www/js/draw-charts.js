import {loadClientLibrary} from './call-google-api.js';
import {processEvents} from './process-events.js';
import {drawLinearChart} from './draw-linear-chart.js';
import {drawColumnChart} from './draw-column-chart.js';
import {drawPieChart} from './draw-pie-chart.js';
import {drawCalendarChart} from './draw-calendar-chart.js';


/** Main function in the project. Fetches data and draws charts. */
async function drawCharts() {
  const apiInitializationFunction = await loadClientLibrary();
  const events = await apiInitializationFunction();
  const dateDurationPairs = processEvents(events)[0];
  const eventTypeDurationPairs = processEvents(events)[1];

  drawLinearChart('linear_chart');
  drawColumnChart('column_chart', dateDurationPairs);
  drawPieChart('pie_chart', eventTypeDurationPairs);
  drawPieChart('pie_chart_2', eventTypeDurationPairs);
  drawCalendarChart('calendar_chart', dateDurationPairs);
}

drawCharts();
