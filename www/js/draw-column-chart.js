import {setChart} from './set-chart.js';
import {setChartAxes} from './set-chart-axes.js';
import * as chartDataOperations from './chart-data-operations.js';
import {setTimeToMidnight} from './date-tools.js';


/**
 * Draws column chart in selected HTML element using anychart library.
 * @param {string} elementId 
 * @param {Array.<Object>} chartData
 */
export function drawColumnChart(elementId, chartData) {
  if (!chartData || chartData.length === 0) return;

  const showDaysCount = 30;
  let filteredChartData = chartData.filter(keyValuePair => 
    chartDataOperations.isLastNDays(keyValuePair, showDaysCount));
  
  chartDataOperations.setZeroValuesLastNDays(filteredChartData, showDaysCount);
  filteredChartData.sort((a, b) => setTimeToMidnight(new Date(a.key)) - setTimeToMidnight(new Date(b.key)));

  const dataset = anychart.data.set(chartDataOperations.changeMinutesToHours(filteredChartData));
  const mapping = dataset.mapAs({x: 'key', value: 'value'});

  let chart = anychart.column(mapping);

  chart.yAxis().labels().format('{%value} h');
  chart.xAxis().labels().format('{%value}{dateTimeFormat: dd.MM}');

  chart.tooltip().format('{%value} h')
    .titleFormat('{%x}{dateTimeFormat: dd.MM}');

  setChart(chart, elementId);
  setChartAxes(chart);
  chart.draw();
}
