import { keyboardColors, keyboardIntensities, keyboardModes } from './constants';

export const validateColor = color => !!(
  color.intensity && keyboardIntensities.includes(color.intensity) &&
  color.color && keyboardColors.includes(color.color)
);

export const validateMode = mode => keyboardModes.includes(mode);
