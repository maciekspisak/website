import * as setChart from './set-chart.js';
import * as setChartAxes from './set-chart-axes.js';


export function drawBarChart(elementId) {
  anychart.data.loadJsonFile('/data/bar-data.json',
    data => {
      let chart = anychart.bar(data);

      setChart.setChart(chart, elementId);
      setChartAxes.setChartAxes(chart);
      chart.draw();
    }
  );
}
