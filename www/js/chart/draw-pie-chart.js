import {fontColor} from '../color-manager.js';
import {setChart} from './set-chart.js';
import {changeMinutesToHours} from './data-operations.js';


/**
 * Draws pie chart in selected HTML element using anychart library.
 * @param {string} elementId 
 * @param {Array.<Object>} chartData
 */
export function drawPieChart(elementId, chartData) {
  if (!chartData || chartData.length === 0) return;

  const dataset = anychart.data.set(changeMinutesToHours(chartData));
  const mapping = dataset.mapAs({x: 'key', value: 'value'});

  let chart = anychart.pie(mapping);

  setChart(chart, elementId);

  chart.tooltip().format('Total contribution: {%value} h')

  chart.innerRadius('60%')
    .labels({fontColor: fontColor, position: 'outside'})
    .connectorStroke({color: fontColor, thickness: 2, dash: "2 2"})
    .legend({fontColor: fontColor})
    .draw();
}
