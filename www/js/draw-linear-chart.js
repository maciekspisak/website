import * as setChart from './set-chart.js';
import * as setChartAxes from './set-chart-axes.js';


export function drawLinearChart(elementId) {
  anychart.data.loadJsonFile('/data/linear-data.json',
    data => {
      let chart = anychart.line(data);

      setChart.setChart(chart, elementId);
      setChartAxes.setChartAxes(chart);
      
      chart.draw();
    }
  );
}
