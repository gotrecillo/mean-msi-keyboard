// our packages
import { User } from '../db';
import { hash, asyncRequest, logger } from '../util';

export default (app) => {
  app.post('/api/register', asyncRequest(async(req, res) => {
    // get user input
    const { username, password, passwordRepeat } = req.body;

    // validate password matching
    if (password !== passwordRepeat) {
      res.status(400).send({ error: 'Passwords do not match!' });
      return;
    }

    // check if username is already used
    const users = await User.filter({ username }).run();
    if (users.length > 0) {
      res.status(403).send({ error: 'Username already in use' });
      return;
    }

    const hashedPassword = hash(password);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.sendStatus(201);
  }));
};