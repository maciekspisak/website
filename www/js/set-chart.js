import {draculaPalette} from './color-manager.js';


export function setChart(chart, elementId) {
  chart.container(elementId)
    .background({enabled: false})
    .palette(draculaPalette)
    .interactivity({selectionMode: 'none'});
}
