import thinky from './thinky';
import { keyboardColors, keyboardIntensities, keyboardModes } from '../validations';

const Color = {
  color: thinky.type.string().required().enum(keyboardColors),
  intensity: thinky.type.string().required().enum(keyboardIntensities),
};

export const KeyboardMode = thinky.createModel('keyboardModes', {
  name: thinky.type.string().required(),
  mode: thinky.type.string().required().enum(keyboardModes),
  right: Color,
  center: Color,
  left: Color,
  creator: thinky.type.string().required(),
});
