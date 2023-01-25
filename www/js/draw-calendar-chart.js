import * as colorManager from './color-manager.js';


export function drawCalendarChart(elementId) {
  anychart.data.loadJsonFile('/data/calendar-data.json',
    data => {
      let dataset = anychart.data.set(data);
      let mapping = dataset.mapAs({x: 'date', value: 'count'});

      let chart = anychart.calendar(mapping);
      let fontColor = colorManager.fontColor;

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

      chart.tooltip().format('{%value} contribution(s)');

      chart.colorScale(customColorScale)
        .colorRange(false)
        .container(elementId)
        .draw();
    }
  );
}
