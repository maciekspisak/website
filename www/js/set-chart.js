import * as colorManager from './color-manager.js';


export function setChart(chart, elementId) {
  chart.container(elementId)
    .background({enabled: false})
    .palette(colorManager.draculaPalette)
    .interactivity({selectionMode: 'none'});
}
