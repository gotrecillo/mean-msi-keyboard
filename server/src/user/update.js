// npm packages
import passport from 'passport';

// our packages
import { isUsernameTaken } from '../auth';
import { User } from '../db';
import { hash, asyncRequest } from '../util';

export default (app) => {
  app.put('/api/user/:id', passport.authenticate('jwt', { session: false }), asyncRequest(async(req, res) => {
    const { username, password, passwordRepeat } = req.body;

    // check if user is changing his own profile
    if (req.user.id !== req.params.id) {
      res.status(403).send({ error: 'Not enough rights to change other user profile' });
      return;
    }

    let user;
    try {
      user = await User.get(req.params.id);
    } catch (e) {
      res.status(400).send({ error: 'User does not exist' });
      return;
    }

    // check if user exists
    if (!user) {
      res.status(400).send({ error: 'User does not exist' });
      return;
    }

    // check if data is actually changed
    const isUsernameChanged = username && user.username !== username;
    const isPasswordChanged = password && user.password !== hash(password);
    // if not - just sent OK
    if (!isPasswordChanged && !isUsernameChanged) {
      delete user.password;
      res.send(user);
      return;
    }

    // check passwords for match
    if (isPasswordChanged && password !== passwordRepeat) {
      res.status(400).send({ error: 'Passwords do not match' });
      return;
    }

    if (isUsernameChanged && await isUsernameTaken(username)) {
      res.status(400).send({ error: 'Username already in use' });
      return;
    }

    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = hash(password);
    }

    await user.save();

    // send success
    delete user.password;
    res.send(user);
  }));
};
