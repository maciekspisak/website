import {setChart} from './set-chart.js';
import {setChartAxes} from './set-chart-axes.js';
import * as chartDataOperations from './chart-data-operations.js';


/**
 * Draws column chart in selected HTML element using anychart library.
 * @param {string} elementId 
 * @param {Array.<Object>} chartData
 */
export function drawColumnChart(elementId, chartData) {
  if (!chartData || chartData.length === 0) return;

  let alteredChartData = chartDataOperations.prepareChartDataForLastNDays(chartData, 30);
  alteredChartData = chartDataOperations.changeMinutesToHours(alteredChartData);

  const dataset = anychart.data.set(alteredChartData);
  const mapping = dataset.mapAs({x: 'key', value: 'value'});

  let chart = anychart.column(mapping);

  chart.yAxis().labels().format('{%value} h');
  chart.xAxis().labels().format('{%value}{dateTimeFormat: dd.MM}');

  chart.tooltip().format('Contribution: {%value} h')
    .titleFormat('{%x}{dateTimeFormat: dd.MM}');

  setChart(chart, elementId);
  setChartAxes(chart);
  chart.draw();
}
