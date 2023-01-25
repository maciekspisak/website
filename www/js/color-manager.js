let fontColor = getComputedStyle(document.documentElement).getPropertyValue('--font-color');
let backgroundPrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--background-primary-color');
let backgroundSecondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--background-secondary-color');

let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
let primaryColorFaded = getComputedStyle(document.documentElement).getPropertyValue('--primary-color-faded');
let secondaryColor1 = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color-1');
let secondaryColor2 = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color-2');
let secondaryColor3 = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color-3');
let secondaryColor4 = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color-4');
let secondaryColor5 = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color-5');

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
