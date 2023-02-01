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
  const chartData = processEvents(events);

  drawLinearChart('linear_chart');
  drawColumnChart('column_chart', chartData);
  drawPieChart('pie_chart');
  drawPieChart('pie_chart_2');
  drawCalendarChart('calendar_chart', chartData);
}

drawCharts();
