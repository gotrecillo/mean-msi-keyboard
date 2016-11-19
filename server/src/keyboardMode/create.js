// npm packages
import passport from 'passport';

// our packages
import { KeyboardMode } from '../db';
import { asyncRequest } from '../util';
import { validateColors, validateMode } from '../validations';

export default (app) => {
  app.post('/api/keyboard-mode', passport.authenticate('jwt', { session: false }), asyncRequest(async(req, res) => {
    // get user input
    const { name, colors, mode } = req.body;

    // make sure the name is not empty
    if (!name || !name.length) {
      res.status(400).send({ error: 'Name should be present' });
      return;
    }

    // validate colors
    if (!validateColors(colors)) {
      res.status(400).send({ error: 'Colors not valid' });
      return;
    }

    // validate mode
    if (!validateMode(mode)) {
      res.status(400).send({ error: 'Mode not valid' });
      return;
    }

    // save new keyboard mode
    const keyboardMode = new KeyboardMode({
      name,
      colors,
      mode,
      creator: req.user.id,
    });
    await keyboardMode.save();

    // send created keyboard mode back
    res.send(keyboardMode);
  }));
};
