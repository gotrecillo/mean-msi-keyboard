// our packages
import { validateColor, validateMode, keyboardColors, keyboardModes, keyboardIntensities } from '../src/validations';

export default (test) => {
  test('Keyboard Colors and Modes Validation', t => {
    t.equal(
      validateColor({ color: 'foo', intensity: keyboardIntensities[0]}),
      false,
      'Color is not present in the predefined ones'
    );

    t.equal(
      validateColor({ color: keyboardColors[0], intensity: 'foo'}),
      false,
      'Intensity is not present in the predefined ones'
    );

    t.equal(
      validateColor({ color: keyboardColors[0], intensity: keyboardIntensities[0]}),
      true,
      'Color and intensity are in the predefined ones'
    );

    t.equal(
      validateColor({ color: keyboardColors[0]}),
      false,
      'Intensity key is not present'
    );

    t.equal(
      validateColor({ intensity: keyboardIntensities[0]}),
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

    t.end();
  });

}
