import {setChart} from './set-chart.js';
import {setChartAxes} from './set-chart-axes.js';
import * as chartDataOperations from './chart-data-operations.js';


/**
 * Draws spline chart in selected HTML element using anychart library.
 * @param {string} elementId 
 * @param {Array.<Object>} chartData
 */
export function drawSplineChart(elementId, chartData) {
  if (!chartData || chartData.length === 0) return;

  let alteredChartData = chartDataOperations.prepareChartDataForLastNDays(chartData, 30);
  alteredChartData = chartDataOperations.changeMinutesToHours(alteredChartData);
  console.log(alteredChartData);

  let chart = anychart.line();

  const dataset = anychart.data.set(alteredChartData);
  for (const key of chartDataOperations.getKeys(alteredChartData)) {
    const series = chart.spline(dataset.mapAs({x: 'key', value: key}));
    series.name(key);
  };

  chart.yAxis().labels().format('{%value} h');
  chart.xAxis().labels().format('{%value}{dateTimeFormat: dd.MM}');

  chart.tooltip().format('{%seriesName}: {%value} h')
    .titleFormat('{%x}{dateTimeFormat: dd.MM}');

  setChart(chart, elementId);
  setChartAxes(chart);


  chart.draw();
}
