import {setChart} from './set-chart.js';
import {setChartAxes} from './set-chart-axes.js';


/**
 * Draws linear chart in selected HTML element using anychart library.
 * @param {string} elementId 
 */
export function drawLinearChart(elementId) {
  anychart.data.loadJsonFile('/data/linear-data.json',
    data => {
      let chart = anychart.line(data);

      setChart(chart, elementId);
      setChartAxes(chart);
      
      chart.draw();
    }
  );
}
