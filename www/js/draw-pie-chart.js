import {fontColor} from './color-manager.js';
import {setChart} from './set-chart.js';


/**
 * Draws pie chart in selected HTML element using anychart library.
 * @param {string} elementId 
 */
export function drawPieChart(elementId) {
  anychart.data.loadJsonFile('/data/pie-data.json',
    data => {
      let chart = anychart.pie(data);

      setChart(chart, elementId);
      
      chart.innerRadius('60%')
        .labels({fontColor: fontColor, position: 'outside'})
        .connectorStroke({color: fontColor, thickness: 2, dash: "2 2"})
        .legend({fontColor: fontColor})
        .draw();
    }
  );
}
