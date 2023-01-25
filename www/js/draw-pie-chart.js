import * as colorManager from './color-manager.js';
import * as setChart from './set-chart.js';


export function drawPieChart(elementId) {
  anychart.data.loadJsonFile('/data/pie-data.json',
    data => {
      let chart = anychart.pie(data);

      setChart.setChart(chart, elementId);
      
      chart.innerRadius('60%')
        .labels({fontColor: colorManager.fontColor, position: 'outside'})
        .connectorStroke({color: colorManager.fontColor, thickness: 2, dash: "2 2"})
        .legend({fontColor: colorManager.fontColor})
        .draw();
    }
  );
}
