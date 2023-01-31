import {googleApiLoaded} from './call-google-api.js';
import {processEvents} from './process-events.js';
import {drawLinearChart} from './draw-linear-chart.js';
import {drawBarChart} from './draw-bar-chart.js';
import {drawPieChart} from './draw-pie-chart.js';
import {drawCalendarChart} from './draw-calendar-chart.js';


async function drawCharts() {
  const apiInitializationFunction = await googleApiLoaded();
  const events = await apiInitializationFunction();
  const chartData = processEvents(events);

  drawLinearChart('linear_chart');
  drawBarChart('bar_chart');
  drawPieChart('pie_chart');
  drawPieChart('pie_chart_2');
  drawCalendarChart('calendar_chart', chartData);
}

drawCharts();
