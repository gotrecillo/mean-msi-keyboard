export const keyboardColors = [
  'green',
  'red',
  'orange',
  'yellow',
  'black',
  'cyan',
  'blue',
  'purple',
  'white',
];

export const keyboardIntensities = [
  'high', 'light', 'low', 'med',
];

export const keyboardModes = [
  'normal', 'breathe', 'wave',
];

export const keyboardRegions = [
  'left', 'center', 'right',
];

export const defaultKeyboard = {
  name: 'Default',
  colors: {
    left: {
      color: keyboardColors[0], intensity: keyboardIntensities[0],
    },
    center: {
      color: keyboardColors[0], intensity: keyboardIntensities[0],
    },
    right: {
      color: keyboardColors[0], intensity: keyboardIntensities[0],
    },
  },
  mode: keyboardModes[0],
};
