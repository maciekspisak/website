import * as callGoogleApi from './call-google-api.js';
import * as processEvents from './process-events.js';
import * as drawLinearChart from './draw-linear-chart.js';
import * as drawBarChart from './draw-bar-chart.js';
import * as drawPieChart from './draw-pie-chart.js';
import * as drawCalendarChart from './draw-calendar-chart.js';


async function drawCharts() {
  const apiInitializationFunction = await callGoogleApi.googleApiLoaded();
  const events = await apiInitializationFunction();
  const chartData = processEvents.processEvents(events);

  drawLinearChart.drawLinearChart('linear_chart');
  drawBarChart.drawBarChart('bar_chart');
  drawPieChart.drawPieChart('pie_chart');
  drawPieChart.drawPieChart('pie_chart_2');
  drawCalendarChart.drawCalendarChart('calendar_chart', chartData);
}

drawCharts()
