// our packages
import {
  validateColor,
  validateMode,
  validateColors,
  keyboardColors,
  keyboardModes,
  keyboardIntensities,
  keyboardRegions,
  defaultKeyboard
} from '../src/validations';

export default (test) => {
  test('Keyboard Colors and Modes Validation', t => {
    const defaultColors = defaultKeyboard.colors;

    t.equal(
      validateColor({ color: 'foo', intensity: keyboardIntensities[0] }),
      false,
      'Color is not present in the predefined ones'
    );

    t.equal(
      validateColor({ color: keyboardColors[0], intensity: 'foo' }),
      false,
      'Intensity is not present in the predefined ones'
    );

    t.equal(
      validateColor({ color: keyboardColors[0], intensity: keyboardIntensities[0] }),
      true,
      'Color and intensity are in the predefined ones'
    );

    t.equal(
      validateColor({ color: keyboardColors[0] }),
      false,
      'Intensity key is not present'
    );

    t.equal(
      validateColor({ intensity: keyboardIntensities[0] }),
      false,
      'Color key is not present'
    );

    t.equal(
      validateColor({}),
      false,
      'Neither intensity or color key are present'
    );

    t.equal(
      validateMode('foo'),
      false,
      'Mode is not present in the predefined ones'
    );

    t.equal(
      validateMode(keyboardModes[0]),
      true,
      'Mode is present in the predefined ones'
    );

    t.equal(
      validateColors(),
      false,
      'We dont pass arguments'
    );

    t.equal(
      validateColors(defaultColors),
      true,
      'All regions are present and are valid'
    );

    t.equal(
      validateColors(Object.assign({}, defaultColors, { [keyboardRegions[0]]: {} })),
      false,
      'All regions are present and first region is invalid'
    );

    const clonedColors = Object.assign({}, defaultColors);
    delete clonedColors[keyboardRegions[0]];
    t.equal(
      validateColors(clonedColors),
      false,
      'First region is missing'
    );

    t.end();
  });

}
