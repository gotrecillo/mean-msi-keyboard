import { keyboardColors, keyboardIntensities, keyboardModes, keyboardRegions } from './constants';

export const validateColor = color => !!(
  color &&
  color.intensity && keyboardIntensities.includes(color.intensity) &&
  color.color && keyboardColors.includes(color.color)
);

export const validateColors = colors => !!(colors && keyboardRegions.every(region => validateColor(colors[region])));

export const validateMode = mode => keyboardModes.includes(mode);

