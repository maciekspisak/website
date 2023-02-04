import * as colorManager from '../color-manager.js';
import {changeMinutesToHours} from './data-operations.js';


/**
 * Draws calendar chart in selected HTML element using anychart library.
 * @param {string} elementId 
 * @param {Array.<Object>} chartData
 */
export function drawCalendarChart(elementId, chartData) {
  if (!chartData || chartData.length === 0) return;
  
  const filteredChartData = chartData.filter(object => new Date(object.key).getFullYear() === new Date().getFullYear());
  const dataset = anychart.data.set(changeMinutesToHours(filteredChartData));
  const mapping = dataset.mapAs({x: 'key', value: 'value'});

  let chart = anychart.calendar(mapping);
  const fontColor = colorManager.fontColor;

  chart.years().title().fontColor(fontColor);

  chart.months()
    .stroke(false)
    .noDataStroke(false)
    .labels().fontColor(fontColor);

  chart.weeks().labels().fontColor(fontColor);

  chart.days()
    .spacing(3)
    .stroke(false)
    .noDataStroke(false)
    .noDataFill(colorManager.backgroundSecondaryColor)
    .noDataHatchFill(false);

  let customColorScale = anychart.scales.linearColor();
  customColorScale.colors([colorManager.primaryColorFaded, colorManager.primaryColor]);

  chart.tooltip().format('Contribution: {%value} h')
    .titleFormat('{%x}{dateTimeFormat: dd.MM}');

  chart.colorScale(customColorScale)
    .colorRange(false)
    .container(elementId)
    .draw();
}
