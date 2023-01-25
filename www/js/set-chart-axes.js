import * as colorManager from './color-manager.js';


export function setChartAxes(chart) {
  let xAxis = chart.xAxis();
  xAxis.stroke({thickness: 0})
    .ticks({enabled: false})
    .labels({fontColor: colorManager.fontColor});

  let yAxis = chart.yAxis();
  yAxis.stroke({thickness: 0})
    .ticks({enabled: false})
    .labels({fontColor: colorManager.fontColor});
}
