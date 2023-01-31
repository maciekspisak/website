const fontColor = getComputedStyle(document.documentElement).getPropertyValue('--font-color');
const backgroundPrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--background-primary-color');
const backgroundSecondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--background-secondary-color');

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
const primaryColorFaded = getComputedStyle(document.documentElement).getPropertyValue('--primary-color-faded');
const secondaryColor1 = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color-1');
const secondaryColor2 = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color-2');
const secondaryColor3 = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color-3');
const secondaryColor4 = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color-4');
const secondaryColor5 = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color-5');

let draculaPalette = anychart.palettes.distinctColors();
draculaPalette.items(
  [
    primaryColor,
    secondaryColor1,
    secondaryColor2,
    secondaryColor3,
    secondaryColor4,
    secondaryColor5
  ]
);

export {
  fontColor,
  backgroundPrimaryColor,
  backgroundSecondaryColor,
  primaryColor,
  primaryColorFaded,
  draculaPalette
};
