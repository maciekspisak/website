import {setChart} from './set-chart.js';
import {setChartAxes} from './set-chart-axes.js';


export function drawBarChart(elementId) {
  anychart.data.loadJsonFile('/data/bar-data.json',
    data => {
      let chart = anychart.bar(data);

      setChart(chart, elementId);
      setChartAxes(chart);
      chart.draw();
    }
  );
}
